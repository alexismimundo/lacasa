# Comunidad: casas y memoria

- Se conservaron intactas las dos láminas `dist/assets/casas-comunidad/casas-comunidad-{1,2}.png`.
- Hay 44 recortes PNG en `dist/assets/casas-comunidad/recortes/`. El recorrido utiliza 24 entradas alternando las dos láminas y casas lineales de ejemplo.
- El tramo comunitario entra entre fases 21.8 y 22; el scroll desplaza horizontalmente las casas hasta 26.5. Cada botón abre una tarjeta con dibujo, nombre y memoria. Los textos de ejemplo están identificados como tales.
- La instancia de dibujo está entre 26.5 y 28.15. Se puede continuar sin compartir. El cierre original se desplazó seis unidades; `journeyLength` es 33.05. La secuencia de barrilete e incendio no fue modificada.
- Los trazos abiertos conservan línea; un trazo suficientemente largo que termina a 20 unidades o menos de su inicio se cierra y rellena. Las figuras cerradas usan `fill-rule=evenodd`, por lo que las figuras anidadas calan el relleno. Se puede deshacer o borrar.
- Nombre, memoria y dibujo se guardan con `la-casa-community-drawing-v1` en localStorage. Un aporte por navegador, reemplazable. No hay cuentas, backend ni publicación real.
- El mismo archivo de casas se abre en el menú exterior “Otras casas”.
- Implementación independiente en `dist/continuous/community.js` y `community.css`; conserva el encadenamiento de `window.casaRender`.

## Validación

`.qa-crops/community-test.cjs` valida sintaxis y recortes, y genera una prueba Chrome. Resultado observado en `.qa-crops/community-live-result.txt`: PASS para trazos abiertos/cerrados, regla de calados, 24 casas, diálogo, dibujo, guardado local, escape de nombres, continuación, cierre y archivo exterior.

La prueba de navegador excluye `first-house.js` para no activar su bloqueo obligatorio de vuelo cuando salta directamente a una fase final. No representa una prueba completa del viaje desde la entrada. Pendiente revisión visual manual de escritorio y móvil, especialmente ritmo del desplazamiento y recortes.