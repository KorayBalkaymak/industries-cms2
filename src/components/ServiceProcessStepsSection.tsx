import { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

export type ProcessStepsData = {
  eyebrow?: string;
  title: string;
  steps: { icon: LucideIcon; title: string; desc: string }[];
};

function useStepsProgress(stepCount: number) {
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
      const start = vh * 0.82;
      const end = vh * 0.25;
      const travel = rect.height + (start - end);
      const raw = (start - rect.top) / travel;
      setLineProgress(Math.min(1, Math.max(0, raw)));
    };

    if (reducedMotion) {
      setLineProgress(1);
      setVisibleSteps(Array(stepCount).fill(true));
      return;
    }

    const cards = section.querySelectorAll('[data-process-step]');
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
      { rootMargin: '-5% 0px -5% 0px', threshold: 0.12 },
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

export default function ServiceProcessStepsSection({ data }: { data: ProcessStepsData }) {
  const stepCount = data.steps.length;
  const { sectionRef, lineProgress, visibleSteps } = useStepsProgress(stepCount);
  const activeCount = Math.min(stepCount, Math.ceil(lineProgress * stepCount));
  const isCompactGrid = stepCount > 4;
  const showConnectors = stepCount >= 2 && stepCount <= 4;
  const lineInset = showConnectors ? `${50 / stepCount}%` : '0';

  const gridClass = isCompactGrid
    ? 'sm:grid-cols-2 lg:grid-cols-3'
    : stepCount === 3
      ? 'sm:grid-cols-2 lg:grid-cols-3 lg:gap-6'
      : stepCount === 2
        ? 'sm:grid-cols-2 lg:grid-cols-2 lg:gap-6'
        : 'sm:grid-cols-2 lg:grid-cols-4 lg:gap-6';

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-navy-950 py-24"
      aria-labelledby="process-steps-heading"
    >
      <div className="support-areas-mesh pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_78%)]"
        aria-hidden
      />

      <div className="container-px relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-eyebrow">{data.eyebrow ?? 'Prozess'}</p>
          <h2 id="process-steps-heading" className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {data.title}
          </h2>
          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-accent-500 to-transparent" />
        </div>

        <div className="relative mt-16">
          {showConnectors ? (
            <div
              className="pointer-events-none absolute top-[1.75rem] hidden h-0.5 lg:block"
              style={{ left: lineInset, right: lineInset }}
              aria-hidden
            >
              <div className="absolute inset-0 rounded-full bg-white/10" />
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-accent-500 via-accent-400 to-white/70 transition-[width] duration-300 ease-out"
                style={{ width: `${Math.round(lineProgress * 100)}%` }}
              />
            </div>
          ) : null}

          <div className={`grid gap-6 ${gridClass}`}>
            {data.steps.map((step, i) => {
              const StepIcon = step.icon;
              const isVisible = visibleSteps[i];
              const isLit = i < activeCount;

              return (
                <div
                  key={step.title}
                  data-process-step
                  data-index={i}
                  className={`group relative transition-all duration-700 ease-out ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${Math.min(i * 60, 400)}ms` }}
                >
                  <div
                    className={`relative flex h-full flex-col items-center rounded-2xl border p-6 text-center shadow-xl transition-all duration-500 group-hover:-translate-y-1 sm:p-7 ${
                      isLit
                        ? 'border-accent-500/35 bg-navy-900/70 shadow-accent-500/10'
                        : 'border-white/10 bg-navy-900/45 shadow-black/25'
                    }`}
                  >
                    <div
                      className="support-area-card-glow pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      aria-hidden
                    />

                    <span
                      className={`relative flex h-12 w-12 items-center justify-center rounded-full text-base font-extrabold text-white shadow-lg transition-transform duration-500 group-hover:scale-110 sm:h-14 sm:w-14 sm:text-lg ${
                        isLit
                          ? 'bg-gradient-to-br from-navy-800 to-navy-950 ring-4 ring-accent-500/30'
                          : 'bg-navy-950 ring-2 ring-white/10'
                      }`}
                    >
                      {i + 1}
                    </span>

                    <span
                      className={`relative mt-4 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-110 sm:mt-5 sm:h-14 sm:w-14 ${
                        isLit ? 'bg-accent-500/15 text-accent-400' : 'bg-white/5 text-navy-200'
                      }`}
                    >
                      <StepIcon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.75} />
                    </span>

                    <h3 className="relative mt-4 text-sm font-bold leading-snug text-white sm:mt-5 sm:text-base">
                      {step.title}
                    </h3>
                    <p className="relative mt-2 text-xs leading-relaxed text-navy-300 sm:text-sm">{step.desc}</p>
                  </div>

                  {showConnectors && i < data.steps.length - 1 ? (
                    <ArrowRight
                      className={`absolute -right-4 top-[2.75rem] hidden h-6 w-6 lg:block ${
                        isLit ? 'text-accent-500' : 'text-white/20'
                      }`}
                      strokeWidth={2.5}
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
