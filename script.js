// Scroll-reveal (including the signature wipe), and pausing the hero video
// for people who prefer reduced motion.
// If anything here fails, content stays visible (the .js class only hides things once this runs).
document.addEventListener('DOMContentLoaded', () => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced) {
    document.querySelectorAll('video').forEach((v) => {
      v.removeAttribute('autoplay');
      v.pause();
    });
  }

  const targets = document.querySelectorAll('.reveal, .signature');
  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('in'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  targets.forEach((el) => io.observe(el));
});

// Human | Agent toggle. "#agent" in the address opens the agent view directly.
(() => {
  const root = document.documentElement;
  const buttons = document.querySelectorAll('[data-view]');

  function setView(view, updateUrl) {
    root.dataset.view = view;
    document.querySelectorAll('.view-toggle button').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.view === view));
    });
    if (updateUrl) {
      try {
        history.replaceState(null, '', view === 'agent' ? '#agent' : location.pathname + location.search);
      } catch (e) { /* fine without it */ }
      window.scrollTo(0, 0);
    }
  }

  buttons.forEach((b) => b.addEventListener('click', () => setView(b.dataset.view, true)));
  window.addEventListener('hashchange', () => setView(location.hash === '#agent' ? 'agent' : 'human', false));
  if (location.hash === '#agent') setView('agent', false);

  const copyBtn = document.getElementById('copy-md');
  const md = document.getElementById('agent-md');
  if (copyBtn && md) {
    copyBtn.addEventListener('click', async () => {
      const text = md.textContent;
      try {
        await navigator.clipboard.writeText(text);
      } catch (e) {
        const r = document.createRange(); r.selectNodeContents(md);
        const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
        try { document.execCommand('copy'); } catch (e2) { /* user can select manually */ }
        sel.removeAllRanges();
      }
      const old = copyBtn.textContent;
      copyBtn.textContent = 'Copied';
      setTimeout(() => { copyBtn.textContent = old; }, 1600);
    });
  }
})();
