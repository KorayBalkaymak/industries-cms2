import { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';

type ExpertFieldsData = {
  title: string;
  subtitle: string;
  columns: { icon: LucideIcon; title: string; roles: string[] }[];
  additionalTitle: string;
  additional: { icon: LucideIcon; title: string }[];
};

function useReveal(total: number, batchRevealFrom?: number) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState<boolean[]>(() => Array(total).fill(false));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setVisible(Array(total).fill(true));
      return;
    }

    const items = section.querySelectorAll('[data-expert-item]');
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
            if (batchRevealFrom !== undefined && index === batchRevealFrom) {
              for (let i = batchRevealFrom + 1; i < total; i++) {
                next[i] = true;
              }
            }
            return next;
          });
        });
      },
      {
        root: null,
        rootMargin: '0px 0px 12% 0px',
        threshold: [0, 0.08, 0.2],
      },
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [total, batchRevealFrom]);

  return { sectionRef, visible };
}

export default function TechnicalExpertsFieldsSection({ data }: { data: ExpertFieldsData }) {
  const totalItems = data.columns.length + data.additional.length + 2;
  const additionalTitleIndex = data.columns.length + 1;
  const { sectionRef, visible } = useReveal(totalItems);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-x-hidden bg-navy-950 py-24"
      aria-labelledby="expert-fields-heading"
    >
      <div className="support-areas-mesh pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_78%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-500/45 to-transparent" aria-hidden />

      <div className="container-px relative">
        <div
          data-expert-item
          data-index={0}
          className={`mx-auto max-w-3xl text-center transition-all duration-700 ease-out ${
            visible[0] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <p className="section-eyebrow">Fachbereiche</p>
          <h2
            id="expert-fields-heading"
            className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            {data.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-navy-300 sm:text-lg">
            {data.subtitle}
          </p>
          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-accent-500 to-transparent" />
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {data.columns.map((column, index) => {
            const ColumnIcon = column.icon;
            const itemIndex = index + 1;
            const isVisible = visible[itemIndex];

            return (
              <article
                key={column.title}
                data-expert-item
                data-index={itemIndex}
                className={`group relative flex h-full transition-all duration-700 ease-out ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <div
                  className="support-area-card-glow pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                />
                <div className="relative flex h-full w-full flex-col rounded-2xl border border-white/10 bg-navy-900/55 p-5 shadow-xl shadow-black/25 backdrop-blur-md transition-all duration-500 group-hover:-translate-y-1 group-hover:border-accent-500/35 sm:p-6">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                    <span
                      className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-700 group-hover:scale-110 ${
                        isVisible
                          ? 'border border-white/15 bg-white/10 text-accent-400 shadow-[0_0_22px_rgba(255,255,255,0.14)]'
                          : 'border border-white/10 bg-navy-950/60 text-accent-400/70'
                      }`}
                    >
                      <ColumnIcon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <h3 className="text-sm font-bold leading-snug text-white sm:text-base">{column.title}</h3>
                  </div>

                  <ul className="mt-4 flex-1 space-y-2">
                    {column.roles.map((role) => (
                      <li
                        key={role}
                        className="flex items-start gap-2 text-sm leading-snug text-navy-200 transition-colors duration-300 group-hover:text-white"
                      >
                        <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent-500/80" aria-hidden />
                        {role}
                      </li>
                    ))}
                    <li className="pt-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent-400/90">
                      und weitere
                    </li>
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-14">
          <div
            data-expert-item
            data-index={additionalTitleIndex}
            className={`transition-all duration-700 ease-out ${
              visible[additionalTitleIndex] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden />
              <h3 className="text-center text-sm font-bold uppercase tracking-[0.24em] text-accent-400">
                {data.additionalTitle}
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden />
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.additional.map((item, index) => {
              const ItemIcon = item.icon;
              const itemIndex = data.columns.length + 2 + index;
              const isVisible = visible[itemIndex];

              return (
                <div
                  key={item.title}
                  data-expert-item
                  data-index={itemIndex}
                  className={`group relative overflow-hidden rounded-xl transition-all duration-700 ease-out ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 70}ms` }}
                >
                  <div
                    className={`pointer-events-none absolute inset-0 rounded-xl expert-card-ambient-glow transition-opacity duration-700 ${
                      isVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                    aria-hidden
                  />
                  <div
                    className={`pointer-events-none absolute inset-0 rounded-xl expert-card-shimmer ${
                      isVisible ? 'expert-card-shimmer-active' : ''
                    }`}
                    aria-hidden
                  />
                  <div className="relative flex items-center gap-4 rounded-xl border border-white/10 bg-navy-900/45 px-4 py-4 shadow-lg shadow-black/20 backdrop-blur-sm transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-white/20 group-hover:bg-navy-900/70 group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
                    <span
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-700 ${
                        isVisible
                          ? 'border border-white/15 bg-white/10 text-accent-400 shadow-[0_0_20px_rgba(255,255,255,0.12)]'
                          : 'border border-white/10 bg-navy-950/60 text-accent-400/60'
                      }`}
                    >
                      <ItemIcon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span
                      className={`text-sm font-semibold leading-snug transition-colors duration-700 ${
                        isVisible ? 'text-white' : 'text-navy-400'
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
