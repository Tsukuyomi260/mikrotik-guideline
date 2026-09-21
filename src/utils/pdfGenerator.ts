/**
 * Utility to generate and download a clean, high-resolution printable PDF
 * of the complete MikroTik & Mikhmon Beginner Guide.
 */

import { BEGINNER_GUIDE_STEPS, CABLING_GUIDE, TROUBLESHOOTING_TIPS } from '../data/beginnerGuideData';
import { VIDEO_METADATA } from '../data/transcriptData';

export function downloadGuideAsPdf() {
  const printWindow = window.open('', '_blank', 'width=900,height=1000');
  if (!printWindow) {
    alert("Veuillez autoriser les fenêtres pop-up pour télécharger le guide au format PDF.");
    return;
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Guide Débutant MikroTik & Mikhmon V3 - Guide pas-à-pas illustré</title>
  <style>
    @page {
      size: A4;
      margin: 12mm 12mm 15mm 12mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 0;
      font-size: 11pt;
      line-height: 1.45;
    }
    .header-cover {
      border-bottom: 3px solid #0284c7;
      padding-bottom: 15px;
      margin-bottom: 20px;
    }
    .badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 8pt;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .badge-blue { background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; }
    .badge-green { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }
    .badge-red { background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; }
    .badge-amber { background: #fef3c7; color: #b45309; border: 1px solid #fde68a; }

    h1 {
      font-size: 18pt;
      font-weight: 800;
      color: #0f172a;
      margin: 8px 0 4px 0;
    }
    .subtitle {
      font-size: 10pt;
      color: #475569;
      margin-bottom: 10px;
    }
    .meta-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 14px;
      font-size: 9pt;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 6px;
      margin-bottom: 15px;
    }
    .meta-box strong { color: #0284c7; }

    .banner-compat {
      background: #ecfeff;
      border: 1px solid #a5f3fc;
      border-left: 4px solid #0891b2;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 9pt;
      margin-bottom: 20px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 18px;
      font-size: 9pt;
    }
    th, td {
      border: 1px solid #cbd5e1;
      padding: 6px 10px;
      text-align: left;
    }
    th {
      background: #f1f5f9;
      font-weight: 700;
      color: #1e293b;
    }
    .section-title {
      font-size: 13pt;
      font-weight: 800;
      color: #0369a1;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 4px;
      margin-top: 25px;
      margin-bottom: 12px;
    }

    .step-card {
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      margin-bottom: 16px;
      page-break-inside: avoid;
      background: #ffffff;
      overflow: hidden;
    }
    .step-header {
      background: #f8fafc;
      border-bottom: 1px solid #cbd5e1;
      padding: 8px 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .step-title {
      font-size: 11pt;
      font-weight: 700;
      color: #0f172a;
      margin: 0;
    }
    .step-body {
      padding: 10px 14px;
    }
    .step-explain {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-bottom: 10px;
      font-size: 8.5pt;
    }
    .explain-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 6px 10px;
    }
    .explain-box strong { display: block; margin-bottom: 2px; }

    .action-item {
      font-size: 9pt;
      margin-bottom: 6px;
      padding-left: 6px;
      border-left: 2px solid #0284c7;
    }
    .action-menu {
      font-family: monospace;
      font-size: 8pt;
      background: #e0f2fe;
      color: #0369a1;
      padding: 1px 6px;
      border-radius: 4px;
      display: inline-block;
      margin-top: 2px;
    }
    .action-values {
      background: #f8fafc;
      border: 1px dashed #cbd5e1;
      border-radius: 4px;
      padding: 4px 8px;
      margin-top: 4px;
      font-family: monospace;
      font-size: 8.5pt;
    }

    .trap-box {
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-left: 3px solid #ef4444;
      padding: 6px 10px;
      border-radius: 4px;
      font-size: 8.5pt;
      color: #991b1b;
      margin-top: 8px;
    }
    .verify-box {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-left: 3px solid #22c55e;
      padding: 6px 10px;
      border-radius: 4px;
      font-size: 8.5pt;
      color: #166534;
      margin-top: 6px;
    }

    .footer-doc {
      margin-top: 30px;
      border-top: 1px solid #cbd5e1;
      padding-top: 10px;
      font-size: 8pt;
      color: #64748b;
      text-align: center;
    }

    .no-print-bar {
      background: #0f172a;
      color: #ffffff;
      padding: 12px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 9999;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
    }
    .btn-print {
      background: #0284c7;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
      font-size: 10pt;
    }
    .btn-print:hover { background: #0369a1; }

    @media print {
      .no-print-bar { display: none !important; }
      body { padding: 0; }
    }
  </style>
</head>
<body>

  <div class="no-print-bar">
    <div>
      <strong>Guide Débutant MikroTik &amp; Mikhmon V3</strong> : document prêt pour impression ou enregistrement PDF
    </div>
    <button class="btn-print" onclick="window.print()">Enregistrer au format PDF</button>
  </div>

  <div style="padding: 15px 25px;">
    <!-- Cover & Title -->
    <div class="header-cover">
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <span class="badge badge-green">Guide Pas-à-Pas Débutant Illustré</span>
          <span class="badge badge-blue">RouterOS v7 &amp; Winbox v4</span>
        </div>
        <div style="font-size: 9pt; color: #64748b; font-weight: bold;">
          Format A4 Officiel
        </div>
      </div>

      <h1>Guide Débutant MikroTik &amp; Mikhmon V3</h1>
      <div class="subtitle">
        Configuration complète du routeur &amp; génération des tickets Hotspot en 15 étapes chronologiques sans jargon
      </div>

      <div class="meta-box">
        <div><strong>Matériel support :</strong> ${VIDEO_METADATA.device}</div>
        <div><strong>Système RouterOS :</strong> ${VIDEO_METADATA.routerOSVersion}</div>
        <div><strong>Formateur de la vidéo :</strong> ${VIDEO_METADATA.contacts}</div>
        <div><strong>Lien Mikhmon V3 (ZIP) :</strong> ${VIDEO_METADATA.mikhmonDownloadUrl}</div>
      </div>

      <div class="banner-compat">
        <strong>Compatibilité :</strong> Ce guide fonctionne sur la quasi-totalité des modèles MikroTik sous RouterOS v7 (gammes hAP, hEX RB750Gr3, RB2011, RB3011, RB4011, CCR...). Même si le routeur en démonstration vidéo est le hAP ax², la configuration Winbox et Mikhmon est 100% identique.
      </div>
    </div>

    <!-- Cabling table -->
    <div class="section-title">1. Schéma de Câblage des Ports Physiques RJ45</div>
    <table>
      <thead>
        <tr>
          <th>Port Physique</th>
          <th>Rôle / Étiquette</th>
          <th>Câble à brancher</th>
          <th>Consigne Importante</th>
        </tr>
      </thead>
      <tbody>
        ${CABLING_GUIDE.map(c => `
          <tr>
            <td><strong>${c.port}</strong></td>
            <td><span class="badge badge-blue">${c.label}</span></td>
            <td>${c.plugWhat}</td>
            <td><strong style="color: #b45309;">${c.note}</strong></td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <!-- Financial simulator table -->
    <div class="section-title">2. Tarification des Forfaits &amp; Recettes des 300 Vouchers</div>
    <table>
      <thead>
        <tr>
          <th>Forfait Hotspot</th>
          <th>Validité du ticket</th>
          <th>Mode d'expiration</th>
          <th>Prix Unitaire</th>
          <th>Lot généré</th>
          <th>Valeur Totale</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>24 HEURES</strong></td>
          <td>24h (1d)</td>
          <td>Remove &amp; Record</td>
          <td>200 FCFA</td>
          <td>100 vouchers</td>
          <td><strong>20 000 FCFA</strong></td>
        </tr>
        <tr>
          <td><strong>SEMAINE</strong></td>
          <td>7d</td>
          <td>Remove &amp; Record</td>
          <td>700 FCFA</td>
          <td>100 vouchers</td>
          <td><strong>70 000 FCFA</strong></td>
        </tr>
        <tr>
          <td><strong>MOIS</strong></td>
          <td>30d</td>
          <td>Remove &amp; Record</td>
          <td>2 000 FCFA</td>
          <td>100 vouchers</td>
          <td><strong>200 000 FCFA</strong></td>
        </tr>
        <tr style="background: #f0fdf4;">
          <td colspan="5" style="text-align: right; font-weight: bold; color: #166534;">VALEUR TOTALE DU PREMIER STOCK DE TICKETS :</td>
          <td style="font-weight: 800; font-size: 11pt; color: #15803d;">290 000 FCFA</td>
        </tr>
      </tbody>
    </table>

    <!-- 15 Detailed Steps -->
    <div class="section-title">3. Les 15 Étapes Détaillées Pas-à-Pas</div>

    ${BEGINNER_GUIDE_STEPS.map(s => `
      <div class="step-card">
        <div class="step-header">
          <div>
            <span class="badge ${s.difficulty === 'Crucial' ? 'badge-red' : s.difficulty === 'Attention' ? 'badge-amber' : 'badge-green'}">${s.difficulty}</span>
            <span style="font-size: 9pt; color: #64748b; margin-left: 6px;">Phase: ${s.phase} | Vidéo: ${s.videoTimestamp} | ~${s.estimatedTime}</span>
          </div>
          <div style="font-weight: bold; color: #0284c7; font-size: 9pt;">Étape ${s.number} / 14</div>
        </div>

        <div class="step-body">
          <div class="step-title" style="margin-bottom: 6px;">Étape ${s.number} : ${s.title}</div>
          <div style="font-size: 8.5pt; color: #64748b; margin-bottom: 8px;">${s.subtitle}</div>

          <div class="step-explain">
            <div class="explain-box">
              <strong style="color: #0369a1;">Ce que ça fait :</strong>
              ${s.whatItDoes}
            </div>
            <div class="explain-box">
              <strong style="color: #15803d;">Pourquoi c'est obligatoire :</strong>
              ${s.whyWeDoIt}
            </div>
          </div>

          <div style="font-size: 9pt; font-weight: bold; color: #1e293b; margin-bottom: 6px;">Actions précises à réaliser :</div>

          ${s.actions.map((act, aIdx) => `
            <div class="action-item">
              <div><strong>${aIdx + 1}.</strong> ${act.instruction}</div>
              ${act.targetMenu ? `<div class="action-menu">Menu Winbox : ${act.targetMenu}</div>` : ''}
              ${act.valuesToEnter ? `
                <div class="action-values">
                  ${act.valuesToEnter.map(v => `<div>• <strong>${v.field}</strong> : ${v.value} ${v.explain ? `(${v.explain})` : ''}</div>`).join('')}
                </div>
              ` : ''}
              ${act.clickButton ? `<div style="font-size: 8.5pt; margin-top: 2px;">Bouton à cliquer : <strong>[${act.clickButton}]</strong></div>` : ''}
            </div>
          `).join('')}

          ${s.trapWarning ? `
            <div class="trap-box">
              <strong>PIÈGE DU DÉBUTANT :</strong> ${s.trapWarning}
            </div>
          ` : ''}

          <div class="verify-box">
            <strong>Comment vérifier que vous avez réussi :</strong> ${s.verificationTip}
          </div>
        </div>
      </div>
    `).join('')}

    <!-- Troubleshooting section -->
    <div class="section-title">4. Guide de Dépannage Immédiat &amp; Résolution d'Erreurs</div>
    <table>
      <thead>
        <tr>
          <th style="width: 40%;">Problème rencontré</th>
          <th style="width: 60%;">Solution immédiate</th>
        </tr>
      </thead>
      <tbody>
        ${TROUBLESHOOTING_TIPS.map(t => `
          <tr>
            <td style="color: #b91c1c; font-weight: bold;">${t.problem}</td>
            <td style="color: #15803d;">${t.solution}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <div class="footer-doc">
      Guide Pratique Réseau Débutant · MikroTik RouterOS v7 &amp; Winbox v4 &amp; Mikhmon V3 · Formateur : ${VIDEO_METADATA.contacts}
    </div>
  </div>

  <script>
    window.onload = function() {
      // Automatic trigger after render
      setTimeout(function() {
        window.print();
      }, 500);
    };
  </script>
</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
