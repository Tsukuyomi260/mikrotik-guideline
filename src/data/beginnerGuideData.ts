export interface BeginnerStep {
  id: string;
  number: number;
  phase: string;
  title: string;
  subtitle: string;
  difficulty: 'Très facile' | 'Facile' | 'Attention' | 'Crucial';
  estimatedTime: string;
  videoTimestamp: string;
  whatItDoes: string; // Explication simple sans jargon
  whyWeDoIt: string;  // Pourquoi c'est obligatoire
  actions: {
    instruction: string;
    targetMenu?: string;
    valuesToEnter?: { field: string; value: string; explain?: string }[];
    clickButton?: string;
    explain?: string;
  }[];
  trapWarning?: string; // Piège à éviter absolument
  verificationTip: string; // Comment savoir si vous avez réussi
  visualPreview?: {
    windowTitle: string;
    badge: string;
    description: string;
    fields: { label: string; value: string; isHighlight?: boolean }[];
    buttons: string[];
    screenshotUrl?: string;
  };
}

export interface CablingPort {
  port: string;
  label: string;
  color: string;
  plugWhat: string;
  status: string;
  note: string;
}

export const CABLING_GUIDE: CablingPort[] = [
  {
    port: "Port 1 (Internet / PoE in)",
    label: "WAN / Arrivée Internet",
    color: "blue",
    plugWhat: "Câble venant de votre Box Internet, Modem Fibre ou Antenne",
    status: "Entrée Internet principale",
    note: "Ne JAMAIS ajouter ce port dans le Bridge Hotspot !"
  },
  {
    port: "Port 2",
    label: "LAN Hotspot",
    color: "emerald",
    plugWhat: "Ordinateur, Switch ou Antenne Wi-Fi externe (Access Point)",
    status: "Réseau clients captifs",
    note: "Membre du Bridge HOTSPOT"
  },
  {
    port: "Port 3",
    label: "LAN Hotspot (Gestion PC)",
    color: "emerald",
    plugWhat: "Câble réseau vers votre PC de configuration",
    status: "Port utilisé dans la vidéo pour Winbox",
    note: "Coupure normale de 5 secondes lors de l'ajout au Bridge"
  },
  {
    port: "Port 4",
    label: "LAN Hotspot",
    color: "emerald",
    plugWhat: "Autre antenne ou matériel local",
    status: "Réseau clients captifs",
    note: "Membre du Bridge HOTSPOT"
  },
  {
    port: "Port 5 (PoE out)",
    label: "LAN Hotspot",
    color: "emerald",
    plugWhat: "Peut alimenter une antenne MikroTik ou Ubiquiti en PoE",
    status: "Réseau clients captifs",
    note: "Membre du Bridge HOTSPOT"
  }
];

