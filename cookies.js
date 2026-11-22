(() => {
  const key = 'marbud.ukryjBanerCookies';
  const policyUrl = new URL('polityka-prywatnosci.html#cookies', document.currentScript.src);
  const notice = document.createElement('aside');
  notice.className = 'cookie-notice';
  notice.setAttribute('aria-labelledby', 'cookie-notice-title');
  notice.innerHTML = `
    <strong id="cookie-notice-title">Pliki cookies</strong>
    <p>Ta strona nie używa plików cookies ani narzędzi reklamowych.</p>
    <div class="cookie-actions">
      <a>Polityka prywatności</a>
      <button type="button">Ukryj w tej karcie</button>
    </div>`;
  notice.querySelector('a').href = policyUrl.href;
  const dismiss = notice.querySelector('button');
  const reopen = document.getElementById('show-cookie-notice');

  function readPreference() {
    try {
      notice.hidden = sessionStorage.getItem(key) === '1';
    } catch {
      // Przeglądarka może blokować pamięć sesji. Baner nadal można zamknąć.
    }
  }

  readPreference();
  document.body.append(notice);
  window.addEventListener('pageshow', event => {
    if (event.persisted) readPreference();
  });
  dismiss.addEventListener('click', () => {
    notice.hidden = true;
    try { sessionStorage.setItem(key, '1'); } catch {}
    if (reopen && reopen.getBoundingClientRect().top >= 0 &&
        reopen.getBoundingClientRect().bottom <= innerHeight) {
      reopen.focus({preventScroll: true});
    }
  });
  if (reopen) {
    reopen.hidden = false;
    reopen.addEventListener('click', () => {
      try { sessionStorage.removeItem(key); } catch {}
      notice.hidden = false;
      dismiss.focus({preventScroll: true});
    });
  }
})();
