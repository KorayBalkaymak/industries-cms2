import { useEffect, useRef, useState } from 'react';
import { Check, MapPin } from 'lucide-react';

type BlockData = {
  tasksTitle: string;
  tasks: string[];
  areasTitle: string;
  areas: string[];
};

function useReveal(itemCount: number) {
  const sectionRef = useRef<HTMLElement>(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [itemsVisible, setItemsVisible] = useState<boolean[]>(() => Array(itemCount).fill(false));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setPanelVisible(true);
      setItemsVisible(Array(itemCount).fill(true));
      return;
    }

    const panelObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setPanelVisible(true);
      },
      { threshold: 0.12 },
    );

    const itemNodes = section.querySelectorAll('[data-tasks-item]');
    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (Number.isNaN(index)) return;
          setItemsVisible((prev) => {
            if (prev[index]) return prev;
            const next = [...prev];
            next[index] = true;
            return next;
          });
        });
      },
      { rootMargin: '-4% 0px', threshold: 0.12 },
    );

    panelObserver.observe(section);
    itemNodes.forEach((node) => itemObserver.observe(node));

    return () => {
      panelObserver.disconnect();
      itemObserver.disconnect();
    };
  }, [itemCount]);

  return { sectionRef, panelVisible, itemsVisible };
}

export default function ServiceTasksAreasSection({ data }: { data: BlockData }) {
  const totalItems = data.tasks.length + data.areas.length;
  const { sectionRef, panelVisible, itemsVisible } = useReveal(totalItems);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'radial-gradient(circle at 8% 20%, rgba(255,87,34,0.06) 0, transparent 42%), radial-gradient(circle at 92% 80%, rgba(11,19,43,0.04) 0, transparent 48%)',
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-y-10 left-1/2 hidden w-px bg-gradient-to-b from-transparent via-accent-500/25 to-transparent lg:block" aria-hidden />

      <div className="container-px relative">
        <div
          className={`grid gap-8 transition-all duration-1000 ease-out lg:grid-cols-2 lg:gap-10 ${
            panelVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <article className="group relative overflow-hidden rounded-2xl border border-navy-100/80 bg-gradient-to-br from-white to-navy-50/40 p-8 shadow-xl shadow-navy-900/5 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-accent-500/10 sm:p-10">
            <div className="home-card-glow-light pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
            <div className="relative">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-accent-500">Aufgaben</p>
              <h3 className="mt-3 text-xl font-bold leading-snug text-navy-900 sm:text-2xl">{data.tasksTitle}</h3>
              <ul className="mt-8 space-y-3.5">
                {data.tasks.map((item, i) => {
                  const visible = itemsVisible[i];
                  return (
                    <li
                      key={item}
                      data-tasks-item
                      data-index={i}
                      className={`flex items-start gap-3.5 rounded-xl border border-transparent px-3 py-2.5 transition-all duration-700 hover:border-accent-100 hover:bg-accent-50/35 ${
                        visible ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'
                      }`}
                      style={{ transitionDelay: `${i * 65}ms` }}
                    >
                      <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-md shadow-accent-500/35">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      <span className="text-sm font-medium leading-relaxed text-navy-800 sm:text-[0.9375rem]">{item}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </article>

          <article className="group relative overflow-hidden rounded-2xl border border-navy-100/80 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 p-8 text-white shadow-xl shadow-navy-950/20 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-accent-500/15 sm:p-10">
            <div className="home-card-glow pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
            <div className="support-areas-mesh pointer-events-none absolute inset-0 opacity-30" aria-hidden />
            <div className="relative">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-accent-400">Branchen</p>
              <h3 className="mt-3 text-xl font-bold sm:text-2xl">{data.areasTitle}</h3>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {data.areas.map((item, i) => {
                  const index = data.tasks.length + i;
                  const visible = itemsVisible[index];
                  return (
                    <li
                      key={item}
                      data-tasks-item
                      data-index={index}
                      className={`group/chip flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 backdrop-blur-sm transition-all duration-700 hover:border-accent-500/35 hover:bg-white/10 ${
                        visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                      }`}
                      style={{ transitionDelay: `${i * 55}ms` }}
                    >
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-accent-500/20 text-accent-400 transition-colors group-hover/chip:bg-accent-500 group-hover/chip:text-white">
                        <MapPin className="h-3.5 w-3.5" strokeWidth={2.25} />
                      </span>
                      <span className="text-sm font-semibold text-navy-100">{item}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
