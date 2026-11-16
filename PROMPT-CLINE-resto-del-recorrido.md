# La Casa — prototipar el resto del recorrido (desde la linterna hasta salir por la ventana)

Sos el desarrollador de la web experimental **La Casa**, un álbum autobiográfico de Alexis Gabriel. La web promociona el disco y también es la pieza principal de mi proyecto final de Diseño Gráfico (FADU-UBA). Es un recorrido continuo por el interior de tres casas que habité. **El scroll es el reloj narrativo**: una "fase" virtual (`current`/`target`) que avanza con la rueda, el trackpad o el gesto táctil.

Todo lo que hay hasta la escena de la linterna está terminado y **no se toca**. Necesito que construyas, **de forma tentativa pero completa**, todo lo que sigue hasta el final (salir otra vez por la ventana y el menú final). La idea es tener la estructura entera funcionando para después iterar escena por escena con imágenes y sonido definitivos.

No quiero una pantalla por canción ni un paso a paso tipo juego. Quiero que sea **experimental, dinámica y resolutiva**: varias cosas pasando a la vez, momentos que se encadenan sin cortes y pocas interacciones, pero con sentido, que sumen al relato.

Trabajá en etapas, y después de cada etapa dejame la web funcionando y probada.

---

## 0. Antes de escribir código: auditoría (obligatoria)

1. **Respaldo.** Hacé una copia de seguridad de `dist/` como `dist-backup-antes-del-resto/`. Si el proyecto tiene git, hacé un commit en su lugar.

2. **Leé y entendé estos archivos antes de tocar nada:**
   - `dist/index.html`. Es el motor: `current`, `target`, `journeyLength`, `tick()`, la navegación por rueda/teclado/touch, `reachInside()`, `renderClosingScene()`, el menú y "Otras casas".
   - `dist/continuous/house-route.js`. Define los rumbos de cada paso, los tramos retirados `retired=[[8.6,17.6],[21.8,24]]`, `skipRetired` y `advanceRetired`.
   - `dist/continuous/first-house.js`, la parte de `fh-next-house`: «Gabriela Mistral 4860», la linterna y `renderNextHouse`.
   - `dist/continuous/casa.js`. Tiene el mapa `S` (p2…p17), `RECURSOS`, `TEXTOS`, `COSAS`, la caja (`guardar`, `hacerGuardable`, `E.caja`) y `CANCIONES`.
   - `dist/continuous/casa2.js` y `casa3.js`. Es código viejo de las pantallas p8 a p15, que hoy está en tramos retirados.
   - `dist/continuous/community.js`. Contiene el dibujo de la casa, la memoria, `localStorage` `la-casa-community-drawing-v1`, la fila de casas y "Otras casas".
   - `dist/continuous/fondo.js`. Es el fondo continuo: blanco, negro y azul.
   - `dist/continuous/floor-plan.js`. Es la línea de grafito viva en las uniones entre ambientes.
   - `dist/continuous/inventory.js`. Es el inventario de la caja y los objetos del recorrido.
   - Los `.md` de la raíz: `RECORRIDO-ESPACIAL.md`, `SCROLL-FLUIDO.md`, `BARRILETE-CONTROL.md`, `COMUNIDAD-PROTOTIPO.md`, `CAJA-Y-RECORRIDO.md` y `MUSICA-ENTRADA.md`.

