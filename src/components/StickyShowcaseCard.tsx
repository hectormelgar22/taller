import { motion, useReducedMotion, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Vitrina } from '../data/content'
import { shot } from '../data/images'

type Props = {
  item: Vitrina
  indice: number
  total: number
  progreso: MotionValue<number>
  onSelect: (servicio: string) => void
}

const FOTO = { w: 640, h: 480 }

export default function StickyShowcaseCard({ item, indice, total, progreso, onSelect }: Props) {
  const quieto = useReducedMotion()
  const escalaFinal = 1 - (total - 1 - indice) * 0.045
  const escala = useTransform(progreso, [indice / total, 1], [1, escalaFinal])

  return (
    <div className="sticky top-[5.5rem] md:top-[7rem]" style={{ marginTop: indice === 0 ? 0 : '2.5rem' }}>
      <motion.article
        style={quieto ? undefined : { scale: escala, transformOrigin: 'top center' }}
        className="flex h-[76vh] min-h-[520px] flex-col overflow-hidden rounded-[28px] border border-ink-line bg-ink-800 shadow-plate md:h-[78vh] md:rounded-[36px]"
      >
        <div className="flex shrink-0 items-start justify-between gap-5 p-6 pb-5 md:p-10 md:pb-7">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="num font-display text-[2.25rem] font-bold leading-none tracking-tightest text-mute/60 md:text-[3.5rem]">
                {item.n}
              </span>
              <span className="rounded-full border border-accent/50 px-3 py-1.5 tag text-accent">{item.categoria}</span>
            </div>
            <h3 className="mt-4 max-w-[20ch] font-display text-[clamp(1.5rem,3.6vw,2.75rem)] font-bold uppercase leading-[1.0] tracking-tightest text-chalk md:mt-6">
              {item.titulo}
            </h3>
          </div>

          <button
            type="button"
            onClick={() => onSelect(item.servicio)}
            className="group hidden shrink-0 items-center gap-2.5 rounded-full border border-ink-line px-5 py-3 tag text-mute transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-ink-900 sm:inline-flex"
          >
            Ver servicio
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Galería */}
        <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-1.5 px-6 pb-6 md:gap-2 md:px-10 md:pb-10">
          {item.fotos.map((k, i) => {
            const img = shot(k, FOTO)
            return (
              <figure
                key={k}
                className={`relative overflow-hidden rounded-xl bg-ink-700 md:rounded-2xl ${
                  i === 0 ? 'col-span-2 md:col-span-1 md:row-span-2' : ''
                } ${i === 3 ? 'hidden md:block' : ''}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  width={FOTO.w}
                  height={FOTO.h}
                  className="h-full w-full object-cover"
                />
              </figure>
            )
          })}
        </div>

        <div className="flex shrink-0 items-center justify-between gap-4 border-t border-ink-line px-6 py-4 md:px-10 md:py-5">
          <span className="tag text-mute">{item.etiqueta}</span>
          <button
            type="button"
            onClick={() => onSelect(item.servicio)}
            className="group -my-2 inline-flex items-center gap-2 py-2 tag text-accent sm:hidden"
          >
            Ver servicio
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <span className="num hidden tag text-mute sm:block">
            {item.n} / {String(total).padStart(2, '0')}
          </span>
        </div>
      </motion.article>
    </div>
  )
}
