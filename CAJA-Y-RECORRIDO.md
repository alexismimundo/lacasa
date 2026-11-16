# Casas en el recorrido existente e inventario — 26/10/2026

- Las casas de las láminas reemplazan los fondos de formas del panorama de la bicicleta (`p15`, fases 17.6–22). Las casas de primer plano abren sus memorias; las de fondo son decorativas.
- Se quitó la segunda pasada horizontal. El dibujo ocupa ahora las fases 21.8–24.15, antes del cierre. La duración total queda en 29.05.
- El widget de la caja abre un diálogo con imágenes y nombres, sin cambiar la fase. Escape o «Volver al recorrido» lo cierran.
- Robot y billete conservan sus acciones de clic, pero ya no se guardan por clic. Robot, billete y soldaditos se guardan arrastrándolos a la caja. Los objetos guardados antes se migran al inventario común.
- Se distribuyeron ocho objetos existentes entre las fases 3.1 y 21.3: cucharitas, dibujo, glicina, laurel, botella, plato, aluminio y mora. Desaparecen al guardarlos. Soltarlos fuera de la caja no los recoge.
- La caja sigue posicionándose después de la primera casa, y también sirve como destino cuando se muestra su imagen de reemplazo por falta de WebGL/CDN.
- El inventario usa el estado existente de sesión (`sessionStorage`): persiste al recargar la misma sesión, no es una cuenta ni una colección pública. El dibujo continúa guardándose localmente por separado.
- Se mantiene G como alternativa de teclado para un objeto enfocado; los clics no lo agregan.

## Validación

La prueba `.qa-crops/community-test.cjs` revisa sintaxis y genera un fixture con `first-house.js` habilitado. Cubre panorama, memoria, dibujo, guardado, arrastre fuera/dentro de la caja e inventario sin retroceso. Salta a fases conocidas: no reemplaza la revisión manual del recorrido completo ni de los gestos en un teléfono real. No se modificaron los algoritmos del barrilete ni del fuego.