3. **Escribí un informe corto en `AUDITORIA-RESTO.md`** que diga:
   - En qué fase termina hoy la linterna. Yo entiendo que va de 8.02 a 8.6 y que a partir de 8.6 queda `awaiting-next-scene`.
   - Qué pasa hoy al seguir scrolleando. Lo que observé: el salto de los tramos retirados lleva de 8.6 a 17.6, y `#fh-next-house` (fondo negro) queda visible para siempre desde 7.28, porque `renderNextHouse` no tiene límite superior. Por eso todo lo que viene después queda tapado de negro.
   - Qué piezas viejas existen y se pueden reutilizar:
     - el panorama horizontal `p15` con casas de la comunidad (unas 17.6–21.8);
     - el dibujo y la memoria de `community.js`;
     - la escena de salida `#closing-scene`, activa desde `current > 24`, con el zoom out por la ventana con glicinas hasta 27.05;
     - `journeyLength = 29.05`.
   - Qué código viejo no sirve (por ejemplo, Daisy, cartas y cuaderno de casa3) y conviene dejar dormido.

   No borres código viejo. Desactivalo, ocultalo o dejalo en tramos que no se recorren.

---

## 1. Reglas que no se negocian

- **No modifiques nada de lo que pasa entre la fase 0 y la 8.6:** coming soon, landing, umbral, cocina, caja 3D, video, persiana, barriletes, incendio, soldaditos, «Gabriela Mistral 4860» y linterna. Tampoco la sensibilidad del scroll, el barrilete, el fuego, la música de entrada ni la caja.
  - **Única excepción permitida:** en `renderNextHouse` (first-house.js), agregale un límite de salida. La escena de la linterna tiene que irse cuando empieza la escena siguiente, por ejemplo con `visible = inside && p >= 7.28 && p < FIN_LINTERNA`. Además, cambiá el estado `awaiting-next-scene` por una transición hacia lo nuevo.
  - Cualquier otro cambio a algo existente me lo tenés que proponer antes de hacerlo.
- **Sacá `[8.6, 17.6]` de los tramos retirados** en `house-route.js`, porque ahí va lo nuevo. Si hace falta, reorganizá también `[21.8, 24]`. Actualizá `passages` con los rumbos nuevos y `floor-plan.js` con las uniones nuevas.
- **Todo tiene que ser reversible.** Scrollear hacia atrás desanda exactamente lo mismo. Nada de avances automáticos.
- **Movimiento reducido** (`prefers-reduced-motion: reduce`): versión vertical simple, sin vibraciones ni partículas.
- **Celular:** cada interacción con cursor necesita su equivalente táctil (mantener el dedo apoyado, arrastrar). Los gestos dentro de canvas y campos de texto no tienen que mover el recorrido.
- **Accesibilidad mínima:** `aria-label` en las escenas, `inert` en las que no están activas, y botones reales para las acciones.
- **Nada de textos inventados como si fueran míos.** Usá solo las letras y memorias que te paso abajo. Donde falte algo, dejá un marcador visible entre corchetes, por ejemplo `[memoria pendiente]`.
- **Sin cuentas, sin backend y sin publicación real.** Todo se guarda en `localStorage`/`sessionStorage`, como hoy.
- **No ejecutes** `integrate-scroll.cjs` ni recuperes `scroll-flow.js`, porque son experimentos retirados.

---

## 2. Arquitectura que quiero

- **Un archivo por bloque nuevo**, cargado después de los existentes y con su propio CSS:
  - `continuous/casa2-oscuridad.js` (+ `.css`)
  - `continuous/casa3-terrero.js` (+ `.css`)
  - `continuous/tu-casa.js` (+ `.css`)
  - `continuous/salida-final.js` (+ `.css`)
- **Una sola tabla editable de escenas** en `continuous/escenas-resto.js`. Cada escena tiene `id`, `inicio`, `fin`, `rumbo de entrada`, `fondo`, `canción`, `fragmento de audio`, `memoria` y `assets`. Así yo puedo mover tiempos sin buscar en el código.
- **Cada escena se registra en el tick existente** encadenando `window.casaRender`, como hace `community.js`. No crees otro bucle de animación ni otro controlador de scroll.
- **Assets provisorios.** Si un archivo de imagen o sonido no existe todavía, la escena tiene que funcionar igual con un dibujo provisorio (formas en canvas o SVG, en grafito o en los colores del proyecto) y un rótulo chico `[asset pendiente: nombre]`. Las rutas definitivas van a ser:
  - `dist/assets/casa2/…`
  - `dist/assets/casa3/…`
  - `dist/assets/tu-casa/…`
  - `dist/assets/salida/…`
