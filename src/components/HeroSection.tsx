import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { TALLER } from '../data/content'
import { shotFull } from '../data/images'
import { useCita } from '../lib/cita'
import { estadoTaller } from '../lib/garaje'
import { ContactButton, SecondaryButton } from './primitives/Buttons'

const EASE = [0.25, 0.1, 0.25, 1] as const

const DATOS = [
  { n: '01', texto: '+15 años de oficio' },
  { n: '02', texto: 'Técnicos certificados' },
  { n: '03', texto: 'Diagnosis en el día' },
]

export default function HeroSection() {
  const { abrir } = useCita()
  const quieto = useReducedMotion()
  const fondo = shotFull('heroLift', undefined, '75vw')

  // El estado del taller se calcula con el reloj de quien visita la página.
  const [estado, setEstado] = useState(() => estadoTaller())
  useEffect(() => {
    const id = window.setInterval(() => setEstado(estadoTaller()), 60_000)
    return () => window.clearInterval(id)
  }, [])

  const entrada = (delay: number, y: number) =>
    quieto
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, delay, ease: EASE },
        }

  return (
    <section id="inicio" className="relative isolate min-h-[100svh] overflow-hidden bg-ink-900">
      {/* Fotografía de fondo */}
      <motion.div
        initial={quieto ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 -z-10"
      >
        {/* La prioridad de carga la da el <link rel="preload"> de index.html:
            React 18 no reconoce el atributo fetchPriority. */}
        <img
          {...fondo}
          decoding="async"
          className="h-full w-full -scale-x-100 object-cover [object-position:center_45%]"
        />
      </motion.div>

      {/* Velo, viñeta y caída hacia el fondo de la página */}
      <div className="absolute inset-0 -z-10 bg-ink-900/55" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_95%_at_50%_35%,transparent_20%,rgba(11,13,15,0.55)_62%,rgba(11,13,15,0.92)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-[55%] bg-gradient-to-b from-transparent via-ink-900/75 to-ink-900"
        aria-hidden="true"
      />
      <div className="grain absolute inset-0 -z-10" aria-hidden="true" />

      <div className="shell relative flex min-h-[100svh] flex-col justify-end pb-8 pt-32 md:pb-10 md:pt-36">
        <div className="flex-1" />

        {/* Estado real del taller según la hora de quien mira */}
        <motion.div {...entrada(0.25, 20)} className="mb-7 flex items-center gap-2.5">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            {estado.abierto && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
            )}
            <span className={`relative inline-flex h-2 w-2 rounded-full ${estado.abierto ? 'bg-accent' : 'bg-mute'}`} />
          </span>
          <span className="tag text-mute">{estado.texto}</span>
        </motion.div>

        <motion.h1
          {...entrada(0.35, 50)}
          className="max-w-[18ch] font-display font-bold uppercase leading-[0.86] tracking-tightest text-chalk text-[clamp(3.25rem,15vw,7rem)] lg:text-[clamp(4.75rem,9.6vw,9.25rem)]"
        >
          <span className="block">Tu coche.</span>
          <span className="block">
            Nuestro <span className="text-accent">oficio.</span>
          </span>
        </motion.h1>

        <motion.p {...entrada(0.5, 30)} className="mt-7 max-w-[46ch] text-lg leading-relaxed text-mute md:text-xl">
          Mecánica, diagnosis y reparación multimarca en {TALLER.ciudad}. Presupuesto cerrado antes de tocar tu coche.
        </motion.p>

        <motion.div {...entrada(0.62, 25)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <ContactButton onClick={() => abrir()} className="w-full sm:w-auto">
            Pedir cita
          </ContactButton>
          <SecondaryButton href="#servicios" className="w-full sm:w-auto" bare>
            Ver servicios
          </SecondaryButton>
        </motion.div>

        {/* Barra inferior de datos */}
        <motion.ul
          {...entrada(0.78, 20)}
          className="mt-12 grid grid-cols-1 gap-px overflow-hidden border-t border-white/15 pt-5 sm:grid-cols-3 sm:gap-0 md:mt-16"
        >
          {DATOS.map((d, i) => (
            <li
              key={d.n}
              className={`flex items-baseline gap-3 py-2.5 sm:py-0 ${
                i > 0 ? 'sm:border-l sm:border-white/15 sm:pl-6' : ''
              } ${i < DATOS.length - 1 ? 'border-b border-white/10 sm:border-b-0' : ''}`}
            >
              <span className="tag num text-accent">{d.n}</span>
              <span className="tag text-mute">{d.texto}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
