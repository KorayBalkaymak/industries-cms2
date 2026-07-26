import BrandLogo from '@/components/BrandLogo';

/** Hero backdrop with CMS branding and floating logo visual. */
export default function HomeHeroBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-navy-950" aria-hidden>
      <div className="cms-hero-mesh absolute inset-0" />
      <div className="cms-hero-grid absolute inset-0 opacity-35" />

      <div
        className="cms-hero-pattern absolute inset-0 opacity-80"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`
            <svg xmlns='http://www.w3.org/2000/svg' width='180' height='130' viewBox='0 0 180 130'>
              <text x='6' y='38' fill='%23ffffff' fill-opacity='0.05' font-family='Inter,Arial,sans-serif' font-size='26' font-weight='800'>CMS</text>
              <text x='92' y='92' fill='%23FF5722' fill-opacity='0.07' font-family='Inter,Arial,sans-serif' font-size='20' font-weight='800'>CMS</text>
            </svg>
          `)}")`,
        }}
      />

      <div className="cms-hero-sweep absolute -left-1/4 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-accent-500/18 to-transparent" />
      <div className="cms-hero-orb cms-hero-orb-a absolute -right-16 top-16 h-80 w-80 rounded-full bg-accent-500/25 blur-3xl" />
      <div className="cms-hero-orb cms-hero-orb-b absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-orange-500/15 blur-3xl" />

      <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-10 sm:items-center sm:pb-0 lg:inset-y-0 lg:justify-end lg:pr-4 xl:pr-10">
        <div className="home-hero-column-visual cms-hero-visual-float relative w-[min(88vw,16rem)] sm:w-[min(72vw,18rem)] lg:w-[min(30vw,20rem)] xl:w-[min(26vw,22rem)]">
          <BrandLogo variant="hero" className="w-full justify-center" />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/93 via-[38%] to-navy-950/20 to-100% lg:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/10 to-navy-950/45" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_68%_40%,rgba(255,87,34,0.16),transparent_62%)]" />
    </div>
  );
}
