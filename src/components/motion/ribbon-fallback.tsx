/** Original decorative SVG; not an image of the gym or an imported reference asset. */
export function RibbonFallback({ id = 'hero-ribbon-metal' }: { id?: string }) {
  return (
    <svg
      className="ribbon-fallback"
      viewBox="0 0 720 620"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id={id}
          x1="80"
          y1="40"
          x2="650"
          y2="600"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f5f2eb" />
          <stop offset="0.28" stopColor="#a5a3a1" />
          <stop offset="0.5" stopColor="#f5f2eb" />
          <stop offset="0.64" stopColor="#e21b23" />
          <stop offset="1" stopColor="#51090e" />
        </linearGradient>
      </defs>
      {[190, 232, 274, 316, 358, 400, 442].map((radius) => (
        <g key={radius}>
          <circle
            cx="490"
            cy="510"
            r={radius}
            stroke="#e21b23"
            strokeWidth="17"
            opacity="0.06"
          />
          <circle
            cx="490"
            cy="510"
            r={radius}
            stroke={`url(#${id})`}
            strokeWidth="10"
          />
          <circle
            cx="490"
            cy="510"
            r={radius - 5}
            stroke="#f5f2eb"
            strokeWidth="0.7"
            opacity="0.35"
          />
        </g>
      ))}
    </svg>
  );
}
