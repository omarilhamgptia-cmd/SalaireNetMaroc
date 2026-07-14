/* CalculateurDuMaroc — GA4 event tracking (Sprint A)
   Un seul snippet réutilisable, chargé en fin de body sur toutes les pages.
   N'écoute que des interactions — ne modifie AUCUN calcul existant.
   Événements : guide_cta_click, calc_use, excel_export, outbound_form. */
(function () {
  'use strict';

  function track(name, params) {
    // Guard : ne jamais casser une page si gtag n'est pas encore chargé.
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params || {});
    }
  }
  // Exposé pour les scripts de page (ex. générateur de facture).
  window.cdmTrack = track;

  // --- Délégation de clics (fonctionne sur toute la page) ---
  document.addEventListener('click', function (e) {
    var target = e.target;
    if (!target || !target.closest) return;

    // Lien sortant vers un Google Form (générique, couvre forms.gle et docs.google.com/forms)
    var form = target.closest('a[href*="forms.gle"], a[href*="docs.google.com/forms"]');
    if (form) {
      track('outbound_form', { link_url: form.href });
      // CTA lead magnet "Recevoir le guide gratuit" (pages MRE, haut + bas de page)
      var label = (form.textContent || '').toLowerCase();
      if (label.indexOf('guide') !== -1) {
        track('guide_cta_click', {
          page_path: location.pathname,
          cta_position: form.getAttribute('data-cta-pos') || 'unknown'
        });
      }
    }

    // Export Excel du bulletin de paie (bouton #exportBtn)
    if (target.closest('#exportBtn')) {
      track('excel_export', {});
    }
  }, false);

  // --- calc_use : première saisie dans un simulateur (une fois par session) ---
  var calcFired = false;
  function bindCalc(id, type) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', function () {
      if (calcFired) return;
      calcFired = true;
      track('calc_use', { calc_type: type });
    });
  }
  bindCalc('grossInput', 'salaire'); // home (salaire net)
  bindCalc('incomeInput', 'ae');     // /auto-entrepreneur/ (simulateur AE)
})();
