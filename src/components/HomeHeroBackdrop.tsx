type ColumnSpec = {
  cx: number;
  width: number;
  height: number;
  top: number;
  flare?: boolean;
  accentSide?: 'left' | 'right';
};

function RefineryColumn({
  cx,
  width,
  height,
  top,
  flare = false,
  accentSide = 'right',
  bandPhase = 0,
}: ColumnSpec & { bandPhase?: number }) {
  const half = width / 2;
  const bandStep = Math.max(36, Math.floor(height / 7));
  const bands = Array.from({ length: Math.min(8, Math.floor(height / bandStep)) }, (_, i) => top + 28 + i * bandStep);

  const ladderX = accentSide === 'right' ? cx + half - 6 : cx - half + 6;

  return (
    <g>
      <rect
        x={cx - half}
        y={top}
        width={width}
        height={height}
        rx={6}
        fill="url(#homeColBody)"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="1.2"
      />
      <rect
        x={cx - half}
        y={top}
        width={width}
        height={height}
        rx={6}
        fill="url(#homeColShine)"
        opacity={0.75}
      />

      {bands.map((y, i) => (
        <g key={y}>
          <ellipse
            cx={cx}
            cy={y}
            rx={half - 2}
            ry={Math.max(4, width * 0.11)}
            fill="rgba(15,23,42,0.92)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.8"
          />
          <ellipse
            cx={cx}
            cy={y}
            rx={half - 2}
            ry={Math.max(4, width * 0.11)}
            fill="none"
            stroke="rgba(255,87,34,0.4)"
            strokeWidth="0.9"
            strokeDasharray="3 7"
            className="home-hero-band-pulse"
            style={{ animationDelay: `${(i + bandPhase) * 0.38}s` }}
          />
        </g>
      ))}

      <path
        d={`M ${cx - half + 8} ${top} L ${cx} ${top - 22} L ${cx + half - 8} ${top} Z`}
        fill="#1e293b"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1"
      />
      <ellipse
        cx={cx}
        cy={top}
        rx={half - 10}
        ry={5}
        fill="rgba(255,87,34,0.22)"
        className="home-hero-stack-glow"
        style={{ animationDelay: `${bandPhase * 0.2}s` }}
      />

      {flare && (
        <path
          d={`M ${cx} ${top - 24} Q ${cx + 8} ${top - 44} ${cx} ${top - 58} Q ${cx - 8} ${top - 44} ${cx} ${top - 24}`}
          fill="rgba(255,87,34,0.55)"
          className="home-hero-flare-pulse"
        />
      )}

      <line
        x1={ladderX}
        y1={top + 16}
        x2={ladderX}
        y2={top + height - 12}
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1.5"
        strokeDasharray="4 6"
      />
    </g>
  );
}

const COLUMNS: ColumnSpec[] = [
  { cx: 88, width: 48, height: 250, top: 118, accentSide: 'right' },
  { cx: 168, width: 54, height: 300, top: 88, accentSide: 'left' },
  { cx: 268, width: 62, height: 340, top: 58, flare: true, accentSide: 'right' },
  { cx: 368, width: 56, height: 290, top: 98, accentSide: 'left' },
  { cx: 452, width: 50, height: 230, top: 138, accentSide: 'right' },
];

/** Multiple refinery columns — no photo. */
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

      <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-6 sm:items-center sm:pb-0 lg:inset-y-0 lg:justify-end lg:pr-2 xl:pr-8">
        <div className="home-hero-column-visual cms-hero-visual-float relative w-[min(112vw,28rem)] sm:w-[min(96vw,32rem)] lg:w-[min(54vw,34rem)] xl:w-[min(50vw,38rem)]">
          <div className="absolute -inset-10 rounded-full bg-accent-500/12 blur-3xl" />
          <div className="home-hero-column-glow absolute bottom-[22%] left-1/2 h-56 w-[72%] -translate-x-1/2 rounded-full bg-accent-500/20 blur-3xl" />

          <svg viewBox="0 0 540 460" className="relative h-auto w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="homeColBody" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#334155" />
                <stop offset="0.5" stopColor="#475569" />
                <stop offset="1" stopColor="#1e293b" />
              </linearGradient>
              <linearGradient id="homeColShine" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#FF5722" stopOpacity="0" />
                <stop offset="0.45" stopColor="#FF5722" stopOpacity="0.28" />
                <stop offset="1" stopColor="#FF5722" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Pipe rack & cross connections */}
            <path d="M 48 388 H 492" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeLinecap="round" />
            <path d="M 48 408 H 492" stroke="rgba(255,87,34,0.25)" strokeWidth="1.5" strokeLinecap="round" className="home-hero-pipe-flow" />
            <path d="M 88 220 H 452" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" />
            <path
              d="M 120 280 H 420"
              stroke="rgba(255,87,34,0.2)"
              strokeWidth="1.2"
              strokeDasharray="6 10"
              className="home-hero-pipe-flow"
              style={{ animationDelay: '1.2s' }}
            />
            {COLUMNS.map((col) => (
              <path
                key={`pipe-${col.cx}`}
                d={`M ${col.cx} ${col.top + col.height} L ${col.cx} 408`}
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ))}

            <rect x="40" y="388" width="460" height="10" rx="2" fill="rgba(255,255,255,0.05)" />

            {COLUMNS.map((col, i) => (
              <RefineryColumn key={col.cx} {...col} bandPhase={i} />
            ))}

            {/* Foreground structural hints */}
            <path
              d="M 52 420 L 52 360 M 488 420 L 488 350"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/93 via-[38%] to-navy-950/20 to-100% lg:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/10 to-navy-950/45" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_68%_40%,rgba(255,87,34,0.16),transparent_62%)]" />
    </div>
  );
}
