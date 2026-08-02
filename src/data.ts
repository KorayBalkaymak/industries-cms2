import type { LucideIcon } from 'lucide-react';
import {
  Settings,
  HardHat,
  Users,
  FileText,
  FolderClosed,
  ChevronRight,
  ClipboardList,
  ShieldCheck,
  ShieldAlert,
  Globe,
  Handshake,
  ClipboardCheck,
  CalendarClock,
  CalendarDays,
  DollarSign,
  FileCheck,
  FileWarning,
  FileStack,
  Network,
  BarChart3,
  PieChart,
  Megaphone,
  PackageSearch,
  Factory,
  Power,
  Wrench,
  Cpu,
  FlaskConical,
  Building2,
  Layers,
  Briefcase,
  UserCheck,
  Repeat,
  HandHeart,
  Headset,
  Building,
  TrendingUp,
  ShoppingCart,
  Construction,
  DraftingCompass,
  Search,
  UserCog,
  MapPinned,
  Calculator,
  Laptop,
  Monitor,
  MoreHorizontal,
  Wrench,
  Star,
  CheckCircle2,
  ClipboardPen,
  CalendarCheck,
  Stamp,
  FolderSearch,
  CircleDollarSign,
  FileUp,
  FolderTree,
  ShieldHalf,
  Clock,
  HandHelping,
  Award,
  Workflow,
  Lock,
  Timer,
  MessageCircle,
  PlayCircle,
  Puzzle,
  User,
} from 'lucide-react';

export type Service = {
  slug: string;
  title: string;
  short: string;
  icon: LucideIcon;
  image: string;
  heroTitle: string;
  heroSubtitle: string;
  heroTagline?: string;
  heroDescription?: string;
  heroSecondaryButton?: {
    label: string;
    variant: 'scroll' | 'calendar';
    href?: string;
  };
  tasksAreasBlock?: {
    tasksTitle: string;
    tasks: string[];
    areasTitle: string;
    areas: string[];
  };
  supportAreasTitle?: string;
  supportAreas: { icon: LucideIcon; title: string; desc: string }[];
  siteSpecialistsTitle?: string;
  siteSpecialists?: { icon: LucideIcon; title: string; desc: string }[];
  expertFieldsBlock?: {
    title: string;
    subtitle: string;
    columns: { icon: LucideIcon; title: string; roles: string[] }[];
    additionalTitle: string;
    additional: { icon: LucideIcon; title: string }[];
  };
  expertTrustBlock?: {
    title: string;
    items: {
      icon: LucideIcon;
      title: string;
      desc: string;
      iconVariant?: 'team-star';
    }[];
  };
  expertStepsBlock?: {
    eyebrow?: string;
    title: string;
    steps: { icon: LucideIcon; title: string; desc: string }[];
  };
  collaborationStepsBlock?: {
    eyebrow?: string;
    title: string;
    replaceSupportSection?: boolean;
    steps: { icon: LucideIcon; title: string; desc: string }[];
  };
  claimDetailsBlock?: {
    scopeTitle: string;
    scopeItems: string[];
    benefitsTitle: string;
    benefits: { icon: LucideIcon; text: string }[];
    onsiteTitle: string;
    onsiteDescription: string;
    onsiteTasks: string[];
    billingNote: string;
    closingHighlight: string;
    closingSubtext: string;
  };
  documentationDetailsBlock?: {
    scopeTitle: string;
    scopeItems: string[];
    guidelinesTitle: string;
    guidelinesIntro: string[];
    guidelinesPoints: { icon: LucideIcon; text: string }[];
    integrationTitle: string;
    integrationText: string;
    integrationHighlights: { icon: LucideIcon; text: string }[];
  };
  alternativeBanner?: {
    eyebrow?: string;
    title: string;
    description: string;
    descriptionLine2?: string;
    buttonText: string;
  };
  einsatzgebiete: string[];
  spezialisten: string[];
};

