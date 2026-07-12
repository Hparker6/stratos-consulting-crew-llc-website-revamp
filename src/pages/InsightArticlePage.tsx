import { Link, useParams } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'
import CTABand from '../components/CTABand'
import NotFoundPage from './NotFoundPage'
import { articles, formatDate, getArticle } from '../data/insights'

export default function InsightArticlePage() {
  const { slug } = useParams()
  const article = slug ? getArticle(slug) : undefined

  usePageMeta(
    article ? article.title : 'Article not found',
    article ? article.excerpt : 'This article does not exist.',
    article
      ? {
          breadcrumb: 'Insights',
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            description: article.excerpt,
            datePublished: article.date,
            author: { '@type': 'Person', name: 'Houston Parker' },
            publisher: { '@type': 'Organization', name: 'Stratos Consulting Crew LLC' },
            mainEntityOfPage: `https://www.stratosconsultingcrew.com/insights/${article.slug}`,
          },
        }
      : {},
  )

  if (!article) return <NotFoundPage />

  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 2)

  return (
    <>
      {/* Article header */}
      <section className="relative overflow-hidden" style={{ background: '#0a0f1c' }}>
        <div
          className="pointer-events-none absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(47,143,255,0.12) 0%, transparent 65%)', filter: 'blur(40px)' }}
        />
        <div className="relative max-w-3xl mx-auto px-5 pt-14 pb-10 lg:pt-20 lg:pb-12">
          <Link to="/insights" className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint hover:text-muted transition-colors">
            ← All insights
          </Link>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-6 mb-4">
            <span
              className="font-mono text-[9px] uppercase tracking-[0.12em] px-2 py-[3px] rounded-[5px] text-primary"
              style={{ background: 'rgba(47,143,255,0.1)', border: '1px solid rgba(47,143,255,0.25)' }}
            >
              {article.tag}
            </span>
            <span className="font-mono text-[11px] text-faint tracking-wide">
              {formatDate(article.date)} · {article.readMinutes} min read
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-[32px] md:text-[44px] leading-[1.1] tracking-[-0.03em] text-text-base">
            {article.title}
          </h1>
          <p className="mt-5 text-muted font-medium text-[17px] leading-relaxed">{article.excerpt}</p>
        </div>
      </section>

      {/* Body */}
      <article className="py-10 lg:py-14 bg-bg">
        <div className="max-w-3xl mx-auto px-5">
          {article.sections.map((s, i) => (
            <section key={i} className="mb-8">
              {s.heading && (
                <h2 className="font-heading font-bold text-[22px] md:text-[26px] tracking-[-0.02em] text-text-base mb-4">
                  {s.heading}
                </h2>
              )}
              {s.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="text-muted font-medium text-[17px] leading-relaxed mb-4">
                  {p}
                </p>
              ))}
              {s.bullets && (
                <ul className="space-y-3 mt-2 mb-4">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[16px] text-muted font-medium leading-relaxed">
                      <span className="text-secondary font-bold mt-[2px] flex-shrink-0">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* Author line */}
          <div
            className="mt-12 rounded-[14px] p-6 flex items-center gap-5"
            style={{ background: '#101a2e', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <picture>
              <source srcSet="/houston-parker-800.webp" type="image/webp" />
              <img
                src="/houston-parker-800.jpg"
                alt="Houston Parker, article author"
                width={64}
                height={64}
                loading="lazy"
                decoding="async"
                className="w-[64px] h-[64px] rounded-full object-cover object-top flex-shrink-0"
                style={{ border: '1px solid rgba(255,255,255,0.15)' }}
              />
            </picture>
            <div>
              <p className="font-heading font-semibold text-[16px] text-text-base">Houston Parker</p>
              <p className="text-muted font-medium text-[14px] leading-snug">
                Founder, Stratos Consulting Crew — analytics for distributors, manufacturers, and wholesalers.{' '}
                <Link to="/about" className="text-primary font-bold hover:underline">
                  About the firm →
                </Link>
              </p>
            </div>
          </div>

          {/* More articles */}
          {more.length > 0 && (
            <div className="mt-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint mb-4">Keep reading</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {more.map((a) => (
                  <Link key={a.slug} to={`/insights/${a.slug}`} className="card p-6 hover:border-white/[0.16] transition-colors group">
                    <p className="font-mono text-[11px] text-faint tracking-wide mb-2">{formatDate(a.date)}</p>
                    <h3 className="font-heading font-semibold text-[17px] leading-snug text-text-base group-hover:text-primary transition-colors">
                      {a.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <CTABand />
    </>
  )
}
