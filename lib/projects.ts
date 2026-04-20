export type Project = {
  slug: string;
  tag: { en: string; fr: string };
  title: { en: string; fr: string };
  oneliner: { en: string; fr: string };
  description: { en: string; fr: string };
  stack: string[];
  stat: { value: string; label: { en: string; fr: string } };
  // Case study page content
  challenge: { en: string; fr: string };
  what: { en: string; fr: string };
  decisions: {
    title: { en: string; fr: string };
    body: { en: string; fr: string };
  }[];
  outcome: { en: string; fr: string };
};

export const PROJECTS: Project[] = [
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
      en: "Making Djibouti's official legal publications actually searchable and readable.",
      fr: "Rendre les publications juridiques officielles de Djibouti vraiment consultables et lisibles.",
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
      value: "100%",
      label: { en: "public", fr: "public" },
    },
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
