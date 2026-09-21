/**
 * Sales page copy. Every claim here must be traceable to the guide itself
 * (src/data/beginnerGuideData.ts, transcriptData.ts) or confirmed by the seller.
 * Do not import guide data here: the sales page bundle must not contain the guide.
 */

export interface GuideStepSummary {
  number: number;
  title: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

// Titles copied from the guide. Keep in sync with BEGINNER_GUIDE_STEPS.
export const GUIDE_STEPS: GuideStepSummary[] = [
  { number: 0, title: "Branchement des câbles et téléchargement des logiciels" },
  { number: 1, title: "Connexion initiale et nettoyage complet (Reset Configuration)" },
  { number: 2, title: "Créer votre mot de passe administrateur" },
  { number: 3, title: "Créer le pont HOTSPOT et y regrouper les ports" },
  { number: 4, title: "Donner une adresse IP au routeur avec un sous-réseau étendu (/22)" },
  { number: 5, title: "Récupérer la connexion Internet de votre box (DHCP Client)" },
  { number: 6, title: "Configurer le serveur DHCP et ses options essentielles" },
  { number: 7, title: "Créer la règle de NAT Masquerade" },
  { number: 8, title: "La règle Mangle anti-partage de connexion (TTL = 1)" },
  { number: 9, title: "Déployer le Hotspot et choisir le domaine du portail" },
  { number: 10, title: "Configurer les antennes Wi-Fi (modèles avec Wi-Fi uniquement)" },
  { number: 11, title: "Nommer l'appareil et synchroniser l'heure (NTP Client)" },
  { number: 12, title: "Démarrer Mikhmon V3 et le connecter au MikroTik" },
  { number: 13, title: "Créer les 3 forfaits : 24 heures, 1 semaine et 1 mois" },
  { number: 14, title: "Générer les 300 tickets et imprimer les planches PDF" },
];

export const PRODUCT_PAGE_DATA = {
  headline: "Configurez un hotspot Wi-Fi payant sur MikroTik et vendez vos tickets avec Mikhmon",
  subheadline:
    "Un guide en français, en 15 étapes, pour RouterOS v7, Winbox v4 et Mikhmon V3. Chaque étape indique le menu à ouvrir, les valeurs à saisir et comment vérifier que le réglage fonctionne.",

  facts: [
    { label: "Étapes", value: "15" },
    { label: "Durée", value: "moins de 30 min" },
    { label: "Logiciels", value: "Winbox v4, Mikhmon V3" },
    { label: "Démonstration", value: "hAP ax²" },
  ],

  problems: [
    {
      problem: "Le routeur garde une ancienne configuration",
      solution:
        "L'étape 1 remet le routeur à zéro avec « Remove Configuration » pour repartir d'une base propre.",
    },
    {
      problem: "Un client partage son ticket avec le partage de connexion de son téléphone",
      solution:
        "L'étape 8 crée une règle Mangle (TTL = 1) conçue pour empêcher ce partage.",
    },
    {
      problem: "La page de connexion ne s'ouvre pas automatiquement sur certains téléphones",
      solution:
        "L'étape 6 active « Always Broadcast » et « Add ARP For Leases » sur le serveur DHCP.",
    },
    {
      problem: "Créer les tickets un par un dans Winbox prend trop de temps",
      solution:
        "Les étapes 13 et 14 créent trois forfaits (24 heures, 1 semaine, 1 mois), génèrent 300 tickets avec Mikhmon et les impriment en planches PDF.",
    },
  ],

  contents: [
    {
      title: "Le guide en 15 étapes",
      description:
        "Pour chaque étape : ce que ça fait, le menu Winbox à ouvrir, les valeurs à saisir, le piège à éviter et la vérification à faire.",
    },
    {
      title: "Le tableau de câblage",
      description: "Quel câble sur quel port, entre l'arrivée Internet et les ports du hotspot.",
    },
    {
      title: "Les erreurs fréquentes",
      description: "6 problèmes courants avec leur solution.",
    },
    {
      title: "Le script terminal",
      description:
        "Un script RouterOS à copier dans le terminal de Winbox, équivalent aux réglages de la vidéo (écrit pour le hAP ax²).",
    },
    {
      title: "La transcription de la vidéo de formation",
      description: "Le texte horodaté de la vidéo de formation de 22 min 58 s.",
    },
    {
      title: "Le guide en PDF",
      description: "Une version imprimable du guide complet, au format A4.",
    },
    {
      title: "Le lien de téléchargement de Mikhmon V3",
      description: "Le lien direct vers le fichier ZIP de Mikhmon V3.",
    },
    {
      title: "L'assistance par WhatsApp",
      description: "Vos questions sur la configuration décrite dans le guide, par message.",
    },
  ],

  steps: GUIDE_STEPS,

  audience: [
    "Vous voulez vendre l'accès Wi-Fi par tickets : Wi-Fi zone, cybercafé, boutique, hôtel ou résidence.",
    "Vous n'avez encore jamais utilisé Winbox ni configuré un routeur MikroTik.",
  ],

  requirements: [
    "Un routeur MikroTik sous RouterOS v7. La démonstration est faite sur un hAP ax².",
    "Le guide indique quoi faire pour les modèles sans Wi-Fi intégré, comme le hEX RB750Gr3, le RB3011 ou le RB4011.",
    "L'étape 1 efface la configuration existante du routeur. Sauvegardez d'abord ce que vous voulez garder.",
  ],

  faqs: [
    {
      question: "Mon routeur n'est pas un hAP ax². Le guide est-il utilisable ?",
      answer:
        "La démonstration est faite sur un hAP ax² sous RouterOS v7 avec Winbox v4. Le guide précise ce qui change pour les modèles sans Wi-Fi intégré (hEX RB750Gr3, RB3011, RB4011). Si votre modèle est d'une autre gamme, écrivez au support avant de commander.",
    },
    {
      question: "Que se passe-t-il pour mon routeur à l'étape 1 ?",
      answer:
        "L'étape 1 utilise « Remove Configuration » : la configuration existante du routeur est effacée. Sur un routeur déjà en service, sauvegardez-la avant de commencer.",
    },
    {
      question: "Comment j'accède au guide après le paiement ?",
      answer:
        "Le lien d'accès au guide vous est donné à la fin du paiement, sur la page de paiement. Conservez-le : l'accès est personnel.",
    },
    {
      question: "Comment obtenir de l'aide ?",
      answer:
        "Par message WhatsApp aux numéros indiqués en bas de page. L'assistance porte sur la configuration décrite dans le guide. Aucun délai de réponse n'est garanti.",
    },
    {
      question: "Puis-je être remboursé ?",
      answer:
        "Non. Le guide est un contenu numérique accessible dès le paiement validé, la vente est définitive. Les détails sont dans les conditions de vente.",
    },
  ] as FaqItem[],
};

