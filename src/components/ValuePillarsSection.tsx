import { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { valuePillars } from '@/data';

type Pillar = {
  icon: LucideIcon;
  title: string;
  sub: string;
};

function useReveal(count: number) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState<boolean[]>(() => Array(count).fill(false));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setVisible(Array(count).fill(true));
      return;
    }

    const cards = section.querySelectorAll('[data-value-pillar]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (Number.isNaN(index)) return;
          setVisible((prev) => {
            if (prev[index]) return prev;
            const next = [...prev];
            next[index] = true;
            return next;
          });
        });
      },
      { rootMargin: '-6% 0px -6% 0px', threshold: 0.12 },
    );

    cards.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [count]);

  return { sectionRef, visible };
}

export default function ValuePillarsSection() {
  const { sectionRef, visible } = useReveal(valuePillars.length);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-navy-950 pb-20 pt-14 sm:pt-16"
      aria-labelledby="value-pillars-heading"
    >
      <div className="support-areas-mesh pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_72%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-500/50 to-transparent" aria-hidden />

      <div className="container-px relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Ihr Vorteil</p>
          <h2
            id="value-pillars-heading"
            className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            Exzellenz f{'\u00fc'}r Industrieprojekte
          </h2>
          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-accent-500 to-transparent" />
        </div>

        <div className="mt-14 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {valuePillars.map((pillar: Pillar, index) => {
            const PillarIcon = pillar.icon;
            const isVisible = visible[index];

            return (
              <div
                key={pillar.title}
                data-value-pillar
                data-index={index}
                className={`group relative flex h-full transition-all duration-700 ease-out ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <div
                  className="value-pillar-card-glow absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                />
                <div className="relative flex h-full w-full flex-col rounded-2xl border border-white/10 bg-navy-900/55 p-7 shadow-xl shadow-black/25 backdrop-blur-md transition-all duration-500 group-hover:-translate-y-1 group-hover:border-accent-500/35 group-hover:shadow-accent-500/10">
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent-400/80">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="mt-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-lg shadow-accent-500/30 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <PillarIcon className="h-7 w-7" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-6 text-lg font-bold leading-snug text-white">{pillar.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-300">{pillar.sub}</p>
                  <div className="mt-6 h-px w-full bg-gradient-to-r from-accent-500/40 via-white/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
