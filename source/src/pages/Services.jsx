import { Link } from 'react-router-dom'
import Contours from '../components/Contours.jsx'
import { services, serviceCountWord } from '../data/services.jsx'

export default function Services() {
  return (
    <>
      <section className="page-head">
        <Contours />
        <div className="container" style={{ position: 'relative' }}>
          <p className="eyebrow">Services</p>
          <h1>Everything between the wall jack and the boardroom</h1>
          <p>
            {serviceCountWord} disciplines, delivered by one team — so
            integration is a promise, not an afterthought.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ display: 'grid', gap: '18px' }}>
          {services.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              className="svc-card"
              style={{
                flexDirection: 'row',
                gap: '26px',
                alignItems: 'flex-start',
                padding: '34px 32px',
              }}
            >
              <div className="svc-card__icon" style={{ flex: 'none' }}>{s.icon}</div>
              <div>
                <span className="svc-card__tag">
                  {String(i + 1).padStart(2, '0')} · {s.tag}
                </span>
                <h3 style={{ margin: '6px 0 10px' }}>{s.title}</h3>
                <p style={{ maxWidth: '78ch' }}>{s.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--cloud">
        <div className="container cta-band">
          <div>
            <h2>Need a combination of these?</h2>
            <p>That's the point. Scope one engagement, get one integrated result.</p>
          </div>
          <Link to="/contact" className="btn btn--amber">Scope your project</Link>
        </div>
      </section>
    </>
  )
}
