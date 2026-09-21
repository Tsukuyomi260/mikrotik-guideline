export interface TranscriptSegment {
  id: string;
  timeStart: string;
  timeEnd: string;
  secondsStart: number;
  speaker: string;
  topic: string;
  text: string;
  notes?: string;
  tags: string[];
}

export interface ConfigStep {
  stepNumber: number;
  timeStart: string;
  title: string;
  category: 'Winbox' | 'Réseau' | 'Sécurité' | 'Hotspot' | 'Wi-Fi' | 'Mikhmon' | 'Impression';
  description: string;
  parameters: { key: string; value: string }[];
  importantTip?: string;
}

export const VIDEO_METADATA = {
  title: "Guide Débutant MikroTik & Mikhmon (Support hAP ax²)",
  duration: "22:58",
  device: "MikroTik hAP ax² (Compatible quasi-totalité des modèles MikroTik)",
  routerOSVersion: "7.20.6 (Stable ARM64)",
  toolsUsed: ["Winbox v4.0beta24 (64-bit)", "Mikhmon Server V3 (port 8000)", "Navigateur Web Chrome / Edge"],
  mikhmonDownloadUrl: "https://raw.githubusercontent.com/laksa19/laksa19.github.io/master/download/mikhmonv3ws.zip",
  hotspotDns: "wifi.net (ou wifi.tg)",
  hotspotNetwork: "10.1.1.254/22 (Réseau 10.1.0.0/22)",
  contacts: "+229 0153489846 / 0166006880"
};