export const services: Service[] = [
  {
    slug: 'engineering-services',
    title: 'Engineering Services',
    short:
      'Unterstützung Ihrer Projektorganisation durch erfahrene Experten für Planung, Steuerung, Termin- und Kostenmanagement sowie Dokumentation.',
    icon: Settings,
    image: '/images/engineering-services.png',
    heroTitle: 'Engineering Services',
    heroSubtitle:
      'Planung, Steuerung und Kontrolle – wir stärken Ihre Projektorganisation mit erfahrener Engineering-Expertise.',
    supportAreas: [
      { icon: UserCheck, title: 'Projektleitung', desc: 'Gesamtverantwortung und Führung' },
      { icon: TrendingUp, title: 'Projektsteuerung', desc: 'Controlling, Reporting und Koordination' },
      { icon: CalendarDays, title: 'Terminplanung', desc: 'Planung, Überwachung und Fortschreibung' },
      { icon: FileCheck, title: 'Cost Control', desc: 'Kostenverfolgung und Budgetüberwachung' },
      { icon: ShieldAlert, title: 'Claims Management', desc: 'Anspruchsprüfung und Nachtragsmanagement' },
      { icon: FileText, title: 'Technische Dokumentation', desc: 'Erstellung und Pflege aller Projektdokumente' },
      { icon: Network, title: 'Interface Management', desc: 'Schnittstellenkoordination und Kommunikation' },
      { icon: PieChart, title: 'Reporting', desc: 'Transparente Berichte und Analysen' },
    ],
    einsatzgebiete: [
      'Basic & Detail Engineering',
      'Projektsteuerung und -controlling',
      'Termin- und Kostenmanagement',
      'Claims- und Nachtragsmanagement',
      'Technische Dokumentation',
      'Interface- und Schnittstellenmanagement',
      'Reporting und Statuswesen',
    ],
    spezialisten: [
      'Projektleiter',
      'Projektsteuerer',
      'Terminplaner',
      'Cost Controller',
      'Claims Manager',
      'Dokumentationsmanager',
      'Interface Manager',
      'Reporting Engineer',
    ],
  },
  {
    slug: 'construction-management',
    title: 'Construction Management',
    short:
      'Erfahrene Spezialisten für eine sichere, effiziente und qualitätsgerechte Bauausführung und Montage.',
    icon: HardHat,
    image: '/images/construction-management.png',
    heroTitle: 'Construction Management',
    heroSubtitle:
      'Sichere, effiziente und qualit\u00e4tsgerechte Bauausf\u00fchrung \u2013 von der Bauleitung bis zur Montagebegleitung.',
    heroTagline: 'Wir steuern. Wir koordinieren. Wir liefern.',
    heroDescription:
      'Erfahrene Bau- und Management-Spezialisten stellen sicher, dass Ihre Baustelle sicher, effizient und termingerecht abgewickelt wird \u2013 von der ersten Mobilisierung bis zur erfolgreichen \u00dcbergabe.',
    tasksAreasBlock: {
      tasksTitle: 'Typische Aufgaben \u2013 Beispiel: Bauleiter',
      tasks: [
        'Koordination aller Gewerke und Nachunternehmer',
        '\u00dcberwachung von Terminen, Kosten und Qualit\u00e4t',
        'Sicherstellung der Arbeitssicherheit und Einhaltung von Vorgaben',
        'Pr\u00fcfung von Material, Ausf\u00fchrung und Dokumentation',
        'Kommunikation mit Auftraggeber, Planern und Beh\u00f6rden',
        'Erstellung von Tagesberichten und Fortschrittsmeldungen',
      ],
      areasTitle: 'Einsatzbereiche',
      areas: [
        'Raffinerien',
        'Chemieanlagen',
        'Kraftwerke',
        'Infrastrukturprojekte',
        'Stahlwerke',
        'Pharmaindustrie',
        'Oil & Gas',
      ],
    },
    supportAreasTitle: 'Unsere Leistungen im Construction Management',
    supportAreas: [
      {
        icon: HardHat,
        title: 'Bauleitung',
        desc: 'Verantwortung f\u00fcr eine effiziente und qualit\u00e4tsgerechte Bauausf\u00fchrung',
      },
      {
        icon: UserCog,
        title: 'Construction Management',
        desc: '\u00dcbergeordnete Steuerung von Projektzielen, Terminen und Ressourcen',
      },
      {
        icon: Users,
        title: 'Supervisor & Montageleitung',
        desc: 'F\u00fchrung und Koordination von Montage- und Baustellenteams',
      },
      {
        icon: ClipboardList,
        title: 'Baustellenkoordination',
        desc: 'Schnittstellenmanagement und Abstimmung aller Gewerke',
      },
      {
        icon: ShieldCheck,
        title: 'HSE Management',
        desc: 'Sicherheit, Gesundheit und Umweltschutz auf h\u00f6chstem Niveau',
      },
      {
        icon: Search,
        title: 'QA / QC',
        desc: 'Qualit\u00e4tssicherung und Qualit\u00e4tskontrolle entlang des gesamten Projekts',
      },
    ],
    siteSpecialistsTitle: 'Unsere Spezialisten f\u00fcr Ihre Baustelle',
    siteSpecialists: [
      {
        icon: HardHat,
        title: 'Bauleiter',
        desc: 'Verantwortung f\u00fcr die Gesamtabwicklung auf der Baustelle.',
      },
      {
        icon: UserCog,
        title: 'Construction Manager',
        desc: '\u00dcbergeordnete Steuerung von Projektzielen, Kosten und Ressourcen.',
      },
      {
        icon: Users,
        title: 'Supervisor',
        desc: 'Fachliche F\u00fchrung von Gewerken und Montage-Teams vor Ort.',
      },
      {
        icon: Wrench,
        title: 'Montageleiter',
        desc: 'Planung und Leitung von mechanischen und elektrischen Montagen.',
      },
      {
        icon: MapPinned,
        title: 'Site Manager',
        desc: 'Gesamtverantwortung f\u00fcr den Standort und das Projektteam.',
      },
      {
        icon: ShieldCheck,
        title: 'HSE Manager',
        desc: 'Sicherstellung aller HSE-Anforderungen und Compliance.',
      },
      {
        icon: Search,
        title: 'QA / QC Specialist',
        desc: 'Qualit\u00e4tssicherung und Kontrolle gem\u00e4\u00df Normen und Spezifikationen.',
      },
    ],
    einsatzgebiete: [
      'Neubau und Erweiterung von Industrieanlagen',
      'Montagebegleitung und -steuerung',
      'Stillstand und Turnaround',
      'Instandhaltung und Anlagenumbau',
      'Arbeitssicherheitskoordination',
      'Qualitäts- und Abnahmemanagement',
      'Baudokumentation und Reporting',
    ],
    spezialisten: [
      'Bauleiter',
      'Bauoberleiter',
      'SiFa-Koordinator',
      'Montageleiter',
      'Qualitätskontrolleur',
      'Gewerkekoordinator',
      'Abnahmeingenieur',
      'Baudokumentator',
    ],
  },
  {
    slug: 'technical-experts',
    title: 'Technical Experts',
    short:
      'Die passenden Spezialisten für Ihr Projekt – aus unserem Netzwerk oder durch uns vollständig besetzt.',
    icon: Users,
    image: '/images/technical-experts.png',
    heroTitle: 'Technical Experts',
    heroSubtitle:
      'Passgenaue Spezialisten für Ihr Projekt – einzeln oder als eingespieltes Team aus unserem Netzwerk.',
    heroTagline: 'Die passenden Spezialisten f\u00fcr Ihr Projekt',
    heroDescription:
      'Egal ob Engineering, Construction, Qualit\u00e4t, HSE oder IT \u2013 wir stellen Ihnen erfahrene Experten f\u00fcr jede Disziplin und Projektphase bereit.',
    expertFieldsBlock: {
      title: 'Unsere Experten \u2013 Alle Fachbereiche auf einen Blick',
      subtitle: 'W\u00e4hlen Sie den Bereich und die Rolle, die Sie f\u00fcr Ihr Projekt ben\u00f6tigen.',
      columns: [
        {
          icon: MapPinned,
          title: 'Projektmanagement',
          roles: [
            'Projektleiter',
            'Projektsteuerer',
            'Projektkoordinator',
            'PMO Manager',
            'Claims Specialist',
            'Interface Manager',
            'Risk Manager',
            'Contract Manager',
          ],
        },
        {
          icon: Construction,
          title: 'Construction',
          roles: [
            'Bauleiter',
            'Construction Manager',
            'Site Manager',
            'Supervisor (mechanical)',
            'Supervisor (civil)',
            'Montageleiter',
            'Baustellenkoordinator',
            'Material Coordinator',
          ],
        },
        {
          icon: ShieldCheck,
          title: 'Qualit\u00e4t & Inspektion',
          roles: [
            'QA/QC Manager',
            'QA/QC Inspector',
            'Schwei\u00dfaufsicht (IWT)',
            'NDT / ZfP Spezialist',
            'Material Inspector',
            'Painting Inspector',
            'Coating Inspector',
            'Quality Engineer',
          ],
        },
        {
          icon: HardHat,
          title: 'HSE',
          roles: [
            'HSE Manager',
            'HSE Engineer',
            'HSE Advisor',
            'Sicherheitsfachkraft',
            'SiGeKo',
            'Umweltbeauftragter',
            'HSE Auditor',
            'Brandschutzbeauftragter',
          ],
        },
        {
          icon: Settings,
          title: 'Engineering',
          roles: [
            'Prozessingenieur',
            'Rohrleitungsplaner',
            'Elektroingenieur',
            'EMSR Engineer',
            'Instrumenteningenieur',
            'Maschinenbauingenieur',
            'Civil Engineer',
            'Piping Engineer',
          ],
        },
      ],
      additionalTitle: 'Weitere Spezialisten',
      additional: [
        { icon: CalendarClock, title: 'Terminplaner / Scheduler' },
        { icon: Calculator, title: 'Cost Controller / Estimator' },
        { icon: FileStack, title: 'Dokumentationsspezialist' },
        { icon: Monitor, title: 'CAD Designer / Technischer Zeichner' },
        { icon: FlaskConical, title: 'Verfahrenstechniker' },
        { icon: Wrench, title: 'Inbetriebnahme-Ingenieur' },
        { icon: Laptop, title: 'IT / Datenmanagement' },
        { icon: MoreHorizontal, title: 'und viele weitere' },
      ],
    },
    expertTrustBlock: {
      title: 'Warum Kunden auf unsere Experten setzen',
      items: [
        {
          icon: Users,
          iconVariant: 'team-star',
          title: 'Erfahren & qualifiziert',
          desc: 'Unsere Experten verf\u00fcgen \u00fcber langj\u00e4hrige Erfahrung in Industrieprojekten weltweit.',
        },
        {
          icon: CheckCircle2,
          title: 'Passgenau & flexibel',
          desc: 'Sie erhalten genau die Spezialisten, die Ihr Projekt wirklich weiterbringen.',
        },
        {
          icon: Globe,
          title: 'Schnell verf\u00fcgbar',
          desc: 'Gro\u00dfes Netzwerk erm\u00f6glicht kurzfristige Verf\u00fcgbarkeit \u2013 auch f\u00fcr komplexe Anforderungen.',
        },
        {
          icon: ShieldCheck,
          title: 'Qualit\u00e4t & Verl\u00e4sslichkeit',
          desc: 'Gepr\u00fcfte Fachkompetenz und zuverl\u00e4ssiger Einsatz \u2013 von der Planung bis zur Umsetzung.',
        },
      ],
    },
    expertStepsBlock: {
      eyebrow: 'In vier Schritten',
      title: 'So einfach geht\u2019s',
      steps: [
        {
          icon: ClipboardPen,
          title: 'Bedarf \u00fcbermitteln',
          desc: 'Sie senden uns Ihre Anforderungen und Projektinformationen.',
        },
        {
          icon: Users,
          title: 'Passende Experten erhalten',
          desc: 'Wir schlagen Ihnen geeignete Spezialisten mit Profilen vor.',
        },
        {
          icon: UserCheck,
          title: 'Auswahl treffen',
          desc: 'Sie w\u00e4hlen die passenden Experten f\u00fcr Ihr Projekt aus.',
        },
        {
          icon: Handshake,
          title: 'Projektstart',
          desc: 'Die Experten starten zum vereinbarten Zeitpunkt.',
        },
      ],
    },
    alternativeBanner: {
      title: 'Nicht den passenden Experten gefunden?',
      description:
        'Kein Problem \u2013 wir finden die richtige L\u00f6sung f\u00fcr Ihre Anforderungen.',
      buttonText: 'Jetzt Anfrage stellen',
    },
    supportAreas: [
      { icon: Users, title: 'Spezialisten-Selektion', desc: 'Kandidatenprofile passend zu Ihrer Anforderung.' },
      { icon: UserCheck, title: 'Qualifikationsprüfung', desc: 'Geprüfte Referenzen und Fachkompetenz.' },
      { icon: Briefcase, title: 'Disziplinübergreifend', desc: 'Von Process bis Mechanical, E&I und Automation.' },
      { icon: Repeat, title: 'Flexibler Einsatz', desc: 'Tagesweise, projektbezogen oder langfristig.' },
      { icon: Handshake, title: 'Vertragsmodelle', desc: 'Werkvertrag, ANÜ oder Freelance – passend zu Ihnen.' },
      { icon: Network, title: 'Schnittstellenkompetenz', desc: 'Experten, die Gewerke und Teams verbinden.' },
      { icon: BarChart3, title: 'Reporting-Support', desc: 'Dokumentation und Berichterstattung inklusive.' },
      { icon: ShieldCheck, title: 'Sicherheit & Compliance', desc: 'Geschulte Experten nach Ihren Standards.' },
    ],
    einsatzgebiete: [
      'Process Engineering',
      'Mechanical Engineering',
      'Electrical & Instrumentation',
      'Automation & DCS',
      'Rohrleitungs- und Anlagenbau',
      'Stillstand & Turnaround',
      'Commissioning und Inbetriebnahme',
    ],
    spezialisten: [
      'Process Engineer',
      'Mechanical Engineer',
      'E&I Engineer',
      'Automation Engineer',
      'Rohrleitungsbau-Spezialist',
      'Commissioning Engineer',
      'Turnaround Manager',
      'Maintenance Engineer',
    ],
  },
  {
    slug: 'claim-nachtragsvorbereitung',
    title: 'Claim- & Nachtragsvorbereitung',
    short:
      'Strukturierte Vorbereitung von Behinderungsanzeigen, Nachträgen und Claims nach Ihren Vorgaben – terminlich & kostenrelevant.',
    icon: FileWarning,
    image:
      'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    heroTitle: 'Claim- & Nachtragsvorbereitung',
    heroSubtitle:
      'Strukturierte, nachvollziehbare Aufbereitung von Behinderungsanzeigen, Nachtr\u00e4gen und Claims.',
    heroTagline: 'Anspr\u00fcche sichern. Risiken minimieren.',
    heroDescription:
      'Wir unterst\u00fctzen Sie bei der strukturierten Vorbereitung von Behinderungsanzeigen, Nachtr\u00e4gen und Claims nach Ihren internen Prozessen und vertraglichen Anforderungen. Die Bearbeitung erfolgt auf Basis der von Ihrer Baustelle bereitgestellten Informationen sowie in enger Abstimmung mit Ihren Projektverantwortlichen.',
    heroSecondaryButton: {
      label: 'Mehr erfahren',
      variant: 'scroll',
    },
    collaborationStepsBlock: {
      eyebrow: 'Zusammenarbeit',
      title: 'So l\u00e4uft die Zusammenarbeit',
      steps: [
        {
          icon: Network,
          title: 'Projektanfrage',
          desc: 'Sie beschreiben den Sachverhalt und Ihren Unterst\u00fctzungsbedarf.',
        },
        {
          icon: CalendarCheck,
          title: 'Pr\u00fcfung unserer Kapazit\u00e4ten',
          desc: 'Wir pr\u00fcfen die Verf\u00fcgbarkeit und best\u00e4tigen die Umsetzung.',
        },
        {
          icon: Stamp,
          title: 'Abstimmung der Vertragsgrundlagen',
          desc: 'Wir erhalten und pr\u00fcfen die relevanten Vertragsunterlagen und Rahmenbedingungen.',
        },
        {
          icon: ClipboardList,
          title: 'Definition der Vorgehensweise nach Kundenvorgaben',
          desc: 'Wir legen gemeinsam den Prozess, die Zust\u00e4ndigkeiten und Schnittstellen fest.',
        },
        {
          icon: HardHat,
          title: 'Laufende Zuarbeit von der Baustelle',
          desc: 'Baustelle, Obermonteure oder Bauleiter liefern Fotos, Berichte und Informationen.',
        },
        {
          icon: FolderSearch,
          title: 'Pr\u00fcfung der Unterlagen',
          desc: 'Wir pr\u00fcfen die vorliegenden Informationen, Unterlagen und Nachweise.',
        },
        {
          icon: CircleDollarSign,
          title: 'Termin- und Kostenbewertung',
          desc: 'Wir ermitteln die terminlichen und kostenrelevanten Auswertungen.',
        },
        {
          icon: ClipboardPen,
          title: 'Vorbereitung der Behinderungsanzeige und des Nachtrags',
          desc: 'Wir erstellen die vollst\u00e4ndigen Unterlagen gem\u00e4\u00df Vertrag und Ihren Vorgaben.',
        },
        {
          icon: FileUp,
          title: '\u00dcbergabe / Unterst\u00fctzung bei der Einreichung',
          desc: 'Wir \u00fcbergeben die Unterlagen oder unterst\u00fctzen Sie bei der Einreichung beim Auftraggeber.',
        },
      ],
    },
    claimDetailsBlock: {
      scopeTitle: 'Unser Leistungsumfang',
      scopeItems: [
        'Dokumentation von Behinderungen',
        'Erstellung von Behinderungsanzeigen',
        'Sichtung und Auswertung von Baustelleninformationen',
        'Terminliche Auswirkungen analysieren',
        'Kostenrelevante Auswirkungen ermitteln',
        'Pr\u00fcfung der vertraglichen Grundlagen',
        'Vorbereitung von Nachtr\u00e4gen und Claims',
        'Unterst\u00fctzung bei der Kommunikation mit dem Auftraggeber',
      ],
      benefitsTitle: 'Ihre Vorteile',
      benefits: [
        {
          icon: FolderTree,
          text: 'Strukturierte und nachvollziehbare Dokumentation',
        },
        {
          icon: ShieldHalf,
          text: 'Sicherung Ihrer Anspr\u00fcche und Forderungen',
        },
        {
          icon: Clock,
          text: 'Transparente Termin- und Kostenbewertungen',
        },
        {
          icon: Wrench,
          text: 'Passgenaue Umsetzung nach Ihren Vorgaben und Vertr\u00e4gen',
        },
        {
          icon: HandHelping,
          text: 'Entlastung Ihres Projektteams',
        },
      ],
      onsiteTitle: 'Auf Wunsch: Unterst\u00fctzung vor Ort',
      onsiteDescription:
        'Wir stellen einen erfahrenen Construction Site Support Specialist zur Verf\u00fcgung, der direkt auf der Baustelle unterst\u00fctzt:',
      onsiteTasks: [
        'Erfassung von Behinderungen und Ereignissen',
        'Fotos, Aufma\u00dfe und Informationen sammeln',
        'Enge Abstimmung mit Bauleitung / Obermonteuren',
        'Zuarbeit f\u00fcr die Claim- & Nachtragsvorbereitung',
      ],
      billingNote: 'Abrechnung nach Stunden.',
      closingHighlight: 'Ihre Prozesse. Unsere Unterst\u00fctzung.',
      closingSubtext: 'Wir arbeiten nach Ihren Vorgaben, Systemen und Checklisten.',
    },
    supportAreas: [
      { icon: FileWarning, title: 'Behinderungsanzeigen', desc: 'Fristgerechte und formgerechte Meldung.' },
      { icon: FileText, title: 'Nachtragsmanagement', desc: 'Strukturierte Aufstellung und Begründung.' },
      { icon: CalendarClock, title: 'Terminliche Bewertung', desc: 'Bauzeit- und Ablaufanalyse.' },
      { icon: DollarSign, title: 'Kostenbewertung', desc: 'Nachvollziehbare Kalkulation von Mehrkosten.' },
      { icon: FileStack, title: 'Dokumentation', desc: 'Vollständige, prüfbare Unterlagenerstellung.' },
      { icon: Network, title: 'Schnittstellenanalyse', desc: 'Ursachen- und Verursacheranalyse.' },
      { icon: BarChart3, title: 'Verhandlungsunterstützung', desc: 'Argumentations- und Verhandlungsunterstützung.' },
      { icon: ShieldCheck, title: 'Compliance', desc: 'Nach VOB/B und Ihren Vorgaben.' },
    ],
    einsatzgebiete: [
      'Behinderungsanzeigen und Nachträge',
      'Bauzeit- und Verzögerungsanalyse',
      'Kosten- und Aufwandsbewertung',
      'Schnittstellen- und Störungsanalyse',
      'Verhandlungs- und Vertragsmanagement',
      'Dokumentation und Nachweisführung',
    ],
    spezialisten: [
      'Claims Manager',
      'Nachtragsmanager',
      'Bauzeit-Analyst',
      'Cost Engineer',
      'Vertragsmanager',
      'Dokumentationsmanager',
    ],
  },
  {
    slug: 'dokumentationsmanagement',
    title: 'Dokumentationsmanagement',
    short:
      'Dokumentation nach Ihren Projektstandards. Wir stellen sicher, dass Ihre Unterlagen vollständig, strukturiert und prüfbereit sind.',
    icon: FolderClosed,
    image: '/images/dokumentationsmanagement.png',
    heroTitle: 'Dokumentationsmanagement',
    heroSubtitle:
      'Vollst\u00e4ndige, strukturierte und pr\u00fcfbereite Dokumentation nach Ihren Projektstandards.',
    heroTagline: 'Nach Ihren Projektstandards',
    heroDescription:
      'Wir \u00fcbernehmen das Dokumentationsmanagement entsprechend Ihrer Vorgaben, Standards und Dokumentationsrichtlinien. Unsere Leistungen werden individuell auf Ihr Projekt abgestimmt und in enger Abstimmung mit Ihrem Team erbracht.',
    heroSecondaryButton: {
      label: 'Mehr erfahren',
      variant: 'scroll',
    },
    collaborationStepsBlock: {
      replaceSupportSection: true,
      eyebrow: 'Zusammenarbeit',
      title: 'So l\u00e4uft die Zusammenarbeit',
      steps: [
        {
          icon: Network,
          title: 'Anfrage des Kunden',
          desc: 'Sie beschreiben Ihren Bedarf und Ihre Projektanforderungen.',
        },
        {
          icon: CalendarCheck,
          title: 'Pr\u00fcfung unserer Kapazit\u00e4ten',
          desc: 'Wir pr\u00fcfen die Verf\u00fcgbarkeit und best\u00e4tigen die Umsetzung.',
        },
        {
          icon: ClipboardCheck,
          title: '\u00dcbergabe Ihrer Checklisten, Richtlinien und Vorgaben',
          desc: 'Sie stellen uns Ihre Dokumentationsanforderungen und Standards zur Verf\u00fcgung.',
        },
      ],
    },
    documentationDetailsBlock: {
      scopeTitle: 'Unser Leistungsumfang',
      scopeItems: [
        'Pr\u00fcfung Ihrer Dokumentationsanforderungen',
        'Umsetzung nach Ihren Checklisten und Vorgaben',
        'Strukturierung der Projektdokumentation',
        'Dokumentenpr\u00fcfung und Qualit\u00e4tssicherung',
        'Dokumentenlenkung und Versionsmanagement',
        'Pflege von Dokumentenmanagementsystemen (DMS)',
        'Zusammenstellung der Abschlussdokumentation',
      ],
      guidelinesTitle: 'Nach Ihren Vorgaben',
      guidelinesIntro: [
        'Wir arbeiten nicht nach einem starren Standard.',
        'Unsere Leistungen richten sich vollst\u00e4ndig nach Ihren Projektvorgaben, Prozessen und Dokumentationsrichtlinien.',
      ],
      guidelinesPoints: [
        { icon: Network, text: 'Integration in Ihre Prozesse' },
        { icon: ClipboardCheck, text: 'Einhaltung Ihrer Standards' },
        { icon: ShieldCheck, text: 'Vertraulich & zuverl\u00e4ssig' },
      ],
      integrationTitle: 'Nahtlos in Ihre Projektorganisation integriert',
      integrationText:
        'Wir verstehen uns als Erweiterung Ihres Teams und arbeiten Hand in Hand mit Ihren Projektverantwortlichen, Dokumentenverantwortlichen und Fachabteilungen.',
      integrationHighlights: [
        { icon: Award, text: 'Erfahrene Spezialisten' },
        { icon: Workflow, text: 'Prozessorientierte Arbeitsweise' },
        { icon: Lock, text: 'H\u00f6chste Daten- und Informationssicherheit' },
        { icon: Timer, text: 'Effizient & termingerecht' },
      ],
    },
    supportAreas: [
      { icon: FolderClosed, title: 'Dokumentenlenkung', desc: 'Strukturierte Ablage und Versionierung.' },
      { icon: FileStack, title: 'Prüfbare Unterlagen', desc: 'Vollständige, nachvollziehbare Dokumente.' },
      { icon: ClipboardCheck, title: 'Qualitätssicherung', desc: 'Prüfung auf Vollständigkeit und Konsistenz.' },
      { icon: Network, title: 'Schnittstellen-Doku', desc: 'Gewerke- und partnerübergreifende Doku.' },
      { icon: BarChart3, title: 'Reporting', desc: 'Status- und Fortschrittsberichte.' },
      { icon: FileText, title: 'Nachtragsunterlagen', desc: 'Begleitende Doku für Claims und Nachträge.' },
      { icon: CalendarClock, title: 'Terminverfolgung', desc: 'Fristen- und Meilensteindokumentation.' },
      { icon: ShieldCheck, title: 'Compliance', desc: 'Nach Normen- und Projektstandards.' },
    ],
    einsatzgebiete: [
      'Projektdokumentation nach Standard',
      'Dokumentenlenkung und -versionierung',
      'Prüfbare Unterlagenerstellung',
      'Schnittstellen- und Gewerke-Doku',
      'Status- und Fortschrittsberichte',
      'Compliance- und Normkonformität',
    ],
    spezialisten: [
      'Dokumentationsmanager',
      'Dokumentenkontrolleur',
      'Reporting Engineer',
      'Quality Engineer',
      'Compliance Beauftragter',
      'Projektassistent',
    ],
  },
];

