# Teaser previo a la landing

El index principal carga `dist/continuous/teaser-gate.js`. Presenta el teaser
existente de `dist/assets/coming-soon/index.html` en una capa aislada, antes
de permitir usar la landing. Al completar siete días aparece Entrar; ese botón
revela la web actual sin abandonar el index. Al recargar vuelve a mostrarse el
teaser, incluso si ya se entró en esa sesión; el reloj semanal no se reinicia.
El teaser lleva el mismo grano SVG y opacidad .15
del index principal, por encima del video y sin capturar eventos. Además utiliza
el mismo grano animado: mosaico monocromo de 256 px, alfa 48, opacidad .6 y
regeneración cada 80 ms; se queda estático con movimiento reducido.

`teaser-atmosphere.js` reproduce en loop la canción existente de Silvana Estrada,
La Enfermedad del Siglo, con volumen .55. Intenta comenzar al cargar; si el
navegador bloquea autoplay, arranca con la interacción. No hay botón de sonido
en el teaser; el usuario puede silenciar la pestaña desde el navegador. La canción
se detiene al entrar a la landing.

La casa se muestra centrada a `min(110vw, 156vh)`, ligeramente mayor que el
ajuste anterior. Contador y Adelantar se suben juntos al 54% de la mitad inferior
del render, aprovechando su margen transparente. Solo la
casa y sus capas de fuego/humo llevan `teaser-ink-edge`: desplazamiento fino
de 1.5 px con ruido fractal y difusión de .7 px, sin afectar texto ni controles.
La semilla del ruido de bordes cambia cada 80 ms junto al grano para una
irregularidad viva pero sutil; con movimiento reducido permanece estática.
La canción se pausa y vuelve a cero al entrar; incluso una reproducción
pendiente se cancela al resolverse para evitar audio residual en la landing.

## Reloj y estreno

Se conserva la configuración original: `inicio: null` en
`dist/assets/coming-soon/coming-soon.js`. Esto inicia siete días por navegador,
no una fecha común de estreno. Antes de publicar, fijar `AJUSTES.inicio` a una
fecha ISO con zona horaria para sincronizar la semana de todos los visitantes.
No se eligió una fecha de lanzamiento sin confirmación del autor.

Este es un acceso visual del lado del cliente, no protección del contenido:
la web y sus recursos siguen siendo públicos y se inicializan detrás de la capa.
Para una publicación realmente bloqueada se necesita configuración del hosting.

## Pruebas desde el index

- `?vista=landing`: acceso directo para seguir desarrollando la web.
- `?teaser&prueba`: vuelve a mostrar el teaser y habilita Adelantar.
- `?teaser&rapido`: reproduce la semana de prueba en 7 segundos (un segundo por día).
- `?teaser&dia=7`: comprueba el final y el botón Entrar.
- `?teaser&reiniciar`: reinicia el reloj local si inicio sigue en null.

No hay botón Adelantar: dos clics rápidos sobre el fondo aceleran el reloj. Las opciones de prueba no
constituyen un control de seguridad. Servir `dist` mediante HTTP (por ejemplo
Live Server), no abrir el archivo mediante file://.

QA: `.qa-crops/teaser-test.cjs`; resultados `teaser-desktop.json` y
`teaser-mobile.json`: integración, cuatro etapas, video, grano idéntico,
entrada bloqueada, final de semana y acceso a landing.

La cita de Silvana Estrada y su atribución fueron retiradas de la landing; ese espacio queda vacío.

Al completar la semana no aparece «Entrar»: el contador queda en cero durante
4 segundos con el humo activo. Después el iframe se desvanece sobre la landing
durante 1,8 segundos y la música baja hasta detenerse. La landing permanece
inerte hasta terminar el desvanecimiento.

Atajo provisorio de desarrollo: tres clics o toques sobre el fondo del teaser
dentro de 900ms saltan inmediatamente a la ventana tapiada, sin esperar el reloj
ni el desvanecimiento. Dos clics dentro de esa misma ventana activan el modo rápido (un día por segundo); un solo clic vuelve al tiempo normal. El primer clic restaura el tiempo normal inmediatamente; solo la aceleración espera a descartar un tercer clic. Se conserva el progreso alcanzado y el doble clic nunca salta directamente a la web. Los clics sobre botones o enlaces no cuentan y reinician
la secuencia. La música se detiene y vuelve a cero antes de retirar el iframe.
El atajo no modifica el reloj guardado; una recarga vuelve a mostrar el teaser.

El teaser desactiva la selección de texto y medios, el arrastre nativo y el
resaltado táctil para evitar recuadros azules al usar los gestos. Esto queda
limitado al iframe; no altera la selección en el resto de la web ni los controles
de sonido o los gestos de doble/triple clic.

La textura rayada del fondo negro tiene un desplazamiento y giro suaves en un
ciclo de 32 segundos, independiente del grano animado. Su margen extra de 5vmax
evita descubrir bordes al moverse. Con movimiento reducido permanece fija.

Apagones ocasionales: cortes secos de opacidad sobre la escena (casa, fuego y
humo) y el contador, sin capa negra. La textura de fondo y el grano permanecen
visibles. Cada episodio tiene entre uno y cinco cortes de 20–85ms. La opacidad
durante cada corte varía entre 0, .08, .27, .48 y .66; golpes consecutivos tienen
intensidades diferentes. Se mezclan pausas cortas de 45–140ms con otras largas
de 240–700ms dentro de una misma ráfaga. Varían la cantidad, intensidad y ritmo,
sin deformaciones ni elementos extra. El intervalo entre episodios sigue siendo
aleatorio, de 14–36 segundos.
Sin fundidos, destellos blancos ni repetición continua. Se cancelan al ocultar
la pestaña, activar movimiento reducido o entrar en la landing, restaurando
la visibilidad. No afectan la música ni los gestos.

## Apagones en la web principal

`dist/continuous/light-cuts.js` extiende ese ritmo a la ventana tapiada y todo
el recorrido: 1–5 golpes, intensidades distintas y pausas cortas/largas, cada
14–36 segundos. Desde la landing usa negro liso, sin la imagen con manchas o
rayones; el canvas original `living-grain` queda encima y conserva su ruido
animado e intensidad .6, sin duplicarlo. El teaser conserva su textura propia.
No cambia la cámara, los
videos, la música ni el estado de los objetos, y no bloquea clics ni scroll.
Se suspende detrás del teaser y con movimiento reducido o pestaña oculta.

QA: `.qa-crops/house-light-cuts-test.cjs`; resultados
`house-light-cuts-desktop.json` y `house-light-cuts-mobile.json`.

## Selección y entrada limpia

La web principal desactiva la selección de títulos y elementos visuales, el
resaltado táctil y el arrastre nativo de imágenes/medios mediante `casa.css` y
`continuous/visual-interaction.js`. Inputs, textareas y zonas contenteditable
conservan la selección y edición; la navegación por teclado conserva su foco.
Al retirar el teaser no se enfoca automáticamente el botón Entrar y se limpian
las clases del cursor, evitando el contorno punteado y tooltip antes del hover.
QA: `.qa-crops/visual-interaction-test.cjs`, escritorio y móvil 390×844.