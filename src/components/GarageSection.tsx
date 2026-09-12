import { AnimatePresence, animate, motion, useReducedMotion } from 'framer-motion'
import { AlertCircle, ArrowRight, CalendarCheck, Check, Clock, Search, Wrench } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useCita } from '../lib/cita'
import {
  FASES,
  TARIFAS,
  TIPOS_ITV,
  TIPOS_VEHICULO,
  buscarExpediente,
  estimar,
  eur,
  fechaLarga,
  hoyISO,
  proximaItv,
} from '../lib/garaje'
import type { Expediente, TipoItv, TipoVehiculo } from '../lib/garaje'
import { ContactButton } from './primitives/Buttons'
import FadeIn from './primitives/FadeIn'

const PESTANAS = [
  { id: 'presupuesto', nombre: 'Presupuesto al instante', icono: Wrench },
  { id: 'itv', nombre: '¿Cuándo te toca la ITV?', icono: CalendarCheck },
  { id: 'seguimiento', nombre: 'Sigue tu reparación', icono: Search },
] as const

type PestanaId = (typeof PESTANAS)[number]['id']

/* -------------------------------------------------------------- */

const campo =
  'w-full rounded-xl border border-ink-line bg-ink-900 px-4 py-3.5 text-[0.95rem] text-chalk ' +
  'transition-colors duration-300 hover:border-white/25 focus:border-accent focus:outline-none'

const etiqueta = 'tag mb-2.5 block text-mute'

/** Número que reanima cada vez que cambia su valor. */
function Cifra({ valor }: { valor: number }) {
  const [mostrado, setMostrado] = useState(valor)
  const quieto = useReducedMotion()
  const previo = useRef(valor)

  useEffect(() => {
    if (quieto) {
      setMostrado(valor)
      previo.current = valor
      return
    }
    const control = animate(previo.current, valor, {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setMostrado(Math.round(v)),
    })
    previo.current = valor
    return () => control.stop()
  }, [valor, quieto])

  return <span className="num">{eur(mostrado)}</span>
}

/* -------------------------------------------------------------- */

function Presupuesto() {
  const { abrir } = useCita()
  const [tipo, setTipo] = useState<TipoVehiculo>('turismo')
  const [servicio, setServicio] = useState(TARIFAS[3].id)
  const r = estimar(servicio, tipo)

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:gap-12">
      <div>
        <fieldset>
          <legend className={etiqueta}>Tu vehículo</legend>
          <div className="flex flex-wrap gap-2">
            {TIPOS_VEHICULO.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setTipo(v.id)}
                aria-pressed={tipo === v.id}
                className={`rounded-full border px-4 py-2.5 text-[0.8125rem] font-semibold transition-colors duration-300 ${
                  tipo === v.id
                    ? 'border-accent bg-accent text-ink-900'
                    : 'border-ink-line text-mute hover:border-white/30 hover:text-chalk'
                }`}
              >
                {v.nombre}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-7">
          <label htmlFor="servicio" className={etiqueta}>
            Qué necesitas
          </label>
          <select id="servicio" value={servicio} onChange={(e) => setServicio(e.target.value)} className={campo}>
            {TARIFAS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nombre}
              </option>
            ))}
          </select>
        </div>

        <p className="mt-6 flex items-start gap-2.5 text-[0.8125rem] leading-relaxed text-mute">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-mute" aria-hidden="true" />
          Rango orientativo con mano de obra, materiales e IVA. El presupuesto cerrado te lo damos tras la revisión.
        </p>
      </div>

      <div className="rounded-2xl border border-ink-line bg-ink-900 p-6 md:p-8">
        <p className={etiqueta}>Estimación</p>
        <p
          aria-live="polite"
          className="font-display text-[clamp(2rem,5.5vw,3.25rem)] font-bold leading-none tracking-tightest text-chalk"
        >
          <Cifra valor={r.min} />
          <span className="px-2 text-mute">–</span>
          <Cifra valor={r.max} />
        </p>

        <dl className="mt-7 space-y-3 border-t border-ink-line pt-6 text-[0.875rem]">
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-mute">Servicio</dt>
            <dd className="text-right font-semibold text-chalk">{r.tarifa.nombre}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-mute">En el taller</dt>
            <dd className="num flex items-center gap-1.5 text-right font-semibold text-chalk">
              <Clock className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              {r.tarifa.duracion}
            </dd>
          </div>
          {r.tarifa.nota && (
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-mute">Incluye</dt>
              <dd className="text-right font-semibold text-chalk">{r.tarifa.nota}</dd>
            </div>
          )}
        </dl>

        <ContactButton onClick={() => abrir(r.tarifa.nombre)} className="mt-7 w-full">
          Reservar este servicio
        </ContactButton>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------- */

