// Supabase client
let db;
if (typeof supabase !== 'undefined' && typeof SUPABASE_URL !== 'undefined' && SUPABASE_URL !== 'https://TU_PROYECTO.supabase.co') {
  db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
}

// Countdown to 14 Nov 2026 4:00 PM
function updateCountdown() {
  const daysEl  = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl  = document.getElementById('cd-mins');
  const secsEl  = document.getElementById('cd-secs');
  if (!daysEl) return;

  const target = new Date('2026-11-14T16:00:00');
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) {
    [daysEl, hoursEl, minsEl, secsEl].forEach(el => el.textContent = '00');
    return;
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  daysEl.textContent  = String(d).padStart(3, '0');
  hoursEl.textContent = String(h).padStart(2, '0');
  minsEl.textContent  = String(m).padStart(2, '0');
  secsEl.textContent  = String(s).padStart(2, '0');
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
async function submitRsvp(e) {
  e.preventDefault();
  const form = e.target;
  const btn  = form.querySelector('.rsvp-btn');
  btn.disabled = true;
  btn.textContent = 'Enviando...';

  const nombre   = document.getElementById('rsvp-nombre').value.trim();
  const pases    = parseInt(document.getElementById('rsvp-pases').value, 10);
  const estado   = document.getElementById('rsvp-asiste').value;
  const tel      = document.getElementById('rsvp-tel').value.trim();
  const mensaje  = document.getElementById('rsvp-mensaje').value.trim();

  if (db) {
    const { error } = await db.from('invitados').insert({
      nombre,
      pases,
      estado,
      tel: tel || null,
      mensaje: mensaje || null,
      fecha_respuesta: new Date().toISOString(),
    });

    if (error) {
      console.error(error);
      document.getElementById('rsvp-error').style.display = 'block';
      btn.disabled = false;
      btn.textContent = 'Confirmar Asistencia';
      return;
    }
  }

  form.style.display = 'none';
  document.getElementById('rsvp-thanks').style.display = 'block';
}

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
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
  if (!nav) return;
  if (window.scrollY > 80) {
    nav.style.background = 'rgba(237,232,225,0.97)';
  } else {
    nav.style.background = 'rgba(253,252,250,0.88)';
  }
});
