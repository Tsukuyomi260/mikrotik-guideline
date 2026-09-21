import { SITE } from './siteConfig';

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  items?: string[];
}

export interface LegalDocument {
  title: string;
  intro: string;
  sections: LegalSection[];
}

const phones = SITE.contacts.map((c) => c.display).join(' ou ');

export const TERMS: LegalDocument = {
  title: "Conditions de vente",
  intro: `Ces conditions s'appliquent à toute commande du « ${SITE.name} » passée depuis ${SITE.domain}. En cliquant sur « Effectuer le paiement », vous déclarez les avoir lues et acceptées.`,
  sections: [
    {
      heading: "1. Vendeur et contact",
      paragraphs: [
        `Le guide est vendu sur ${SITE.domain}. Pour toute question sur une commande ou sur ces conditions, le vendeur est joignable sur WhatsApp au ${phones}.`,
      ],
    },
    {
      heading: "2. Produit",
      paragraphs: [
        `Le produit est un accès numérique au « ${SITE.name} » : un guide en ligne en 15 étapes pour configurer un routeur MikroTik (RouterOS v7, Winbox v4) en hotspot Wi-Fi et générer des tickets avec Mikhmon V3.`,
        "Il comprend le guide pas à pas, le tableau de câblage, la liste des erreurs fréquentes, le script terminal, la transcription de la vidéo de formation, une version PDF imprimable, le lien de téléchargement de Mikhmon V3 et l'assistance décrite à l'article 7.",
      ],
    },
    {
      heading: "3. Prix",
      paragraphs: [
        "Le prix est celui affiché sur la page de paiement au moment de la commande, en francs CFA (FCFA). Il s'agit d'un paiement unique.",
      ],
    },
    {
      heading: "4. Commande et paiement",
      paragraphs: [
        "Le paiement se fait sur la page d'un prestataire de paiement tiers, distincte de ce site. La commande est confirmée lorsque le paiement est validé par ce prestataire.",
        "Les données de paiement (carte bancaire, mobile money) sont traitées par ce prestataire. Le vendeur peut recevoir de sa part les informations nécessaires au suivi de la commande.",
      ],
    },
    {
      heading: "5. Accès au guide",
      paragraphs: [
        "Un lien d'accès personnel au guide est donné à la fin du paiement. L'accès est disponible dès que le paiement est validé, sauf incident technique.",
        `Conservez ce lien. En cas de perte ou de problème d'accès, contactez l'assistance WhatsApp (${phones}).`,
      ],
    },
    {
      heading: "6. Usage personnel",
      paragraphs: [
        "L'accès est réservé à l'acheteur. Il est interdit de partager le lien d'accès, de revendre le guide, de le republier ou d'en copier tout ou partie sans l'accord écrit du vendeur.",
        "Si un partage est constaté, le vendeur peut changer l'adresse d'accès au guide.",
      ],
    },
    {
      heading: "7. Assistance",
      paragraphs: [
        `L'assistance se fait par message WhatsApp aux numéros indiqués à l'article 1. Elle porte sur la configuration décrite dans le guide. Aucun délai de réponse n'est garanti. Elle ne couvre pas les installations et les réseaux qui sortent du cadre du guide.`,
      ],
    },
    {
      heading: "8. Pas de remboursement",
      paragraphs: [
        "Le guide est un contenu numérique accessible dès la validation du paiement. Une fois le lien d'accès donné, la vente est définitive et aucun remboursement n'est accordé, sauf disposition légale contraire qui s'appliquerait à l'acheteur.",
        "En cas de double paiement ou d'impossibilité d'accéder au guide, contactez le vendeur : il cherchera une solution.",
      ],
    },
    {
      heading: "9. Responsabilité",
      paragraphs: [
        "Le guide décrit une démarche que l'acheteur applique à son propre matériel, sous sa responsabilité. L'étape 1 efface la configuration existante du routeur : l'acheteur doit sauvegarder ce qu'il veut conserver.",
        "Les résultats dépendent du matériel, de la version de RouterOS et de la connexion Internet. Dans la mesure permise par la loi, le vendeur ne peut être tenu responsable d'une perte de données, d'une interruption de service ou d'un manque à gagner liés à l'application du guide.",
      ],
    },
    {
      heading: "10. Marques et logiciels tiers",
      paragraphs: [
        "Le guide n'est pas affilié à MikroTik. MikroTik, RouterOS et Winbox sont des marques de leurs propriétaires. Mikhmon est un logiciel tiers dont l'usage est soumis à la licence de son auteur.",
      ],
    },
    {
      heading: "11. Propriété intellectuelle",
      paragraphs: [
        "Les textes, la structure et les contenus du guide sont protégés. Toute reproduction sans l'accord écrit du vendeur est interdite.",
      ],
    },
    {
      heading: "12. Modification des conditions",
      paragraphs: [
        "Le vendeur peut modifier ces conditions. La version applicable à une commande est celle publiée sur ce site au moment du paiement.",
      ],
    },
  ],
};

