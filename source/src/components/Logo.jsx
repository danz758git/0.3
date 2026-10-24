// The pterosaur mark, drawn inline so it stays crisp at any size and can
// inherit theme colors. `body` defaults to light for use on dark surfaces.
export default function Logo({ body = '#F3F5F2', height = 34 }) {
  return (
    <svg
      viewBox="120 20 360 200"
      height={height}
      role="img"
      aria-label="Apex Integration pterosaur mark"
    >
      <path d="M330 118 L468 30 L380 104 L352 116 Z" fill="#C77F1F" />
      <path
        d="M472 104 L410 90 L380 54 L376 92 L340 106 L238 146 L318 126 L408 106 Z"
        fill={body}
      />
      <path d="M352 112 L272 84 L128 206 L300 138 Z" fill="#E9A23B" />
    </svg>
  )
}
