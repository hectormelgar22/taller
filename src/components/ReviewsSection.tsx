import { Star } from 'lucide-react'
import { RESENAS } from '../data/content'
import FadeIn from './primitives/FadeIn'

function Estrellas() {
  return (
    <span className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-accent-ink text-accent-ink" />
      ))}
    </span>
  )
}

export default function ReviewsSection() {
  return (
    <section
      id="resenas"
      className="on-paper relative scroll-mt-20 rounded-t-[40px] bg-paper py-20 text-ink-900 md:rounded-t-[50px] md:py-28 lg:rounded-t-[60px]"
    >
      <div className="shell relative">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-16">
          <FadeIn>
            <h2 className="max-w-[12ch] font-display font-bold uppercase leading-[0.88] tracking-tightest text-[clamp(2.75rem,8.5vw,6.5rem)]">
              Lo que dicen en Madrid
            </h2>
          </FadeIn>

          <FadeIn delay={0.12} className="md:pb-3">
            <div className="flex items-baseline gap-4">
              <span className="num font-display text-[3.25rem] font-bold leading-none tracking-tightest">4,9</span>
              <div>
                <Estrellas />
                <p className="num mt-2 tag text-mute-ink">312 reseñas verificadas</p>
              </div>
            </div>
          </FadeIn>
        </div>

        <ul className="mt-16 gap-x-12 md:mt-24 md:columns-2 lg:columns-3">
          {RESENAS.map((r, i) => (
            <FadeIn as="li" key={r.nombre} delay={Math.min(i * 0.06, 0.3)} className="mb-12 break-inside-avoid">
              <div className="rule-paper" />
              <figure className="pt-6">
                <Estrellas />
                <blockquote className="mt-5 font-display text-[1.2rem] font-medium leading-[1.4] tracking-[-0.02em] text-ink-900">
                  {r.texto}
                </blockquote>
                <figcaption className="mt-5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                  <span className="text-[0.9375rem] font-bold text-ink-900">{r.nombre}</span>
                  <span className="tag text-mute-ink">
                    {r.barrio} · {r.coche}
                  </span>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  )
}