export const PRIVACY: LegalDocument = {
  title: "Politique de confidentialité",
  intro: `Cette page explique quelles données concernent ${SITE.domain}, qui les traite et comment exercer vos droits.`,
  sections: [
    {
      heading: "1. Responsable",
      paragraphs: [
        `Le site ${SITE.domain} est exploité par son vendeur, joignable sur WhatsApp au ${phones}.`,
      ],
    },
    {
      heading: "2. Ce que le site collecte",
      paragraphs: [
        "Le site n'a ni compte utilisateur, ni formulaire, ni publicité, ni outil de statistiques. Il ne dépose pas de cookies et ne charge pas de ressources depuis des services tiers.",
      ],
    },
    {
      heading: "3. Stockage dans votre navigateur",
      paragraphs: [
        "Le site enregistre localement, dans votre navigateur, votre choix de thème clair ou sombre. Dans le guide, il enregistre aussi les étapes que vous avez cochées.",
        "Ces informations restent sur votre appareil, ne sont pas envoyées au vendeur, et vous pouvez les effacer depuis les réglages de votre navigateur.",
      ],
    },
    {
      heading: "4. Paiement",
      paragraphs: [
        "Le bouton « Effectuer le paiement » ouvre la page d'un prestataire de paiement tiers. Ce prestataire collecte les informations nécessaires à la commande et au paiement, par exemple votre nom, votre numéro de téléphone, votre adresse e-mail et votre moyen de paiement, selon sa propre politique de confidentialité.",
        "Le vendeur peut recevoir de ce prestataire les informations de commande. Il ne reçoit pas vos données de carte bancaire ni de mobile money.",
      ],
    },
    {
      heading: "5. Assistance WhatsApp",
      paragraphs: [
        "Si vous écrivez à l'assistance sur WhatsApp, le vendeur reçoit votre numéro et vos messages. Il les utilise uniquement pour répondre à votre demande et suivre votre commande. WhatsApp traite ces données selon ses propres conditions.",
      ],
    },
    {
      heading: "6. Hébergement",
      paragraphs: [
        "Comme pour tout site, l'hébergeur peut enregistrer des journaux techniques (adresse IP, date et page demandée) pour assurer la sécurité et le bon fonctionnement du service.",
      ],
    },
    {
      heading: "7. Liens externes",
      paragraphs: [
        "Le site contient des liens vers des services tiers, comme la page de paiement ou le fichier de téléchargement de Mikhmon. Ces services ont leur propre politique de confidentialité.",
      ],
    },
    {
      heading: "8. Conservation",
      paragraphs: [
        "Le vendeur conserve les informations de commande et les échanges WhatsApp le temps nécessaire pour traiter votre demande et suivre votre commande.",
      ],
    },
    {
      heading: "9. Vos droits",
      paragraphs: [
        `Vous pouvez demander l'accès, la correction ou la suppression des données que le vendeur détient à votre sujet, en écrivant sur WhatsApp au ${phones}.`,
      ],
    },
    {
      heading: "10. Modifications",
      paragraphs: [
        "Cette politique peut évoluer. La version en vigueur est celle publiée sur cette page, avec sa date de mise à jour.",
      ],
    },
  ],
};
