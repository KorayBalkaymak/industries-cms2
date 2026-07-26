import { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Star } from 'lucide-react';

type TrustItem = {
  icon: LucideIcon;
  title: string;
  desc: string;
  iconVariant?: 'team-star';
};

type TrustData = {
  title: string;
  items: TrustItem[];
};

function TrustIcon({ item, isLit }: { item: TrustItem; isLit: boolean }) {
  const ItemIcon = item.icon;

  if (item.iconVariant === 'team-star') {
    return (
      <span className="relative inline-flex">
        <ItemIcon className="h-7 w-7" strokeWidth={1.75} />
        <Star
          className={`absolute -right-2 -top-2 h-4 w-4 fill-current ${
            isLit ? 'text-white' : 'text-accent-500'
          }`}
          strokeWidth={1.75}
        />
      </span>
    );
  }

  return <ItemIcon className="h-7 w-7" strokeWidth={1.75} />;
}

function useReveal(count: number) {
  const sectionRef = useRef<HTMLElement>(null);
  const [lineProgress, setLineProgress] = useState(0);
  const [visible, setVisible] = useState<boolean[]>(() => Array(count).fill(false));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const updateLine = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.82;
      const end = vh * 0.22;
      const travel = rect.height + (start - end);
      const raw = (start - rect.top) / travel;
      setLineProgress(Math.min(1, Math.max(0, raw)));
    };

    if (reducedMotion) {
      setLineProgress(1);
      setVisible(Array(count).fill(true));
      return;
    }

    const cards = section.querySelectorAll('[data-trust-card]');
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
      { rootMargin: '-5% 0px -5% 0px', threshold: 0.15 },
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
  }, [count]);

  return { sectionRef, lineProgress, visible };
}

export default function TechnicalExpertsTrustSection({ data }: { data: TrustData }) {
  const { sectionRef, lineProgress, visible } = useReveal(data.items.length);
  const activeCount = Math.min(data.items.length, Math.ceil(lineProgress * data.items.length));

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24"
      aria-labelledby="experts-trust-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 18% 22%, rgba(255,87,34,0.07) 0, transparent 42%), radial-gradient(circle at 82% 78%, rgba(11,19,43,0.05) 0, transparent 45%)',
        }}
        aria-hidden
      />

      <div className="container-px relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Ihre Vorteile</p>
          <h2 id="experts-trust-heading" className="section-title mt-3">
            {data.title}
          </h2>
          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-accent-500 to-transparent" />
        </div>

        <div className="relative mt-16">
          <div
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-8 hidden h-0.5 lg:block"
            aria-hidden
          >
            <div className="absolute inset-0 rounded-full bg-navy-100" />
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-accent-500 via-accent-400 to-navy-900 transition-[width] duration-300 ease-out"
              style={{ width: `${Math.round(lineProgress * 100)}%` }}
            />
          </div>

          <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {data.items.map((item, index) => {
              const isVisible = visible[index];
              const isLit = index < activeCount;

              return (
                <article
                  key={item.title}
                  data-trust-card
                  data-index={index}
                  className={`group relative flex h-full transition-all duration-700 ease-out ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 90}ms` }}
                >
                  <div
                    className="home-card-glow-light pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden
                  />
                  <div
                    className={`relative flex h-full w-full flex-col rounded-2xl border bg-white p-7 shadow-lg transition-all duration-500 group-hover:-translate-y-1 sm:p-8 ${
                      isLit
                        ? 'border-accent-200 shadow-accent-500/10'
                        : 'border-navy-100 shadow-navy-900/5'
                    }`}
                  >
                    <span
                      className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 ${
                        isLit
                          ? 'bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-lg shadow-accent-500/30'
                          : 'border-2 border-navy-200 bg-navy-50 text-navy-700'
                      }`}
                    >
                      <TrustIcon item={item} isLit={isLit} />
                    </span>
                    <span className="mt-5 text-[11px] font-bold uppercase tracking-[0.24em] text-accent-500/80">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-2 text-lg font-bold leading-snug text-navy-900">{item.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-500">{item.desc}</p>
                    <div
                      className={`mt-6 h-0.5 rounded-full transition-all duration-500 ${
                        isLit ? 'w-full bg-gradient-to-r from-accent-500/70 to-transparent' : 'w-8 bg-navy-100'
                      }`}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
