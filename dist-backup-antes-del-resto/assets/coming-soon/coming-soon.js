/* =========================================================
   La Casa — Coming soon
   La casa se incendia a lo largo de una semana. Cuando termina,
   se habilita la entrada a la landing.
   ========================================================= */

/* ---------- Ajustes ---------- */
const AJUSTES = {
  // Momento en que empieza la semana. Formato: "2026-12-01T20:00:00-03:00".
  // Si queda en null, la semana empieza la primera vez que alguien abre la página
  // (se recuerda en ese navegador).
  inicio: null,

  duracionDias: 7,

  // Con "Adelantar", la semana completa pasa en estos segundos.
  segundosModoRapido: 7,

  // Adónde lleva el botón "Entrar" al terminar la semana.
  urlLanding: "landing.html",

  // true = pasa sola a la landing al terminar; false = muestra el botón "Entrar".
  redirigirSolo: false,

  // Opacidad del humo que sigue saliendo de las ruinas cuando termina la semana (0 a 1).
  opacidadHumoFinal: 0.5,

  // Archivos (sin extensión: se elige .webm o .mp4 según el navegador).
  videoBase: "media/casa-base",
};

/* Atajos para probar desde la barra de direcciones:
   ?dia=4.5   → salta a ese momento de la semana (0 a 7)
   ?rapido    → arranca en modo Adelantar
   ?reiniciar → olvida la fecha de inicio guardada                */
const params = new URLSearchParams(location.search);
const integrado=params.has('integrado')&&window.parent!==window;

/* ---------- Formato de video ---------- */
// Chrome, Edge y Firefox muestran el WebM con transparencia real.
// Safari no: usa el MP4 sobre negro, fusionado con "screen" (ver style.css).
const esSafari = /^((?!chrome|chromium|android|crios|fxios).)*safari/i.test(navigator.userAgent);
const EXT = esSafari ? ".mp4" : ".webm";
const CLASE_SIN_ALFA = esSafari ? "sin-alfa" : null;

/* ---------- Tiempo ---------- */
const SEMANA_MS = AJUSTES.duracionDias * 24 * 60 * 60 * 1000;

function leerInicio() {
  if (params.has("reiniciar")) {
    try { localStorage.removeItem("laCasaInicio"); } catch (e) {}
  }
  if (AJUSTES.inicio) return new Date(AJUSTES.inicio).getTime();
  try {
    const guardado = localStorage.getItem("laCasaInicio");
    if (guardado) return Number(guardado);
    const ahora = Date.now();
    localStorage.setItem("laCasaInicio", String(ahora));
    return ahora;
  } catch (e) {
    return Date.now();
  }
}

let inicio = leerInicio();
// "Desfase" que suma el modo Adelantar o el atajo ?dia=
let adelanto = 0;
if (params.has("dia")) {
  const dia = Math.min(Math.max(parseFloat(params.get("dia")) || 0, 0), AJUSTES.duracionDias);
  adelanto = dia * 24 * 3600 * 1000 - (Date.now() - inicio);
}

let rapido = params.has("rapido");
const factorRapido = SEMANA_MS / (AJUSTES.segundosModoRapido * 1000);

/** Progreso de la semana, de 0 a 1 */
function progreso() {
  const p = (Date.now() - inicio + adelanto) / SEMANA_MS;
  return Math.min(Math.max(p, 0), 1);
}

/* ---------- Video base ---------- */
const base = document.getElementById("base");
base.src = AJUSTES.videoBase + EXT;
if (CLASE_SIN_ALFA) base.classList.add(CLASE_SIN_ALFA);

function actualizarBase(p) {
  if (!base.duration) return;
  const fin = base.duration - 1 / 24;
  const destino = p * fin;

  if (rapido && p < 1) {
    // En modo rápido el video se reproduce solo, a la velocidad justa.
    base.playbackRate = base.duration / AJUSTES.segundosModoRapido;
    if (Math.abs(base.currentTime - destino) > 0.4) base.currentTime = destino;
    if (base.paused) base.play().catch(() => {});
  } else {
    // En modo real, el video está quieto y solo se corre al cuadro que toca.
    if (!base.paused) base.pause();
    if (Math.abs(base.currentTime - destino) > 1 / 24) base.currentTime = destino;
  }
}

/* ---------- Fuego y humo: entrada + loop continuo ----------
   Cada etapa tiene dos videos:
   · "<nombre>-entrada": el fuego/humo nace y crece. Se ve una sola vez.
   · "<nombre>": la parte estable, armada para repetirse sin que se note el corte.
   La entrada termina exactamente donde empieza el loop. */
