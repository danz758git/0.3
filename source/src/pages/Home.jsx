import { Link } from 'react-router-dom'
import Contours from '../components/Contours.jsx'
import { services, serviceCountWord } from '../data/services.jsx'

// Diagram: cellular + satellite + fixed lines bonded into one resilient link
function BondedLinksDiagram() {
  return (
    <svg viewBox="0 0 520 360" role="img" aria-label="Multiple network paths bonded into one resilient connection">
      <rect width="520" height="360" fill="#1A2434" />
      <g fontFamily="'IBM Plex Mono', monospace" fontSize="11" fill="#97A3B2">
        <text x="30" y="66">CELLULAR 5G</text>
        <text x="30" y="156">SATELLITE</text>
        <text x="30" y="246">FIXED LINE</text>
        <text x="404" y="150" fill="#E9A23B">ONE RESILIENT</text>
        <text x="404" y="166" fill="#E9A23B">CONNECTION</text>
      </g>
      <g stroke="#8FB6C9" strokeWidth="2" fill="none" strokeOpacity="0.75">
        <path d="M30 84 C 140 84, 200 150, 300 168" />
        <path d="M30 174 C 130 174, 210 172, 300 176" />
        <path d="M30 264 C 140 264, 200 200, 300 184" />
      </g>
      <g stroke="#E9A23B" strokeWidth="5" strokeLinecap="round">
        <path d="M300 176 L 480 176" />
      </g>
      <circle cx="300" cy="176" r="10" fill="#E9A23B" />
      <circle cx="300" cy="176" r="18" fill="none" stroke="#E9A23B" strokeOpacity="0.4" />
      <g fill="#F3F5F2" fontFamily="'IBM Plex Mono', monospace" fontSize="11">
        <text x="262" y="216">BONDED</text>
      </g>
      <g stroke="#97A3B2" strokeOpacity="0.35" strokeDasharray="3 5" fill="none">
        <path d="M30 300 H 480" />
      </g>
      <text x="30" y="326" fontFamily="'IBM Plex Mono', monospace" fontSize="10" fill="#5D6B7C">
        AUTOMATIC FAILOVER · ZERO-TOUCH REMOTE MANAGEMENT
      </text>
    </svg>
  )
}

// Diagram: physical facility mirrored as a live digital twin
function DigitalTwinDiagram() {
  return (
    <svg viewBox="0 0 520 360" role="img" aria-label="A facility mirrored as a live digital twin">
      <rect width="520" height="360" fill="#0E1420" />
      {/* physical asset */}
      <g stroke="#8FB6C9" strokeWidth="2" fill="none">
        <path d="M80 210 L150 175 L220 210 L150 245 Z" />
        <path d="M80 210 v40 L150 285 v-40" />
        <path d="M220 210 v40 L150 285" />
        <path d="M150 175 v-30 L185 128 L220 145 v30" opacity="0.7" />
      </g>
      <text x="80" y="318" fontFamily="'IBM Plex Mono', monospace" fontSize="11" fill="#97A3B2">PHYSICAL FACILITY</text>
      {/* data flow */}
      <g stroke="#E9A23B" strokeWidth="2" fill="none" strokeDasharray="4 6">
        <path d="M235 190 C 270 160, 290 160, 322 188" />
        <path d="M322 240 C 290 268, 270 268, 235 240" />
      </g>
      <g fill="#E9A23B" fontFamily="'IBM Plex Mono', monospace" fontSize="10">
        <text x="248" y="152">LIVE TELEMETRY</text>
        <text x="252" y="288">CONTROL</text>
      </g>
      {/* twin */}
      <g stroke="#E9A23B" strokeWidth="2" fill="rgba(233,162,59,0.06)">
        <path d="M320 210 L390 175 L460 210 L390 245 Z" />
        <path d="M320 210 v40 L390 285 v-40" />
        <path d="M460 210 v40 L390 285" />
        <path d="M390 175 v-30 L425 128 L460 145 v30" opacity="0.8" />
      </g>
      <circle cx="440" cy="160" r="4" fill="#E9A23B" />
      <circle cx="352" cy="228" r="4" fill="#E9A23B" />
      <circle cx="405" cy="262" r="4" fill="#E9A23B" />
      <text x="320" y="318" fontFamily="'IBM Plex Mono', monospace" fontSize="11" fill="#E9A23B">OPERATIONAL TWIN</text>
    </svg>
  )
}

