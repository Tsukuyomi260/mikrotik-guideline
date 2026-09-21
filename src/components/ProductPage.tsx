/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Check, ExternalLink, Info } from 'lucide-react';
import { PRODUCT_PAGE_DATA } from '../data/productPageData';
import { SITE, formatFcfa, discountPercent } from '../data/siteConfig';

const buttonClass =
  'inline-flex items-center justify-center gap-2 rounded-md bg-cyan-700 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-cyan-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700';

const sectionTitleClass = 'text-2xl font-bold tracking-tight text-slate-900 dark:text-white';
const mutedClass = 'text-slate-600 dark:text-slate-400';

function PayLink({
  onClick,
  label = 'Effectuer le paiement',
  className = buttonClass,
}: {
  onClick: () => void;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={SITE.checkoutUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={className}
    >
      {label}
    </a>
  );
}

export default function ProductPage() {
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const discount = discountPercent();

  // The payment link opens the checkout in a new tab; the notice tells the visitor to continue there.
  const openNotice = () => setIsNoticeOpen(true);

  useEffect(() => {
    if (!isNoticeOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsNoticeOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isNoticeOpen]);

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Top bar */}
      <header className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <span className="text-sm font-semibold sm:text-base">{SITE.name}</span>
          <PayLink
            onClick={openNotice}
            className="inline-flex items-center justify-center rounded-md bg-cyan-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cyan-800"
          />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Hero */}
        <section className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_24rem] lg:items-start">
          <div className="space-y-5">
            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {PRODUCT_PAGE_DATA.headline}
            </h1>
            <p className={`max-w-2xl text-lg leading-relaxed ${mutedClass}`}>
              {PRODUCT_PAGE_DATA.subheadline}
            </p>

            <dl className="grid max-w-2xl grid-cols-2 gap-x-6 gap-y-4 border-t border-slate-200 pt-5 sm:grid-cols-4 dark:border-slate-800">
              {PRODUCT_PAGE_DATA.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className={`text-xs uppercase tracking-wide ${mutedClass}`}>{fact.label}</dt>
                  <dd className="mt-1 text-sm font-semibold">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Price and payment */}
          <aside className="rounded-lg border border-slate-200 p-6 dark:border-slate-800">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-3xl font-bold">{formatFcfa(SITE.salePrice)}</span>
              {SITE.regularPrice !== null && (
                <span className={`text-base line-through ${mutedClass}`}>{formatFcfa(SITE.regularPrice)}</span>
              )}
              {discount !== null && (
                <span className="rounded bg-slate-900 px-1.5 py-0.5 text-xs font-semibold text-white dark:bg-slate-100 dark:text-slate-900">
                  -{discount}%
                </span>
              )}
            </div>
            <p className={`mt-2 text-sm ${mutedClass}`}>
              Paiement unique. Le lien d'accès au guide vous est donné à la fin du paiement.
            </p>
            <PayLink onClick={openNotice} className={`${buttonClass} mt-5 w-full`} />
            <p className={`mt-3 text-xs ${mutedClass}`}>
              Le paiement se fait sur une page externe. Aucun remboursement une fois l'accès donné, voir les{' '}
              <a href="/conditions.html" className="underline underline-offset-2">conditions de vente</a>.
            </p>
          </aside>
        </section>

        {/* Problems the guide handles */}
        <section className="border-t border-slate-200 py-12 dark:border-slate-800">
          <h2 className={sectionTitleClass}>Ce que le guide règle</h2>
          <dl className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {PRODUCT_PAGE_DATA.problems.map((item) => (
              <div key={item.problem}>
                <dt className="font-semibold">{item.problem}</dt>
                <dd className={`mt-1 text-sm leading-relaxed ${mutedClass}`}>{item.solution}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* What is included */}
        <section className="border-t border-slate-200 py-12 dark:border-slate-800">
          <h2 className={sectionTitleClass}>Ce que vous recevez</h2>
          <ul className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {PRODUCT_PAGE_DATA.contents.map((item) => (
              <li key={item.title} className="flex gap-3">
                <Check className="mt-1 h-4 w-4 shrink-0 text-cyan-700 dark:text-cyan-400" aria-hidden="true" />
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className={`mt-0.5 text-sm leading-relaxed ${mutedClass}`}>{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* The 15 steps */}
        <section className="border-t border-slate-200 py-12 dark:border-slate-800">
          <h2 className={sectionTitleClass}>Les 15 étapes</h2>
          <ol className="mt-6 divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
            {PRODUCT_PAGE_DATA.steps.map((step) => (
              <li key={step.number} className="flex items-baseline gap-4 py-3">
                <span className={`w-16 shrink-0 font-mono text-sm ${mutedClass}`}>Étape {step.number}</span>
                <span className="flex-1">{step.title}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Audience and requirements */}
        <section className="grid gap-10 border-t border-slate-200 py-12 sm:grid-cols-2 dark:border-slate-800">
          <div>
            <h2 className={sectionTitleClass}>Pour qui</h2>
            <ul className="mt-4 space-y-3">
              {PRODUCT_PAGE_DATA.audience.map((line) => (
                <li key={line} className="flex gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-cyan-700 dark:text-cyan-400" aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={sectionTitleClass}>À savoir avant de commander</h2>
            <ul className="mt-4 space-y-3">
              {PRODUCT_PAGE_DATA.requirements.map((line) => (
                <li key={line} className="flex gap-3">
                  <Info className="mt-1 h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-slate-200 py-12 dark:border-slate-800">
          <h2 className={sectionTitleClass}>Questions fréquentes</h2>
          <div className="mt-6 max-w-3xl divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
            {PRODUCT_PAGE_DATA.faqs.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="cursor-pointer list-none font-semibold marker:content-none">
                  <span className="flex items-start justify-between gap-4">
                    <span>{faq.question}</span>
                    <span className={`shrink-0 font-mono ${mutedClass} group-open:hidden`} aria-hidden="true">+</span>
                    <span className={`hidden shrink-0 font-mono ${mutedClass} group-open:inline`} aria-hidden="true">-</span>
                  </span>
                </summary>
                <p className={`mt-3 leading-relaxed ${mutedClass}`}>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Closing call to action */}
        <section className="border-t border-slate-200 py-12 dark:border-slate-800">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className={sectionTitleClass}>Accéder au guide</h2>
              <p className={`mt-1 ${mutedClass}`}>
                {formatFcfa(SITE.salePrice)}, paiement unique.
              </p>
            </div>
            <PayLink onClick={openNotice} />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-5xl space-y-4 px-4 py-8 text-sm sm:px-6">
          <p>
            Assistance WhatsApp :{' '}
            {SITE.contacts.map((c, i) => (
              <span key={c.wa}>
                {i > 0 && ' ou '}
                <a
                  href={`https://wa.me/${c.wa}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  {c.display}
                </a>
              </span>
            ))}
          </p>
          <p className="flex flex-wrap gap-x-6 gap-y-1">
            <a href="/conditions.html" className="underline underline-offset-2">Conditions de vente</a>
            <a href="/confidentialite.html" className="underline underline-offset-2">Politique de confidentialité</a>
          </p>
          <p className={`text-xs leading-relaxed ${mutedClass}`}>
            Ce guide n'est pas affilié à MikroTik. MikroTik, RouterOS et Winbox sont des marques de leurs propriétaires.
          </p>
          <p className={`text-xs ${mutedClass}`}>
            {SITE.domain} · {new Date().getFullYear()}
          </p>
        </div>
      </footer>

      {/* Notice shown after the payment page opens in a new tab */}
      {isNoticeOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setIsNoticeOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-notice-title"
            className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="payment-notice-title" className="text-lg font-bold">
              Continuez sur la page de paiement
            </h2>
            <p className={`mt-2 leading-relaxed ${mutedClass}`}>
              La page de paiement s'est ouverte dans un nouvel onglet. Veuillez y continuer le reste de votre commande.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href={SITE.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${buttonClass} flex-1`}
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Rouvrir la page de paiement
              </a>
              <button
                type="button"
                onClick={() => setIsNoticeOpen(false)}
                className="rounded-md border border-slate-300 px-6 py-3 text-base font-semibold transition-colors hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
