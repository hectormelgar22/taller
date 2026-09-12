import { Phone } from 'lucide-react'
import { TALLER } from '../data/content'
import { shotFull } from '../data/images'
import { useCita } from '../lib/cita'
import { ContactButton, SecondaryButton } from './primitives/Buttons'
import FadeIn from './primitives/FadeIn'

export default function CTASection() {
  const { abrir } = useCita()
  const fondo = shotFull('liftsRow', 0.6, '60vw')

  return (
    <section id="contacto" className="relative isolate scroll-mt-20 overflow-hidden bg-ink-900 py-28 md:py-40">
      <img
        {...fondo}
        loading="lazy"
        decoding="async"
        aria-hidden="true"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.13]"
      />
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(80%_70%_at_50%_50%,transparent_10%,rgba(11,13,15,0.85)_75%)]"
        aria-hidden="true"
      />
      <div className="grain absolute inset-0 -z-10" aria-hidden="true" />

      <div className="shell relative text-center">
        <FadeIn>
          <h2 className="mx-auto max-w-[13ch] font-display font-bold uppercase leading-[0.88] tracking-tightest text-[clamp(2.75rem,9vw,7.5rem)]">
            Tu coche merece <span className="text-accent">el taller adecuado.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.12}>
          <p className="mx-auto mt-8 max-w-[42ch] text-lg leading-relaxed text-mute md:text-xl">
            Reserva tu próxima revisión en {TALLER.nombre}. Te confirmamos la cita en menos de dos horas.
          </p>
        </FadeIn>

        <FadeIn delay={0.22}>
          <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <ContactButton onClick={() => abrir()} className="w-full sm:w-auto">
              Pedir cita
            </ContactButton>
            <SecondaryButton
              href={`tel:${TALLER.telefonoTel}`}
              className="w-full sm:w-auto"
              icon={<Phone className="h-4 w-4" />}
            >
              Llamar al taller
            </SecondaryButton>
          </div>
        </FadeIn>

        <FadeIn delay={0.32}>
          <div className="mt-14 flex flex-col items-center gap-4">
            <a
              href={`tel:${TALLER.telefonoTel}`}
              className="num font-display text-[clamp(1.75rem,4.5vw,2.75rem)] font-bold tracking-tightest text-chalk transition-colors duration-300 hover:text-accent"
            >
              {TALLER.telefono}
            </a>
            <p className="tag text-mute">
              {TALLER.ciudad} · {TALLER.horario}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
