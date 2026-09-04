'use client';

import Image from 'next/image';

interface CompanyLogo {
  name: string;
  logo: React.ReactNode;
}

const companies: CompanyLogo[] = [
  {
    name: 'Shopify',
    logo: (
      <Image
        src="/shopify-logo.png"
        alt="Shopify"
        width={110}
        height={36}
        className="object-contain h-8 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300 dark:invert"
      />
    ),
  },
  {
    name: 'Ernst & Young',
    logo: (
      <svg
        viewBox="0 0 120 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300"
        aria-label="Ernst & Young"
      >
        <text
          x="0"
          y="30"
          fontFamily="Arial, sans-serif"
          fontWeight="700"
          fontSize="28"
          fill="currentColor"
          letterSpacing="-1"
        >
          EY
        </text>
        <rect x="38" y="6" width="3" height="28" fill="hsl(160,84%,39%)" rx="1" />
        <text
          x="46"
          y="22"
          fontFamily="Arial, sans-serif"
          fontWeight="400"
          fontSize="10"
          fill="currentColor"
          opacity="0.7"
        >
          Ernst &amp; Young
        </text>
      </svg>
    ),
  },
  {
    name: 'Wipro',
    logo: (
      <svg
        viewBox="0 0 100 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300"
        aria-label="Wipro"
      >
        <text
          x="0"
          y="26"
          fontFamily="Arial, sans-serif"
          fontWeight="700"
          fontSize="26"
          fill="currentColor"
        >
          Wipro
        </text>
        <circle cx="90" cy="14" r="5" fill="hsl(160,84%,39%)" />
        <circle cx="96" cy="22" r="3.5" fill="hsl(160,84%,39%)" opacity="0.6" />
      </svg>
    ),
  },
  {
    name: 'Siemens',
    logo: (
      <svg
        viewBox="0 0 120 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300"
        aria-label="Siemens"
      >
        <text
          x="0"
          y="26"
          fontFamily="Arial, sans-serif"
          fontWeight="700"
          fontSize="22"
          fill="currentColor"
          letterSpacing="1"
        >
          SIEMENS
        </text>
      </svg>
    ),
  },
  {
    name: 'West Berkshire Council',
    logo: (
      <svg
        viewBox="0 0 160 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300"
        aria-label="West Berkshire Council"
      >
        <rect x="0" y="8" width="4" height="20" rx="2" fill="hsl(160,84%,39%)" />
        <text
          x="10"
          y="16"
          fontFamily="Arial, sans-serif"
          fontWeight="700"
          fontSize="10"
          fill="currentColor"
          letterSpacing="0.5"
        >
          WEST BERKSHIRE
        </text>
        <text
          x="10"
          y="28"
          fontFamily="Arial, sans-serif"
          fontWeight="400"
          fontSize="10"
          fill="currentColor"
          opacity="0.7"
          letterSpacing="0.5"
        >
          COUNCIL
        </text>
      </svg>
    ),
  },
];

// Duplicate for seamless infinite scroll
const doubled = [...companies, ...companies];

export function CompanyLogos() {
  return (
    <section className="py-10 relative z-10 border-t border-border/30">
      <p className="text-xs text-muted-foreground dark:text-muted-foreground/50 uppercase tracking-[0.2em] text-center mb-7">
        where i&apos;ve worked
      </p>

      {/* Marquee wrapper */}
      <div className="relative overflow-hidden">
        {/* Fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-background to-transparent" />

        <div className="flex gap-14 items-center animate-logo-scroll w-max">
          {doubled.map((company, i) => (
            <div
              key={`${company.name}-${i}`}
              className="flex items-center justify-center flex-shrink-0 px-4"
              title={company.name}
            >
              {company.logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
