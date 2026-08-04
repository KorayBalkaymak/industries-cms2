import type { ReactNode } from 'react';
import { useState } from 'react';
import {
  ArrowLeftRight,
  Building2,
  Calendar,
  CheckCircle2,
  Cog,
  Construction,
  Landmark,
  MoveHorizontal,
  Ruler,
  Snowflake,
  Truck,
} from 'lucide-react';
import CmsHeroBackdrop from '@/components/CmsHeroBackdrop';
import ProjectGalleryModal, { ProjectGalleryButton } from '@/components/ProjectGalleryModal';

const bridgeLiftGallery = [
  {
    src: '/images/nagerlbruecke-einhub-1.png',
    alt: 'Luftaufnahme der Brückensegment-Vormontage mit SPMT-Transport und Kraneinsatz',
  },
  {
    src: '/images/nagerlbruecke-einhub-2.png',
    alt: 'Einhub eines Brückensegments mit Liebherr LR 11000 über dem Fluss',
  },
  {
    src: '/images/nagerlbruecke-einhub-3.png',
    alt: 'Montage der Brückensegmente mit Großkran an der Nagerlbrücke',
  },
  {
    src: '/images/nagerlbruecke-einhub-4.png',
    alt: 'Präziser Einhub eines Brückensegments am Ersatzneubau Nagerlbrücke',
  },
];

const projectData = {
  projectFacts: [
    { icon: Building2, label: 'Projekt', value: 'Ersatzneubau Nagerlbrücke' },
    { icon: Landmark, label: 'Bauwerk', value: 'Dreifeldrige Stahlfachwerkbrücke' },
    { icon: ArrowLeftRight, label: 'Gesamtlänge', value: 'ca. 120 m' },
    { icon: Ruler, label: 'Spannweiten', value: '28 m – 64 m – 28 m' },
  ],
  services: [
    'Örtliche Bauleitung Stahlbau',
    'Koordination der Montage- und Hebearbeiten',
    'Termin- und Qualitätsüberwachung',
    'Abstimmung mit Auftraggeber, Fachplanern und Nachunternehmern',
    'Begleitung des Projekts bis zur Fertigstellung',
  ],
  highlights: [
    { icon: Snowflake, text: 'Vormontage unter Winterbedingungen bis -21 °C' },
    { icon: Cog, text: 'Kontinuierlich beheizte Einhausung während der Schweißarbeiten' },
    { icon: MoveHorizontal, text: 'Einhub der Brückensegmente in seitlich versetzter Lage' },
    { icon: Construction, text: 'Randsegmente mit Liebherr LR 11000 eingehoben' },
    { icon: Truck, text: 'Mittelsegment mit 2 × SPMT verfahren und eingehoben' },
  ],
};

function InfoSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-t border-white/10 pt-6 first:border-t-0 first:pt-0">
      <h3 className="text-[11px] font-bold uppercase tracking-[0.24em] text-accent-400">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default function Projekte() {
  const [galleryOpen, setGalleryOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-visible">
        <div className="absolute inset-0 min-h-full">
          <CmsHeroBackdrop />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-950 to-transparent" aria-hidden />

        <div className="container-px relative z-10 w-full py-16 sm:py-24">
          <div className="max-w-4xl animate-fade-up">
            <p className="section-eyebrow">Projekte</p>
            <h1 className="text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
              ERSATZNEUBAU NAGERLBRÜCKE
            </h1>
            <p className="mt-4 text-lg font-bold text-accent-500 sm:mt-5 sm:text-2xl">
              Örtliche Bauleitung Stahlbau | Brückenbau
            </p>
            <div className="relative z-10 mt-6 overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/30 sm:mt-8">
              <img
                src="/images/nagerlbruecke-brueckenbau.png"
                alt="Brückenbau am Ersatzneubau der Nagerlbrücke mit Stahlbau-Montage und Kraneinsatz"
                className="block aspect-[4/3] w-full object-cover sm:aspect-[16/9]"
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-accent-500 via-accent-400 to-transparent" />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy-950 py-24">
        <div className="support-areas-mesh pointer-events-none absolute inset-0 opacity-55" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_78%)]"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-500/45 to-transparent" aria-hidden />

        <div className="container-px relative">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className="space-y-6 text-base leading-relaxed text-navy-200 sm:text-lg">
                <p>
                  Der Ersatzneubau der Nagerlbrücke markiert für unser Unternehmen einen bedeutenden Meilenstein und den
                  erfolgreichen Einstieg in den Brückenbau. Aufbauend auf unserer langjährigen Erfahrung im Stahlbau –
                  insbesondere in der Chemie-, Raffinerie- und Kraftwerksindustrie – konnten wir unsere Kompetenz
                  erfolgreich auf ein anspruchsvolles Infrastrukturprojekt übertragen.
                </p>
                <p>
                  Bereits die Vormontage der Brückensegmente im Bayerischen Wald stellte das Projekt vor besondere
                  Herausforderungen. Winterbedingungen bis -21 °C, beheizte Einhausungen und starke Wetterumschwünge
                  erforderten höchste Flexibilität und eine sorgfältige Planung.
                </p>
                <p>
                  Nach dem unfallbedingten Ausfall des verantwortlichen Bauleiters wurde die örtliche Bauleitung Stahlbau
                  von unserem Unternehmen übernommen. Durch strukturierte Abläufe, enge Abstimmung mit allen
                  Projektbeteiligten und eine konsequente Termin- und Qualitätsüberwachung konnte der Bauablauf ohne
                  Verzögerungen fortgeführt werden.
                </p>
              </div>

              <div className="mt-12 rounded-2xl border border-white/10 bg-navy-900/40 p-6 shadow-xl shadow-black/25 sm:p-8">
                <h3 className="text-lg font-bold uppercase tracking-[0.18em] text-white sm:text-xl">
                  Einhub der Brückensegmente
                </h3>
                <p className="mt-4 text-base leading-relaxed text-navy-200 sm:text-lg">
                  Die beiden Randsegmente wurden mit einem Liebherr LR 11000, dem derzeit größten Raupenkran der
                  Schweiz, präzise eingehoben. Das 64 Meter lange Mittelsegment wurde mithilfe von zwei
                  SPMT-Modulfahrzeugen in seine Endposition verfahren und anschließend millimetergenau montiert. Diese
                  komplexen Hebe- und Montagearbeiten erforderten höchste Präzision, eine detaillierte Planung und eine
                  enge Abstimmung aller beteiligten Unternehmen.
                </p>
                <ProjectGalleryButton onClick={() => setGalleryOpen(true)} />
              </div>

              <div className="mt-12">
                <h2 className="text-2xl font-extrabold uppercase tracking-[0.12em] text-white sm:text-3xl">
                  Vertrauen schafft Zukunft
                </h2>
                <div className="mt-6 space-y-6 text-base leading-relaxed text-navy-200 sm:text-lg">
                  <p>
                    Der erfolgreiche Projektverlauf stärkte das Vertrauen unseres Auftraggebers und bildete die Grundlage
                    für eine langfristige Zusammenarbeit im Brückenbau. Unser Unternehmen übernimmt die örtliche
                    Bauleitung Stahlbau auch im weiteren Projektverlauf und begleitet den Ersatzneubau der Nagerlbrücke
                    bis zur vollständigen Fertigstellung.
                  </p>
                  <p>
                    Darüber hinaus besteht eine langfristige Zusammenarbeit für weitere Brückenbauprojekte bis mindestens
                    2033.
                  </p>
                </div>
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="sticky top-28 rounded-2xl border border-white/10 bg-navy-900/55 p-6 shadow-xl shadow-black/25 backdrop-blur-md sm:p-8">
                <InfoSection title="Projektdaten">
                  <ul className="space-y-4">
                    {projectData.projectFacts.map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={item.label} className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-accent-500/15 text-accent-400 ring-1 ring-accent-500/25">
                            <Icon className="h-4 w-4" strokeWidth={1.75} />
                          </span>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-accent-400/90">{item.label}</p>
                            <p className="mt-1 text-sm font-medium text-white sm:text-base">{item.value}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </InfoSection>

                <InfoSection title="Unsere Leistungen">
                  <ul className="space-y-3">
                    {projectData.services.map((service) => (
                      <li key={service} className="flex items-start gap-3 text-sm leading-snug text-navy-100 sm:text-base">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-400" strokeWidth={1.75} />
                        {service}
                      </li>
                    ))}
                  </ul>
                </InfoSection>

                <InfoSection title="Besonderheiten">
                  <ul className="space-y-3">
                    {projectData.highlights.map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={item.text} className="flex items-start gap-3 text-sm leading-snug text-navy-100 sm:text-base">
                          <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/5 text-accent-400">
                            <Icon className="h-4 w-4" strokeWidth={1.75} />
                          </span>
                          {item.text}
                        </li>
                      );
                    })}
                  </ul>
                </InfoSection>

                <InfoSection title="Zeitraum">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-accent-500/15 text-accent-400 ring-1 ring-accent-500/25">
                      <Calendar className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white sm:text-base">Projektlaufzeit: 2023 – in Ausführung</p>
                      <p className="mt-2 text-sm leading-relaxed text-navy-300">
                        Langfristige Zusammenarbeit für weitere Brückenbauprojekte bis mindestens 2033
                      </p>
                    </div>
                  </div>
                </InfoSection>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <ProjectGalleryModal
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        title="Einhub der Brückensegmente"
        images={bridgeLiftGallery}
      />
    </>
  );
}
