// La Casa — fondo continuo del recorrido: tres estados, uno por casa.
// Blanco (primera casa, la infancia) → negro (desde el incendio y toda la segunda casa)
// → azul (tercera casa: haber crecido, esperanza y nostalgia). El color cambia con el scroll.
'use strict';
// Colores de cada estado. Se pueden ajustar acá.
const FONDO={blanco:[244,244,241],negro:[11,11,13],azul:[44,72,119]};
// Puntos del recorrido donde cada estado está completo (fase virtual, ver S en casa.js).
function tramosFondo(){return [
 [0,FONDO.blanco],
 [1.5,FONDO.blanco],
 [3.4,FONDO.blanco], // the first passage slowly gathers shadow
 [4.5,FONDO.blanco],
 [S.p6.s+.35,FONDO.blanco],       // el fuego: hasta acá todavía es la primera casa
 [S.p7.s-.1,FONDO.negro],          // después del incendio ya es negro (Mamá, segunda casa)
 [S.p11.s+.3,FONDO.negro],        // vuelve la luz en la oscuridad: queda el baldío
 [S.p12.s+.3,FONDO.azul],          // la cerámica: tercera casa
 [1e9,FONDO.azul]]}
function colorFondoCasa2(v){return v>=9.6?FONDO.azul.slice():FONDO.negro.slice()}
function colorFondoTerrero(v){return FONDO.blanco.slice()}
function colorFondo(v){if(v>=8.6&&v<12.6)return colorFondoCasa2(v);if(v>=12.6&&v<15.8)return colorFondoTerrero(v);const t=tramosFondo();for(let i=1;i<t.length;i++){if(v<=t[i][0]){const [a,ca]=t[i-1],[b,cb]=t[i],k=b>a?Math.max(0,Math.min(1,(v-a)/(b-a))):1,e=k*k*(3-2*k);return ca.map((c,j)=>Math.round(c+(cb[j]-c)*e))}}return t[t.length-1][1]}
const capaFondo=$('casa-fondo');
function fondoOscuro(v){const c=colorFondo(Math.max(0,v));return (.2126*c[0]+.7152*c[1]+.0722*c[2])/255<.42}
function renderFondo(){
 const v=Math.max(0,current),casa2Nueva=v>=8.6&&v<15.8,black=v>=6.9&&!casa2Nueva,c=black?[0,0,0]:colorFondo(v);
 // Aparece cuando el papel ya tapó el video del umbral y se retira al volver a él, antes de salir.
 const alfa=adentro()?(black||casa2Nueva?1:lowEase(.95,1.1,v)*(1-lowEase(21.05,21.85,v))):0;
 capaFondo.style.backgroundBlendMode=v<S.p6.s+.35?'normal':'multiply';
 capaFondo.style.backgroundImage=black||casa2Nueva?'none':'';
 capaFondo.style.backgroundColor='rgb('+c.join(',')+')';capaFondo.style.opacity=alfa.toFixed(3);
 body.classList.toggle('fondo-tinta-clara',adentro()&&alfa>.5&&fondoOscuro(v));
 requestAnimationFrame(renderFondo);
}
requestAnimationFrame(renderFondo);
