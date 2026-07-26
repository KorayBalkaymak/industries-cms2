import { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Check, HardHat } from 'lucide-react';

type ClaimDetailsData = {
  scopeTitle: string;
  scopeItems: string[];
  benefitsTitle: string;
  benefits: { icon: LucideIcon; text: string }[];
  onsiteTitle: string;
  onsiteDescription: string;
  onsiteTasks: string[];
  billingNote: string;
  closingHighlight: string;
  closingSubtext: string;
};

function usePanelReveal(panelCount: number) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState<boolean[]>(() => Array(panelCount).fill(false));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setVisible(Array(panelCount).fill(true));
      return;
    }

    const panels = section.querySelectorAll('[data-claim-panel]');
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

    panels.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [panelCount]);

  return { sectionRef, visible };
}

export default function ClaimServiceDetailsSection({ data }: { data: ClaimDetailsData }) {
  const { sectionRef, visible } = usePanelReveal(3);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-navy-50 py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'radial-gradient(circle at 0% 0%, rgba(255,87,34,0.08) 0, transparent 42%), radial-gradient(circle at 100% 100%, rgba(11,19,43,0.06) 0, transparent 50%)',
        }}
        aria-hidden
      />

      <div className="container-px relative space-y-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <article
            data-claim-panel
            data-index={0}
            className={`group relative overflow-hidden rounded-2xl border border-white/80 bg-white p-8 shadow-lg shadow-navy-900/5 transition-all duration-700 sm:p-10 ${
              visible[0] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <div className="home-card-glow-light pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
            <div className="relative">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-accent-500">Leistungen</p>
              <h3 className="mt-2 text-2xl font-bold text-navy-900">{data.scopeTitle}</h3>
              <ul className="mt-7 space-y-3">
                {data.scopeItems.map((item, i) => (
                  <li
                    key={item}
                    className={`flex items-start gap-3 rounded-xl border border-transparent px-2 py-2 transition-all duration-700 hover:border-accent-100 hover:bg-accent-50/40 ${
                      visible[0] ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                    }`}
                    style={{ transitionDelay: `${120 + i * 45}ms` }}
                  >
                    <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-md shadow-accent-500/30">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="font-medium leading-snug text-navy-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <article
            data-claim-panel
            data-index={1}
            className={`group relative overflow-hidden rounded-2xl border border-white/80 bg-white p-8 shadow-lg shadow-navy-900/5 transition-all duration-700 sm:p-10 ${
              visible[1] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '80ms' }}
          >
            <div className="home-card-glow-light pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
            <div className="relative">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-accent-500">Mehrwert</p>
              <h3 className="mt-2 text-2xl font-bold text-navy-900">{data.benefitsTitle}</h3>
              <ul className="mt-7 space-y-4">
                {data.benefits.map((benefit, i) => {
                  const BenefitIcon = benefit.icon;
                  return (
                    <li
                      key={benefit.text}
                      className={`flex items-start gap-4 rounded-xl border border-navy-100 bg-gradient-to-br from-white to-navy-50/60 px-4 py-4 transition-all duration-700 hover:-translate-y-0.5 hover:border-accent-200 hover:shadow-md ${
                        visible[1] ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                      }`}
                      style={{ transitionDelay: `${120 + i * 55}ms` }}
                    >
                      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-accent-500/10 text-accent-500">
                        <BenefitIcon className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <span className="pt-2 text-sm font-semibold leading-snug text-navy-800 sm:text-base">
                        {benefit.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </article>
        </div>

        <article
          data-claim-panel
          data-index={2}
          className={`group relative overflow-hidden rounded-2xl border border-navy-900/10 bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 p-8 shadow-2xl shadow-navy-900/20 transition-all duration-700 sm:p-10 lg:p-12 ${
            visible[2] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="pointer-events-none absolute -right-12 top-0 h-48 w-48 rounded-full bg-accent-500/15 blur-3xl" aria-hidden />
          <div className="relative grid gap-8 lg:grid-cols-[1fr,auto] lg:items-start lg:gap-12">
            <div>
              <div className="flex items-start gap-4">
                <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-lg shadow-accent-500/30">
                  <HardHat className="h-7 w-7" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-accent-400">Optional</p>
                  <h3 className="mt-1 text-2xl font-bold text-white sm:text-3xl">{data.onsiteTitle}</h3>
                </div>
              </div>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-navy-200">{data.onsiteDescription}</p>
              <ul className="mt-6 space-y-3">
                {data.onsiteTasks.map((task) => (
                  <li key={task} className="flex items-start gap-3 text-sm text-navy-100 sm:text-base">
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent-500/20 text-accent-400">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                    {task}
                  </li>
                ))}
              </ul>
              <p className="mt-6 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-navy-300">
                {data.billingNote}
              </p>
            </div>

            <div className="rounded-2xl border border-accent-500/25 bg-accent-500/10 p-6 lg:max-w-sm lg:p-8">
              <p className="text-lg font-extrabold leading-snug text-accent-400 sm:text-xl">{data.closingHighlight}</p>
              <p className="mt-3 text-sm leading-relaxed text-navy-200 sm:text-base">{data.closingSubtext}</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
