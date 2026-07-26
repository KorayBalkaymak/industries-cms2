import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, ChevronDown } from 'lucide-react';
import type { Service } from '@/data';
import CmsHeroBackdrop from '@/components/CmsHeroBackdrop';

export default function ServiceHero({ service }: { service: Service }) {
  const isRichHero = Boolean(service.heroTagline || service.heroDescription);
  const heroBackdrop =
    service.slug === 'engineering-services' ||
    service.slug === 'technical-experts' ||
    service.slug === 'claim-nachtragsvorbereitung' ||
    service.slug === 'construction-management' ||
    service.slug === 'dokumentationsmanagement'
      ? 'cms-brand'
      : 'photo';

  return (
    <section className="relative flex min-h-[62vh] items-center overflow-hidden">
      <div className="absolute inset-0">
        {heroBackdrop === 'cms-brand' ? (
          <CmsHeroBackdrop />
        ) : (
          <>
            <img src={service.image} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/92 to-navy-950/55" />
          </>
        )}
      </div>

      <div className="container-px relative w-full py-16 sm:py-20">
        <div className="max-w-3xl animate-fade-up">
          {!isRichHero && <p className="section-eyebrow">Leistungen</p>}

          <h1
            className={`font-extrabold tracking-tight text-white ${isRichHero ? 'text-4xl sm:text-5xl lg:text-[3.25rem]' : 'mt-3 text-4xl sm:text-5xl'}`}
          >
            {service.heroTitle}
          </h1>

          {service.heroTagline ? (
            <p className="mt-4 text-lg font-bold text-accent-500 sm:text-xl">{service.heroTagline}</p>
          ) : null}

          {service.heroDescription ? (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-navy-100 sm:text-lg">
              {service.heroDescription}
            </p>
          ) : service.heroSubtitle ? (
            <p className="mt-5 text-lg text-navy-200">{service.heroSubtitle}</p>
          ) : null}

          {isRichHero ? (
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Link to="/kontakt" className="btn-primary justify-center sm:justify-start">
                Jetzt Anfrage stellen
                <ArrowRight className="h-4 w-4" />
              </Link>
              {service.heroSecondaryButton?.variant === 'scroll' ? (
                <a
                  href={service.heroSecondaryButton.href ?? '#service-inhalt'}
                  className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-navy-700 bg-navy-900/80 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-navy-950/30 backdrop-blur-sm transition-all hover:border-navy-600 hover:bg-navy-800 active:scale-[0.98] sm:justify-start"
                >
                  {service.heroSecondaryButton.label}
                  <ChevronDown className="h-4 w-4" />
                </a>
              ) : (
                <Link
                  to={service.heroSecondaryButton?.href ?? '/kontakt'}
                  className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-navy-700 bg-navy-900 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-navy-950/30 transition-all hover:border-navy-600 hover:bg-navy-800 active:scale-[0.98] sm:justify-start"
                >
                  <CalendarDays className="h-4 w-4" />
                  {service.heroSecondaryButton?.label ?? 'Beratung vereinbaren'}
                </Link>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
