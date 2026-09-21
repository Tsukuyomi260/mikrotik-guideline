import type { LegalDocument } from '../data/legalData';
import { SITE } from '../data/siteConfig';

interface LegalPageProps {
  content: LegalDocument;
}

export default function LegalPage({ content }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="/" className="text-sm font-semibold sm:text-base">{SITE.name}</a>
          <a href="/" className="text-sm underline underline-offset-2">Retour à l'accueil</a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight">{content.title}</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Dernière mise à jour : {SITE.legalUpdated}
        </p>
        <p className="mt-6 leading-relaxed">{content.intro}</p>

        {content.sections.map((section) => (
          <section key={section.heading} className="mt-8">
            <h2 className="text-lg font-semibold">{section.heading}</h2>
            {section.paragraphs?.map((p) => (
              <p key={p} className="mt-2 leading-relaxed text-slate-700 dark:text-slate-300">{p}</p>
            ))}
            {section.items && (
              <ul className="mt-2 list-disc space-y-1 pl-6 text-slate-700 dark:text-slate-300">
                {section.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
          </section>
        ))}
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto flex max-w-3xl flex-wrap gap-x-6 gap-y-1 px-4 py-6 text-sm sm:px-6">
          <a href="/conditions.html" className="underline underline-offset-2">Conditions de vente</a>
          <a href="/confidentialite.html" className="underline underline-offset-2">Politique de confidentialité</a>
        </div>
      </footer>
    </div>
  );
}
