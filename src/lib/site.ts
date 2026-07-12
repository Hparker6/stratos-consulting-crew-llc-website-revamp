/** Site-wide contact constants. */

export const CONTACT_EMAIL = 'hparker6@stratosconsultingcrew.com'

const subject = 'Free discovery call request'
const body = `Hi Houston,

I'd like to book a free discovery call.

Company:
What we're working through:
Best times to reach me:
`

/** "Book a Free Call" CTAs open a prefilled email draft to Houston. */
export const BOOK_CALL_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  subject,
)}&body=${encodeURIComponent(body)}`
