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
    title: "Le branchement des câbles et téléchargement des logiciels",
    subtitle: "Raccordez votre matériel sans faire d'erreur dès la première seconde",
    difficulty: "Très facile",
    estimatedTime: "3 min",
    videoTimestamp: "00:00",
    whatItDoes: "Permet de relier physiquement votre ordinateur au routeur MikroTik et d'apporter l'Internet.",
    whyWeDoIt: "Si les câbles sont inversés (ex: brancher la box sur le port 2 au lieu du port 1), toute la suite échouera.",
    actions: [
      {
        instruction: "Branchez l'adaptateur secteur fourni à l'arrière du MikroTik hAP ax² sur la prise DC.",
      },
      {
        instruction: "Prenez un câble Ethernet depuis votre Box/Modem Internet et branchez-le sur le Port 1 (Internet).",
      },
      {
        instruction: "Prenez un second câble Ethernet reliant votre PC au Port 3 du MikroTik.",
      },
      {
        instruction: "Téléchargez le logiciel Winbox v4 (version 64-bit) sur le site officiel mikrotik.com/download.",
      },
      {
        instruction: "Téléchargez et extrayez le dossier Mikhmon (dossier Mikpc contenant MikhmonServer.exe).",
      }
    ],
    trapWarning: "Ne branchez PAS votre câble d'ordinateur sur le Port 1 ! Le port 1 est strictement dédié à l'arrivée d'Internet.",
    verificationTip: "Les voyants LED au-dessus des ports 1 et 3 doivent s'allumer et clignoter en vert."
  },
  {
    id: "step-1",
    number: 1,
    phase: "Démarrage Winbox",
    title: "Connexion initiale et Nettoyage complet (Reset)",
    subtitle: "Supprimer la configuration d'usine pour repartir d'une feuille 100% propre",
    difficulty: "Facile",
    estimatedTime: "2 min",
    videoTimestamp: "00:39",
    whatItDoes: "Efface les règles de pare-feu par défaut qui bloqueraient votre futur Hotspot.",
    whyWeDoIt: "Les MikroTik neufs ont une configuration de routeur domestique standard incompatible avec un système de tickets payants.",
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
        instruction: "Dans le champ 'Login', écrivez 'admin'. Laissez le champ 'Password' vide (ou mettez le mot de passe figurant sur l'étiquette s'il est demandé) puis cliquez sur 'Connect'.",
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
    verificationTip: "Une fois reconnecté, la liste des interfaces et adresses IP dans Winbox est totalement vide."
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
    whyWeDoIt: "Par défaut, un MikroTik réinitialisé n'a aucun mot de passe. N'importe quel client Wi-Fi pourrait s'y connecter.",
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
    trapWarning: "Notez bien ce mot de passe dans un carnet ! Vous en aurez besoin dans Winbox ET dans Mikhmon.",
    verificationTip: "La fenêtre se ferme immédiatement sans afficher d'erreur."
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
    whatItDoes: "Un 'Bridge' (pont) fusionne les prises Ethernet 2, 3, 4, 5 et les 2 signaux Wi-Fi pour qu'ils partagent la même connexion Hotspot.",
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
        instruction: "Ajoutez tour à tour chaque port dans le bridge HOTSPOT :",
        valuesToEnter: [
          { field: "1er ajout", value: "Interface = ether2 | Bridge = HOTSPOT -> Apply puis OK" },
          { field: "2ème ajout", value: "Interface = ether3 | Bridge = HOTSPOT -> Apply puis OK (Coupure de 5s normale !)" },
          { field: "3ème ajout", value: "Interface = ether4 | Bridge = HOTSPOT -> Apply puis OK" },
          { field: "4ème ajout", value: "Interface = ether5 | Bridge = HOTSPOT -> Apply puis OK" },
          { field: "5ème ajout", value: "Interface = wifi1 | Bridge = HOTSPOT -> Apply puis OK" },
          { field: "6ème ajout", value: "Interface = wifi2 | Bridge = HOTSPOT -> Apply puis OK" }
        ]
      }
    ],
    trapWarning: "NE JAMAIS ajouter 'ether1' dans le bridge ! Ether1 est la porte Internet de la maison, le bridge est l'intérieur de la maison.",
    verificationTip: "Lors de l'ajout d'ether3, Winbox se déconnecte : c'est normal car votre câble PC est dessus ! Reconnectez-vous simplement."
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
    whyWeDoIt: "Avec un masque classique /24, vous êtes bloqué à 254 personnes. Avec /22, vous pouvez connecter 1022 personnes !",
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
          { field: "Address", value: "10.1.1.254/22", explain: "Le /22 est capital" },
          { field: "Network", value: "(Laisser vide, MikroTik calculera 10.1.0.0 automatiquement)" },
          { field: "Interface", value: "HOTSPOT", explain: "Choisissez le bridge HOTSPOT créé à l'étape 3" }
        ],
        clickButton: "Apply puis OK"
      },
      {
        instruction: "IMPORTANT : Copiez l'adresse réseau '10.1.0.0/22' qui s'affiche dans votre presse-papier (Ctrl+C).",
      }
    ],
    trapWarning: "N'oubliez pas d'assigner l'adresse à l'interface 'HOTSPOT' et non à un port individuel comme ether2.",
    verificationTip: "Dans la liste 'Address List', vous voyez la ligne 10.1.1.254/22 associée à l'interface HOTSPOT."
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
    whyWeDoIt: "Sans cela, le MikroTik ne peut pas communiquer avec l'extérieur ni fournir de données aux clients.",
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
    verificationTip: "La colonne 'Status' affiche 'bound' en quelques secondes et une adresse IP s'affiche dans la colonne 'IP Address'."
  },
  {
    id: "step-6",
    number: 6,
    phase: "Distribution IP",
    title: "Configurer le Serveur DHCP (DHCP Setup)",
    subtitle: "Distribuer automatiquement les adresses IP aux téléphones qui se connectent",
    difficulty: "Facile",
    estimatedTime: "3 min",
    videoTimestamp: "05:04",
    whatItDoes: "L'assistant 'DHCP Setup' configure en 6 clics la distribution automatique d'adresses IP pour 1000 personnes.",
    whyWeDoIt: "Pour qu'un téléphone puisse naviguer, il lui faut obligatoirement une IP, une passerelle et des serveurs DNS.",
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
      }
    ],
    trapWarning: "Le 'Lease Time' (durée du bail) doit rester court (30 minutes). Si vous mettez 3 jours, les adresses resteront bloquées par des clients partis.",
    verificationTip: "Un message annonce 'DHCP Setup has completed successfully'. La ligne dhcp1 apparaît en noir sans être rouge."
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
          { field: "Src. Address", value: "10.1.0.0/22", explain: "Collez l'adresse réseau copiée à l'étape 4" },
          { field: "Out. Interface", value: "ether1", explain: "Le port 1 vers votre box" }
        ]
      },
      {
        instruction: "Allez dans l'onglet 'Action' (en haut de la fenêtre) et sélectionnez :",
        valuesToEnter: [{ field: "Action", value: "masquerade" }],
        clickButton: "Apply puis OK"
      }
    ],
    trapWarning: "Attention à bien mettre 'Out. Interface' sur ether1 et pas sur HOTSPOT !",
    verificationTip: "La règle apparaît dans l'onglet NAT avec l'action 'masquerade'."
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
    whatItDoes: "Force le Time-To-Live (TTL) des paquets à 1. Si un utilisateur tente d'activer le 'Partage de connexion' ou de brancher un second routeur, le paquet expire immédiatement à 0 et se fait détruire.",
    whyWeDoIt: "Pour qu'une personne ayant acheté un ticket 1 jour ne puisse pas connecter 10 téléphones de sa famille gratuitement.",
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
          { field: "New TTL", value: "1", explain: "Le chiffre 1 est magique ici" },
          { field: "Passthrough", value: "coché (Yes)" }
        ],
        clickButton: "Apply puis OK"
      }
    ],
    trapWarning: "Ne mettez pas 'ether1' dans Out. Interface pour cette règle, mais bien 'HOTSPOT' !",
    verificationTip: "Une règle postrouting apparaît dans l'onglet Mangle avec l'action change-ttl à 1."
  },
  {
    id: "step-9",
    number: 9,
    phase: "Portail Captif",
    title: "Déploiement du Hotspot & Paramétrage du domaine wifi.tg",
    subtitle: "Activer la page de connexion qui demande le code ticket",
    difficulty: "Attention",
    estimatedTime: "4 min",
    videoTimestamp: "07:53",
    whatItDoes: "Crée le portail captif MikroTik qui bloque l'accès à tout nouvel appareil jusqu'à ce qu'il entre un identifiant valide.",
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
        instruction: "Déroulez l'assistant pas-à-pas :",
        valuesToEnter: [
          { field: "Hotspot Interface", value: "HOTSPOT -> Next" },
          { field: "Local Address of Network", value: "10.1.1.254/22 (Masquerade coché) -> Next" },
          { field: "Address Pool of Network", value: "(Laisser par défaut) -> Next" },
          { field: "Select Certificate", value: "none -> Next" },
          { field: "IP Address of SMTP Server", value: "0.0.0.0 -> Next" },
          { field: "DNS Servers", value: "8.8.8.8 et 8.8.4.4 -> Next" },
          { field: "DNS Name", value: "wifi.tg (Très important : écrivez wifi.tg) -> Next" },
          { field: "Password for the User", value: "Votre mot de passe admin -> Next" }
        ],
        clickButton: "Next jusqu'à la fin"
      },
      {
        instruction: "REGLAGE AVANCÉ 1 : Double-cliquez sur le serveur 'hotspot1' créé dans la liste. Dans le champ 'Addresses Per MAC', mettez '1'. Cliquez sur OK.",
        explain: "Empêche d'utiliser 2 tickets sur le même téléphone."
      },
      {
        instruction: "REGLAGE AVANCÉ 2 : Allez dans l'onglet 'Server Profiles', double-cliquez sur 'hsprof1'. Dans l'onglet 'Login', cochez HTTP PAP, HTTP CHAP, Cookie et MAC Cookie. Réglez 'HTTP Cookie Lifetime' sur '30:00:00:00' (30 jours). Cliquez sur OK.",
        explain: "Permet aux clients fidèles de ne pas retaper leur code à chaque fois qu'ils reviennent."
      }
    ],
    trapWarning: "Le nom DNS doit être exactement 'wifi.tg' (sans http devant, sans espace).",
    verificationTip: "Le statut du Hotspot est actif et vous voyez le profil hsprof1 configuré."
  },
  {
    id: "step-10",
    number: 10,
    phase: "Sans-fil Wi-Fi",
    title: "Configurer les 2 antennes Wi-Fi 6 (2.4 GHz et 5 GHz)",
    subtitle: "Diffuser le nom Wi-Fi 'HAUT DEBIT' accessible à 100% des smartphones",
    difficulty: "Facile",
    estimatedTime: "3 min",
    videoTimestamp: "09:17",
    whatItDoes: "Active les deux cartes radio intégrées au hAP ax² (WiFiWave2) avec le même nom de réseau (SSID).",
    whyWeDoIt: "Les téléphones récents se connecteront en 5 GHz ultra rapide, tandis que les téléphones anciens se connecteront en 2.4 GHz.",
    actions: [
      {
        instruction: "Dans le menu de gauche, cliquez sur 'WiFi'.",
        targetMenu: "WiFi > onglet WiFi"
      },
      {
        instruction: "Sélectionnez les deux lignes 'wifi1' et 'wifi2' et cliquez sur le bouton bleu 'Enable' (la coche bleue) pour les allumer.",
      },
      {
        instruction: "Double-cliquez sur 'wifi1' (antenne 5 GHz) :",
        valuesToEnter: [
          { field: "Onglet Configuration > SSID", value: "HAUT DEBIT" },
          { field: "Onglet Channel > Band", value: "5GHz AX" },
          { field: "Onglet Channel > Channel Width", value: "20MHz (Très important : forcez 20MHz pour la compatibilité)" }
        ],
        clickButton: "Apply puis OK"
      },
      {
        instruction: "Double-cliquez sur 'wifi2' (antenne 2.4 GHz) :",
        valuesToEnter: [
          { field: "Onglet Configuration > SSID", value: "HAUT DEBIT" },
          { field: "Onglet Channel > Band", value: "2GHz AX" },
          { field: "Onglet Channel > Channel Width", value: "20MHz" }
        ],
        clickButton: "Apply puis OK"
      }
    ],
    trapWarning: "Ne réglez pas le canal sur 40 ou 80 MHz ! Beaucoup de vieux téléphones bon marché ne détecteraient même pas votre Wi-Fi. 20 MHz garantit 100% de détection.",
    verificationTip: "Un message 'DFS channel availability check (1 min)' apparaît puis disparaît : votre smartphone voit immédiatement le réseau Wi-Fi 'HAUT DEBIT' ouvert."
  },
  {
    id: "step-11",
    number: 11,
    phase: "Horloge Réseau",
    title: "Synchroniser l'heure exacte du routeur (NTP Client)",
    subtitle: "Régler l'horloge atomique pour que les tickets s'arrêtent à la minute près",
    difficulty: "Facile",
    estimatedTime: "1 min",
    videoTimestamp: "11:15",
    whatItDoes: "Connecte le routeur aux serveurs de temps mondiaux de Google (time.google.com).",
    whyWeDoIt: "Un ticket de 24h ou de 7 jours doit expirer exactement au bon moment. Si l'horloge du routeur est restée en 1970, le ticket ne s'arrêtera jamais !",
    actions: [
      {
        instruction: "Allez dans 'System' > 'Identity', tapez 'HAUT DEBIT' et cliquez sur OK.",
        targetMenu: "System > Identity"
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
    trapWarning: "Si vous oubliez cette étape, certains tickets resteront gravés indéfiniment dans la base sans jamais expirer.",
    verificationTip: "L'horloge en bas à droite de Winbox affiche l'heure exacte et la date du jour."
  },
  {
    id: "step-12",
    number: 12,
    phase: "Logiciel de Vente",
    title: "Démarrer Mikhmon v7 et le connecter au MikroTik",
    subtitle: "Allumer le logiciel qui génère et imprime vos tickets avec les prix en Francs CFA",
    difficulty: "Attention",
    estimatedTime: "3 min",
    videoTimestamp: "12:43",
    whatItDoes: "Mikhmon communique avec le routeur via son API pour créer les utilisateurs, calculer vos recettes et préparer les coupons à imprimer.",
    whyWeDoIt: "Créer 300 utilisateurs à la main dans Winbox prendrait 5 heures. Mikhmon le fait en 3 secondes.",
    actions: [
      {
        instruction: "Sur votre ordinateur, ouvrez le dossier 'Mikpc' et double-cliquez sur 'MikhmonServer.exe'.",
      },
      {
        instruction: "Dans la petite fenêtre qui s'ouvre, cliquez sur 'Start Server' puis sur 'Open Mikhmon'.",
      },
      {
        instruction: "Votre navigateur s'ouvre. Cliquez sur le bouton rouge 'Mikhmon V7' (indispensable pour RouterOS 7.20.6).",
      },
      {
        instruction: "Connectez-vous avec les identifiants d'usine : Username: mikhmon | Password: 1234.",
      },
      {
        instruction: "Cliquez sur 'Add Router' et remplissez les coordonnées de votre MikroTik :",
        valuesToEnter: [
          { field: "Session Name", value: "hautdebit" },
          { field: "IP MikroTik", value: "10.1.1.254" },
          { field: "Username", value: "admin" },
          { field: "Password", value: "Votre mot de passe admin configuré à l'étape 2" },
          { field: "Hotspot Name", value: "HAUT DEBIT" },
          { field: "DNS Name", value: "wifi.tg" },
          { field: "Currency", value: "cfa" },
          { field: "Live Report", value: "Enable" }
        ],
        clickButton: "Save puis Connect"
      }
    ],
    trapWarning: "Ne choisissez pas 'Mikhmon V3' ! Le hAP ax² tourne sous RouterOS v7, vous DEVEZ obligatoirement cliquer sur Mikhmon V7.",
    verificationTip: "Le tableau de bord Mikhmon s'affiche avec la température, l'usage CPU et le logo MikroTik en vert."
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
        instruction: "ATTENTION RÈGLE D'OR : NE TRADUISEZ PAS LA PAGE EN FRANÇAIS DANS VOTRE NAVIGATEUR ! Laissez l'anglais.",
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
    trapWarning: "LE PIÈGE LE PLUS DANGEREUX DE LA VIDÉO : Si vous traduisez la page avec Google Traduction, le mot 'Remove & Record' sera corrompu, la pastille deviendra JAUNE et les tickets deviendront gratuits et infinis !",
    verificationTip: "Dans la liste 'User Profile', les 3 profils ont tous une pastille verte à gauche de leur nom."
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
    verificationTip: "Vous obtenez 3 fichiers PDF propres prêts à imprimer contenant vos 300 tickets Hotspot."
  }
];

export const TROUBLESHOOTING_TIPS = [
  {
    problem: "Mon Winbox ne détecte rien dans l'onglet 'Neighbors'",
    solution: "Désactivez temporairement le pare-feu Windows ou votre antivirus. Vérifiez que votre câble est bien branché sur le Port 3 ou Port 2, et JAMAIS sur le Port 1."
  },
  {
    problem: "Quand j'ajoute ether3 dans le Bridge, Winbox se déconnecte",
    solution: "C'est 100% normal ! Votre PC est branché sur ether3. Attendez 5 secondes, cliquez sur 'Close', puis reconnectez-vous sur l'adresse MAC."
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
    problem: "Le portail captif wifi.tg ne s'ouvre pas automatiquement sur le téléphone",
    solution: "Ouvrez le navigateur du téléphone et tapez manuellement 'http://wifi.tg' ou 'http://10.1.1.254'. Vérifiez que le DHCP Server est bien en vert dans Winbox."
  }
];
