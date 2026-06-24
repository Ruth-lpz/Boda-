// Countdown to 14 Nov 2026 4:00 PM
function updateCountdown() {
  const target = new Date('2026-11-14T16:00:00');
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) {
    ['cd-days','cd-hours','cd-mins','cd-secs'].forEach(id => {
      document.getElementById(id).textContent = '00';
    });
    return;
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  document.getElementById('cd-days').textContent  = String(d).padStart(3, '0');
  document.getElementById('cd-hours').textContent = String(h).padStart(2, '0');
  document.getElementById('cd-mins').textContent  = String(m).padStart(2, '0');
  document.getElementById('cd-secs').textContent  = String(s).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// FAQ accordion
function toggleFaq(btn) {
  const item = btn.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// Mobile nav
function toggleMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

// RSVP form
function submitRsvp(e) {
  e.preventDefault();
  e.target.style.display = 'none';
  document.getElementById('rsvp-thanks').style.display = 'block';
}

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.inv-text-layer, .inv-photo-wrap, .cd-content, ' +
  '.bigday-title-overlay, .bigday-schedule, ' +
  '.lugar-card, .sched-item, .faq-item, ' +
  '.dress-body-wrap, .rsvp-form'
).forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// Stagger schedule items
document.querySelectorAll('.sched-item').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.08}s`;
});

// Navbar transparency on scroll
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 80) {
    nav.style.background = 'rgba(17,16,16,0.95)';
  } else {
    nav.style.background = 'rgba(17,16,16,0.75)';
  }
});
