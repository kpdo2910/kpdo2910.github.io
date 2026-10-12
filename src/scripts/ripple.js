// Touch ripple on tappable cards and buttons, like Flutter's InkWell. Touch and pen only: with a
// mouse, the hover colors already give feedback. Styles: "Touch ripple" in global.css.

const HOSTS = [
  '.card',
  '.xp-card',
  '.sbtn',
  '.pill',
  '.chip-btn',
  'a.chip',
  '.lang-toggle',
  '.lang-btn',
  '.modal-close',
  '.to-top',
  '.tab',
  '.tl-body',
  '.pager-link',
].join(', ');

// Wait this long before showing the splash, so starting a scroll on a card doesn't flash it.
const PRESS_DELAY = 90;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function splash(host, x, y) {
  if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
  const box = host.getBoundingClientRect();
  const left = x - box.left;
  const top = y - box.top;
  const radius = Math.hypot(Math.max(left, box.width - left), Math.max(top, box.height - top));

  const ink = document.createElement('span');
  ink.className = 'ink';
  const dot = document.createElement('span');
  dot.className = 'ink-dot';
  Object.assign(dot.style, {
    left: `${left - radius}px`,
    top: `${top - radius}px`,
    width: `${radius * 2}px`,
    height: `${radius * 2}px`,
  });
  ink.append(dot);
  host.append(ink);

  if (!reduceMotion.matches) {
    dot.animate([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], {
      duration: 450,
      easing: 'cubic-bezier(0.2, 0, 0, 1)',
      fill: 'forwards',
    });
  }
  // Fading out keeps the splash growing, so even a quick tap shows a full ripple.
  return () => {
    dot.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 320, easing: 'ease-out', fill: 'forwards' })
      .finished.then(() => ink.remove(), () => ink.remove());
  };
}

document.addEventListener(
  'pointerdown',
  (event) => {
    if (event.pointerType === 'mouse' || !event.isPrimary) return;
    const host = event.target.closest(HOSTS);
    if (!host || host.disabled) return;

    const { clientX, clientY } = event;
    let fade = null;
    const timer = setTimeout(() => {
      fade = splash(host, clientX, clientY);
    }, PRESS_DELAY);

    // A quick tap gets its ripple right away on release (before a link starts navigating);
    // a press that turns into a scroll (pointercancel) gets none.
    const end = (cancelled) => {
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onCancel);
      clearTimeout(timer);
      if (!fade && !cancelled) fade = splash(host, clientX, clientY);
      fade?.();
    };
    const onUp = () => end(false);
    const onCancel = () => end(true);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onCancel);
  },
  { passive: true },
);
