# Léeme primero — para quien continúe este proyecto (ChatGPT u otra IA)

Este archivo documenta TODO lo que se decidió y se cambió en la sesión de trabajo del 25/10/2026 (con Claude), sobre la base de la v77 que ya traía este proyecto. Es el documento más actualizado del paquete — más reciente que CLAUDE_CONTINUAR.md (que quedó desactualizado, lo dejo igual como referencia histórica de cómo se llegó a la v77).

Si vas a seguir trabajando esta web: leé esto antes de tocar nada, respetá las decisiones ya tomadas (no son "ideas", son cosas que Alexis ya confirmó y probó), y preguntale a él antes de rediseñar algo que acá se da por resuelto.

La estructura real de archivos queda en `dist/` (la web que funciona) y `source-materials/` (los originales sin optimizar, por si hace falta reconvertir algo).

---

# Web — estado al retomar la v77 (25/10/2026)

Base de trabajo desde ahora: La-Casa-v77-para-Claude.zip (versión editada en ChatGPT). Las versiones anteriores de Claude (etapa1, experimental-2) quedan como referencia, no como base.

## Qué es la v77
- Web estática. Motor principal y estilos dentro de dist/index.html; escenas en dist/continuous/ (casa, casa2, casa3, fondo, rooms, first-house, prefs).
- Recorrido de 0 a 27 aprox.: entrada por la ventana (scroll inicia el video) → zoom → video con dos frases → cocina (rooms.js) → caja → persiana → salón/fiesta → cartón → barrilete → macro/quemado → soldaditos (first-house.js) → segunda casa (7.6–13.6) → tercera casa (14.6–22) → salida por la ventana con glicinas y menú del umbral.
- Partió de la etapa 3 de Claude: no incluye las capas posteriores (salida casa4 con huella, capas experimentales de tinta/olvido/filtraciones/ambiente, memoria con cuatro tipos de texto, zócalos «vivos»). La salida actual es la de ChatGPT (glicinas).

## Revisión del 25/10 (navegador de prueba)
- Funciona de punta a punta.
- Error: los cursores propios (mano, tijera, crayón, lupa) pedían una ruta inexistente miles de veces y nunca se veían. Corregido en la copia de trabajo.
- Error: el volumen de la música podía quedar negativo al iniciar el fundido. Corregido.
- Observación, sin tocar: en la primera casa cada escena se funde a papel vacío en los bordes (2.0, 3.0, 4.0, 5.0 quedan en blanco). Contradice el pedido anterior de pantalla continua; consultar antes de cambiar.
- Observación, sin tocar: una textura del baldío (fragment-118) queda visible tenue sobre la tercera casa.

## Cambios del 25/10 (misma sesión)

**1. Escalonar la entrada de la cocina.** El papel sube primero (fase .52→1.2); los muebles (alacena, mesa, tele) no empiezan a entrar hasta fase 1.0 y terminan en 1.6. Archivo: `continuous/rooms.js`.

**2. Caja de zapatillas en 3D.** Se reemplazó la caja plana por el modelo `.glb` de Alexis, renderizado con three.js (no con `<model-viewer>`: necesitábamos abrir/cerrar la tapa a mano). Se carga vía `importmap` + ES modules desde CDN (three.js 0.160.0), sin instalar nada. Fija en la alacena, en el estante de los platos, cerrada por defecto; al scrollear se agranda y centra; mientras está centrada un clic abre/cierra la tapa y se puede rotar arrastrando; al seguir scrolleando se achica a un widget fijo abajo a la derecha. El ángulo de apertura de la tapa se obtuvo probando el modelo real en un render de three.js aparte, no a ojo. Archivos: `continuous/first-house.js`, `continuous/first-house.css`, `index.html` (carga de three.js).

**2b. Ajustes (segunda ronda, sobre feedback de Alexis).** Recorte de la caja corregido (cálculo de distancia de cámara con margen fijo del 40%). Rotación confirmada: solo eje horizontal. Textura nueva (collage fotocopiado B/N) aplicada al modelo 3D — probada antes en un render local: las caras interiores muestran bien el grano, las exteriores caen en zonas más lisas del mismo collage (no es error, es cómo se reparte el UV sobre esa imagen).

**3b. Persiana — rehecha.** Se dejó de usar `persiana-cerrada.webp` (no coincidía en escala con las otras). Dos capas a la misma escala: `persiana-calado.webp` (pared completa) arriba, `persiana-textura.webp` (persiana sola) debajo, en el rectángulo donde va dentro de la foto de la pared. Aparece mucho antes (con la caja todavía grande), entra deslizándose desde abajo (no con fundido), y al seguir scrolleando la persiana se levanta de verdad.

## Cambios del 25/10 (tercera ronda — mismo día, feedback adicional)

**4. Frases de la escena de memoria ("No me acuerdo de todo" / "De algunas cosas, sí") a la misma altura.** El código mezclaba dos cosas: cuánto tiempo está visible cada frase y cuánto tarda en subir. La segunda frase usaba una ventana de "subida" mucho más ancha (porque también era su ventana de visibilidad, mucho más larga), así que subía mucho más lento y se quedaba abajo. Separé ambos tiempos: la segunda frase ahora sube en el mismo tiempo que la primera y después se queda arriba, quieta, el resto de su tiempo en pantalla. Archivo: `index.html` (la frase vive en el script principal, no en first-house.js).

