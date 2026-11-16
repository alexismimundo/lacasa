# Etapa 4 — Tu casa y la cuadra

Base: `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo`.

## Alcance y fases

- C: títulos «La cerámica» / «Cada uno en su pieza».
- D1: 15.8–17.6, entrada fundida desde la puerta durante 15.5–15.8. Papel, dibujo vivo azul #335386, deshacer y borrar, relleno de figuras cerradas con calados pares/impares. Tarjeta editable, título de hasta 60 caracteres y memoria de hasta 700; eco lila en vivo. Portada usa el mismo compositor que las descargas.
- D2: 17.6–21.8. Panorama p15 existente, 44 recortes originales, fondo frío, paralaje lejano y manubrio. Última casa: aporte guardado; si no lo hay, terreno con `[tu casa podría estar acá]`. Hover, foco o toque muestran memoria corta sin abrir modal ni bloquear el recorrido. Sin retrovisor.
- Letras: «Recorramos el barrio» / «Toma la bicicleta y vamos juntos a atravesar este vendaval», recuperadas del prompt original local.
- Etapa 5 no implementada: salida y menú siguen con su comportamiento previo. No se incorporó ahí la portada del visitante.

## Persistencia y controles

La clave sigue siendo `la-casa-community-drawing-v1`; se conserva el formato `name`, `memory`, `strokes`, `demo`, con `title` opcional. Los aportes anteriores siguen aceptados: si no hay title se muestra name. La nueva interfaz pide título, no nombre. Los ejemplos ya no tienen nombres ni relatos inventados; usan `[memoria de la comunidad]`.

Guardar es explícito mediante «Sumar mi casa al barrio». El dibujo y la memoria sin guardar siguen disponibles durante esta visita y para descarga, pero no reemplazan el aporte persistido hasta guardar. Si falla localStorage, se informa y se conserva el borrador para descarga/reintento. Otras casas conserva el mismo archivo local, y lo lee al abrirse.

Mientras se dibuja o la tarjeta tiene foco se congela current/target y se bloquea navegación. El panel puede desplazarse internamente en móvil sin mover el viaje. «Seguir sin dibujar» queda fijo y lleva a 17.6, sin borrar un aporte previo. Movimiento reducido desactiva vibración y vaivén. No hay controlador ni reloj de recorrido nuevos.

«Pedir mi disco» abre dialog con aviso explícito de prototipo; submit solo muestra confirmación local, no hace fetch ni guarda datos personales. Cerrar limpia sus campos.

## Assets automáticos y encuadre

Directorio: `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\assets\tu-casa\`.

| Nombre | Tamaño sugerido / requerido | Formato |
|---|---|---|
| plantilla-portada-2000.png | 2000×2000 exactos | PNG, calado transparente |
| plantilla-historia-1080x1920.png | 1080×1920 exactos | PNG, calado transparente |
| manubrio.png | 1800×600 sugeridos | PNG transparente |
| barrio-capa-1.webp | 3000×1200 sugeridos | WebP, alfa si corresponde |
| barrio-capa-2.webp | 3000×1200 sugeridos | WebP, alfa si corresponde |

El sistema compartido prueba las rutas y mantiene los provisorios si faltan/fallan. Subir y recargar; no hay vigilancia de carpeta en vivo. Sin plantilla se usan ladrillos.webp y marco-ventana.webp, sin tapar el dibujo. Sin manubrio se usa SVG. Las capas adicionales son opcionales: p15 y los recortes funcionan sin ellas.

Contrato de calado (para subir las plantillas sin tocar código):

- Portada: ventana x=460, y=360, ancho=1080, alto=860. Dibujo con 5% de margen interno. Texto debajo, caja x=260, y=1380, ancho=1480, alto=520.
- Historia: ventana x≈173, y=384, ancho≈734, alto≈653. Dibujo con 5% de margen interno. Texto debajo, caja x=108, y≈1190, ancho=864, alto≈614.
- La plantilla se compone encima del dibujo; dejar transparentes el calado y las áreas donde deba leerse la memoria. Textos largos se ajustan por palabras/caracteres y se recortan al límite inferior para no desbordar. La memoria completa permanece en el aporte local y en la tarjeta; el export es una composición de espacio limitado.

## Código

- `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\continuous\community.js`: mantiene modelo de trazos, validación, almacenamiento y atlas; expone API compartida; retira navegación antigua del dibujo a la salida y datos ficticios.
- `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\continuous\tu-casa.js` y `.css`: D1/D2, descarga y formulario simulado; encadena casaRender existente.
- `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\continuous\casa3-terrero.js`: títulos de C.
- `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\index.html`: carga final del módulo y estilos.

## QA

Scripts y reportes en `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\.qa-crops\`, prefijo `resto-etapa4-`.

Verificado en Chrome headless escritorio 1440×900 y móvil emulado 390×844: D1/D2 reversible, títulos C, dibujo con input de puntero del navegador, deshacer/borrar, guardado con clave previa, esquema anterior aceptado, lote sin aporte, 44 casas + visitante, memoria hover/click, scroll bloqueado al escribir, salto explícito a cuadra, formulario simulado y PNG reales descargados al disco. Firma PNG y dimensiones leídas del archivo: 2000×2000 y 1080×1920. No solo se verificó un enlace ni un data URI.

Limitación: móvil emulado no certifica Safari iOS ni Android físico. Revisar dedo/lápiz, teclado virtual y guardado desde el navegador del teléfono; algunos abren la imagen para guardarla desde allí. Las pruebas usan datos QA solo en el perfil automatizado, no agregan memorias públicas.

## Qué falta del autor

Las plantillas y manubrio definitivos; opcionalmente capas de barrio y memorias reales de comunidad. Confirmar encuadres del calado y distribución de la portada. No hacen falta más letras para D. Etapa 5 queda pendiente de autorización.