export default function Home() {
  return (
    <>
      {/* ================= Hero ================= */}
      <section className="hero">
        <Contours />
        <div className="container" style={{ position: 'relative' }}>
          <svg
            className="hero__mark"
            viewBox="100 10 390 210"
            aria-hidden="true"
          >
            <path d="M330 118 L468 30 L380 104 L352 116 Z" fill="#C77F1F" />
            <path d="M472 104 L410 90 L380 54 L376 92 L340 106 L238 146 L318 126 L408 106 Z" fill="#F3F5F2" />
            <path d="M352 112 L272 84 L128 206 L300 138 Z" fill="#E9A23B" />
          </svg>
          <div className="hero__inner">
            <p className="hero__motto">Apex Integration</p>
            <h1>
              See the <em>bigger picture</em>. We integrate everything beneath it.
            </h1>
            <p className="hero__sub">
              From the cable in the wall to the AI in your workflow, Apex
              Integration designs, connects, and operates enterprise systems as
              one coherent whole — networks that refuse to drop, software that
              fits, and digital twins that let you see it all at once.
            </p>
            <div className="hero__actions">
              <Link to="/contact" className="btn btn--amber">Start a project</Link>
              <Link to="/services" className="btn btn--ghost">Explore services</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Stats ================= */}
      <section className="stats">
        <div className="container stats__grid">
          <div className="stat">
            <div className="stat__num">End to end</div>
            <div className="stat__label">From structured cabling to AI strategy — one accountable partner</div>
          </div>
          <div className="stat">
            <div className="stat__num">Multi-path</div>
            <div className="stat__label">Cellular, satellite, and fixed lines bonded for continuity</div>
          </div>
          <div className="stat">
            <div className="stat__num">Days, not quarters</div>
            <div className="stat__label">Digital twin deployments that reach value fast</div>
          </div>
          <div className="stat">
            <div className="stat__num">Certified partners</div>
            <div className="stat__label">Built on field-proven platforms trusted worldwide</div>
          </div>
        </div>
      </section>

      {/* ================= Services preview ================= */}
      <section className="section">
        <div className="container">
          <p className="eyebrow">What we do</p>
          {/* Count derived, not typed - it was "Five" for a while after
              the sixth service shipped. */}
          <h2>{serviceCountWord} disciplines. One integrated view.</h2>
          <p className="lede">
            Most vendors sell you a piece. We take responsibility for how the
            pieces work together — physical layer, network, software,
            intelligence, surveillance, and the spatial view that ties them
            into one picture.
          </p>
          <div className="svc-grid">
            {services.map((s) => (
              <article className="svc-card" key={s.id}>
                <div className="svc-card__icon">{s.icon}</div>
                <span className="svc-card__tag">{s.tag}</span>
                <h3>{s.title}</h3>
                <p>{s.summary}</p>
              </article>
            ))}
            <article
              className="svc-card"
              style={{ background: 'var(--ink)', color: 'var(--text-inv)', borderColor: 'var(--ink)', justifyContent: 'center' }}
            >
              <h3 style={{ color: 'var(--amber)' }}>Not sure where to start?</h3>
              <p style={{ color: 'var(--text-inv-dim)' }}>
                Tell us the outcome you need. We'll map the shortest route to it.
              </p>
              <Link to="/contact" className="btn btn--amber" style={{ alignSelf: 'flex-start' }}>
                Talk to an engineer
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* ================= Connectivity feature ================= */}
      <section className="section section--ink">
        <div className="container feature">
          <div className="feature__copy">
            <p className="eyebrow">Connectivity that holds</p>
            <h2>Networks built to keep working when standard networks give up</h2>
            <p className="lede">
              Most networking assumes the internet always works. Ours doesn't.
              We provision connectivity that bonds multiple paths — 5G/LTE
              cellular, satellite, and fixed lines — into a single resilient
              connection, so a failed link is a non-event, not an outage.
            </p>
            <ul className="feature__points">
              <li>
                <span className="feature__bullet" aria-hidden="true"></span>
                <div>
                  <strong>Unbreakable by design</strong>
                  <span>Traffic flows across every available path; when one drops, the rest carry on without missing a session.</span>
                </div>
              </li>
              <li>
                <span className="feature__bullet" aria-hidden="true"></span>
                <div>
                  <strong>Anywhere your operation goes</strong>
                  <span>Branches, vehicles, vessels, and remote sites — coverage that follows the work across dead zones and borders.</span>
                </div>
              </li>
              <li>
                <span className="feature__bullet" aria-hidden="true"></span>
                <div>
                  <strong>Managed from one screen</strong>
                  <span>Zero-touch provisioning and cloud-based remote management scale from one router to an entire fleet.</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="feature__visual">
            <BondedLinksDiagram />
          </div>
        </div>
      </section>

      {/* ================= Digital twin feature ================= */}
      <section className="section section--cloud">
        <div className="container feature feature--flip">
          <div className="feature__copy">
            <p className="eyebrow">The bigger picture, literally</p>
            <h2>Your facility, mirrored as a living digital twin</h2>
            <p className="lede">
              We turn complex infrastructure — data centers, plants, campuses —
              into interactive 3D environments connected to live operational
              data. Explain systems faster, rehearse changes before you build,
              and run day-to-day operations with full spatial context.
            </p>
            <ul className="feature__points">
              <li>
                <span className="feature__bullet" aria-hidden="true"></span>
                <div>
                  <strong>Design, simulate, then build</strong>
                  <span>Test scenarios and upgrades virtually before breaking ground or touching production.</span>
                </div>
              </li>
              <li>
                <span className="feature__bullet" aria-hidden="true"></span>
                <div>
                  <strong>Live data, in context</strong>
                  <span>Telemetry from building and monitoring systems appears where it belongs — on the equipment itself.</span>
                </div>
              </li>
              <li>
                <span className="feature__bullet" aria-hidden="true"></span>
                <div>
                  <strong>One twin, many jobs</strong>
                  <span>Reuse the same spatial foundation for sales demos, training, operations, and planning.</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="feature__visual">
            <DigitalTwinDiagram />
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="section">
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>Ready to see your systems from above?</h2>
              <p>Tell us what you're building. We'll bring the map.</p>
            </div>
            <Link to="/contact" className="btn btn--amber">Get in touch</Link>
          </div>
        </div>
      </section>
    </>
  )
}
