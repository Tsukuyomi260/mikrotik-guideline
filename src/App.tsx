/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  TRANSCRIPT_DATA, 
  CONFIG_STEPS, 
  VIDEO_METADATA, 
  MIKROTIK_SCRIPT_SNIPPET,
  TranscriptSegment 
} from './data/transcriptData';
import {
  BEGINNER_GUIDE_STEPS,
  CABLING_GUIDE,
  TROUBLESHOOTING_TIPS,
  BeginnerStep
} from './data/beginnerGuideData';
import { 
  Search, 
  Copy, 
  Check, 
  Download, 
  FileText, 
  Terminal, 
  Wifi, 
  ShieldCheck, 
  Server, 
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Printer,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Square,
  CheckSquare,
  Layers,
  DollarSign,
  Sun,
  Moon,
  Image as ImageIcon,
  Info,
  CheckCircle,
  PhoneCall,
  Laptop
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'beginner' | 'cabling' | 'troubleshoot' | 'transcription' | 'script'>('beginner');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedScreenshots, setExpandedScreenshots] = useState<Record<string, boolean>>({});
  
  // Theme state: dark vs light
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const savedTheme = localStorage.getItem('mikrotik_guide_theme');
      if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  const isDark = theme === 'dark';

  const toggleTheme = () => {
    const next = isDark ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem('mikrotik_guide_theme', next);
    } catch {}
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Progress tracking for beginner steps
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('mikrotik_guide_progress');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [filterPhase, setFilterPhase] = useState<string>('all');

  const toggleStepCompleted = (stepId: string) => {
    setCompletedSteps(prev => {
      const updated = { ...prev, [stepId]: !prev[stepId] };
      try {
        localStorage.setItem('mikrotik_guide_progress', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const toggleScreenshot = (stepId: string) => {
    setExpandedScreenshots(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const progressPercentage = useMemo(() => {
    const total = BEGINNER_GUIDE_STEPS.length;
    const done = Object.values(completedSteps).filter(Boolean).length;
    return Math.round((done / total) * 100);
  }, [completedSteps]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const downloadFullGuide = () => {
    let content = `# GUIDE DÉBUTANT MIKROTIK & MIKHMON - GUIDE PAS-À-PAS ILLUSTRÉ\n`;
    content += `Pour débutant absolu - Pas-à-pas chronologique issu de la vidéo de formation\n`;
    content += `Matériel support : ${VIDEO_METADATA.device} | RouterOS : ${VIDEO_METADATA.routerOSVersion}\n`;
    content += `Formateur de la vidéo : ${VIDEO_METADATA.contacts}\n`;
    content += `Lien direct téléchargement Mikhmon V3 : ${VIDEO_METADATA.mikhmonDownloadUrl}\n\n`;
    content += `COMPATIBILITÉ UNIVERSELLE : Ce guide fonctionne sur quasi tous les routeurs MikroTik (hAP, hEX, RB2011, RB3011, RB4011, etc.).\n\n`;
    content += `=================================================================\n`;
    content += `TABLEAU DE CÂBLAGE DES PORTS PHYSIQUES\n`;
    content += `=================================================================\n`;
    CABLING_GUIDE.forEach(c => {
      content += `${c.port} : [${c.label}]\n -> À brancher : ${c.plugWhat}\n -> Remarque : ${c.note}\n\n`;
    });

    content += `=================================================================\n`;
    content += `LES 15 ÉTAPES DÉTAILLÉES SANS JARGON\n`;
    content += `=================================================================\n\n`;

    BEGINNER_GUIDE_STEPS.forEach(s => {
      content += `-----------------------------------------------------------------\n`;
      content += `ÉTAPE ${s.number} : ${s.title.toUpperCase()}\n`;
      content += `Phase : ${s.phase} | Temps estimé : ${s.estimatedTime} | Vidéo : ${s.videoTimestamp}\n`;
      content += `-----------------------------------------------------------------\n`;
      content += `Ce que ça fait : ${s.whatItDoes}\n`;
      content += `Pourquoi c'est obligatoire : ${s.whyWeDoIt}\n\n`;
      content += `ACTIONS À RÉALISER :\n`;
      s.actions.forEach((a, idx) => {
        content += `  ${idx + 1}. ${a.instruction}\n`;
        if (a.targetMenu) content += `     Menu Winbox : ${a.targetMenu}\n`;
        if (a.valuesToEnter) {
          a.valuesToEnter.forEach(v => {
            content += `     * ${v.field} = ${v.value} ${v.explain ? `(${v.explain})` : ''}\n`;
          });
        }
        if (a.clickButton) content += `     -> Bouton : ${a.clickButton}\n`;
      });
      if (s.trapWarning) {
        content += `\n[!] PIÈGE À ÉVITER : ${s.trapWarning}\n`;
      }
      content += `Validation : ${s.verificationTip}\n\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Guide_Debutante_MikroTik_et_Mikhmon.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredGuideSteps = useMemo(() => {
    return BEGINNER_GUIDE_STEPS.filter(step => {
      const matchSearch = 
        searchQuery.trim() === '' ||
        step.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        step.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        step.whatItDoes.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (step.trapWarning && step.trapWarning.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchPhase = filterPhase === 'all' || step.phase === filterPhase;
      return matchSearch && matchPhase;
    });
  }, [searchQuery, filterPhase]);

  const phases = useMemo(() => {
    const set = new Set<string>();
    BEGINNER_GUIDE_STEPS.forEach(s => set.add(s.phase));
    return Array.from(set);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      isDark 
        ? 'bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950' 
        : 'bg-slate-50 text-slate-900 selection:bg-cyan-600 selection:text-white'
    }`}>
      
      {/* Top Header */}
      <header className={`border-b sticky top-0 z-30 backdrop-blur ${
        isDark 
          ? 'border-slate-800 bg-slate-950/90' 
          : 'border-slate-200 bg-white/90 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-cyan-500/20">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className={`text-base sm:text-lg lg:text-xl font-extrabold tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Guide Débutant MikroTik &amp; Mikhmon
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  <Sparkles className="h-3 w-3" /> Guide pas-à-pas illustré
                </span>
              </div>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Configuration complète du routeur &amp; génération des tickets Hotspot (RouterOS v7 · Winbox v4 · Mikhmon V3)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                isDark 
                  ? 'bg-slate-900 hover:bg-slate-800 text-amber-300 border-slate-700 hover:border-slate-600' 
                  : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
              }`}
              title={isDark ? "Passer au thème clair" : "Passer au thème sombre"}
            >
              {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-600" />}
              <span>{isDark ? 'Mode Clair' : 'Mode Sombre'}</span>
            </button>

            {/* Direct Download Mikhmon Button */}
            <a
              href="https://raw.githubusercontent.com/laksa19/laksa19.github.io/master/download/mikhmonv3ws.zip"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-sm shadow-cyan-600/30 transition"
              title="Téléchargement direct du fichier ZIP de Mikhmon V3"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Mikhmon V3 (ZIP)</span>
            </a>

            {/* Progression Indicator */}
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Progression :</span>
              <div className={`w-16 rounded-full h-2 overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className="font-bold text-cyan-500 font-mono">{progressPercentage}%</span>
            </div>

            <button
              onClick={downloadFullGuide}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
                isDark 
                  ? 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-800' 
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-sm'
              }`}
              title="Télécharger le guide complet au format texte"
            >
              <FileText className="h-3.5 w-3.5 text-cyan-500" />
              <span className="hidden sm:inline">Exporter</span>
            </button>

            <button
              onClick={() => window.print()}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
                isDark 
                  ? 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-800' 
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-sm'
              }`}
              title="Imprimer le guide"
            >
              <Printer className="h-3.5 w-3.5 text-emerald-500" />
              <span className="hidden sm:inline">Imprimer</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-2 border-t pt-2 pb-2 scrollbar-none ${
          isDark ? 'border-slate-800/80' : 'border-slate-200/80'
        }`}>
          <button
            onClick={() => setActiveTab('beginner')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
              activeTab === 'beginner'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : isDark 
                  ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            Guide Pas-à-Pas Débutant (15 étapes)
          </button>

          <button
            onClick={() => setActiveTab('cabling')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
              activeTab === 'cabling'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : isDark 
                  ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="h-4 w-4" />
            Câblage &amp; Recettes Vouchers
          </button>

          <button
            onClick={() => setActiveTab('troubleshoot')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
              activeTab === 'troubleshoot'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : isDark 
                  ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <AlertTriangle className="h-4 w-4" />
            Dépannage &amp; Erreurs Fréquentes
          </button>

          <button
            onClick={() => setActiveTab('transcription')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
              activeTab === 'transcription'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : isDark 
                  ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="h-4 w-4" />
            Transcription Intégrale Vidéo
          </button>

          <button
            onClick={() => setActiveTab('script')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
              activeTab === 'script'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : isDark 
                  ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Terminal className="h-4 w-4" />
            Script Terminal Direct
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* TAB 1: GUIDE DÉBUTANT PAS-À-PAS */}
        {activeTab === 'beginner' && (
          <div className="space-y-6">
            
            {/* Universal Compatibility Notice Banner */}
            <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
              isDark 
                ? 'bg-gradient-to-r from-blue-950/60 via-slate-900 to-cyan-950/40 border-cyan-800/40' 
                : 'bg-gradient-to-r from-blue-50 via-cyan-50 to-emerald-50 border-cyan-200 shadow-sm'
            }`}>
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Laptop className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-xs uppercase tracking-wider text-cyan-600 dark:text-cyan-400 bg-cyan-500/15 px-2 py-0.5 rounded-full border border-cyan-500/30">
                      Compatibilité Universelle MikroTik
                    </span>
                    <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>RouterOS v7 &amp; Winbox v4</span>
                  </div>
                  <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Ce guide fonctionne pour <strong>presque tous les routeurs MikroTik</strong> (gammes <strong>hAP</strong>, <strong>hEX RB750Gr3</strong>, <strong>RB2011</strong>, <strong>RB3011</strong>, <strong>RB4011</strong>, etc.), même si le modèle configuré en démonstration vidéo est le <strong>hAP ax²</strong>. Les menus, la sécurité et Mikhmon V3 sont identiques.
                  </p>
                </div>
              </div>

              <a
                href="https://raw.githubusercontent.com/laksa19/laksa19.github.io/master/download/mikhmonv3ws.zip"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md shadow-cyan-600/20 transition self-stretch md:self-auto text-center justify-center"
              >
                <Download className="h-4 w-4" />
                Télécharger Mikhmon V3
              </a>
            </div>

            {/* Validation Explanation Banner */}
            <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
              isDark 
                ? 'bg-slate-900/80 border-slate-800' 
                : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
                  <CheckSquare className="h-5 w-5" />
                </div>
                <div>
                  <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Boutons de Validation Interactifs
                  </h3>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Pour chaque étape terminée, cliquez sur le bouton <span className="font-semibold text-cyan-500">« Valider cette étape »</span>. Vos progrès sont automatiquement mémorisés dans votre navigateur.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Validées : <strong className={isDark ? 'text-white' : 'text-slate-900'}>{Object.values(completedSteps).filter(Boolean).length} / {BEGINNER_GUIDE_STEPS.length}</strong>
                </span>
                {Object.values(completedSteps).filter(Boolean).length > 0 && (
                  <button
                    onClick={() => {
                      if (window.confirm("Voulez-vous réinitialiser toutes les étapes cochées ?")) {
                        setCompletedSteps({});
                        localStorage.removeItem('mikrotik_guide_progress');
                      }
                    }}
                    className="text-xs text-rose-500 hover:underline ml-2"
                  >
                    Tout décocher
                  </button>
                )}
              </div>
            </div>

            {/* Filter / Search for Steps */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              <div className="relative flex-1">
                <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher une étape (ex: mot de passe, bridge, wifi.net, mikhmon, 24HEURES, TTL...)"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm border focus:outline-none focus:ring-2 focus:ring-cyan-500 transition ${
                    isDark 
                      ? 'bg-slate-900 border-slate-800 text-slate-100 placeholder-slate-500' 
                      : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-sm'
                  }`}
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                <button
                  onClick={() => setFilterPhase('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    filterPhase === 'all'
                      ? 'bg-cyan-600 text-white shadow-sm'
                      : isDark 
                        ? 'bg-slate-900 text-slate-400 hover:bg-slate-800' 
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  Toutes ({BEGINNER_GUIDE_STEPS.length})
                </button>
                {phases.map(phase => (
                  <button
                    key={phase}
                    onClick={() => setFilterPhase(phase)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                      filterPhase === phase
                        ? 'bg-cyan-600 text-white shadow-sm'
                        : isDark 
                          ? 'bg-slate-900 text-slate-400 hover:bg-slate-800' 
                          : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {phase}
                  </button>
                ))}
              </div>
            </div>

            {/* Steps List */}
            <div className="space-y-5">
              {filteredGuideSteps.map((step) => {
                const isCompleted = !!completedSteps[step.id];
                const isScreenshotOpen = !!expandedScreenshots[step.id];

                return (
                  <div 
                    key={step.id}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isCompleted 
                        ? isDark 
                          ? 'bg-slate-950/60 border-emerald-900/60 shadow-lg' 
                          : 'bg-emerald-50/40 border-emerald-300 shadow-sm'
                        : isDark 
                          ? 'bg-slate-900/70 border-slate-800/90 hover:border-slate-700 shadow-lg' 
                          : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    {/* Header bar of step */}
                    <div className={`p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b ${
                      isCompleted
                        ? isDark 
                          ? 'bg-emerald-950/20 border-emerald-900/40' 
                          : 'bg-emerald-100/50 border-emerald-200'
                        : isDark 
                          ? 'bg-slate-950/60 border-slate-800/80' 
                          : 'bg-slate-50/90 border-slate-200'
                    }`}>
                      <div className="flex items-start sm:items-center gap-3.5">
                        {/* Number badge / checkbox indicator */}
                        <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 font-bold font-mono text-sm transition ${
                          isCompleted
                            ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                            : 'bg-cyan-600 text-white'
                        }`}>
                          {isCompleted ? <Check className="h-5 w-5 stroke-[3]" /> : step.number}
                        </div>

                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-extrabold text-cyan-600 dark:text-cyan-400 tracking-wide uppercase">
                              {step.phase}
                            </span>
                            <span className={isDark ? 'text-slate-600' : 'text-slate-300'}>•</span>
                            <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                              Vidéo: {step.videoTimestamp}
                            </span>
                            <span className={isDark ? 'text-slate-600' : 'text-slate-300'}>•</span>
                            <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wide ${
                              step.difficulty === 'Crucial' 
                                ? 'bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30' :
                              step.difficulty === 'Attention' 
                                ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30' :
                                'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                            }`}>
                              {step.difficulty}
                            </span>
                          </div>

                          <h3 className={`text-base sm:text-lg font-bold mt-1 ${
                            isCompleted 
                              ? isDark ? 'text-slate-300' : 'text-slate-800' 
                              : isDark ? 'text-white' : 'text-slate-900'
                          }`}>
                            Étape {step.number} : {step.title}
                          </h3>
                          <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            {step.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Header validation action button (MADE VERY OBVIOUS) */}
                      <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                        <button
                          onClick={() => toggleStepCompleted(step.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold border-2 transition-all duration-200 cursor-pointer shadow-sm ${
                            isCompleted
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500 shadow-emerald-500/30 ring-2 ring-emerald-500/20'
                              : isDark
                                ? 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border-cyan-500/50 hover:border-cyan-400 hover:shadow-cyan-500/20'
                                : 'bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border-cyan-500 hover:border-cyan-600'
                          }`}
                          title="Cliquez pour cocher ou décocher cette étape"
                        >
                          {isCompleted ? (
                            <>
                              <CheckSquare className="h-4 w-4 stroke-[2.5]" />
                              <span>✓ Étape Validée</span>
                            </>
                          ) : (
                            <>
                              <Square className="h-4 w-4 stroke-[2]" />
                              <span>Cocher pour valider</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Step Body */}
                    <div className="p-4 sm:p-5 space-y-4">
                      
                      {/* Explanations 2-col */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className={`p-3.5 rounded-xl border ${
                          isDark 
                            ? 'bg-slate-950/70 border-slate-800/80 text-slate-300' 
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}>
                          <span className="font-bold text-cyan-600 dark:text-cyan-400 block mb-1 flex items-center gap-1.5">
                            <Info className="h-4 w-4" /> Ce que ça fait en français simple :
                          </span>
                          <p className="leading-relaxed">{step.whatItDoes}</p>
                        </div>

                        <div className={`p-3.5 rounded-xl border ${
                          isDark 
                            ? 'bg-slate-950/70 border-slate-800/80 text-slate-300' 
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1 flex items-center gap-1.5">
                            <CheckCircle2 className="h-4 w-4" /> Pourquoi c'est obligatoire :
                          </span>
                          <p className="leading-relaxed">{step.whyWeDoIt}</p>
                        </div>
                      </div>

                      {/* Action List */}
                      <div className={`rounded-xl p-4 border space-y-3 ${
                        isDark 
                          ? 'bg-slate-950/90 border-slate-800' 
                          : 'bg-white border-slate-200 shadow-sm'
                      }`}>
                        <h4 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                          <CheckCircle2 className="h-4 w-4 text-cyan-500" />
                          Actions précises à exécuter :
                        </h4>

                        <div className="space-y-3">
                          {step.actions.map((act, aIdx) => (
                            <div key={aIdx} className={`text-xs space-y-2 pb-3 border-b last:border-0 last:pb-0 ${
                              isDark ? 'border-slate-800/60' : 'border-slate-100'
                            }`}>
                              <div className="flex items-start gap-2.5">
                                <span className="h-5 w-5 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                                  {aIdx + 1}
                                </span>
                                <span className={`font-semibold leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                                  {act.instruction}
                                </span>
                              </div>

                              {act.targetMenu && (
                                <div className={`ml-7 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-[11px] font-mono font-bold ${
                                  isDark 
                                    ? 'bg-slate-900 border-cyan-900/50 text-cyan-300' 
                                    : 'bg-cyan-50 border-cyan-200 text-cyan-800'
                                }`}>
                                  <span>Menu :</span>
                                  <strong>{act.targetMenu}</strong>
                                </div>
                              )}

                              {act.valuesToEnter && (
                                <div className={`ml-7 space-y-1.5 p-3 rounded-xl border font-mono text-[11px] ${
                                  isDark 
                                    ? 'bg-slate-900/90 border-slate-800' 
                                    : 'bg-slate-50 border-slate-200'
                                }`}>
                                  {act.valuesToEnter.map((v, vIdx) => (
                                    <div key={vIdx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-0.5">
                                      <span className={isDark ? 'text-slate-400 font-sans' : 'text-slate-600 font-sans'}>
                                        {v.field} :
                                      </span>
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <span className={`font-bold px-2 py-0.5 rounded border ${
                                          isDark 
                                            ? 'text-emerald-300 bg-emerald-950/60 border-emerald-900/60' 
                                            : 'text-emerald-800 bg-emerald-100 border-emerald-300'
                                        }`}>
                                          {v.value}
                                        </span>
                                        {v.explain && (
                                          <span className={`text-[10px] font-sans ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                            ({v.explain})
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {act.clickButton && (
                                <div className={`ml-7 text-[11px] font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                  👉 Cliquez sur : <strong className={`px-2 py-0.5 rounded border ${
                                    isDark 
                                      ? 'bg-slate-800 text-white border-slate-700' 
                                      : 'bg-slate-100 text-slate-900 border-slate-300'
                                  }`}>{act.clickButton}</strong>
                                </div>
                              )}

                              {act.explain && (
                                <div className={`ml-7 text-[11px] italic ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                  ℹ️ {act.explain}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Trap warning */}
                      {step.trapWarning && (
                        <div className={`border rounded-xl p-3.5 text-xs flex items-start gap-3 ${
                          isDark 
                            ? 'bg-red-950/20 border-red-900/50 text-red-200' 
                            : 'bg-red-50 border-red-200 text-red-800'
                        }`}>
                          <AlertTriangle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                          <div>
                            <strong className="font-extrabold uppercase tracking-wide text-red-600 dark:text-red-300">
                              LE PIÈGE DU DÉBUTANT :{' '}
                            </strong>
                            <span>{step.trapWarning}</span>
                          </div>
                        </div>
                      )}

                      {/* How to verify */}
                      <div className={`text-xs rounded-xl p-3 flex items-start gap-2.5 border ${
                        isDark 
                          ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-300' 
                          : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      }`}>
                        <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold">Comment vérifier que vous avez réussi : </strong>
                          <span>{step.verificationTip}</span>
                        </div>
                      </div>

                      {/* ILLUSTRATED SCREENSHOT / VISUAL MOCKUP PREVIEW */}
                      {step.visualPreview && (
                        <div className="pt-2">
                          <button
                            onClick={() => toggleScreenshot(step.id)}
                            className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition ${
                              isScreenshotOpen
                                ? isDark 
                                  ? 'bg-cyan-950/30 border-cyan-800 text-cyan-300' 
                                  : 'bg-cyan-50 border-cyan-300 text-cyan-800'
                                : isDark 
                                  ? 'bg-slate-950 hover:bg-slate-900 border-slate-800 text-slate-300' 
                                  : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <ImageIcon className="h-4 w-4 text-cyan-500" />
                              <span>{isScreenshotOpen ? "Masquer l'écran Winbox / Mikhmon illustré" : "📸 Voir l'écran Winbox / Mikhmon illustré pour cette étape"}</span>
                            </span>
                            {isScreenshotOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </button>

                          {isScreenshotOpen && (
                            <div className={`mt-3 p-4 rounded-2xl border shadow-md font-sans text-xs space-y-3 ${
                              isDark 
                                ? 'bg-slate-950 border-cyan-900/60 text-slate-100' 
                                : 'bg-slate-900 border-slate-800 text-slate-100'
                            }`}>
                              {/* Simulated Window Titlebar */}
                              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1.5">
                                    <span className="h-3 w-3 rounded-full bg-red-500 inline-block" />
                                    <span className="h-3 w-3 rounded-full bg-yellow-500 inline-block" />
                                    <span className="h-3 w-3 rounded-full bg-green-500 inline-block" />
                                  </div>
                                  <span className="font-mono text-xs font-bold text-slate-300 ml-2">
                                    {step.visualPreview.windowTitle}
                                  </span>
                                </div>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 uppercase">
                                  {step.visualPreview.badge}
                                </span>
                              </div>

                              <p className="text-xs text-slate-300 font-mono">
                                📌 {step.visualPreview.description}
                              </p>

                              {/* Key Fields highlighted in the window */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
                                {step.visualPreview.fields.map((f, fIdx) => (
                                  <div 
                                    key={fIdx} 
                                    className={`p-2 rounded-lg border flex items-center justify-between ${
                                      f.isHighlight 
                                        ? 'bg-cyan-950/50 border-cyan-700 text-cyan-200 shadow-sm' 
                                        : 'bg-slate-900 border-slate-800 text-slate-300'
                                    }`}
                                  >
                                    <span className="text-slate-400">{f.label} :</span>
                                    <strong className={f.isHighlight ? 'text-emerald-400' : 'text-slate-100'}>
                                      {f.value}
                                    </strong>
                                  </div>
                                ))}
                              </div>

                              {/* Buttons in the window */}
                              <div className="flex items-center gap-2 pt-2 border-t border-slate-800 flex-wrap">
                                <span className="text-[11px] text-slate-400">Boutons d'action dans cette fenêtre :</span>
                                {step.visualPreview.buttons.map((b, bIdx) => (
                                  <span 
                                    key={bIdx}
                                    className="px-2.5 py-1 rounded bg-slate-800 text-white font-mono text-xs font-bold border border-slate-700 shadow-sm"
                                  >
                                    [{b}]
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* BOTTOM PROMINENT VALIDATION BAR */}
                      <div className={`mt-4 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
                        isDark ? 'border-slate-800/80' : 'border-slate-200'
                      }`}>
                        <div className="text-xs text-center sm:text-left">
                          {isCompleted ? (
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5 justify-center sm:justify-start">
                              <CheckCircle className="h-4 w-4" />
                              Cette étape a été validée avec succès !
                            </span>
                          ) : (
                            <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                              Avez-vous effectué toutes les actions ci-dessus ?
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => toggleStepCompleted(step.id)}
                          className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-md cursor-pointer ${
                            isCompleted
                              ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                          }`}
                        >
                          {isCompleted ? (
                            <>
                              <Square className="h-4 w-4" />
                              <span>Décocher cette étape</span>
                            </>
                          ) : (
                            <>
                              <CheckSquare className="h-4 w-4" />
                              <span>J'ai terminé cette étape (Valider ✓)</span>
                            </>
                          )}
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: CÂBLAGE PHYSIQUE & RECETTES FORFAITS */}
        {activeTab === 'cabling' && (
          <div className="space-y-6">
            
            {/* Cabling Schema */}
            <div className={`p-5 rounded-2xl border ${
              isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center gap-2.5 mb-2">
                <Layers className="h-5 w-5 text-cyan-500" />
                <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Schéma de Branchement des Prises Physiques du MikroTik
                </h2>
              </div>
              <p className={`text-xs sm:text-sm mb-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Le MikroTik possède 5 prises RJ45 Gigabit. Voici le rôle exact de chaque prise pour garantir un fonctionnement sans conflit :
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {CABLING_GUIDE.map((c, idx) => (
                  <div 
                    key={idx}
                    className={`p-4 rounded-xl border flex flex-col justify-between ${
                      idx === 0 
                        ? isDark 
                          ? 'bg-blue-950/40 border-blue-600/50 text-blue-200' 
                          : 'bg-blue-50 border-blue-300 text-blue-900 shadow-sm'
                        : idx === 2 
                        ? isDark 
                          ? 'bg-cyan-950/40 border-cyan-600/50 text-cyan-200' 
                          : 'bg-cyan-50 border-cyan-300 text-cyan-900 shadow-sm'
                        : isDark 
                          ? 'bg-slate-950 border-slate-800 text-slate-300' 
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded border ${
                          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                        }`}>
                          {c.port.split(' ')[0]} {c.port.split(' ')[1]}
                        </span>
                        {idx === 0 && <span className="text-[10px] font-extrabold text-blue-500 uppercase">WAN Internet</span>}
                        {idx === 2 && <span className="text-[10px] font-extrabold text-cyan-500 uppercase">PC Winbox</span>}
                      </div>

                      <h4 className={`text-sm font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{c.label}</h4>
                      <p className={`text-xs leading-relaxed mb-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{c.plugWhat}</p>
                    </div>

                    <div className={`pt-2 border-t text-[11px] font-bold ${
                      isDark ? 'border-slate-800 text-amber-300' : 'border-slate-200 text-amber-700'
                    }`}>
                      ⚠️ {c.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Simulator */}
            <div className={`p-5 rounded-2xl border space-y-4 ${
              isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center gap-2 text-amber-500 font-bold text-base">
                <DollarSign className="h-5 w-5" />
                Simulateur Financier des 300 Vouchers Générés
              </div>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Calcul de la valeur marchande du stock de tickets imprimé dans la vidéo :
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className={`p-4 rounded-xl border ${
                  isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className={isDark ? 'text-slate-400 font-medium' : 'text-slate-600 font-medium'}>
                    100 Tickets 24 Heures
                  </div>
                  <div className={`text-lg font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    100 x 200 CFA
                  </div>
                  <div className="text-emerald-500 font-mono text-base font-bold mt-1">20 000 CFA</div>
                </div>

                <div className={`p-4 rounded-xl border ${
                  isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className={isDark ? 'text-slate-400 font-medium' : 'text-slate-600 font-medium'}>
                    100 Tickets Semaine (7 jours)
                  </div>
                  <div className={`text-lg font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    100 x 700 CFA
                  </div>
                  <div className="text-emerald-500 font-mono text-base font-bold mt-1">70 000 CFA</div>
                </div>

                <div className={`p-4 rounded-xl border ${
                  isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className={isDark ? 'text-slate-400 font-medium' : 'text-slate-600 font-medium'}>
                    100 Tickets Mois (30 jours)
                  </div>
                  <div className={`text-lg font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    100 x 2 000 CFA
                  </div>
                  <div className="text-emerald-500 font-mono text-base font-bold mt-1">200 000 CFA</div>
                </div>
              </div>

              <div className={`p-4 rounded-xl border flex items-center justify-between text-xs sm:text-sm ${
                isDark 
                  ? 'bg-emerald-950/20 border-emerald-800/40' 
                  : 'bg-emerald-50 border-emerald-200'
              }`}>
                <span className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
                  Valeur totale des 3 planches PDF imprimées :
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono font-extrabold text-base sm:text-lg">
                  290 000 CFA
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DÉPANNAGE & ERREURS */}
        {activeTab === 'troubleshoot' && (
          <div className="space-y-4">
            <div className={`p-5 rounded-2xl border mb-4 ${
              isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <h2 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Guide de Dépannage &amp; Solutions Rapides
              </h2>
              <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Voici les solutions immédiates aux blocages les plus fréquents rencontrés lors de la configuration.
              </p>
            </div>

            <div className="space-y-3">
              {TROUBLESHOOTING_TIPS.map((tip, idx) => (
                <div key={idx} className={`border rounded-xl p-4 sm:p-5 space-y-2.5 ${
                  isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <h4 className="text-sm sm:text-base font-bold text-red-600 dark:text-red-400 flex items-start gap-2">
                    <span className="shrink-0">❌ Problème :</span>
                    <span>{tip.problem}</span>
                  </h4>
                  <div className={`text-xs sm:text-sm p-3.5 rounded-xl border flex items-start gap-2.5 ${
                    isDark 
                      ? 'bg-slate-950 border-slate-800 text-slate-300' 
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">✅ Solution :</span>
                    <p className="leading-relaxed">{tip.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TRANSCRIPTION MOT-À-MOT */}
        {activeTab === 'transcription' && (
          <div className="space-y-4">
            <div className={`p-4 rounded-xl border flex items-center justify-between ${
              isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div>
                <h2 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Transcription Intégrale Originale de la Vidéo
                </h2>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Chaque phrase prononcée par le formateur avec le minutage exact (22:58).
                </p>
              </div>
              <button
                onClick={downloadFullGuide}
                className="text-xs px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition shadow-sm"
              >
                Exporter tout
              </button>
            </div>

            <div className="space-y-3">
              {TRANSCRIPT_DATA.map((seg) => (
                <div key={seg.id} className={`p-4 rounded-xl border space-y-2 ${
                  isDark ? 'bg-slate-900/70 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/15 px-2 py-0.5 rounded border border-cyan-500/30">
                        {seg.timeStart} - {seg.timeEnd}
                      </span>
                      <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{seg.topic}</h4>
                    </div>
                    <button
                      onClick={() => handleCopy(`[${seg.timeStart}] ${seg.text}`, seg.id)}
                      className={`text-xs flex items-center gap-1 transition ${
                        isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      {copiedId === seg.id ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  <p className={`text-xs sm:text-sm italic p-3 rounded-lg border ${
                    isDark 
                      ? 'bg-slate-950/70 border-slate-800/60 text-slate-300' 
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}>
                    « {seg.text} »
                  </p>
                  {seg.notes && (
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      <strong className="text-cyan-600 dark:text-cyan-400">Action Winbox : </strong>{seg.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SCRIPT TERMINAL */}
        {activeTab === 'script' && (
          <div className="space-y-4">
            <div className={`p-4 rounded-xl border flex items-center justify-between ${
              isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div>
                <h2 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Pour les techniciens avancés : Script Terminal Automatisé
                </h2>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Collez ce bloc dans le Terminal Winbox pour configurer le routeur en 3 secondes.
                </p>
              </div>
              <button
                onClick={() => handleCopy(MIKROTIK_SCRIPT_SNIPPET, 'terminal-script')}
                className="text-xs px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition shadow-sm"
              >
                {copiedId === 'terminal-script' ? '✓ Copié !' : 'Copier tout le script'}
              </button>
            </div>

            <div className={`p-4 rounded-xl border font-mono text-xs overflow-x-auto ${
              isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-900 border-slate-800 text-slate-100'
            }`}>
              <pre>{MIKROTIK_SCRIPT_SNIPPET}</pre>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className={`border-t py-6 mt-10 transition ${
        isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className={isDark ? 'text-slate-400' : 'text-slate-600'}>
            <span>Guide Débutant MikroTik &amp; Mikhmon · Compatible RouterOS v7 &amp; Winbox v4</span>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className={`inline-flex items-center gap-1.5 font-bold ${
              isDark ? 'text-slate-200' : 'text-slate-800'
            }`}>
              <PhoneCall className="h-4 w-4 text-emerald-500" />
              <span>Formateur de la vidéo :</span>
            </span>
            <a 
              href="tel:+2290153489846" 
              className="text-emerald-600 dark:text-emerald-400 font-mono font-bold hover:underline"
            >
              +229 0153489846
            </a>
            <span className={isDark ? 'text-slate-600' : 'text-slate-300'}>/</span>
            <a 
              href="tel:+2290166006880" 
              className="text-emerald-600 dark:text-emerald-400 font-mono font-bold hover:underline"
            >
              +229 0166006880
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
