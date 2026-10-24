import { useState } from 'react'
import Contours from '../components/Contours.jsx'
import { services } from '../data/services.jsx'

// ── Form delivery ────────────────────────────────────────────────────────────
// The form posts to Web3Forms (free tier available). To activate:
//   1. Get an access key at https://web3forms.com (takes ~1 minute)
//   2. Paste it below. Submissions arrive at the email you registered.
// See README.md → "Contact form setup".
const WEB3FORMS_ACCESS_KEY = 'af2e55fe-abac-423d-996f-924a430fb66d'

// Email assembled at runtime so the full address never appears as a
// scrape-able string in the source or built files.
const EM = ['cs', 'apexintegration.ca']
const emailAddr = () => EM[0] + '\u0040' + EM[1]

const initialForm = {
  name: '',
  email: '',
  company: '',
  service: '',
  message: '',
  botcheck: '', // honeypot — humans never fill this
}

// DERIVED from the service catalog, never retyped. This list was
// previously a second hand-written copy of the same six titles, and it
// drifted: a service was added to the catalog and the dropdown kept the
// old five, so a prospect could read about a service on one page and
// then find no way to ask for it on the next. Deriving it means adding
// a service to services.jsx is enough, and the two cannot disagree.
const serviceOptions = [...services.map((s) => s.title), 'Not sure yet']

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Please enter your name.'
  if (!form.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'That email address doesn\u2019t look right.'
  }
  if (!form.message.trim() || form.message.trim().length < 10) {
    errors.message = 'Tell us a little more — at least a sentence.'
  }
  return errors
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | ok | err

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const handleSubmit = async () => {
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    if (form.botcheck) return // silently drop bot submissions

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New inquiry from ${form.name} — apexintegration`,
          from_name: 'Apex Integration website',
          name: form.name,
          email: form.email,
          company: form.company,
          service: form.service,
          message: form.message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('ok')
        setForm(initialForm)
      } else {
        setStatus('err')
      }
    } catch {
      setStatus('err')
    }
  }

  return (
    <>
      <section className="page-head">
        <Contours />
        <div className="container" style={{ position: 'relative' }}>
          <p className="eyebrow">Contact</p>
          <h1>Start with the outcome. We'll chart the route.</h1>
          <p>
            Tell us what you need to connect, build, or see — an engineer (not
            a sales script) replies within one business day.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-info">
            <p className="eyebrow">Reach us</p>
            <h2>Talk to Apex Integration</h2>
            <div className="contact-info__item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              <div>
                <strong>Email</strong>
                <span>
                  <a href={'mailto:' + emailAddr()} style={{ color: 'inherit' }}>
                    {emailAddr()}
                  </a>
                </span>
              </div>
            </div>
            <div className="contact-info__item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div>
                <strong>Office</strong>
                <span>180 Northfield Drive West, Unit 4, Waterloo, Ontario, N2L 0C7, Canada</span>
              </div>
            </div>
            <div className="contact-info__item" style={{ borderBottom: 'none' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              <div>
                <strong>Response time</strong>
                <span>Within one business day, usually faster</span>
              </div>
            </div>
          </div>

          <div className="form">
            <div className="form__row">
              <div className={`field${errors.name ? ' field--invalid' : ''}`}>
                <label htmlFor="name">Name *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ada Lovelace"
                />
                {errors.name && <span className="field__error">{errors.name}</span>}
              </div>
              <div className={`field${errors.email ? ' field--invalid' : ''}`}>
                <label htmlFor="email">Work email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="ada@company.com"
                />
                {errors.email && <span className="field__error">{errors.email}</span>}
              </div>
            </div>

            <div className="form__row">
              <div className="field">
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Optional"
                />
              </div>
              <div className="field">
                <label htmlFor="service">What do you need?</label>
                <select id="service" name="service" value={form.service} onChange={handleChange}>
                  <option value="">Select a service…</option>
                  {serviceOptions.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={`field${errors.message ? ' field--invalid' : ''}`}>
              <label htmlFor="message">Project details *</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={form.message}
                onChange={handleChange}
                placeholder="What are you trying to connect, build, or see? Rough scope, sites, and timelines all help."
              />
              {errors.message && <span className="field__error">{errors.message}</span>}
            </div>

            {/* honeypot — hidden from humans, catches bots */}
            <input
              type="text"
              name="botcheck"
              value={form.botcheck}
              onChange={handleChange}
              tabIndex="-1"
              autoComplete="off"
              style={{ position: 'absolute', left: '-9999px', height: 0, width: 0, opacity: 0 }}
              aria-hidden="true"
            />

            <button
              type="button"
              className="btn btn--ink"
              onClick={handleSubmit}
              disabled={status === 'sending'}
            >
              {status === 'sending' && <span className="spinner" aria-hidden="true"></span>}
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>

            {status === 'ok' && (
              <p className="form__status form__status--ok" role="status">
                Message sent. An engineer will reply within one business day.
              </p>
            )}
            {status === 'err' && (
              <p className="form__status form__status--err" role="alert">
                The message didn't go through. Please try again, or email us
                directly at {emailAddr()}.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
