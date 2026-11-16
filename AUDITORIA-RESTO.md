# Auditoría del resto del recorrido

Fecha: 16 de noviembre de 2026. Estado: auditoría y propuesta; implementación pendiente de aprobación.

## 0. Respaldo y alcance

- Proyecto: `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo`.
- No es un repositorio Git (verificado con `git rev-parse`).
- Respaldo: `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist-backup-antes-del-resto`.
- Copia completa: 512 archivos, 336.612.453 bytes. Comparación SHA-256 de los 512 archivos: ninguna diferencia; tampoco hay archivos extra en la copia.
- Evidencias en `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\.qa-crops\resto-backup-result.json` y `resto-backup-sha256.json` en ese mismo directorio.
- En esta entrega no se modifica `dist`, no se ejecuta `integrate-scroll.cjs` ni se recupera `scroll-flow.js`.
- Se revisaron los diez archivos JS/HTML requeridos y los seis documentos indicados. Los documentos históricos no son la fuente de verdad cuando contradicen el código vigente.

## 1. Dónde termina hoy la linterna

Archivo: `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\continuous\first-house.js`.

- Líneas 385–433: creación de la segunda casa, título, frase, máscara de linterna y puntero.
- Líneas 434–447: `renderNextHouse`.
- El título empieza en 7.28; la exploración con linterna ocupa 8.02 ≤ fase < 8.6.
- Línea 435: `visible=inside&&p>=7.28` no tiene límite superior; `finished` pasa a verdadero en 8.6.
- Línea 436: activa `awaiting-next-scene` desde 8.6.
- Líneas 438–441: se desactivan la frase y el repintado del haz al terminar. No hay transición a otra escena.
- La posición `nextLight` y el último canvas ya existen: pueden conservarse para el fundido de salida, sin alterar la exploración anterior a 8.6.

## 2. Qué sucede al seguir scrolleando

Archivo: `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\continuous\house-route.js`, líneas 33–35:

```js
const retired=Object.freeze([[8.6,17.6],[21.8,24]].map(Object.freeze));
```

- `skipRetired` lleva el destino desde el primer tramo retirado hasta 17.6 al avanzar; al retroceder devuelve 8.5999.
- `advanceRetired` acomoda también la cámara al cruzar estos intervalos.
- El motor los aplica en `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\index.html`, líneas 784 y 786. No es un fallo del delta ni de la sensibilidad del scroll.
- El segundo salto lleva de 21.8 a 24.
- En `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\continuous\first-house.css`, línea 150, `awaiting-next-scene` tiene fondo negro, z-index 1000 y captura puntero. La capa no se retira, por lo que tapa panorama y salida aunque el reloj siga avanzando.
- La regla de la línea 165 mantiene ocultos `p8`–`p14`, `community-draw-step` y `journey-objects` con `display:none!important`. Quitar solo el salto NO recuperaría esas piezas.
- `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\continuous\fondo.js`, líneas 22–27, fuerza negro opaco desde 6.9. Su tabla de blanco/negro/azul no basta para los fondos nuevos.

## 3. Piezas reutilizables

### Motor y navegación

- `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\index.html`: `current`/`target` y `journeyLength=29.05` en línea 731; `reachInside` en 734; navegación en 750–799; `tick` en 786. No se necesita un nuevo reloj ni controlador de scroll.
- Rueda, teclado y táctil ya existen. Los campos, diálogos y arrastres tienen protecciones parciales que deberán extenderse a los nuevos lienzos localmente, sin cambiar sensibilidad.
- `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\continuous\house-route.js`: vectores compartidos y alternativa vertical con movimiento reducido.
- `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\continuous\floor-plan.js`: uniones de grafito encadenadas a `casaRender`; no necesita otro bucle.

### Comunidad y dibujo

- `p15` sigue definido en `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\continuous\casa.js`, línea 82: inicio 17.6, altura 4.4 y panorama fijado.
- `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\continuous\community.js`, línea 143: activa el barrio en 17.6–22; en la navegación vigente solo se recorre hasta 21.8 por el salto retirado.
- Hay 44 recortes disponibles; el código crea 24 entradas, no 44 entradas visibles distintas.
- Ya existen dibujo SVG, trazos abiertos/cerrados, relleno `evenodd`, deshacer/borrar, validación de datos y guardado local con `la-casa-community-drawing-v1`.
- El paso de dibujo está programado para 21.8–24.15, pero el salto y el CSS lo vuelven inaccesible en el recorrido normal.
- «Otras casas» ya tiene un atlas arrastrable, zoom y controles táctiles/teclado; es reutilizable, no hay que reconstruirlo desde cero.
- Nombres y memorias de ejemplo inventados están en líneas 8–11: deberán reemplazarse por entradas sin autor y `[memoria de la comunidad]` al trabajar el momento D.
- El atlas tiene animación propia preexistente: no se reutilizará como reloj de las nuevas escenas.

