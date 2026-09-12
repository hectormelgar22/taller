import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { MARQUESINA } from '../data/content'
import { shot } from '../data/images'

const TILE = { w: 640, h: 412 }

function Fila({
  items,
  x,
  offset,
}: {
  items: typeof MARQUESINA
  x: ReturnType<typeof useTransform<number, string>> | undefined
  offset: string
}) {
  const doble = [...items, ...items]
  return (
    <motion.ul
      style={x ? { x, willChange: 'transform' } : { transform: `translateX(${offset})` }}
      className="flex w-max gap-3"
    >
      {doble.map((item, i) => {
        const img = shot(item.key, TILE)
        return (
          <li
            key={`${item.key}-${i}`}
            // La segunda copia solo rellena el ancho: se oculta a los lectores de pantalla.
            aria-hidden={i >= items.length || undefined}
            className="relative h-[170px] w-[265px] shrink-0 overflow-hidden rounded-2xl bg-ink-800 sm:h-[215px] sm:w-[335px] md:h-[270px] md:w-[420px] md:rounded-3xl"
          >
            <img
              src={img.src}
              alt={i < items.length ? img.alt : ''}
              loading="lazy"
              decoding="async"
              width={TILE.w}
              height={TILE.h}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent" />
            {item.etiqueta && (
              <span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-ink-900/70 px-3 py-1.5 tag text-chalk backdrop-blur-md">
                {item.etiqueta}
              </span>
            )}
          </li>
        )
      })}
    </motion.ul>
  )
}

export default function MarqueeSection() {
  const ref = useRef<HTMLElement>(null)
  const quieto = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const suave = useSpring(scrollYProgress, { stiffness: 120, damping: 40, restDelta: 0.0005 })

  const xDerecha = useTransform(suave, [0, 1], ['-16%', '2%'])
  const xIzquierda = useTransform(suave, [0, 1], ['2%', '-16%'])

  const mitad = Math.ceil(MARQUESINA.length / 2)

  return (
    <section
      ref={ref}
      aria-label="Imágenes del taller"
      className="relative overflow-hidden border-y border-ink-line bg-ink-900 py-14 md:py-20"
    >
      <div className="mask-fade-x flex flex-col gap-3">
        <Fila items={MARQUESINA.slice(0, mitad)} x={quieto ? undefined : xDerecha} offset="-7%" />
        <Fila items={MARQUESINA.slice(mitad)} x={quieto ? undefined : xIzquierda} offset="-7%" />
      </div>
    </section>
  )
}
