import { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Award, Users, GitBranch, BadgeCheck } from 'lucide-react';

const expertHighlights: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Award,
    title: 'Erfahrene Experten',
    desc: 'Langjährige Projekterfahrung in internationalen Industrieprojekten.',
  },
  {
    icon: Users,
    title: 'Schnell verfügbar',
    desc: 'Großes Netzwerk an Spezialisten  schnelle Besetzung Ihrer Projekte.',
  },
  {
    icon: GitBranch,
    title: 'Flexibel & bedarfsgerecht',
    desc: 'Einsatz nach Ihrem Bedarf  kurzfristig oder langfristig.',
  },
  {
    icon: BadgeCheck,
    title: 'Qualität & Verlässlichkeit',
    desc: 'Geprüfte Fachkompetenz und zuverlässige Projektunterstützung.',
  },
];

function useScrollConnection(itemCount: number) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [connectedCount, setConnectedCount] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const update = () => {
      if (reducedMotion) {
        setProgress(1);
        setConnectedCount(itemCount);
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      const start = viewHeight * 0.88;
      const end = viewHeight * 0.22;
      const travel = rect.height + (start - end);
      const raw = (start - rect.top) / travel;
      const p = Math.min(1, Math.max(0, raw));
      setProgress(p);
      setConnectedCount(Math.min(itemCount, Math.ceil(p * itemCount)));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [itemCount]);

  return { sectionRef, progress, connectedCount };
}

export default function ExpertHighlightsSection() {
  const { sectionRef, progress, connectedCount } = useScrollConnection(expertHighlights.length);
  const lineProgress = `${Math.round(progress * 100)}%`;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-navy-950 py-24"
      aria-label="Ihre Vorteile"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 20%, rgba(255,87,34,0.15) 0, transparent 45%), radial-gradient(circle at 85% 80%, rgba(51,65,85,0.5) 0, transparent 50%)',
        }}
      />
      <div className="container-px relative">
        <div className="relative">
          <div
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[3.25rem] hidden h-px lg:block"
            aria-hidden
          >
            <div className="absolute inset-0 bg-navy-700/80" />
            <div
              className="absolute left-0 top-0 h-full origin-left bg-gradient-to-r from-accent-500 to-accent-400 transition-[width] duration-150 ease-out"
              style={{ width: lineProgress }}
            />
          </div>

          <div
            className="pointer-events-none absolute bottom-8 left-[1.65rem] top-8 w-px lg:hidden"
            aria-hidden
          >
            <div className="absolute inset-0 bg-navy-700/80" />
            <div
              className="absolute left-0 top-0 w-full origin-top bg-gradient-to-b from-accent-500 to-accent-400 transition-[height] duration-150 ease-out"
              style={{ height: lineProgress }}
            />
          </div>

          <div className="grid items-stretch gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {expertHighlights.map((item, index) => {
              const HighlightIcon = item.icon;
              const isConnected = index < connectedCount;
              const isActive = index === connectedCount - 1 && connectedCount > 0;

              return (
                <div
                  key={item.title}
                  className={`relative flex h-full flex-col pl-12 transition-all duration-700 ease-out lg:pl-0 ${
                    isConnected ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-35'
                  }`}
                >
                  <div
                    className={`absolute left-0 top-8 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-500 lg:left-1/2 lg:top-0 lg:-translate-x-1/2 ${
                      isConnected
                        ? 'border-accent-500 bg-accent-500 shadow-lg shadow-accent-500/40'
                        : 'border-navy-600 bg-navy-900'
                    } ${isActive ? 'scale-110 ring-4 ring-accent-500/25' : ''}`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full transition-colors ${isConnected ? 'bg-white' : 'bg-navy-600'}`}
                    />
                  </div>

                  <article
                    className={`relative mt-10 flex flex-1 flex-col rounded-xl border p-7 backdrop-blur-sm transition-all duration-700 lg:mt-14 ${
                      isConnected
                        ? 'border-accent-500/35 bg-navy-900/90 shadow-xl shadow-black/20'
                        : 'border-navy-800/80 bg-navy-900/50'
                    }`}
                  >
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-lg transition-colors duration-500 ${
                        isConnected
                          ? 'bg-accent-500 text-white'
                          : 'border border-navy-700 bg-navy-800/80 text-navy-400'
                      }`}
                    >
                      <HighlightIcon className="h-6 w-6" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-5 text-base font-bold text-white">{item.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-300">{item.desc}</p>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
