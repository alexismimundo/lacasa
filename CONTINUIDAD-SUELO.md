# Cielo y suelo: toma continua

Implementado en `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\continuous\first-house.js` y `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\continuous\first-house.css`.

- Un solo fondo de papel blanco; el grupo del suelo es transparente y está a 190 alturas de viewport por ciento debajo del cielo.
- El mismo nodo del barrilete rosa vuela, cae y aterriza; no se cruza con otra imagen.
- La caída integra velocidad y gravedad en coordenadas de mundo. La cámara acompaña ese avance y termina en 6.86, antes del fuego (6.88). La posición final del barrilete es 55% del alto de pantalla, en el centro del montón; su escala final es 0.98.
- La navegación manual se bloquea sólo durante el seguimiento; se pausa con la pestaña oculta y se limpia al reiniciar.
- Composición actual: 60 piezas superpuestas de `dist/assets/objetos-incendio/`, con recortes individuales de los catálogos azul y negro, repeticiones y variación fija de tamaño y giro. Mochila, reflector, billetes y soldaditos grandes completan el montón. Los originales se conservan; los 56 recortes WebP derivados están en `dist/assets/objetos-incendio/recortes/`. Son elementos visuales, sin nuevas interacciones, independientes de los objetos recolectados.
- Joda: mezcla multiplicar a intensidad completa; eliminados los halos de los focos.

Validación: sintaxis con vm.Script, simulación de caída/cámara, existencia de recursos y vista aislada en Chrome headless. Falta revisión interactiva de todo el recorrido y ajuste artístico con los próximos objetos.

Entrada adelantada: campo de barriletes entre 5.40 y 5.61; jugador entre 5.53 y 5.66; límite de primer lanzamiento en 5.70. Eliminada la reducción de scroll al 20%. La interpolación del motor y el easing conservan la suavidad. La cantidad física de gestos depende del mouse/trackpad.

Regresión en página completa mediante Chrome headless, escritorio y móvil: sin errores JavaScript; 60/60 imágenes cargadas; vuelo y seguimiento desde 5.70 hasta 6.86; fondo blanco incluso con quema previa guardada.

Montón reducido al 68%, con origen en 50%/60%, sin reducir el barrilete ni su hilo. El hilo del jugador está en SVG independiente por encima del montón y adopta una curva floja que acompaña el aterrizaje. Se mantienen los grosores y opacidades aprobados.

## Quema de papel — 26/10/2026

- Un avance después del aterrizaje activa la quema en 6.88 y retiene navegación en 6.90 durante 6.2 segundos; luego se libera el scroll. No necesita seguir scrolleando para consumirse.
- Canvas transparente encima del mundo compartido dibuja negro desde los bordes hacia el centro, con contorno irregular determinista, carbonización marrón y brasa fina. No usa video, croma ni dependencias nuevas; no hay fundido global de objetos.
- El nodo de imagen de los soldaditos grandes se mueve del montón al botón superviviente. Conserva posición, escala y giro del montón (68.36%/68.84%, ancho 14.96vw, giro -14 grados), sin reemplazarlo por otro recurso. Se habilita llevarlos al terminar.
- Progreso visual de visita separado de destrucción persistida: volver antes de 6.88 muestra papel blanco. Reiniciar limpia ambos. Pestaña oculta pausa la quema; movimiento reducido usa transición breve de 1.2 segundos sin parpadeo ni partículas.
- Pendiente aprobación artística del efecto en el recorrido interactivo completo.
- El fondo revelado reutiliza `fondo-papel.webp`, a la misma escala de 1600px y posición del suelo, invertido a papel negro con textura (no negro plano). Se guarda en un canvas auxiliar por tamaño para no reprocesar la imagen en cada cuadro; la carga tardía del recurso fuerza un redibujado.

## Video de incendio con croma — 26/10/2026

- Recurso original conservado: `dist/assets/videos/Papel_quemandose_en_fondo_verde_1080p_20261026142343.mp4` (1920×1080, 4 segundos).
- Reemplazadas las líneas de brasa dibujadas por el video con key de dominancia verde, alfa suave y reducción de derrame verde, procesado en canvas de hasta 960px de ancho.
- Scroll activa una reproducción única y automática; el progreso de quema sigue el tiempo del video, no la rueda. Pestaña oculta pausa ambos. Los soldaditos sobreviven por encima de la composición y se conserva el papel oscuro texturado.
- El MP4 original no se modifica; la transparencia se calcula durante reproducción. Movimiento reducido omite el video. Si falla carga/reproducción, la máscara puede completar la transición sin video.
- El frente de desaparición conserva la máscara procedural; las llamas visibles provienen del video. Pendiente revisión artística en el recorrido completo.
- Los informes de pruebas anteriores de duración 6.2s corresponden a la versión sin video; con este recurso la duración normal es 4s.

## Máscara sincronizada y fuego blanco/negro

- Eliminado el contorno geométrico independiente. La máscara acumula el alfa del video después de quitar el verde: el papel oscuro aparece en los mismos píxeles por donde pasa la silueta del recurso. Misma escala y transformación para máscara y llamas; sin fundidos separados de fuego.
- Umbral de luminancia 125, tonos RGB 16 y 244, sin crominancia residual; se conserva el alfa suave del croma.
- La acumulación evita que reaparezcan objetos después de pasar el fuego. Se conserva al redimensionar y se limpia al iniciar otra quema. Al final del clip se completa la superficie oscura; revisar en reproducción que el recurso alcance toda la pantalla antes de ese cierre.
- Movimiento reducido o error de video usan transición breve/simple al papel oscuro, no el antiguo frente geométrico.

## Limpieza de cierre y soldaditos centrados

- Entre 78% y 98% del clip se cierran los huecos de papel aún no cubiertos por el video y se apaga su capa de cenizas blancas. El resultado final conserva el papel oscuro texturado, sin restos blancos en el perímetro.
- Los mismos soldaditos se desplazan suavemente de su posición en el montón al centro exacto (50%/50%) durante el último 35% de la quema, sin cambio de imagen, tamaño ni giro.

## Soldaditos azules y cursor de barriletes

- El nodo superviviente carga `assets/objetos-incendio/soldiers-azul.webp`, el recurso azul subido, con texto alternativo actualizado. Conserva centrado, escala, giro y acción de llevar consigo.
- La primera casa limpia `casa-sin-cursor` después del render del motor anterior. El cielo usa explícitamente el cursor nativo de herramienta del sitio en punteros finos, con prioridad sobre la regla heredada de ocultamiento; no se agrega cursor a dispositivos táctiles.