import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

export function CTASection({
  title,
  subtitle,
  description,
  points = ['Schnell verfügbar', 'Passgenaue Besetzung', 'Flexibel & zuverlässig'],
  buttonText = 'Jetzt Anfrage stellen',
  to = '/kontakt',
  layout = 'center',
  showPoints = true,
}: {
  title: string;
  subtitle: string;
  description?: string;
  points?: string[];
  buttonText?: string;
  to?: string;
  layout?: 'center' | 'split';
  showPoints?: boolean;
}) {
  const pointsVisible = showPoints && points.length > 0;

  return (
    <section className="relative overflow-hidden bg-navy-950 py-20">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #FF5722 0, transparent 40%)' }} />
      <div className="container-px relative">
        {layout === 'split' ? (
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{title}</h2>
              <p className="mt-4 text-lg text-navy-300">{subtitle}</p>
              {description && <p className="mt-2 text-lg text-navy-300">{description}</p>}
            </div>
            <Link to={to} className="btn-primary flex-shrink-0">
              {buttonText}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{title}</h2>
            <p className="mt-4 text-lg text-navy-300">{subtitle}</p>
            {description && <p className="mt-2 text-lg text-navy-300">{description}</p>}
            {pointsVisible && (
              <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                {points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm font-semibold text-white">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-500">
                      <Check className="h-3 w-3 text-white" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            )}
            <Link to={to} className="btn-primary mt-10">
              {buttonText}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

import CmsHeroBackdrop from '@/components/CmsHeroBackdrop';

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  heroBackdrop = 'photo',
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
  heroBackdrop?: 'photo' | 'cms-brand';
}) {
  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden">
      <div className="absolute inset-0">
        {heroBackdrop === 'cms-brand' ? (
          <CmsHeroBackdrop />
        ) : (
          <>
            <img src={image} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/60" />
          </>
        )}
      </div>
      <div className="container-px relative py-20">
        <div className="max-w-2xl animate-fade-up">
          {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{title}</h1>
          {subtitle && <p className="mt-5 text-lg text-navy-200">{subtitle}</p>}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 section-title">{title}</h2>
    </div>
  );
}