export const valuePillars = [
  { icon: UserCheck, title: 'Erfahrene Spezialisten', sub: 'für anspruchsvolle Industrieprojekte' },
  { icon: ShieldCheck, title: 'Qualität & Sicherheit', sub: 'stehen bei uns an erster Stelle' },
  { icon: Globe, title: 'Deutschland & Europaweit', sub: 'flexibel und schnell im Einsatz' },
  { icon: Handshake, title: 'Partnerschaftlich', sub: 'zuverlässig, transparent und lösungsorientiert' },
];

export const projectPhases = [
  { icon: DraftingCompass, title: 'Engineering', desc: 'Konzeption, Planung und Basic Engineering' },
  { icon: TrendingUp, title: 'Projektsteuerung', desc: 'Projektmanagement, Controlling und Terminplanung' },
  { icon: ShoppingCart, title: 'Beschaffung', desc: 'Unterstützung im Einkauf und bei der Lieferantenkoordination' },
  { icon: Construction, title: 'Construction', desc: 'Bau, Montage und Baustellenmanagement' },
  { icon: Building2, title: 'Commissioning', desc: 'Inbetriebnahme und Testphasen' },
  { icon: Repeat, title: 'Turnaround und Shutdown', desc: 'Stillstände, Revisionen und Anlagenumbauten' },
  { icon: Wrench, title: 'Betrieb und Maintenance', desc: 'Unterstützung im laufenden Anlagenbetrieb' },
];

