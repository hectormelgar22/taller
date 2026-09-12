import { Clock, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SERVICIOS, TALLER } from '../data/content'
import { useCita } from '../lib/cita'
import { estadoTaller } from '../lib/garaje'

const TALLER_ENLACES = [
  { href: '#taller', texto: 'Dentro del taller' },
  { href: '#proceso', texto: 'Cómo trabajamos' },
  { href: '#garaje', texto: 'Garaje digital' },
  { href: '#resenas', texto: 'Reseñas' },
  { href: '#faq', texto: 'Preguntas frecuentes' },
]

export default function Footer() {
  const { abrir } = useCita()
  const [estado, setEstado] = useState(() => estadoTaller())

  useEffect(() => {
    const id = window.setInterval(() => setEstado(estadoTaller()), 60_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <footer className="relative border-t border-ink-line bg-ink-900 pt-20 md:pt-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr] lg:gap-10">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-display text-[1.75rem] font-bold tracking-[-0.03em] text-chalk">{TALLER.marca}</span>
              <span className="mb-2.5 h-1.5 w-1.5 rounded-full bg-accent" />
            </div>
            <p className="mt-5 max-w-[34ch] text-[0.9375rem] leading-relaxed text-mute">
              Taller mecánico multimarca en {TALLER.ciudad}. Diagnosis, mantenimiento y reparación con presupuesto
              cerrado y piezas a la vista.
            </p>

            <div className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-ink-line px-4 py-2.5">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className={`inline-flex h-2 w-2 rounded-full ${estado.abierto ? 'bg-accent' : 'bg-mute'}`} />
              </span>
              <span className="tag text-mute">{estado.texto}</span>
            </div>
          </div>

          <nav aria-labelledby="pie-servicios">
            <h2 id="pie-servicios" className="tag text-mute">
              Servicios
            </h2>
            <ul className="mt-6 space-y-2.5">
              {SERVICIOS.map((s) => (
                <li key={s.n}>
                  <button
                    type="button"
                    onClick={() => abrir(s.nombre)}
                    className="block py-1 text-left text-[0.9375rem] text-chalk transition-colors duration-300 hover:text-accent"
                  >
                    {s.nombre}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="pie-taller">
            <h2 id="pie-taller" className="tag text-mute">
              El taller
            </h2>
            <ul className="mt-6 space-y-2.5">
              {TALLER_ENLACES.map((e) => (
                <li key={e.href}>
                  <a href={e.href} className="block py-1 text-[0.9375rem] text-chalk transition-colors duration-300 hover:text-accent">
                    {e.texto}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="tag text-mute">Contacto</h2>
            <ul className="mt-6 space-y-4 text-[0.9375rem]">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span className="text-chalk">
                  {TALLER.calle}
                  <br />
                  <span className="num">{TALLER.cp}</span>
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <a href={`tel:${TALLER.telefonoTel}`} className="num text-chalk transition-colors hover:text-accent">
                  {TALLER.telefono}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <a href={`mailto:${TALLER.email}`} className="text-chalk transition-colors hover:text-accent">
                  {TALLER.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span className="num text-mute">{TALLER.horarioLargo}</span>
              </li>
            </ul>

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-ink-line px-4 py-2.5 tag text-mute transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              <Instagram className="h-3.5 w-3.5" aria-hidden="true" />
              Instagram
            </a>
          </div>
        </div>

        {/* Marca de agua tipográfica */}
        <div className="mt-20 select-none overflow-hidden md:mt-28" aria-hidden="true">
          <p className="whitespace-nowrap text-center font-display text-[17.5vw] font-bold leading-[0.75] tracking-tightest text-ink-700">
            MOTORLAB
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-ink-line py-7 pb-24 md:flex-row md:pb-7">
          <p className="num tag text-mute">© {new Date().getFullYear()} {TALLER.nombre}</p>
          <p className="text-center text-[0.75rem] leading-relaxed text-mute/70 md:text-right">
            Web de demostración. {TALLER.nombre} es un taller ficticio creado como muestra de diseño.
          </p>
        </div>
      </div>
    </footer>
  )
}
