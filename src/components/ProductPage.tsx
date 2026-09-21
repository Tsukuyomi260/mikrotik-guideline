/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PRODUCT_PAGE_DATA, CustomerReview, ProductModule } from '../data/productPageData';
import { 
  CheckCircle2, 
  Star, 
  ShieldCheck,
  Sparkles,
  ChevronDown,
  ChevronUp, 
  Zap, 
  Check, 
  Clock, 
  Award, 
  Lock, 
  ShoppingBag, 
  FileText, 
  Terminal, 
  Layers, 
  DollarSign,
  HelpCircle,
  Smartphone,
  AlertCircle,
  TrendingUp,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface ProductPageProps {
  isDark: boolean;
}

export default function ProductPage({ isDark }: ProductPageProps) {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isPaymentNoticeOpen, setIsPaymentNoticeOpen] = useState(false);

  // The payment links open the checkout in a new tab; this tells the visitor to continue there.
  const openPaymentNotice = () => setIsPaymentNoticeOpen(true);

  const toggleModule = (index: number) => {
    setSelectedModule(prev => prev === index ? null : index);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(prev => prev === index ? null : index);
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className={`relative rounded-3xl p-6 sm:p-10 lg:p-12 border overflow-hidden transition ${
        isDark 
          ? 'bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-cyan-800/40 shadow-2xl' 
          : 'bg-gradient-to-b from-cyan-50/70 via-white to-slate-50 border-cyan-200/80 shadow-xl'
      }`}>
        
        {/* Glow ambient effects */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center space-y-5">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wide bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-cyan-500" />
            <span>{PRODUCT_PAGE_DATA.urgencyBadge}</span>
          </div>

          {/* Main Sales Headline */}
          <h1 className={`text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            {PRODUCT_PAGE_DATA.headline}
          </h1>

          {/* Subheadline */}
          <p className={`text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed font-normal ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            {PRODUCT_PAGE_DATA.subheadline}
          </p>

          {/* Social Proof Star Rating */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400" />
              ))}
            </div>
            <span className={`text-xs sm:text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
              Note {PRODUCT_PAGE_DATA.ratingAverage} sur {PRODUCT_PAGE_DATA.ratingCount} avis clients vérifiés
            </span>
            <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>•</span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              ✓ 100% de déploiements réussis
            </span>
          </div>

          {/* Pricing Box & CTA Card */}
          <div className={`mt-6 p-6 sm:p-8 rounded-2xl border max-w-xl mx-auto text-center space-y-4 ${
            isDark 
              ? 'bg-slate-950/80 border-slate-800 shadow-xl' 
              : 'bg-white border-slate-200 shadow-lg'
          }`}>
            <div className="flex items-center justify-center gap-3">
              <span className={`text-sm sm:text-base line-through font-bold ${
                isDark ? 'text-slate-500' : 'text-slate-400'
              }`}>
                {PRODUCT_PAGE_DATA.regularPrice}
              </span>
              <span className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {PRODUCT_PAGE_DATA.salePrice}
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
                {PRODUCT_PAGE_DATA.discountPercentage}
              </span>
            </div>

            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Paiement unique · Accès immédiat à vie · Téléchargement instantané PDF &amp; Fichiers
            </p>

            {/* Primary Order Button */}
            <div className="space-y-2.5 pt-2">
              <a
                href={PRODUCT_PAGE_DATA.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={openPaymentNotice}
                className="w-full py-4 px-6 rounded-xl text-sm sm:text-base font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/40 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>EFFECTUER LE PAIEMENT</span>
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>

            {/* Payment options badges */}
            <div className={`pt-3 border-t flex flex-wrap items-center justify-center gap-2 text-[11px] font-medium ${
              isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
            }`}>
              <span>Paiements acceptés :</span>
              <span className="font-bold text-amber-500">MTN Mobile Money</span> •
              <span className="font-bold text-blue-500">Moov Money</span> •
              <span className="font-bold text-orange-500">Orange Money</span> •
              <span className="font-bold text-cyan-500">Wave</span> •
              <span className="font-bold text-indigo-500">Carte Visa / Mastercard</span>
            </div>
          </div>

          {/* Guarantee pill */}
          <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
            <span>Garantie Satisfait ou Remboursé de 30 Jours · Aucun risque pour vous</span>
          </div>

        </div>
      </section>

      {/* 2. LE PROBLÈME VS LA SOLUTION */}
      <section className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
            POURQUOI 9 DÉBUTANTS SUR 10 ABANDONNENT
          </span>
          <h2 className={`text-xl sm:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            La Galère Habituelle VS La Méthode Infaillible du Pack
          </h2>
          <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Ne perdez plus des journées entières sur des tutoriels incomplets. Voici exactement ce que ce pack résout pour vous :
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* The Pain Card */}
          <div className={`p-6 rounded-2xl border space-y-4 ${
            isDark ? 'bg-red-950/20 border-red-900/40 text-red-200' : 'bg-red-50 border-red-200 text-red-900'
          }`}>
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-extrabold text-base">
              <AlertCircle className="h-5 w-5" />
              <span>SANS CE GUIDE (La Frustration Totale)</span>
            </div>
            
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">❌</span>
                <span>Votre routeur se bloque car vous n'avez pas effacé la configuration d'usine par défaut.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">❌</span>
                <span>Un seul client achète 1 ticket et le partage à tout le quartier avec le partage de connexion.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">❌</span>
                <span>Les téléphones récents ne sont pas redirigés vers le portail à cause du manque de diffusion ARP.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">❌</span>
                <span>Créer 300 utilisateurs à la main dans Winbox vous prend 5 heures chaque semaine.</span>
              </li>
            </ul>
          </div>

          {/* The Solution Card */}
          <div className={`p-6 rounded-2xl border space-y-4 ${
            isDark ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-200' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
          }`}>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-extrabold text-base">
              <CheckCircle2 className="h-5 w-5" />
              <span>AVEC LE PACK MIKROTIK (La Rentabilité Immédiate)</span>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">✅</span>
                <span>Configuration complète en 15 étapes claires et sans jargon en moins de 25 minutes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">✅</span>
                <span>Le cadenas anti-partage TTL=1 détruit tout paquet partagé : 1 ticket = 1 seul smartphone.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">✅</span>
                <span>Redirection 100% automatique sur tous les mobiles avec Always Broadcast et Add ARP.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">✅</span>
                <span>Mikhmon V3 sort 300 tickets découpables en 3 secondes (valeur du lot : 290 000 FCFA).</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* 3. PROGRAMME COMPLET DES 8 MODULES */}
      <section className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            CURRICULUM DÉTAILLÉ
          </span>
          <h2 className={`text-xl sm:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Tout Ce Que Vous Allez Maîtriser de A à Z
          </h2>
          <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Chaque module a été pensé pour vous guider clic par clic, sans aucune hésitation ni jargon technique.
          </p>
        </div>

        <div className="space-y-3">
          {PRODUCT_PAGE_DATA.modules.map((mod) => {
            const isOpen = selectedModule === mod.number;

            return (
              <div 
                key={mod.number}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? isDark ? 'bg-slate-900 border-cyan-700/60 shadow-lg' : 'bg-cyan-50/50 border-cyan-300 shadow-sm'
                    : isDark ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <button
                  onClick={() => toggleModule(mod.number)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`h-8 w-8 rounded-xl font-mono font-bold text-xs flex items-center justify-center shrink-0 ${
                      isOpen
                        ? 'bg-cyan-600 text-white'
                        : isDark ? 'bg-slate-800 text-cyan-400' : 'bg-slate-100 text-cyan-700'
                    }`}>
                      M{mod.number}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {mod.badge && (
                          <span className="text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                            {mod.badge}
                          </span>
                        )}
                        <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          Durée : {mod.duration}
                        </span>
                      </div>
                      <h3 className={`text-sm sm:text-base font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Module {mod.number} : {mod.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs hidden sm:inline ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {isOpen ? 'Masquer' : 'Voir le contenu'}
                    </span>
                    {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className={`p-4 sm:p-5 border-t space-y-3 text-xs sm:text-sm ${
                    isDark ? 'border-slate-800/80 bg-slate-950/40 text-slate-300' : 'border-slate-200/80 bg-white text-slate-700'
                  }`}>
                    <div className="font-semibold text-cyan-600 dark:text-cyan-300">
                      🎯 Objectif : {mod.objective}
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <strong className={`block text-xs uppercase tracking-wide ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Points clés enseignés :
                      </strong>
                      {mod.keyPoints.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. LA STACK DE VALEUR (CE QUE VOUS RECEVEZ IMMÉDIATEMENT) */}
      <section className={`p-6 sm:p-10 rounded-3xl border space-y-6 ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-md'
      }`}>
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
            CONTENU DE VOTRE COMMANDE
          </span>
          <h2 className={`text-xl sm:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Tout Ce Que Vous Téléchargez Immédiatement
          </h2>
          <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Dès validation de votre paiement, vous recevez un accès direct à tous les livrables suivants :
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PRODUCT_PAGE_DATA.deliverables.map((item, idx) => (
            <div 
              key={idx} 
              className={`p-4 sm:p-5 rounded-2xl border flex flex-col justify-between space-y-3 ${
                isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                    LIVRABLE {idx + 1}
                  </span>
                  <span className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Valeur : {item.value}
                  </span>
                </div>
                <h4 className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {item.title}
                </h4>
                <p className={`text-xs leading-relaxed mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {item.description}
                </p>
              </div>

              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5 pt-2 border-t border-slate-800/40">
                <CheckCircle2 className="h-4 w-4" />
                <span>Inclus dans le pack d'aujourd'hui</span>
              </div>
            </div>
          ))}
        </div>

        {/* Total Value Banner */}
        <div className={`p-4 sm:p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left ${
          isDark ? 'bg-emerald-950/30 border-emerald-800/60' : 'bg-emerald-50 border-emerald-200'
        }`}>
          <div>
            <div className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Valeur marchande cumulée des éléments :
            </div>
            <div className={`text-base sm:text-lg line-through font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Plus de 60 000 FCFA
            </div>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Votre tarif promotionnel :
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              SEULEMENT {PRODUCT_PAGE_DATA.salePrice}
            </div>
          </div>

          <a
            href={PRODUCT_PAGE_DATA.checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={openPaymentNotice}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 transition cursor-pointer inline-flex items-center justify-center"
          >
            Obtenir Mon Accès Immédiat
          </a>
        </div>
      </section>

      {/* 5. AVIS CLIENTS VÉRIFIÉS (SECTION CONVAINCANTE) */}
      <section className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400" />
            ))}
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block">
            RETEX DE LA COMMUNAUTÉ
          </span>
          <h2 className={`text-xl sm:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Ce Que Disent Ceux Qui Ont Déployé Le Guide
          </h2>
          <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Témoignages authentiques de gérants de Wi-Fi zone, techniciens réseau et commerçants au Bénin, Togo, Côte d'Ivoire et Sénégal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRODUCT_PAGE_DATA.customerReviews.map((rev) => (
            <div 
              key={rev.id}
              className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${
                isDark 
                  ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700' 
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className="space-y-3">
                {/* User header */}
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${rev.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm`}>
                    {rev.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {rev.name}
                      </span>
                      {rev.verified && (
                        <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                          ✓ Acheteur vérifié
                        </span>
                      )}
                    </div>
                    <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {rev.role} · <strong>{rev.city}, {rev.country}</strong>
                    </p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                  ))}
                  <span className={`text-[11px] ml-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    ({rev.date})
                  </span>
                </div>

                {/* Review Headline */}
                <h4 className={`text-xs sm:text-sm font-bold leading-snug ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  « {rev.headline} »
                </h4>

                {/* Comment */}
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {rev.comment}
                </p>
              </div>

              {/* Earnings or proof footer */}
              <div className="space-y-1.5 pt-3 border-t border-slate-800/40 text-[11px]">
                {rev.earningsProof && (
                  <div className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>{rev.earningsProof}</span>
                  </div>
                )}
                <div className={`font-mono text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Matériel : {rev.deviceUsed}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. GARANTIE BÉTON */}
      <section className={`p-6 sm:p-10 rounded-3xl border text-center space-y-4 ${
        isDark 
          ? 'bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/40 border-emerald-800/40' 
          : 'bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border-emerald-200 shadow-sm'
      }`}>
        <div className="h-14 w-14 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto shadow-sm">
          <Award className="h-8 w-8" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
          {PRODUCT_PAGE_DATA.guarantee.badge}
        </span>

        <h3 className={`text-xl sm:text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {PRODUCT_PAGE_DATA.guarantee.title}
        </h3>

        <p className={`text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed ${
          isDark ? 'text-slate-300' : 'text-slate-700'
        }`}>
          {PRODUCT_PAGE_DATA.guarantee.description}
        </p>

        <div className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Assistance technique directe formateur : <strong className="text-emerald-500">{PRODUCT_PAGE_DATA.instructorPhone}</strong>
        </div>
      </section>

      {/* 7. FAQ OBJECTIONS */}
      <section className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            QUESTIONS FRÉQUEMMENT POSÉES
          </span>
          <h2 className={`text-xl sm:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Vous Avez Encore Des Doutes ? Voici Vos Réponses
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {PRODUCT_PAGE_DATA.faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;

            return (
              <div 
                key={idx}
                className={`rounded-2xl border transition overflow-hidden ${
                  isOpen 
                    ? isDark ? 'bg-slate-900 border-cyan-800' : 'bg-white border-cyan-300 shadow-sm'
                    : isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {faq.question}
                  </span>
                  {isOpen ? <ChevronUp className="h-4 w-4 shrink-0 text-cyan-500" /> : <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />}
                </button>

                {isOpen && (
                  <div className={`px-4 sm:px-5 pb-5 text-xs sm:text-sm leading-relaxed border-t pt-3 ${
                    isDark ? 'border-slate-800 text-slate-300' : 'border-slate-100 text-slate-700'
                  }`}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. FINAL CTA BOTTOM BANNER */}
      <section className={`p-8 sm:p-12 rounded-3xl border text-center space-y-5 ${
        isDark ? 'bg-slate-900 border-slate-800 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
      }`}>
        <h2 className={`text-2xl sm:text-4xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Prêt à Déployer Votre Propre Wi-Fi Zone Rentable ?
        </h2>

        <p className={`text-xs sm:text-sm max-w-xl mx-auto leading-relaxed ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}>
          Rejoignez plus de 140 gérants et techniciens qui ont économisé des semaines de galère. Téléchargez immédiatement le pack complet au tarif promo de <strong>{PRODUCT_PAGE_DATA.salePrice}</strong>.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href={PRODUCT_PAGE_DATA.checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={openPaymentNotice}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-black bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-lg shadow-emerald-600/30 transition cursor-pointer inline-flex items-center justify-center"
          >
            EFFECTUER LE PAIEMENT ({PRODUCT_PAGE_DATA.salePrice})
          </a>
        </div>
      </section>

      {/* PAYMENT NOTICE (shown after the payment page opens in a new tab) */}
      {isPaymentNoticeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className={`w-full max-w-md p-6 sm:p-8 rounded-3xl border shadow-2xl space-y-5 text-center ${
            isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
              <ShoppingBag className="h-6 w-6" />
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-black">
                Continuez votre paiement de l'autre côté
              </h3>
              <p className={`text-sm mt-2 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                La page de paiement s'est ouverte dans un nouvel onglet. Veuillez y continuer le reste de votre commande.
              </p>
            </div>

            <div className="space-y-2.5">
              <a
                href={PRODUCT_PAGE_DATA.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 transition"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Ouvrir à nouveau la page de paiement</span>
              </a>
            </div>

            <button
              onClick={() => setIsPaymentNoticeOpen(false)}
              className="text-xs text-slate-400 hover:underline cursor-pointer"
            >
              Fermer la fenêtre
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
