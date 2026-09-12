# DESIGN — MOTORLAB GARAGE

Mundo visual: **taller premium a media luz**. Chapa oscura, una luz de inspección naranja,
tipografía técnica y mucho aire. Ni concesionario ni "Fast & Furious".

## Color
| Papel | Valor | Uso |
|---|---|---|
| `ink-900` | `#0B0D0F` | Fondo base |
| `ink-800` | `#121519` | Paneles elevados (garaje digital, tarjetas, modal) |
| `ink-700` | `#181C20` | Superficie interna, marca de agua |
| `ink-line` | `#262C33` | Todas las divisiones sobre oscuro |
| `paper` | `#F4F4F1` | Secciones claras (confianza, proceso, reseñas) |
| `chalk` | `#F5F5F2` | Texto principal sobre oscuro |
| `mute` | `#A8ADB2` | Texto secundario sobre oscuro (8,6:1) |
| `mute-ink` | `#5A6068` | Texto secundario sobre claro (5,8:1) |
| `accent` | `#FF5A1F` | Acento único de marca |
| `accent-ink` | `#C43E0B` | El mismo acento cuando va como texto sobre claro (4,7:1) |

**Regla de contraste del acento:** `#FF5A1F` solo lleva texto `ink-900` encima (6,2:1).
Blanco sobre ese naranja da 3,1:1 y no se usa nunca.

## Tipografía
- Display: **Space Grotesk Variable** — titulares en mayúscula, `tracking -0.055em`,
  `line-height` entre 0.86 y 0.92. Escala por `clamp()`, nunca por breakpoint suelto.
- Texto: **Manrope Variable**.
- Ambas autoalojadas vía `@fontsource-variable`: sin dependencia de red en tiempo de ejecución.
- Las cifras (precios, fechas, teléfonos, matrículas) usan `.num` → `tabular-nums`.

## Movimiento
- Curva del mundo: `cubic-bezier(0.16, 1, 0.3, 1)` (`ease-out` reasignado en Tailwind).
  La entrada del brief, `cubic-bezier(0.25, 0.1, 0.25, 1)`, se reserva para el hero.
- Un momento por sección, no un efecto por elemento.
- Todo parte de un estado ya legible: nada depende del JavaScript para poder leerse.
- `useReducedMotion` en los 12 componentes con movimiento + corte global en CSS.

## Detalles del mundo
- **Reglas verticales** (`.rules-x`) a un solo eje, como los márgenes de un plano técnico.
  Nunca cuadrícula completa: satura y no aporta estructura.
- Marcas de medida tipo regla junto al raíl del proceso.
- Grano sutil sobre la fotografía del hero y del cierre.
- Superficies del navegador con la paleta: selección, cursor, barra de scroll y anillo de foco
  (naranja sobre oscuro, `accent-ink` dentro de `.on-paper`).

## Fotografía
Stock real de Pexels, luz oscura y cálida, coherente entre piezas. Sin marcas comerciales
visibles. La del hero es vertical y va reflejada para que el mecánico no caiga bajo el titular.