**5. La caja 3D debe aparecer junto con la alacena, no en un corte después.** La caja esperaba hasta fase 1.55 para hacerse visible, mientras que la alacena empieza a entrar en fase 1.0. Ahora la caja empieza a seguir el movimiento de la alacena desde fase 1.0 (con un fundido de entrada rápido), así sube junto con el mueble en vez de aparecer de golpe cuando ya está casi en su lugar. También hasta ahora toda la sección "primera casa" (que incluye la caja) no se activaba hasta fase 1.2 — la bajé a 0.95 para que la caja pueda empezar a seguir el movimiento desde el principio.

**6. La pared con la persiana ahora realmente tapa la cocina al subir (antes se usaba un desenfoque de parche).** Encontré la causa real: la sección "primera casa" (`#first-house`) tenía z-index 9, pero la sección de la cocina (`#remembered-rooms`) pasa a z-index 12 mientras está activa — es decir, la cortina de la persiana JAMÁS pudo taparla por apilamiento, sin importar su propio z-index interno. Por eso antes se recurría a desenfocar la cocina como parche en vez de taparla de verdad. Subí `#first-house` a z-index 13 (por encima de la cocina) y saqué el desenfoque: ahora la persiana tapa por superposición real, deslizándose desde abajo, sin fundido ni blur.

**7. La caja se achica un poco antes de que la persiana termine de cubrir la pantalla.** Antes el achicamiento (2.85→3.1) terminaba casi al mismo tiempo que la pared terminaba de subir (2.5→2.95). Ahora el achicamiento empieza antes (2.6→2.9) y la pared sube un poco después (2.55→3.0), para que la caja ya esté chica cuando la pantalla se cubre del todo.

**8. La caja más grande todavía.** De ~62% del ancho de pantalla (máx. 760px) a ~74% (máx. 940px).

**9. La persiana (la mancha negra) ahora ocupa todo el hueco del portón, no un recorte chico.** Medí mal la primera vez: usé solo la franja clara del medio de la foto. Medí de nuevo por píxeles la región real del hueco en `persiana-calado.webp` y `persiana-textura.webp` (23.5%–76.4% horizontal, 33.5%–90.3% vertical) y además recorté `persiana-textura.webp` para sacarle el margen blanco que tenía alrededor (antes `background: cover` escalaba la imagen entera, margen blanco incluido, así que se veía un recuadro blanco en vez de negro sólido). Ahora la persiana llena todo el hueco en negro real.

Verifiqué los puntos 5 a 9 con un render local (tres.js no carga en este entorno por falta de salida a internet, así que vi la caja con su imagen de reemplazo en vez del modelo 3D real, pero el tapado de la cocina, el timing y el tamaño del hueco de la persiana los pude confirmar visualmente).

## Cambios del 25/10 (cuarta ronda — mismo día, feedback adicional)

**10. Caja más grande todavía, sin robot ni billetes.** Alexis pidió sacar por ahora los dos "offers" arrastrables (robot y billete, para guardar en la caja) y el poema/texto de ayuda de la caja plana — no se van a usar por el momento. Quedan desactivados con `display:none` en CSS (no borrados: fácil de reactivar) y el bucle que los creaba quedó comentado en `first-house.js`. La caja pasó de ~74% del ancho (940px) a ~84% (1120px). Archivos: `continuous/first-house.css`, `continuous/first-house.js`.

**11. Salida de la cocina con corte recto, no con desvanecimiento.** Antes la cocina (mesa, alacena, tele) se iba con un fundido de opacidad propio, y *después* entraba el papel por abajo — es decir, dos efectos pisándose en vez de uno solo. Ahora la cocina se queda completamente opaca (sin fundido) hasta que el papel la tapa de verdad con un borde recto que sube desde abajo, igual que el recurso de la intro cuando el fondo pisa el video. Archivo: `continuous/rooms.js` (se usó `.kitchen-paper-cover`, una capa que ya existía para esto pero estaba mal sincronizada con el fundido viejo).

**12. Persiana con las dos imágenes PNG con alfa real que pasó Alexis.** Reemplacé `persiana-calado.webp` (pared completa) y `persiana-textura.webp` (persiana sola) por conversiones directas de sus dos PNG nuevos — sin redimensionar ninguno, mismo tamaño/resolución original de cada uno, y conservando el canal alfa en la conversión a WebP. Como ambas imágenes ahora tienen transparencia real (el hueco del portón es transparente en la foto de la pared; el margen de la textura de la persiana también lo es), ya no hace falta medir ningún rectángulo a mano: las dos capas van simplemente a pantalla completa (`inset:0`, mismo tamaño) y encajan solas por la transparencia. Se sacó `persiana-cerrada.webp` del todo (no se usaba). Verificado con capturas: la persiana ahora llena exactamente el hueco del portón, sin fondo visible alrededor.

Verifiqué los puntos 10 a 12 con Playwright local (emulando `prefers-reduced-motion` para saltar el video de la intro, que no reproduce en este entorno sin salida a internet): la caja se ve notablemente más grande y sin elementos sueltos, el corte de la cocina es nítido (confirmé el clip-path avanzando de 100%→0% entre fase 1.7 y 2.1) y la persiana cubre el hueco del portón sin fondo visible.

## Cambios del 25/10 (quinta ronda — mismo día, feedback adicional)

**13. Apertura de la persiana: movimiento real, no máscara.** El "levantamiento" de la persiana se hacía con `clip-path` sobre la imagen de la persiana — es decir, la imagen se quedaba quieta y se le recortaba progresivamente la parte de abajo, simulando que subía pero sin que realmente se moviera (ni las líneas de la persiana se desplazaban). Alexis pidió específicamente que NO sea una máscara: que la imagen de la persiana se mueva de verdad hacia arriba, para ver cómo las líneas se desplazan. Cambiado a `transform: translateY()` directo sobre `.fh-metal-roll`. Como la persiana (z:1) ya estaba por detrás de la pared calada con alfa real (z:2, `persiana-calado.webp`), el desplazamiento vertical de la textura se ve recortado naturalmente por la transparencia de la pared — exactamente al hueco del portón — sin necesidad de ninguna máscara adicional. Lo que queda al descubierto al subir la persiana es el fondo oscuro propio de `.fh-shutter` (simulando el hueco abierto). Archivo: `continuous/first-house.js`.