export const industries = [
  { title: 'Chemie & Petrochemie', image: '/images/chemie-petrochemie.png' },
  { title: 'Raffinerien', image: '/images/raffinerien.png' },
  { title: 'Kraftwerke', image: '/images/kraftwerke.png' },
  { title: 'Stahlindustrie', image: '/images/stahlindustrie.png' },
  { title: 'Öl & Gas', image: '/images/oel-gas.png' },
  { title: 'Pharmaindustrie', image: '/images/pharmaindustrie.png' },
  { title: 'Infrastruktur', image: '/images/infrastruktur.png' },
];

export const whyUs = [
  { icon: Layers, title: 'Flexibel & bedarfsgerecht', desc: 'Maßgeschneiderte Lösungen – für einzelne Positionen oder komplette Teams.' },
  { icon: UserCheck, title: 'Passgenaue Spezialisten', desc: 'Erfahrene Fach- und Führungskräfte mit branchenspezpezifischem Know-how.' },
  { icon: Users, title: 'Komplette Projektteams', desc: 'Eingespielte Teams für maximale Effizienz und reibungslose Projektabwicklung.' },
  { icon: Globe, title: 'Deutschland & Europaweit', desc: 'Schnell verfügbar, flexibel einsetzbar – wo Ihr Projekt uns braucht.' },
];

