import { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight, FilePen, Users, UserCheck, HardHat } from 'lucide-react';
import { SectionHeading } from '@/components/Sections';

const collabSteps: { label: string; desc: string; icon: LucideIcon }[] = [
  {
    label: 'Bedarf \u00fcbermitteln',
    desc: 'Sie senden uns Ihre Anforderungen und Projektinformationen.',
    icon: FilePen,
  },
  {
    label: 'Passende Profile erhalten',
    desc: 'Wir schlagen Ihnen geeignete Spezialisten vor.',
    icon: Users,
  },
  {
    label: 'Auswahl treffen',
    desc: 'Sie w\u00e4hlen die passenden Experten f\u00fcr Ihr Projekt aus.',
    icon: UserCheck,
  },
  {
    label: 'Projektstart',
    desc: 'Die Spezialisten starten zu dem vereinbarten Zeitpunkt.',
    icon: HardHat,
  },
];

function useCollabProgress(stepCount: number) {
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

    const cards = section.querySelectorAll('[data-collab-step]');
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
      { rootMargin: '-5% 0px -5% 0px', threshold: 0.2 },
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

export default function CollaborationStepsSection() {
  const { sectionRef, lineProgress, visibleSteps } = useCollabProgress(collabSteps.length);
  const activeCount = Math.min(collabSteps.length, Math.ceil(lineProgress * collabSteps.length));

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 10% 20%, rgba(255,87,34,0.08) 0, transparent 42%), radial-gradient(circle at 90% 80%, rgba(11,19,43,0.04) 0, transparent 45%)',
        }}
      />

      <div className="container-px relative">
        <SectionHeading
          eyebrow="Zusammenarbeit"
          title={'So l\u00e4uft die Zusammenarbeit'}
          center
        />

        <div className="relative mt-16">
          <div
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[1.75rem] hidden h-0.5 lg:block"
            aria-hidden
          >
            <div className="absolute inset-0 rounded-full bg-navy-100" />
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-accent-500 via-accent-400 to-navy-900 transition-[width] duration-300 ease-out"
              style={{ width: `${Math.round(lineProgress * 100)}%` }}
            />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {collabSteps.map((collabStep, i) => {
              const StepIcon = collabStep.icon;
              const isVisible = visibleSteps[i];
              const isLit = i < activeCount;

              return (
                <div
                  key={collabStep.label}
                  data-collab-step
                  data-index={i}
                  className={`group relative transition-all duration-700 ease-out ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div
                    className={`relative flex h-full flex-col items-center rounded-2xl border bg-white p-8 text-center shadow-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl ${
                      isLit ? 'border-accent-200 shadow-md shadow-accent-500/10' : 'border-navy-100'
                    }`}
                  >
                    <div
                      className={`absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                        isLit ? 'collab-step-glow opacity-40' : ''
                      }`}
                      aria-hidden
                    />
                    <span
                      className={`relative flex h-14 w-14 items-center justify-center rounded-full text-lg font-extrabold text-white shadow-lg transition-transform duration-500 group-hover:scale-110 ${
                        isLit
                          ? 'bg-gradient-to-br from-navy-900 to-navy-800 ring-4 ring-accent-500/25'
                          : 'bg-navy-900'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <StepIcon
                      className={`relative mt-5 h-10 w-10 transition-all duration-500 group-hover:scale-110 ${
                        isLit ? 'text-accent-500' : 'text-navy-800'
                      }`}
                      strokeWidth={1.75}
                    />
                    <h3 className="relative mt-4 text-base font-bold text-navy-900">{collabStep.label}</h3>
                    <p className="relative mt-2 text-sm leading-relaxed text-navy-500">{collabStep.desc}</p>
                  </div>

                  {i < collabSteps.length - 1 && (
                    <ArrowRight
                      className="absolute -right-4 top-[2.75rem] hidden h-6 w-6 text-accent-500/80 lg:block"
                      strokeWidth={2.5}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
