import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'

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
              <li><Link to="/services">Networking &amp; 5G mobility</Link></li>
              <li><Link to="/services">Software development</Link></li>
              <li><Link to="/services">AI consulting</Link></li>
              <li><Link to="/services">Digital twin integration</Link></li>
              <li><Link to="/services">Cabling &amp; data centers</Link></li>
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
