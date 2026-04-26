"use strict";

const bear = document.getElementById("dragon"); // reaproveitando o mesmo id
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
// CONFIG
// ========================
const N = 35; // menos segmentos pra ficar mais "gordinho"
const elems = [];

const pointer = { x: width / 2, y: height / 2 };

let rad = 0;
let frm = Math.random();

// ========================
// CRIA ELEMENTOS
// ========================
const prepend = (use, i) => {
    const elem = document.createElementNS(xmlns, "use");
    elem.setAttributeNS(xlink, "href", "#" + use);
    bear.prepend(elem);

    elems[i].use = elem;
};

// posições iniciais
for (let i = 0; i < N; i++) {
    elems[i] = {
        use: null,
        x: width / 2,
        y: height / 2
    };
}

// monta o urso
for (let i = 1; i < N; i++) {
    if (i === 1) prepend("BearHead", i);
    else prepend("BearBody", i);
}

// raio de movimento
let radm = Math.min(width, height) / 2;

// ========================
// LOOP
// ========================
const run = () => {
    requestAnimationFrame(run);

    let e = elems[0];

    // movimento mais suave (urso = mais pesado)
    const ax = (Math.cos(2 * frm) * rad * width) / height;
    const ay = (Math.sin(2 * frm) * rad * height) / width;

    e.x += (ax + pointer.x - e.x) / 15;
    e.y += (ay + pointer.y - e.y) / 15;

    for (let i = 1; i < N; i++) {
        let e = elems[i];
        let ep = elems[i - 1];

        const a = Math.atan2(e.y - ep.y, e.x - ep.x);

        // corpo mais "mole"
        e.x += (ep.x - e.x + (Math.cos(a) * (80 - i)) / 5) / 5;
        e.y += (ep.y - e.y + (Math.sin(a) * (80 - i)) / 5) / 5;

        // escala mais arredondada
        const s = (140 + 3 * (1 - i)) / 50;

        e.use.setAttribute(
            "transform",
            `translate(${(ep.x + e.x) / 2}, ${(ep.y + e.y) / 2})
             rotate(${(180 / Math.PI) * a})
             scale(${s}, ${s})`
        );
    }

    if (rad < radm) rad++;

    frm += 0.002; // mais lento que o dragão

    // volta pro centro
    if (rad > 50) {
        pointer.x += (width / 2 - pointer.x) * 0.03;
        pointer.y += (height / 2 - pointer.y) * 0.03;
    }
};

run();

// ========================
// MOUSE
// ========================
window.addEventListener("pointermove", (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    rad = 0;
});