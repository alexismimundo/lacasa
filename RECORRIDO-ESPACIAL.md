# Recorrido espacial — primera implementación

El scroll sigue controlando el progreso narrativo, pero no impone la dirección
visual. Rueda hacia abajo / gesto hacia arriba / avance de teclado siguen
avanzando. Invertirlos desanda el mismo trayecto. No hay direcciones sorteadas,
avance automático nuevo, cambios de sensibilidad ni zoom global nuevo.

Mapa central: `dist/continuous/house-route.js`.

## Uniones de grafito vivo

Al abrir deliberadamente la caja centrada (2.3–2.4), salen 32 partículas del
atlas existente `assets/petalos-glicina.png`: ascenso escalonado, deriva lateral,
rotación y desvanecimiento. Restaurada la primera versión del efecto: tamaño
reducido un 28% (aproximadamente 13–22 px de ancho), opacidad hasta 1, origen más bajo dentro de la caja
(60% de la altura de su canvas), ascenso
y deriva lateral originales. Salida escalonada cada .0375 s tras .12 s iniciales,
vida de 3.4–4.15 s por pétalo y limpieza completa a los 5.5 s. Cada apertura genera
un vuelo finito; no emite en
bucle ni al abrirse como receptor de objetos en la esquina. Salir de la escena
limpia el efecto; movimiento reducido lo desactiva. Capa decorativa sin captura
de eventos. QA: `box-leaves-desktop.json` y `box-leaves-mobile.json`.

Con el modelo cargado, las glicinas son sprites en la misma escena Three.js,
con prueba de profundidad y sin escritura de profundidad. Su origen está en
el interior del modelo y sigue su giro; la tapa y las paredes ocultan las
partículas que quedan detrás. El vuelo conserva las trayectorias originales.
La capa DOM se usa solo como alternativa si no carga el modelo. QA adicional:
`box-leaves-depth-desktop.json` y `box-leaves-depth-mobile.json`; la prueba exige
modelo cargado y comprueba oclusión por geometría y revelado al girarla.

El grafito se redibuja con ruido determinista a 28 pasos por segundo: vibración
irregular y de baja amplitud, sin ondas sinusoidales que recorran la línea.
La posición media sigue anclada al borde compartido. En los 12 pasos aparecen
dos marcas perpendiculares cortas (12–20 px de largo), separadas por 38–84 px
para sugerir el ancho de una puerta. Su ubicación varía por paso entre costados
y centro, pero es estable al invertir el scroll. No se abren; comparten la
vibración del grafito, sin formar marcos. Con movimiento reducido el trazo
no vibra. QA: `graphite-table-desktop.json` y `graphite-table-mobile.json`.

En la caja centrada se dibuja una mesa mínima en perspectiva (tablero trapezoidal
y cuatro patas, sin relleno, con borde trasero interrumpido detrás de la caja) con el
mismo grafito. Se traza entre 2.05 y 2.3, permanece completa hasta 2.4 y se
destraza entre 2.4 y 2.62 mientras la caja se achica. La mesa no persigue a la
caja hacia la esquina. Todo el trazado es reversible y transparente al puntero.

`dist/continuous/floor-plan.js` dibuja una sola línea negra texturada justo
en la unión entre las pantallas durante cada transición. No dibuja marcos,
márgenes interiores ni contornos alrededor de los ambientes.
En pasos verticales la línea es horizontal; en pasos laterales es vertical.
Su posición sigue el borde real compartido (curva suave en la primera casa,
progreso lineal en las secciones posteriores). Fuera de las transiciones no
queda un marco visible.

Se conserva el grafito vivo: varias fibras negras con variación de unos dos
píxeles, estática con movimiento reducido. El canvas deja pasar los eventos y
no modifica fases, sensibilidad ni navegación.

QA: `.qa-crops/floor-plan-test.cjs`; resultados `floor-seams-desktop.json` y
`floor-seams-mobile.json`. Comprueba una única franja de píxeles en la unión,
ambas orientaciones, reversibilidad y ausencia de marcos entre transiciones.
## Primeros ambientes: desplazamientos emparejados

