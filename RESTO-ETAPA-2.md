# Etapa 2: Casa II — luz y madrugada

Implementados A (8.6–10.6) y B (10.6–12.6). No se avanzó a C.

Base: `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo`.

## Implementación

- `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\continuous\casa2-oscuridad.js` y su CSS: escenas A/B, SVG de pasillo y paisaje, máscara canvas, raspado con puntero/dedo, cierres temporales, flor guardable, niño, restos y memorias exactas del prompt.
- `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\continuous\escenas-resto.js`: textos de memoria y manifiesto de assets en la tabla; se mantienen fases y escenas C/D/E.
- `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\continuous\fondo.js`: tramos 8.6–10.6 negro→azul noche y 10.6–12.6 azul noche→celeste. Fuera de este intervalo conserva su lógica anterior.
- El nuevo bloque se carga al final de `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\index.html`.
- Sin nuevos controladores de scroll, RAF ni bibliotecas. La apertura del paisaje y las transiciones dependen de fase; el raspado y las tapas temporales dependen del tiempo, sin avanzar el recorrido.
- En movimiento reducido no hay rebote, paralaje de puntero ni tapas pulsantes; las transiciones son verticales.
- Memorias presentes como tarjetas de lectura. Títulos no suministrados: `[título pendiente]`. El sistema general de memorias guardables corresponde a la etapa 6; por ahora solo la flor se guarda, con el sistema existente y alternativa G.
- No se incorporó audio nuevo ni se reanudó música pausada.
- C continúa siendo provisoria: el barro se dibuja al final de B; la continuidad visual con Terrero se completará en etapa 3.

## Assets definitivos pendientes

Todos bajo `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\assets\casa2\`.

| Nombre | Tamaño sugerido | Formato | Provisorio actual |
|---|---|---|---|
| pasillo-noche.webp | 2400×1500 | WebP | SVG de pasillo, glicina, laurel y moral |
| hueco-01.png … hueco-08.png | 1024×1024 cada uno | PNG alfa | Polígonos canvas, máscara destination-out |
| tapa-carton.webp | 1024×1024 | WebP | Rectángulos de cartón dibujados |
| glicina-flor.png | 480×720 | PNG alfa | SVG de flor, con alternativa data URI para inventario |
| nino-corre-01.png … nino-corre-08.png | 600×900 cada uno, mismo encuadre | PNG alfa | Imagen existente del niño con rebote leve |
| cielo.webp | 2400×1500 | WebP | Gradiente de color por fase |
| horizonte.png | 3200×1500 | PNG alfa | Siluetas SVG |
| pasto.png | 3200×1000 | PNG alfa | Pasto SVG en primer plano |
| restos-casa.webp | 2400×1500 | WebP | Barro, paredes y sillón quemado en SVG |

Los dibujos son provisorios, no fotografías documentales. Los rótulos muestran `[asset pendiente: casa2/nombre]`. La tabla registra las rutas definitivas; no se generan peticiones 404 para archivos inexistentes. La sustitución por arte definitivo requerirá adaptar los dibujos a esas imágenes.

## Pruebas

`C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\.qa-crops\resto-etapa2-test.cjs`: sintaxis, A/B visibles sin cartel viejo, textos exactos, ida/vuelta, colores reversibles, raspado, aislamiento táctil, guardado por G y ausencia de duplicación, revelado de restos y movimiento reducido.

Reportes `resto-etapa2-desktop.json`, `resto-etapa2-mobile.json` y `resto-etapa2-reduced.json` dentro de `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\.qa-crops`: PASS a 1440×900 y 390×844. La prueba automatizada usa Pointer/Touch Events sintéticos y teclado para guardar: no sustituye revisar un arrastre real con dedo en dispositivo físico.

Para revisar: abrir con `?vista=landing`; consola `reachInside(); target=current=9.5;` (A), 11.2 (corrida), 12.1 (barro/restos); avanzar y retroceder. Arrastrar la flor hacia la caja en A, o enfocarla y pulsar G. En pantalla táctil el scroll está disponible por defecto: pulsar «Raspar» para apoyar y arrastrar sobre el negro; pulsar «Volver al scroll» para seguir. Durante el raspado el gesto no mueve el recorrido.

## Pendiente del autor

Arte definitivo, secuencia de corrida si se desea reemplazar el rebote, aprobación visual de ritmo y composición, títulos de memorias si se quieren quitar los marcadores. Las grabaciones de canciones y tiempos de fragmentos se integrarán en la etapa de audio; no hacen falta para probar esta etapa.