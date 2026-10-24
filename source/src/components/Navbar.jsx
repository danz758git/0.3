import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Logo from './Logo.jsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="nav">
      <div className="container nav__inner">
        <Link to="/" className="nav__brand" onClick={() => setOpen(false)}>
          <Logo />
          <span className="nav__name">
            APEX <span>INTEGRATION</span>
          </span>
        </Link>

        <nav aria-label="Main">
          <ul className={`nav__links${open ? ' open' : ''}`}>
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link to="/contact" className="btn btn--amber nav__cta">
          Start a project
        </Link>

        <button
          className="nav__toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M3 7h18M3 12h18M3 17h18" />
            )}
          </svg>
        </button>
      </div>
    </header>
  )
}
