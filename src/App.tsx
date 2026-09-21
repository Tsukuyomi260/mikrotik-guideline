/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
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
  ListOrdered, 
  Terminal, 
  Clock, 
  Wifi, 
  ShieldCheck, 
  Ticket, 
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
  Circle,
  ArrowRight,
  RefreshCw,
  Cpu,
  Layers,
  DollarSign
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'beginner' | 'cabling' | 'transcription' | 'troubleshoot' | 'script'>('beginner');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Progress tracking for beginner steps
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('mikrotik_guide_progress');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
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
    let content = `# GUIDE PRATIQUE : CONFIGURATION DU MIKROTIK hAP ax² & MIKHMON v7\n`;
    content += `Pour débutant absolu - Pas-à-pas chronologique issu de la vidéo\n`;
    content += `Matériel : ${VIDEO_METADATA.device} | RouterOS : ${VIDEO_METADATA.routerOSVersion}\n`;
    content += `Contact formateur : ${VIDEO_METADATA.contacts}\n\n`;
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
    a.download = `Guide_MikroTik_hAP_ax2_Pour_Debutants.txt`;
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
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 shadow-lg shadow-cyan-950/50">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Guide Débutant MikroTik hAP ax² & Mikhmon
                </h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <Sparkles className="h-3 w-3" /> Zéro Connaissance Requise
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Guide pas-à-pas illustré tiré de la vidéo de formation (RouterOS v7.20.6 / Winbox v4)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            {/* Progression */}
            <div className="hidden sm:flex items-center gap-2.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
              <span className="text-slate-400">Progression :</span>
              <div className="w-20 bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className="font-bold text-cyan-400 font-mono">{progressPercentage}%</span>
            </div>

            <button
              onClick={downloadFullGuide}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition"
              title="Télécharger le guide complet au format texte"
            >
              <Download className="h-3.5 w-3.5" />
              Télécharger le Guide
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition"
              title="Imprimer le guide"
            >
              <Printer className="h-3.5 w-3.5" />
              Imprimer
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-2 border-t border-slate-800/60 pt-2 pb-2 scrollbar-none">
          <button
            onClick={() => setActiveTab('beginner')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
              activeTab === 'beginner'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            Guide Pas-à-Pas Débutant (15 étapes)
          </button>

          <button
            onClick={() => setActiveTab('cabling')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
              activeTab === 'cabling'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Layers className="h-4 w-4" />
            Schéma de Câblage des Prises
          </button>

          <button
            onClick={() => setActiveTab('troubleshoot')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
              activeTab === 'troubleshoot'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <AlertTriangle className="h-4 w-4" />
            Dépannage & Erreurs Courantes
          </button>

          <button
            onClick={() => setActiveTab('transcription')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
              activeTab === 'transcription'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <FileText className="h-4 w-4" />
            Transcription Vidéo Mot-à-Mot
          </button>

          <button
            onClick={() => setActiveTab('script')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
              activeTab === 'script'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Terminal className="h-4 w-4" />
            Script Rapide Terminal
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* TAB 1: GUIDE DÉBUTANT PAS-À-PAS */}
        {activeTab === 'beginner' && (
          <div className="space-y-6">
            
            {/* Banner Débutant */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/40 p-5 rounded-2xl border border-cyan-900/40 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    MÉTHODE INFAILLIBLE
                  </span>
                  <span className="text-xs text-slate-400">Temps total : ~25 minutes</span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-white">
                  Comment configurer votre MikroTik sans aucune expérience préalable
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  Suivez les étapes ci-dessous dans l'ordre strict. Chaque étape est expliquée avec des mots de tous les jours, avec les clics précis et les pièges qui font échouer les débutants. Cochez les étapes au fur et à mesure !
                </p>
              </div>

              {/* Progress Card Mobile */}
              <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between lg:flex-col lg:items-end gap-2 shrink-0">
                <div className="text-left lg:text-right">
                  <div className="text-xs text-slate-400">Étapes validées</div>
                  <div className="text-base font-bold text-white">
                    {Object.values(completedSteps).filter(Boolean).length} / {BEGINNER_GUIDE_STEPS.length}
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm("Voulez-vous réinitialiser votre progression ?")) {
                      setCompletedSteps({});
                      localStorage.removeItem('mikrotik_guide_progress');
                    }
                  }}
                  className="text-[11px] text-slate-400 hover:text-slate-200 underline"
                >
                  Réinitialiser
                </button>
              </div>
            </div>

            {/* Filter / Search for Steps */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher une étape (ex: mot de passe, bridge, wifi.tg, mikhmon, 24HEURES, TTL...)"
                  className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                <button
                  onClick={() => setFilterPhase('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                    filterPhase === 'all'
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  Toutes ({BEGINNER_GUIDE_STEPS.length})
                </button>
                {phases.map(phase => (
                  <button
                    key={phase}
                    onClick={() => setFilterPhase(phase)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                      filterPhase === phase
                        ? 'bg-cyan-600 text-white'
                        : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {phase}
                  </button>
                ))}
              </div>
            </div>

            {/* Steps List */}
            <div className="space-y-4">
              {filteredGuideSteps.map((step) => {
                const isCompleted = !!completedSteps[step.id];
                return (
                  <div 
                    key={step.id}
                    className={`rounded-2xl border transition overflow-hidden ${
                      isCompleted 
                        ? 'bg-slate-950/40 border-emerald-900/40 opacity-90' 
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700/80 shadow-lg'
                    }`}
                  >
                    {/* Header bar of step */}
                    <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/60 bg-slate-950/50">
                      <div className="flex items-start sm:items-center gap-3">
                        <button
                          onClick={() => toggleStepCompleted(step.id)}
                          className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 transition ${
                            isCompleted 
                              ? 'bg-emerald-500 text-slate-950' 
                              : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-700'
                          }`}
                          title={isCompleted ? "Marquer comme non fait" : "Marquer comme terminé"}
                        >
                          {isCompleted ? <Check className="h-4 w-4 stroke-[3]" /> : <span className="text-xs font-bold font-mono">{step.number}</span>}
                        </button>

                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold text-cyan-400 tracking-wide uppercase">
                              {step.phase}
                            </span>
                            <span className="text-slate-600">•</span>
                            <span className="text-xs text-slate-400 font-mono">Vidéo: {step.videoTimestamp}</span>
                            <span className="text-slate-600">•</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                              step.difficulty === 'Crucial' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                              step.difficulty === 'Attention' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                              'bg-emerald-500/20 text-emerald-300'
                            }`}>
                              {step.difficulty}
                            </span>
                          </div>
                          <h3 className={`text-base sm:text-lg font-bold mt-0.5 ${isCompleted ? 'text-slate-300 line-through' : 'text-white'}`}>
                            Étape {step.number} : {step.title}
                          </h3>
                          <p className="text-xs text-slate-400">{step.subtitle}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => toggleStepCompleted(step.id)}
                          className={`text-xs px-3 py-1 rounded-lg border font-medium transition ${
                            isCompleted
                              ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60'
                              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
                          }`}
                        >
                          {isCompleted ? "✓ Étape terminée" : "Valider cette étape"}
                        </button>
                      </div>
                    </div>

                    {/* Step Body */}
                    <div className="p-4 sm:p-5 space-y-4">
                      {/* Explanations 2-col */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                          <span className="font-semibold text-cyan-300 block mb-1">💡 Ce que ça fait en français simple :</span>
                          <p className="text-slate-300 leading-relaxed">{step.whatItDoes}</p>
                        </div>
                        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                          <span className="font-semibold text-emerald-300 block mb-1">🎯 Pourquoi c'est obligatoire :</span>
                          <p className="text-slate-300 leading-relaxed">{step.whyWeDoIt}</p>
                        </div>
                      </div>

                      {/* Action List */}
                      <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 space-y-3">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                          Actions précises à exécuter :
                        </h4>

                        <div className="space-y-2.5">
                          {step.actions.map((act, aIdx) => (
                            <div key={aIdx} className="text-xs space-y-1.5 pb-2.5 border-b border-slate-800/60 last:border-0 last:pb-0">
                              <div className="flex items-start gap-2">
                                <span className="h-4 w-4 rounded-full bg-slate-800 text-cyan-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                                  {aIdx + 1}
                                </span>
                                <span className="text-slate-200 font-medium">{act.instruction}</span>
                              </div>

                              {act.targetMenu && (
                                <div className="ml-6 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950 border border-cyan-900/50 text-[11px] font-mono text-cyan-300">
                                  <span>Menu :</span>
                                  <strong>{act.targetMenu}</strong>
                                </div>
                              )}

                              {act.valuesToEnter && (
                                <div className="ml-6 space-y-1 mt-1 bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80 font-mono text-[11px]">
                                  {act.valuesToEnter.map((v, vIdx) => (
                                    <div key={vIdx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-0.5">
                                      <span className="text-slate-400">{v.field} :</span>
                                      <div className="flex items-center gap-2">
                                        <span className="text-emerald-300 font-bold bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-900/40">
                                          {v.value}
                                        </span>
                                        {v.explain && <span className="text-[10px] text-slate-500 font-sans">({v.explain})</span>}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {act.clickButton && (
                                <div className="ml-6 text-[11px] text-slate-300">
                                  👉 Cliquez sur : <strong className="text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">{act.clickButton}</strong>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Trap warning */}
                      {step.trapWarning && (
                        <div className="bg-red-950/20 border border-red-900/50 rounded-xl p-3 text-xs text-red-200 flex items-start gap-2.5">
                          <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                          <div>
                            <strong className="font-bold text-red-300 uppercase tracking-wide">LE PIÈGE DU DÉBUTANT : </strong>
                            {step.trapWarning}
                          </div>
                        </div>
                      )}

                      {/* How to verify */}
                      <div className="text-xs text-emerald-300/90 bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-2.5 flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                        <div>
                          <strong className="font-semibold text-emerald-200">Comment vérifier que vous avez réussi : </strong>
                          {step.verificationTip}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: SCHÉMA DE CÂBLAGE PHYSIQUE */}
        {activeTab === 'cabling' && (
          <div className="space-y-6">
            <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
              <h2 className="text-lg font-bold text-white mb-1">
                Schéma de Branchement des Prises du MikroTik hAP ax²
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mb-4">
                Le MikroTik possède 5 prises Gigabit RJ45. Voici exactement quel câble insérer dans chaque prise pour éviter toute coupure ou inversion.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {CABLING_GUIDE.map((c, idx) => (
                  <div 
                    key={idx}
                    className={`p-4 rounded-xl border flex flex-col justify-between ${
                      idx === 0 
                        ? 'bg-blue-950/30 border-blue-500/40 text-blue-200 shadow-md shadow-blue-950/50' 
                        : idx === 2 
                        ? 'bg-cyan-950/30 border-cyan-500/40 text-cyan-200' 
                        : 'bg-slate-900/80 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800">
                          {c.port.split(' ')[0]} {c.port.split(' ')[1]}
                        </span>
                        {idx === 0 && <span className="text-[10px] font-bold text-blue-400">WAN</span>}
                        {idx === 2 && <span className="text-[10px] font-bold text-cyan-400">GESTION PC</span>}
                      </div>

                      <h4 className="text-sm font-bold text-white mb-1">{c.label}</h4>
                      <p className="text-xs text-slate-300 leading-snug mb-3">{c.plugWhat}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 text-[11px] font-medium text-amber-300">
                      ⚠️ {c.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulation Financière de Tickets Hotspot */}
            <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <DollarSign className="h-5 w-5" />
                Simulateur de Recettes des 300 Vouchers Générés
              </div>
              <p className="text-xs text-slate-400">
                Calcul automatique de la valeur marchande du stock de tickets généré dans la vidéo :
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <div className="text-slate-400 font-medium">100 Tickets 24 Heures</div>
                  <div className="text-lg font-bold text-white mt-1">100 x 200 CFA</div>
                  <div className="text-emerald-400 font-mono text-base font-bold mt-1">20 000 CFA</div>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <div className="text-slate-400 font-medium">100 Tickets Semaine (7 jours)</div>
                  <div className="text-lg font-bold text-white mt-1">100 x 700 CFA</div>
                  <div className="text-emerald-400 font-mono text-base font-bold mt-1">70 000 CFA</div>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <div className="text-slate-400 font-medium">100 Tickets Mois (30 jours)</div>
                  <div className="text-lg font-bold text-white mt-1">100 x 2 000 CFA</div>
                  <div className="text-emerald-400 font-mono text-base font-bold mt-1">200 000 CFA</div>
                </div>
              </div>

              <div className="p-3.5 bg-emerald-950/20 border border-emerald-800/40 rounded-xl flex items-center justify-between text-xs sm:text-sm">
                <span className="text-slate-300 font-medium">Valeur totale des 3 planches PDF générées :</span>
                <span className="text-emerald-300 font-mono font-extrabold text-base sm:text-lg">290 000 CFA</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DÉPANNAGE & ERREURS */}
        {activeTab === 'troubleshoot' && (
          <div className="space-y-4">
            <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 mb-4">
              <h2 className="text-lg font-bold text-white mb-1">
                Guide de Dépannage & Sauvetage Rapide
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Vous êtes bloqué à une étape ? Voici les solutions immédiates aux 5 problèmes les plus fréquents rencontrés par les débutants.
              </p>
            </div>

            <div className="space-y-3">
              {TROUBLESHOOTING_TIPS.map((tip, idx) => (
                <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-2">
                  <h4 className="text-sm sm:text-base font-bold text-red-300 flex items-start gap-2">
                    <span className="text-red-400">❌ Problème :</span>
                    {tip.problem}
                  </h4>
                  <div className="text-xs sm:text-sm text-slate-300 bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold shrink-0">✅ Solution :</span>
                    <p className="leading-relaxed">{tip.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TRANSCRIPTION VIDÉO MOT-À-MOT */}
        {activeTab === 'transcription' && (
          <div className="space-y-4">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white">Transcription Intégrale Originale</h2>
                <p className="text-xs text-slate-400">
                  Chaque phrase exacte prononcée par le formateur avec le minutage de la vidéo (22:58).
                </p>
              </div>
              <button
                onClick={downloadFullGuide}
                className="text-xs px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium"
              >
                Exporter tout
              </button>
            </div>

            <div className="space-y-3">
              {TRANSCRIPT_DATA.map((seg) => (
                <div key={seg.id} className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                        {seg.timeStart} - {seg.timeEnd}
                      </span>
                      <h4 className="text-sm font-bold text-white">{seg.topic}</h4>
                    </div>
                    <button
                      onClick={() => handleCopy(`[${seg.timeStart}] ${seg.text}`, seg.id)}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      {copiedId === seg.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 italic bg-slate-900/50 p-3 rounded-lg border border-slate-800/40">
                    « {seg.text} »
                  </p>
                  {seg.notes && (
                    <p className="text-xs text-slate-400">
                      <strong className="text-cyan-300">Action : </strong>{seg.notes}
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
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white">Pour les utilisateurs avancés : Script Terminal</h2>
                <p className="text-xs text-slate-400">
                  Collez ce bloc dans le Terminal de Winbox pour exécuter toutes les étapes en 2 secondes.
                </p>
              </div>
              <button
                onClick={() => handleCopy(MIKROTIK_SCRIPT_SNIPPET, 'terminal-script')}
                className="text-xs px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium"
              >
                {copiedId === 'terminal-script' ? 'Copié !' : 'Copier tout le script'}
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto">
              <pre>{MIKROTIK_SCRIPT_SNIPPET}</pre>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Guide pratique débutant · MikroTik hAP ax² (RouterOS v7) & Mikhmon v7
          </span>
          <span className="text-slate-400">
            Formateur de la vidéo : <strong className="text-slate-300">{VIDEO_METADATA.contacts}</strong>
          </span>
        </div>
      </footer>

    </div>
  );
}

