const container = document.getElementById("petals");

function createPetal() {
  const petal = document.createElement("div");
  petal.classList.add("petal");

  // SVG dentro da pétala
  petal.innerHTML = `
    <svg viewBox="0 0 32 32">
      <path d="M16 2C22 8 28 14 16 30C4 14 10 8 16 2Z"
            fill="url(#grad${Date.now()})"/>
      <defs>
        <radialGradient id="grad${Date.now()}" cx="30%" cy="30%">
          <stop offset="0%" stop-color="#ffd1dc"/>
          <stop offset="100%" stop-color="#ff6f91"/>
        </radialGradient>
      </defs>
    </svg>
  `;

  const startX = window.innerWidth + 50;
  const startY = Math.random() * window.innerHeight;

  const wave1 = (Math.random() - 0.5) * 100;
  const wave2 = (Math.random() - 0.5) * 200;
  const wave3 = (Math.random() - 0.5) * 150;
  const wave4 = (Math.random() - 0.5) * 250;

  const duration = 8 + Math.random() * 6;
  const delay = Math.random() * 3;

  const size = 12 + Math.random() * 18;

  // profundidade (🔥 faz MUITA diferença)
  const blur = Math.random() * 2;
  const opacity = 0.5 + Math.random() * 0.5;

  petal.style.setProperty("--x", `${startX}px`);
  petal.style.setProperty("--y", `${startY}px`);
  petal.style.setProperty("--wave1", `${wave1}px`);
  petal.style.setProperty("--wave2", `${wave2}px`);
  petal.style.setProperty("--wave3", `${wave3}px`);
  petal.style.setProperty("--wave4", `${wave4}px`);

  petal.style.width = `${size}px`;
  petal.style.height = `${size}px`;

  petal.style.filter = `blur(${blur}px)`;
  petal.style.opacity = opacity;

  petal.style.animation = `sakuraFall ${duration}s ease-in-out ${delay}s forwards`;

  container.appendChild(petal);

  setTimeout(() => petal.remove(), (duration + delay) * 1000);
}

// spawn contínuo 
    setInterval(() => { if (document.getElementById("main").classList.contains("hovered")) { createPetal(); } }, 250);