export const cooperationCards = [
  {
    icon: Puzzle,
    title: 'Integration statt Standard',
    desc: 'Wir arbeiten nach Ihren Prozessen, Richtlinien und Standards \u2013 nicht nach starren Vorgaben.',
  },
  {
    icon: Users,
    title: 'Flexibilit\u00e4t',
    desc: 'Ob einzelner Spezialist oder komplettes Team \u2013 wir liefern die L\u00f6sung, die Ihr Projekt ben\u00f6tigt.',
  },
  {
    icon: FileText,
    title: 'Engineering Services',
    desc: 'Mehr als Personal: Wir \u00fcbernehmen definierte Dienstleistungen wie Claim-Vorbereitung oder Dokumentationsmanagement.',
  },
  {
    icon: Handshake,
    title: 'Partnerschaft',
    desc: 'Direkter Austausch, kurze Wege und ein Verst\u00e4ndnis f\u00fcr Ihre Projektanforderungen.',
  },
];

export const aboutWorkSteps = [
  { icon: MessageCircle, title: 'Anfrage', desc: 'Sie beschreiben Ihren Bedarf.' },
  { icon: Users, title: 'Kapazit\u00e4tspr\u00fcfung', desc: 'Wir pr\u00fcfen unsere Verf\u00fcgbarkeit.' },
  { icon: ClipboardPen, title: 'Abstimmung', desc: 'Gemeinsame Kl\u00e4rung der Anforderungen.' },
  { icon: User, title: 'L\u00f6sung definieren', desc: 'Spezialist, Team oder Service ausw\u00e4hlen.' },
  { icon: PlayCircle, title: 'Projektstart', desc: 'Schneller und strukturierter Onboarding-Prozess.' },
  { icon: Settings, title: 'Laufende Betreuung', desc: 'Kontinuierlicher Austausch und Projektunterst\u00fctzung.' },
  { icon: CheckCircle2, title: 'Projektabschluss', desc: '\u00dcbergabe der Ergebnisse und Projektauswertung.' },
];

