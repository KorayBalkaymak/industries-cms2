import { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { projectPhases } from '@/data';

function getSegmentProgress(lineProgress: number, segmentIndex: number, segmentCount: number) {
  const p = lineProgress * segmentCount - segmentIndex;
  return Math.min(1, Math.max(0, p));
}

function useCycleProgress(stepCount: number) {
  const sectionRef = useRef<HTMLElement>(null);
  const [lineProgress, setLineProgress] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>(() => Array(stepCount).fill(false));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const updateLine = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.8;
      const end = vh * 0.22;
      const travel = rect.height + (start - end);
      const raw = (start - rect.top) / travel;
      setLineProgress(Math.min(1, Math.max(0, raw)));
    };

    if (reducedMotion) {
      setLineProgress(1);
      setVisibleSteps(Array(stepCount).fill(true));
      return;
    }

    const cards = section.querySelectorAll('[data-cycle-phase]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (Number.isNaN(index)) return;
          setVisibleSteps((prev) => {
            if (prev[index]) return prev;
            const next = [...prev];
            next[index] = true;
            return next;
          });
        });
      },
      { rootMargin: '-4% 0px -4% 0px', threshold: 0.15 },
    );

    cards.forEach((el) => observer.observe(el));
    updateLine();
    window.addEventListener('scroll', updateLine, { passive: true });
    window.addEventListener('resize', updateLine);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateLine);
      window.removeEventListener('resize', updateLine);
    };
  }, [stepCount]);

  return { sectionRef, lineProgress, visibleSteps };
}

function CycleConnector({
  progress,
  direction = 'horizontal',
}: {
  progress: number;
  direction?: 'horizontal' | 'vertical';
}) {
  const isActive = progress > 0.85;

  if (direction === 'vertical') {
    return (
      <div className="flex flex-col items-center py-2" aria-hidden>
        <div className="relative h-10 w-0.5 overflow-hidden rounded-full bg-navy-100">
          <div
            className="cycle-connector-fill absolute left-0 top-0 w-full rounded-full bg-gradient-to-b from-accent-500 to-navy-900 transition-[height] duration-300 ease-out"
            style={{ height: `${Math.round(progress * 100)}%` }}
          />
        </div>
        <ArrowDown
          className={`relative -mt-1 h-4 w-4 transition-all duration-500 ${
            isActive ? 'cycle-connector-arrow-active text-accent-500' : 'text-navy-200'
          }`}
          strokeWidth={2.5}
          style={{ opacity: 0.35 + progress * 0.65 }}
        />
      </div>
    );
  }

  return (
    <div className="relative mx-0.5 mt-5 hidden min-w-[1.25rem] flex-1 items-center lg:flex" aria-hidden>
      <div className="relative h-0.5 w-full overflow-hidden rounded-full bg-navy-100">
        <div
          className="cycle-connector-fill absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-accent-500 via-accent-400 to-navy-900 transition-[width] duration-300 ease-out"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
        <div
          className="cycle-connector-shimmer pointer-events-none absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/70 to-transparent"
          style={{
            left: `${Math.max(0, progress * 100 - 12)}%`,
            opacity: progress > 0.05 && progress < 1 ? 0.9 : 0,
          }}
        />
      </div>
      <ArrowRight
        className={`-ml-1.5 h-4 w-4 flex-shrink-0 transition-all duration-500 ${
          isActive ? 'cycle-connector-arrow-active text-accent-500' : 'text-navy-200'
        }`}
        strokeWidth={2.5}
        style={{ opacity: 0.3 + progress * 0.7, transform: `translateX(${progress * 2}px)` }}
      />
    </div>
  );
}

