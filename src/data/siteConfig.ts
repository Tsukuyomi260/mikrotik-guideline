/**
 * Facts shared by the sales page and the legal pages.
 * Change a price, the checkout link or a contact number here only.
 */

export const SITE = {
  name: "Guide Débutant MikroTik & Mikhmon",
  domain: "mikrotik.onelezin.dev",
  // Payment happens on an external platform, in a new tab.
  checkoutUrl: "https://cqznzagq.mychariow.shop/gnz/checkout",
  // Prices in FCFA. Set regularPrice to null to show a single price without strike-through.
  salePrice: 4900,
  regularPrice: 15000 as number | null,
  // Support numbers (WhatsApp). `wa` is the international number without "+" for wa.me links.
  contacts: [
    { display: "+229 0153489846", wa: "2290153489846" },
    { display: "+229 0166006880", wa: "2290166006880" },
  ],
  legalUpdated: "21 septembre 2026",
};

export function formatFcfa(amount: number): string {
  // Non-breaking space between thousands, e.g. "4 900 FCFA".
  return `${amount.toLocaleString('fr-FR').replace(/[  ]/g, ' ')} FCFA`;
}

export function discountPercent(): number | null {
  if (SITE.regularPrice === null || SITE.regularPrice <= SITE.salePrice) return null;
  return Math.round((1 - SITE.salePrice / SITE.regularPrice) * 100);
}
