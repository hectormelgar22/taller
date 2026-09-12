# MOTORLAB GARAGE — Taller mecánico

Web de demostración para talleres mecánicos. Taller ficticio de Madrid, pensada como muestra
comercial: lo que un taller real vería antes de encargar la suya.

React 18 · TypeScript · Tailwind CSS 3 · Framer Motion · Lucide · Vite

**En vivo:** https://hectormelgar22.github.io/taller/

```bash
npm install
npm run dev      # http://localhost:5199
npm run build    # genera dist/
```

## Qué lleva dentro

| Sección | Qué hace |
|---|---|
| Hero | Foto a pantalla completa y **estado del taller en vivo** (abierto/cerrado calculado con el reloj de quien visita) |
| Marquesina | Dos filas de fotografía que se desplazan con el scroll |
| Confianza | Párrafo con revelado letra a letra y cuatro cifras que cuentan al entrar en pantalla |
| Servicios | Seis filas: al pulsar cualquiera se abre la cita con ese servicio ya elegido |
| **Garaje digital** | Tres herramientas reales, ver abajo |
| Proceso | Cuatro pasos con raíl que se dibuja al hacer scroll |
| Dentro del taller | Tres tarjetas apiladas *sticky* que se encogen al pasar |
| Reseñas · FAQ | Testimonios en columnas y acordeón de preguntas |
| CTA · Pie | Cierre de conversión, datos de contacto y marca de agua |

### El garaje digital

Es la parte que casi ningún taller español tiene en su web:

1. **Presupuesto al instante** — tipo de vehículo × servicio → rango de precio con IVA.
2. **¿Cuándo te toca la ITV?** — fecha de matriculación → fecha exacta de la próxima
   inspección. Implementa el calendario real del **Real Decreto 920/2017** para turismos,
   furgonetas ≤3.500 kg y motocicletas (`src/lib/garaje.ts`).
3. **Sigue tu reparación** — código → línea de tiempo con la fase actual.
   Códigos de prueba: `ML-2847`, `ML-3190`, `ML-4412`.

El formulario de cita son tres pasos con validación real. **No envía nada a ningún servidor**:
es una demo y así se indica en pantalla.

## Despliegue

Cada `push` a `main` dispara `.github/workflows/deploy.yml`, que compila y publica en
GitHub Pages. Requiere que en **Settings → Pages → Source** esté seleccionado
**GitHub Actions**.

La base de la URL (`/taller/`) está en `vite.config.ts`. Si el repositorio cambia de nombre
o se usa un dominio propio, hay que actualizarla ahí.

## Adaptarla a un cliente real

Casi todo se cambia sin tocar componentes:

- **`src/data/content.ts`** — nombre, teléfono, dirección, horario, servicios, proceso,
  estadísticas, reseñas y preguntas frecuentes.
- **`src/data/images.ts`** — el catálogo de fotos con su texto alternativo. Sustituye las
  rutas de Pexels por las fotos del taller; lo ideal es fotografía propia de la nave.
- **`src/lib/garaje.ts`** — tarifas (`TARIFAS`), recargos por tipo de vehículo
  (`TIPOS_VEHICULO`), expedientes de ejemplo y **el horario de apertura** (`estadoTaller`).
- **`tailwind.config.js`** — paleta. El acento de marca es `#FF5A1F`.

Para que el formulario envíe de verdad, conecta `enviar()` en
`src/components/BookingModal.tsx` con tu servicio de correo o CRM.

## Decisiones que conviene conocer

- **Texto casi negro sobre los botones naranjas.** Blanco sobre `#FF5A1F` da 3,1:1 y no llega
  al mínimo AA. El negro sobre el mismo naranja da 6,2:1, así que se conserva el color exacto
  de marca sin sacrificar la accesibilidad.
- **El párrafo de la sección de confianza oscurece la tinta** en lugar de aparecer desde casi
  transparente: los dos extremos del efecto son legibles, también para quien no haga scroll.
- **La foto del hero está reflejada.** Es vertical y el mecánico queda a la izquierda, justo
  donde va el titular; al reflejarla, la mirada queda libre sobre el texto.
- Todo el movimiento respeta `prefers-reduced-motion`; navegación por teclado, foco atrapado
  en el modal y `alt` descriptivo en las 46 imágenes.

## Fotografía

Pexels (licencia libre, sin atribución obligatoria). Se han descartado las imágenes con marcas
comerciales visibles. Para producción conviene sustituirlas por fotos del taller real.
