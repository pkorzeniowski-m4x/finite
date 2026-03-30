const stats = {
  years: '20+',
  clients: '500+',
  successrate: '25+'
}

let currentLanguage = 'pl';

const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');
if (mobileToggle && navMenu) {
  mobileToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    const isOpen = navMenu.classList.contains('active');
    mobileToggle.setAttribute('aria-expanded', isOpen);
  });
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
    });
  });
}

const learnmorebuttons = document.querySelectorAll(".service-link");

learnmorebuttons.forEach(button => {
    button.addEventListener("click", function(e) {
        e.preventDefault();
        const card = this.closest('.service-card');

        if (this.classList.contains('back-button')) {
            card.classList.remove('flipped');
            return;
        }

        card.classList.add('flipped');
    });
});

function toggleLanguage() {
  currentLanguage = currentLanguage === 'pl' ? 'en' : 'pl';
  const elementsToTranslate = document.querySelectorAll('[data-eng]');
  const plFlag = document.getElementById('pl-flag');
  const enFlag = document.getElementById('en-flag');

  if (currentLanguage === 'en') {
    plFlag.style.display = 'inline-block';
    enFlag.style.display = 'none';
  } else {
    plFlag.style.display = 'none';
    enFlag.style.display = 'inline-block';
  }
  elementsToTranslate.forEach(element => {
    if (currentLanguage === 'en') {
      if (!element.getAttribute('data-pl')) {
        element.setAttribute('data-pl', element.innerHTML);
      }
      element.innerHTML = element.getAttribute('data-eng');
    } else {
      element.innerHTML = element.getAttribute('data-pl');
    }
  });
}

const langToggleBtn = document.getElementById('language-toggle');
if (langToggleBtn) {
  langToggleBtn.addEventListener('click', toggleLanguage);
}

document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section');

  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              if (entry.target.id === "about") {
                  updateStats();
              }
              observer.unobserve(entry.target);
          }
      });
  }, { threshold: 0.05 });

  sections.forEach(section => {
      section.classList.add('hidden-section');
      observer.observe(section);
  });
});

function updateStats() {
  const yearsElement = document.getElementById("years");
  const clientsElement = document.getElementById("clients");
  const successRateElement = document.getElementById("successrate");

  const targets = {
    years: parseInt(stats.years) || 20,
    clients: parseInt(stats.clients) || 200,
    successrate: parseInt(stats.successrate) || 25
  };

  let current = { years: 0, clients: 0, successrate: 0 };

  const duration = 1500;
  const fps = 60;
  const interval = 1000 / fps;
  const steps = duration / interval;

  const increment = {
    years: targets.years / steps,
    clients: targets.clients / steps,
    successrate: targets.successrate / steps
  };

  const counter = setInterval(() => {
    current.years += increment.years;
    current.clients += increment.clients;
    current.successrate += increment.successrate;

    yearsElement.textContent = Math.min(Math.round(current.years), targets.years) + '+';
    clientsElement.textContent = Math.min(Math.round(current.clients), targets.clients) + '+';
    successRateElement.textContent = Math.min(Math.round(current.successrate), targets.successrate) + '+';

    if (current.years >= targets.years &&
        current.clients >= targets.clients &&
        current.successrate >= targets.successrate) {
      clearInterval(counter);
    }
  }, interval);
}
