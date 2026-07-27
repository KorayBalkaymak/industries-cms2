import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, Send, Check, Clock, MessageSquare, Zap } from 'lucide-react';
import CmsHeroBackdrop from '@/components/CmsHeroBackdrop';
import { company, services } from '@/data';

const contactItems = [
  {
    icon: MapPin,
    label: 'Adresse',
    value: company.address,
    href: undefined,
  },
  {
    icon: Phone,
    label: 'Telefon',
    value: company.phone,
    href: `tel:${company.phone.replace(/\s/g, '')}`,
  },
  {
    icon: Mail,
    label: 'E-Mail',
    value: company.email,
    href: `mailto:${company.email}`,
  },
  {
    icon: Clock,
    label: 'Erreichbarkeit',
    value: 'Mo\u2013Fr, 8:00\u201318:00 Uhr',
    href: undefined,
  },
] as const;

const trustPoints = [
  { icon: Zap, text: 'Antwort innerhalb von 24 Stunden' },
  { icon: MessageSquare, text: 'Pers\u00f6nliche Beratung' },
  { icon: Check, text: 'Unverbindlich & kostenfrei' },
];

const inputClass =
  'w-full rounded-xl border border-navy-200/80 bg-navy-50/80 px-4 py-3.5 text-sm text-navy-900 outline-none transition-all placeholder:text-navy-400 focus:border-accent-500 focus:bg-white focus:ring-2 focus:ring-accent-500/20';

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

    const items = section.querySelectorAll('[data-kontakt-reveal]');
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

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xlgqavrd';

