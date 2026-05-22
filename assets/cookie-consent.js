/**
 * Permly Cookie Consent Manager
 *
 * Uses Google Consent Mode v2: gtag loads immediately with all signals denied,
 * then updates to 'granted' once the user accepts analytics cookies.
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

  // ── Consent update helpers ───────────────────────────────────────────────

  function grantAnalytics() {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted'
    });
  }

  // ── Banner actions ───────────────────────────────────────────────────────

  function hideBanner() {
    var el = document.getElementById('cookie-banner');
    if (el) el.setAttribute('hidden', '');
  }

  function showBanner() {
    var el = document.getElementById('cookie-banner');
    if (!el) return;
    el.innerHTML =
      '<p class="cb-title">🍪 Cookie time (sorry)</p>' +
      '<p class="cb-body">' +
        'The necessary ones keep the lights on. The optional ones (Google Analytics) help us ' +
        'understand if anyone\'s actually reading this. Your choice — no pressure, no guilt trip.' +
      '</p>' +
      '<div class="cb-actions">' +
        '<button class="cb-btn cb-btn-primary" data-accept>Sure, why not</button>' +
        '<button class="cb-btn cb-btn-secondary" data-customize>Picky mode</button>' +
      '</div>';
    el.querySelector('button[data-accept]').addEventListener('click', onAccept);
    el.querySelector('button[data-customize]').addEventListener('click', showCustomize);
    el.style.maxHeight = '200px';
    el.removeAttribute('hidden');
    requestAnimationFrame(function () { el.querySelector('button[data-accept]').focus(); });
  }

  function onAccept() {
    var prefs = readPrefs();
    prefs.version = 1;
    prefs.ga_consent = 'granted';
    writePrefs(prefs);
    hideBanner();
    grantAnalytics();
  }

  var _analyticsEnabled = true;

  function showCustomize() {
    _analyticsEnabled = true;
    var banner = document.getElementById('cookie-banner');
    if (!banner) return;
    banner.innerHTML =
      '<p class="cb-title">⚙️ Cookie preferences</p>' +
      "<p class=\"cb-subtitle\">Choose what you're comfortable with.</p>" +
      '<div class="cb-row">' +
        '<div>' +
          '<div class="cb-row-label">Necessary</div>' +
          '<div class="cb-row-desc">Keeps the site working. Non-negotiable.</div>' +
        '</div>' +
        '<span class="cb-pill" aria-disabled="true">Always on</span>' +
      '</div>' +
      '<div class="cb-row">' +
        '<div>' +
          '<div class="cb-row-label">Analytics</div>' +
          '<div class="cb-row-desc">Google Analytics — helps us know if this page exists to anyone.</div>' +
        '</div>' +
        '<button class="cb-toggle" role="switch" aria-checked="true" data-analytics-toggle' +
          ' aria-label="Analytics cookies"></button>' +
      '</div>' +
      "<button class=\"cb-btn-full\" data-confirm>I'm on a cookie diet</button>";

    var toggle = banner.querySelector('button[data-analytics-toggle]');
    toggle.addEventListener('click', function () {
      _analyticsEnabled = !_analyticsEnabled;
      toggle.setAttribute('aria-checked', _analyticsEnabled ? 'true' : 'false');
    });

    banner.querySelector('button[data-confirm]').addEventListener('click', onConfirmCustomize);
    banner.style.maxHeight = '420px';
    requestAnimationFrame(function () { toggle.focus(); });
  }

  function onConfirmCustomize() {
    var prefs = readPrefs();
    prefs.version = 1;
    prefs.ga_consent = _analyticsEnabled ? 'granted' : 'denied';
    writePrefs(prefs);
    hideBanner();
    if (_analyticsEnabled) grantAnalytics();
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
      /* Card */
      '#cookie-banner{',
        'position:fixed;bottom:20px;right:20px;z-index:9999;',
        'background:#fff;border:2px solid #4F46E5;border-radius:12px;',
        'padding:18px 20px;width:100%;max-width:320px;',
        'box-shadow:0 4px 24px rgba(0,0,0,0.14);',
        'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;',
        'box-sizing:border-box;',
        'overflow:hidden;transition:max-height 0.28s ease;max-height:200px;',
      '}',
      '#cookie-banner[hidden]{display:none!important;}',

      /* Title */
      '#cookie-banner .cb-title{',
        'font-size:0.92em;font-weight:700;color:#111827;margin:0 0 6px;',
      '}',

      /* Body text */
      '#cookie-banner .cb-body{',
        'font-size:0.78em;color:#4B5563;line-height:1.55;margin:0 0 14px;',
      '}',
      '#cookie-banner .cb-body a{color:#4F46E5;text-decoration:underline;}',

      /* Banner action buttons */
      '#cookie-banner .cb-actions{display:flex;gap:8px;flex-wrap:wrap;}',
      '#cookie-banner .cb-btn{',
        'padding:9px 16px;border-radius:8px;font-size:0.82em;',
        'font-weight:600;cursor:pointer;transition:opacity 0.15s;border:2px solid #4F46E5;',
        'white-space:nowrap;',
      '}',
      '#cookie-banner .cb-btn:hover{opacity:0.85;}',
      '#cookie-banner .cb-btn-primary{background:#4F46E5;color:#fff;}',
      '#cookie-banner .cb-btn-secondary{background:#fff;color:#4F46E5;}',

      /* Customize panel rows */
      '#cookie-banner .cb-subtitle{',
        'font-size:0.75em;color:#6B7280;margin:0 0 14px;',
      '}',
      '#cookie-banner .cb-row{',
        'display:flex;justify-content:space-between;align-items:center;',
        'padding:10px 0;border-top:1px solid #E5E7EB;gap:12px;',
      '}',
      '#cookie-banner .cb-row-label{font-size:0.8em;font-weight:600;color:#111827;}',
      '#cookie-banner .cb-row-desc{font-size:0.68em;color:#6B7280;margin-top:2px;}',

      /* Always-on pill */
      '#cookie-banner .cb-pill{',
        'background:#E5E7EB;border-radius:20px;padding:3px 10px;',
        'font-size:0.68em;color:#6B7280;font-weight:600;flex-shrink:0;',
      '}',

      /* Toggle */
      '#cookie-banner .cb-toggle{',
        'width:38px;height:22px;border-radius:11px;',
        'position:relative;cursor:pointer;flex-shrink:0;',
        'border:none;padding:0;transition:background 0.2s;',
        'background:#E5E7EB;',
      '}',
      '#cookie-banner .cb-toggle[aria-checked="true"]{background:#4F46E5;}',
      '#cookie-banner .cb-toggle::after{',
        'content:"";width:16px;height:16px;background:#fff;border-radius:50%;',
        'position:absolute;top:3px;left:3px;',
        'box-shadow:0 1px 3px rgba(0,0,0,0.2);transition:left 0.2s;',
      '}',
      '#cookie-banner .cb-toggle[aria-checked="true"]::after{left:19px;}',

      /* Confirm button (full-width) */
      '#cookie-banner .cb-btn-full{',
        'width:100%;margin-top:14px;padding:10px;',
        'border-radius:8px;font-size:0.82em;font-weight:600;',
        'cursor:pointer;border:none;background:#4F46E5;color:#fff;',
        'transition:opacity 0.15s;',
      '}',
      '#cookie-banner .cb-btn-full:hover{opacity:0.85;}',

      /* Mobile: full-width centered */
      '@media(max-width:480px){',
        '#cookie-banner{',
          'left:12px;right:12px;bottom:12px;max-width:none;width:auto;',
        '}',
      '}',
    ].join('');
    document.head.appendChild(style);

    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('hidden', '');
    banner.innerHTML =
      '<p class="cb-title">🍪 Cookie time (sorry)</p>' +
      '<p class="cb-body">' +
        'The necessary ones keep the lights on. The optional ones (Google Analytics) help us ' +
        'understand if anyone\'s actually reading this. Your choice — no pressure, no guilt trip.' +
      '</p>' +
      '<div class="cb-actions">' +
        '<button class="cb-btn cb-btn-primary" data-accept>Sure, why not</button>' +
        '<button class="cb-btn cb-btn-secondary" data-customize>Picky mode</button>' +
      '</div>';

    banner.querySelector('button[data-accept]').addEventListener('click', onAccept);
    banner.querySelector('button[data-customize]').addEventListener('click', showCustomize);
    document.body.appendChild(banner);
  }

  // ── Init ─────────────────────────────────────────────────────────────────

  document.addEventListener('DOMContentLoaded', function () {
    injectBanner();
    var consent = readPrefs().ga_consent;
    if (consent === 'granted') {
      grantAnalytics();
    } else if (!consent) {
      showBanner();
    }
    // If "denied", consent remains at default (all denied) — no update needed
  });
})();
