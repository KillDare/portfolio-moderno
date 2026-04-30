// HEADER - VERIFICA E CONTROLA A SEÇÃO ATIVA
const sections = document.querySelectorAll("section");
const menuItems = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.id;

      menuItems.forEach((item) => {
        item.classList.toggle(
          "nav-link-active",
          item.getAttribute("href") === `#${id}`,
        );
      });
    });
  },
  {
    rootMargin: "-50% 0px -50% 0px",
    threshold: 0,
  },
);
sections.forEach((section) => observer.observe(section));

// HEADER - BACKGROUND DINAMICO
const header = document.querySelector("header");
const mainSection = document.getElementById("main");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const sectionHeight = mainSection.offsetHeight;

  let progress = scrollY / sectionHeight;

  progress = Math.min(Math.max(progress, 0), 1);

  header.style.backgroundColor = `rgba(0, 0, 0, ${progress})`;

  header.style.backdropFilter = `blur(${progress * 10}px)`;
});

// HERO - TEXTO DINAMICO
const heroText = document.getElementById("hero-text");
const heroTexts = [
  "Fullstack Developer",
  "Backend Developer",
  "Frontend Developer",
  "Software Engineer",
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentText = heroTexts[textIndex];

  if (isDeleting) {
    heroText.textContent = currentText.substring(0, charIndex--);
  } else {
    heroText.textContent = currentText.substring(0, charIndex++);
  }

  let speed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentText.length + 1) {
    speed = 1500; // pausa antes de apagar
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % heroTexts.length;
    speed = 500; // pausa antes de digitar próximo
  }

  setTimeout(typeEffect, speed);
}

typeEffect();


// MAIN - BACKGROUND DINAMICO
const hero = document.getElementById('hero-card');
const main = document.getElementById('main');
const body = document.getElementsByTagName('body')[0];

hero.addEventListener('mouseenter', () => {
  main.classList.add('hovered');
  body.classList.add('light');
});

hero.addEventListener('mouseleave', () => {
  main.classList.remove('hovered');
  body.classList.remove('light');
});