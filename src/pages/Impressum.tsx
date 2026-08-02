import CmsHeroBackdrop from '@/components/CmsHeroBackdrop';
import { company } from '@/data';

export default function Impressum() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 py-16 sm:py-20">
        <div className="absolute inset-0">
          <CmsHeroBackdrop />
        </div>
        <div className="container-px relative">
          <p className="section-eyebrow">Rechtliches</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Impressum</h1>
        </div>
      </section>

      <section className="py-24">
        <div className="container-px max-w-3xl">
          <div className="space-y-10 text-navy-700">
            <div>
              <h2 className="text-xl font-bold text-navy-900">Angaben gemäß § 5 TMG</h2>
              <div className="mt-4 space-y-1 leading-relaxed">
                <p className="font-semibold text-navy-900">{company.legalName}</p>
                <p>Geschäftsführer: {company.owner}</p>
                <p className="pt-2">{company.address}</p>
                <p>{company.country}</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy-900">Handelsregister</h2>
              <div className="mt-4 space-y-1 leading-relaxed">
                <p>Registergericht: {company.registerCourt}</p>
                <p>Registernummer: {company.registerNumber}</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy-900">Kontakt</h2>
              <div className="mt-4 space-y-1 leading-relaxed">
                <p>
                  Telefon:{' '}
                  <a href={`tel:${company.phone.replace(/[^\d+]/g, '')}`} className="text-accent-600 hover:text-accent-500">
                    {company.phone}
                  </a>
                </p>
                <p>
                  E-Mail:{' '}
                  <a href={`mailto:${company.email}`} className="text-accent-600 hover:text-accent-500">
                    {company.email}
                  </a>
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy-900">Umsatzsteuer-ID</h2>
              <p className="mt-4 leading-relaxed">
                Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz: {company.vatId}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy-900">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
              <div className="mt-4 space-y-1 leading-relaxed">
                <p>{company.contentResponsible.name}</p>
                <p>{company.contentResponsible.address}</p>
                <p>{company.country}</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy-900">Haftungsausschluss</h2>
              <p className="mt-4 leading-relaxed">
                Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links.
                Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy-900">Urheberrecht</h2>
              <p className="mt-4 leading-relaxed">
                Die durch den Seitenbetreiber erstellten Inhalte und Werke auf dieser Website unterliegen dem deutschen
                Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung,
                Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der
                schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
