import type { ReactElement } from 'react'
import type { PartnerId } from '@/data/content'

const LOGO_LABELS: Record<PartnerId, string> = {
  'cloud-education': 'Cloud Education',
  cmc: 'CMC',
  snp: 'SNP',
  zebec: 'Zebec',
}

const LOGOS: Record<PartnerId, ReactElement> = {
  'cloud-education': (
    <svg viewBox="0 0 90 64" className="h-full w-auto" fill="none" aria-hidden="true">
      <path
        d="M24 40a12 12 0 0 1 1.5-23.9A16 16 0 0 1 56 14a13 13 0 0 1 6 25.6"
        stroke="#1f1f1f"
        strokeWidth="4.2"
        strokeLinecap="round"
      />
      <path d="M31 25h13v14H31zM44 25h13v14H44z" fill="#1f1f1f" />
      <path d="M32.5 27h10v10h-10zM45.5 27h10v10h-10z" fill="#fff" opacity="0.9" />
      <circle cx="68" cy="15" r="1.7" fill="#1f1f1f" />
      <circle cx="73" cy="10" r="1.3" fill="#1f1f1f" />
      <circle cx="73" cy="19" r="1.3" fill="#1f1f1f" />
      <text x="45" y="59" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="8.5" fontWeight="600" fill="#1f1f1f">
        Cloud Education
      </text>
    </svg>
  ),
  cmc: (
    <svg viewBox="0 0 96 40" className="h-full w-auto" fill="none" aria-hidden="true">
      <path
        d="M20 3l4 11 11-2-8 8 9 7-11-1-2 12-5-10-10 6 4-11L2 20l12-1-3-11 7 6z"
        fill="#2b2b2b"
      />
      <text x="38" y="27" fontFamily="Outfit, sans-serif" fontSize="19" fontWeight="600" fill="#2b2b2b" letterSpacing="0.5">
        CMC
      </text>
    </svg>
  ),
  snp: (
    <svg viewBox="0 0 84 40" className="h-full w-auto" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="17" fill="#1f1f1f" stroke="#1f1f1f" strokeWidth="2" strokeDasharray="3 2.6" />
      <circle cx="20" cy="20" r="14" fill="#1f1f1f" stroke="#fff" strokeWidth="1.4" />
      <path d="M12 12h5v16h-5zM23 12h5v16h-5zM12 18h16v4H12z" fill="#fff" />
      <text x="42" y="26" fontFamily="Outfit, sans-serif" fontSize="14" fontWeight="600" fill="#1f1f1f">
        SNP
      </text>
    </svg>
  ),
  zebec: (
    <svg viewBox="0 0 96 40" className="h-full w-auto" fill="none" aria-hidden="true">
      <path d="M4 17h26c0 8-5.5 13-13 13S4 25 4 17z" stroke="#7a7a7a" strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M8 12h18M11 8h12" stroke="#7a7a7a" strokeWidth="2.6" strokeLinecap="round" />
      <text x="36" y="26" fontFamily="Outfit, sans-serif" fontSize="17" fontWeight="600" fill="#7a7a7a">
        Zebec
      </text>
    </svg>
  ),
}

export function PartnerLogo({ id }: { id: PartnerId }) {
  return (
    <div role="img" aria-label={LOGO_LABELS[id]} className="h-11 sm:h-14 lg:h-[4.5rem]">
      {LOGOS[id]}
    </div>
  )
}