- **Una sola tabla `FRAGMENTOS`** de audio por escena: `archivo`, `inicio_s`, `fin_s`, y letra con tiempos `[[segundo, línea], …]`. Al entrar a una escena hacé un fundido cruzado de 1,5 s al fragmento nuevo, sobre el reproductor existente. Por ahora todos los fragmentos pueden apuntar a la pista provisoria que ya hay. Si el visitante pausó la música, se respeta la pausa.
- **Tarjeta de memoria (sistema nuevo, solo en las escenas nuevas):** formato naipe vertical chico, papel blanco y número «MEMORIA Nº XX» arriba.
  - Título en Instrument Serif itálica.
  - Cuerpo en **estilo recuerdo**: IBM Plex Mono en minúscula, frases separadas por « / », una sangría distinta en cada línea, interlineado variable entre 0,9 y 1,75, y dos capas de texto, con la segunda desfasada abajo-derecha en lila (#B9A3DE) y pisando la primera.
  - Aparece a un costado de cada escena y se puede **arrastrar a la caja** con `hacerGuardable`.
  - Los textos van en una tabla `MEMORIAS`.
- **Paleta:**

| Uso | Color |
|---|---|
| Azul | `#2E4F86`, `#2D45A8`; trazo de dibujo `#335386` |
| Lila | `#B9A3DE`, `#C9B6E4`, `#9B83B2` |
| Tinta | `#1E1E1C` |
| Papel | `#F4F2EA` |
| Negro de la Casa II | el del fondo actual |

- **Tipografías:** las que ya carga la web (Instrument Serif, IBM Plex Mono).
- **Fondo continuo (`fondo.js`):** sumá los tramos nuevos.
  - Negro en la oscuridad, que pasa a azul noche cuando entra luz.
  - Azul noche → celeste en la madrugada.
  - Gris lluvia en Terrero.
  - Celeste frío en la mesa.
  - Papel en "Tu casa".
  - Lila en la salida.

---

## 3. El recorrido a construir (tentativo)

Las fases son orientativas: ajustalas para que el ritmo sea bueno y dejalas en la tabla. Hay **5 momentos**, no 10 pantallas, y dentro de cada uno pueden convivir varias cosas.

### Momento A · Casa II: de la linterna a la luz por los huecos — canción «Daiana» (fases ≈ 8.6 → 10.6)

- La linterna actual se gasta y se apaga. No la reemplaces: hacé un fundido de su última posición.
- Sobre el negro empiezan a abrirse **huecos irregulares** (máscara en canvas con `destination-out`). Por ahí entra luz azul noche.
  - Con el scroll se abren más.
  - **Algunos se vuelven a tapar solos** con una textura de cartón o chapa ("voy tapando agujeros").
  - El visitante también puede **raspar** la oscuridad con el cursor (o el dedo) para abrir uno más. Se cierra solo a los pocos segundos.
- Al final se ve casi entero **el pasillo de noche, con la glicina en lila, el laurel y el moral**.
- **Objeto guardable:** una flor de glicina (`COSAS.glicina` ya existe). Arrastrarla a la caja.
- **Frase en escena** (letra de «Daiana»): «Que la luz no entre / voy tapando agujeros».
- **Memoria:** «a mi mamá le encantaba el moral / juntaba moras en un tupper / y las guardaba en la heladera».
- **Rumbo:** el paso existente `{at:8.6, x:-1}` (hacia la izquierda) sirve.
- **Assets pendientes:**
  - `casa2/pasillo-noche.webp`
  - `casa2/hueco-01…08.png` (formas en alfa)
  - `casa2/tapa-carton.webp`
  - `casa2/glicina-flor.png`

### Momento B · Casa II: el niño y la madrugada — canción «El niño» (≈ 10.6 → 12.6)

- El fondo pasa de **azul noche a celeste de amanecer** con el scroll.
- Escena horizontal en paralaje de 3 capas: cielo, horizonte y pasto.
- **El niño corre en el lugar** mientras el paisaje pasa. Usá una secuencia de frames si existe; si no, la imagen `assets/nino.webp` con un leve rebote.
- El cursor, o el dedo, mueve apenas el horizonte (paralaje por puntero), sin cambiar la fase.
- Al final, con la luz, se ve **lo que quedó de la casa**: barro, restos y el sillón quemado.
- **Frases** (letra de «El niño»):
  - durante la corrida: «El niño salió corriendo, sobresaltado» / «Corro y lo hago a campo abierto»;
  - de cierre: «De nuestra casa / hay solo barro».
- **Memoria:** «me encantaba treparme al ligustro / y construir casitas ahí arriba».
- **El barro del final es el suelo del momento C:** que no haya corte, el barro continúa.
- **Assets pendientes:**
  - `casa2/nino-corre-01…08.png`
  - `casa2/cielo.webp`, `casa2/horizonte.png`, `casa2/pasto.png`
  - `casa2/restos-casa.webp`

### Momento C · Casa III, Terrero 3231: la lluvia y la mesa — canciones «Papa ra'y» y «Retrovisor» (≈ 12.6 → 15.8)

Las dos canciones conviven en un solo ambiente que se transforma.

1. **«Terrero 3231»** se escribe con la línea viva de grafito sobre el barro, igual que «Gabriela Mistral 4860».
2. **Baldosas de cerámica** se colocan solas sobre el barro con el scroll (reutilizá la idea de `casa3.js`, pantalla 12).
   - Memoria: «había cerámica / paredes revocadas / y hasta bañera / ahora tengo cerámica».
3. **Empieza a llover** (canvas de gotas). Hay **3 ollas** en el piso donde caen gotas y salpican.
   - Frases: «Parece que está lloviendo y no va a parar» / «Hoy ponemos olla en los huecos / y nos damos paz».
   - Encima hay un **vidrio empañado** que se limpia donde pasa el cursor o el dedo (`destination-out`) y se vuelve a empañar de a poco.
4. **Sin corte, la lluvia afloja y aparece la mesa puesta** (canción «Retrovisor»): platos, vasos y cubiertos.
   - Con el scroll, **todo se aleja hacia los bordes**, cada cosa a su "pieza".
   - Memoria: «cada uno comía en su pieza / yo también».
5. **Retrovisor:** arriba aparece un espejo ovalado. Dentro se ven, **cada vez más chicas**, las casas anteriores: Colodrero (fachada con la ventana), la persiana del salón y Gabriela Mistral en la oscuridad.
   - Usá provisoriamente capturas o recortes de assets que ya están en la web.
   - Frases: «Mirala a la inocencia hundiéndose en el retrovisor» / «Esta casa es un desastre y somos de acá».
6. **Al final queda un solo plato** (guardable, `COSAS.plato` ya existe) y **una puerta que se cierra** (2 o 3 frames). Detrás de la puerta empieza el momento D.

- **Fondo:** gris lluvia que pasa a celeste frío.
- **Assets pendientes:**
  - `casa3/barro.webp`, `casa3/baldosa.webp`
  - `casa3/olla-1…3.png`, `casa3/vidrio-empanado.png`
  - `casa3/mesa.webp`, `casa3/plato.png`, `casa3/vaso.png`, `casa3/cubiertos.png`
  - `casa3/marco-retrovisor.png`
  - `casa3/puerta-1…3.png`

### Momento D · «Tu casa» + la cuadra — canción «La bicicleta» (≈ 15.8 → 21.8)

Es la parte participativa y la más importante para la defensa. Tomá `community.js` como base y reorganizalo.

**D1. Tu casa (pausa activa)**
- Detrás de la puerta, sobre papel, aparece: «¿Cómo recordás tu casa?».
- **Lienzo para dibujar con la línea viva:** trazo azul `#335386`, con la vibración del grafito. Solo dibujar, deshacer y borrar. Las figuras cerradas se rellenan, como ya hace community.js.
- Al lado, **una tarjeta de memoria igual a las mías**, vacía, para escribir un título corto y una memoria. La memoria se muestra en estilo recuerdo mientras se escribe.
- **La portada se arma en vivo:** el dibujo aparece dentro del calado de la ventana de ladrillos (la ventana de la tapa del disco), con la memoria abajo.
- **Botones:**
  - **«Descargar portada»:** PNG de 2000 × 2000 con la plantilla de portada. El dibujo va centrado en el área de la ventana, con márgenes fijos.
  - **«Formato historia»:** PNG de 1080 × 1920.
  - **«Pedir mi disco»:** abre un formulario **simulado**. Dejá claro que es un prototipo y que no envía nada.
  - **«Sumar mi casa al barrio»:** guarda en `localStorage` y la casa aparece en la cuadra y en "Otras casas".
  - **«Seguir sin dibujar»:** siempre visible. Nadie tiene que quedar trabado.
- Mientras el lienzo o la tarjeta están en uso, el scroll **no** avanza el recorrido.
- **Sacá los nombres y las frases de ejemplo inventados** que hay en community.js (Ana, Nico, «En el patio siempre había una silla esperando», etc.). Las casas de ejemplo quedan **sin texto** o con `[memoria de la comunidad]`.

**D2. La cuadra**
- Scroll horizontal (reutilizá el panorama `p15` y las 44 casitas de `assets/casas-comunidad/recortes/`).
- Primer plano de manubrio de bicicleta, con un leve vaivén.
- Pasan en paralaje las casas dibujadas por otros. Al pasar el cursor, o tocar, se abre su memoria corta.
- **La última casa de la fila es la que dibujó el visitante** (si la sumó). Si no dibujó, la fila termina en un terreno vacío con «[tu casa podría estar acá]».
- **Frases** (letra de «La bicicleta»): «Recorramos el barrio» / «Toma la bicicleta y vamos juntos a atravesar este vendaval».
- **Sacá el retrovisor de esta pantalla:** ahora vive en el momento C.
- **Assets pendientes:**
  - `tu-casa/plantilla-portada-2000.png` (con el calado transparente)
  - `tu-casa/plantilla-historia-1080x1920.png`
  - `tu-casa/manubrio.png`
  - `tu-casa/barrio-capa-1.webp`, `tu-casa/barrio-capa-2.webp`

### Momento E · Salida por la ventana + menú final — vuelve «La casa» (≈ 21.8 → final)

- **Reutilizá `#closing-scene`:** el zoom out por la misma ventana del principio, ahora con glicinas.
  - **No cambies cómo funciona.** Solo ajustá su fase de inicio para que quede encadenada después de la cuadra, y actualizá `journeyLength`.
- **Agregá encima, en `salida-final.js`, lo que hizo el visitante:**
  - en el alféizar, **los objetos que guardó en la caja** (`E.caja`), chiquitos, en fila;
  - dentro del hueco de la ventana, **su dibujo**, en chico;
  - en un ladrillo, **su memoria escrita**, en estilo recuerdo;
  - si no hizo nada, aparecen solo las glicinas.
- **Frases** (letra de «La casa»): «Me estuve buscando y me encontré / entre glicina y laurel».
- **Menú final.** Cuando termina el zoom out, se habilita debajo de la ventana con 5 accesos de texto, con el mismo estilo que el menú escondido de la landing:
  1. **Recorrer el barrio:** abre "Otras casas" (lo existente), con las casas guardadas más las de la comunidad. Si podés, como lienzo que se arrastra en todas las direcciones.
  2. **El disco:** el reproductor con las 10 canciones (tabla `CANCIONES`; las que no tienen archivo quedan marcadas «pendiente») y el botón «Pedir la edición física» (formulario simulado).
  3. **Tu portada:** vuelve a descargarla.
  4. **Sobre La casa:** texto `[pendiente: 100–150 palabras]`.
  5. **Las casas que habité:** las tres casas con su número (Casa I, Casa II y Casa III) y sus canciones.
     - Antes de poner las direcciones completas, preguntame.
- **Volver a entrar:** debe seguir funcionando el reinicio que ya existe (el recorrido arranca en la ventana de entrada).

---

## 4. Canciones y nombres (tabla `CANCIONES`)

| Nº | Canción | Casa |
|---|---|---|
| 01 | La casa | introducción, de todas |
| 02 | 2001 | Casa I · Colodrero y A. del Valle |
| 03 | Fuego | Casa I |
| 04 | Mamá | Casa I |
| 05 | El niño | Casa II · Gabriela Mistral 4860 |
| 06 | Daiana | Casa II |
| 07 | En la oscuridad | Casa II |
| 08 | La bicicleta | Casa III · Terrero 3231 |
| 09 | Papa ra'y | Casa III |
| 10 | Retrovisor | Casa III |

Hay dos diferencias de grafía entre la web y el booklet: «Daiana/Diana» y «Papa ra'y/Paparaí». Dejá la grafía en una sola constante, para que yo la cambie en un solo lugar.

El orden del recorrido **no** sigue el del disco: la web mezcla canciones entre momentos y eso está bien.

---

## 5. Etapas de trabajo (entregá y probá cada una antes de seguir)

1. **Auditoría:**
   - `AUDITORIA-RESTO.md` y el respaldo;
   - el límite de salida de la linterna;
   - sacar `[8.6, 17.6]` de los tramos retirados;
   - la tabla `escenas-resto.js` con escenas vacías que solo muestran su nombre.

   Con esto, **ya tiene que poder recorrerse de punta a punta** con scroll, hacia adelante y hacia atrás, sin pantallas negras trabadas.
2. **Momento A** (huecos de luz) y **Momento B** (el niño).
3. **Momento C** (lluvia → mesa → retrovisor → puerta).
4. **Momento D** (Tu casa + la cuadra), reorganizando community.js.
5. **Momento E** (salida con lo del visitante + menú final).
6. **Sistemas:** las tarjetas de memoria en las escenas nuevas y la tabla `FRAGMENTOS` de audio con letra sincronizada.
7. **QA:**
   - un script en `.qa-crops/resto-test.cjs` que salte a cada escena, compruebe que se ve, que se puede volver atrás, y que la caja y el dibujo se guardan;
   - capturas de escritorio (1440 × 900) y móvil (390 × 844) de cada momento en `CAPTURAS-RESTO/`;
   - un `RESTO-DEL-RECORRIDO.md` con la tabla final de fases, qué assets faltan (con nombre exacto, tamaño sugerido y formato) y qué decisiones quedaron abiertas.

**Para probar rápido:** en la consola, `reachInside(); target = current = X;` lleva a la fase X. El vuelo del barrilete puede trabar el avance. Para saltearlo, en sessionStorage `la-casa-first-house-v2` poné `flight.phase = 'fallen'` y `soldiers: true`. Usá `?vista=landing` para saltear el coming soon.

---

## 6. Qué NO hacer

- No conviertas esto en un juego con puntajes, ni en un paso a paso con flechas o "siguiente".
- No pongas una pantalla por canción.
- No uses QR ni enlaces externos.
- No inventes memorias, letras, nombres de personas ni datos de mi vida.
- No cambies colores, tipografías ni escenas existentes.
- No agregues librerías nuevas pesadas. Three.js ya está para la caja: no lo uses para escenas nuevas salvo que te lo pida.

Cuando termines cada etapa, decime qué hiciste, qué fases ocupa, qué assets provisorios usaste y qué necesitás de mí.
