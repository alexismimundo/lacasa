# Primera casa — actualización 25/10/2026

Implementación: `dist/continuous/first-house.js` y `first-house.css`. Conserva el motor de entrada/salida, escenas posteriores y los cinco canales existentes. Respaldo: commit ebde9ec8984af3cfe122be125324b18278e42fba / etiqueta before-first-house-20261025.

Recorrido: umbral simplificado → muebles → caja → persiana → cuerpos/luces/niños → cartón → barrilete → macro interior → desgaste/incendio → soldaditos → segunda casa existente.

Estado independiente en sessionStorage `la-casa-first-house-v2`. Recolección única de robot/billetes; posición de filtros; puertas/canal; mochila; vuelo; progreso irreversible del fuego y elección de soldaditos. Reset al volver a entrar desde la ventana y al volver al principio. `window.laCasaCarry.soldiers` + evento `la-casa:carry` quedan disponibles para siguientes casas.

## Recursos

Recortes existentes: muebles, alacena/puertas/hamburguesas, robot, caja/cuerpo/tapa, papel, ceniza y videos TV.
Generación provisional integrada (herramienta integrada de imágenes): `dist/assets/first-house/`:
- legs.webp: piernas adultas bailando, fotocopia recortada, sin fondo.
- children.webp: chicos compartiendo mielcita, collage monocromo.
- sleep.webp: niño dormido sobre dos sillas.
- kite.webp: barrilete azul de bolsa y varillas.
- soldiers.webp: tres soldaditos verdes de plástico.
- money.webp: referencia artística de dos billetes argentinos de dos pesos; no escaneo documental.
- bag.webp / bag-closed.webp: mochila de cucharitas, estados abierto/cerrado.
- lamp.webp: lata/bombita/cable de reflector casero.
Todos transparentes, WebP optimizados, imágenes identificadas para reemplazo. Se conservan fuentes generadas originales fuera del paquete publicado.

Persiana/celofanes/cartón/ceniza: composición de texturas existentes + CSS, textos editables separados. No se incorporaron audios inventados. `A.cumbia` es null: conectar archivo real cuando esté disponible. El álbum se pausa en la jodita y se retoma al salir; silencio global afecta TV y música. Cumbia pendiente.

No se reintrodujo editor ni descarga de portada. Segunda/tercera casas mantienen la maqueta previa.

QA local usa qa.html solo durante revisión; eliminar antes de empaquetar. No publicar controles QA.
