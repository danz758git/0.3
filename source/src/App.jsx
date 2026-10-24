import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'

// HashRouter is used deliberately: it works on any static host (including
// Porkbun Static Hosting) without server-side rewrite rules. To switch to
// clean URLs later, swap HashRouter for BrowserRouter and configure the host
// to serve index.html for all paths.

function ScrollToTop() {
  const { pathname } = useLocation()
  const firstRender = useRef(true)
  useEffect(() => {
    window.scrollTo(0, 0)
    // Google Analytics: report SPA navigations as page views.
    // The initial load is already counted by gtag('config'), so skip it.
    if (firstRender.current) {
      firstRender.current = false
    } else if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: pathname,
      })
    }
  }, [pathname])
  return null
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  )
}