**Nota para futuras imágenes con calados/transparencia:** Alexis va a pasar siempre las imágenes al mismo tamaño exacto (misma resolución) cuando haya capas que deban encajar por transparencia — confirmado como su forma de trabajo preferida para este tipo de piezas.

## Cambios del 25/10 (sexta y séptima ronda — mismo día, feedback adicional)

**14-15. Scroll continuo: sin tramos "duros"/estáticos hasta la persiana.** Alexis pidió que ninguna escena quede quieta ni un instante mientras se scrollea. Encontré y cerré varios huecos reales donde, aunque la fase de scroll seguía avanzando, nada en pantalla se movía todavía:
  - **Caja:** el mueble terminaba de entrar en fase 1.6, pero la caja recién empezaba a crecer en 2.0. Ahora el crecimiento arranca apenas el mueble se asienta (1.6), terminando en el mismo punto que antes (2.42).
  - **Papel que tapa la cocina:** empezaba a subir en 1.7 en vez de 1.6; ahora arranca en 1.6, justo cuando el mueble termina de asentarse.
  - **Persiana:** necesitó dos ajustes. El primero (arrancar el levantamiento en 3.25 en vez de 3.55) no alcanzó — seguía sintiéndose un corte cuando la pared terminaba de encajar. El segundo, definitivo: la pared ahora empieza a deslizarse en fase 2.4 (justo cuando termina de aparecer la cortina) y la persiana empieza a levantarse en fase **2.85 — antes de que la pared termine de encajar (2.85 a 3.0 todavía es la cola final del deslizamiento de la pared)**. El "encaje" de la pared y el inicio del levantamiento quedan superpuestos, como un solo movimiento continuo, sin ningún instante quieto en el medio. Verificado con Playwright: en fase 2.9 la persiana ya se movió unos píxeles mientras la pared todavía está terminando de entrar.
  - Archivo en todos los casos: `continuous/first-house.js` (y `continuous/rooms.js` para el papel).

**16. Borde del papel que tapa el video de la intro: de zigzag a recto.** El primer papel blanco que cubre el video climático (`#paper-tide`) tenía un borde superior con una leve forma de zigzag (`clip-path: polygon(...)`). Se quitó por completo — el elemento ya es un rectángulo simple. Archivo: `index.html`.

## Cambios del 25/10 (octava ronda — mismo día, corrección)

**17. Se había dejado de ver la caja 3D real — revertido el margen de cámara.** En la ronda 10 había reducido el margen de encuadre de la cámara en three.js de 1.4× a 1.1× el radio del modelo, para que la caja se viera más grande dentro de su lienzo. Alexis reportó que con esto dejó de verse la caja 3D (probablemente la geometría —sobre todo con la tapa abierta o rotando— empezaba a salirse del cuadro de la cámara al quedar tan ajustado el margen). Revertido a 1.4× — el valor que ya se había confirmado como seguro contra recortes en la ronda 2b. El tamaño grande en pantalla (los ~84% del ancho, 1120px) se mantiene intacto: eso lo controla el tamaño del lienzo en CSS, no el margen de la cámara, así que no se perdió nada de lo pedido en la ronda 10 sobre el tamaño. Archivo: `continuous/first-house.js`.

**Nota:** no pude reproducir el problema en este entorno porque three.js no carga sin salida a internet (siempre veo la imagen de reemplazo, nunca el modelo 3D real), así que el revert se hizo por análisis de código, no por verificación visual directa del modelo real. Importante: confirmar en el sitio real que la caja 3D vuelve a verse bien, con margen de sobra para la rotación y la apertura de la tapa.

## Cambios del 25/10 (novena ronda — mismo día, corrección importante)

**18. Encontrada la causa real de "no se ve la caja 3D / sigue apareciendo la caja vieja, plana y marrón".** No era un problema de código ni de cámara (el revert de la ronda 8 estaba bien, pero no era la causa). El problema era específico de esta previsualización (el Artifact donde Alexis la está viendo), no del sitio real:

- Los Artifacts de Claude no pueden servir archivos `.glb` binarios directamente. Para que la caja 3D funcione en esta previsualización, existen dos archivos adicionales (`continuous/box-model-data.js`, con el modelo entero codificado en base64, y `continuous/box-model-boot.js`, que lo decodifica) que convierten ese modelo en algo que el navegador sí puede cargar ahí dentro. En el sitio real (fuera de esta previsualización) no hacen falta: el modelo se sirve directo como `.glb`.
- Cada vez que publiqué una nueva versión de la previsualización esta sesión (rondas 10 a 17), copié el `index.html` completo desde la copia de trabajo real — y esa copia real nunca tiene (ni debe tener) esas dos líneas de carga, porque no las necesita. Al copiar entero el archivo, esas dos líneas se perdían silenciosamente en la previsualización, sin ningún aviso ni error visible.
- **Corregido en su momento, pero volvió a pasar en la ronda 11** (ver punto 21 más abajo): es un problema recurrente mientras siga dependiendo de que yo me acuerde de reinsertar esas líneas a mano cada vez.

