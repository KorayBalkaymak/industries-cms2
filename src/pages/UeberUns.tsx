import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Headset } from 'lucide-react';
import CmsHeroBackdrop from '@/components/CmsHeroBackdrop';
import { aboutAnspruchPoints, aboutWorkSteps, cooperationCards } from '@/data';

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

    const items = section.querySelectorAll('[data-about-reveal]');
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

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [count]);

  return { sectionRef, visible };
}

function useScrollProgress() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setProgress(1);
      return;
    }

    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.82;
      const end = vh * 0.22;
      const travel = rect.height + (start - end);
      const raw = (start - rect.top) / travel;
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return { sectionRef, progress };
}

export default function UeberUns() {
  const { sectionRef: valuesRef, visible: valuesVisible } = useReveal(cooperationCards.length + 1);
  const { sectionRef: processRef, progress: processProgress } = useScrollProgress();
  const activeStepCount = Math.min(aboutWorkSteps.length, Math.ceil(processProgress * aboutWorkSteps.length));

  return (
    <>
      <section className="relative flex min-h-[68vh] items-center overflow-hidden">
        <div className="absolute inset-0">
          <CmsHeroBackdrop />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-950 to-transparent" aria-hidden />

        <div className="container-px relative w-full py-20 sm:py-24">
          <div className="max-w-3xl animate-fade-up">
            <p className="section-eyebrow">{'\u00dcber uns'}</p>
            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.35rem]">
              Engineering Kompetenz. Partnerschaftlich. Flexibel.
            </h1>
            <p className="mt-5 text-xl font-bold text-accent-500 sm:text-2xl">{'F\u00fcr Ihren Projekterfolg.'}</p>
            <div className="mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-accent-500 via-accent-400 to-transparent" />
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-navy-100 sm:text-lg">
              Industries CMS unterst{'\u00fc'}tzt Industrieunternehmen mit qualifizierten Spezialisten, kompletten
              Projektteams und Engineering Services. Wir integrieren uns in Ihre Prozesse und liefern L{'\u00f6'}sungen,
              die genau zu Ihren Anforderungen passen.
            </p>
          </div>
        </div>
      </section>

      <section ref={processRef} className="relative overflow-hidden bg-navy-950 py-24">
        <div className="support-areas-mesh pointer-events-none absolute inset-0 opacity-55" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_78%)]"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-500/45 to-transparent" aria-hidden />

        <div className="container-px relative">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            <article
              data-about-reveal
              data-index={0}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-navy-900/55 p-8 shadow-2xl shadow-black/25 backdrop-blur-md sm:p-10"
            >
              <div className="support-area-card-glow pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
              <div className="relative">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-accent-400">Unser Unternehmen</p>
                <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Wer wir sind</h2>
                <div className="mt-7 space-y-5">
                  {[
                    'Industries CMS wurde mit dem Ziel gegr\u00fcndet, Industrieprojekte mit technischer Expertise, Flexibilit\u00e4t und Verl\u00e4sslichkeit zu unterst\u00fctzen.',
                    'Wir stellen einzelne Spezialisten, komplette Projektteams oder \u00fcbernehmen definierte Engineering Services \u2013 immer abgestimmt auf Ihre Prozesse, Standards und Projektziele.',
                    'Unser Fokus: Qualit\u00e4t, Transparenz und eine partnerschaftliche Zusammenarbeit auf Augenh\u00f6he.',
                  ].map((text, i) => (
                    <div key={text} className="flex gap-4">
                      <span className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-accent-500/15 text-xs font-bold text-accent-400">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="text-sm leading-relaxed text-navy-200 sm:text-base">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-navy-900/55 p-8 shadow-2xl shadow-black/25 backdrop-blur-md sm:p-10">
              <div className="support-area-card-glow pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
              <div className="relative">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-accent-400">Unsere Methode</p>
                <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Wie wir arbeiten</h2>

                <ol className="relative mt-8 space-y-1">
                  <div className="pointer-events-none absolute bottom-3 left-[1.15rem] top-3 w-0.5 bg-white/10" aria-hidden>
                    <div
                      className="absolute left-0 top-0 w-full rounded-full bg-gradient-to-b from-accent-500 via-accent-400 to-white/50 transition-[height] duration-300 ease-out"
                      style={{ height: `${Math.round(processProgress * 100)}%` }}
                    />
                  </div>

                  {aboutWorkSteps.map((step, index) => {
                    const StepIcon = step.icon;
                    const isLit = index < activeStepCount;

                    return (
                      <li key={step.title} className="relative flex gap-4 py-3">
                        <span
                          className={`relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                            isLit
                              ? 'bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-lg shadow-accent-500/30'
                              : 'border border-white/15 bg-navy-950/80 text-navy-300'
                          }`}
                        >
                          <StepIcon className="h-4 w-4" strokeWidth={1.75} />
                        </span>
                        <div className="pt-0.5">
                          <h3 className={`text-sm font-bold transition-colors sm:text-base ${isLit ? 'text-white' : 'text-navy-300'}`}>
                            {step.title}
                          </h3>
                          <p className={`mt-1 text-sm leading-relaxed transition-colors ${isLit ? 'text-navy-200' : 'text-navy-400'}`}>
                            {step.desc}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section ref={valuesRef} className="relative overflow-hidden bg-white py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 18% 22%, rgba(255,87,34,0.07) 0, transparent 42%), radial-gradient(circle at 82% 78%, rgba(11,19,43,0.05) 0, transparent 45%)',
          }}
          aria-hidden
        />

        <div className="container-px relative">
          <div
            data-about-reveal
            data-index={0}
            className={`mx-auto max-w-2xl text-center transition-all duration-700 ${
              valuesVisible[0] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <p className="section-eyebrow">Unsere Werte</p>
            <h2 className="section-title mt-3">Unser Verst{'\u00e4'}ndnis von Zusammenarbeit</h2>
            <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-accent-500 to-transparent" />
          </div>

          <div className="relative mt-16">
            <div
              className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-8 hidden h-0.5 lg:block"
              aria-hidden
            >
              <div className="absolute inset-0 rounded-full bg-navy-100" />
            </div>

            <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {cooperationCards.map((card, index) => {
                const CardIcon = card.icon;
                const isVisible = valuesVisible[index + 1];

                return (
                  <article
                    key={card.title}
                    data-about-reveal
                    data-index={index + 1}
                    className={`group relative flex h-full transition-all duration-700 ease-out ${
                      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 90}ms` }}
                  >
                    <div className="home-card-glow-light pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
                    <div className="relative flex h-full w-full flex-col rounded-2xl border border-navy-100 bg-white p-7 shadow-lg shadow-navy-900/5 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-accent-200 group-hover:shadow-xl sm:p-8">
                      <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-accent-500/80">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="mt-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-lg shadow-accent-500/30 transition-transform duration-500 group-hover:scale-110">
                        <CardIcon className="h-7 w-7" strokeWidth={1.75} />
                      </span>
                      <h3 className="mt-5 text-lg font-bold leading-snug text-navy-900">{card.title}</h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-500">{card.desc}</p>
                      <div className="mt-6 h-0.5 w-8 rounded-full bg-navy-100 transition-all duration-500 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-accent-500/70 group-hover:to-transparent" />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy-50 py-12">
        <div className="container-px">
          <div className="relative overflow-hidden rounded-3xl border border-navy-900/10 bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 p-8 shadow-2xl shadow-navy-900/25 sm:p-10 lg:p-14">
            <div className="support-areas-mesh pointer-events-none absolute inset-0 opacity-40" aria-hidden />
            <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-accent-500/15 blur-3xl" aria-hidden />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-accent-500/10 blur-3xl" aria-hidden />

            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent-400">Qualit{'\u00e4'}t</p>
                <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">Unser Anspruch</h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-navy-200">
                  <p>
                    Jedes Projekt ist einzigartig. Unser Anspruch ist es, Sie mit Erfahrung, technischem Know-how und
                    Verl{'\u00e4'}sslichkeit zu unterst{'\u00fc'}tzen {'\u2013'} unabh{'\u00e4'}ngig davon, wie komplex Ihre
                    Aufgaben sind.
                  </p>
                  <p className="text-navy-300">
                    Industries CMS steht f{'\u00fc'}r Qualit{'\u00e4'}t, Partnerschaft und nachhaltigen Projekterfolg.
                  </p>
                </div>
              </div>

              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {aboutAnspruchPoints.map((point, index) => (
                  <li
                    key={point}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm transition-colors hover:border-accent-500/30 hover:bg-white/8"
                    style={{ transitionDelay: `${index * 60}ms` }}
                  >
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-md shadow-accent-500/30">
                      <Check className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                    <span className="text-sm font-semibold text-white sm:text-base">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-px">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 p-8 shadow-2xl sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:p-14">
            <div className="pointer-events-none absolute -right-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-accent-500/20 blur-3xl" aria-hidden />
            <div className="relative flex flex-col items-center gap-5 text-center lg:flex-row lg:text-left">
              <span className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-xl shadow-accent-500/35">
                <Headset className="h-8 w-8" strokeWidth={1.75} />
              </span>
              <div>
                <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                  Lassen Sie uns {'\u00fc'}ber Ihr Projekt sprechen!
                </h2>
                <p className="mt-2 text-base text-navy-300">
                  Wir finden die passende L{'\u00f6'}sung f{'\u00fc'}r Ihre Anforderungen.
                </p>
              </div>
            </div>
            <Link
              to="/kontakt"
              className="group relative mt-8 inline-flex flex-shrink-0 items-center gap-2 rounded-xl bg-accent-500 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-xl shadow-accent-500/30 transition-all hover:-translate-y-0.5 hover:bg-accent-600 lg:mt-0"
            >
              Kontakt aufnehmen
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