const FUNDIDO = 1.2; // segundos de fundido al entrar o salir de una etapa

const etapas = [...document.querySelectorAll(".loop")].map((div) => {
  const crear = (src, enBucle) => {
    const v = document.createElement("video");
    v.src = src + EXT;
    v.muted = true;
    v.playsInline = true;
    v.preload = "auto";
    v.loop = enBucle;
    if (CLASE_SIN_ALFA) v.classList.add(CLASE_SIN_ALFA);
    div.appendChild(v);
    return v;
  };
  return {
    desde: Number(div.dataset.desde),
    hasta: Number(div.dataset.hasta),
    entrada: crear(div.dataset.src + "-entrada", false),
    bucle: crear(div.dataset.src, true),
    activa: false,
    enBucle: false,
  };
});

function actualizarLoops(dia) {
  for (const E of etapas) {
    // La última etapa sigue activa después del final: humo sutil en loop sobre las ruinas.
    const ultima = E.hasta >= AJUSTES.duracionDias;
    const debe = dia >= E.desde && (dia < E.hasta || ultima);

    // Empieza la etapa: se ve la entrada
    if (debe && !E.activa) {
      E.activa = true;
      E.enBucle = false;
      E.entrada.currentTime = 0;
      E.entrada.play().catch(() => {});
      E.entrada.classList.add("visible");
    }

    // Termina la etapa: se apaga con un fundido
    if (!debe && E.activa) {
      E.activa = false;
      for (const v of [E.entrada, E.bucle]) {
        v.classList.remove("visible");
        setTimeout(() => v.pause(), FUNDIDO * 1000);
      }
    }

    // Pase de la entrada al loop, en el cuadro justo (sin fundido)
    if (E.activa && !E.enBucle) {
      const v = E.entrada;
      if (v.ended || (v.duration && v.currentTime >= v.duration - 1 / 24)) {
        E.enBucle = true;
        E.bucle.currentTime = 0;
        E.bucle.play().catch(() => {});
        E.bucle.style.transition = "none";
        E.bucle.classList.add("visible");
        requestAnimationFrame(() => {
          v.style.transition = "none";
          v.classList.remove("visible");
          v.pause();
          requestAnimationFrame(() => {
            v.style.transition = "";
            E.bucle.style.transition = "";
          });
        });
      }
    }
  }
}

/* ---------- Contador ---------- */
const $ = (id) => document.getElementById(id);
const dos = (n) => String(n).padStart(2, "0");

function actualizarContador(p) {
  let resta = Math.round((1 - p) * SEMANA_MS / 1000);
  const d = Math.floor(resta / 86400); resta -= d * 86400;
  const h = Math.floor(resta / 3600);  resta -= h * 3600;
  const m = Math.floor(resta / 60);    const s = resta - m * 60;
  $("dd").textContent = dos(d);
  $("hh").textContent = dos(h);
  $("mm").textContent = dos(m);
  $("ss").textContent = dos(s);
}

/* ---------- Final de la semana ---------- */
let terminado = false;
function terminar() {
  if (terminado) return;
  terminado = true;
  $("entrar").hidden = true;
  // El humo final queda más tenue
  const ultimaEtapa = document.querySelector('.loop[data-hasta="7"]');
  if (ultimaEtapa) ultimaEtapa.style.opacity = String(AJUSTES.opacidadHumoFinal);
  // Hold the ruins and zero counter while the final smoke keeps looping.
  setTimeout(()=>{
    window.dispatchEvent(new Event('la-casa:teaser-transition'));
    if(integrado)window.parent.postMessage({type:'la-casa:teaser-enter'},location.origin);
    else{
      document.body.style.visibility='hidden';
      location.href='../../index.html?vista=landing';
    }
  },4000);
}

/* Explicit gestures: double accelerates, single restores normal time. */
window.addEventListener('la-casa:teaser-accelerate',()=>{
  if(!terminado)rapido=true;
});
window.addEventListener('la-casa:teaser-normal',()=>{
  if(!terminado)rapido=false;
});

/* ---------- Bucle principal ---------- */
let ultimo = performance.now();
function cuadro(ahora) {
  const dt = ahora - ultimo;
  ultimo = ahora;

  // En modo rápido, el reloj virtual avanza mucho más rápido que el real.
  if (rapido && !terminado) adelanto += dt * (factorRapido - 1);

  const p = progreso();
  actualizarBase(p);
  actualizarLoops(p * AJUSTES.duracionDias);
  actualizarContador(p);
  if (p >= 1) terminar();

  requestAnimationFrame(cuadro);
}
requestAnimationFrame(cuadro);