**Sobre "borremos esa caja vieja que teníamos" (primer pedido).** En esta ronda revisé la caja plana vieja (`.fh-box`) y la dejé así: ya estaba invisible por CSS, no era la causa de lo que Alexis veía. Decidí no tocarla todavía. **Esto se revirtió en la ronda 12: Alexis volvió a pedirlo explícitamente y esta vez se borró del todo (ver punto 22).**

## Cambios del 25/10 (décima ronda — mismo día, escena nueva del salón)

**19. Reemplazada la fiesta genérica (siluetas sueltas de `legs.webp`, luces arrastrables) por la escena real del salón que Alexis definió.** Esta es la escena que aparece detrás de la persiana, en el mismo rango de fase que ya ocupaba la fiesta vieja (fase 4.0 a 5.0, justo después de que la persiana termina de levantarse).

**Material usado** (carpeta nueva `assets/first-house/salon/`, todas las imágenes a 3072×2048, con el canal alfa conservado al convertir a WebP):
- `salon-01.webp` — foto base del salón (fondo).
- `salon-02.webp` / `salon-03.webp` — el nene armando el barrilete, dos posturas (mirando el barrilete / mirando a cámara).
- `persona-01` a `persona-12` — los doce recortes de gente sueltos que pasó Alexis.

**Primera implementación (versión 16): mecanismo equivocado.** Armé esta primera versión como un fundido cruzado (dissolve) entre la escena de la persiana y la escena de la fiesta, con direcciones de salida arbitrarias por persona. Alexis corrigió esto en el siguiente mensaje: no debía haber ningún fundido — ver corrección en la ronda siguiente.

## Cambios del 25/10 (undécima ronda — mismo día, corrección importante del mecanismo del salón)

**20. Corregido el mecanismo de revelado del salón, según indicó Alexis explícitamente.** La versión 16 estaba mal: no se trata de un fundido cruzado entre la persiana y la fiesta. El mecanismo correcto es un enmascarado real, igual al que ya usa la persiana para tapar la cocina, pero extendido a toda la escena del salón:

- La escena del salón (fondo + nene + las doce personas, todo ya armado, nadie aparece de a uno) está **siempre ahí, detrás de la pared calada**, desde que arranca esta parte del recorrido — no aparece después con ningún fundido.
- Lo único que la revela es que la persiana (que está encima, con el hueco real por transparencia) se va levantando: a medida que sube, deja ver lo que ya estaba atrás.
- Una vez que la persiana termina de subir del todo, **la pared calada NO desaparece**: se queda como el marco/arco que contiene a toda la escena.
- A partir de ahí, seguir scrolleando hace un **zoom in continuo a toda la composición junta** (pared + escena, como un solo grupo que se escala igual) — sin ningún fundido en el proceso. El zoom converge hacia la posición del nene en la imagen (no hacia el centro de la pantalla).
- La escena se divide en una mitad izquierda y una mitad derecha, con el eje marcado por dos personas del centro: la chica de pantalón blanco (`persona-09-centro-pantalon-blanco`) de un lado y, pegada a ella, la chica sonriendo de frente (`persona-03-top-blanco`) del otro. Cada persona se va hacia SU lado del eje, por **niveles de profundidad** (no todas juntas): primero el nivel más cercano a cámara, después el siguiente, así hasta llegar a las dos personas del eje, que se van últimas y recién ahí revelan al nene (sin fundido de entrada propio: siempre estuvo ahí, tapado por el z-index de la gente que tenía delante).
- La música se dejó completamente sin tocar, como pidió Alexis.

**Cómo quedaron identificadas las doce personas (confirmado por hash exacto de archivo, no a ojo).** Alexis volvió a mandar las imágenes agrupadas por lado (izquierda y derecha, cada una de más cerca a más lejos de cámara), lo que permitió comparar byte a byte contra los doce recortes originales y corregir dos identificaciones que había hecho mal la ronda anterior por parecido visual:
- El archivo que había asignado como "persona-08-rayas" en realidad es el chico con el celular, cortado, el más cercano a cámara del lado izquierdo — renombrado a `persona-08-celular-cortado.webp`.
- El archivo que había asignado como "persona-04-otra-derecha" en realidad está del lado izquierdo (chica con vaso, de espaldas/perfil, pelo largo) — renombrado a `persona-04-vaso-espaldas.webp`.
- La imagen que había quedado sin usar (el primer intento de "persona-01-celular") sí se usa: es el 6.° de siete, del lado derecho.

**Lado izquierdo** (de más cerca a más lejos, termina en el eje): persona-08 (celular cortado) → persona-04 (vaso, espaldas) → persona-06 (remera blanca, cerveza) → persona-07 (remera negra, brazo) → persona-03 (top blanco, eje).
**Lado derecho** (de más cerca a más lejos, termina en el eje): persona-12 (espaldas, pelo largo) → persona-05 (gorra, cerveza) → persona-02 (vaso, izq) → persona-11 (perfil, vaso) → persona-10 (espaldas) → persona-01 (celular) → persona-09 (centro, pantalón blanco, eje).

**Niveles de profundidad usados para escalonar la salida** (izquierda y derecha emparejadas por cercanía relativa; niveles 5 y 6 son solo del lado derecho porque ese lado tiene más gente):
1. persona-08 + persona-12 — las más cercanas, se van primero.
2. persona-04 + persona-05.
3. persona-06 + persona-02.
4. persona-07 + persona-11.
5. persona-10 (solo derecha).
6. persona-01 (solo derecha).
7. persona-03 + persona-09 — el eje, se van últimas y revelan al nene.

**Bug encontrado y corregido en el camino:** `.fh-shutter` tenía su propio `background:#1c1c1a` pintando todo el rectángulo — eso tapaba la escena del salón incluso donde la pared calada tenía transparencia real. Se sacó ese `background` del todo.