function Itv() {
  const { abrir } = useCita()
  const [fecha, setFecha] = useState('')
  const [tipo, setTipo] = useState<TipoItv>('turismo')
  const hoy = hoyISO()

  const resultado = fecha ? proximaItv(new Date(`${fecha}T12:00:00`), tipo) : null
  const regla = TIPOS_ITV.find((t) => t.id === tipo)!

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:gap-12">
      <div>
        <div>
          <label htmlFor="matriculacion" className={etiqueta}>
            Fecha de primera matriculación
          </label>
          <input
            id="matriculacion"
            type="date"
            max={hoy}
            min="1960-01-01"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className={`${campo} num`}
          />
          <p className="mt-2 text-[0.8125rem] text-mute">La tienes en el apartado B de tu permiso de circulación.</p>
        </div>

        <div className="mt-7">
          <label htmlFor="tipo-itv" className={etiqueta}>
            Tipo de vehículo
          </label>
          <select id="tipo-itv" value={tipo} onChange={(e) => setTipo(e.target.value as TipoItv)} className={campo}>
            {TIPOS_ITV.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nombre}
              </option>
            ))}
          </select>
        </div>

        <p className="mt-6 border-l border-accent/60 pl-4 text-[0.8125rem] leading-relaxed text-mute">
          {regla.regla}. Cálculo orientativo según el Real Decreto 920/2017.
        </p>
      </div>

      <div className="flex flex-col rounded-2xl border border-ink-line bg-ink-900 p-6 md:p-8">
        {!resultado ? (
          <div className="flex flex-1 flex-col justify-center py-6 text-center">
            <CalendarCheck className="mx-auto h-8 w-8 text-ink-line" aria-hidden="true" />
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-mute">
              Pon la fecha de matriculación y te decimos qué día te toca pasar la ITV.
            </p>
          </div>
        ) : (
          <div aria-live="polite">
            <p className={etiqueta}>Próxima ITV</p>
            <p className="font-display text-[clamp(1.75rem,4.6vw,2.75rem)] font-bold leading-[1.05] tracking-tightest text-chalk">
              {fechaLarga(resultado.proxima)}
            </p>

            <p
              className={`mt-5 inline-flex items-center gap-2 rounded-full px-3.5 py-2 tag ${
                resultado.dias <= 0
                  ? 'bg-accent text-ink-900'
                  : resultado.dias < 60
                    ? 'border border-accent/60 text-accent'
                    : 'border border-ink-line text-mute'
              }`}
            >
              {resultado.dias <= 0
                ? 'Te toca ya'
                : resultado.primera
                  ? `Tu primera ITV · faltan ${resultado.dias} días`
                  : `Faltan ${resultado.dias} días`}
            </p>

            <dl className="mt-7 space-y-3 border-t border-ink-line pt-6 text-[0.875rem]">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-mute">Edad del vehículo</dt>
                <dd className="num font-semibold text-chalk">{resultado.edad} años</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-mute">A partir de ahora</dt>
                <dd className="font-semibold text-chalk">{resultado.cadencia}</dd>
              </div>
            </dl>

            <ContactButton onClick={() => abrir('Revisión pre-ITV')} className="mt-7 w-full">
              Preparar la ITV
            </ContactButton>
          </div>
        )}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------- */

