import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { footerServiceLinks } from '../data/services.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Logo height={40} />
            <p className="footer__motto">See the bigger picture</p>
            <p style={{ maxWidth: '38ch', fontSize: '0.95rem' }}>
              Apex Integration designs, builds, and operates the systems that
              keep modern organizations connected, informed, and moving.
            </p>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              {/* Derived from the service catalog - see
                  footerServiceLinks. Previously five hand-typed lines
                  that stayed five after a sixth service shipped. */}
              {/* Plain /services, no "#id" fragment. This app uses
                  HashRouter, so `to="/services#surveillance"` renders as
                  "#/services#surveillance" - two hashes, which the
                  browser will not scroll to. The served static site does
                  use real anchors, because it has real directory URLs. */}
              {footerServiceLinks.map((s) => (
                <li key={s.id}>
                  <Link to="/services">{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/contact">Start a project</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer__bar">
          <span>© {new Date().getFullYear()} Apex Integration. All rights reserved.</span>
          <span>Enterprise systems, integrated end to end.</span>
        </div>
      </div>
    </footer>
  )
}
