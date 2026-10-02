/** Small illustrated tech badges shown in the "All Courses" card. */

export function ReactBadge() {
  return (
    <svg viewBox="0 0 64 64" className="size-full" aria-label="React">
      <title>React</title>
      <rect x="4" y="4" width="56" height="56" rx="16" fill="#5cb6e8" transform="rotate(-8 32 32)" />
      <g transform="rotate(-8 32 32)" fill="none" stroke="#fff" strokeWidth="2.6">
        <ellipse cx="32" cy="32" rx="19" ry="7.5" />
        <ellipse cx="32" cy="32" rx="19" ry="7.5" transform="rotate(60 32 32)" />
        <ellipse cx="32" cy="32" rx="19" ry="7.5" transform="rotate(120 32 32)" />
        <circle cx="32" cy="32" r="3.4" fill="#fff" stroke="none" />
      </g>
    </svg>
  )
}

export function CommunityBadge() {
  return (
    <svg viewBox="0 0 64 64" className="size-full" aria-label="Community">
      <title>Community</title>
      <rect x="8" y="12" width="34" height="30" rx="9" fill="#3d8bfd" />
      <path d="M14 42v9l10-9z" fill="#3d8bfd" />
      <path d="M20 21l-2 15M28 21l-2 15M15 26h18M14 32h18" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
      <rect x="33" y="24" width="24" height="22" rx="8" fill="#ffb03b" />
      <path
        d="M45 40.5s-6-3.6-6-7.2a3.2 3.2 0 0 1 6-1.5 3.2 3.2 0 0 1 6 1.5c0 3.6-6 7.2-6 7.2z"
        fill="#e8395b"
      />
    </svg>
  )
}

export function VueBadge() {
  return (
    <svg viewBox="0 0 64 64" className="size-full" aria-label="Vue.js">
      <title>Vue.js</title>
      <path d="M6 10h13l13 22 13-22h13L32 56z" fill="#41b883" />
      <path d="M19 10h9l4 7 4-7h9L32 38z" fill="#34495e" />
      <text x="32" y="62" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="9" fontWeight="700" fill="#34495e">
        VueJS
      </text>
    </svg>
  )
}

export function DesignBadge() {
  return (
    <svg viewBox="0 0 64 64" className="size-full" aria-label="Design">
      <title>Design</title>
      <circle cx="30" cy="34" r="22" fill="#fff4d6" />
      <path d="M10 34a22 22 0 0 1 22-22c-4 8-4 16 0 24s2 14-6 20A22 22 0 0 1 10 34z" fill="#f4a33a" opacity="0.9" />
      <path d="M18 24c6-6 14-8 22-6-4 6-8 10-14 14z" fill="#e8567c" />
      <path d="M22 42c6-4 12-8 18-16l8-10c2-2 5 0 3 3L38 46c-4 4-10 6-16 6z" fill="#3aa6a0" />
      <path d="M50 12c2-2 5 0 3 3l-6 8-4-3z" fill="#1c1c1c" />
    </svg>
  )
}
