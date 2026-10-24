// Single source of truth for the service catalog.
// `summary` is used on the home page; `detail` on the Services page.

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const services = [
  {
    id: 'networking',
    tag: 'Connect',
    title: 'Enterprise Networking & 5G Mobility',
    summary:
      'Resilient networks that blend fiber, cellular, and satellite links — engineered to stay up when any single connection fails.',
    detail:
      'We design and deploy enterprise networks built for continuity: multi-WAN architectures that bond cellular (5G/LTE), satellite, and fixed lines into one dependable connection, with automatic failover, SD-WAN policy control, and centralized remote management. From branch offices to vehicles, vessels, and remote sites, your operation stays online — in the office, on the move, or off the grid.',
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M12 20v-6" />
        <circle cx="12" cy="20" r="1.4" fill="currentColor" stroke="none" />
        <path d="M7.5 10.5a6.4 6.4 0 0 1 9 0" />
        <path d="M4.6 7.4a10.5 10.5 0 0 1 14.8 0" />
        <path d="M2 4.2a14.5 14.5 0 0 1 20 0" />
      </svg>
    ),
  },
  {
    id: 'software',
    tag: 'Build',
    title: 'Outsourced Software Development',
    summary:
      'A senior engineering team on demand — web platforms, integrations, and internal tools delivered to production standards.',
    detail:
      'Extend your team with engineers who ship. We take products and internal systems from specification to production: modern web applications, API and systems integration, cloud services, and the unglamorous middleware that makes separate platforms behave like one. Fixed-scope projects or ongoing embedded teams — your call.',
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M8 8l-4 4 4 4" />
        <path d="M16 8l4 4-4 4" />
        <path d="M13.5 5l-3 14" />
      </svg>
    ),
  },
  {
    id: 'ai',
    tag: 'Reason',
    title: 'AI Consulting',
    summary:
      'Practical AI adoption: identify the use cases that pay off, then build and integrate them safely into your workflows.',
    detail:
      'We help organizations move from AI curiosity to AI capability. That means honest use-case assessment, model and vendor selection, retrieval and automation pipelines built on your own data, and governance that keeps deployments safe and auditable. No moonshots for their own sake — measurable wins, integrated into the tools your teams already use.',
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <rect x="7" y="7" width="10" height="10" rx="2" />
        <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
      </svg>
    ),
  },
  {
    id: 'digital-twin',
    tag: 'Mirror',
    title: 'Digital Twin Integration',
    summary:
      'Interactive 3D replicas of your facilities and infrastructure, connected to live data — explore, simulate, and operate remotely.',
    detail:
      'We turn complex physical environments — data centers, plants, campuses, transport hubs — into operational digital twins: navigable 3D environments tied to live telemetry from your building and monitoring systems. Walk stakeholders through a facility from anywhere, test changes virtually before committing capital, train teams in lifelike simulations, and monitor operations with full spatial context. Deployed in days and weeks, not quarters.',
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2z" />
        <path d="M12 2v9m0 0l8-4.5M12 11l-8-4.5" />
        <path d="M12 20v-9" strokeDasharray="2 2.5" />
      </svg>
    ),
  },
  {
    id: 'infrastructure',
    tag: 'Ground',
    title: 'Cabling & Data Center Solutions',
    summary:
      'Structured cabling, racks, power, and cooling — the physical layer done right, documented, and built to grow.',
    detail:
      'Every reliable system stands on clean physical infrastructure. We deliver structured cabling (copper and fiber), rack and enclosure builds, power and cooling planning, and full labeling and documentation — for new builds, refits, and expansions. Neat today, traceable in five years.',
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <rect x="4" y="3" width="16" height="6" rx="1.5" />
        <rect x="4" y="12" width="16" height="6" rx="1.5" />
        <path d="M7.5 6h.01M7.5 15h.01" strokeWidth="2.6" />
        <path d="M12 6h5M12 15h5" />
        <path d="M8 18v3h8v-3" opacity="0" />
      </svg>
    ),
  },
  {
    // Added Oct 2026. Deliberately names no vendor and no product
    // brand, and that is a standing requirement rather than an
    // oversight: Apex offers a capability here, and naming the
    // technology underneath would turn that capability into a resale.
    // Keep this entry vendor-neutral when editing.
    id: 'surveillance',
    tag: 'Watch',
    title: 'Video Surveillance & Monitoring',
    summary:
      'Camera systems that record and analyse on site — people and vehicle detection, remote review from anywhere, and footage that stays on your property. NDAA-safe hardware throughout.',
    detail:
      "Camera systems designed, installed and maintained for your site. Recording and analysis happen on the premises rather than in someone else's cloud, so footage stays on your property and keeps recording when the internet does not. People and vehicle detection rather than motion alerts, remote review from anywhere, and NDAA-safe hardware throughout. Deployed on its own or alongside the network that carries it.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M3 4.5v9" />
        <path d="M3 9h3.5" />
        <rect x="6.5" y="6" width="10" height="6" rx="1.8" />
        <circle cx="19.5" cy="9" r="1.8" />
      </svg>
    ),
  },
]

// Both the home page and the services page open by stating how many
// disciplines there are. Those were typed as "Five" and stayed "Five"
// after the sixth was added. Derived from the array, they cannot.
// Capitalised because both uses begin a sentence.
const NUMBER_WORDS = [
  'Zero', 'One', 'Two', 'Three', 'Four', 'Five',
  'Six', 'Seven', 'Eight', 'Nine', 'Ten',
]

export const serviceCountWord =
  NUMBER_WORDS[services.length] ?? String(services.length)

// Short labels for the footer column, where the full titles are too
// long to sit on one line. Kept here next to the titles they shorten,
// not in Footer.jsx, so adding a service means touching one file.
//
// The footer was the fourth hand-written copy of this list (after the
// cards, the contact dropdown and the About sentence) and the fourth
// one to be missing a service that had already shipped.
const SHORT_TITLES = {
  networking: 'Networking & 5G mobility',
  software: 'Software development',
  ai: 'AI consulting',
  'digital-twin': 'Digital twin integration',
  infrastructure: 'Cabling & data centers',
  surveillance: 'Video surveillance & monitoring',
}

/**
 * [{ id, label }] for the footer, derived from the catalog so the two
 * cannot disagree about which services exist.
 *
 * A service with no short label falls back to its full title rather
 * than vanishing from the footer - a slightly long line is a far better
 * failure than a silently missing service, which is the exact bug this
 * replaces.
 */
export const footerServiceLinks = services.map((s) => ({
  id: s.id,
  label: SHORT_TITLES[s.id] ?? s.title,
}))