### Caja, objetos y música

- `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\continuous\casa.js`: mapa `S` en 80–83, `E.caja` y persistencia de sesión en 92–97, `COSAS` en 99–110, `guardar` en 226–238 y `hacerGuardable` en 248–276.
- `glicina` ya se registra en `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\continuous\casa2.js`; `plato` en `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\continuous\casa3.js`.
- `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\continuous\inventory.js` reutiliza el mismo inventario. Sus ofertas viejas están ocultas por CSS: no reactivarlas globalmente; crear las ofertas nuevas en sus escenas para evitar duplicados.
- La memoria gráfica `03-frente.png` sigue usándose dentro de la caja 3D. No volver a crearla en la cocina ni modificar su presentación actual.
- `CANCIONES` agrupa títulos por casa; no es todavía la tabla de diez pistas con archivos. `music` usa Sirens como audio provisional. Más adelante, centralizar grafías y fragmentos sin reactivar música si el visitante pausó.

### Salida existente

- `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\index.html`, líneas 1402–1450: medios independientes, `renderClosingScene`, regreso a la ventana y reinicio.
- Línea 1420: `closingPhase=current-2`; línea 1421: activo si `closingPhase>22`, es decir, `current>24`.
- Entrada 24–24.6; zoom 25.2–27.05. Después se reproduce el video final: la habilitación del exterior también depende de `closingFinished`, no solo de la fase.
- El total vigente es 29.05, no 33.05 como indica un documento antiguo.
- Conservar la mecánica. Adelantar el inicio a 21.8 y ajustar el total es una intervención posterior, propuesta para la etapa E; no cambiar ahora constantes dispersas sin aprobación.
- La salida actual NO es totalmente reversible por fase: `closingFinished` persiste y hay reproducción temporal del video. La exigencia de reversibilidad exacta y la de no cambiar esa mecánica requieren delimitar esta excepción antes de cerrar el QA final.

## 4. Código que queda dormido

No borrar HTML, recursos ni registros compartidos. Mantener ocultas las pantallas antiguas `p8`–`p14`: trepar, versiones, linterna antigua, Daisy, naipes, cartas y cuaderno. Se pueden tomar ideas de baldosas y separación de vajilla, pero no reactivar sus pantallas enteras.

Importante: «oculto» no equivale a «sin efectos». `casa2Render` apaga y vuelve a encender la radio alrededor de la oscuridad vieja; `casa3Render` modifica volumen alrededor de la mesa vieja. Al abrir 8.6–17.6 esos efectos volverían a ejecutarse aunque el HTML esté oculto. Se propone neutralizarlos solo en el tramo nuevo mediante una integración posterior al código existente, conservando registros, objetos y comportamiento anterior a 8.6. Esa integración necesita aprobación explícita.

## 5. Plan propuesto de etapa 1 — NO aplicado

Las líneas son las de los archivos actuales, antes de insertar código. Los rangos de fases son tentativos y quedarán en una tabla única.

### Archivos a crear al aprobar el plan

1. `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\continuous\escenas-resto.js`: tabla de escenas y scaffold encadenado a `casaRender`, sin otro RAF. Campos `id`, `inicio`, `fin`, `rumboEntrada`, `fondo`, `cancion`, `fragmentoAudio`, `memoria`, `assets`. Por ahora solo rótulos de momento, sin letras ni memorias inventadas, ni audio nuevo.
2. `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\continuous\escenas-resto.css`: superficies opacas y legibles del scaffold, rótulos y alternativa vertical; reglas acotadas a fases nuevas.
3. `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\.qa-crops\resto-test.cjs`: validación del scaffold, regresión anterior a 8.6, navegación reversible, persistencia y capturas 1440×900 / 390×844.

Los pares `casa2-oscuridad`, `casa3-terrero`, `tu-casa` y `salida-final` se crearán en sus etapas 2–5, no ahora. No generar archivos vacíos que finjan implementar esos momentos.

### Tabla provisional para el scaffold

| Bloque | Inicio | Fin | Estado de etapa 1 |
|---|---:|---:|---|
| A · oscuridad y huecos | 8.6 | 10.6 | nombre del momento |
| B · niño y madrugada | 10.6 | 12.6 | nombre del momento |
| C · Terrero: lluvia y mesa | 12.6 | 15.8 | nombre del momento |
| D1 · Tu casa | 15.8 | 17.6 | nombre; dibujo se incorpora en etapa D |
| D2 · la cuadra | 17.6 | 21.8 | reutilizar panorama actual |
| Salida existente | >24 | 29.05 | conservar mientras se prepara E |

