document.documentElement.classList.add('js');

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

function closeMenu() {
  if (!menuToggle || !navigation) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
  navigation.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}

menuToggle?.addEventListener('click', () => {
  const willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(willOpen));
  menuToggle.setAttribute('aria-label', willOpen ? 'Fechar menu' : 'Abrir menu');
  navigation?.classList.toggle('is-open', willOpen);
  document.body.classList.toggle('menu-open', willOpen);
});

navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

window.addEventListener('resize', () => {
  if (window.innerWidth > 860) closeMenu();
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');

if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px' },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

document.querySelectorAll('.faq-list details').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('.faq-list details[open]').forEach((openItem) => {
      if (openItem !== item) openItem.removeAttribute('open');
    });
  });
});

const clientCarouselViewport = document.querySelector('.client-carousel-viewport');
const clientCarouselTrack = document.querySelector('.client-track');
let carouselResumeTimer;

function moveClientCarousel(direction) {
  if (!clientCarouselViewport || !clientCarouselTrack) return;

  window.clearTimeout(carouselResumeTimer);
  clientCarouselTrack.classList.add('is-paused');
  clientCarouselViewport.scrollBy({
    left: direction * Math.min(clientCarouselViewport.clientWidth * 0.72, 620),
    behavior: reducedMotion ? 'auto' : 'smooth',
  });

  carouselResumeTimer = window.setTimeout(() => {
    clientCarouselTrack.classList.remove('is-paused');
  }, 1600);
}

document.querySelectorAll('[data-carousel-direction]').forEach((button) => {
  button.addEventListener('click', () => {
    moveClientCarousel(button.dataset.carouselDirection === 'next' ? 1 : -1);
  });
});

const roiForm = document.querySelector('#roi-form');
const errorMessage = document.querySelector('#form-error');
const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
});
const integer = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 });

function valueOf(id) {
  return Number(document.querySelector(`#${id}`)?.value || 0);
}

function resetResults() {
  document.querySelector('#extra-revenue').textContent = '—';
  document.querySelector('#extra-sales').textContent = '—';
  document.querySelector('#roi-value').textContent = '—';
  document.querySelector('#payback-value').textContent = '—';
  if (errorMessage) {
    errorMessage.hidden = true;
    errorMessage.textContent = '';
  }
}

function calculateROI(event) {
  event?.preventDefault();

  const stores = valueOf('stores');
  const customers = valueOf('customers');
  const currentRate = valueOf('currentRate');
  const futureRate = valueOf('futureRate');
  const ticket = valueOf('ticket');
  const investment = valueOf('investment');

  const invalidBase = stores <= 0 || customers < 0 || ticket < 0;
  const invalidRates = currentRate < 0 || currentRate > 100 || futureRate < 0 || futureRate > 100;

  if (invalidBase || invalidRates || futureRate <= currentRate) {
    resetResults();
    if (errorMessage) {
      errorMessage.textContent = 'Revise os campos. A taxa futura deve ser maior que a taxa atual.';
      errorMessage.hidden = false;
    }
    return;
  }

  const rateDifference = (futureRate - currentRate) / 100;
  const extraSales = stores * customers * rateDifference;
  const extraRevenue = extraSales * ticket;
  const roi = investment > 0 ? ((extraRevenue - investment) / investment) * 100 : null;
  const payback = investment > 0 && extraRevenue > 0 ? investment / extraRevenue : null;

  document.querySelector('#extra-revenue').textContent = currency.format(extraRevenue);
  document.querySelector('#extra-sales').textContent = integer.format(extraSales);
  document.querySelector('#roi-value').textContent = roi === null ? 'Informe o investimento' : `${integer.format(roi)}%`;
  document.querySelector('#payback-value').textContent = payback === null ? 'Informe o investimento' : `${payback.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} mês(es)`;

  if (errorMessage) {
    errorMessage.hidden = true;
    errorMessage.textContent = '';
  }
}

roiForm?.addEventListener('submit', calculateROI);
roiForm?.addEventListener('reset', () => window.setTimeout(resetResults));

const currentYear = document.querySelector('#current-year');
if (currentYear) currentYear.textContent = String(new Date().getFullYear());
