import { Link } from 'react-router-dom';
import { ArrowRight, Search, UsersRound } from 'lucide-react';

type BannerContent = {
  eyebrow?: string;
  title: string;
  description: string;
  descriptionLine2?: string;
  buttonText: string;
};

const defaultBanner: BannerContent = {
  eyebrow: 'Alternativ',
  title: 'Komplette Teams durch Industries CMS',
  description:
    'Sie m\u00f6chten die Besetzung nicht selbst \u00fcbernehmen? Kein Problem.',
  descriptionLine2:
    'Wir stellen ein komplettes, eingespieltes Team zusammen \u2013 passgenau auf Ihre Anforderungen abgestimmt.',
  buttonText: 'Komplettes Team anfragen',
};

export default function TeamAlternativeBanner(content: Partial<BannerContent> = {}) {
  const banner = { ...defaultBanner, ...content };
  const DecorIcon = Object.keys(content).length > 0 && !content.eyebrow ? Search : UsersRound;

  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(circle at 100% 0%, rgba(255,87,34,0.09) 0, transparent 40%), radial-gradient(circle at 0% 100%, rgba(11,19,43,0.05) 0, transparent 45%)',
        }}
      />

      <div className="container-px relative">
        <div className="team-alt-border-wrap relative rounded-3xl">
          <div className="team-alt-border-orbit pointer-events-none absolute inset-0 rounded-3xl" aria-hidden />
          <div className="relative m-[3px] overflow-hidden rounded-[calc(1.5rem-3px)] bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 px-8 py-10 sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-14 lg:py-14">
            <div
              className="pointer-events-none absolute -right-16 top-1/2 hidden h-64 w-64 -translate-y-1/2 rounded-full bg-accent-500/20 blur-3xl lg:block"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute right-8 top-8 hidden opacity-20 lg:block"
              aria-hidden
            >
              <DecorIcon className="h-40 w-40 text-white" strokeWidth={0.75} />
            </div>

            <div className="relative max-w-2xl">
              {banner.eyebrow ? (
                <span className="inline-flex items-center rounded-full border border-accent-500/40 bg-accent-500/10 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.28em] text-accent-400">
                  {banner.eyebrow}
                </span>
              ) : null}
              <h3
                className={`text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl ${
                  banner.eyebrow ? 'mt-5' : ''
                }`}
              >
                {banner.title}
              </h3>
              <p className="mt-5 text-base leading-relaxed text-navy-200 sm:text-lg">{banner.description}</p>
              {banner.descriptionLine2 ? (
                <p className="mt-2 text-base leading-relaxed text-navy-300 sm:text-lg">{banner.descriptionLine2}</p>
              ) : null}
            </div>

            <Link
              to="/kontakt"
              className="group relative mt-8 inline-flex flex-shrink-0 items-center gap-2 rounded-xl bg-accent-500 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-xl shadow-accent-500/30 transition-all hover:-translate-y-0.5 hover:bg-accent-600 hover:shadow-accent-500/40 lg:mt-0"
            >
              {banner.buttonText}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
