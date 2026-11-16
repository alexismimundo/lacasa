# Etapa 3 — Terrero y assets automáticos

## Estado

Implementado Momento C, fases 12.6–15.8; etapa 4 sin comenzar. No se alteraron el reloj, sensibilidad, caja ni escenas anteriores a 8.6.

Base: `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo`.

## Assets automáticos: regla para las etapas siguientes

`C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\continuous\assets-resto.js` expone `restoAssets.load`, `bind`, `replace` y `label`. Prueba las imágenes con Image; si cargan y se pueden decodificar, reemplaza el dibujo. Si faltan o fallan, conserva el dibujo y el rótulo. No requiere backend ni un manifiesto generado. Cada ruta se intenta una vez por carga de página: después de subir un archivo, recargar (Ctrl+F5 si hay caché). No hay vigilancia en vivo de la carpeta.

Aplicado a todos los assets A/B (pasillo, huecos, cartón, flor, cielo, horizonte, pasto, restos y frames del niño) y C. Una secuencia incompleta utiliza frames disponibles o la alternativa dibujada; conviene subir todos con el mismo encuadre. Las imágenes de huecos son máscaras alfa: alfa opaco representa área que se abre. Las portadas y marcos deben tener los calados transparentes.

La memoria del moral se titula «Las moras»; la del ligustro conserva `[título pendiente]`.

## Fases de C

| Tramo | Fase aproximada | Contenido |
|---|---|---|
| Unión B/C | 12.3–12.6 | Una misma capa de barro continúa sin reiniciarse |
| Dirección y cerámica | 12.6–13.5 | Terrero 3231 se revela con grafito vivo; baldosas por scroll |
| Lluvia | 13.15–14.5 | Tres ollas, gotas/salpicaduras y vidrio limpiable que se reempaña |
| Mesa y retrovisor | 14–15.4 | Baja la lluvia; vajilla se separa; casas se achican dentro del espejo |
| Plato y puerta | 15.15–15.8 | Plato guardable; puerta cierra por scroll; transición a D provisorio |

Las superposiciones son intencionales: un solo ambiente, sin avanzar automáticamente. El fondo pasa de gris lluvia a celeste frío. El grafito del título usa revelado y vibración acotada, estático con movimiento reducido. No se agregó otro RAF. La lluvia y el reempañado usan tiempo, pero no mueven la fase.

Memorias y frases son las del prompt. Títulos de las dos memorias C: `[título pendiente]`. Las tarjetas todavía son de lectura (sistema general guardable de etapa 6). Plato usa `COSAS.plato` y `hacerGuardable`, con teclado G. El inventario conserva el estado de sesión existente.

## Archivos

- `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\continuous\casa3-terrero.js` y `.css`: C y suelo compartido B/C.
- `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\continuous\assets-resto.js`: resolución compartida.
- Cambios acotados en `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\continuous\casa2-oscuridad.js` para imágenes automáticas, título y suelo compartido; en `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\continuous\fondo.js` para color C; carga al final de `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\index.html`.

## Imágenes pendientes

Directorio definitivo: `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\assets\casa3\`.

| Archivo | Tamaño sugerido | Formato | Alternativa |
|---|---|---|---|
| barro.webp | 2400×1500 | WebP | Suelo SVG compartido B/C; dejar la parte superior libre o mostrar solo suelo |
| baldosa.webp | 512×512 | WebP | Baldosa CSS |
| olla-1.png … olla-3.png | 800×600 | PNG alfa | Ollas SVG |
| vidrio-empanado.png | 2400×1500 | PNG alfa | Velo canvas |
| mesa.webp | 2000×1000 | WebP | Mesa elíptica CSS |
| plato.png | 700×500 | PNG alfa | Plato SVG |
| vaso.png | 500×700 | PNG alfa | Vaso SVG |
| cubiertos.png | 600×900 | PNG alfa | Cubiertos SVG |
| marco-retrovisor.png | 1600×900 | PNG alfa, centro transparente | Borde ovalado CSS |
| puerta-1.png … puerta-3.png | 1000×1600, mismo encuadre | PNG alfa | Puerta CSS giratoria |

Retrovisor provisional: ventana existente de Colodrero, textura existente de persiana y marco de ventana oscurecido para Gabriela Mistral. No son nuevas fotografías documentales.

## QA y prueba manual

Script: `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\.qa-crops\resto-etapa3-test.cjs`.

Reportes y capturas `resto-etapa3-{desktop,mobile,reduced}.{json,png}` en `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\.qa-crops`.

Verifica imagen existente/faltante con resolver compartido, título Las moras, ida/vuelta, suelo continuo, 40 baldosas, tres ollas, limpieza del vidrio y botón táctil, letras/memorias, retrovisor, cierre reversible de puerta y guardado de plato. Escritorio 1440×900, móvil 390×844 y movimiento reducido. Eventos sintéticos y alternativa G: revisar también arrastre físico en teléfono.

Abrir `?vista=landing`, consola `reachInside(); target=current=12.75;`. Revisar 13.5 (lluvia), 14.4 (mesa/espejo), 15.4 (plato/puerta), luego retroceder. Celular: «Limpiar vidrio» activa el dedo; «Volver al scroll» devuelve el gesto al recorrido. Movimiento reducido elimina gotas móviles, vibración y desplazamientos laterales entre escenas; conserva las interacciones y la composición por fase.

## Qué falta del autor

Arte definitivo con esos nombres, títulos de memorias C si se desea quitar marcadores y revisión visual del ritmo/escala. No se necesitan nuevos textos autobiográficos para completar esta etapa. Audio por fragmentos sigue reservado a etapa 6. No se implementó Tu casa ni exportación: etapa 4 pendiente de confirmación.