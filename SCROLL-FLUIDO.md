# Scroll anterior restaurado

Actualización de recorrido: `RECORRIDO-ESPACIAL.md` describe los nuevos cambios
de dirección visual. Se conserva la sensibilidad anterior y no se recupera el
controlador automático retirado. El mapa espacial no modifica los deltas de scroll.

**Estado vigente:** se retiró el experimento descrito más abajo. El scroll vuelve a su sensibilidad y fórmula anteriores, sin asistencia automática. Solo se suavizó el zoom persiana → niño: 80 % de la curva original y 20 % de una curva continua en el mismo intervalo 3.50–5.28. Mismos encuadres inicial y final, sin avance autónomo. Se conservan las protecciones táctiles de los campos y objetos.

Prueba vigente: `.qa-crops/restored-scroll-test.cjs`. No ejecutar los scripts históricos `scroll-flow-test.cjs` ni `integrate-scroll.cjs`, correspondientes al experimento retirado.

## Experimento anterior (retirado)

- Se eliminó el multiplicador de 0.32/0.35 que frenaba la primera casa.
- Navegación general: sensibilidad 1.25 y referencia de altura acotada a 500–900 px. La cocina conserva sensibilidad 0.85 para permitir explorar sus objetos.
- Se limita la acumulación a 0.8 unidades por delante de la cámara. Se conserva la interpolación exponencial existente, independiente de la tasa de cuadros.
- Acercamiento inicial a la ventana: referencia de 900 px en vez de 1600.
- En fases 3.85–5.20, un gesto positivo acumulado de 24 px inicia un acercamiento hasta 5.28 en 2.8 segundos, con entrada y salida suaves. Se detiene antes del barrilete. No se cambió la composición ni la animación de personas/persiana.
- Scroll inverso cancela la transición y recupera el control manual inmediatamente. Clic en controles/objetos, diálogos, arrastre o pestaña oculta detienen la asistencia. Con movimiento reducido es completamente manual.
- Las galerías y los espacios de dibujo/lectura no tienen avance automático. Los campos, canvas y gestos multitáctiles no activan la navegación táctil global.
- Las reglas y los algoritmos del barrilete/fuego no fueron modificados.

## Pruebas

`.qa-crops/scroll-flow-test.cjs`: sintaxis, integración, simulación de 300 cuadros sin saltos ni retrocesos, final del acercamiento con un gesto, cancelación, movimiento reducido, pequeños deltas de trackpad y límite de acumulación. Genera un fixture de navegador con todos los scripts de producción.

La validación automatizada no sustituye probar la sensación de scroll con una rueda, un trackpad y un teléfono reales. Los parámetros están centralizados en `dist/continuous/scroll-flow.js`.