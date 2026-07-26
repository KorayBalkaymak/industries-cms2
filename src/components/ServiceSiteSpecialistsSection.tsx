import { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';

type Specialist = {
  icon: LucideIcon;
  title: string;
  desc: string;
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

    const cards = section.querySelectorAll('[data-site-specialist]');
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

export default function ServiceSiteSpecialistsSection({
  title,
  specialists,
}: {
  title: string;
  specialists: Specialist[];
}) {
  const { sectionRef, visible } = useReveal(specialists.length);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-navy-950 py-24"
      aria-labelledby="site-specialists-heading"
    >
      <div className="support-areas-mesh pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_18%,transparent_76%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-500/45 to-transparent" aria-hidden />

      <div className="container-px relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-eyebrow">Expertise vor Ort</p>
          <h2
            id="site-specialists-heading"
            className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            {title}
          </h2>
          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-accent-500 to-transparent" />
        </div>

        <div className="mt-16 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {specialists.map((specialist, index) => {
            const SpecialistIcon = specialist.icon;
            const isVisible = visible[index];

            return (
              <article
                key={specialist.title}
                data-site-specialist
                data-index={index}
                className={`group relative flex h-full transition-all duration-700 ease-out ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 75}ms` }}
              >
                <div
                  className="support-area-card-glow pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                />
                <div className="relative flex h-full w-full flex-col rounded-2xl border border-white/10 bg-navy-900/55 p-6 shadow-xl shadow-black/25 backdrop-blur-md transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-accent-500/40 sm:p-7">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-lg shadow-accent-500/35 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <SpecialistIcon className="h-6 w-6" strokeWidth={1.75} />
                    </span>
                    <span className="rounded-full border border-white/10 bg-navy-950/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-accent-400/90">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-white">{specialist.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-300">{specialist.desc}</p>
                  <div className="mt-5 h-px w-full bg-gradient-to-r from-accent-500/50 via-white/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
