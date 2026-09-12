import { ArrowUpRight } from 'lucide-react'
import { ESTADISTICAS } from '../data/content'
import AnimatedText from './primitives/AnimatedText'
import Counter from './primitives/Counter'
import FadeIn from './primitives/FadeIn'

const PARRAFO =
  'Creemos que un buen taller es mucho más que reparar. Es explicarte lo que pasa, diagnosticar con precisión y hacer un trabajo que puedas mirar de cerca cada vez que nos dejas tus llaves.'

export default function TrustSection() {
  return (
    <section
      id="confianza"
      className="on-paper relative -mt-8 scroll-mt-24 rounded-t-[40px] bg-paper px-0 pb-20 pt-20 text-ink-900 md:-mt-10 md:rounded-t-[50px] md:pb-28 md:pt-28 lg:rounded-t-[60px]"
    >
      <div className="shell relative">
        <FadeIn>
          <h2 className="mx-auto max-w-[15ch] text-center font-display font-bold uppercase leading-[0.9] tracking-tightest text-[clamp(2.5rem,7.5vw,5.5rem)]">
            Todo empieza por la confianza
          </h2>
        </FadeIn>

        <AnimatedText
          text={PARRAFO}
          className="mx-auto mt-10 max-w-[38ch] text-center font-display text-[clamp(1.5rem,3.1vw,2.25rem)] font-medium leading-[1.35] tracking-[-0.025em] md:mt-14"
        />

        <ul className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 md:mt-28 lg:grid-cols-4 lg:gap-x-10">
          {ESTADISTICAS.map((e, i) => (
            <FadeIn as="li" key={e.etiqueta} delay={i * 0.08} className="group">
              <div className="h-px w-full bg-paper-line transition-colors duration-500 group-hover:bg-accent" />
              <div className="pt-5 transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
                <p className="font-display text-[clamp(2.75rem,7vw,4.75rem)] font-bold leading-none tracking-tightest">
                  <Counter value={e.valor} decimals={e.decimales} suffix={e.sufijo} />
                </p>
                <p className="mt-3 tag text-mute-ink">{e.etiqueta}</p>
              </div>
            </FadeIn>
          ))}
        </ul>

        <FadeIn delay={0.1} className="mt-20 flex justify-center md:mt-28">
          <a
            href="#proceso"
            className="group inline-flex items-center gap-2.5 border-b border-ink-900/20 pb-2 pt-1 tag text-ink-900 transition-colors duration-300 hover:border-accent-ink hover:text-accent-ink"
          >
            ¿Por qué Motorlab?
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </FadeIn>
      </div>
    </section>
  )
}
