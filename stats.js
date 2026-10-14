/*
 * Basic visit counts for Ellipsa's site: the page, the site you came from (and any utm_source), and
 * whether you asked for the beta, joined the waitlist or played the film. No cookies, nothing stored in
 * your browser; the relay adds the country and phone-or-computer and counts a visitor once a day
 * without keeping your address. See privacy.html, section 5.
 */
(() => {
  const URL_ = 'https://ellipsa-proxy.ellipsa.workers.dev/hit';
  const source = new URLSearchParams(location.search).get('utm_source') || '';
  const send = event => {
    try {
      const body = JSON.stringify({ path: location.pathname, referrer: document.referrer, source, event });
      if (!navigator.sendBeacon?.(URL_, body)) fetch(URL_, { method: 'POST', body, keepalive: true, mode: 'no-cors' }).catch(() => {});
    } catch { /* counting never gets in the way */ }
  };
  send('view');
  document.addEventListener('ellipsa:beta', () => send('beta_request'));
  document.addEventListener('ellipsa:waitlist', () => send('waitlist_join'));
  for (const video of document.querySelectorAll('video')) video.addEventListener('play', () => send('film_play'), { once: true });
  // Where visitors stop on the way to asking: clicked "Get the beta", reached the form, started on it
  for (const link of document.querySelectorAll('a[href="#get"]')) link.addEventListener('click', () => send('cta_click'), { once: true });
  const form = document.getElementById('beta');
  if (form && 'IntersectionObserver' in window) {
    const seen = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { send('form_seen'); seen.disconnect(); }
    }, { threshold: 0.5 });
    seen.observe(form);
  }
  form?.addEventListener('focusin', () => send('form_start'), { once: true });
})();
