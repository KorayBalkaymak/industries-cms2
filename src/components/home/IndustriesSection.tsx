import { useEffect, useRef, useState } from 'react';
import { industries } from '@/data';

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

    const cards = section.querySelectorAll('[data-industry-card]');
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
      { rootMargin: '-5% 0px -5% 0px', threshold: 0.12 },
    );

    cards.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [count]);

  return { sectionRef, visible };
}

export default function IndustriesSection() {
  const { sectionRef, visible } = useReveal(industries.length);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-navy-950 py-24"
      aria-labelledby="industries-heading"
    >
      <div className="support-areas-mesh pointer-events-none absolute inset-0 opacity-55" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-500/45 to-transparent" aria-hidden />

      <div className="container-px relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Branchen</p>
          <h2 id="industries-heading" className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Branchen, in denen wir zu Hause sind
          </h2>
          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-accent-500 to-transparent" />
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry, index) => {
            const isVisible = visible[index];

            return (
              <div
                key={industry.title}
                data-industry-card
                data-index={index}
                className={`group relative min-h-[14rem] overflow-hidden rounded-2xl transition-all duration-700 ease-out sm:min-h-[15rem] ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <div className="home-card-glow absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
                <div className="relative h-full min-h-[inherit] overflow-hidden rounded-2xl border border-white/10 bg-navy-900/40 shadow-xl shadow-black/25">
                  <img
                    src={industry.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/15" />
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-500/15 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative flex h-full min-h-[inherit] flex-col justify-end p-5 sm:p-6">
                    <span className="mb-auto inline-flex w-fit rounded-full border border-white/15 bg-navy-950/45 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-accent-300 backdrop-blur-sm">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-lg font-bold text-white sm:text-xl">{industry.title}</h3>
                    <div className="mt-3 h-0.5 w-0 rounded-full bg-gradient-to-r from-accent-500 to-accent-300 transition-all duration-500 group-hover:w-16" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
