import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { services } from '@/data';
import { CTASection } from '@/components/Sections';
import ServiceHero from '@/components/ServiceHero';
import ServiceTasksAreasSection from '@/components/ServiceTasksAreasSection';
import ServiceSiteSpecialistsSection from '@/components/ServiceSiteSpecialistsSection';
import SupportAreasSection from '@/components/SupportAreasSection';
import CollaborationStepsSection from '@/components/CollaborationStepsSection';
import ServiceScopeSection from '@/components/ServiceScopeSection';
import TeamAlternativeBanner from '@/components/TeamAlternativeBanner';
import TechnicalExpertsFieldsSection from '@/components/TechnicalExpertsFieldsSection';
import TechnicalExpertsTrustSection from '@/components/TechnicalExpertsTrustSection';
import ServiceProcessStepsSection from '@/components/ServiceProcessStepsSection';
import ClaimServiceDetailsSection from '@/components/ClaimServiceDetailsSection';
import DocumentationServiceDetailsSection from '@/components/DocumentationServiceDetailsSection';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-navy-50">
        <div className="text-center">
          <p className="text-2xl font-bold text-navy-900">Leistung nicht gefunden</p>
          <Link to="/" className="btn-primary mt-6">
            Zur Startseite
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  const isConstructionManagement = service.slug === 'construction-management';
  const isTechnicalExperts = service.slug === 'technical-experts';
  const isClaimService = service.slug === 'claim-nachtragsvorbereitung';
  const isDocumentationService = service.slug === 'dokumentationsmanagement';

  return (
    <>
      <ServiceHero service={service} />

      <div id="service-inhalt">
      {service.expertFieldsBlock ? (
        <TechnicalExpertsFieldsSection data={service.expertFieldsBlock} />
      ) : service.collaborationStepsBlock?.replaceSupportSection ? (
        <ServiceProcessStepsSection data={service.collaborationStepsBlock} />
      ) : (
        <SupportAreasSection areas={service.supportAreas} title={service.supportAreasTitle} />
      )}

      {service.tasksAreasBlock ? (
        <ServiceTasksAreasSection data={service.tasksAreasBlock} />
      ) : null}

      {service.siteSpecialists && service.siteSpecialistsTitle ? (
        <ServiceSiteSpecialistsSection
          title={service.siteSpecialistsTitle}
          specialists={service.siteSpecialists}
        />
      ) : null}

      {service.expertTrustBlock ? (
        <TechnicalExpertsTrustSection data={service.expertTrustBlock} />
      ) : service.collaborationStepsBlock && !service.collaborationStepsBlock.replaceSupportSection ? (
        <ServiceProcessStepsSection data={service.collaborationStepsBlock} />
      ) : !service.collaborationStepsBlock?.replaceSupportSection ? (
        <CollaborationStepsSection />
      ) : null}

      {service.expertStepsBlock ? (
        <ServiceProcessStepsSection data={service.expertStepsBlock} />
      ) : null}

      {isConstructionManagement || isTechnicalExperts ? (
        <TeamAlternativeBanner {...(service.alternativeBanner ?? {})} />
      ) : isClaimService && service.claimDetailsBlock ? (
        <ClaimServiceDetailsSection data={service.claimDetailsBlock} />
      ) : isDocumentationService && service.documentationDetailsBlock ? (
        <DocumentationServiceDetailsSection data={service.documentationDetailsBlock} />
      ) : (
        <>
          <ServiceScopeSection
            einsatzgebiete={service.einsatzgebiete}
            spezialisten={service.spezialisten}
          />
          <TeamAlternativeBanner {...(service.alternativeBanner ?? {})} />
        </>
      )}

      </div>

      <CTASection
        layout="split"
        showPoints={false}
        title="Bereit für Ihr Projekt?"
        subtitle="Lassen Sie uns gemeinsam die passende Lösung finden."
        description="Wir freuen uns auf Ihre Anfrage."
        buttonText="Jetzt Anfrage stellen"
      />
    </>
  );
}
