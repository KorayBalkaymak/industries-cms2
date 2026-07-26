import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { services } from '@/data';

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

    const cards = section.querySelectorAll('[data-service-card]');
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

export default function ServicesSection() {
  const { sectionRef, visible } = useReveal(services.length);

  return (
    <section
      id="leistungen"
      ref={sectionRef}
      className="relative overflow-hidden bg-navy-950 py-24"
      aria-labelledby="services-heading"
    >
      <div className="support-areas-mesh pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_12%,transparent_75%)]"
        aria-hidden
      />

      <div className="container-px relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Unsere Leistungsbereiche</p>
          <h2 id="services-heading" className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Passgenaue L{'\u00f6'}sungen f{'\u00fc'}r jede Projektanforderung
          </h2>
          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-accent-500 to-transparent" />
        </div>

        <div className="mt-16 grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const ServiceIcon = service.icon;
            const isVisible = visible[index];

            return (
              <article
                key={service.slug}
                data-service-card
                data-index={index}
                className={`group relative flex h-full transition-all duration-700 ease-out ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="home-card-glow absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
                <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy-900/50 shadow-2xl shadow-black/30 backdrop-blur-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:border-accent-500/35">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={service.image}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/35 to-navy-950/10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-lg shadow-accent-500/35 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <ServiceIcon className="h-6 w-6" strokeWidth={1.75} />
                    </span>
                    <span className="absolute right-5 top-5 rounded-full border border-white/15 bg-navy-950/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/80 backdrop-blur-sm">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h3 className="text-lg font-bold text-white">{service.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-300">{service.short}</p>
                    <Link
                      to={`/leistungen/${service.slug}`}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-accent-400 transition-colors hover:text-accent-300"
                    >
                      Mehr erfahren
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
