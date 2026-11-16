# Música de entrada

El clic que derriba la ventana ya no inicia Sirens. El primer avance por scroll
con la ventana abierta solicita reproducción a volumen cero. Durante la primera
aproximación, el volumen usa una curva cúbica del progreso multiplicada por .55
(volumen normal existente, no el máximo del dispositivo).

El fade no depende de un temporizador: detenerse mantiene el nivel y retroceder
antes de entrar lo reduce hasta cero. Al alcanzar el teaser se completa la entrada
y el volumen deja de depender del scroll interior. Si se retrocede por la ventana
original y se vuelve al exterior, el fade vuelve a bajar hasta cero. Se usa el
menor progreso entre cámara y destino para responder al retroceso sin demora.
La opción «MÚSICA: SÍ/NO» de la landing está oculta; queda el reproductor interior.
Se conservan los controles y la mezcla interna existentes. Una pausa voluntaria
no se revierte por hacer scroll. Reiniciar la experiencia rearma el fade inicial.

QA: `.qa-crops/entry-music-scroll-test.cjs` genera el fixture de navegador; resultado
en `.qa-crops/entry-music-scroll-live.json`. Se verifican con eventos de rueda
inicio, silencio del primer
fotograma, proporción de volumen, reversibilidad, estabilidad, finalización y
pausa/reproducción manual. La regresión de sensibilidad del scroll sigue pasando.

La reproducción sigue dependiendo de los permisos multimedia del navegador;
si se bloquea, queda disponible el control manual de música para reintentar.