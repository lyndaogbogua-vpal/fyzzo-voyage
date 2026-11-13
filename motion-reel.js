// Motion slides ("mreel"): auto-advancing animated story slides.
// - Fills the intake slide from CONFIG.getIntakeSchedule() (app.js), so it moves to the next intake by itself
// - Story-style progress bars, arrows, swipe, keyboard, pause button
// - Pauses on hover/focus, when the tab is hidden or the slider is off-screen
// - Respects prefers-reduced-motion (no autoplay)
(function () {
    const root = document.getElementById('mreel');
    if (!root) return;

    const SLIDE_MS = 7000;
    const slides = Array.from(root.querySelectorAll('.mreel-slide'));
    const barsEl = root.querySelector('.mreel-bars');
    const pauseBtn = root.querySelector('.mreel-pause');
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Intake text from the shared intake calendar
    try {
        const s = CONFIG.getIntakeSchedule();
        const fmt = d => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        const set = (key, val) => root.querySelectorAll('[data-mreel="' + key + '"]').forEach(el => { el.textContent = val; });
        set('kicker', 'UK ' + s.primaryTerm.toUpperCase() + ' ' + s.primaryYear + ' INTAKE' + (s.finalCalls ? ' · FINAL CALLS' : ''));
        set('term', s.primaryTerm + ' ' + s.primaryYear);
        set('countdown', 'About ' + s.weeksLeft + ' weeks until courses start. Aim to have your offer and funds ready by ' + fmt(s.cutoffDate) + '.');
    } catch (e) { /* keep the default text in the HTML */ }

    // Progress bars
    const bars = slides.map((_, n) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('role', 'tab');
        b.setAttribute('aria-label', 'Slide ' + (n + 1));
        b.innerHTML = '<span><i></i></span>';
        b.addEventListener('click', () => go(n, true));
        barsEl.appendChild(b);
        return b;
    });

    let i = 0, elapsed = 0, last = Date.now();
    let userPaused = reduce, hoverPaused = false, visible = true;
    let dayTimer = null;

    function countDays(slide) {
        const el = slide.querySelector('[data-mreel="day"]');
        if (!el) return;
        clearInterval(dayTimer);
        if (reduce) { el.textContent = '28'; return; }
        let d = 1; el.textContent = '1';
        dayTimer = setInterval(() => { d++; el.textContent = String(d); if (d >= 28) clearInterval(dayTimer); }, 3000 / 28);
    }

    function go(n, fromUser) {
        n = (n + slides.length) % slides.length;
        slides[i].classList.remove('is-active');
        slides[i].setAttribute('aria-hidden', 'true');
        i = n;
        const s = slides[i];
        void s.offsetWidth;            // restart CSS animations
        s.classList.add('is-active');
        s.removeAttribute('aria-hidden');
        bars.forEach((b, k) => {
            b.classList.toggle('is-done', k < i);
            b.setAttribute('aria-selected', k === i ? 'true' : 'false');
            b.querySelector('i').style.width = k < i ? '100%' : '0';
        });
        countDays(s);
        elapsed = 0;
        if (fromUser) last = Date.now();
    }

    // A plain timer (not requestAnimationFrame) so it also runs in in-app browsers that throttle frames
    function tick() {
        const now = Date.now();
        const dt = Math.min(now - last, 500); last = now;
        const running = !userPaused && !hoverPaused && visible && !document.hidden;
        if (running) {
            elapsed += dt;
            bars[i].querySelector('i').style.width = Math.min(100, elapsed / SLIDE_MS * 100) + '%';
            if (elapsed >= SLIDE_MS) go(i + 1);
        }
    }

    // Controls
    root.querySelector('.mreel-prev').addEventListener('click', () => go(i - 1, true));
    root.querySelector('.mreel-next').addEventListener('click', () => go(i + 1, true));
    function setPaused(p) {
        userPaused = p;
        pauseBtn.textContent = p ? '▶' : '❚❚';
        pauseBtn.setAttribute('aria-label', p ? 'Play slides' : 'Pause slides');
    }
    pauseBtn.addEventListener('click', () => setPaused(!userPaused));
    setPaused(userPaused);
    root.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') { go(i + 1, true); e.preventDefault(); }
        if (e.key === 'ArrowLeft') { go(i - 1, true); e.preventDefault(); }
    });
    root.addEventListener('mouseenter', () => { hoverPaused = true; });
    root.addEventListener('mouseleave', () => { hoverPaused = false; });

    // Swipe on phones
    let x0 = null, y0 = null;
    root.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    root.addEventListener('touchend', e => {
        if (x0 === null) return;
        const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) go(i + (dx < 0 ? 1 : -1), true);
        x0 = null;
    }, { passive: true });

    // Only run while on screen
    if ('IntersectionObserver' in window) {
        let seen = false;
        new IntersectionObserver(es => {
            visible = es[0].isIntersecting;
            // Replay the current slide the first time the visitor scrolls to it
            if (visible && !seen) { seen = true; go(i, true); }
        }, { threshold: 0.35 }).observe(root);
    }

    slides.forEach((s, k) => { if (k) s.setAttribute('aria-hidden', 'true'); });
    go(0);
    setInterval(tick, 100);
})();