Las transiciones video → papel (.52–1.2), cocina → papel de la caja
(1.6–2.1), papel → salón (2.4–3) y salón → cielo (5.32–5.70)
desplazan también el ambiente saliente. No se cubre una escena inmóvil con
el fondo de la siguiente. Ambos bordes comparten progreso y quedan separados
por exactamente un viewport, también al invertir el scroll.

La salida de la cocina hacia la pantalla de la caja (1.6–2.1) recorre ahora
el ambiente contiguo a la derecha: cocina hacia la izquierda y pantalla
entrante desde la derecha, sin desplazamiento vertical. La entrada de muebles
anterior y el paso posterior al salón conservan sus direcciones. La preferencia
de movimiento reducido mantiene la alternativa vertical.

Actualización: caja → persiana (2.4–3) avanza hacia abajo: la pantalla de
la caja sale hacia arriba y la persiana entra desde abajo. Cocina → caja sigue
hacia la derecha. El texto «¿Qué queda de una casa cuando ya no se puede volver?»
se coloca por encima del papel opaco de la caja, conservando su animación y
su desplazamiento junto al ambiente saliente.

El salón tiene un contenedor de tamaño de pantalla que recorta su zoom interno:
su ampliación no invade el cielo entrante. Se conservan persiana, acercamiento
al niño, caja persistente y control del barrilete. Las fases y la sensibilidad
del scroll no cambian. `houseRoute.passage` centraliza los pares entrada/salida;
el modo de movimiento reducido conserva la dirección vertical.

El paso niño → cielo se amplió de .16 a .38 unidades de fase, sin modificar
la sensibilidad global. Los barriletes lejanos entran de forma escalonada
(5.34–5.868), con opacidad progresiva y desplazamientos más cortos. El del
visitante entra entre 5.48 y 5.70, antes del inicio del vuelo por scroll.
Los hilos acompañan la aparición y el deslizamiento entre ambientes sigue
siendo opaco, emparejado y reversible.

QA específica: `.qa-crops/paired-rooms-test.cjs`, con resultados de navegador
en escritorio y móvil y regresión de recepción de objetos en la caja.

- Entrada: movimiento vertical existente.
- Entrada al salón (2.4–3): desde abajo; pared y fiesta comparten movimiento.
- Persiana, acercamiento al niño, barrilete y caída: conservan su narrativa propia.
- Segunda casa (7.6): entrada vertical existente.
- Paso al panorama de recuerdos (7.6–8.6): hacia la izquierda.
- Panorama → versiones (11.6–12.6): hacia arriba.
- Versiones → oscuridad (12.6–13.6): hacia la derecha.
- Oscuridad → tercer ambiente (13.6–14.6): hacia abajo.
- Siguientes pasos: izquierda, arriba, derecha hasta la bicicleta.
- Comunidad y regreso a la ventana: conservan sus transiciones actuales.

Las escenas entrante y saliente comparten dirección durante cada paso. Los
panoramas fijados conservan su desplazamiento interno. Las composiciones de más
de una pantalla de alto conservan su desplazamiento vertical interno.

Con `prefers-reduced-motion: reduce` se utiliza el desplazamiento vertical
anterior, sin giros laterales. Se respetan los bloqueos de arrastre y diálogos.

Esto es una base espacial, no una casa 3D ni una remodelación visual completa:
todavía se pueden diseñar puertas, umbrales y conexiones particulares entre
ambientes. Las escenas existentes mantienen sus fondos compartidos.

Para nuevas escenas: definir su fase, dirección de entrada y la salida de su
vecina en el mapa, manteniendo reversibilidad y la versión de movimiento reducido.

QA: `.qa-crops/house-route-test.cjs` comprueba continuidad, separación de escenas,
reversibilidad y genera un fixture de navegador con los scripts de producción.
El test de scroll restaurado sigue siendo una regresión vigente: no ejecutar
`integrate-scroll.cjs` ni recuperar `scroll-flow.js`.