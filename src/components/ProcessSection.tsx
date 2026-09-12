import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { PROCESO } from '../data/content'
import FadeIn from './primitives/FadeIn'
import ProcessStep from './ProcessStep'

export default function ProcessSection() {
  const rail = useRef<HTMLDivElement>(null)
  const quieto = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: rail, offset: ['start 78%', 'end 55%'] })
  const avance = useSpring(scrollYProgress, { stiffness: 110, damping: 32, restDelta: 0.001 })
  const escala = useTransform(avance, [0, 1], [0, 1])

  return (
    <section
      id="proceso"
      className="on-paper relative scroll-mt-20 rounded-t-[40px] bg-paper py-20 text-ink-900 md:rounded-t-[50px] md:py-28 lg:rounded-t-[60px]"
    >
      <div
        className="rules-x-paper pointer-events-none absolute inset-0 rounded-t-[40px] md:rounded-t-[50px] lg:rounded-t-[60px]"
        aria-hidden="true"
      />

      <div className="shell relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
          <FadeIn>
            <h2 className="max-w-[10ch] font-display font-bold uppercase leading-[0.88] tracking-tightest text-[clamp(2.75rem,8.5vw,6.5rem)]">
              Cómo funciona
            </h2>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="max-w-[34ch] text-base leading-relaxed text-mute-ink md:pb-3 md:text-right">
              Proceso simple. Comunicación clara. Sin sorpresas al recoger el coche.
            </p>
          </FadeIn>
        </div>

        <div ref={rail} className="relative mt-16 md:mt-24">
          {/* Raíl con marcas de medida, como una regla de taller */}
          <div className="absolute left-[21px] top-2 h-[calc(100%-1rem)] w-px bg-paper-line md:left-[29px]" aria-hidden="true">
            <motion.div
              style={quieto ? { scaleY: 1 } : { scaleY: escala }}
              className="h-full w-full origin-top bg-accent"
            />
          </div>
          <div className="absolute left-[15px] top-2 hidden h-[calc(100%-1rem)] flex-col justify-between md:left-[23px] md:flex" aria-hidden="true">
            {Array.from({ length: 13 }).map((_, i) => (
              <span key={i} className={`block h-px ${i % 4 === 0 ? 'w-3 bg-ink-900/25' : 'w-1.5 bg-ink-900/12'}`} />
            ))}
          </div>

          <ol>
            {PROCESO.map((p, i) => (
              <ProcessStep
                key={p.n}
                n={p.n}
                titulo={p.titulo}
                desc={p.desc}
                delay={i * 0.05}
                ultimo={i === PROCESO.length - 1}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
