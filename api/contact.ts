import type { VercelRequest, VercelResponse } from '@vercel/node'
import nodemailer from 'nodemailer'

/**
 * Contact form endpoint.
 *
 * The form used to POST to "/" carrying Netlify's data-netlify attributes,
 * which do nothing at all on Vercel: every submission got a 405 and was lost.
 * This is the real backend. It delivers over SMTP through the site's own Google
 * Workspace mailbox, so no third party ever holds a lead.
 *
 * Required environment variables (set in the Vercel dashboard):
 *
 *   SMTP_USER   hparker6@stratosconsultingcrew.com
 *   SMTP_PASS   a Google App Password (NOT the account password)
 *   CONTACT_TO  optional; defaults to SMTP_USER
 */

const SMTP_HOST = 'smtp.gmail.com'
const SMTP_PORT = 465

/** Field caps, mirroring the client. Enforced here because the client's are a courtesy, not a control. */
const MAX = { name: 100, company: 120, email: 254, phone: 30, challenge: 2000 } as const

type Field = keyof typeof MAX

const NEWLINE = 10

/**
 * Drops C0 control characters and DEL, keeping only the newline.
 *
 * A code-point filter rather than a regex character class on purpose: the
 * equivalent regex has to spell out literal control bytes, which is exactly the
 * kind of thing that gets silently mangled by anything that rewrites the file.
 */
function stripControl(value: string): string {
  let out = ''
  for (const ch of value) {
    const code = ch.codePointAt(0) ?? 0
    const isControl = (code < 32 && code !== NEWLINE) || code === 127
    if (!isControl) out += ch
  }
  return out
}

/** Strips control characters, flattens newlines outside the message body, trims, caps length. */
function sanitize(field: Field, raw: unknown): string {
  if (typeof raw !== 'string') return ''
  let value = stripControl(raw)
  if (field !== 'challenge') value = value.split('\n').join(' ')
  return value.trim().slice(0, MAX[field])
}

/**
 * Header-injection guard. Anything interpolated into a mail header (Subject,
 * Reply-To) must not be able to open a new header line. sanitize() has already
 * removed newlines from these fields, so this is defence in depth rather than
 * the only line of it.
 */
function headerSafe(value: string): string {
  return stripControl(value).split('\n').join(' ')
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env
  if (!SMTP_USER || !SMTP_PASS) {
    // Loud in the logs, vague to the caller: a misconfigured deploy is our
    // problem, and the visitor still gets the mailto fallback.
    console.error('contact: SMTP_USER / SMTP_PASS are not configured')
    return res.status(500).json({ error: 'Email is not configured' })
  }

  // Vercel parses JSON bodies for us; guard anyway so a stray content-type
  // cannot crash the function.
  const body = (typeof req.body === 'object' && req.body !== null ? req.body : {}) as Record<string, unknown>

  // Honeypot. People leave it empty; bots fill every field they find. Answer
  // 200 so the bot believes it worked and doesn't retry.
  if (sanitize('name', body['bot-field'])) return res.status(200).json({ ok: true })

  const name = sanitize('name', body.name)
  const company = sanitize('company', body.company)
  const email = sanitize('email', body.email)
  const phone = sanitize('phone', body.phone)
  const challenge = sanitize('challenge', body.challenge)

  if (!name || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'A name and a valid email address are required' })
  }

  const to = CONTACT_TO || SMTP_USER
  const subject = headerSafe(`New discovery call request: ${name}${company ? ` (${company})` : ''}`)

  const text = [
    `Name:     ${name}`,
    `Company:  ${company || '-'}`,
    `Email:    ${email}`,
    `Phone:    ${phone || '-'}`,
    '',
    'Biggest challenge:',
    challenge || '(not provided)',
  ].join('\n')

  try {
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: true,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })

    await transport.sendMail({
      // Gmail rejects an envelope sender that isn't the authenticated mailbox,
      // so the visitor goes in Reply-To instead. Hitting reply in your inbox
      // then writes to them rather than to yourself.
      from: `"Stratos website" <${SMTP_USER}>`,
      to,
      replyTo: headerSafe(`"${name}" <${email}>`),
      subject,
      text,
    })

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('contact: sendMail failed', err)
    // Never report success for a send that didn't happen. The form's error
    // state keeps the visitor's typed input and offers the mailto fallback.
    return res.status(502).json({ error: 'Could not send the message' })
  }
}