export const TRANSCRIPT_DATA: TranscriptSegment[] = [
  {
    id: "seg-1",
    timeStart: "00:00",
    timeEnd: "00:38",
    secondsStart: 0,
    speaker: "Formateur",
    topic: "Introduction et présentation du matériel hAP ax²",
    text: "Bonsoir la famille, comment vous allez ? J'espère très bien. Aujourd'hui, notre vidéo va parler de la configuration du ax² [MikroTik hAP ax²]. Après la configuration, on va essayer de faire en même temps les tickets. Ça va être un peu rapide vu que je l'ai déjà fait. Il y a deux personnes qui m'ont suggéré de le faire avec le ax², alors que pratiquement c'est la même chose. Mais on ne va pas utiliser l'ancien Winbox parce que je l'ai déjà mis à jour, il me demande d'utiliser le nouveau, le v4. Donc sur ce, ne regardez pas...",
    notes: "Déballage du routeur MikroTik hAP ax² (boîte hAP series) et lancement de Winbox v4.0beta24. Coordonnées de contact du formateur : +229 0153489846 / 0166006880.",
    tags: ["Unboxing", "hAP ax²", "Winbox v4", "Intro"]
  },
  {
    id: "seg-2",
    timeStart: "00:39",
    timeEnd: "01:40",
    secondsStart: 39,
    speaker: "Formateur",
    topic: "Connexion initiale et réinitialisation complète de la configuration",
    text: "Je vais utiliser le v4, je ne vais pas mettre à jour, c'est venu comme ça. Je clique sur lui et je viens ici, je mets le mot de passe... Ctrl+V... non, Ctrl+Z. Je mets le mot de passe, je pense que le mot de passe là... C'est ça. Quand je clique, il s'ouvre. On me dit de remove la configuration. Moi je préfère le remove, ou bien de... Il y a certains qui vont vouloir l'utiliser, mais moi je ne vous conseille pas. Je remove, ça doit redémarrer normalement. Lorsque tu removes la configuration, le MikroTik doit redémarrer. Une fois que le MikroTik a fini de redémarrer, il faut savoir qu'il y aura quelque chose qui va se passer : le mot de passe que tu as saisi ici premièrement ne va plus être fonctionnel. Ce que je veux dire par là, si tu veux te connecter maintenant, tu effaces le mot de passe, il n'y aura plus de mot de passe, et tu te connectes, ça va passer.",
    notes: "Connexion par adresse MAC F4:1E:57:F7:48:00. Clic sur 'Remove Configuration' dans la fenêtre par défaut de RouterOS. Reconnexion sans mot de passe (login: admin).",
    tags: ["Winbox", "Reset Configuration", "Default Config", "Reboot"]
  },
  {
    id: "seg-3",
    timeStart: "01:41",
    timeEnd: "02:08",
    secondsStart: 101,
    speaker: "Formateur",
    topic: "Changement du mot de passe administrateur",
    text: "Maintenant ici, la première des choses, c'est que tu changes le mot de passe. À toi ton mot de passe, ok ? Tu changes le mot de passe. Password... Le nouveau... L'ancien était rien, il n'y avait rien. Maintenant le nouveau, tu le mets comme cela se doit, et tu changes le mot de passe. C'est bon, le mot de passe a été changé.",
    notes: "Menu System > Password. Old Password: vide, saisie du nouveau mot de passe fort, confirmation puis validation par 'Change Now'.",
    tags: ["Sécurité", "Password", "Admin", "System"]
  },
  {
    id: "seg-4",
    timeStart: "02:09",
    timeEnd: "03:55",
    secondsStart: 129,
    speaker: "Formateur",
    topic: "Création du Bridge 'HOTSPOT' et ajout des ports physiques & Wi-Fi",
    text: "Maintenant sans plus tarder, on va directement créer notre bridge. Créer le bridge, New Bridge. Moi j'utilise toujours le HOT... HOTSPOT. Je suis habitué à l'utiliser. Apply et OK. Donc je vais ici faire les ports. Les ports, je commence... On n'utilise, on ne fait pas le port ether1 parce que c'est le port ether1 qui est l'entrée de la connexion [WAN], donc on le laisse. On commence par le port ether2, bridge HOTSPOT, Apply, OK. Port ether3... Comme c'est le port 3, c'est dans le port 3 moi j'ai mis mon câble qui a relié la machine au MikroTik. Quand je vais mettre Apply, OK, ça va redémarrer normalement. Vous avez vu ? Close. Maintenant il me demande... Je dois venir ici mettre le mot de passe... Et venir ici le rechoisir, c'est lui ça. Ok je fais entrer, il s'est ouvert. Maintenant je continue avec dans le bridge toujours, le port ether4, Apply, OK. Le port ether5, Apply, OK. Maintenant je fais le WLAN, wifi1, Apply, OK. wifi2, Apply, OK. Avec la particularité de celui-ci, c'est qu'il a double bande et il a 1 Go de RAM. C'est ça sa particularité principale.",
    notes: "Création du bridge nommé 'HOTSPOT'. Ajout successif des ports ether2, ether3 (reconnexion brève), ether4, ether5, puis des deux radios WiFiWave2 (wifi1 et wifi2). Port ether1 réservé à la box/fibre (WAN).",
    tags: ["Bridge", "HOTSPOT", "Ports LAN", "wifi1", "wifi2", "RAM 1GB"]
  },
  {
    id: "seg-5",
    timeStart: "03:56",
    timeEnd: "04:36",
    secondsStart: 236,
    speaker: "Formateur",
    topic: "Adressage IP local et choix d'un sous-réseau étendu (/22)",
    text: "Donc ce que moi je vais conseiller, ceux qui vont utiliser ax² et ax³ et ainsi de suite : toujours augmenter la plage d'adresses IP. Ne mettez pas /24, mettez au moins /21 ou bien /22. Je vais sans plus tarder aller au niveau de l'adresse IP. Je vais lui donner l'adresse 10.1.1.254... /24... et /22. Moi je vais choisir /22 pour lui. Et je vais prendre le HOTSPOT. Apply. Vous copiez celui-ci, c'est important. Après vous allez voir pourquoi je dis de copier. OK. J'ai créé l'adresse.",
    notes: "Menu IP > Addresses. IP: 10.1.1.254/22 sur l'interface HOTSPOT. Le réseau calculé est 10.1.0.0. Le formateur copie '10.1.0.0' pour la suite (NAT).",
    tags: ["IP Address", "Subnet /22", "10.1.1.254", "Capacité IP"]
  },
  {
    id: "seg-6",
    timeStart: "04:37",
    timeEnd: "05:03",
    secondsStart: 277,
    speaker: "Formateur",
    topic: "Configuration du DHCP Client sur ether1 (Entrée Internet)",
    text: "Maintenant après la création d'adresse, on va directement dans le DHCP Client. On va configurer l'entrée de la connexion. C'est l'ether1. Lui-même il a déjà choisi. On fait Entrée, OK. Vous allez voir que ether1... Vous allez voir que bon, vous voyez, il est octroyé. Vous voyez qu'il marche, 'yes'. Donc l'ether1 a déjà la connexion. Donc je le ferme.",
    notes: "Menu IP > DHCP Client > +. Interface: ether1, avec Use Peer DNS, Use Peer NTP et Add Default Route. Statut: 'bound' avec attribution de l'adresse IP WAN.",
    tags: ["DHCP Client", "ether1", "WAN", "Internet"]
  },
  {
    id: "seg-7",
    timeStart: "05:04",
    timeEnd: "06:50",
    secondsStart: 304,
    speaker: "Formateur",
    topic: "Configuration du serveur DHCP (DHCP Setup) & Explication du pool étendu",
    text: "Je fais le DHCP Serveur. Je vais dans Setup... Je choisis le HOTSPOT, je fais Next. Il me donne la plage d'adresse, je fais Next. La gateway, je fais Next. Les deux plages d'adresse : ici j'ai pratiquement 1000 quelque chose adresses à recevoir. Vous voyez, quand j'ai pris /22, il m'a donné 1000 quelque chose adresses. Le pourquoi je fais ça, parce que ce MikroTik va être mis dans une zone où il y a beaucoup de personnes qui vont se connecter sur lui. Il a 1 Go de RAM, donc du coup si je le mets en /24, c'est seulement 254 adresses seulement qui seront octroyées. Donc ici moi je préfère mettre 1000 quelque chose. Vous voyez, non ? OK. Donc je fais Next. DNS Servers : 8.8.8.8, plus je vais mettre les deux : 8.8.4.4. Tout cela a été déjà fait, hein. Ceux qui me suivent d'habitude savent que ça a été déjà fait. Mais suite à la demande de deux personnes de faire avec ça, je leur ai dit que c'est la même chose, mais ils ont exigé de le faire, je vais le faire pour eux, ce n'est pas grave.",
    notes: "Menu IP > DHCP Server > DHCP Setup sur l'interface HOTSPOT. Passerelle: 10.1.1.254. Plage d'adresses: 10.1.0.1-10.1.1.253 et 10.1.1.255-10.1.3.254 (plus de 1000 IPs). DNS: 8.8.8.8 et 8.8.4.4. Lease time: 30 minutes.",
    tags: ["DHCP Server", "DHCP Setup", "Pool 1000 IPs", "DNS Google"]
  },
  {
    id: "seg-8",
    timeStart: "06:51",
    timeEnd: "07:24",
    secondsStart: 411,
    speaker: "Formateur",
    topic: "Règle de Firewall NAT (Masquerade pour le partage de connexion)",
    text: "Maintenant on passe directement au Firewall. Firewall, je crée la NAT, la règle NAT source. Et maintenant j'ajoute Source Address : c'est ici je vais coller ce que j'avais fait la chose là... Je fais /22. L'adresse que j'avais copiée là, je la colle ici : 10.1.0.0/22. Et Out Interface, c'est ether1. Maintenant je viens dans Action, je choisis 'masquerade', et je fais Apply, OK.",
    notes: "Menu IP > Firewall > NAT > +. Chain: srcnat, Src. Address: 10.1.0.0/22, Out. Interface: ether1. Action: masquerade. Permet à tous les clients du sous-réseau d'accéder à Internet via l'IP publique d'ether1.",
    tags: ["Firewall", "NAT", "Masquerade", "srcnat", "ether1"]
  },
  {
    id: "seg-9",
    timeStart: "07:25",
    timeEnd: "07:52",
    secondsStart: 445,
    speaker: "Formateur",
    topic: "Règle Mangle (Blocage du partage de connexion / Change TTL)",
    text: "Maintenant je viens dans Mangle. Je fais suivant... Je choisis ici le postrouting. Et Out Interface, je choisis le HOTSPOT. Ça là, c'est pour bloquer le partage de la connexion. On Apply... Non, on n'Apply pas, autant pour moi. On vient dans Action, on choisit 'change TTL'. On choisit New TTL : 1. Et moi j'ai l'habitude de cocher ici, Passthrough. OK. OK.",
    notes: "Menu IP > Firewall > Mangle > +. Chain: postrouting, Out. Interface: HOTSPOT. Action: change TTL, TTL Action: change, New TTL: 1, Passthrough: activé. Cette règle empêche les clients connectés de repartager leur connexion via un répéteur ou point d'accès mobile.",
    tags: ["Mangle", "TTL", "Anti-Partage", "postrouting", "Hotspot Security"]
  },
  {
    id: "seg-10",
    timeStart: "07:53",
    timeEnd: "09:16",
    secondsStart: 473,
    speaker: "Formateur",
    topic: "Déploiement de l'assistant Hotspot & Optimisation des profils",
    text: "Maintenant on va directement dans le Hotspot. Hotspot, Hotspot... Je fais ici Hotspot Setup. Je choisis le HOTSPOT, je fais Next, Next, Next, Next, Next. DNS Servers : 8.8.8.8, non je vais ajouter le second : 8.8.4.4. Next. DNS Name... Je vais utiliser wifi.tg. Next. Je mets mon mot de passe et je fais Next. Vous avez vu, c'est venu comme ça. Maintenant ici je vais essayer de réduire Addresses Per MAC à 1, je fais Apply et je mets OK. Maintenant je dois venir dans Server Profiles, je vais cliquer sur celui-ci [hsprof1]. Je vais venir ici, cocher ça là [HTTP PAP, CHAP, Cookie, MAC Cookie]. Ici moi parfois même les cookies là, je le mets à 30 [30 jours : 30:00:00:00]. Parce qu'il y a d'habitude certains là, ils partent 3 jours et reviennent là et ça ne marche plus. Maintenant c'est fini, je viens de configurer le MikroTik, il reste seulement le Wi-Fi.",
    notes: "Menu IP > Hotspot > Hotspot Setup. DNS Name: wifi.tg. Dans Servers > hotspot1: Addresses Per MAC = 1 (évite le clonage). Dans Server Profiles > hsprof1: activation de HTTP PAP, Cookie, MAC Cookie, et HTTP Cookie Lifetime = 30 jours (30:00:00:00).",
    tags: ["Hotspot Setup", "wifi.tg", "Addresses Per MAC", "Server Profiles", "Cookies"]
  },
  {
    id: "seg-11",
    timeStart: "09:17",
    timeEnd: "11:14",
    secondsStart: 557,
    speaker: "Formateur",
    topic: "Configuration du Wi-Fi 6 (WiFiWave2) : Bandes 5 GHz et 2.4 GHz",
    text: "Le Wi-Fi qui est ça là, je vais l'Enable. Je vous avais dit qu'il avait double bande, c'est les deux bandes ça. Maintenant je vais configurer wifi1. Je vais le configurer... Il me dit qu'il n'y a pas de SSID, donc je viens ici, moi je mets HAUT DEBIT. HAUT DEBIT, je mets. Je viens ici, choisissez toujours le AX. Channel Width, choisissez le 20MHz pour que tout le monde puisse se connecter. Si vous choisissez 40, c'est bon mais il y a certains appareils ça ne va pas marcher. Apply, OK. Je viens ici configurer le second [wifi2], HAUT DEBIT. La bande, je vais prendre 2G AX. Channel Width 20MHz. Apply et OK. Les deux bandes vont commencer par émettre. Vous allez voir, ils vont commencer par émettre tout à l'heure. Il a dit d'attendre 1 minute [DFS channel availability check], ça va venir. Si les 1 minute sont passées là, il va commencer par émettre.",
    notes: "Menu WiFi (norme WiFi 6 / 802.11ax). Activation des interfaces wifi1 et wifi2. SSID commun: 'HAUT DEBIT'. Band: 5GHz AX et 2GHz AX. Largeur de canal fixée à 20MHz pour garantir la compatibilité avec 100% des smartphones anciens et récents.",
    tags: ["WiFi 6", "802.11ax", "SSID HAUT DEBIT", "20MHz", "DFS Check"]
  },
  {
    id: "seg-12",
    timeStart: "11:15",
    timeEnd: "12:15",
    secondsStart: 675,
    speaker: "Formateur",
    topic: "Nom du routeur (Identity) & Synchronisation d'horloge NTP",
    text: "Il y a une chose importante qu'on oublie de faire avec les nouvelles choses là : je vais aller directement Identifier, parce que moi je travaille avec beaucoup de MikroTik. HAUT DEBIT. J'ai identifié mon MikroTik en tant que HAUT DEBIT. Vous avez vu, c'est parti. Maintenant je vais aller dans Setting, le NTP Client. Vous voyez ça même, le NTP Client là ? Je coche ici Enabled, j'ajoute un serveur : time.google.com. C'est à cause des tickets je fais ça, parce que pour qu'il respecte les temps et que certains tickets ne restent pas indéfiniment dans la base. Je viens ici, je coche les deux là, et je mets Apply, OK. C'est bon.",
    notes: "Menu System > Identity : HAUT DEBIT. Menu System > SNTP Client : Enable, mode unicast, NTP Server: time.google.com. Indispensable pour la précision de l'horodatage des tickets Hotspot et leur expiration automatique.",
    tags: ["System Identity", "NTP Client", "time.google.com", "Horodatage Tickets"]
  },
  {
    id: "seg-13",
    timeStart: "12:16",
    timeEnd: "12:42",
    secondsStart: 736,
    speaker: "Formateur",
    topic: "Test de connexion au Wi-Fi et ouverture du portail captif",
    text: "Je peux vous dire que le MikroTik est bien configuré. C'est fini, c'est bien configuré. On va essayer voir s'il va apparaître. Je vais éteindre le Wi-Fi, je vais vouloir connecter sur HAUT DEBIT, on va voir s'il va passer. Je vais voir si ça va passer... Ça passe crème ! Vous avez vu ? Je me suis connecté à HAUT DEBIT comme ça directement, c'est bon.",
    notes: "L'ordinateur se connecte au Wi-Fi 'HAUT DEBIT'. Le navigateur ouvre automatiquement http://wifi.tg/login. Saisie des identifiants admin et connexion immédiate à Internet avec affichage du portail MSN.",
    tags: ["Test Connexion", "Portail Captif", "wifi.tg", "Succès"]
  },
  {
    id: "seg-14",
    timeStart: "12:43",
    timeEnd: "15:35",
    secondsStart: 763,
    speaker: "Formateur",
    topic: "Démarrage de Mikhmon v7 et liaison avec le routeur MikroTik",
    text: "Maintenant sans plus tarder, on va directement commencer par faire les tickets en même temps. Parce que c'est ce que j'ai promis, je vais faire d'une pierre deux coups, je vais faire tout en même temps. Maintenant ici je vais ouvrir... J'arrive... Le Mikhmon de chez MNA, OK. Je vais mettre Server, on va voir il a pris l'adresse, je l'ouvre. Comme c'est, il est v7, le MikroTik est v7, je suis obligé d'utiliser le v7. Vous avez vu, v7.20... C'est 7.20.6 stable. Donc je suis obligé d'utiliser le v7 ici. Donc ici, je ne l'ai jamais utilisé si je ne me trompe pas... Quand tu n'as jamais utilisé, c'est comme ça : mikhmon, 1 2 3 4, Entrée. Je vais ajouter le routeur : Session Name hautdebit... IP MikroTik 10.1.1.254. Username admin. Ici c'est le mot de passe qu'on a mis pour notre Winbox là. Hotspot Name HAUT DEBIT. DNS Name wifi.tg. Si vous faites une erreur là, ça ne va pas marcher, hein : wifi.tg. Currency : cfa. Maintenant ici je vais Enable le rapport, c'est bon. C'est configuré comme ça, je Save, je fais un petit ping voir si ça marche. Ça marche, et je me connecte. Crème, c'est fini ! Vous voyez, non ? C'est pas compliqué.",
    notes: "Ouverture de MikhmonServer.exe (port 8000). Sélection de 'Mikhmon V7' (adapté à RouterOS v7.20.6). Login par défaut 'mikhmon' / '1234'. Configuration de la session : IP 10.1.1.254, Hotspot HAUT DEBIT, DNS wifi.tg, devise CFA. Ping OK et connexion réussie au dashboard.",
    tags: ["Mikhmon v7", "RouterOS v7", "Add Router", "Session Setup", "Devise CFA"]
  },
  {
    id: "seg-15",
    timeStart: "15:36",
    timeEnd: "18:05",
    secondsStart: 936,
    speaker: "Formateur",
    topic: "Création des profils utilisateurs : 24 Heures, Semaine et Mois",
    text: "Moi je vais faire seulement trois genres de tickets : journée, semaine, mois. Donc je vais ici premièrement créer les profils. Vous avez vu ici, Add Profile. Ne convertissez pas ça en français s'il vous plaît ! Laissez ça en anglais et faites le travail. Si vous avez fait ça là, vous allez souffrir, je vous assure. OK. Ici là, je vais faire 24HEURES. Shared users : 1. Expired mode : Remove & Record. Il n'a qu'à enregistrer et le faire sortir de la base. Validité c'est 24h, petit h. 24 petit h ou bien 1 petit d, ok ? La somme c'est 200... 200. C'est fini. Lock User : Disable. Save. Si vous faites et ici là c'est jaune, il faut savoir que tous les tickets que vous allez produire là ne vont pas s'expirer facilement, ils seront gratuits ! Regardez ici, il ne doit pas être jaune, ça doit être en vert ! Ok ? Les parties où je crie là, c'est à cause de ça vous m'appelez, raison pour laquelle je crie. Maintenant SEMAINE : Shared users 1, Remove & Record, ici c'est 7 jours : 7d, petit d. Prix 700, 700, Save. Vous avez vu, non ? C'est vert. Je vais encore ajouter MOIS : Remove & Record, validité 30d, prix 2000, 2000, Save. Je viens de créer les trois profils que j'avais dit que je vais créer.",
    notes: "Menu Hotspot > User Profile > Add Profile. Règle absolue: NE PAS TRADUIRE LA PAGE EN FRANÇAIS dans le navigateur pour éviter les erreurs de scripts. Profils créés avec Expired Mode = 'Remove & Record' et indicateur VERT obligatoire : 24HEURES (24h - 200 CFA), SEMAINE (7d - 700 CFA), MOIS (30d - 2000 CFA).",
    tags: ["User Profile", "24HEURES", "SEMAINE", "MOIS", "Remove & Record", "Alerte Traduction"]
  },
  {
    id: "seg-16",
    timeStart: "18:06",
    timeEnd: "21:59",
    secondsStart: 1086,
    speaker: "Formateur",
    topic: "Génération en masse des tickets et impression des planches PDF",
    text: "Donc je vais aller créer les tickets ici : Generate. Je vais générer 100 tickets. Ici il y a deux manières de le faire : soit vous faites Username et Password, ou bien vous le faites un seul code : Username = Password. Avant j'avais fait Username et Password, maintenant moi je vais faire Username = Password. Et ici vous réduisez un peu, 8 c'est trop, moi je préfère que ça soit 4. Sur Random là, vous pouvez choisir le random que vous voulez, moi je préfère que ça soit mélangé : abcd... Profile : 24HEURES. Time Limit : c'est lui qui est le plus important ! Time Limit : soit vous mettez 1d ou bien 24h, 24 petit h ! Je dis bien 24 petit h ! Generate. J'ai fait l'erreur là, j'ai généré seulement un seul ticket, c'est 100 je voulais... En fait c'est 100, eh c'est rapide comme ça ! On continue, je fais 100 aussi pour Semaine. Username = Password, je ramène ça à 5 toujours, SEMAINE, ici c'est 7d, petit d. Generate. C'est fini aussi. Maintenant pour le mois aussi, je fais 100, Username = Password, longueur 5, MOIS, ici c'est 30d, et je génère. C'est fini ! Je reviens ici, tous mes tickets sont là. Donc je vais les imprimer. Moi je préfère l'imprimer en 'Small'. Et j'imprime 60 par papier, par page, c'est ça. J'enregistre. Je reviens, je choisis Semaine, je fais Small, j'enregistre... Et pour le mois, je choisis Small et j'enregistre. Voilà mes tickets qui sont imprimés, les trois sont là.",
    notes: "Menu Users > Generate. Paramétrage clé: User Mode = 'Username = Password' (simplifie l'expérience client), Time Limit obligatoire (24h, 7d, 30d), longueur de code (4 ou 5 caractères), caractères aléatoires. Génération de 100 tickets pour chaque profil. Impression en format 'Small' (60 coupons par page PDF) puis enregistrement des PDF.",
    tags: ["Generate Vouchers", "Username = Password", "Time Limit", "Impression PDF", "Small Format"]
  },
  {
    id: "seg-17",
    timeStart: "22:00",
    timeEnd: "22:58",
    secondsStart: 1320,
    speaker: "Formateur",
    topic: "Conclusion, vérification finale et annonce de la formation WireGuard",
    text: "Les trois sont là. Donc je peux vous dire que pratiquement je suis à la fin de la vidéo. C'est fini. Je vais voir s'il y a une mise à jour que je dois faire pour mon MikroTik... Et ne faites pas des mises à jour dans le désordre, hein ! Je pense qu'il est à jour quand même... Package... Il est à jour, 7.20.6, c'est bon. Vous voyez, je viens comme ça de finir la configuration et l'impression des tickets pour le ax². Ce que je vais vous dire à la suite, c'est que dans la prochaine vidéo, on doit configurer le WireGuard là, le contrôle à distance fait par le WireGuard. On va le faire ! Et après, on continue avec le Back to Home sur le portable si Dieu nous donne longue vie.",
    notes: "Vérification des 3 PDF générés dans les téléchargements. Contrôle de la version RouterOS 7.20.6 dans System > Packages. Annonce du prochain tutoriel : VPN WireGuard et MikroTik 'Back to Home' pour la télégestion à distance depuis un smartphone.",
    tags: ["Conclusion", "RouterOS 7.20.6", "WireGuard", "Back to Home", "Next Step"]
  }
];

