import { company } from '@/data';
import { PageHero } from '@/components/Sections';

export default function Datenschutz() {
  return (
    <>
      <PageHero
        eyebrow="Rechtliches"
        title="Datenschutzerklärung"
        image="https://images.pexels.com/photos/590491/pexels-photo-590491.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2"
      />
      <section className="py-24">
        <div className="container-px max-w-3xl">
          <div className="space-y-6 text-navy-700">
            <div>
              <h2 className="text-xl font-bold text-navy-900">1. Datenschutz auf einen Blick</h2>
              <p className="mt-2">
                Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Wir behandeln Ihre personenbezogenen
                Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-navy-900">2. Verantwortliche Stelle</h2>
              <p className="mt-2">{company.legalName}</p>
              <p>{company.address}</p>
              <p>E-Mail: {company.email}</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-navy-900">3. Erhebung und Speicherung personenbezogener Daten</h2>
              <p className="mt-2">
                Wir erheben personenbezogene Daten, wenn Sie uns diese im Rahmen einer Anfrage oder Bewerbung freiwillig
                mitteilen. Die Verarbeitung erfolgt zur Bearbeitung Ihrer Anfrage und gemäß Art. 6 Abs. 1 lit. f DSGVO.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-navy-900">4. Ihre Rechte</h2>
              <p className="mt-2">
                Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung sowie
                Datenübertragbarkeit. Wenden Sie sich dazu bitte an die oben genannte Kontaktadresse.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
