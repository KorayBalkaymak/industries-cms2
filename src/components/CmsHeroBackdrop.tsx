export default function CmsHeroBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-navy-950" aria-hidden>
      <div className="cms-hero-mesh absolute inset-0" />
      <div className="cms-hero-grid absolute inset-0 opacity-40" />

      <div
        className="cms-hero-pattern absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`
            <svg xmlns='http://www.w3.org/2000/svg' width='180' height='130' viewBox='0 0 180 130'>
              <text x='6' y='38' fill='%23ffffff' fill-opacity='0.06' font-family='Inter,Arial,sans-serif' font-size='26' font-weight='800'>CMS</text>
              <text x='92' y='92' fill='%23FF5722' fill-opacity='0.08' font-family='Inter,Arial,sans-serif' font-size='20' font-weight='800'>CMS</text>
              <text x='48' y='118' fill='%23ffffff' fill-opacity='0.04' font-family='Inter,Arial,sans-serif' font-size='16' font-weight='800'>CMS</text>
            </svg>
          `)}")`,
        }}
      />

      <div className="cms-hero-sweep absolute -left-1/4 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-accent-500/15 to-transparent" />
      <div className="cms-hero-orb cms-hero-orb-a absolute -right-20 top-10 h-72 w-72 rounded-full bg-accent-500/25 blur-3xl" />
      <div className="cms-hero-orb cms-hero-orb-b absolute -bottom-24 left-1/4 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="cms-hero-orb cms-hero-orb-c absolute right-1/3 top-1/2 h-56 w-56 rounded-full bg-blue-500/15 blur-3xl" />

      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/96 to-navy-950/88" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-transparent to-navy-950/35" />
    </div>
  );
}
