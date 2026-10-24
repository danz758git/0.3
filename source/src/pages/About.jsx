import { Link } from 'react-router-dom'
import Contours from '../components/Contours.jsx'

export default function About() {
  return (
    <>
      <section className="page-head">
        <Contours />
        <div className="container" style={{ position: 'relative' }}>
          <p className="eyebrow">About us</p>
          <h1>Named for the view from above</h1>
          <p>
            The pterosaur was the first vertebrate to take flight — and the
            first to see the landscape whole. That's the vantage point we bring
            to enterprise technology.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '820px' }}>
          <p className="eyebrow">Why we exist</p>
          <h2>Systems fail in the gaps between vendors</h2>
          <p className="lede" style={{ marginBottom: '1em' }}>
            The network team blames the software. The software team blames the
            infrastructure. The infrastructure was installed by a contractor
            nobody can reach. Every organization knows this story — and every
            chapter of it happens in the seams between specialists.
          </p>
          <p>
            Apex Integration was founded to own the seams. We work across the
            full stack of enterprise technology — structured cabling and data
            center builds, resilient multi-path networking, custom software,
            applied AI, on-site video surveillance, and operational digital
            twins — so that when we hand
            over a system, it behaves like one system. Our clients get a single
            accountable partner with the altitude to see how every layer
            affects every other.
          </p>
          <p>
            We build on field-proven platforms from world-class technology
            partners, and we hold certifications that keep our engineering
            current. But the thing we're proudest of is simpler: the phone
            number our clients call is the same one that answers.
          </p>
        </div>
      </section>

      <section className="section section--cloud">
        <div className="container">
          <p className="eyebrow">How we work</p>
          <h2>Three commitments on every engagement</h2>
          <div className="value-grid">
            <div className="value-card">
              <h3>Altitude first</h3>
              <p>
                Before we quote a fix, we map the whole terrain — because the
                cheapest solution to the wrong problem is still the wrong
                solution.
              </p>
            </div>
            <div className="value-card">
              <h3>Built for failure</h3>
              <p>
                Links drop, disks die, vendors sunset products. We design so
                that failures are routine events your systems absorb, not
                emergencies your team inherits.
              </p>
            </div>
            <div className="value-card">
              <h3>Documented like we're leaving</h3>
              <p>
                Every cable labeled, every decision written down. You own your
                infrastructure and everything needed to run it — with or
                without us.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container cta-band">
          <div>
            <h2>Meet the team behind the wingspan</h2>
            <p>Book an introductory call — no deck, just engineers.</p>
          </div>
          <Link to="/contact" className="btn btn--amber">Book a call</Link>
        </div>
      </section>
    </>
  )
}
