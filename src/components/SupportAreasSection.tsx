import { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';

type SupportArea = {
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

    const cards = section.querySelectorAll('[data-support-card]');
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
      { rootMargin: '-8% 0px -8% 0px', threshold: 0.15 },
    );

    cards.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [count]);

  return { sectionRef, visible };
}

export default function SupportAreasSection({
  areas,
  title = 'Wobei unterst\u00fctzen wir?',
}: {
  areas: SupportArea[];
  title?: string;
}) {
  const { sectionRef, visible } = useReveal(areas.length);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-navy-950 py-24"
      aria-labelledby="support-areas-heading"
    >
      <div className="support-areas-mesh pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />

      <div className="container-px relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Unser Angebot</p>
          <h2
            id="support-areas-heading"
            className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            {title}
          </h2>
          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-accent-500 to-transparent" />
        </div>

        <div className="mt-16 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((area, index) => {
            const SupportIcon = area.icon;
            const isVisible = visible[index];

            return (
              <div
                key={area.title}
                data-support-card
                data-index={index}
                className={`group relative flex h-full transition-all duration-700 ease-out ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <div className="support-area-card-glow absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex h-full w-full flex-col rounded-2xl border border-white/10 bg-navy-900/60 p-6 shadow-lg shadow-black/30 backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-1 group-hover:border-accent-500/40">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-lg shadow-accent-500/30 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <SupportIcon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <span className="mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-accent-400/90">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 text-base font-bold text-white">{area.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-300">{area.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