**Limitación detectada, resuelta en la ronda siguiente:** Alexis reportó después que el fondo de la fiesta se veía "como nada" — porque las imágenes del salón estaban a pantalla completa (mismo tamaño que la pared), así que lo que se veía por el hueco (bastante más chico que la pantalla) era solo un recorte sin sentido del centro de la composición, no la escena completa. Ver corrección en el punto 22.

## Cambios del 25/10 (duodécima ronda — mismo día, feedback adicional: caja 3D, escala del salón y ritmo del zoom)

**21. Vuelve a aparecer la caja vieja en la previsualización — causa de fondo encontrada y resuelta de manera más permanente.** Es el mismo problema ya descripto en el punto 18 (los Artifacts no pueden servir `.glb` directo, hace falta inyectar `continuous/box-model-data.js`/`box-model-boot.js` en el `index.html` de la previsualización), pero volvió a pasar porque en la ronda 11 publiqué el `index.html` de la copia de trabajo real directamente, sin reinyectar esas dos líneas. Esta vez, además de volver a corregirlo, hasta que Alexis tenga el sitio desplegado en un hosting real (sin esta limitación del todo), voy a mantener separado un `index.html` específico para esta previsualización (con esas dos líneas agregadas) de la copia de trabajo real (que nunca las lleva), para publicar siempre desde ese archivo y no desde una copia fresca del real. Confirmé igual que el modelo embebido sigue siendo exactamente el mismo `.glb` actual (hash idéntico).

**22. Borrado el código muerto de la caja plana vieja, como pidió Alexis explícitamente esta vez.** Se sacó por completo: el HTML de `.fh-box-scene`/`.fh-poem`/`.fh-box`/`.fh-offers`/`.fh-box-help`, el CSS asociado, la función `draggable()` (que además nunca se llamaba desde ningún lado — también muerta), el manejo de clics sobre `.fh-box`, el bloque de `boxProgress`/`boxLayer` en el render, y las entradas `box`/`lid` del mapa de assets. Lo único que queda de la caja vieja es `.fh-box-anchor` (el div invisible que marca dónde va posicionada la caja 3D en la alacena — no tiene relación con la caja plana, es parte del sistema nuevo). `syncObjects()` se limpió pero conservando todo lo que sigue haciendo falta (mostrar/ocultar robot y billete guardados, y lo que usa la escena de macro/quemado). Archivos: `continuous/first-house.js`, `continuous/first-house.css`.

**23. La escena del salón se escaló al tamaño real del hueco de la persiana, no a pantalla completa (primer intento, insuficiente).** Esto era la causa de que Alexis viera "como nada" al revelarse la fiesta: las imágenes del salón llenaban toda la pantalla (igual que la pared), así que por el hueco —mucho más chico— solo se veía un recorte sin sentido del medio de la composición. En esta ronda medí por píxeles el hueco real en `persiana-calado.webp` (23.8%–76.1% horizontal, 33.9%–89.8% vertical) y até el contenedor de la escena del salón (`.fh-salon`) a ese mismo rectángulo **como porcentajes fijos de CSS**, en vez de a toda la pantalla. **Esto resolvió el problema de escala en el momento, pero resultó insuficiente: ver la corrección definitiva en el punto 26 de la ronda siguiente** — los porcentajes fijos solo coincidían con el hueco real a una proporción de pantalla específica; en otras proporciones (pantalla angosta, ventana chica, pantalla completa) dejaban ver bordes negros a los costados y podían recortar a la persona más a la izquierda.

**24. El punto de convergencia del zoom se recalculó para la escena ya escalada, y se bajó un poco más, como pidió Alexis.** El `transform-origin` del zoom (que antes apuntaba a la posición del nene calculada sobre la imagen completa a pantalla completa) se recalculó para la nueva escena escalada (combinando la posición del hueco en pantalla con la posición del nene dentro de esa imagen) y después se corrió un poco más abajo todavía, a pedido de Alexis ("bajemos la cámara un poco más", "que quede más centrado"). Quedó en `54.5% 80%`. Archivo: `continuous/first-house.css`.

**25. La gente ahora tarda mucho más en irse, y recién empieza a irse cuando ya se hizo bastante zoom.** Antes (ronda 11) la dispersión arrancaba casi inmediatamente después de que la persiana terminaba de subir, y cada persona se iba rápido (duración 0.22). Alexis pidió lo contrario: que primero se vea un buen tramo de puro zoom con todos enteros, y que recién después empiecen a irse, más lento. Ahora:
  - Hay un tramo de zoom puro, sin nadie yéndose, de fase 3.95 a 4.2 (antes esto arrancaba casi de inmediato, en 3.98).
  - Cada persona tarda más en irse del cuadro: 0.28 de duración en vez de 0.22 (más lento, menos brusco).
  - Los siete niveles de profundidad quedaron más juntos entre sí en el tiempo (cada 0.07 en vez de 0.09) para que, sumado a la duración más larga de cada uno, el efecto sea un flujo continuo y superpuesto de gente yéndose, no tirones separados — y para que el eje (nivel 7) termine de irse con margen antes de que arranque el desvanecimiento hacia el cartón.
  - El rango total del zoom se extendió levemente (de 3.95–4.9 a 3.95–5.0) para darle más recorrido a todo esto sin tener que estirar las escenas siguientes (cartón, barrilete, etc., que no se tocaron).
  - Archivo: `continuous/first-house.js`.

