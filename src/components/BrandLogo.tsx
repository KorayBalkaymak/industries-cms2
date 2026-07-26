type BrandLogoProps = {
  className?: string;
  variant?: 'header' | 'footer' | 'hero';
};

export default function BrandLogo({ className = '', variant = 'header' }: BrandLogoProps) {
  if (variant === 'hero') {
    return (
      <div
        className={`group relative inline-flex ${className}`}
        aria-label="Industries CMS – Construction Management Solution"
      >
        <div
          className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-accent-500/25 blur-3xl home-hero-column-glow"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -inset-3 rounded-[1.75rem] border border-accent-500/30 opacity-70 home-hero-logo-ring"
          aria-hidden
        />

        <div className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] ring-2 ring-accent-500 sm:p-6">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-500 via-accent-400 to-accent-500/40"
            aria-hidden
          />
          <img
            src="/images/industries-cms-logo.png"
            alt="Industries CMS – Construction Management Solution"
            className="relative mx-auto h-auto w-full max-w-[11rem] object-contain sm:max-w-[13rem] lg:max-w-[14rem]"
            draggable={false}
          />
        </div>
      </div>
    );
  }

  const isHeader = variant === 'header';
  const sizeClass = isHeader ? 'h-14 w-14 sm:h-16 sm:w-16' : 'h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]';
  const imageClass = isHeader ? 'h-9 w-9 sm:h-10 sm:w-10' : 'h-10 w-10 sm:h-11 sm:w-11';

  return (
    <div
      className={`group relative inline-flex ${className}`}
      aria-label="Industries CMS – Construction Management Solution"
    >
      <div
        className={`pointer-events-none absolute rounded-full bg-accent-500/30 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100 ${
          isHeader ? '-inset-2' : '-inset-3'
        }`}
        aria-hidden
      />

      <div
        className={`relative flex items-center justify-center rounded-full bg-white shadow-[0_8px_32px_rgba(0,0,0,0.28)] ring-2 ring-accent-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_12px_40px_rgba(255,87,34,0.25)] group-hover:ring-accent-400 ${sizeClass} ${
          isHeader ? 'sm:-mb-0.5' : ''
        }`}
      >
        <img
          src="/images/industries-cms-logo.png"
          alt=""
          className={`object-contain ${imageClass}`}
          draggable={false}
        />
      </div>
    </div>
  );
}
