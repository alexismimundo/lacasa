# Contexto para Claude

Estás continuando La Casa, web experimental autobiográfica y musical de Alexis Gabriel. La versión exportada es la 77. Conservar composición, activos y comportamiento aceptados; aplicar cambios pequeños y concretos.

## Arquitectura
Web estática sin framework. dist/index.html contiene estilos y el motor de scroll virtual principal. Los scripts continuous/casa.js, casa2.js, casa3.js, fondo.js, rooms.js y first-house.js completan el recorrido. El orden de carga importa: comparten variables globales y encadenan casaRender.

current y target son las fases del recorrido virtual; navigateScroll procesa rueda, teclado y táctil. El navegador no utiliza scroll nativo para el recorrido. Los rangos se coordinan entre archivos: mover una entrada exige revisar su salida y la escena siguiente. No eliminar variables aparentemente sin uso sin revisar todos los scripts (por ejemplo filmReduced también sirve en la entrada y el hover).

## Experiencia actual aceptada
Ventana tapiada → video del niño → zoom manual → video climático en loop → dos frases centradas azules. Las frases siguen el scroll, con desplazamiento y opacidad. La segunda permanece hasta que el papel la cubre. El papel cubre el video desde abajo. La cocina entra deslizando desde fuera de pantalla, sobre el papel.

Se conserva ink bleed al pasar el mouse, con desenfoque moderado, sin resplandor blanco ni máscara que lo recorte. El grano volvió a resolución completa y actualización cada 80 ms, como antes de la optimización que agrandaba sus puntos.

Último ajuste v77: en continuous/rooms.js se adelantó la entrada de los muebles de fase .95 a .54 y se completa en 1.4. paperReveal empieza en .52 y llega a 1 en 1.2. La entrada calcula entranceOffset usando la parte superior real de los recortes. El contenedor se recorta contra la zona ya cubierta por papel hasta fase 1.2. No reemplazar por una aparición con corte o fade.

Cocina sale hacia fase 2; caja 2–3; persiana 3–4; fiesta 4–5; cartón 5–5.7; cielo/barrilete 5.7–6.7; macro/erosión 6.7–7.3; soldaditos 7.3–7.6. Luego continúa la segunda casa y el recorrido anterior, terminando en la ventana/glicinas.

## Archivos a editar según el pedido
- Frases, papel, entrada, video y scroll: dist/index.html.
- Cocina, alacena, televisor y entrada de muebles: continuous/rooms.js y rooms.css.
- Objetos de cocina adicionales, caja, persiana, fiesta, barrilete, erosión y soldaditos: continuous/first-house.js y first-house.css.
- Resto del recorrido: casa.js, casa2.js, casa3.js y sus estilos.

## Activos e interacciones
Cinco programas de televisión, puertas de alacena, hamburguesas, mochila, robot y billetes. Parte de los activos de first-house son provisionales. La cumbia no está incorporada: A.cumbia es null; no afirmar que hay pista de cumbia. Se utiliza almacenamiento local y de sesión para progreso y elecciones; para revisar desde cero usar un perfil limpio o reinicio de la experiencia. No alterar esa persistencia sin pedido.

## Precauciones y revisión
El usuario pidió explícitamente modificar solo lo solicitado. Hubo regresiones al mover fases de forma independiente y al borrar filmReduced. Confirmar sintaxis de todos los scripts y recorrer visualmente la entrada, ambas frases, cobertura del papel, entrada de cocina, caja y persiana después de tocar esa secuencia. La v77 pasó sintaxis y publicación; el último adelanto fino de muebles no tuvo una comprobación visual posterior. El video tuvo reportes de tirones: se suspendieron cálculos de escenas ocultas durante el umbral, pero no se garantiza que el problema esté resuelto en todos los equipos.

No rediseñar ni sustituir imágenes, tipografías, textos, música o interacciones sin un pedido explícito.
