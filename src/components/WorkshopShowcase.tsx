import { useScroll } from 'framer-motion'
import { useRef } from 'react'
import { VITRINA } from '../data/content'
import { useCita } from '../lib/cita'
import StickyShowcaseCard from './StickyShowcaseCard'
import FadeIn from './primitives/FadeIn'

export default function WorkshopShowcase() {
  const pila = useRef<HTMLDivElement>(null)
  const { abrir } = useCita()
  const { scrollYProgress } = useScroll({ target: pila, offset: ['start start', 'end end'] })

  return (
    <section id="taller" className="relative scroll-mt-20 bg-ink-900 py-24 md:py-32">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
          <FadeIn>
            <h2 className="max-w-[11ch] font-display font-bold uppercase leading-[0.88] tracking-tightest text-[clamp(2.75rem,8.5vw,6.5rem)]">
              Dentro del taller
            </h2>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="max-w-[38ch] text-base leading-relaxed text-mute md:pb-3 md:text-right">
              Sin fotos de archivo genéricas: así es como trabajamos cada día en la nave.
            </p>
          </FadeIn>
        </div>

        <div ref={pila} className="relative mt-14 md:mt-20">
          {VITRINA.map((v, i) => (
            <StickyShowcaseCard
              key={v.n}
              item={v}
              indice={i}
              total={VITRINA.length}
              progreso={scrollYProgress}
              onSelect={abrir}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
