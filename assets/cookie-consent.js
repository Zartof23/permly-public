/**
 * Permly Cookie Consent Manager
 *
 * Stores user preferences as JSON in a single cookie ("permly_prefs") with a
 * 6-month expiry. The JSON envelope allows future preference keys to be added
 * without introducing a new cookie.
 *
 * Preference schema (v1):
 *   { "version": 1, "ga_consent": "granted" | "denied" }
 */
(function () {
  var COOKIE_NAME = 'permly_prefs';
  var COOKIE_DAYS = 180; // 6 months
  var GA_ID = 'G-YC8B7W3KNN';

  // ── Cookie helpers ───────────────────────────────────────────────────────

  function readCookie(name) {
    var match = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '=([^;]*)')
    );
    return match ? decodeURIComponent(match[1]) : null;
  }

  function writeCookie(name, value, days) {
    var expires = new Date(Date.now() + days * 86400000).toUTCString();
    document.cookie =
      name + '=' + encodeURIComponent(value) +
      '; expires=' + expires +
      '; path=/' +
      '; SameSite=Lax';
  }

  // ── Preference helpers ───────────────────────────────────────────────────

  function readPrefs() {
    try {
      var raw = readCookie(COOKIE_NAME);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function writePrefs(prefs) {
    writeCookie(COOKIE_NAME, JSON.stringify(prefs), COOKIE_DAYS);
  }

  // ── GA4 loader ───────────────────────────────────────────────────────────

  function loadGA4() {
    if (!GA_ID || GA_ID === 'G-XXXXXXXXXX') return;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  // ── Banner actions ───────────────────────────────────────────────────────

  function hideBanner() {
    var el = document.getElementById('cookie-banner');
    if (el) el.setAttribute('hidden', '');
  }

  function showBanner() {
    var el = document.getElementById('cookie-banner');
    if (!el) return;
    el.removeAttribute('hidden');
    var btn = el.querySelector('button[data-accept]');
    if (btn) btn.focus();
  }

  function onAccept() {
    var prefs = readPrefs();
    prefs.version = 1;
    prefs.ga_consent = 'granted';
    writePrefs(prefs);
    hideBanner();
    loadGA4();
  }

  function onDecline() {
    var prefs = readPrefs();
    prefs.version = 1;
    prefs.ga_consent = 'denied';
    writePrefs(prefs);
    hideBanner();
  }

  // Exposed globally so footer "Cookie Settings" links can call it
  window.permlyOpenCookieSettings = function () {
    var prefs = readPrefs();
    delete prefs.ga_consent;
    writePrefs(prefs);
    showBanner();
  };

  // ── Banner markup + styles ───────────────────────────────────────────────

  function injectBanner() {
    var style = document.createElement('style');
    style.textContent = [
      '#cookie-banner{',
        'position:fixed;bottom:0;left:0;right:0;z-index:9999;',
        'background:#fff;border-top:2px solid #4F46E5;',
        'padding:16px 24px;',
        'display:flex;align-items:center;justify-content:space-between;',
        'flex-wrap:wrap;gap:12px;',
        'box-shadow:0 -4px 24px rgba(0,0,0,0.12);',
        'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;',
      '}',
      '#cookie-banner[hidden]{display:none!important;}',
      '#cookie-banner p{margin:0;color:#111827;font-size:0.9em;max-width:640px;line-height:1.5;}',
      '#cookie-banner a{color:#4F46E5;text-decoration:underline;}',
      '#cookie-banner .cookie-actions{display:flex;gap:10px;flex-shrink:0;}',
      '#cookie-banner button{',
        'padding:10px 22px;border-radius:8px;font-size:0.9em;',
        'font-weight:600;cursor:pointer;transition:opacity 0.15s;',
        'border:2px solid #4F46E5;',
      '}',
      '#cookie-banner button:hover{opacity:0.85;}',
      '#cookie-banner button[data-accept]{background:#4F46E5;color:#fff;}',
      '#cookie-banner button[data-decline]{background:#fff;color:#4F46E5;}',
      '@media(max-width:520px){',
        '#cookie-banner{flex-direction:column;align-items:flex-start;}',
        '#cookie-banner .cookie-actions{width:100%;justify-content:flex-end;}',
      '}'
    ].join('');
    document.head.appendChild(style);

    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('hidden', '');
    banner.innerHTML =
      '<p>' +
        'We use cookies to remember your preferences on this website. ' +
        'Analytics cookies (Google Analytics 4) are only loaded after you accept. ' +
        '<a href="/privacy-policy#cookie-policy">Cookie Policy</a>' +
      '</p>' +
      '<div class="cookie-actions">' +
        '<button data-decline>Decline</button>' +
        '<button data-accept>Accept</button>' +
      '</div>';
    document.body.appendChild(banner);

    banner.querySelector('button[data-accept]').addEventListener('click', onAccept);
    banner.querySelector('button[data-decline]').addEventListener('click', onDecline);
  }

  // ── Init ─────────────────────────────────────────────────────────────────

  document.addEventListener('DOMContentLoaded', function () {
    injectBanner();
    var consent = readPrefs().ga_consent;
    if (consent === 'granted') {
      loadGA4();
    } else if (!consent) {
      showBanner();
    }
    // If "denied", do nothing — GA4 is never loaded
  });
})();
