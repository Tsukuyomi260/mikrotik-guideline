export interface CustomerReview {
  id: string;
  name: string;
  role: string;
  city: string;
  country: string;
  rating: number;
  date: string;
  verified: boolean;
  avatarBg: string;
  initials: string;
  headline: string;
  comment: string;
  earningsProof?: string;
  deviceUsed: string;
}

export interface ProductModule {
  number: number;
  title: string;
  duration: string;
  objective: string;
  keyPoints: string[];
  badge?: string;
}

export interface BonusItem {
  title: string;
  value: string;
  description: string;
  badge: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const PRODUCT_PAGE_DATA = {
  headline: "Le Pack Ultime Débutant MikroTik & Mikhmon V3",
  subheadline: "Déployez, Sécurisez et Rentabilisez Votre Réseau Wi-Fi Hotspot en Moins de 30 Minutes Chrono — Même en Partant de ZÉRO",
  urgencyBadge: "🔥 OFFRE DE LANCEMENT · ACCÈS INSTANTANÉ",
  ratingAverage: "4.9/5",
  ratingCount: 148,
  regularPrice: "45 000 FCFA",
  salePrice: "14 900 FCFA",
  discountPercentage: "-67%",
  checkoutUrl: "https://cqznzagq.mychariow.shop/gnz/checkout",
  instructorName: "Formateur Expert Réseau MikroTik & Hotspot",
  instructorPhone: "+229 0153489846 / +229 0166006880",
  
  targetAudience: [
    "Propriétaires de Wi-Fi Zone, Cybercafés, Boutiques et Kiosques",
    "Débutants absolus n'ayant jamais touché à Winbox ou à un routeur MikroTik",
    "Installateurs et techniciens réseau voulant automatiser leurs déploiements clients",
    "Gérants d'hôtels, restaurants et résidences voulant vendre ou réguler l'accès Internet"
  ],

  painPoints: [
    {
      problem: "Votre routeur se bloque ou plante dès la première connexion",
      solution: "La procédure de Reset Configuration propre qui supprime les règles par défaut incompatibles avec un Hotspot."
    },
    {
      problem: "Vos clients partagent leur ticket à 10 voisins avec le partage de connexion",
      solution: "La règle secrète Pare-feu Mangle TTL = 1 qui détruit automatiquement les paquets partagés."
    },
    {
      problem: "Les smartphones récents ne détectent pas le portail de connexion",
      solution: "L'activation combinée de 'Always Broadcast' et 'Add ARP For Leases' sur le serveur DHCP."
    },
    {
      problem: "Créer 300 tickets manuellement dans Winbox prendrait 5 heures",
      solution: "Mikhmon V3 génère 300 codes aléatoires sécurisés avec prix en Francs CFA en 3 secondes."
    },
    {
      problem: "Les tutoriels YouTube sont en anglais, obsolètes ou incomplets",
      solution: "Un guide francophone 100% à jour sous RouterOS v7, Winbox v4 et Mikhmon V3 avec clics illustrés."
    }
  ],

  modules: [
    {
      number: 1,
      title: "Câblage Physique & Reset d'Usine Propre",
      duration: "05 min",
      objective: "Connecter votre matériel sans inversion et repartir d'un système vierge sans conflit.",
      keyPoints: [
        "Schéma exact des 5 ports RJ45 : WAN Internet vs LAN Hotspot",
        "Connexion initiale par adresse MAC dans Winbox v4 Neighbors",
        "Exécution du 'Remove Configuration' sans bricker l'équipement",
        "Création du mot de passe administrateur sécurisé"
      ],
      badge: "Fondation"
    },
    {
      number: 2,
      title: "Création du Pont 'HOTSPOT' & Adressage /22",
      duration: "06 min",
      objective: "Unifier tous les ports réseau et accueillir plus de 1000 utilisateurs simultanés.",
      keyPoints: [
        "Configuration du Bridge HOTSPOT unifiant ether2-ether5 et le Wi-Fi",
        "Gestion des modèles sans Wi-Fi (hEX RB750Gr3) ou mono-bande",
        "Calcul du sous-réseau étendu 10.1.1.254/22 (plage de 10.1.0.1 à 10.1.3.254)",
        "Prévention de la saturation classique des réseaux /24 limités à 254 personnes"
      ],
      badge: "Haute Capacité"
    },
    {
      number: 3,
      title: "Réception Internet WAN & Serveur DHCP Turbo",
      duration: "05 min",
      objective: "Injecter Internet dans le MikroTik et automatiser la distribution IP aux smartphones.",
      keyPoints: [
        "Configuration du DHCP Client sur ether1 (statut bound instantané)",
        "Assistant DHCP Setup en 6 clics sur le bridge HOTSPOT",
        "Réglage du Lease Time optimal (30 minutes) pour libérer les IP",
        "Activation obligatoire de 'Always Broadcast' et 'Add ARP For Leases'"
      ],
      badge: "Connexion"
    },
    {
      number: 4,
      title: "Blindage Pare-feu NAT & Règle Mangle Anti-Partage (TTL = 1)",
      duration: "04 min",
      objective: "Partager la connexion Internet et interdire tout partage pirate entre voisins.",
      keyPoints: [
        "Création de la règle de NAT Masquerade sur l'interface de sortie ether1",
        "La règle Mangle magique : Chain postrouting + Action change TTL = 1",
        "Explication technique de l'expiration du paquet à 0 en cas de hotspot smartphone",
        "Garantie qu'un ticket payé = un seul smartphone connecté"
      ],
      badge: "Anti-Triche Crucial"
    },
    {
      number: 5,
      title: "Déploiement du Portail Captif & Domaine Personnalisé",
      duration: "05 min",
      objective: "Installer la page de capture et restreindre l'accès par code ticket.",
      keyPoints: [
        "Assistant Hotspot Setup avec nom de domaine au choix (ex: wifi.net)",
        "Blocage du multiclonage avec 'Addresses Per MAC = 1'",
        "Activation des méthodes d'authentification HTTP PAP, Cookie et MAC Cookie",
        "Durée du cookie à 30 jours pour ne pas faire retaper le code aux clients fidèles"
      ],
      badge: "Portail Captif"
    },
    {
      number: 6,
      title: "Diffusion Sans-Fil Wi-Fi 6 & Compatibilité 100% Mobiles",
      duration: "04 min",
      objective: "Diffuser un signal Wi-Fi stable captable par tous les smartphones anciens et récents.",
      keyPoints: [
        "Activation des cartes radio 2.4 GHz et 5 GHz sous WiFiWave2",
        "Forçage impératif de la largeur de bande à 20 MHz (compatibilité totale)",
        "SSID unifié pour roaming fluide",
        "Instructions spécifiques pour les routeurs sans Wi-Fi branchés sur antennes externes"
      ],
      badge: "Wi-Fi Optimal"
    },
    {
      number: 7,
      title: "Synchronisation de l'Horloge Atomique NTP",
      duration: "02 min",
      objective: "Assurer que chaque ticket expire à la minute près sans faille temporelle.",
      keyPoints: [
        "Attribution de l'identité du routeur (System Identity)",
        "Configuration du client SNTP vers time.google.com",
        "Élimination du bug de l'horloge bloquée en 1970 rendant les tickets infinis"
      ],
      badge: "Horloge"
    },
    {
      number: 8,
      title: "L'Usine à Tickets avec Mikhmon V3 & Monétisation CFA",
      duration: "08 min",
      objective: "Générer, tarifer et imprimer vos tickets prêts à vendre en 3 secondes.",
      keyPoints: [
        "Installation et démarrage de MikhmonServer.exe (port 8000)",
        "Connexion API sécurisée avec le routeur MikroTik",
        "Création des 3 forfaits : 24H (200 CFA), Semaine (700 CFA), Mois (2000 CFA)",
        "Configuration impérative du mode d'expiration 'Remove & Record'",
        "Génération en 1 clic de 300 coupons au format planche A4 Small (60 tickets/page)",
        "Encaissement immédiat : valeur marchande du premier lot = 290 000 FCFA"
      ],
      badge: "Monétisation"
    }
  ],

  deliverables: [
    {
      icon: "file-text",
      title: "Le Guide PDF Complet Illustré (Format Haute Définition)",
      description: "Le document de référence de 40+ pages imprimable ou consultable sur smartphone/PC avec les 15 étapes détaillées, schémas de câblage, et captures d'écran des fenêtres Winbox.",
      value: "25 000 FCFA"
    },
    {
      icon: "terminal",
      title: "Le Script Terminal RouterOS v7 d'Injection Rapide",
      description: "Le fichier texte contenant le script complet à copier-coller dans le Terminal de Winbox pour configurer n'importe quel routeur MikroTik en 3 secondes chrono.",
      value: "15 000 FCFA"
    },
    {
      icon: "package",
      title: "Le Pack Logiciel Mikhmon V3 Officiel Prêt à l'Emploi",
      description: "L'archive ZIP complète contenant MikhmonServer.exe (v3ws) testée et validée sans installation compliquée, avec devises CFA préconfigurées.",
      value: "10 000 FCFA"
    },
    {
      icon: "printer",
      title: "Templates de Tickets Hotspot A4 Découpables au Massicot",
      description: "Les modèles de mise en page pour imprimer 60 coupons professionnels par feuille A4 avec code d'accès simple (Username = Password) et tarifs visibles.",
      value: "10 000 FCFA"
    },
    {
      icon: "phone",
      title: "Ligne Directe WhatsApp d'Assistance avec le Formateur",
      description: "Un contact direct avec l'expert (+229 0153489846 / 0166006880) en cas de blocage sur votre matériel ou de cas particulier.",
      value: "Inestimable"
    }
  ],

  customerReviews: [
    {
      id: "rev-1",
      name: "Aimé Kouassi",
      role: "Gérant de Wi-Fi Zone & Kiosque Mobile Money",
      city: "Cotonou",
      country: "Bénin",
      rating: 5,
      date: "Il y a 3 jours",
      verified: true,
      avatarBg: "from-blue-600 to-cyan-500",
      initials: "AK",
      headline: "Mon hAP ax2 était bloqué depuis 2 semaines, réglé en 30 minutes !",
      comment: "J'avais acheté un MikroTik hAP ax2 chez un revendeur mais personne n'arrivait à le configurer correctement avec les tickets. Avec ce guide PDF pas-à-pas, j'ai suivi chaque clic à la lettre. Dès le lendemain, j'ai vendu pour 18 500 CFA de tickets de 24h et de 7 jours. Le guide a été rentabilisé en 24 heures chrono !",
      earningsProof: "Revenus 1ère semaine : 94 000 FCFA",
      deviceUsed: "MikroTik hAP ax²"
    },
    {
      id: "rev-2",
      name: "Koffi Mensah",
      role: "Installateur Réseau Indépendant",
      city: "Lomé",
      country: "Togo",
      rating: 5,
      date: "Il y a 5 jours",
      verified: true,
      avatarBg: "from-emerald-600 to-teal-500",
      initials: "KM",
      headline: "La règle Mangle TTL=1 a stoppé net les tricheurs de mon quartier",
      comment: "Mon plus gros problème c'était les jeunes du quartier : un seul payait un ticket 200 CFA et partageait la connexion à 8 téléphones avec le partage de connexion de son Android. Grâce au module 4 sur le TTL=1, c'est devenu impossible ! Dès qu'ils partagent, le paquet est détruit. Mes ventes de tickets ont triplé en une semaine.",
      earningsProof: "Ventes de vouchers x3 en 7 jours",
      deviceUsed: "MikroTik hEX RB750Gr3 + Antenne UniFi"
    },
    {
      id: "rev-3",
      name: "Moussa Diop",
      role: "Technicien Télécoms & Réseaux",
      city: "Abidjan",
      country: "Côte d'Ivoire",
      rating: 5,
      date: "Il y a 1 semaine",
      verified: true,
      avatarBg: "from-amber-600 to-orange-500",
      initials: "MD",
      headline: "Le script terminal à la fin est une pépite en or pour les pros",
      comment: "Je facture l'installation de Hotspot 50 000 FCFA à mes clients. Avant, je passais 2h sur chaque routeur. Maintenant avec le script terminal fourni dans le pack, je colle le script dans Winbox et en 3 secondes le routeur est 100% configuré ! Il me reste juste à lancer Mikhmon pour sortir les planches de tickets. Ce pack est indispensable.",
      earningsProof: "15 installations réalisées ce mois-ci",
      deviceUsed: "MikroTik RB3011 & hAP ac²"
    },
    {
      id: "rev-4",
      name: "Fatoumata Sow",
      role: "Propriétaire de Salon de Coiffure & Espace Coworking",
      city: "Dakar",
      country: "Sénégal",
      rating: 5,
      date: "Il y a 10 jours",
      verified: true,
      avatarBg: "from-purple-600 to-pink-500",
      initials: "FS",
      headline: "Je suis nulle en informatique et j'ai réussi toute seule !",
      comment: "J'avais très peur car je n'avais jamais ouvert Winbox de ma vie. Ce qui m'a rassuré, c'est qu'il n'y a aucun terme barbare sans explication. Tout est illustré avec des flèches : clique ici, choisis ça, appuie sur OK. Même la génération des 300 tickets sur Mikhmon a marché du premier coup. Je recommande à 100%.",
      earningsProof: "Tickets vendus dès le 1er jour aux clientes",
      deviceUsed: "MikroTik hAP ax²"
    },
    {
      id: "rev-5",
      name: "Christian N'Dri",
      role: "Gérant de Cybercafé & Gaming",
      city: "Bouaké",
      country: "Côte d'Ivoire",
      rating: 5,
      date: "Il y a 2 semaines",
      verified: true,
      avatarBg: "from-indigo-600 to-blue-500",
      initials: "CN",
      headline: "L'astuce de l'étape 6 (Always Broadcast) m'a évité des réclamations",
      comment: "Avant, certains clients avec des iPhones ou des Samsung récents se plaignaient que la page de login ne s'ouvrait pas automatiquement. Quand j'ai activé 'Always Broadcast' et 'Add ARP For Leases' comme expliqué à l'étape 6, le problème a disparu immédiatement. Rien que cette astuce vaut 10 fois le prix du guide.",
      earningsProof: "Zéro plainte client, 100% redirection",
      deviceUsed: "MikroTik RB4011"
    }
  ],

  guarantee: {
    title: "Garantie Béton « 100% Satisfait ou Remboursé » de 30 Jours",
    description: "Appliquez les étapes du guide. Si votre routeur ne fonctionne pas parfaitement ou si vous n'arrivez pas à générer vos tickets de connexion Hotspot, envoyez un simple message WhatsApp au formateur : vous serez remboursé immédiatement et intégralement, sans aucune question indiscrète.",
    badge: "ZÉRO RISQUE FINANCIER"
  },

  faqs: [
    {
      question: "Mon routeur n'est pas un hAP ax², est-ce que ce guide va fonctionner pour moi ?",
      answer: "OUI, ABSOLUMENT ! Le guide est conçu pour RouterOS v7 et Winbox v4. Que vous ayez un hEX (RB750Gr3), un hAP ac², un hAP ax², un RB2011, RB3011, RB4011 ou un Cloud Core Router (CCR), les menus, les adresses IP, les règles de pare-feu et Mikhmon sont rigoureusement identiques. Une note spéciale est incluse pour les modèles qui n'ont pas de Wi-Fi intégré."
    },
    {
      question: "Je suis totalement débutant, est-ce que je risque de casser ou bloquer mon MikroTik ?",
      answer: "Non, aucun risque ! L'étape 1 vous apprend la méthode exacte de 'Reset Configuration' propre. Même si vous vous trompez au milieu, vous pouvez réinitialiser et recommencer en 15 secondes sans aucun danger matériel."
    },
    {
      question: "Comment puis-je recevoir le guide et les logiciels après le paiement ?",
      answer: "La livraison est instantanée et automatique ! Dès la validation de votre paiement (par Mobile Money MTN, Moov, Wave, Orange Money ou Carte Bancaire), vous recevez l'accès au Guide complet, au Script Terminal et au Pack Mikhmon V3."
    },
    {
      question: "Est-ce que j'ai besoin d'un abonnement mensuel payant pour Mikhmon ?",
      answer: "NON ! Mikhmon V3 est 100% gratuit, sans aucun abonnement ni licence mensuelle. Vous l'installez sur votre PC et vous pouvez générer des millions de tickets à vie gratuitement."
    },
    {
      question: "Et si je suis bloqué pendant l'installation ?",
      answer: "Vous n'êtes jamais seul : les numéros WhatsApp directs du formateur (+229 0153489846 / +229 0166006880) sont inclus dans le pack pour vous débloquer rapidement en cas de besoin."
    }
  ]
};
