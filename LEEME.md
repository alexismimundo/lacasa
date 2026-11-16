# La Casa — versión 77

Snapshot completo del código publicado el 25 de octubre de 2026.
Commit: 010daa9f9074b4c0af0d3d6059496b1d34b62981
Web de referencia: https://la-casa-ale-umbral.alexismimundo.chatgpt.site

## Abrir y trabajar
Requiere Python 3, sin instalación de paquetes. Desde esta carpeta ejecutar:

    python -m http.server 8000 --directory dist

Abrir http://localhost:8000 en Chrome o Firefox. Usar un servidor local, no abrir el HTML como archivo. También se puede servir dist con cualquier servidor estático. No requiere npm ni compilación.

## Contenido
Al abrir o recargar la web, el recorrido comienza en la ventana de entrada. No se recupera la fase anterior ni se abre automáticamente el cierre con flores. Los dibujos, las memorias, el inventario de la sesión y las preferencias no se borran.

- dist/: web ejecutable completa, HTML, CSS, JavaScript, imágenes, fuentes, audio y videos.
- source-materials/: originales y materiales de trabajo existentes en el repositorio.
- FIRST_HOUSE.md y TEXTURAL_ASSETS.json: notas y activos del desarrollo. Algunas notas son históricas; el código de dist es la fuente vigente.
- CLAUDE_CONTINUAR.md: estado actual y pautas para continuar.
- MANIFIESTO.json: listado y hashes SHA-256 de todos los archivos originales incluidos.

No incluye credenciales, historial Git ni configuración de publicación de ChatGPT. El paquete funciona independientemente de Sites. Los cambios realizados en Claude no actualizan automáticamente la web publicada: es necesario volver a desplegar dist en el alojamiento elegido.
