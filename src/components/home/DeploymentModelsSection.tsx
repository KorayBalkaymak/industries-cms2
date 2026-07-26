import { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  FilePen,
  FileSignature,
  HardHat,
  Presentation,
  UserCheck,
  Users,
} from 'lucide-react';

type Step = { label: string; icon: LucideIcon };

const specialistSteps: Step[] = [
  { label: 'Anfrage beschreiben', icon: FileSignature },
  { label: 'Kandidatenprofile erhalten', icon: Users },
  { label: 'Auswahl durch Sie', icon: UserCheck },
  { label: 'Einsatz im Projekt', icon: HardHat },
];

const teamSteps: Step[] = [
  { label: 'Anforderung \u00fcbergeben', icon: FilePen },
  { label: 'Teamzusammenstellung durch uns', icon: Users },
  { label: 'Teampr\u00e4sentation & Freigabe', icon: Presentation },
  { label: 'Projektstart im Einsatz', icon: HardHat },
];

function useReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.82;
      const end = vh * 0.2;
      const travel = rect.height + (start - end);
      const raw = (start - rect.top) / travel;
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    if (reducedMotion) {
      setProgress(1);
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );

    observer.observe(section);
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return { sectionRef, progress, visible };
}

function StepList({
  steps,
  variant,
  progress,
}: {
  steps: Step[];
  variant: 'light' | 'accent';
  progress: number;
}) {
  const activeCount = Math.ceil(progress * steps.length);

  return (
    <ol className="relative mt-8 space-y-1">
      <div
        className={`pointer-events-none absolute bottom-3 left-[1.15rem] top-3 w-0.5 ${
          variant === 'accent' ? 'bg-white/20' : 'bg-navy-100'
        }`}
        aria-hidden
      >
        <div
          className={`absolute left-0 top-0 w-full rounded-full transition-[height] duration-300 ease-out ${
            variant === 'accent'
              ? 'bg-gradient-to-b from-white via-white/80 to-white/40'
              : 'bg-gradient-to-b from-accent-500 via-accent-400 to-navy-900'
          }`}
          style={{ height: `${Math.round(progress * 100)}%` }}
        />
      </div>

      {steps.map((step, i) => {
        const StepIcon = step.icon;
        const isLit = i < activeCount;

        return (
          <li key={step.label} className="py-2">
            <div className="flex items-center gap-4">
              <span
                className={`relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                  variant === 'accent'
                    ? isLit
                      ? 'bg-white text-accent-600 shadow-lg shadow-black/15'
                      : 'bg-white/15 text-white/70'
                    : isLit
                      ? 'border-2 border-accent-500 bg-accent-500 text-white shadow-lg shadow-accent-500/25'
                      : 'border-2 border-navy-200 bg-white text-navy-600'
                }`}
              >
                <StepIcon className="h-4 w-4" strokeWidth={2} />
              </span>
              <span
                className={`font-medium transition-colors duration-500 ${
                  variant === 'accent'
                    ? isLit
                      ? 'text-white'
                      : 'text-white/65'
                    : isLit
                      ? 'text-navy-900'
                      : 'text-navy-500'
                }`}
              >
                {step.label}
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default function DeploymentModelsSection() {
  const { sectionRef, progress, visible } = useReveal();

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'radial-gradient(circle at 12% 18%, rgba(255,87,34,0.07) 0, transparent 42%), radial-gradient(circle at 88% 82%, rgba(11,19,43,0.05) 0, transparent 45%)',
        }}
        aria-hidden
      />

      <div className="container-px relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Zwei Einsatzmodelle</p>
          <h2 className="section-title mt-3">Sie entscheiden</h2>
          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-accent-500 to-transparent" />
        </div>

        <div
          className={`mt-14 grid gap-8 lg:grid-cols-2 lg:gap-10 ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          } transition-all duration-700`}
        >
          <div className="group relative">
            <div className="home-card-glow-light absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
            <div className="relative h-full rounded-3xl border border-navy-100 bg-white p-8 shadow-xl shadow-navy-900/5 transition-all duration-500 group-hover:-translate-y-1 sm:p-10">
              <span className="inline-flex items-center rounded-full border border-navy-200 bg-navy-50 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-navy-600">
                Modell A
              </span>
              <span className="mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 text-white shadow-lg">
                <UserCheck className="h-7 w-7" strokeWidth={1.75} />
              </span>
              <h3 className="mt-6 text-2xl font-bold text-navy-900">Spezialisten nach Ihrer Auswahl</h3>
              <p className="mt-3 text-navy-500">
                Sie w{'\u00e4'}hlen aus {'\u2013'} wir stellen die passenden Kandidatenprofile vor.
              </p>
              <StepList steps={specialistSteps} variant="light" progress={progress} />
            </div>
          </div>

          <div className="group relative">
            <div className="deployment-accent-orbit pointer-events-none absolute inset-0 rounded-3xl" aria-hidden />
            <div className="relative h-full overflow-hidden rounded-3xl border border-accent-500/30 bg-gradient-to-br from-accent-500 via-accent-500 to-accent-600 p-8 text-white shadow-2xl shadow-accent-500/25 transition-all duration-500 group-hover:-translate-y-1 sm:p-10">
              <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-10 h-52 w-52 rounded-full bg-navy-950/15 blur-2xl" />
              <span className="relative inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-white/95 backdrop-blur-sm">
                Modell B
              </span>
              <span className="relative mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white shadow-lg backdrop-blur-sm">
                <Users className="h-7 w-7" strokeWidth={1.75} />
              </span>
              <h3 className="relative mt-6 text-2xl font-bold">Komplette Teams durch Industries CMS</h3>
              <p className="relative mt-3 text-white/90">
                Sie {'\u00fc'}bergeben uns die Anforderung {'\u2013'} wir stellen ein komplettes, eingespieltes Team
                f{'\u00fc'}r Ihr Projekt zusammen.
              </p>
              <StepList steps={teamSteps} variant="accent" progress={progress} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
