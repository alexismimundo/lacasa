# Resto del recorrido — etapa 1

Implementación provisoria del 16 de noviembre de 2026. No incluye etapa 2.

## Archivos

Base absoluta: `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo`.

- Tabla y render: `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\continuous\escenas-resto.js`.
- Estilos: `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\dist\continuous\escenas-resto.css`.
- QA: `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\.qa-crops\resto-test.cjs`.
- Se conservó el respaldo previo, sin sobrescribirlo.

## Fases

| Momento | Fases | Representación |
|---|---|---|
| A: oscuridad y luz | 8.6–10.6 | Negro y cartel |
| B: niño y madrugada | 10.6–12.6 | Azul y cartel |
| C: Terrero, lluvia y mesa | 12.6–15.8 | Gris y cartel |
| D: Tu casa y cuadra | 15.8–21.8 | Papel; desde 17.6, panorama existente y cartel |
| E: salida | 21.8–29.05 | Se conserva el salto 21.8→24; salida existente y cartel |

Los rótulos tienen nombre y rango. No hay nuevos assets, música, memorias ni interacciones narrativas; esos sistemas pertenecen a etapas posteriores. Las pantallas antiguas siguen ocultas, sin borrar recursos. El dibujo comunitario todavía no se reorganizó.

## Integración

- La linterna no cambia antes de 8.6; su capa funde entre 8.6 y 8.9 y luego queda oculta e inert.
- Se retiró únicamente `[8.6,17.6]` de los saltos.
- Se mantuvo `[21,22,22]` al final de las uniones de grafito, según aprobación.
- Los nuevos renders usan `window.casaRender`; no hay un nuevo RAF ni un controlador de scroll.
- `casa2Render` y `casa3Render` se encapsulan sin ejecutarse en 8.6≤fase<17.6: sus recursos siguen registrados, pero no se ejecutan sus cambios de radio y mezcla en el nuevo tramo.
- Movimiento reducido usa vectores verticales y no agrega vibración ni partículas.
- La salida conserva su mecánica, duración, video y límites actuales. Una vez completado el exterior, mantiene su comportamiento original de regreso/reentrada; la etapa 1 no promete volver reversible el video final existente.

## Cómo probar

Abrir la web desde el servidor local habitual, con `?vista=landing`. Entrar normalmente y seguir scrolleando después de la linterna.

Para saltar a un momento, en la consola:

```js
reachInside();
target = current = 9.3;
```

Otras fases recomendadas: 11.3, 13.3, 16.3, 18.5 y 24.5. Avanzar y retroceder con rueda, teclado o gesto. En 8.75 se puede revisar el fundido de la linterna. El tramo 21.8–24 sigue retirado intencionalmente. No saltar al vuelo del barrilete para esta prueba: puede activar sus restricciones existentes.

## QA

Resultados de navegador en `C:\Users\alexismimundo\Downloads\la-casa-v77-paquete-completo\.qa-crops\resto-etapa1-desktop.json` y `resto-etapa1-mobile.json` en el mismo directorio: PASS, sin excepciones JavaScript, a 1440×900 y 390×844. Cubren sintaxis, cinco escenas, fundido, recorrido inverso, navegación sin salto nuevo, aislamiento musical y salida activa. Las capturas del runner quedan junto a los JSON.

Limitación: las pruebas saltan a fases conocidas y verifican navegación por el motor; no sustituyen una revisión manual del recorrido entero en un teléfono real, ni validan los sistemas de dibujo, audio por fragmentos y exportación aún no implementados.

No se avanzó a la etapa 2. Pendiente aprobación para desarrollar huecos de luz y madrugada.