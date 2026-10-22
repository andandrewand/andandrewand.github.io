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