export const CONFIG_STEPS: ConfigStep[] = [
  {
    stepNumber: 1,
    timeStart: "00:39",
    title: "Connexion initiale & Reset de configuration",
    category: "Winbox",
    description: "Connexion via Winbox v4 en sélectionnant l'adresse MAC dans l'onglet Neighbors. Réinitialisation complète du routeur pour éliminer la configuration par défaut.",
    parameters: [
      { key: "Outil", value: "Winbox 4.0beta24 (64-bit)" },
      { key: "Adresse MAC détectée", value: "F4:1E:57:F7:48:00" },
      { key: "Version initiale", value: "RouterOS v7.20.6" },
      { key: "Action", value: "Cliquer sur 'Remove Configuration' et laisser redémarrer" },
      { key: "Reconnexion", value: "Login: admin / Mot de passe vide" }
    ],
    importantTip: "Ne conservez pas la configuration par défaut d'usine si vous créez un Hotspot dédié, afin d'éviter les conflits de pare-feu et de sous-réseau."
  },
  {
    stepNumber: 2,
    timeStart: "01:41",
    title: "Sécurisation du compte administrateur",
    category: "Sécurité",
    description: "Attribution immédiate d'un mot de passe fort pour l'accès Winbox / WebFig.",
    parameters: [
      { key: "Menu", value: "System > Password" },
      { key: "Old Password", value: "(Laisser vide)" },
      { key: "New Password", value: "Mot de passe sécurisé personnalisé" },
      { key: "Validation", value: "Change Now" }
    ]
  },
  {
    stepNumber: 3,
    timeStart: "02:09",
    title: "Création du Bridge 'HOTSPOT' & Agrégation des ports",
    category: "Réseau",
    description: "Création d'un pont réseau virtuel fédérant tous les ports clients (LAN ether2 à ether5) ainsi que les deux bandes Wi-Fi (wifi1 et wifi2).",
    parameters: [
      { key: "Menu Bridge", value: "Bridge > + > Name: HOTSPOT" },
      { key: "Port ether1 (WAN)", value: "NON INCLUS (réservé à l'arrivée Internet)" },
      { key: "Ports LAN inclus", value: "ether2, ether3, ether4, ether5" },
      { key: "Radios Wi-Fi incluses", value: "wifi1 (5 GHz) et wifi2 (2.4 GHz)" }
    ],
    importantTip: "Lors de l'ajout du port sur lequel votre ordinateur de gestion est connecté (ether3 dans la vidéo), Winbox se déconnecte quelques secondes : reconnectez-vous simplement avec vos identifiants."
  },
  {
    stepNumber: 4,
    timeStart: "03:56",
    title: "Adressage IP du Bridge avec sous-réseau étendu (/22)",
    category: "Réseau",
    description: "Configuration de la passerelle Hotspot avec un masque /22 permettant d'accueillir jusqu'à 1022 hôtes simultanés.",
    parameters: [
      { key: "Menu", value: "IP > Addresses > +" },
      { key: "Address", value: "10.1.1.254/22" },
      { key: "Network calculé", value: "10.1.0.0" },
      { key: "Interface", value: "HOTSPOT" }
    ],
    importantTip: "Copiez l'adresse réseau '10.1.0.0/22' dans votre presse-papier, elle servira immédiatement pour la règle NAT et pour le serveur DHCP."
  },
  {
    stepNumber: 5,
    timeStart: "04:37",
    title: "Activation du Client DHCP sur l'entrée WAN (ether1)",
    category: "Réseau",
    description: "Le port ether1 reçoit l'accès Internet depuis votre modem, box fibre ou faisceau hertzien.",
    parameters: [
      { key: "Menu", value: "IP > DHCP Client > +" },
      { key: "Interface", value: "ether1" },
      { key: "Use Peer DNS / NTP", value: "Yes" },
      { key: "Add Default Route", value: "Yes" },
      { key: "Statut attendu", value: "bound (adresse IP obtenue)" }
    ]
  },
  {
    stepNumber: 6,
    timeStart: "05:04",
    title: "Configuration du serveur DHCP (DHCP Setup)",
    category: "Réseau",
    description: "Génération automatique du serveur DHCP pour distribuer automatiquement les IP à tous les utilisateurs du Hotspot.",
    parameters: [
      { key: "Assistant", value: "IP > DHCP Server > DHCP Setup" },
      { key: "Interface", value: "HOTSPOT" },
      { key: "Address Space", value: "10.1.0.0/22" },
      { key: "Gateway", value: "10.1.1.254" },
      { key: "Pool d'adresses", value: "10.1.0.1-10.1.1.253, 10.1.1.255-10.1.3.254" },
      { key: "DNS", value: "8.8.8.8, 8.8.4.4" },
      { key: "Lease Time", value: "00:30:00 (30 minutes)" }
    ],
    importantTip: "Un bail court (30 min) permet de libérer très vite les adresses IP des passants et clients partis, évitant la saturation du pool."
  },
  {
    stepNumber: 7,
    timeStart: "06:51",
    title: "Pare-feu : Règle NAT Masquerade",
    category: "Sécurité",
    description: "Permet aux paquets du réseau local d'être traduits et acheminés vers Internet via la connexion du port ether1.",
    parameters: [
      { key: "Menu", value: "IP > Firewall > NAT > +" },
      { key: "Chain", value: "srcnat" },
      { key: "Src. Address", value: "10.1.0.0/22" },
      { key: "Out. Interface", value: "ether1" },
      { key: "Action", value: "masquerade" }
    ]
  },
  {
    stepNumber: 8,
    timeStart: "07:25",
    title: "Pare-feu : Règle Mangle Anti-Partage de Connexion (TTL = 1)",
    category: "Sécurité",
    description: "Règle de filtrage empêchant les utilisateurs d'utiliser des routeurs ou points d'accès mobiles secondaires pour revendre ou partager leur ticket.",
    parameters: [
      { key: "Menu", value: "IP > Firewall > Mangle > +" },
      { key: "Chain", value: "postrouting" },
      { key: "Out. Interface", value: "HOTSPOT" },
      { key: "Action", value: "change TTL" },
      { key: "TTL Action", value: "change" },
      { key: "New TTL", value: "1" },
      { key: "Passthrough", value: "Coché (Yes)" }
    ],
    importantTip: "En forçant le TTL à 1 en sortie vers le Hotspot, tout saut supplémentaire (hop vers un second routeur ou partage Wi-Fi Android/iOS) verra son paquet expiré (TTL 0) et donc bloqué."
  },
  {
    stepNumber: 9,
    timeStart: "07:53",
    title: "Assistant Hotspot & Personnalisation du profil serveur",
    category: "Hotspot",
    description: "Déploiement du portail captif MikroTik avec nom de domaine local et verrouillage par adresse MAC.",
    parameters: [
      { key: "Assistant", value: "IP > Hotspot > Hotspot Setup" },
      { key: "Interface", value: "HOTSPOT" },
      { key: "Local Address", value: "10.1.1.254/22 (Masquerade Network coché)" },
      { key: "DNS Name", value: "wifi.tg" },
      { key: "Hotspot Servers", value: "hotspot1 > Addresses Per MAC = 1" },
      { key: "Server Profiles", value: "hsprof1 > Login: HTTP PAP, HTTP CHAP, Cookie, MAC Cookie" },
      { key: "HTTP Cookie Lifetime", value: "30:00:00:00 (30 jours)" }
    ]
  },
  {
    stepNumber: 10,
    timeStart: "09:17",
    title: "Configuration Wi-Fi 6 (WiFiWave2) 2.4 GHz & 5 GHz",
    category: "Wi-Fi",
    description: "Paramétrage des deux cartes Wi-Fi intégrées avec canalisation à 20 MHz pour une compatibilité maximale avec tous les appareils.",
    parameters: [
      { key: "Menu", value: "WiFi > Interfaces" },
      { key: "wifi1 (5 GHz)", value: "SSID: HAUT DEBIT, Band: 5GHz AX, Width: 20MHz" },
      { key: "wifi2 (2.4 GHz)", value: "SSID: HAUT DEBIT, Band: 2GHz AX, Width: 20MHz" },
      { key: "DFS Wait", value: "Attendre 1 min le temps du scan DFS" }
    ],
    importantTip: "Ne forcez pas 40 ou 80 MHz si vous avez des usagers avec de vieux téléphones ou dans un environnement saturé. 20 MHz assure une connexion fluide et universelle."
  },
  {
    stepNumber: 11,
    timeStart: "11:15",
    title: "Identification du routeur & Synchronisation horaire SNTP",
    category: "Winbox",
    description: "Nommage du routeur et configuration du client NTP sur time.google.com pour une gestion fiable de la validité des tickets.",
    parameters: [
      { key: "System > Identity", value: "HAUT DEBIT" },
      { key: "System > SNTP Client", value: "Enabled, Mode: unicast" },
      { key: "NTP Server", value: "time.google.com" }
    ],
    importantTip: "Si l'horloge du routeur n'est pas synchronisée par Internet, les tickets à validité temporelle (ex. 24h ou 7 jours) risquent de ne jamais expirer ou d'expirer immédiatement."
  },
  {
    stepNumber: 12,
    timeStart: "12:43",
    title: "Lancement de Mikhmon v7 et Connexion API",
    category: "Mikhmon",
    description: "Démarrage du logiciel de gestion de tickets Mikhmon en version RouterOS v7 et connexion au routeur hAP ax².",
    parameters: [
      { key: "Serveur local", value: "MikhmonServer.exe (port 8000)" },
      { key: "Version choisie", value: "Mikhmon V7 (adapté à RouterOS 7.20.6)" },
      { key: "Login Mikhmon", value: "mikhmon / 1234" },
      { key: "Session Name", value: "hautdebit" },
      { key: "IP MikroTik", value: "10.1.1.254" },
      { key: "Hotspot / DNS", value: "HAUT DEBIT / wifi.tg" },
      { key: "Devise", value: "cfa" }
    ]
  },
  {
    stepNumber: 13,
    timeStart: "15:36",
    title: "Création des Profils de Vouchers (24H, Semaine, Mois)",
    category: "Mikhmon",
    description: "Création des tarifs et durées de tickets dans Mikhmon avec suppression automatique des tickets expirés.",
    parameters: [
      { key: "Langue du navigateur", value: "LAISSER EN ANGLAIS (ne pas traduire la page)" },
      { key: "Profil 1 (24HEURES)", value: "Validity: 24h, Prix: 200 CFA, Expired Mode: Remove & Record" },
      { key: "Profil 2 (SEMAINE)", value: "Validity: 7d, Prix: 700 CFA, Expired Mode: Remove & Record" },
      { key: "Profil 3 (MOIS)", value: "Validity: 30d, Prix: 2000 CFA, Expired Mode: Remove & Record" },
      { key: "Contrôle visuel", value: "La pastille de statut du profil doit impérativement être VERTE" }
    ],
    importantTip: "Si vous traduisez la page Mikhmon en français avec Google Traduction, les champs de validité s'altèrent et les tickets deviennent jaunes (ne s'expirent plus jamais)."
  },
  {
    stepNumber: 14,
    timeStart: "18:06",
    title: "Génération en Masse & Impression des Planches de Tickets PDF",
    category: "Impression",
    description: "Génération de lots de 100 coupons avec identifiant unique (Username = Password) et impression en grille de 60 coupons par feuille A4.",
    parameters: [
      { key: "Menu", value: "Users > Generate" },
      { key: "User Mode", value: "Username = Password (code unique)" },
      { key: "Longueur du code", value: "4 caractères (24H) ou 5 caractères (Semaine/Mois)" },
      { key: "Caractères", value: "Random abcd2345 (chiffres et lettres minuscules)" },
      { key: "Time Limit obligatoire", value: "24h (pour 24H), 7d (pour Semaine), 30d (pour Mois)" },
      { key: "Format d'impression", value: "Format 'Small' (60 coupons par page PDF)" }
    ]
  }
];

