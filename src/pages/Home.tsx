import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CTASection } from '@/components/Sections';
import HomeHeroBackdrop from '@/components/HomeHeroBackdrop';
import ValuePillarsSection from '@/components/ValuePillarsSection';
import ProjectCycleSection from '@/components/ProjectCycleSection';
import ServicesSection from '@/components/home/ServicesSection';
import DeploymentModelsSection from '@/components/home/DeploymentModelsSection';
import IndustriesSection from '@/components/home/IndustriesSection';
import WhyUsSection from '@/components/home/WhyUsSection';

export default function Home() {
  return (
    <>
      {/* 1. HERO */}
      <section
        className="relative flex min-h-[100svh] min-h-screen items-center overflow-hidden bg-navy-950"
        aria-label="Industries CMS Hero mit Raffinerie-Kolonne und Orbital-Animation"
      >
        <HomeHeroBackdrop />

        <div className="container-px relative z-10 py-28 sm:py-32 lg:py-36">
          <div className="max-w-xl animate-fade-up lg:max-w-2xl">
            <p className="section-eyebrow">Engineering Services & Construction Management</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.06]">
              Technische Expertise. Passende L{'\u00f6'}sungen. F{'\u00fc'}r Ihr Projekt.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-navy-100/95 sm:text-lg lg:max-w-lg">
              Industries CMS unterst{'\u00fc'}tzt Industrieunternehmen mit qualifizierten Engineering- und
              Construction-Management-Dienstleistungen. Ob einzelne Spezialisten oder komplette
              Projektteams {'\u2013'} flexibel, zuverl{'\u00e4'}ssig und projektbezogen.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link to="/#leistungen" className="btn-primary">
                Unsere Leistungen
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/kontakt" className="btn-ghost border-2 border-white/30 hover:bg-white/10">
                Kontakt aufnehmen
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ValuePillarsSection />

      <ProjectCycleSection />

      <ServicesSection />
      <DeploymentModelsSection />
      <IndustriesSection />
      <WhyUsSection />

      <CTASection
        title="Benötigen Sie Unterstützung für Ihr Projekt?"
        subtitle="Sprechen Sie mit uns – wir finden die richtigen Spezialisten oder stellen das passende Team für Ihre Anforderungen zusammen."
        points={['Schnell verfügbar', 'Passgenaue Besetzung', 'Flexibel & zuverlässig']}
        buttonText="Jetzt Anfrage stellen"
      />
    </>
  );
}
