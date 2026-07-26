import { useId } from 'react';

type CmsIndustriesLogoProps = {
  className?: string;
  /** Hero: white panel on dark background. Flat: logo only on white/light. */
  variant?: 'panel' | 'flat';
};

const NAVY = '#0B132B';
const ORANGE = '#FF5722';

function useLogoClipId() {
  return useId().replace(/:/g, '');
}

export default function CmsIndustriesLogo({ className = '', variant = 'panel' }: CmsIndustriesLogoProps) {
  const clipId = useLogoClipId();

  const inner = (
    <div className={`select-none text-center ${className}`}>
      <p className="text-[13px] font-medium tracking-[0.02em] text-navy-700 sm:text-sm">Industries</p>
      <svg
        viewBox="0 0 280 88"
        className="mx-auto mt-1 h-[4.5rem] w-auto sm:h-[5.25rem] lg:h-[6.5rem]"
        aria-label="CMS"
        role="img"
      >
        <defs>
          <clipPath id={`${clipId}-orange`}>
            <polygon points="116,6 148,6 134,82 116,82" />
          </clipPath>
          <clipPath id={`${clipId}-navy`}>
            <polygon points="148,6 198,6 198,82 134,82" />
          </clipPath>
        </defs>
        <text
          x="28"
          y="70"
          fill={NAVY}
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="68"
          fontWeight="800"
        >
          C
        </text>
        <text
          x="116"
          y="70"
          fill={ORANGE}
          clipPath={`url(#${clipId}-orange)`}
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="68"
          fontWeight="800"
        >
          M
        </text>
        <text
          x="116"
          y="70"
          fill={NAVY}
          clipPath={`url(#${clipId}-navy)`}
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="68"
          fontWeight="800"
        >
          M
        </text>
        <text
          x="210"
          y="70"
          fill={ORANGE}
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="68"
          fontWeight="800"
        >
          S
        </text>
      </svg>
      <p className="mt-2 text-[10px] font-medium leading-snug text-navy-800 sm:text-[11px]">
        Construction Management
        <br />
        Solution
      </p>
    </div>
  );

  if (variant === 'flat') {
    return inner;
  }

  return (
    <div className="rounded-2xl border border-white/20 bg-white px-8 py-7 shadow-2xl shadow-black/30 sm:px-10 sm:py-8">
      {inner}
    </div>
  );
}