export const MIKROTIK_SCRIPT_SNIPPET = `# Script de configuration hAP ax2 équivalent aux commandes exécutées
/interface bridge add name=HOTSPOT
/interface bridge port
add bridge=HOTSPOT interface=ether2
add bridge=HOTSPOT interface=ether3
add bridge=HOTSPOT interface=ether4
add bridge=HOTSPOT interface=ether5
add bridge=HOTSPOT interface=wifi1
add bridge=HOTSPOT interface=wifi2

/ip address add address=10.1.1.254/22 interface=HOTSPOT network=10.1.0.0
/ip dhcp-client add interface=ether1 add-default-route=yes use-peer-dns=yes use-peer-ntp=yes

/ip pool add name=hs-pool-1 ranges=10.1.0.1-10.1.1.253,10.1.1.255-10.1.3.254
/ip dhcp-server add address-pool=hs-pool-1 interface=HOTSPOT lease-time=30m name=dhcp1
/ip dhcp-server network add address=10.1.0.0/22 dns-server=8.8.8.8,8.8.4.4 gateway=10.1.1.254

/ip firewall nat add action=masquerade chain=srcnat out-interface=ether1 src-address=10.1.0.0/22
/ip firewall mangle add action=change-ttl chain=postrouting new-ttl=set:1 out-interface=HOTSPOT passthrough=yes

/ip hotspot profile add dns-name=wifi.tg hotspot-address=10.1.1.254 login-by=cookie,http-pap,http-chap,mac-cookie http-cookie-lifetime=30d name=hsprof1
/ip hotspot add address-pool=hs-pool-1 addresses-per-mac=1 interface=HOTSPOT name=hotspot1 profile=hsprof1

/system identity set name="HAUT DEBIT"
/system ntp client set enabled=yes
/system ntp client servers add address=time.google.com
`;