export const aboutAnspruchPoints = [
  'Arbeiten nach Kundenvorgaben',
  'Engineering statt Standardl\u00f6sungen',
  'Einzelne Spezialisten oder komplette Teams',
  'Deutschland- und europaweit im Einsatz',
];

export const processSteps = [
  'Anfrage beschreiben',
  'Kapazitätsprüfung',
  'Abstimmung',
  'Lösung definieren',
  'Projektstart',
  'Laufende Betreuung',
  'Projektabschluss',
];

export const heroImage = '/images/hero-industries-cms-4k.png';

export const aboutHeroImage =
  'https://images.pexels.com/photos/8438922/pexels-photo-8438922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

export const company = {
  name: 'Industries CMS',
  legalName: 'Industries CMS Construction Management Solution UG',
  owner: 'Pascal Maurice Candau Y Forner',
  address: 'Johanniterstraße 44, 47053 Duisburg',
  country: 'Deutschland',
  phone: '+49 (0)177 7452238',
  email: 'candau@industries-cms.com',
  vatId: 'DE455538894',
  registerCourt: 'Amtsgericht Duisburg',
  registerNumber: 'HRB 40300',
  contentResponsible: {
    name: 'Pascal Maurice Candau Y Forner',
    address: 'Johanniterstraße 44, 47053 Duisburg',
  },
};

export const navItems = [
  { label: 'Startseite', to: '/' },
  { label: 'Leistungen', children: services.map((s) => ({ label: s.title, to: `/leistungen/${s.slug}` })) },
  { label: 'Projekte', to: '/projekte' },
  { label: 'Über uns', to: '/ueber-uns' },
  { label: 'Kontakt', to: '/kontakt' },
];

export { ChevronRight, Megaphone, Factory, FlaskConical, Building2, Headset, Building };
