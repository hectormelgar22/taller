import { SERVICIOS } from '../data/content'
import { useCita } from '../lib/cita'
import ServiceRow from './ServiceRow'
import FadeIn from './primitives/FadeIn'

export default function ServicesSection() {
  const { abrir } = useCita()

  return (
    <section id="servicios" className="relative scroll-mt-20 bg-ink-900 py-24 md:py-32">
      <div className="rules-x pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="shell relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
          <FadeIn>
            <h2 className="max-w-[12ch] font-display font-bold uppercase leading-[0.88] tracking-tightest text-[clamp(2.75rem,8.5vw,6.5rem)]">
              Lo que hacemos
            </h2>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="max-w-[40ch] text-base leading-relaxed text-mute md:pb-3 md:text-right">
              Seis servicios que cubren el 90 % de lo que entra por nuestra puerta. Pulsa cualquiera para pedir cita.
            </p>
          </FadeIn>
        </div>

        <div className="mt-14 border-b border-ink-line md:mt-20">
          {SERVICIOS.map((s, i) => (
            <FadeIn key={s.n} delay={Math.min(i * 0.07, 0.35)} y={24}>
              <ServiceRow servicio={s} onSelect={abrir} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