export const BEGINNER_GUIDE_STEPS: BeginnerStep[] = [
  {
    id: "step-0",
    number: 0,
    phase: "Préparation & Câblage",
    title: "Branchement des câbles et téléchargement des logiciels",
    subtitle: "Raccordez votre matériel sans faire d'erreur dès la première seconde",
    difficulty: "Très facile",
    estimatedTime: "3 min",
    videoTimestamp: "00:00",
    whatItDoes: "Permet de relier physiquement votre ordinateur au routeur MikroTik et d'apporter l'Internet depuis votre Box.",
    whyWeDoIt: "Si les câbles sont inversés (ex: brancher la box sur le port 2 au lieu du port 1), toute la suite échouera. Ce guide fonctionne pour la quasi-totalité des routeurs MikroTik (hAP, hEX, RB2011, RB3011, RB4011, etc.), même si le modèle configuré en démonstration est le hAP ax².",
    actions: [
      {
        instruction: "Branchez l'adaptateur secteur fourni à l'arrière du MikroTik sur la prise DC Power.",
      },
      {
        instruction: "Prenez un câble Ethernet depuis votre Box/Modem Internet et branchez-le sur le Port 1 (Internet/WAN).",
      },
      {
        instruction: "Prenez un second câble Ethernet reliant votre PC au Port 3 (ou Port 2) du MikroTik.",
      },
      {
        instruction: "Téléchargez Winbox v4 (version 64-bit) sur le site officiel mikrotik.com/download.",
      },
      {
        instruction: "Téléchargez directement Mikhmon V3 (format ZIP officiel prêt à l'emploi) via ce lien direct :",
        valuesToEnter: [
          { field: "Lien direct de téléchargement Mikhmon V3", value: "https://raw.githubusercontent.com/laksa19/laksa19.github.io/master/download/mikhmonv3ws.zip", explain: "Cliquez sur ce lien pour télécharger immédiatement le pack compressé" }
        ],
        clickButton: "Télécharger Mikhmon V3 (ZIP)"
      }
    ],
    trapWarning: "Ne branchez JAMAIS votre câble PC sur le Port 1 ! Le port 1 est strictement réservé à la Box Internet.",
    verificationTip: "Les voyants LED au-dessus des ports 1 et 3 doivent s'allumer et clignoter en vert.",
    visualPreview: {
      windowTitle: "Préparation & Schéma Physique",
      badge: "CÂBLAGE MATÉRIEL",
      description: "Port 1 = Box Internet (WAN) | Port 3 = PC Administration | Prise DC = Alimentation 24V",
      fields: [
        { label: "Port 1 (WAN)", value: "Câble Box / Modem", isHighlight: true },
        { label: "Port 3 (LAN PC)", value: "Câble Carte Réseau PC", isHighlight: true },
        { label: "Logiciel 1", value: "Winbox v4 (64-bit)" },
        { label: "Logiciel 2", value: "Mikhmon V3 (mikhmonv3ws.zip)" }
      ],
      buttons: ["mikrotik.com/download", "Télécharger Mikhmon V3"]
    }
  },
  {
    id: "step-1",
    number: 1,
    phase: "Démarrage Winbox",
    title: "Connexion initiale et Nettoyage complet (Reset Configuration)",
    subtitle: "Supprimer la configuration d'usine pour repartir d'une feuille 100% propre",
    difficulty: "Facile",
    estimatedTime: "2 min",
    videoTimestamp: "00:39",
    whatItDoes: "Efface les règles de pare-feu et les sous-réseaux par défaut qui bloqueraient votre futur Hotspot.",
    whyWeDoIt: "Les MikroTik sortis d'usine ont une configuration de routeur domestique standard incompatible avec un système de tickets payants.",
    actions: [
      {
        instruction: "Lancez Winbox v4 sur votre PC Windows.",
      },
      {
        instruction: "Cliquez sur l'onglet 'Neighbors' en haut de la liste.",
        targetMenu: "Winbox > Neighbors"
      },
      {
        instruction: "Repérez votre routeur et cliquez SUR L'ADRESSE MAC (ex: F4:1E:57:F7:48:00), surtout pas sur l'adresse IP !",
      },
      {
        instruction: "Dans le champ 'Login', écrivez 'admin'. Laissez le champ 'Password' vide (ou mot de passe étiquette si neuf avec RouterOS récent) puis cliquez sur 'Connect'.",
        clickButton: "Connect"
      },
      {
        instruction: "Une grande fenêtre intitulée 'RouterOS Default Configuration' s'affiche. Cliquez en bas à gauche sur 'Remove Configuration'.",
        clickButton: "Remove Configuration"
      },
      {
        instruction: "Le routeur redémarre (message 'Connection lost!'). Attendez 15 secondes, cliquez sur 'Close', puis reconnectez-vous avec Login: admin et Mot de passe: VIDE.",
      }
    ],
    trapWarning: "Si vous cliquez par erreur sur 'OK' au lieu de 'Remove Configuration', vous garderez l'ancienne configuration. Allez dans System > Reset Configuration pour recommencer.",
    verificationTip: "Une fois reconnecté, la liste des interfaces et adresses IP dans Winbox est totalement vide.",
    visualPreview: {
      windowTitle: "Winbox v4 - Neighbors & Default Configuration",
      badge: "CONNEXION MAC & RESET",
      description: "Sélectionner la MAC Address dans Neighbors -> Connect -> Clic sur 'Remove Configuration'",
      fields: [
        { label: "Onglet", value: "Neighbors" },
        { label: "Connect To", value: "F4:1E:57:XX:XX:XX (Adresse MAC)", isHighlight: true },
        { label: "Login", value: "admin" },
        { label: "Password", value: "(Vide)" }
      ],
      buttons: ["Connect", "Remove Configuration"]
    }
  },
  {
    id: "step-2",
    number: 2,
    phase: "Sécurité",
    title: "Créer votre mot de passe administrateur",
    subtitle: "Empêcher quiconque de modifier votre routeur",
    difficulty: "Très facile",
    estimatedTime: "1 min",
    videoTimestamp: "01:41",
    whatItDoes: "Verrouille l'accès technique au routeur avec un mot de passe que vous êtes le seul à connaître.",
    whyWeDoIt: "Par défaut, un MikroTik réinitialisé n'a aucun mot de passe. N'importe quel client Wi-Fi pourrait s'y connecter et pirater vos réglages.",
    actions: [
      {
        instruction: "Dans le menu de gauche de Winbox, cliquez sur 'System' puis sur 'Password'.",
        targetMenu: "System > Password"
      },
      {
        instruction: "Remplissez la petite fenêtre comme suit :",
        valuesToEnter: [
          { field: "Old Password", value: "(Laisser totalement vide)", explain: "Car il n'y a pas de mot de passe actuel" },
          { field: "New Password", value: "VotreMotDePasseSecret123", explain: "Choisissez un mot de passe solide" },
          { field: "Confirm Password", value: "VotreMotDePasseSecret123", explain: "Retapez le même mot de passe" }
        ],
        clickButton: "Change Now"
      }
    ],
    trapWarning: "Notez bien ce mot de passe dans un carnet ! Vous en aurez besoin dans Winbox ET dans Mikhmon V3.",
    verificationTip: "La fenêtre se ferme immédiatement sans afficher d'erreur.",
    visualPreview: {
      windowTitle: "Change Password - Winbox",
      badge: "SÉCURITÉ SYSTÈME",
      description: "Menu System > Password : Old vide, nouveau mot de passe fort répété deux fois",
      fields: [
        { label: "Old Password", value: "(vide)" },
        { label: "New Password", value: "••••••••••••", isHighlight: true },
        { label: "Confirm Password", value: "••••••••••••", isHighlight: true }
      ],
      buttons: ["Change Now", "Cancel"]
    }
  },
  {
    id: "step-3",
    number: 3,
    phase: "Réseau Local",
    title: "Créer le Pont 'HOTSPOT' et y regrouper les ports",
    subtitle: "Relier tous les câbles et le Wi-Fi dans une même grande famille",
    difficulty: "Attention",
    estimatedTime: "4 min",
    videoTimestamp: "02:09",
    whatItDoes: "Un 'Bridge' (pont) fusionne les prises Ethernet LAN et les signaux Wi-Fi pour qu'ils partagent la même connexion Hotspot.",
    whyWeDoIt: "Sans bridge, chaque prise Ethernet serait isolée et les clients en Wi-Fi ne verraient pas le même portail captif.",
    actions: [
      {
        instruction: "Dans le menu de gauche, cliquez sur 'Bridge'.",
        targetMenu: "Bridge > onglet Bridge"
      },
      {
        instruction: "Dans l'onglet 'Bridge', cliquez sur le bouton bleu '+' (Ajouter).",
      },
      {
        instruction: "Dans le champ 'Name', tapez exactement : HOTSPOT en majuscules. Cliquez sur 'Apply' puis sur 'OK'.",
        valuesToEnter: [{ field: "Name", value: "HOTSPOT" }],
        clickButton: "Apply puis OK"
      },
      {
        instruction: "Basculez sur le deuxième onglet : 'Ports'. Cliquez sur le bouton '+'.",
        targetMenu: "Bridge > onglet Ports"
      },
      {
        instruction: "Ajoutez tour à tour chaque port dans le bridge HOTSPOT (selon les interfaces présentes sur votre modèle) :",
        valuesToEnter: [
          { field: "1er ajout", value: "Interface = ether2 | Bridge = HOTSPOT -> Apply puis OK" },
          { field: "2ème ajout", value: "Interface = ether3 | Bridge = HOTSPOT -> Apply puis OK (Coupure de 5s normale !)" },
          { field: "3ème ajout", value: "Interface = ether4 | Bridge = HOTSPOT -> Apply puis OK" },
          { field: "4ème ajout", value: "Interface = ether5 | Bridge = HOTSPOT -> Apply puis OK" },
          { field: "5ème ajout (si Wi-Fi présent)", value: "Interface = wifi1 (ou wlan1) | Bridge = HOTSPOT -> Apply puis OK" },
          { field: "6ème ajout (si 2ème Wi-Fi présent)", value: "Interface = wifi2 (ou wlan2) | Bridge = HOTSPOT -> Apply puis OK" }
        ]
      },
      {
        instruction: "PRÉCISION ESSENTIELLE SUR LE WI-FI : Tous les MikroTik n'ont pas 2 interfaces Wi-Fi. Certains n'en ont qu'une seule (2.4 GHz), et d'autres modèles très répandus (comme le hEX RB750Gr3) n'ont aucun Wi-Fi intégré. N'ajoutez que les interfaces sans-fil réellement présentes sur votre appareil. Si votre routeur n'a pas de Wi-Fi, vous n'ajoutez que ether2, ether3, ether4, ether5.",
        explain: "Vos points d'accès Wi-Fi externes branchés sur vos ports LAN diffuseront le réseau pour tous vos clients."
      }
    ],
    trapWarning: "NE JAMAIS ajouter 'ether1' dans le bridge ! Ether1 est la porte Internet vers votre box, le bridge est l'intérieur de votre réseau privé.",
    verificationTip: "Lors de l'ajout d'ether3, Winbox se déconnecte : c'est normal car votre câble PC est dessus ! Reconnectez-vous simplement.",
    visualPreview: {
      windowTitle: "Bridge > Ports - Winbox",
      badge: "FUSION DES PORTS LAN",
      description: "Bridge Name = HOTSPOT. Onglet Ports : ajouter ether2, ether3, ether4, ether5 (+ wifi1/wifi2 si disponibles)",
      fields: [
        { label: "Bridge créé", value: "HOTSPOT", isHighlight: true },
        { label: "Ports Ethernet", value: "ether2, ether3, ether4, ether5" },
        { label: "Ports Wi-Fi (si dispo)", value: "wifi1, wifi2 (selon modèle)" },
        { label: "Port Exclu", value: "ether1 (STRICTEMENT INTERDIT)", isHighlight: true }
      ],
      buttons: ["+", "Apply", "OK"]
    }
  },
  {
    id: "step-4",
    number: 4,
    phase: "Réseau Local",
    title: "Donner une adresse IP au routeur avec un sous-réseau étendu (/22)",
    subtitle: "Préparer le routeur à accueillir plus de 1000 personnes simultanément",
    difficulty: "Facile",
    estimatedTime: "2 min",
    videoTimestamp: "03:56",
    whatItDoes: "Définit l'adresse de la passerelle du routeur (10.1.1.254) et dimensionne la capacité du réseau.",
    whyWeDoIt: "Avec un masque classique /24, vous êtes bloqué à 254 personnes. Avec /22, vous pouvez connecter jusqu'à 1022 personnes simultanément sans saturer !",
    actions: [
      {
        instruction: "Dans le menu de gauche, cliquez sur 'IP' puis sur 'Addresses'.",
        targetMenu: "IP > Addresses"
      },
      {
        instruction: "Cliquez sur le bouton '+' pour ajouter une adresse IP.",
      },
      {
        instruction: "Remplissez très exactement comme ceci :",
        valuesToEnter: [
          { field: "Address", value: "10.1.1.254/22", explain: "Le masque /22 est capital" },
          { field: "Network", value: "(Laisser vide, MikroTik calculera 10.1.0.0 automatiquement)" },
          { field: "Interface", value: "HOTSPOT", explain: "Choisissez le bridge HOTSPOT créé à l'étape 3" }
        ],
        clickButton: "Apply puis OK"
      },
      {
        instruction: "IMPORTANT : Notez ou copiez l'adresse réseau '10.1.0.0/22' qui s'affiche automatiquement dans votre presse-papier (Ctrl+C).",
      }
    ],
    trapWarning: "N'oubliez pas d'assigner l'adresse à l'interface 'HOTSPOT' et non à un port individuel comme ether2.",
    verificationTip: "Dans la liste 'Address List', vous voyez la ligne 10.1.1.254/22 associée à l'interface HOTSPOT.",
    visualPreview: {
      windowTitle: "New Address - IP > Addresses",
      badge: "PASSERELLE 1022 PLACES",
      description: "Address = 10.1.1.254/22 | Interface = HOTSPOT | Network calculé = 10.1.0.0",
      fields: [
        { label: "Address", value: "10.1.1.254/22", isHighlight: true },
        { label: "Network", value: "10.1.0.0" },
        { label: "Interface", value: "HOTSPOT", isHighlight: true }
      ],
      buttons: ["Apply", "OK", "Cancel"]
    }
  },
  {
    id: "step-5",
    number: 5,
    phase: "Internet WAN",
    title: "Récupérer la connexion Internet de votre box (DHCP Client)",
    subtitle: "Permettre au MikroTik de recevoir Internet sur son port 1",
    difficulty: "Très facile",
    estimatedTime: "1 min",
    videoTimestamp: "04:37",
    whatItDoes: "Demande automatiquement à votre Box ou Modem Internet une adresse IP et la passerelle Internet.",
    whyWeDoIt: "Sans cela, le MikroTik ne peut pas communiquer avec l'extérieur ni fournir de données aux clients du Hotspot.",
    actions: [
      {
        instruction: "Dans le menu de gauche, cliquez sur 'IP' puis sur 'DHCP Client'.",
        targetMenu: "IP > DHCP Client"
      },
      {
        instruction: "Cliquez sur le bouton bleu '+'.",
      },
      {
        instruction: "Vérifiez les paramètres par défaut :",
        valuesToEnter: [
          { field: "Interface", value: "ether1" },
          { field: "Use Peer DNS", value: "coché (Yes)" },
          { field: "Use Peer NTP", value: "coché (Yes)" },
          { field: "Add Default Route", value: "yes" }
        ],
        clickButton: "Apply puis OK"
      }
    ],
    trapWarning: "Si le statut reste sur 'searching...' au lieu de 'bound', vérifiez que votre câble sur le port 1 est bien branché à votre box.",
    verificationTip: "La colonne 'Status' affiche 'bound' en quelques secondes et une adresse IP s'affiche dans la colonne 'IP Address'.",
    visualPreview: {
      windowTitle: "DHCP Client - IP > DHCP Client",
      badge: "RÉCEPTION INTERNET",
      description: "Interface = ether1 | Add Default Route = yes | Status attendu = bound",
      fields: [
        { label: "Interface", value: "ether1", isHighlight: true },
        { label: "Status", value: "bound (Connecté)", isHighlight: true },
        { label: "Use Peer DNS / NTP", value: "yes" },
        { label: "Add Default Route", value: "yes" }
      ],
      buttons: ["+", "Apply", "OK"]
    }
  },
  {
    id: "step-6",
    number: 6,
    phase: "Distribution IP",
    title: "Configurer le Serveur DHCP (DHCP Setup) & Options Essentielles",
    subtitle: "Distribuer automatiquement les adresses IP aux téléphones avec Always Broadcast et Add ARP",
    difficulty: "Facile",
    estimatedTime: "3 min",
    videoTimestamp: "05:04",
    whatItDoes: "L'assistant 'DHCP Setup' configure en 6 clics la distribution automatique d'adresses IP pour 1000 personnes, complété par l'enregistrement ARP immédiat.",
    whyWeDoIt: "Pour qu'un téléphone puisse naviguer, il lui faut obligatoirement une IP et un DNS. L'activation de 'Always Broadcast' et 'Add ARP for Leases' garantit que tout smartphone est détecté et redirigé sans blocage.",
    actions: [
      {
        instruction: "Dans le menu de gauche, cliquez sur 'IP' puis sur 'DHCP Server'.",
        targetMenu: "IP > DHCP Server"
      },
      {
        instruction: "Cliquez sur le bouton 'DHCP Setup' (situé en haut au milieu).",
        clickButton: "DHCP Setup"
      },
      {
        instruction: "Suivez l'assistant clic par clic :",
        valuesToEnter: [
          { field: "1. DHCP Server Interface", value: "HOTSPOT -> Cliquez sur Next" },
          { field: "2. DHCP Address Space", value: "10.1.0.0/22 -> Cliquez sur Next" },
          { field: "3. Gateway for DHCP Network", value: "10.1.1.254 -> Cliquez sur Next" },
          { field: "4. Addresses to Give Out", value: "10.1.0.1-10.1.1.253, 10.1.1.255-10.1.3.254 -> Cliquez sur Next" },
          { field: "5. DNS Servers", value: "8.8.8.8 (cliquez sur la flèche du bas pour ajouter 8.8.4.4) -> Cliquez sur Next" },
          { field: "6. Lease Time", value: "00:30:00 (30 minutes) -> Cliquez sur Next" }
        ],
        clickButton: "Next jusqu'à la fin"
      },
      {
        instruction: "FINITION INDISPENSABLE : Une fois le DHCP Setup achevé, double-cliquez sur le serveur DHCP créé ('dhcp1') dans la liste IP > DHCP Server.",
      },
      {
        instruction: "Dans la fenêtre de propriétés, activez impérativement ces 2 réglages :",
        valuesToEnter: [
          { field: "Always Broadcast", value: "Cocher (Yes)", explain: "Force l'envoi des annonces DHCP en diffusion pour tous les téléphones" },
          { field: "Add ARP For Leases", value: "Cocher (Yes)", explain: "Associe immédiatement l'adresse IP et MAC dans la table ARP du routeur" }
        ],
        clickButton: "Apply puis OK"
      }
    ],
    trapWarning: "Le 'Lease Time' (durée du bail) doit rester court (30 minutes). Si vous mettez 3 jours, les adresses resteront bloquées par des clients partis.",
    verificationTip: "Un message annonce 'DHCP Setup has completed successfully'. Dans la fenêtre de 'dhcp1', Always Broadcast et Add ARP For Leases sont cochés.",
    visualPreview: {
      windowTitle: "DHCP Server [dhcp1] - IP > DHCP Server",
      badge: "DISTRIBUTION IP + ARP",
      description: "DHCP Setup sur HOTSPOT | Finition : cocher Always Broadcast et Add ARP For Leases",
      fields: [
        { label: "Interface", value: "HOTSPOT" },
        { label: "Lease Time", value: "00:30:00 (30 min)" },
        { label: "Always Broadcast", value: "☑ COCHÉ (Yes)", isHighlight: true },
        { label: "Add ARP For Leases", value: "☑ COCHÉ (Yes)", isHighlight: true }
      ],
      buttons: ["DHCP Setup", "Apply", "OK"]
    }
  },
  {
    id: "step-7",
    number: 7,
    phase: "Pare-feu & Partage",
    title: "Créer la règle de NAT Masquerade",
    subtitle: "Autoriser tout le monde à sortir sur Internet",
    difficulty: "Facile",
    estimatedTime: "2 min",
    videoTimestamp: "06:51",
    whatItDoes: "Le 'Masquerade' traduit les adresses IP privées des téléphones pour qu'Internet les accepte via l'adresse publique du port 1.",
    whyWeDoIt: "Sans cette règle, vos clients seront connectés au Wi-Fi mais n'auront aucun accès à Internet.",
    actions: [
      {
        instruction: "Dans le menu de gauche, cliquez sur 'IP' puis sur 'Firewall'.",
        targetMenu: "IP > Firewall > onglet NAT"
      },
      {
        instruction: "Restez dans l'onglet 'NAT' et cliquez sur le bouton '+'.",
      },
      {
        instruction: "Dans l'onglet 'General', remplissez :",
        valuesToEnter: [
          { field: "Chain", value: "srcnat" },
          { field: "Src. Address", value: "10.1.0.0/22", explain: "Collez l'adresse réseau calculée à l'étape 4" },
          { field: "Out. Interface", value: "ether1", explain: "Le port 1 vers votre box Internet" }
        ]
      },
      {
        instruction: "Allez dans l'onglet 'Action' (en haut de la fenêtre) et sélectionnez :",
        valuesToEnter: [{ field: "Action", value: "masquerade" }],
        clickButton: "Apply puis OK"
      }
    ],
    trapWarning: "Attention à bien mettre 'Out. Interface' sur ether1 et pas sur HOTSPOT !",
    verificationTip: "La règle apparaît dans l'onglet NAT avec l'action 'masquerade' et les compteurs d'octets commencent à bouger.",
    visualPreview: {
      windowTitle: "NAT Rule - IP > Firewall > NAT",
      badge: "TRADUCTION D'ADRESSES",
      description: "Chain = srcnat | Src. Address = 10.1.0.0/22 | Out. Interface = ether1 | Action = masquerade",
      fields: [
        { label: "Chain", value: "srcnat" },
        { label: "Src. Address", value: "10.1.0.0/22" },
        { label: "Out. Interface", value: "ether1", isHighlight: true },
        { label: "Action", value: "masquerade", isHighlight: true }
      ],
      buttons: ["Apply", "OK", "Cancel"]
    }
  },
  {
    id: "step-8",
    number: 8,
    phase: "Sécurité Hotspot",
    title: "La Règle Mangle Anti-Partage de Connexion (TTL = 1)",
    subtitle: "Le cadenas qui empêche les clients de revendre votre connexion à leurs voisins",
    difficulty: "Crucial",
    estimatedTime: "2 min",
    videoTimestamp: "07:25",
    whatItDoes: "Force le Time-To-Live (TTL) des paquets à 1. Si un utilisateur tente d'activer le 'Partage de connexion' (Hotspot Wi-Fi sur son téléphone) ou de brancher un second routeur, le paquet expire immédiatement à 0 et se fait détruire.",
    whyWeDoIt: "Pour qu'une personne ayant acheté un ticket 1 jour ne puisse pas connecter gratuitement 10 téléphones de sa famille ou de ses voisins.",
    actions: [
      {
        instruction: "Dans la même fenêtre 'Firewall', cliquez sur le deuxième onglet : 'Mangle'.",
        targetMenu: "IP > Firewall > onglet Mangle"
      },
      {
        instruction: "Cliquez sur le bouton '+'.",
      },
      {
        instruction: "Dans l'onglet 'General' :",
        valuesToEnter: [
          { field: "Chain", value: "postrouting" },
          { field: "Out. Interface", value: "HOTSPOT", explain: "Le bridge HOTSPOT" }
        ]
      },
      {
        instruction: "Dans l'onglet 'Action' :",
        valuesToEnter: [
          { field: "Action", value: "change TTL" },
          { field: "TTL Action", value: "change" },
          { field: "New TTL", value: "1", explain: "Le chiffre 1 est magique : détruit le paquet en cas de partage" },
          { field: "Passthrough", value: "coché (Yes)" }
        ],
        clickButton: "Apply puis OK"
      }
    ],
    trapWarning: "Ne mettez pas 'ether1' dans Out. Interface pour cette règle, mais bien 'HOTSPOT' !",
    verificationTip: "Une règle postrouting apparaît dans l'onglet Mangle avec l'action change-ttl à 1.",
    visualPreview: {
      windowTitle: "Mangle Rule - IP > Firewall > Mangle",
      badge: "ANTI-PARTAGE DE CONNEXION",
      description: "Chain = postrouting | Out. Interface = HOTSPOT | Action = change TTL | New TTL = 1",
      fields: [
        { label: "Chain", value: "postrouting" },
        { label: "Out. Interface", value: "HOTSPOT", isHighlight: true },
        { label: "Action", value: "change TTL" },
        { label: "New TTL", value: "1", isHighlight: true }
      ],
      buttons: ["Apply", "OK", "Cancel"]
    }
  },
  {
    id: "step-9",
    number: 9,
    phase: "Portail Captif",
    title: "Déploiement du Hotspot & Paramétrage du domaine désiré",
    subtitle: "Activer la page de connexion avec le domaine de votre choix (ex: wifi.net)",
    difficulty: "Attention",
    estimatedTime: "4 min",
    videoTimestamp: "07:53",
    whatItDoes: "Crée le portail captif MikroTik qui bloque l'accès à tout nouvel appareil jusqu'à ce qu'il entre un code ticket valide.",
    whyWeDoIt: "C'est le cœur de votre système de vente de tickets Wi-Fi.",
    actions: [
      {
        instruction: "Dans le menu de gauche, cliquez sur 'IP' puis sur 'Hotspot'.",
        targetMenu: "IP > Hotspot > onglet Servers"
      },
      {
        instruction: "Cliquez sur le bouton 'Hotspot Setup'.",
        clickButton: "Hotspot Setup"
      },
      {
        instruction: "Déroulez l'assistant pas-à-pas en choisissant votre nom de domaine (exemple : wifi.net) :",
        valuesToEnter: [
          { field: "Hotspot Interface", value: "HOTSPOT -> Next" },
          { field: "Local Address of Network", value: "10.1.1.254/22 (Masquerade coché) -> Next" },
          { field: "Address Pool of Network", value: "(Laisser par défaut) -> Next" },
          { field: "Select Certificate", value: "none -> Next" },
          { field: "IP Address of SMTP Server", value: "0.0.0.0 -> Next" },
          { field: "DNS Servers", value: "8.8.8.8 et 8.8.4.4 -> Next" },
          { field: "DNS Name", value: "wifi.net (Exemple recommandé : vous pouvez mettre wifi.net, monwifi.net, etc.) -> Next", explain: "Vous n'êtes pas obligé de mettre wifi.tg. Choisissez le domaine local de votre choix, par exemple wifi.net" },
          { field: "Password for the User", value: "Votre mot de passe admin -> Next" }
        ],
        clickButton: "Next jusqu'à la fin"
      },
      {
        instruction: "RÉGLAGE AVANCÉ 1 : Double-cliquez sur le serveur 'hotspot1' créé dans la liste. Dans le champ 'Addresses Per MAC', mettez '1'. Cliquez sur OK.",
        explain: "Empêche d'utiliser 2 tickets sur le même téléphone."
      },
      {
        instruction: "RÉGLAGE AVANCÉ 2 : Allez dans l'onglet 'Server Profiles', double-cliquez sur 'hsprof1'. Dans l'onglet 'Login', cochez HTTP PAP, HTTP CHAP, Cookie et MAC Cookie. Réglez 'HTTP Cookie Lifetime' sur '30:00:00:00' (30 jours). Cliquez sur OK.",
        explain: "Permet aux clients fidèles de ne pas retaper leur code à chaque fois qu'ils reviennent tant que leur forfait est actif."
      }
    ],
    trapWarning: "Pour le nom DNS (ex: wifi.net), n'écrivez JAMAIS 'http://' devant et ne mettez aucun espace.",
    verificationTip: "Le statut du Hotspot est actif et vous voyez le profil hsprof1 configuré avec le domaine choisi.",
    visualPreview: {
      windowTitle: "Hotspot Setup - IP > Hotspot",
      badge: "PORTAIL CAPTIF HOTSPOT",
      description: "Hotspot Interface = HOTSPOT | DNS Name = wifi.net (ou le nom de votre choix) | Addresses Per MAC = 1",
      fields: [
        { label: "Hotspot Interface", value: "HOTSPOT" },
        { label: "DNS Name", value: "wifi.net (ou wifi.tg, monwifi.net...)", isHighlight: true },
        { label: "Addresses Per MAC", value: "1 (Anti-triche)", isHighlight: true },
        { label: "Cookie Lifetime", value: "30:00:00:00 (30 jours)", isHighlight: true }
      ],
      buttons: ["Hotspot Setup", "Apply", "OK"]
    }
  },
  {
    id: "step-10",
    number: 10,
    phase: "Sans-fil Wi-Fi",
    title: "Configurer les antennes Wi-Fi (Modèles avec Wi-Fi uniquement)",
    subtitle: "Diffuser le nom Wi-Fi accessible à 100% des smartphones",
    difficulty: "Facile",
    estimatedTime: "3 min",
    videoTimestamp: "09:17",
    whatItDoes: "Active les cartes radio Wi-Fi intégrées au routeur (2.4 GHz et 5 GHz) avec le même nom de réseau (SSID).",
    whyWeDoIt: "Permet aux smartphones de détecter votre réseau sans fil. PRÉCISION ESSENTIELLE : Tous les MikroTik n'ont pas de Wi-Fi intégré (ex: RB750Gr3 hEX, RB3011, RB4011, etc.). Si votre routeur n'a pas de Wi-Fi, sautez simplement cette étape !",
    actions: [
      {
        instruction: "PRÉREQUIS : Si votre routeur n'a pas de module Wi-Fi (ex: hEX), SAUTEZ cette étape et passez directement à l'étape 11. Vos bornes Wi-Fi externes (antennes Ubiquiti, TP-Link Omada ou MikroTik cAP) branchées sur vos ports LAN feront la diffusion.",
      },
      {
        instruction: "Dans le menu de gauche, cliquez sur 'WiFi' (ou 'Wireless' selon votre modèle).",
        targetMenu: "WiFi > onglet WiFi"
      },
      {
        instruction: "Sélectionnez les interfaces Wi-Fi présentes (ex: 'wifi1' et 'wifi2') et cliquez sur le bouton bleu 'Enable' (la coche bleue) pour les allumer.",
      },
      {
        instruction: "Double-cliquez sur 'wifi1' (antenne 5 GHz si disponible) :",
        valuesToEnter: [
          { field: "Onglet Configuration > SSID", value: "HAUT DEBIT (ou le nom de votre choix)" },
          { field: "Onglet Channel > Band", value: "5GHz AX" },
          { field: "Onglet Channel > Channel Width", value: "20MHz (Très important : forcez 20MHz pour une compatibilité maximale)" }
        ],
        clickButton: "Apply puis OK"
      },
      {
        instruction: "Double-cliquez sur 'wifi2' (antenne 2.4 GHz) :",
        valuesToEnter: [
          { field: "Onglet Configuration > SSID", value: "HAUT DEBIT (même nom que ci-dessus)" },
          { field: "Onglet Channel > Band", value: "2GHz AX" },
          { field: "Onglet Channel > Channel Width", value: "20MHz" }
        ],
        clickButton: "Apply puis OK"
      }
    ],
    trapWarning: "Ne réglez pas le canal sur 40 ou 80 MHz ! Beaucoup de téléphones d'entrée de gamme ne détectent pas les canaux larges. 20 MHz garantit 100% de détection.",
    verificationTip: "Votre smartphone voit immédiatement le réseau Wi-Fi ouvert sans mot de passe WPA (le mot de passe sera demandé sur le portail captif).",
    visualPreview: {
      windowTitle: "WiFi Interface Configuration - Winbox",
      badge: "DIFFUSION SANS-FIL (SI DISPONIBLE)",
      description: "SSID = HAUT DEBIT | Channel Width = 20MHz | Ignorer si votre MikroTik n'a pas de Wi-Fi",
      fields: [
        { label: "Modèles avec Wi-Fi", value: "hAP ax², hAP ac², etc." },
        { label: "Modèles sans Wi-Fi", value: "hEX RB750Gr3, RB3011 (Sauter l'étape)", isHighlight: true },
        { label: "SSID (Nom Wi-Fi)", value: "HAUT DEBIT (ou votre choix)" },
        { label: "Channel Width", value: "20MHz (Obligatoire compatibilité)", isHighlight: true }
      ],
      buttons: ["Enable (Coche bleue)", "Apply", "OK"]
    }
  },
  {
    id: "step-11",
    number: 11,
    phase: "Horloge Réseau",
    title: "Nommer votre appareil & Synchroniser l'heure exacte (NTP Client)",
    subtitle: "Donner un nom d'identité à votre MikroTik et caler l'horloge atomique",
    difficulty: "Facile",
    estimatedTime: "1 min",
    videoTimestamp: "11:15",
    whatItDoes: "Personnalise le nom d'identification du routeur et synchronise l'heure sur les serveurs de Google (time.google.com).",
    whyWeDoIt: "Un ticket de 24h ou 7 jours doit expirer au moment exact. Si l'horloge interne est bloquée en 1970, les tickets ne s'arrêteront jamais !",
    actions: [
      {
        instruction: "Allez dans 'System' > 'Identity'. Tapez le nom que vous souhaitez donner à votre appareil MikroTik (ex: 'HAUT DEBIT', 'MonHotspot', 'CyberCafe-Zone', etc.) et cliquez sur OK.",
        targetMenu: "System > Identity",
        explain: "Dans la vidéo, le formateur a écrit 'HAUT DEBIT', mais ce n'est qu'un exemple : vous mettez le nom de votre choix pour reconnaître votre appareil."
      },
      {
        instruction: "Allez dans 'System' > 'SNTP Client' (ou NTP Client).",
        targetMenu: "System > SNTP Client"
      },
      {
        instruction: "Remplissez les champs suivants :",
        valuesToEnter: [
          { field: "Enabled", value: "coché (Yes)" },
          { field: "Mode", value: "unicast" },
          { field: "NTP Servers", value: "time.google.com" }
        ],
        clickButton: "Apply puis OK"
      }
    ],
    trapWarning: "Si vous oubliez la synchronisation NTP, certains tickets resteront gravés indéfiniment sans jamais expirer.",
    verificationTip: "L'horloge en bas à droite de Winbox affiche l'heure exacte et la date actuelle, et le titre de la fenêtre Winbox affiche le nom de votre appareil.",
    visualPreview: {
      windowTitle: "SNTP Client & System Identity - Winbox",
      badge: "HORLOGE ATOMIQUE & NOM",
      description: "Identity = Nom de votre choix | SNTP Enabled = Yes | NTP Servers = time.google.com",
      fields: [
        { label: "System Identity", value: "Nom au choix (ex: HAUT DEBIT)", isHighlight: true },
        { label: "SNTP Enabled", value: "☑ Coché" },
        { label: "Mode", value: "unicast" },
        { label: "NTP Server", value: "time.google.com", isHighlight: true }
      ],
      buttons: ["Apply", "OK", "Cancel"]
    }
  },
  {
    id: "step-12",
    number: 12,
    phase: "Logiciel de Vente",
    title: "Démarrer Mikhmon V3 et le connecter au MikroTik",
    subtitle: "Allumer le logiciel qui génère et imprime vos tickets avec les prix en Francs CFA",
    difficulty: "Attention",
    estimatedTime: "3 min",
    videoTimestamp: "12:43",
    whatItDoes: "Mikhmon V3 communique avec le routeur via son API pour créer les utilisateurs, calculer vos recettes et préparer les coupons à imprimer.",
    whyWeDoIt: "Créer 300 utilisateurs à la main dans Winbox prendrait 5 heures. Mikhmon V3 le fait en 3 secondes.",
    actions: [
      {
        instruction: "Sur votre ordinateur, ouvrez le dossier extrait de Mikhmon V3 (dossier Mikpc ou mikhmonv3ws) et double-cliquez sur 'MikhmonServer.exe'.",
      },
      {
        instruction: "Dans la petite fenêtre qui s'ouvre, cliquez sur 'Start Server' puis sur 'Open Mikhmon'.",
      },
      {
        instruction: "Votre navigateur s'ouvre sur Mikhmon V3. Connectez-vous avec les identifiants d'usine :",
        valuesToEnter: [
          { field: "Username", value: "mikhmon" },
          { field: "Password", value: "1234" }
        ],
        clickButton: "Login / Sign In"
      },
      {
        instruction: "Cliquez sur 'Add Router' dans Mikhmon V3 et remplissez les coordonnées de votre MikroTik :",
        valuesToEnter: [
          { field: "Session Name", value: "hautdebit (ou le nom de votre choix)" },
          { field: "IP MikroTik", value: "10.1.1.254" },
          { field: "Username", value: "admin" },
          { field: "Password", value: "Votre mot de passe admin configuré à l'étape 2" },
          { field: "Hotspot Name", value: "HAUT DEBIT (ou le nom donné à l'étape 11)" },
          { field: "DNS Name", value: "wifi.net (ou le domaine configuré à l'étape 9)" },
          { field: "Currency", value: "cfa" },
          { field: "Live Report", value: "Enable" }
        ],
        clickButton: "Save puis Connect"
      }
    ],
    trapWarning: "Utilisez bien Mikhmon V3 (téléchargeable via le lien direct officiel fourni à l'étape 0). Ne confondez pas avec d'autres versions non configurées.",
    verificationTip: "Le tableau de bord Mikhmon V3 s'affiche avec la température, l'usage CPU et le statut MikroTik connecté en vert.",
    visualPreview: {
      windowTitle: "Mikhmon V3 - Router Settings",
      badge: "CONNEXION API MIKHMON V3",
      description: "IP = 10.1.1.254 | User = admin | DNS = wifi.net | Currency = cfa | Statut = Connect",
      fields: [
        { label: "Version Logiciel", value: "Mikhmon V3 (v3ws)", isHighlight: true },
        { label: "IP MikroTik", value: "10.1.1.254" },
        { label: "DNS Name", value: "wifi.net (ou wifi.tg)", isHighlight: true },
        { label: "Currency", value: "cfa" }
      ],
      buttons: ["Start Server", "Save", "Ping", "Connect"]
    }
  },
  {
    id: "step-13",
    number: 13,
    phase: "Tarifs & Forfaits",
    title: "Créer les 3 Forfaits : 24 Heures, 1 Semaine et 1 Mois",
    subtitle: "Définir la durée, le prix CFA et l'auto-destruction des tickets après usage",
    difficulty: "Crucial",
    estimatedTime: "4 min",
    videoTimestamp: "15:36",
    whatItDoes: "Crée les règles de vente : 200 CFA pour 24 heures, 700 CFA pour 7 jours, 2000 CFA pour 30 jours.",
    whyWeDoIt: "Permet au routeur de savoir combien de temps chaque client a le droit de naviguer avant d'être déconnecté.",
    actions: [
      {
        instruction: "ATTENTION RÈGLE D'OR : NE TRADUISEZ PAS LA PAGE EN FRANÇAIS DANS VOTRE NAVIGATEUR ! Laissez l'anglais d'origine.",
      },
      {
        instruction: "Dans le menu gauche de Mikhmon, cliquez sur 'Hotspot' > 'User Profile' > 'Add Profile'.",
        targetMenu: "Hotspot > User Profile > Add Profile"
      },
      {
        instruction: "Créez le profil 1 : 24 HEURES",
        valuesToEnter: [
          { field: "Name", value: "24HEURES" },
          { field: "Shared Users", value: "1" },
          { field: "Expired Mode", value: "Remove & Record (Très important)" },
          { field: "Validity", value: "24h (ou 1d, lettre h en minuscule)" },
          { field: "Price cfa", value: "200" },
          { field: "Selling Price cfa", value: "200" },
          { field: "Lock User", value: "Disable" }
        ],
        clickButton: "Save (La pastille doit être VERTE)"
      },
      {
        instruction: "Créez le profil 2 : SEMAINE",
        valuesToEnter: [
          { field: "Name", value: "SEMAINE" },
          { field: "Validity", value: "7d" },
          { field: "Price cfa", value: "700" },
          { field: "Selling Price cfa", value: "700" }
        ],
        clickButton: "Save (Pastille VERTE)"
      },
      {
        instruction: "Créez le profil 3 : MOIS",
        valuesToEnter: [
          { field: "Name", value: "MOIS" },
          { field: "Validity", value: "30d" },
          { field: "Price cfa", value: "2000" },
          { field: "Selling Price cfa", value: "2000" }
        ],
        clickButton: "Save (Pastille VERTE)"
      }
    ],
    trapWarning: "LE PIÈGE LE PLUS DANGEREUX : Si vous traduisez la page avec Google Traduction, le terme technique 'Remove & Record' est corrompu, la pastille devient JAUNE et les tickets ne s'arrêteront jamais !",
    verificationTip: "Dans la liste 'User Profile', les 3 profils ont tous une pastille verte à gauche de leur nom.",
    visualPreview: {
      windowTitle: "Mikhmon V3 - Add User Profile",
      badge: "FORFAITS & PRIX CFA",
      description: "Expired Mode = Remove & Record | Validity = 24h, 7d, 30d | Pastille VERTE obligatoire",
      fields: [
        { label: "Profile 24H", value: "24HEURES | 200 CFA | Valid: 24h", isHighlight: true },
        { label: "Profile Semaine", value: "SEMAINE | 700 CFA | Valid: 7d", isHighlight: true },
        { label: "Profile Mois", value: "MOIS | 2000 CFA | Valid: 30d", isHighlight: true },
        { label: "Expired Mode", value: "Remove & Record (Indispensable)" }
      ],
      buttons: ["Save Profile", "View Profiles"]
    }
  },
  {
    id: "step-14",
    number: 14,
    phase: "Impression",
    title: "Générer les 300 tickets et imprimer les planches PDF",
    subtitle: "Sortir des planches prêtes à découper de 60 coupons par page avec code unique",
    difficulty: "Facile",
    estimatedTime: "4 min",
    videoTimestamp: "18:06",
    whatItDoes: "Crée automatiquement 100 codes aléatoires pour chaque forfait et les met en page pour découpe au massicot.",
    whyWeDoIt: "Vous permet d'avoir vos tickets imprimés prêts à être vendus dans votre boutique ou kiosque.",
    actions: [
      {
        instruction: "Dans Mikhmon, cliquez sur 'Hotspot' > 'Users' > bouton 'Generate' en haut.",
        targetMenu: "Hotspot > Users > Generate"
      },
      {
        instruction: "Générez le lot 24 HEURES :",
        valuesToEnter: [
          { field: "Qty", value: "100" },
          { field: "Server", value: "all" },
          { field: "User Mode", value: "Username = Password (Un seul code simple à taper pour le client)" },
          { field: "Name Length", value: "4 (code court de 4 caractères)" },
          { field: "Prefix", value: "(Laisser vide)" },
          { field: "Characters", value: "Random abcd2345 (chiffres et lettres minuscules)" },
          { field: "Profile", value: "24HEURES" },
          { field: "Time Limit", value: "24h (Obligatoire de le retaper ici !)" }
        ],
        clickButton: "Generate"
      },
      {
        instruction: "Répétez pour SEMAINE (Qty: 100, User Mode: Username=Password, Length: 5, Profile: SEMAINE, Time Limit: 7d).",
      },
      {
        instruction: "Répétez pour MOIS (Qty: 100, User Mode: Username=Password, Length: 5, Profile: MOIS, Time Limit: 30d).",
      },
      {
        instruction: "Impression : Dans la liste Users, filtrez par commentaire de lot (ex: '24HEURES [100]'), cliquez sur le bouton bleu 'Small'.",
      },
      {
        instruction: "Une planche de 60 tickets par page s'affiche. Choisissez 'Enregistrer au format PDF' dans la fenêtre d'impression.",
      }
    ],
    trapWarning: "Ne laissez JAMAIS le champ 'Time Limit' vide lors du Generate ! Même si le profil a une validité, le Time Limit force le chronomètre du ticket.",
    verificationTip: "Vous obtenez 3 fichiers PDF propres prêts à imprimer contenant vos 300 tickets Hotspot (valeur totale : 290 000 CFA).",
    visualPreview: {
      windowTitle: "Mikhmon V3 - Generate Users & Print",
      badge: "GÉNÉRATION & IMPRESSION PDF",
      description: "Generate 100 tickets | User Mode = Username=Password | Format planche Small (60 / page)",
      fields: [
        { label: "Quantité par lot", value: "100 Vouchers" },
        { label: "Mode utilisateur", value: "Username = Password (Code unique)", isHighlight: true },
        { label: "Format d'impression", value: "Small (Planche 60 tickets / A4)" },
        { label: "Valeur marchande", value: "290 000 FCFA", isHighlight: true }
      ],
      buttons: ["Generate", "Print Small", "Save as PDF"]
    }
  }
];