function Seguimiento() {
  const [codigo, setCodigo] = useState('')
  const [resultado, setResultado] = useState<Expediente | null>(null)
  const [error, setError] = useState('')
  const quieto = useReducedMotion()

  function buscar(e: React.FormEvent) {
    e.preventDefault()
    if (!codigo.trim()) {
      setError('Escribe el código que aparece en tu parte de entrada.')
      setResultado(null)
      return
    }
    const hallado = buscarExpediente(codigo)
    if (hallado) {
      setResultado(hallado)
      setError('')
    } else {
      setResultado(null)
      setError('No encontramos ese código. En esta demo puedes probar con ML-2847, ML-3190 o ML-4412.')
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:gap-12">
      <div>
        <form onSubmit={buscar} noValidate>
          <label htmlFor="codigo" className={etiqueta}>
            Código de tu reparación
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="codigo"
              value={codigo}
              onChange={(e) => {
                setCodigo(e.target.value)
                setError('')
              }}
              placeholder="ML-2847"
              autoComplete="off"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'codigo-error' : undefined}
              className={`${campo} num uppercase tracking-[0.08em] sm:flex-1`}
            />
            <ContactButton type="submit" className="shrink-0" icon={<ArrowRight className="h-4 w-4" />}>
              Consultar
            </ContactButton>
          </div>
          {error && (
            <p id="codigo-error" role="alert" className="mt-3 flex items-start gap-2 text-[0.8125rem] leading-relaxed text-accent">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {error}
            </p>
          )}
        </form>

        <p className="mt-6 text-[0.8125rem] leading-relaxed text-mute">
          Te damos el código al dejar el coche. Desde aquí ves en qué fase está sin tener que llamar al taller.
        </p>
      </div>

      <div className="rounded-2xl border border-ink-line bg-ink-900 p-6 md:p-8">
        {!resultado ? (
          <div className="flex h-full flex-col justify-center py-6 text-center">
            <Search className="mx-auto h-8 w-8 text-ink-line" aria-hidden="true" />
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-mute">
              Introduce tu código y verás la fase exacta en la que está tu coche ahora mismo.
            </p>
          </div>
        ) : (
          <div aria-live="polite">
            <p className="num tag text-accent">{resultado.codigo}</p>
            <p className="mt-3 font-display text-[1.4rem] font-bold leading-tight tracking-display text-chalk">
              {resultado.vehiculo}
            </p>
            <p className="num mt-1 text-[0.875rem] text-mute">
              {resultado.matricula} · {resultado.trabajo}
            </p>

            <ol className="mt-7 border-t border-ink-line pt-6">
              {FASES.map((fase, i) => {
                const hecha = i < resultado.fase
                const actual = i === resultado.fase
                return (
                  <li key={fase} className="relative flex gap-4 pb-5 last:pb-0">
                    {i < FASES.length - 1 && (
                      <span
                        className={`absolute left-[11px] top-6 h-[calc(100%-12px)] w-px ${hecha ? 'bg-accent' : 'bg-ink-line'}`}
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={`relative z-10 flex h-[23px] w-[23px] shrink-0 items-center justify-center rounded-full border ${
                        hecha
                          ? 'border-accent bg-accent text-ink-900'
                          : actual
                            ? 'border-accent bg-ink-900 text-accent'
                            : 'border-ink-line bg-ink-900 text-ink-line'
                      }`}
                      aria-hidden="true"
                    >
                      {hecha ? (
                        <Check className="h-3 w-3" strokeWidth={3} />
                      ) : (
                        <span className={`h-1.5 w-1.5 rounded-full ${actual ? 'bg-accent' : 'bg-ink-line'} ${actual && !quieto ? 'animate-blink' : ''}`} />
                      )}
                    </span>
                    <span className="flex flex-col gap-0.5 pt-0.5">
                      <span className={`text-[0.9375rem] font-semibold ${hecha || actual ? 'text-chalk' : 'text-mute'}`}>
                        {fase}
                      </span>
                      {actual && <span className="text-[0.8125rem] leading-relaxed text-mute">{resultado.nota}</span>}
                    </span>
                  </li>
                )
              })}
            </ol>

            <dl className="mt-2 space-y-3 border-t border-ink-line pt-6 text-[0.875rem]">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-mute">Técnico</dt>
                <dd className="font-semibold text-chalk">{resultado.tecnico}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-mute">Entrega</dt>
                <dd className="text-right font-semibold text-accent">{resultado.entrega}</dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------- */

export default function GarageSection() {
  const [activa, setActiva] = useState<PestanaId>('presupuesto')
  const quieto = useReducedMotion()

  return (
    <section id="garaje" className="relative scroll-mt-20 border-t border-ink-line bg-ink-900 py-24 md:py-32">
      <div className="shell relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
          <FadeIn>
            <h2 className="max-w-[11ch] font-display font-bold uppercase leading-[0.88] tracking-tightest text-[clamp(2.75rem,8.5vw,6.5rem)]">
              El garaje digital
            </h2>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="max-w-[42ch] text-base leading-relaxed text-mute md:pb-3 md:text-right">
              Tres cosas que normalmente exigen una llamada y una espera. Aquí las resuelves en diez segundos, sin dar
              tus datos.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.18} className="mt-14 md:mt-20">
          <div className="overflow-hidden rounded-[28px] border border-ink-line bg-ink-800">
            {/* Selector de herramienta */}
            <div role="tablist" aria-label="Herramientas del garaje digital" className="flex flex-col border-b border-ink-line sm:flex-row">
              {PESTANAS.map((p) => {
                const Icono = p.icono
                const viva = activa === p.id
                return (
                  <button
                    key={p.id}
                    role="tab"
                    id={`tab-${p.id}`}
                    aria-selected={viva}
                    aria-controls={`panel-${p.id}`}
                    type="button"
                    onClick={() => setActiva(p.id)}
                    className={`group relative flex flex-1 items-center justify-center gap-2.5 px-5 py-5 text-[0.8125rem] font-bold uppercase tracking-[0.1em] transition-colors duration-300 sm:py-6 ${
                      viva ? 'text-chalk' : 'text-mute hover:text-chalk'
                    } ${p.id !== 'presupuesto' ? 'border-t border-ink-line sm:border-l sm:border-t-0' : ''}`}
                  >
                    <Icono className={`h-4 w-4 shrink-0 ${viva ? 'text-accent' : ''}`} aria-hidden="true" />
                    <span className="text-center">{p.nombre}</span>
                    {viva && (
                      <motion.span
                        layoutId="pestana-activa"
                        transition={quieto ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 34 }}
                        className="absolute inset-x-0 bottom-0 h-0.5 bg-accent"
                      />
                    )}
                  </button>
                )
              })}
            </div>

            <div className="p-6 md:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activa}
                  id={`panel-${activa}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${activa}`}
                  initial={quieto ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={quieto ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                >
                  {activa === 'presupuesto' && <Presupuesto />}
                  {activa === 'itv' && <Itv />}
                  {activa === 'seguimiento' && <Seguimiento />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
