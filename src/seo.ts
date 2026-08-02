const defaultDescription =
  'Qualifizierte Engineering Services und Construction Management für Chemie, Raffinerien, Kraftwerke und Infrastruktur. Einzelne Spezialisten oder komplette Teams – deutschland- und europaweit.';

export const defaultSeo = {
  title: 'Industries CMS | Engineering Services & Construction Management für die Industrie',
  description: defaultDescription,
};

const serviceSeo: Record<string, { title: string; description: string }> = {
  'engineering-services': {
    title: 'Engineering Services für Industrieprojekte | Industries CMS',
    description:
      'Projektleitung, Terminplanung, Cost Control und technische Dokumentation für anspruchsvolle Industrieprojekte. Flexibel und projektbezogen.',
  },
  'construction-management': {
    title: 'Construction Management & Bauleitung | Industries CMS',
    description:
      'Bauleitung, Supervision, HSE und QA/QC für Industriebauprojekte. Erfahrene Fachkräfte deutschland- und europaweit.',
  },
  'technical-experts': {
    title: 'Technical Experts & Industriespezialisten | Industries CMS',
    description:
      'Passgenaue Fach- und Führungskräfte für Projektmanagement, Engineering, HSE und Qualität. Schnell verfügbar für Ihr Projekt.',
  },
  'claim-nachtragsvorbereitung': {
    title: 'Claim- & Nachtragsvorbereitung | Industries CMS',
    description:
      'Professionelle Vorbereitung von Behinderungsanzeigen und Nachträgen. Termin- und Kostenbewertung nach Ihren Projektstandards.',
  },
  dokumentationsmanagement: {
    title: 'Dokumentationsmanagement für Projekte | Industries CMS',
    description:
      'Strukturierte Projektdokumentation nach Ihren Checklisten und Richtlinien. Vollständig, prüfbar und schnittstellenübergreifend.',
  },
};

const staticPageSeo: Record<string, { title: string; description: string }> = {
  '/': defaultSeo,
  '/projekte': {
    title: 'Projekte | Ersatzneubau Nagerlbrücke | Industries CMS',
    description:
      'Örtliche Bauleitung Stahlbau beim Ersatzneubau der Nagerlbrücke. Montage, Hebearbeiten und Qualitätsüberwachung im Brückenbau.',
  },
  '/ueber-uns': {
    title: 'Über uns | Industries CMS – Construction Management Solution',
    description:
      'Lernen Sie Industries CMS kennen – Ihr Partner für Engineering Services und Construction Management in der Prozessindustrie.',
  },
  '/kontakt': {
    title: 'Kontakt & Projektanfrage | Industries CMS',
    description:
      'Sprechen Sie mit uns über Ihr Projekt. Unverbindliche Anfrage – wir melden uns schnellstmöglich bei Ihnen.',
  },
  '/impressum': {
    title: 'Impressum | Industries CMS',
    description: 'Impressum der Industries CMS Construction Management Solution UG, Duisburg.',
  },
  '/datenschutz': {
    title: 'Datenschutz | Industries CMS',
    description: 'Datenschutzhinweise der Industries CMS Construction Management Solution UG, Duisburg.',
  },
};

export function getPageSeo(pathname: string) {
  if (staticPageSeo[pathname]) {
    return staticPageSeo[pathname];
  }

  const serviceMatch = pathname.match(/^\/leistungen\/([^/]+)$/);
  if (serviceMatch && serviceSeo[serviceMatch[1]]) {
    return serviceSeo[serviceMatch[1]];
  }

  return defaultSeo;
}

export function applyPageSeo(pathname: string) {
  const { title, description } = getPageSeo(pathname);
  document.title = title;

  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'description');
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', description);
}
