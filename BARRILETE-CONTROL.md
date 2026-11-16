# Dirección del barrilete

- Seguir scrolleando hasta la fase 5.70 inicia el vuelo, sin tope ni clic obligatorio.
- Clic en el cielo: da impulso para sostener el vuelo; no marca un destino.
- Mover el mouse o lápiz sin pulsar cambia el destino con seguimiento suave y sostiene el vuelo. No hay teletransporte.
- El movimiento real renueva la sustentación; al detenerse, esta disminuye progresivamente entre .15 y .85 segundos y vuelve a actuar la gravedad. Repetir eventos en las mismas coordenadas no sostiene el vuelo. Los clics siguen dando impulso adicional e independiente.
- Se mantienen la caída y el seguimiento de cámara, el límite narrativo de vuelo de 18 segundos y la secuencia del fuego.
- Espacio conserva el impulso de teclado. La dirección se reinicia al salir de la casa o volver a sus escenas iniciales.
- Pointer Events conservan el arrastre con dedo. Los gestos táctiles siguen llegando a la navegación: no se bloquea el scroll al entrar en el cielo.

Prueba: `.qa-crops/kite-steering-test.cjs` genera el fixture `.qa-crops/kite-steering-browser.html`. Comprueba arranque por scroll, dirección por hover, interpolación sin salto, seis segundos de vuelo con movimiento sin clics, caída al detener el cursor y ausencia de iluminación rosa/azul en el salón. Resultado: `.qa-crops/kite-motion-lift-live.json`.

## Iluminación del salón

La capa `.fh-salon-tint` permanece transparente y con opacidad cero: ya no alterna rosa y azul. Se conservan las imágenes originales, la persiana, el movimiento de las personas y la cámara.