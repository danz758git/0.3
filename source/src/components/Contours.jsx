// Topographic contour lines — terrain seen from altitude. The site's
// signature motif: "see the bigger picture" rendered literally.
export default function Contours({ className = 'hero__contours' }) {
  const rings = [
    'M 900 620 q -240 -170 -60 -300 q 150 -105 330 -30 q 200 85 120 230 q -85 155 -390 100 Z',
    'M 880 585 q -190 -140 -45 -250 q 125 -90 275 -25 q 165 70 100 190 q -70 130 -330 85 Z',
    'M 865 550 q -145 -110 -30 -200 q 100 -75 220 -20 q 130 55 80 150 q -55 105 -270 70 Z',
    'M 850 515 q -100 -80 -18 -148 q 72 -55 160 -15 q 95 40 58 110 q -40 78 -200 53 Z',
    'M 300 700 q -220 -120 -90 -260 q 110 -115 300 -75 q 210 45 160 200 q -50 160 -370 135 Z',
    'M 290 655 q -170 -95 -70 -205 q 88 -92 235 -60 q 165 36 126 158 q -40 125 -291 107 Z',
    'M 280 610 q -125 -70 -50 -152 q 65 -70 172 -45 q 122 27 93 117 q -30 92 -215 80 Z',
  ]
  return (
    <svg
      className={className}
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <g fill="none" stroke="#E9A23B" strokeOpacity="0.16" strokeWidth="1.5">
        {rings.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <g fill="none" stroke="#8FB6C9" strokeOpacity="0.10" strokeWidth="1">
        <path d="M 0 480 Q 300 430 600 470 T 1200 450" />
        <path d="M 0 540 Q 300 495 600 530 T 1200 515" />
        <path d="M 0 600 Q 300 560 600 592 T 1200 578" />
      </g>
    </svg>
  )
}