export default function Kontakt() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollLockRef = useRef<number | null>(null);
  const { sectionRef, visible } = useReveal(contactItems.length + 2);

  useLayoutEffect(() => {
    if (!sent || scrollLockRef.current === null) return;

    const lockedY = scrollLockRef.current;
    const restoreScroll = () => window.scrollTo(0, lockedY);

    restoreScroll();
    const timers = [50, 150, 350].map((delay) => window.setTimeout(restoreScroll, delay));

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [sent]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const scrollY = window.scrollY;
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? 'Beim Senden ist ein Fehler aufgetreten.');
      }

      form.reset();
      scrollLockRef.current = scrollY;
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Beim Senden ist ein Fehler aufgetreten.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="relative flex min-h-[58vh] items-center overflow-hidden">
        <div className="absolute inset-0">
          <CmsHeroBackdrop />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-950 to-transparent" aria-hidden />

        <div className="container-px relative w-full py-20 sm:py-24">
          <div className="max-w-3xl animate-fade-up">
            <p className="section-eyebrow">Kontakt</p>
            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
              Sprechen Sie mit uns {'\u00fc'}ber Ihr Projekt.
            </h1>
            <p className="mt-5 text-xl font-bold text-accent-500 sm:text-2xl">
              Ob einzelner Spezialist oder komplettes Team.
            </p>
            <div className="mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-accent-500 via-accent-400 to-transparent" />
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-navy-100 sm:text-lg">
              Wir melden uns schnellstm{'\u00f6'}glich bei Ihnen {'\u2013'} deutschland- und europaweit im Einsatz.
            </p>

            <ul className="mt-10 grid gap-3 sm:grid-cols-3 sm:gap-0 sm:overflow-hidden sm:border sm:border-white/10 sm:bg-white/[0.03]">
              {trustPoints.map((point, index) => {
                const PointIcon = point.icon;
                return (
                  <li
                    key={point.text}
                    className={`group relative flex items-start gap-3 border border-white/10 bg-navy-950/35 px-4 py-4 backdrop-blur-sm transition-colors hover:border-accent-500/35 hover:bg-white/[0.06] sm:border-0 sm:border-r sm:border-white/10 sm:px-5 sm:py-5 sm:last:border-r-0`}
                  >
                    <span
                      className="absolute left-0 top-0 h-0.5 w-0 bg-accent-500 transition-all duration-300 group-hover:w-full sm:h-full sm:w-0.5 sm:group-hover:w-0.5"
                      aria-hidden
                    />
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center bg-accent-500/15 text-accent-400 ring-1 ring-accent-500/25">
                      <PointIcon className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent-400/80">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <p className="mt-1 text-sm font-semibold leading-snug text-white">{point.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <section ref={sectionRef} className="relative overflow-hidden bg-navy-950 py-24">
        <div className="support-areas-mesh pointer-events-none absolute inset-0 opacity-55" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_78%)]"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-500/45 to-transparent" aria-hidden />

        <div className="container-px relative">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <div
                data-kontakt-reveal
                data-index={0}
                className={`transition-all duration-700 ${visible[0] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-accent-400">Direkt erreichbar</p>
                <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Kontaktdaten</h2>
                <p className="mt-4 text-sm leading-relaxed text-navy-300 sm:text-base">
                  Telefonisch oder per E-Mail {'\u2013'} wir sind f{'\u00fc'}r Sie da.
                </p>
              </div>

              <ul className="mt-8 space-y-3">
                {contactItems.map((item, index) => {
                  const ItemIcon = item.icon;
                  const isVisible = visible[index + 1];

                  return (
                    <li
                      key={item.label}
                      data-kontakt-reveal
                      data-index={index + 1}
                      className={`transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                      style={{ transitionDelay: `${index * 70}ms` }}
                    >
                      <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-navy-900/55 p-5 backdrop-blur-md transition-all duration-500 hover:border-accent-500/30 hover:bg-navy-900/70">
                        <div className="support-area-card-glow pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
                        <div className="relative flex items-start gap-4">
                          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-lg shadow-accent-500/25 transition-transform duration-500 group-hover:scale-105">
                            <ItemIcon className="h-5 w-5" strokeWidth={1.75} />
                          </span>
                          <div className="min-w-0 pt-0.5">
                            <p className="text-xs font-bold uppercase tracking-wider text-accent-400/90">{item.label}</p>
                            {item.href ? (
                              <a
                                href={item.href}
                                className="mt-1 block text-sm font-medium text-white transition-colors hover:text-accent-400 sm:text-base"
                              >
                                {item.value}
                              </a>
                            ) : (
                              <p className="mt-1 text-sm font-medium text-white sm:text-base">{item.value}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div
              data-kontakt-reveal
              data-index={contactItems.length + 1}
              className={`lg:col-span-8 transition-all duration-700 delay-150 ${
                visible[contactItems.length + 1] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white p-8 shadow-2xl shadow-black/30 sm:p-10 lg:p-12">
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-500 via-accent-400 to-accent-500/30"
                  aria-hidden
                />

                <div className="relative">
                  <div className={sent ? 'pointer-events-none invisible' : undefined} aria-hidden={sent}>
                    <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-accent-500">Anfrage</p>
                    <h2 className="mt-2 text-2xl font-bold text-navy-900 sm:text-3xl">Projekt anfragen</h2>
                    <p className="mt-3 text-sm text-navy-500 sm:text-base">
                      Bitte beschreiben Sie Ihren Bedarf {'\u2013'} wir melden uns schnellstm{'\u00f6'}glich.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="kontakt-name" className="mb-2 block text-sm font-semibold text-navy-800">
                            Name *
                          </label>
                          <input
                            id="kontakt-name"
                            name="name"
                            required
                            type="text"
                            className={inputClass}
                            placeholder="Ihr Name"
                            disabled={sent}
                          />
                        </div>
                        <div>
                          <label htmlFor="kontakt-company" className="mb-2 block text-sm font-semibold text-navy-800">
                            Unternehmen
                          </label>
                          <input
                            id="kontakt-company"
                            name="company"
                            type="text"
                            className={inputClass}
                            placeholder="Ihr Unternehmen"
                            disabled={sent}
                          />
                        </div>
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="kontakt-email" className="mb-2 block text-sm font-semibold text-navy-800">
                            E-Mail *
                          </label>
                          <input
                            id="kontakt-email"
                            name="email"
                            required
                            type="email"
                            className={inputClass}
                            placeholder="ihre@email.de"
                            disabled={sent}
                          />
                        </div>
                        <div>
                          <label htmlFor="kontakt-phone" className="mb-2 block text-sm font-semibold text-navy-800">
                            Telefon
                          </label>
                          <input
                            id="kontakt-phone"
                            name="phone"
                            type="tel"
                            className={inputClass}
                            placeholder="+49 ..."
                            disabled={sent}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="kontakt-service" className="mb-2 block text-sm font-semibold text-navy-800">
                          Leistungsbereich
                        </label>
                        <select
                          id="kontakt-service"
                          name="leistungsbereich"
                          className={inputClass}
                          defaultValue=""
                          disabled={sent}
                        >
                          <option value="" disabled>
                            Bitte w{'\u00e4'}hlen
                          </option>
                          {services.map((s) => (
                            <option key={s.slug} value={s.title}>
                              {s.title}
                            </option>
                          ))}
                          <option value="Komplettes Team">Komplettes Team</option>
                          <option value="Sonstiges">Sonstiges</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="kontakt-message" className="mb-2 block text-sm font-semibold text-navy-800">
                          Nachricht *
                        </label>
                        <textarea
                          id="kontakt-message"
                          name="message"
                          required
                          rows={5}
                          className={`${inputClass} resize-none`}
                          placeholder="Beschreiben Sie Ihren Bedarf ..."
                          disabled={sent}
                        />
                      </div>
                      {error ? (
                        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                          {error}
                        </p>
                      ) : null}
                      <button
                        type="submit"
                        disabled={submitting || sent}
                        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-accent-500 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-xl shadow-accent-500/25 transition-all hover:-translate-y-0.5 hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                      >
                        {submitting ? 'Wird gesendet …' : 'Anfrage senden'}
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </form>
                  </div>

                  {sent ? (
                    <div
                      className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white px-6 py-16 text-center sm:px-10 sm:py-20"
                      role="status"
                      aria-live="polite"
                    >
                      <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white shadow-xl shadow-green-500/30">
                        <Check className="h-10 w-10" strokeWidth={2.5} />
                        <span className="absolute inset-0 animate-ping rounded-full bg-green-400/20" aria-hidden />
                      </span>
                      <h3 className="mt-8 text-2xl font-extrabold text-navy-900 sm:text-3xl">Vielen Dank!</h3>
                      <p className="mt-3 max-w-md text-base leading-relaxed text-navy-500">
                        Ihre Anfrage ist eingegangen. Wir melden uns schnellstm{'\u00f6'}glich bei Ihnen.
                      </p>
                      <button
                        onClick={() => {
                          setSent(false);
                          setError(null);
                          scrollLockRef.current = null;
                        }}
                        className="btn-secondary mt-10"
                      >
                        Neue Anfrage stellen
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