**Verificado con Playwright local** (con la caja 3D: confirmé que `window.__fhBoxGLB` queda seteado a un blob válido —la parte que de verdad podía fallar y ya había fallado antes—, aunque no pude ver el render 3D en sí en este entorno porque three.js no carga sin salida a internet, igual que en rondas anteriores; con el salón: recorrí fases 4.2 a 5.15 y confirmé que la fiesta se ve completa y reconocible dentro del hueco, que nadie se mueve hasta 4.2, que la dispersión es notablemente más lenta y superpuesta, que el nene queda bien revelado y centrado con margen antes del cruce hacia el cartón, y que ese cruce sigue siendo limpio). Sin errores de consola propios de este código.

## Cambios del 25/10 (decimotercera ronda — mismo día, feedback adicional: persona faltante, escena adaptable, sincronía con la pared)

**26. La escena del salón ahora encaja en el hueco de la persiana a cualquier tamaño de pantalla — reemplazados los porcentajes fijos por un cálculo dinámico que replica `background-size:cover`.** Alexis reportó bordes negros a los costados al achicar la ventana o pasar a pantalla completa, y que faltaba el hombre de la izquierda en primer plano (`persona-08-celular-cortado`). Encontré la causa raíz de ambos reportes: los porcentajes fijos de CSS de la ronda 23 (23.8%–76.1% / 33.9%–89.8%) solo coinciden con el hueco real cuando la proporción de la ventana se parece a la proporción nativa de `persiana-calado.webp` (1920×1081). `background-size:cover` recorta distinto según cuánto difiera el ancho/alto real de la ventana de esa proporción — a otra proporción, el hueco visible en pantalla se corre respecto de esos porcentajes fijos, dejando franjas negras de un lado y recortando contenido del otro (probablemente a la persona más a la izquierda, la más cercana al borde del hueco).

- Agregué `layoutSalon()` en `continuous/first-house.js`: una función que, en cada frame, calcula el mismo recorte que hace `background-size:cover` con las dimensiones reales de la ventana (`innerWidth`/`innerHeight`) contra la resolución nativa de la pared (1920×1081) y las coordenadas del hueco medidas por alfa (`HUECO`), y aplica el resultado como `left`/`top`/`width`/`height` en píxeles, directamente en el estilo de `.fh-salon`. Así el rectángulo de la escena del salón sigue exactamente a dónde cae el hueco real de la pared, sea cual sea el tamaño o la proporción de la pantalla — sin bordes negros y sin recortar a nadie.
- Se agregó un margen de salida (`SALON_BLEED`, 2%) para que la escena sobre un poquito del hueco en vez de quedar justa al píxel, más seguro contra errores de redondeo que dejarían un borde negro de un píxel.
- `.fh-salon` en CSS volvió a no tener posición/tamaño fijo (`position:absolute;overflow:hidden` nada más) — ahora ese rectángulo lo pone `layoutSalon()` en JS, no CSS fijo.
- Verificado con Playwright en tres proporciones de pantalla distintas (ancha 1400×900, angosta 420×900, cuadrada 1200×1200): sin bordes negros en ninguna, y el hombre de la izquierda (persona-08) presente y visible en las tres.

**27. La escena del salón ahora aparece junto con la pared calada y la persiana, no antes ni superpuesta a la caja.** Alexis reportó que la fiesta aparecía ya agrandada junto a la caja 3D todavía grande, antes de que la pared terminara de encajar. La causa: `.fh-party` (la capa que contiene a toda la escena del salón) empezaba a hacerse visible por opacidad en fase 2.2 —igual que la pared— pero, a diferencia de la pared (que desliza desde abajo con `translateY`, fuera de pantalla, hasta encajar en su lugar), la escena del salón estaba siempre a pantalla completa sin ningún desplazamiento propio. Entonces, apenas la opacidad subía, la fiesta ya se veía en toda la pantalla, superpuesta a la caja 3D (todavía grande en ese rango de fase) en vez de esperar a la pared. Corregido: `party.style.transform` ahora usa exactamente el mismo `translateY` que `shutter.style.transform` — la escena del salón se desliza junto con la pared y la persiana, como un solo movimiento, y solo queda a la vista una vez que ambas llegan a su lugar. Archivo: `continuous/first-house.js`.

**Verificado con Playwright** en las mismas tres proporciones de pantalla, en tres momentos (fase 2.3 "caja y pared apareciendo", fase 4.0 "escena revelada", fase 4.2 "completa antes de dispersar"): confirmé que en fase 2.3 la fiesta no se ve (solo la caja, que no renderiza en este entorno sin internet — limitación ya conocida, no relacionada con este cambio), es decir ya no aparece de golpe superpuesta; y que en fase 4.0 y 4.2 la escena encaja justo en el hueco en las tres proporciones, sin bordes negros, con el hombre de la izquierda presente. Sin errores de consola propios de este código.

**Importante — sigue pendiente confirmar la caja 3D real en esta ronda:** al igual que en rondas anteriores, no pude ver el modelo 3D real en este entorno (three.js no carga sin salida a internet). Esta ronda no tocó nada de la caja 3D en sí (solo el código de la escena del salón), así que no debería haber cambiado nada ahí, pero vale confirmarlo quien lo vea con internet.

## Cambios del 25/10 (decimocuarta ronda — mismo día, feedback adicional: persona-08/04 ya están en la escena, ventana de interacción de la caja, cierre automático de la tapa, dispersión todavía más tardía)

