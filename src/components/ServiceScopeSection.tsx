import { useEffect, useRef, useState } from 'react';
import { Check, Users } from 'lucide-react';

type Props = {
  einsatzgebiete: string[];
  spezialisten: string[];
};

function useScopeReveal(itemCount: number) {
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
      { threshold: 0.15 },
    );

    const itemNodes = section.querySelectorAll('[data-scope-item]');
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

export default function ServiceScopeSection({ einsatzgebiete, spezialisten }: Props) {
  const totalItems = einsatzgebiete.length + spezialisten.length;
  const { sectionRef, panelVisible, itemsVisible } = useScopeReveal(totalItems);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-navy-50 py-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 0% 0%, rgba(255,87,34,0.07) 0, transparent 45%), radial-gradient(circle at 100% 100%, rgba(11,19,43,0.06) 0, transparent 50%)',
        }}
      />
      <div className="pointer-events-none absolute inset-y-12 left-1/2 hidden w-px bg-gradient-to-b from-transparent via-accent-500/30 to-transparent lg:block" />

      <div className="container-px relative">
        <div
          className={`grid gap-8 transition-all duration-1000 ease-out lg:grid-cols-2 lg:gap-10 ${
            panelVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <article className="group relative overflow-hidden rounded-2xl border border-white/80 bg-white/90 p-8 shadow-lg shadow-navy-900/5 backdrop-blur-sm transition-shadow duration-500 hover:shadow-xl hover:shadow-accent-500/10">
            <div className="scope-panel-glow pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-accent-500">Einsatz</p>
              <h3 className="mt-2 text-xl font-bold text-navy-900">Typische Einsatzgebiete</h3>
              <ul className="mt-6 space-y-3">
                {einsatzgebiete.map((item, i) => {
                  const index = i;
                  const visible = itemsVisible[index];
                  return (
                    <li
                      key={item}
                      data-scope-item
                      data-index={index}
                      className={`flex items-start gap-3 rounded-xl border border-transparent px-3 py-2.5 transition-all duration-700 hover:border-accent-100 hover:bg-accent-50/40 ${
                        visible ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'
                      }`}
                      style={{ transitionDelay: `${i * 60}ms` }}
                    >
                      <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-md shadow-accent-500/30">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      <span className="font-medium leading-snug text-navy-800">{item}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </article>

          <article className="group relative overflow-hidden rounded-2xl border border-white/80 bg-white/90 p-8 shadow-lg shadow-navy-900/5 backdrop-blur-sm transition-shadow duration-500 hover:shadow-xl hover:shadow-navy-900/10">
            <div className="scope-panel-glow pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative">
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-navy-600">
                <Users className="h-3.5 w-3.5 text-accent-500" />
                Team
              </p>
              <h3 className="mt-2 text-xl font-bold text-navy-900">{'Verf\u00fcgbare Spezialisten'}</h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {spezialisten.map((role, i) => {
                  const index = einsatzgebiete.length + i;
                  const visible = itemsVisible[index];
                  return (
                    <li
                      key={role}
                      data-scope-item
                      data-index={index}
                      className={`group/chip flex items-center gap-2.5 rounded-xl border border-navy-100 bg-gradient-to-br from-white to-navy-50/80 px-4 py-3 text-sm font-semibold text-navy-800 shadow-sm transition-all duration-700 hover:-translate-y-0.5 hover:border-accent-200 hover:shadow-md ${
                        visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                      }`}
                      style={{ transitionDelay: `${i * 55}ms` }}
                    >
                      <span className="h-2 w-2 rounded-full bg-accent-500 shadow-[0_0_8px_rgba(255,87,34,0.65)] transition-transform duration-300 group-hover/chip:scale-125" />
                      {role}
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
