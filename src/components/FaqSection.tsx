import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { useId, useState } from 'react'
import { FAQ, TALLER } from '../data/content'
import FadeIn from './primitives/FadeIn'

export default function FaqSection() {
  const [abierta, setAbierta] = useState<number | null>(0)
  const quieto = useReducedMotion()
  const base = useId()

  return (
    <section id="faq" className="relative scroll-mt-20 bg-ink-900 py-24 md:py-32">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <FadeIn>
              <h2 className="max-w-[9ch] font-display font-bold uppercase leading-[0.88] tracking-tightest text-[clamp(2.5rem,7.5vw,5rem)]">
                Preguntas frecuentes
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 max-w-[34ch] text-base leading-relaxed text-mute">
                Lo que más nos preguntan por teléfono. Si te queda alguna duda, llámanos al{' '}
                <a
                  href={`tel:${TALLER.telefonoTel}`}
                  className="num text-accent underline decoration-accent/40 transition-colors hover:decoration-accent"
                >
                  {TALLER.telefono}
                </a>
                .
              </p>
            </FadeIn>
          </div>

          <ul className="border-t border-ink-line">
            {FAQ.map((f, i) => {
              const viva = abierta === i
              return (
                <FadeIn as="li" key={f.p} delay={Math.min(i * 0.05, 0.25)} y={20} className="border-b border-ink-line">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setAbierta(viva ? null : i)}
                      aria-expanded={viva}
                      aria-controls={`${base}-${i}`}
                      className="group flex w-full items-start justify-between gap-6 py-6 text-left transition-colors duration-300 hover:text-accent"
                    >
                      <span className="font-display text-[1.05rem] font-bold leading-snug tracking-display text-chalk transition-colors duration-300 group-hover:text-accent md:text-[1.25rem]">
                        {f.p}
                      </span>
                      <span
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                          viva ? 'border-accent bg-accent text-ink-900' : 'border-ink-line text-mute group-hover:border-accent'
                        }`}
                        aria-hidden="true"
                      >
                        {viva ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {viva && (
                      <motion.div
                        id={`${base}-${i}`}
                        initial={quieto ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={quieto ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[62ch] pb-7 pr-12 text-[0.95rem] leading-relaxed text-mute">{f.r}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </FadeIn>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
