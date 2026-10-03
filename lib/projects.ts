type Copy = { en: string; fr: string };

type TitledItem = { title: Copy; body: Copy };

export type Project = {
  slug: string;
  tag: Copy;
  title: Copy;
  oneliner: Copy;
  description: Copy;
  // Client organisation, named publicly (shown in the hero "delivered for"
  // line). Omit for Bly's own initiatives.
  client?: string;
  // Public URL of the live product
  url?: string;
  // Homepage screenshot of the live product (1440×900, in /public).
  // Refresh: npx playwright screenshot --channel=chrome
  //   --viewport-size=1440,900 --wait-for-timeout=9000 <url> public/work/<slug>.png
  preview?: string;
  // Omit when the client doesn't want the stack disclosed
  stack?: string[];
  stat?: { value: string; label: Copy };
  // Case study page content
  challenge: Copy;
  what: Copy;
  // What the product does for its users
  highlights?: TitledItem[];
  // Engineering decisions, with rationale
  decisions?: TitledItem[];
  outcome: Copy;
};

export const PROJECTS: Project[] = [
  {
    slug: "fdjh",
    tag: { en: "Sport & inclusion", fr: "Sport & inclusion" },
    title: {
      en: "Fédération Djiboutienne de Handisport — official website",
      fr: "Fédération Djiboutienne de Handisport — site officiel",
    },
    oneliner: {
      en: "The federation's official website: six disciplines, the full season, and built-in accessibility controls.",
      fr: "Le site officiel de la fédération : six disciplines, la saison complète et un mode d'accessibilité intégré.",
    },
    description: {
      en: "We designed and delivered the federation's official website — its public face online, built for citizens, athletes, clubs, and partners alike. Live in production.",
      fr: "Nous avons conçu et livré le site officiel de la fédération — sa vitrine en ligne, pensée pour les citoyens, les athlètes, les clubs et les partenaires. En production.",
    },
    client: "Fédération Djiboutienne de Handisport",
    url: "https://fdjh.org",
    preview: "/work/fdjh.png",
    stat: {
      value: "6",
      label: { en: "para-sport disciplines", fr: "disciplines handisport" },
    },
    challenge: {
      en: "The Fédération Djiboutienne de Handisport makes sport a right for people with disabilities in Djibouti: six disciplines, affiliated clubs, and athletes competing nationally and internationally. Operating under the Secretariat of State for Sports and in partnership with the national disability agency (ANPH), it needed an official online presence to match — one usable by the very public it serves.",
      fr: "La Fédération Djiboutienne de Handisport fait du sport un droit pour les personnes en situation de handicap à Djibouti : six disciplines, des clubs affiliés, des athlètes engagés en compétitions nationales et internationales. Placée sous l'autorité du Secrétariat d'État chargé des Sports, en partenariat avec l'ANPH, elle avait besoin d'une vitrine officielle à la hauteur — et utilisable par le public qu'elle sert en premier lieu.",
    },
    what: {
      en: "An official website that presents the federation and its supervising institutions, showcases its six disciplines, publishes news and the full season calendar, and points every visitor — athlete, volunteer, club, or partner — to the right way to get involved.",
      fr: "Un site officiel qui présente la fédération et ses institutions de tutelle, met en valeur ses six disciplines, publie l'actualité et le calendrier complet de la saison, et oriente chaque visiteur — athlète, bénévole, club ou partenaire — vers la bonne manière de s'engager.",
    },
    highlights: [
      {
        title: {
          en: "Six disciplines, one interactive wheel",
          fr: "Six disciplines, une roue interactive",
        },
        body: {
          en: "Table tennis, pétanque, athletics, chess, futsal, and badminton — browsed with the mouse or the keyboard arrows, each with its season's competitions.",
          fr: "Tennis de table, pétanque, athlétisme, échecs, futsal et badminton — parcourus à la souris ou aux flèches du clavier, chacun avec les compétitions de sa saison.",
        },
      },
      {
        title: {
          en: "The season at a glance",
          fr: "La saison en un tableau",
        },
        body: {
          en: "The 2025/2026 calendar and results in a single table: discipline, competition, status.",
          fr: "Le calendrier et les résultats 2025/2026 réunis dans un seul tableau : discipline, compétition, statut.",
        },
      },
      {
        title: {
          en: "“Mon confort”: accessibility built in",
          fr: "« Mon confort » : l'accessibilité intégrée",
        },
        body: {
          en: "A control panel that lets every visitor adjust text size, contrast, and animations — essential for an audience of people with disabilities.",
          fr: "Un panneau qui permet à chaque visiteur d'adapter la taille du texte, le contraste et les animations — indispensable pour un public en situation de handicap.",
        },
      },
      {
        title: {
          en: "Four ways in",
          fr: "Quatre portes d'entrée",
        },
        body: {
          en: "Athlete, volunteer, club, partner: each profile gets its own path to join the federation.",
          fr: "Athlète, bénévole, club, partenaire : chaque profil a son propre parcours pour rejoindre la fédération.",
        },
      },
    ],
    outcome: {
      en: "Live at fdjh.org. The whole 2025/2026 season is on record — 13 competitions across six disciplines — on a site usable by the people it serves first.",
      fr: "En ligne sur fdjh.org. Toute la saison 2025/2026 y est retracée — 13 compétitions dans six disciplines — sur un site utilisable par le public qu'il sert en premier lieu.",
    },
  },
  {
    slug: "rnph",
    tag: { en: "Inclusion & rights", fr: "Inclusion & droits" },
    title: {
      en: "Réseau National des Personnes Handicapées — official website",
      fr: "Réseau National des Personnes Handicapées — site officiel",
    },
    oneliner: {
      en: "The network's official website — designed to be usable by persons with disabilities themselves.",
      fr: "Le site officiel du réseau — conçu pour être utilisable par les personnes handicapées elles-mêmes.",
    },
    description: {
      en: "We designed and delivered the network's official website — presenting its mission, member associations, actions, and news to citizens and partners. Live in production.",
      fr: "Nous avons conçu et livré le site officiel du réseau — sa mission, ses associations membres, ses actions et son actualité, présentées aux citoyens et aux partenaires. En production.",
    },
    client: "Réseau National des Personnes Handicapées",
    url: "https://rnph.org",
    preview: "/work/rnph.png",
    stat: {
      value: "200 %",
      label: { en: "text resizing", fr: "agrandissement du texte" },
    },
    challenge: {
      en: "The Réseau National des Personnes Handicapées brings together the associations defending the rights of persons with disabilities in Djibouti. Its role: carry a common voice to institutions, unite its members, inform families. Its motto — “Nothing about us without us” — set the bar: the website had to be usable by persons with disabilities themselves.",
      fr: "Le Réseau National des Personnes Handicapées rassemble les associations qui défendent les droits des personnes en situation de handicap à Djibouti. Son rôle : porter une voix commune auprès des institutions, fédérer ses membres, informer les familles. Sa devise — « Rien sur nous sans nous » — fixait l'exigence : le site devait être utilisable par les personnes handicapées elles-mêmes.",
    },
    what: {
      en: "An official website built around the network's three missions — advocate, unite, inform — with its member associations, actions, news, useful resources, and a membership path for associations. The network's name also appears in Arabic.",
      fr: "Un site officiel construit autour des trois missions du réseau — plaidoyer, rassembler, informer — avec ses associations membres, ses actions, son actualité, des ressources utiles et un parcours d'adhésion pour les associations. Le nom du réseau figure aussi en arabe.",
    },
    highlights: [
      {
        title: {
          en: "Accessible by design",
          fr: "Accessible dès la conception",
        },
        body: {
          en: "Text resizable up to 200%, full keyboard navigation, reinforced contrast, light or dark theme, and reduced animations when the device asks for it.",
          fr: "Texte agrandissable jusqu'à 200 %, navigation complète au clavier, contrastes renforcés, thème clair ou sombre, animations réduites lorsque l'appareil le demande.",
        },
      },
      {
        title: {
          en: "A public accessibility statement",
          fr: "Une déclaration d'accessibilité publique",
        },
        body: {
          en: "The site's accessibility commitments are documented and open to anyone, alongside the legal notice.",
          fr: "Les engagements d'accessibilité du site sont documentés et consultables par tous, avec les mentions légales.",
        },
      },
      {
        title: {
          en: "Three missions, three paths",
          fr: "Trois missions, trois parcours",
        },
        body: {
          en: "Advocate, unite, inform: each mission leads straight to the network's actions, member associations, or resources.",
          fr: "Plaidoyer, rassembler, informer : chaque mission mène directement aux actions, aux associations membres ou aux ressources.",
        },
      },
      {
        title: {
          en: "Membership for associations",
          fr: "Adhésion des associations",
        },
        body: {
          en: "A dedicated path for associations to join the network and add their voice to its advocacy.",
          fr: "Un parcours dédié pour qu'une association rejoigne le réseau et porte une voix commune auprès des institutions.",
        },
      },
    ],
    outcome: {
      en: "Live at rnph.org: a website the people it's about can use on their own — true to the motto “Nothing about us without us.”",
      fr: "En ligne sur rnph.org : un site que les personnes concernées peuvent utiliser par elles-mêmes — fidèle à la devise « Rien sur nous sans nous ».",
    },
  },
  {
    slug: "healthcare-platform",
    tag: { en: "Healthcare", fr: "Santé" },
    title: {
      en: "Doctor booking platform",
      fr: "Plateforme de prise de rendez-vous",
    },
    oneliner: {
      en: "End-to-end appointment system connecting patients with doctors in Djibouti.",
      fr: "Système de rendez-vous complet connectant patients et médecins à Djibouti.",
    },
    description: {
      en: "A multi-role web platform handling the full lifecycle — from a patient finding a doctor, to the doctor's application being reviewed by an admin, to the appointment being booked and confirmed.",
      fr: "Une plateforme web multi-rôles gérant le cycle complet — du patient qui trouve un médecin, à la candidature examinée par un admin, jusqu'au rendez-vous confirmé.",
    },
    stack: [
      "Next.js",
      "TypeScript",
      "Drizzle ORM",
      "PostgreSQL",
      "Better Auth",
      "shadcn/ui",
      "UploadThing",
      "Resend",
    ],
    stat: { value: "3", label: { en: "user roles", fr: "rôles utilisateurs" } },
    challenge: {
      en: "Healthcare access in Djibouti is fragmented. Finding the right doctor, understanding availability, and booking an appointment required phone calls, word of mouth, and luck. There was no centralised system — let alone one that handled the verification of medical credentials.",
      fr: "L'accès aux soins à Djibouti est fragmenté. Trouver le bon médecin, connaître ses disponibilités et prendre rendez-vous nécessitait des appels téléphoniques, du bouche-à-oreille et de la chance. Il n'existait aucun système centralisé — encore moins un capable de vérifier les accréditations médicales.",
    },
    what: {
      en: "We built a three-role platform: patients browse and book, doctors apply and manage their schedule, admins review applications and approve credentials. The onboarding flow uses magic links — no password friction. File uploads handle credential documents. A stepped form wizard guides new doctors through the application without overwhelming them.",
      fr: "Nous avons construit une plateforme à trois rôles : les patients parcourent et réservent, les médecins postulent et gèrent leur agenda, les admins examinent les candidatures et valident les accréditations. Le flux d'onboarding utilise des liens magiques — sans friction de mot de passe. Les téléversements de fichiers gèrent les documents d'accréditation. Un formulaire pas-à-pas guide les nouveaux médecins dans leur candidature sans les submerger.",
    },
    decisions: [
      {
        title: {
          en: "Role stored in appUser, not the auth table",
          fr: "Rôle stocké dans appUser, pas dans la table auth",
        },
        body: {
          en: "Better Auth owns the session layer but knowing nothing about business roles. We store role exclusively in our own appUser table — keeps auth concerns separate from product logic and makes role changes clean.",
          fr: "Better Auth gère la couche session mais ne sait rien des rôles métier. On stocke le rôle exclusivement dans notre propre table appUser — les préoccupations d'auth restent séparées de la logique produit.",
        },
      },
      {
        title: {
          en: "No auth entities until admin approval",
          fr: "Aucune entité auth avant approbation admin",
        },
        body: {
          en: "Doctor applications live in a doctorApplication table with no corresponding auth user. Only after admin approval does the system call signUpMagicLink() and create the auth record. This prevents unverified doctors from ever having an active session.",
          fr: "Les candidatures médecins vivent dans une table doctorApplication sans utilisateur auth correspondant. Seulement après approbation admin le système appelle signUpMagicLink() et crée l'enregistrement auth. Ça empêche les médecins non vérifiés d'avoir une session active.",
        },
      },
      {
        title: {
          en: "SteppedFormBuilder for onboarding",
          fr: "SteppedFormBuilder pour l'onboarding",
        },
        body: {
          en: "Rather than a single long form, we built a wizard component with per-step Zod validation and a preview step before final submission. Reduces drop-off and makes the credential upload feel guided, not bureaucratic.",
          fr: "Plutôt qu'un formulaire long unique, on a construit un composant wizard avec validation Zod par étape et une étape de prévisualisation avant soumission finale. Réduit l'abandon et rend le téléversement de documents guidé, pas bureaucratique.",
        },
      },
    ],
    outcome: {
      en: "A live platform serving doctors and patients in Djibouti. The admin approval flow has processed every doctor currently on the platform. Zero credential breaches since launch.",
      fr: "Une plateforme en production au service des médecins et patients à Djibouti. Le flux d'approbation admin a traité chaque médecin actuellement sur la plateforme. Zéro violation d'accréditation depuis le lancement.",
    },
  },
  {
    slug: "ejo",
    tag: { en: "Legal tech", fr: "LegalTech" },
    title: {
      en: "LexDj — official publications, modernised",
      fr: "LexDj — publications officielles, modernisées",
    },
    oneliner: {
      en: "Our own public-interest platform: making Djibouti's official legal publications actually searchable and readable.",
      fr: "Notre plateforme d'intérêt public : rendre les publications juridiques officielles de Djibouti vraiment consultables et lisibles.",
    },
    description: {
      en: "Official government publications in Djibouti are public — but nearly hard to navigate in practice. LexDj makes that body of legal knowledge accessible: full-text search, clean reading experience, and structured data where there was only scanned paper.",
      fr: "Les publications officielles du gouvernement djiboutien sont publiques — mais presque difficile à consulter en pratique. LexDj rend ce corpus de connaissances juridiques accessible : recherche plein texte, expérience de lecture soignée, données structurées là où il n'y avait que du papier scanné et donc du texte en vrac.",
    },
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Full-text search",
      "Drizzle ORM",
      "motion/react",
    ],
    stat: {
      value: "53 845",
      label: { en: "texts indexed, since 1904", fr: "textes indexés, depuis 1904" },
    },
    url: "https://lexdj.blyanalytics.com",
    preview: "/work/lexdj.png",
    challenge: {
      en: "Djibouti's official journal is a public record — but access is effectively limited to those who know where to look, can read dense legal formatting, and happen to have the right edition. Searching across years of publications meant hours of manual work. The information was technically available. Practically, it was not.",
      fr: "Le journal officiel de Djibouti est un registre public — mais l'accès est en pratique limité à ceux qui savent où chercher, peuvent lire des mises en page juridiques denses et ont la bonne édition sous la main. Chercher dans des années de publications signifiait des heures de travail manuel. L'information était techniquement disponible. En pratique, elle ne l'était pas.",
    },
    what: {
      en: "LexDj ingests official publications, structures the content into searchable records, and presents it through a fast, clean interface. Full-text search across the entire corpus. Each entry is linkable, shareable, and readable on any device. The platform doesn't add opinions — it removes friction.",
      fr: "LexDj indexe les publications officielles, structure le contenu en enregistrements consultables et le présente via une interface rapide et épurée avec enormément d'options de recherche des textes juridiques. Chaque entrée est liée, partageable et lisible sur n'importe quel appareil. La plateforme n'ajoute pas d'opinions — elle supprime les frictions.",
    },
    decisions: [
      {
        title: {
          en: "Full-text search over the whole corpus",
          fr: "Recherche plein texte sur tout le corpus",
        },
        body: {
          en: "PostgreSQL's tsvector with French and Arabic language configurations. No third-party search service — the data is sensitive enough to keep in-house, and Postgres is more than capable for this scale.",
          fr: "tsvector de PostgreSQL avec configurations linguistiques française et arabe. Pas de service de recherche tiers — les données sont suffisamment sensibles pour rester en interne, et Postgres est largement capable à cette échelle.",
        },
      },
      {
        title: {
          en: "Structure first, display second",
          fr: "Structure d'abord, affichage ensuite",
        },
        body: {
          en: "Every publication is parsed into typed records before it ever reaches the UI. Type, date, reference number, issuing body — all structured. This makes filtering, linking, and future features possible without re-processing.",
          fr: "Chaque publication est analysée en enregistrements typés avant d'atteindre l'interface. Type, date, numéro de référence, organisme émetteur — tout structuré. Ça rend le filtrage, les liens et les futures fonctionnalités possibles sans retraitement.",
        },
      },
    ],
    outcome: {
      en: "A fast, searchable, and clean interface over a corpus that was previously only available as scanned PDFs. Lawyers, businesses, and citizens can now find what they need in seconds instead of hours.",
      fr: "Une interface rapide, consultable et propre sur un corpus auparavant disponible uniquement en PDFs scannés. Avocats, entreprises et citoyens peuvent maintenant trouver ce dont ils ont besoin en secondes plutôt qu'en heures.",
    },
  },
];