Se conserva temporalmente `[21.8,24]`: permite llegar a la salida actual sin abrir un hueco sin contenido. En etapa E se quitará y se propondrá `closingPhase=current+0.2` y total 26.85, junto con el resto de umbrales externos que dependan del cierre. No se adelanta solo el render aislado.

### Cambios exactos propuestos: first-house.js

Ruta: `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\continuous\first-house.js`.

Sustituir únicamente líneas 435–436, dentro de `renderNextHouse`:

```js
 const finLinterna=window.escenasResto?.inicio??8.6,finSalida=finLinterna+.3;
 const visible=inside&&p>=7.28&&p<finSalida,finished=p>=finLinterna;nextHouse.hidden=!visible;nextHouse.inert=!visible;
 nextHouse.classList.toggle('leaving-next-scene',visible&&finished);
```

Sustituir únicamente línea 446:

```js
 nextHouse.style.opacity=String(p<finLinterna?1:1-ease(finLinterna,finSalida,p));
```

Motivo del fin 8.9 y no un corte en 8.6: permite fundir el último canvas en su posición real sobre A durante 8.6–8.9. Antes de 8.6, misma opacidad y misma iluminación. No tocar líneas 397–433, el haz, el parpadeo, la frase, el puntero, el barrilete, la caja ni el fuego. Al no asignar `awaiting-next-scene`, su regla vieja queda dormida sin editar CSS de la primera casa.

### Cambios exactos propuestos: house-route.js

Ruta: `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\continuous\house-route.js`.

Conservar líneas 4–9 (incluido `{at:8.6,x:-1,y:0,...}`); sustituir líneas 10–16 por:

```js
  {at:10.6,x:0,y:-1,name:'El niño y la madrugada'},
  {at:12.6,x:1,y:0,name:'Terrero: lluvia y mesa'},
  {at:15.8,x:0,y:1,name:'Tu casa'},
  {at:17.6,x:1,y:0,name:'El camino de la bicicleta'},
  {at:22,x:0,y:1,name:'Otras casas'}
```

Sustituir línea 33 por:

```js
  const retired=Object.freeze([[21.8,24]].map(Object.freeze));
```

No tocar `skipRetired`, `advanceRetired`, vectores ni navegación.

### Cambios exactos propuestos: floor-plan.js

Ruta: `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\continuous\floor-plan.js`.

Conservar línea 7 y el primer triple de la línea 8, `[7.6,8.6,8.6]`: modificarlo afectaría una escena terminada. Sustituir líneas 8–10 por:

```js
  [7.6,8.6,8.6],
  [10.3,10.6,10.6],[12.3,12.6,12.6],
  [15.5,15.8,15.8],[17.3,17.6,17.6]
```

Las transiciones nuevas deben usar exactamente esos intervalos en la tabla. No agregar una línea para 21–22 mientras el salto a 24 siga vigente. No modificar el algoritmo de grafito ni su máscara sobre el barrilete.

### Otras integraciones que requieren aprobación

- `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\index.html`, línea 1620: agregar el link y script del scaffold después de los existentes y antes de cerrar body. No cambiar `tick`, eventos, sensibilidad, cierre ni `journeyLength` en etapa 1.
- Encapsular los efectos narrativos viejos de `casa2Render`/`casa3Render` desde el scaffold para que no actúen en 8.6–17.6. No alterar la caja ni sus APIs. Revisar también `renderLuz` y cursores viejos en ese tramo antes de habilitarlo.
- Los fondos de etapa 1 serán superficies propias del scaffold; la ampliación de `fondo.js` se hará con la paleta de los momentos en las etapas siguientes, sin alterar nada anterior a 8.6.
- La apertura anticipada de `p15` durante su entrada y el dibujo viejo siguen bajo control de comunidad. Comprobar las capas en 16.6–17.6 y cubrir la entrada vieja con D1; no editar a ciegas todo `community.js` todavía.

## 6. Validación y punto de parada

Hecho: inspección de implementación y documentos, identificación de incompatibilidades, copia y comparación SHA-256. `dist` sigue idéntico al respaldo. No se atribuye a esta auditoría una prueba de navegador de una implementación que aún no existe.

Al aprobar el plan: probar 8.59/8.6/8.9 y ambos lados de cada límite; mismo camino en reversa; ningún salto 8.6–17.6; no reaparecen Daisy/cartas/cuaderno ni cambia el estado musical por hooks viejos; salida visible; caja y guardado preservados; comparación de comportamiento 0–8.6. Comprobar escritorio, móvil y movimiento reducido. No avanzar a etapa 2 sin confirmación.

Decisiones pendientes: aprobación de estas integraciones adicionales; momento de trasladar la salida a 21.8; alcance de la reversibilidad del video de salida existente; direcciones completas del menú final (se preguntarán antes de incorporarlas).