function PhaseNode({
  phase,
  index,
  isVisible,
  isLit,
}: {
  phase: { icon: LucideIcon; title: string; desc: string };
  index: number;
  isVisible: boolean;
  isLit: boolean;
}) {
  const PhaseIcon = phase.icon;

  return (
    <div
      data-cycle-phase
      data-index={index}
      className={`relative z-10 flex w-[7.5rem] flex-shrink-0 flex-col items-center text-center sm:w-28 lg:w-[7.25rem] xl:w-32 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } transition-all duration-700 ease-out`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <span
        className={`relative flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white shadow-md transition-all duration-500 sm:h-14 sm:w-14 ${
          isLit
            ? 'border-accent-500 text-accent-500 shadow-accent-500/25 ring-4 ring-accent-500/15'
            : 'border-navy-100 text-navy-700'
        }`}
      >
        <PhaseIcon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.75} />
        <span
          className={`absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold transition-colors duration-500 ${
            isLit ? 'bg-accent-500 text-white' : 'bg-navy-100 text-navy-500'
          }`}
        >
          {index + 1}
        </span>
      </span>
      <h3 className="mt-4 text-xs font-bold leading-snug text-navy-900 sm:text-sm">{phase.title}</h3>
      <p className="mt-1.5 hidden text-[11px] leading-relaxed text-navy-500 xl:block">{phase.desc}</p>
    </div>
  );
}

export default function ProjectCycleSection() {
  const count = projectPhases.length;
  const segmentCount = count - 1;
  const { sectionRef, lineProgress, visibleSteps } = useCycleProgress(count);
  const activeCount = Math.min(count, Math.ceil(lineProgress * count));

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white pb-20 pt-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 30%, rgba(255,87,34,0.07) 0, transparent 45%), radial-gradient(circle at 85% 70%, rgba(11,19,43,0.04) 0, transparent 50%)',
        }}
        aria-hidden
      />

      <div className="container-px relative">
        <p className="section-eyebrow text-center">Wir begleiten Sie in allen Projektphasen</p>
        <h2 className="section-title mx-auto mt-4 max-w-4xl text-center">
          Unsere Unterst{'\u00fc'}tzung entlang des Projektzyklus
        </h2>

        {/* Desktop / tablet: horizontal scroll-linked timeline */}
        <div className="relative mt-14 hidden lg:block">
          <div
            className="pointer-events-none absolute left-[4%] right-[4%] top-[1.65rem] h-0.5 xl:left-[3%] xl:right-[3%]"
            aria-hidden
          >
            <div className="absolute inset-0 rounded-full bg-navy-100" />
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-accent-500 via-accent-400 to-navy-900 transition-[width] duration-300 ease-out"
              style={{ width: `${Math.round(lineProgress * 100)}%` }}
            />
          </div>

          <div className="overflow-x-auto pb-2 xl:overflow-visible">
            <div className="mx-auto flex min-w-[58rem] max-w-6xl items-start justify-between xl:min-w-0">
              {projectPhases.map((phase, i) => (
                <div key={phase.title} className="flex min-w-0 flex-1 items-start">
                  <PhaseNode
                    phase={phase}
                    index={i}
                    isVisible={visibleSteps[i]}
                    isLit={i < activeCount}
                  />
                  {i < segmentCount && (
                    <CycleConnector progress={getSegmentProgress(lineProgress, i, segmentCount)} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: vertical timeline with scroll progress */}
        <div className="relative mt-12 lg:hidden">
          <div
            className="pointer-events-none absolute bottom-6 left-[1.65rem] top-6 w-0.5"
            aria-hidden
          >
            <div className="absolute inset-0 rounded-full bg-navy-100" />
            <div
              className="absolute left-0 top-0 w-full rounded-full bg-gradient-to-b from-accent-500 via-accent-400 to-navy-900 transition-[height] duration-300 ease-out"
              style={{ height: `${Math.round(lineProgress * 100)}%` }}
            />
          </div>

          <div className="flex flex-col">
            {projectPhases.map((phase, i) => (
              <div key={phase.title}>
                <div className="flex items-start gap-4">
                  <PhaseNode
                    phase={phase}
                    index={i}
                    isVisible={visibleSteps[i]}
                    isLit={i < activeCount}
                  />
                  <p className="mt-3 flex-1 text-left text-xs leading-relaxed text-navy-500 sm:text-sm">
                    {phase.desc}
                  </p>
                </div>
                {i < segmentCount && (
                  <div className="ml-[1.65rem]">
                    <CycleConnector
                      progress={getSegmentProgress(lineProgress, i, segmentCount)}
                      direction="vertical"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
