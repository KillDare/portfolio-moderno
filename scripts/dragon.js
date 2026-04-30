"use strict";

const dragon = document.getElementById("dragon");
const xmlns = "http://www.w3.org/2000/svg";
const xlink = "http://www.w3.org/1999/xlink";

// ========================
// DIMENSÕES
// ========================
let width, height;

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

// ========================
// VARIÁVEIS PRINCIPAIS
// ========================
const N = 40;
const elems = [];

const pointer = { x: width / 2, y: height / 2 };

let rad = 0;
let frm = Math.random();

// ========================
// CRIA ELEMENTOS
// ========================
const prepend = (use, i) => {
    const elem = document.createElementNS(xmlns, "use");
    elem.setAttributeNS(xlink, "href", "#" + use); // atualizado (xlink deprecated)
    dragon.prepend(elem);

    elems[i].use = elem;
};

// inicializa posições
for (let i = 0; i < N; i++) {
    elems[i] = {
        use: null,
        x: width / 2,
        y: height / 2
    };
}

// cria partes do dragão
for (let i = 1; i < N; i++) {
    if (i === 1) prepend("Cabeza", i);
    else if (i === 8 || i === 14) prepend("Aletas", i);
    else prepend("Espina", i);
}

// raio máximo dinâmico
let radm = Math.min(width, height) / 2;

// ========================
// LOOP DE ANIMAÇÃO
// ========================
const run = () => {
    requestAnimationFrame(run);

    let e = elems[0];

    const ax = (Math.cos(3 * frm) * rad * width) / height;
    const ay = (Math.sin(4 * frm) * rad * height) / width;

    e.x += (ax + pointer.x - e.x) / 10;
    e.y += (ay + pointer.y - e.y) / 10;

    for (let i = 1; i < N; i++) {
        let e = elems[i];
        let ep = elems[i - 1];

        const a = Math.atan2(e.y - ep.y, e.x - ep.x);

        e.x += (ep.x - e.x + (Math.cos(a) * (100 - i)) / 5) / 4;
        e.y += (ep.y - e.y + (Math.sin(a) * (100 - i)) / 5) / 4;

        const s = (162 + 4 * (1 - i)) / 80;

        e.use.setAttribute(
            "transform",
            `translate(${(ep.x + e.x) / 2}, ${(ep.y + e.y) / 2})
             rotate(${(180 / Math.PI) * a})
             scale(${s}, ${s})`
        );
    }

    if (rad < radm) rad++;

    frm += 0.003;

    // volta pro centro quando para
    if (rad > 60) {
        pointer.x += (width / 2 - pointer.x) * 0.05;
        pointer.y += (height / 2 - pointer.y) * 0.05;
    }
};

run();

// ========================
// INPUT DO MOUSE
// ========================
window.addEventListener("pointermove", (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    rad = 0;
});