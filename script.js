// Countdown
function updateCountdown() {
  const wedding = new Date('2026-11-14T16:00:00');
  const now = new Date();
  const diff = wedding - now;

  if (diff <= 0) {
    document.getElementById('cd-days').textContent = '00';
    document.getElementById('cd-hours').textContent = '00';
    document.getElementById('cd-mins').textContent = '00';
    document.getElementById('cd-secs').textContent = '00';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('cd-days').textContent = String(days).padStart(3, '0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('cd-mins').textContent = String(mins).padStart(2, '0');
  document.getElementById('cd-secs').textContent = String(secs).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// FAQ toggle
function toggleFaq(btn) {
  const item = btn.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// Mobile nav
function toggleMenu() {
  document.getElementById('navbar').classList.toggle('nav-mobile-open');
}

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('navbar').classList.remove('nav-mobile-open');
  });
});

// RSVP form
function submitRsvp(e) {
  e.preventDefault();
  document.querySelector('.rsvp-form').style.display = 'none';
  document.getElementById('rsvp-thanks').style.display = 'block';
}

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.celeb-card, .lugar-card, .faq-item, .cd-item, .historia-text, .historia-img-wrap, .dress-card').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 50) {
    nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
  } else {
    nav.style.boxShadow = 'none';
  }
});
