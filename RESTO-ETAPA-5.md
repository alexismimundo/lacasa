# Etapa 5 — Salida y menú final

Base: `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo`.

## Fases finales del recorrido nuevo

| Momento | Fases |
|---|---|
| A · Oscuridad y aperturas | 8.6–10.6 |
| B · Niño y madrugada | 10.6–12.6 |
| C · Terrero: lluvia, mesa, retrovisor, puerta | 12.6–15.8 |
| D1 · Tu casa | 15.8–17.6 |
| D2 · La cuadra | 17.6–21.8 |
| E · Salida existente, adelantada | 21.8–26.85 |

Se eliminó el intervalo retirado [21.8,24]. `journeyLength=26.85`. El motor original usa ahora `closingPhase=current+.2` en vez de `current-2`: todos sus tiempos relativos se mantienen, con un adelanto uniforme de 2.2 fases. Entrada de salida 21.8–22.4, zoom 23–24.85. El video de glicinas sigue reproduciéndose al completar el zoom; el menú espera `closing-outside`, que depende de la finalización del video. El tramo hasta 26.85 conserva el margen previo al final. No hay nuevo controlador de scroll ni reloj de animación.

La unión de grafito se actualizó a [21.5,21.8,21.8]. Las fases anteriores a 8.6 no se cambiaron. La salida conserva su limitación previa: el video y su estado de finalización no son estrictamente reversibles con cada movimiento de scroll.

## Personalización

`C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\continuous\salida-final.js` añade una capa dentro de `#closing-window`, de modo que escala junto a la cámara existente:

- Fila pequeña de los objetos reconocidos de `E.caja`, con las imágenes actuales de `COSAS`.
- Dibujo del visitante dentro del hueco y memoria con eco lila sobre un ladrillo.
- Usa el borrador de D de esta visita, aunque no se haya publicado al barrio; al recargar, conserva el aporte que se hubiera guardado bajo la clave anterior.
- Si no hay dibujo, memoria ni objetos, no se agrega decoración personal: quedan los medios y glicinas existentes.
- Frase exacta: «Me estuve buscando y me encontré / entre glicina y laurel».

Coordenadas vinculadas al encuadre de los medios existentes 1280×720 y a su `object-fit:cover`. Un reemplazo con distinto encuadre necesitará ajustar estas posiciones, no el reloj del recorrido.

## Menú final

Debajo de la ventana, cinco botones con IBM Plex Mono, azul y tratamiento de hover de la landing; se oculta el menú viejo solo en el exterior final para no duplicar accesos.

1. **Recorrer el barrio:** abre el atlas existente, arrastrable en todas direcciones, con 44 ejemplos sin memorias inventadas más el aporte guardado.
2. **El disco:** lista las diez canciones derivadas de CANCIONES. Los archivos no incorporados dicen «pendiente», sin sustituirlos por Sirens. El reproductor HTML audio queda preparado para `archivos` opcionales en cada grupo de CANCIONES, alineados con `titulos`; ninguna grabación del álbum fue inventada. «Pedir la edición física» abre el mismo formulario simulado de D, sin envío ni persistencia de esos datos.
3. **Tu portada:** descarga nuevamente el PNG. Si no hay dibujo, invita a volver a D1 y permite hacerlo.
4. **Sobre La casa:** `[pendiente: 100–150 palabras]`.
5. **Las casas que habité:** Casa I / II / III, canciones y `[dirección: a confirmar]`, sin direcciones completas en este panel. No se borraron las direcciones de escenas anteriores ya aprobadas.

La ventana vuelve a ser un área activable y llama la función original de reentrada. El scroll exterior conserva también su mecanismo original. No se cambió resetExperience. La caja y el aporte comunitario no se borran al reentrar.

## Plantillas de D

No se encontró una plantilla real en `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\assets\tu-casa\` durante esta entrega. Se agregó detección de la mayor región transparente encerrada de cada plantilla PNG (alfa ≤24): sus límites reemplazan el calado provisorio al cargar. Si no hay región encerrada suficiente, se mantienen los valores anteriores. Esto permite subir la plantilla sin editar código; recargar tras subirla. Una plantilla con todo el exterior conectado al calado no permite identificar inequívocamente la ventana con esta regla.

## Assets pendientes de salida

Directorio reservado: `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\assets\salida\`.

**Ningún asset nuevo obligatorio.** Se reutilizan `salida-inicial.webp`, `salida-final.webp` y los videos de salida ya enlazados en el HTML, junto a los objetos de COSAS y al SVG del visitante. No se agregaron rutas ficticias ni solicitudes de imágenes inexistentes dentro de salida/. Si se decide reemplazar el arte final, hace falta acordar primero encuadre y capas; las coordenadas actuales corresponden al material existente.

## QA y límites

Scripts y reportes: `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\.qa-crops\resto-etapa5-*`.

PASS en escritorio 1440×900, móvil emulado 390×844 y movimiento reducido: ausencia de salto retirado, largo final, inicio adelantado, visitante vacío/con aportes, caja/dibujo/memoria, frase, cámara, cinco accesos, diez pistas pendientes, formulario simulado compartido, atlas, descarga PNG y reentrada conservando inventario. Se comprobaron archivos PNG reales descargados. También se comprobó el detector de calado con una imagen sintética de alfa conocido.

La prueba automatizada dispara el evento `ended` para comprobar el estado posterior al video: no certifica por sí sola el visionado completo de la reproducción real ni sus transiciones visuales. Móvil es emulación de Chrome, no Safari iOS ni Android físico. Revisar manualmente composición sobre alféizar/ladrillo, reproducción completa de glicinas y entrada/salida en teléfono.

## Pendiente del autor

- Texto de 100–150 palabras para Sobre La casa.
- Archivos definitivos del álbum y asociación con sus diez títulos. No se añadieron fragmentos ni sincronización de letras: eso es etapa 6.
- Confirmación futura de direcciones; por ahora siguen marcadas a confirmar en el panel final.
- Plantillas definitivas de D, si se desea reemplazar las provisorias.
- Revisión visual del tamaño/ubicación de aportes sobre la ventana.

Etapa 6 no iniciada.