**28. Sobre "falta él" / "falta la chica del vaso": esas dos personas YA ESTÁN en la escena — son exactamente `persona-08-celular-cortado` y `persona-04-vaso-espaldas`.** Alexis adjuntó dos imágenes (un hombre de perfil con el celular, una chica de espaldas con un vaso) pidiendo agregarlas "arriba de todo, del lado izquierdo". Antes de duplicar nada, comparé esas dos imágenes byte a byte contra los assets ya usados en el código — son **pixel por pixel idénticas** a `persona-08-celular-cortado.webp` y `persona-04-vaso-espaldas.webp`, que ya están en la escena desde la ronda 11 (son, de hecho, los dos del "lado izquierdo, nivel 1 y 2" — los más cercanos a cámara, los primeros en irse). No agregué capas duplicadas: habría quedado la misma persona superpuesta dos veces.

La explicación más probable de por qué Alexis los ve "faltar": en el timing viejo, al ser el nivel más cercano a cámara, eran literalmente los PRIMEROS en irse del cuadro (nivel 1 arrancaba en fase 4.20, apenas un poco después de empezar el zoom en 3.95) — si para cuando Alexis se detiene a mirar bien la escena el scroll ya pasó ese punto, esas dos personas ya se fueron, y parece que "nunca estuvieron". Esto conecta directo con el siguiente pedido (el ritmo de la dispersión) — ver el punto 30. Si después de este cambio Alexis sigue sin verlas en algún momento puntual del scroll, hay que pedirle la fase/scroll exacto donde las busca para seguir investigando (no alcanza con "no están").

**29. Ventana para abrir/girar la caja 3D, mucho más ancha — y la tapa ahora se cierra sola si se abandona abierta.** Alexis reportó que solo se puede interactuar con la caja (abrirla, rotarla) durante un instante muy específico del scroll, difícil de enganchar, y que si deja la tapa abierta y sigue scrolleando (hacia la alacena o hacia el widget de la esquina), la caja debería cerrarse sola en vez de quedar "guardada" abierta.

- La ventana donde la caja está grande, quieta y se puede girar/abrir pasó de 0.18 de scroll (fase 2.42 a 2.6) a **0.55** (fase 2.3 a 2.85) — más de 3 veces más margen para probarla con calma antes de que empiece a achicarse hacia el widget de la esquina.
- **Cierre automático de la tapa:** si la tapa queda abierta y la caja vuelve a guardarse en la alacena (se scrollea hacia atrás, fase menor a 1.6), o si termina de achicarse del todo al widget de la esquina (fase 3.15 en adelante), la tapa se cierra sola en ese momento — nunca queda "guardada" con la tapa abierta. El cierre se ve como una animación suave (no un salto), porque usa el mismo sistema de interpolación que ya tenía el abrir/cerrar manual.
- Archivo: `continuous/first-house.js`.

**30. La gente tarda todavía más en empezar a irse, y el tramo de "todos enteros en primer plano" es bastante más largo.** Alexis sintió que, pese al ajuste de la ronda 12 (punto 25), la gente se seguía yendo muy temprano en el zoom — quiere ver a todos bien de cerca antes de que empiece cualquier dispersión. Dentro del mismo presupuesto de scroll disponible para esta escena (el zoom sigue yendo de fase 3.95 a 5.0 — no se puede estirar más sin atrasar también el cartón, que entra fijo en fase 5.0):
  - El tramo de puro zoom (nadie se mueve todavía) pasó de 0.25 a **0.35** de scroll (de fase 3.95–4.2 a fase 3.95–4.3): un 40% más de scroll viendo a todo el grupo entero y cada vez más cerca antes de que arranque cualquier salida.
  - Cada persona tarda un poco más en irse del cuadro: 0.30 de duración en vez de 0.28.
  - El reparto entre los siete niveles de profundidad se ajustó para que, con ese tramo inicial más largo y esa duración mayor, el último nivel (el eje, el que revela al nene) siga terminando antes de que arranque el desvanecimiento hacia el cartón en fase 5.0. Quedó: niveles en 4.30, 4.36, 4.42, 4.48, 4.54, 4.60, 4.66 (antes 4.20 a 4.62) — el último termina de irse en fase 4.96. El cambio de postura del nene (de mirar el barrilete a mirar a cámara) se corrió junto con esto, de fase 4.9–5.02 a 4.96–5.04, para que siga pasando justo cuando termina de irse el último grupo.
  - Archivo: `continuous/first-house.js`.

**Verificado con Playwright local:** recorrí fase 4.25 (debería seguir todo el grupo entero, incluidas persona-08 y persona-04 — confirmado visualmente) y 4.33 (recién empezando a moverse el primer nivel — también confirmé que persona-08 y persona-04 siguen ahí, apenas empezando a desplazarse), hasta 4.8 y 4.98 (nene revelado solo, sin nadie más, con margen antes del cruce al cartón). También recorrí toda la ventana nueva de la caja (fase 1.5 a 3.3) sin errores de consola propios de este código. No pude probar visualmente el cierre automático de la tapa en sí (el modelo 3D no renderiza en este entorno sin internet — ver nota en rondas anteriores), así que ese punto se verificó por revisión de código, no por captura.

## Cambios del 25/10 (decimoquinta ronda — mismo día, re-verificación de persona-08/04 y ritmo del zoom todavía más tardío)

**31. Alexis insistió en que sigue sin ver a persona-08/persona-04 — re-verifiqué por código y por captura, ambas siguen confirmadas presentes.** Volví a revisar: los archivos `persona-08-celular-cortado.webp` y `persona-04-vaso-espaldas.webp` existen en disco, con contenido real (no vacíos ni corruptos), están referenciados correctamente en el CSS (`.sp-8`, `.sp-4`), y en capturas nuevas de Playwright se ven con claridad en el extremo izquierdo de la escena, tanto en el momento en que la persiana termina de revelar todo (fase 4.0) como ya empezada la dispersión (fase 4.42). No encontré ningún bug que las esconda. Sigo sin poder explicar la discrepancia más allá de la hipótesis ya planteada en el punto 28 (que para cuando Alexis mira, el scroll ya pasó el momento en que están completas). Si después de esta ronda —con la dispersión todavía más tardía del punto 32— Alexis sigue sin verlas, necesito que me diga en qué fase/porcentaje de scroll exacto está parado cuando no las ve (o una captura de pantalla), porque por código y por mis propias capturas no logro reproducir el problema.

