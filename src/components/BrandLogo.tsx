type BrandLogoProps = {
  className?: string;
  variant?: 'header' | 'footer';
};

export default function BrandLogo({ className = '', variant = 'header' }: BrandLogoProps) {
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