export const TROUBLESHOOTING_TIPS = [
  {
    problem: "Mon Winbox ne détecte rien dans l'onglet 'Neighbors'",
    solution: "Désactivez temporairement le pare-feu Windows ou votre antivirus. Vérifiez que votre câble PC est bien branché sur le Port 3 ou Port 2, et JAMAIS sur le Port 1 (réservé à Internet)."
  },
  {
    problem: "Quand j'ajoute ether3 dans le Bridge, Winbox se déconnecte",
    solution: "C'est 100% normal ! Votre PC est branché sur ether3. Attendez 5 secondes, cliquez sur 'Close', puis reconnectez-vous sur l'adresse MAC."
  },
  {
    problem: "Mon routeur MikroTik n'a pas d'interfaces Wi-Fi dans la liste",
    solution: "Beaucoup de modèles MikroTik réputés (comme le hEX RB750Gr3, RB3011, RB4011) n'ont pas de carte Wi-Fi interne. C'est normal : sautez l'étape 10 et branchez vos points d'accès externes (Ubiquiti, TP-Link, MikroTik cAP) sur vos ports LAN 2, 4 ou 5."
  },
  {
    problem: "Mes tickets créés dans Mikhmon ont une pastille jaune au lieu de verte",
    solution: "Vous avez traduit la page en français avec Google Traduction ! Remettez votre navigateur en anglais d'origine, supprimez le profil et recréez-le en anglais."
  },
  {
    problem: "Un client a acheté un ticket et arrive à le partager avec tous ses amis",
    solution: "Vérifiez que votre règle Mangle (étape 8) est bien activée sur l'interface HOTSPOT avec 'change TTL = 1' et Passthrough = Yes."
  },
  {
    problem: "Le portail captif ne s'ouvre pas automatiquement sur le téléphone",
    solution: "Ouvrez le navigateur du smartphone et tapez l'adresse IP de passerelle 'http://10.1.1.254' ou le nom de domaine que vous avez choisi à l'étape 9 (ex: 'http://wifi.net'). Vérifiez aussi à l'étape 6 que vous avez bien coché 'Always Broadcast' et 'Add ARP For Leases' sur le serveur DHCP."
  }
];