**32. El zoom antes de que la gente empiece a irse se alargó todavía más, y el zoom final es más intenso (más "macro").** Alexis pidió llegar "casi como un macro" antes de que cualquiera se vaya, y que el irse sea "muy lento". Dentro del mismo presupuesto fijo de scroll de esta escena (zoom de fase 3.95 a 5.0 — ver nota abajo sobre por qué no se puede estirar más sin tocar otras escenas):
  - El tramo de puro zoom (nadie se mueve) pasó de 0.35 a **0.45** de scroll (fase 3.95–4.4): ahora es más de la mitad de todo el recorrido del zoom de esta escena antes de que arranque cualquier salida.
  - Cada persona tarda todavía más en irse: 0.34 de duración (antes 0.30).
  - Niveles reacomodados para que, con ese tramo inicial más largo, el último nivel siga terminando con margen antes del cartón: 4.40, 4.44, 4.48, 4.52, 4.56, 4.60, 4.64 — el último termina en fase 4.98. El cambio de postura del nene se corrió a 4.9–4.99 para seguir coincidiendo con el final de la dispersión.
  - **Además, el zoom final ahora llega más lejos:** de 3.2× a 3.6× de escala máxima — sin gastar más scroll, solo escalando más al final, para que la sensación de cercanía ("casi macro") sea mayor incluso dentro del mismo tiempo disponible.
  - Archivo: `continuous/first-house.js`.

**Por qué no puedo estirar esto mucho más sin tocar otras escenas:** el zoom de la escena del salón está atado a un presupuesto fijo de scroll (fase 3.95 a 5.0) porque en fase 5.0 entra el cartón de la escena siguiente, con un punto de entrada fijo en el código. Ya usé la gran mayoría de ese presupuesto en "esperar" y "ir lento". Si Alexis quiere ir bastante más allá de esto (un tramo mucho más largo todavía, o cada persona tardando sensiblemente más en irse), la forma correcta de lograrlo es alargar el recorrido de scroll de toda esta sección —lo que implica correr también un poco hacia adelante el cartón, el barrilete, el quemado y los soldaditos que vienen después—, no seguir apretando los mismos números dentro del mismo espacio. Es un cambio más grande, que prefiero hacer a propósito y avisando, no de forma silenciosa. Si lo quiere, se lo puedo hacer.

**Verificado con Playwright local:** recorrí fase 4.0 (escena completa recién revelada, persona-08 y persona-04 visibles y claras en el extremo izquierdo), 4.35 (todavía todos enteros, zoom ya notablemente más cerca), 4.42 (primer nivel recién empezando a moverse, persona-08/04 todavía presentes), 4.7 (las del eje todavía desvaneciéndose, lento) y 4.98 (nene solo, revelado, con margen antes del cartón). Sin errores de consola propios de este código.

## Pendiente / a revisar con Alexis
- **Terminar de definir la escena del salón:** qué pasa después de que el zoom llega al nene en primer plano — Alexis todavía no lo contó. Cuando lo haga, probablemente haya que extender más la duración total de la escena.
- Confirmar en el sitio real (fuera de esta previsualización) que la caja 3D se ve bien, y que el cierre automático de la tapa (punto 29) funciona como se espera — no se pudo verificar visualmente en este entorno sin internet.
- **Si Alexis sigue sin ver a persona-08/persona-04 después de esta ronda, necesito la fase/scroll exacto (o una captura) donde no las ve** — ya revisé código y capturas dos rondas seguidas sin encontrar la causa (ver puntos 28 y 31).
- **Si Alexis quiere un tramo todavía más largo de zoom/espera antes de que la gente se vaya**, el presupuesto de scroll de esta escena ya está casi agotado (ver nota del punto 32): la forma correcta es alargar toda la sección (correr también cartón/barrilete/quemado/soldaditos un poco más adelante), no seguir reapretando los mismos números. Ofrecido, pendiente de confirmación.
- Revisar el resto del recorrido (después de la persiana) por si hay tramos similares sin movimiento — no se revisó en esta ronda.

## Nota sobre esta previsualización vs. el sitio real
Todo lo verificado visualmente en esta sesión se hizo en un entorno local sin salida a internet, así que three.js (y por lo tanto la caja 3D real) nunca renderizó durante las pruebas — siempre se vio la imagen de reemplazo. Todo lo relacionado a la caja 3D en este documento (tamaño, margen de cámara, apertura/cierre de la tapa, rotación) se verificó por revisión de código, no por captura visual del modelo real. Importante confirmarlo en el sitio real o en un entorno con internet.

Además, para que la caja 3D funcione en el Artifact de previsualización de Claude (que no puede servir archivos `.glb` binarios), se inyectan dos archivos extra (`continuous/box-model-data.js` y `continuous/box-model-boot.js`, con el modelo codificado en base64) en una copia separada del `index.html` usada solo para esa previsualización — la copia de trabajo real (la que está en este paquete, en `dist/`) NO lleva esas dos líneas porque no las necesita: sirve el `.glb` directo. Si vas a seguir trabajando esto en otro entorno con internet real (como para que lo use ChatGPT o para subirlo a un hosting), no hace falta replicar ese truco — alcanza con `dist/` tal como está.
