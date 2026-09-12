import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Car,
  Check,
  CircleDot,
  Cog,
  Droplets,
  Gauge,
  Snowflake,
  Wrench,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { SERVICIOS, TALLER } from '../data/content'
import { useCita } from '../lib/cita'
import { TIPOS_VEHICULO, hoyISO } from '../lib/garaje'
import type { TipoVehiculo } from '../lib/garaje'
import { ContactButton, SecondaryButton } from './primitives/Buttons'

const ICONOS = {
  gauge: Gauge,
  disc: CircleDot,
  droplets: Droplets,
  cog: Cog,
  car: Car,
  snowflake: Snowflake,
} as const

const EXTRAS = ['Revisión pre-ITV', 'No lo sé, quiero que lo miréis']

const PASOS = ['Servicio', 'Vehículo', 'Contacto'] as const

const campo =
  'w-full rounded-xl border border-ink-line bg-ink-900 px-4 py-3.5 text-[0.95rem] text-chalk ' +
  'transition-colors duration-300 hover:border-white/25 focus:border-accent focus:outline-none'

const etiqueta = 'tag mb-2.5 block text-mute'

type Datos = {
  servicio: string
  tipo: TipoVehiculo
  vehiculo: string
  matricula: string
  fecha: string
  franja: 'Mañana' | 'Tarde'
  nombre: string
  telefono: string
  email: string
  acepta: boolean
}

const VACIO: Datos = {
  servicio: '',
  tipo: 'turismo',
  vehiculo: '',
  matricula: '',
  fecha: '',
  franja: 'Mañana',
  nombre: '',
  telefono: '',
  email: '',
  acepta: false,
}

export default function BookingModal() {
  const { abierta, servicio, cerrar } = useCita()
  const quieto = useReducedMotion()
  const panel = useRef<HTMLDivElement>(null)
  const devolverFoco = useRef<HTMLElement | null>(null)

  const [paso, setPaso] = useState(0)
  const [datos, setDatos] = useState<Datos>(VACIO)
  const [errores, setErrores] = useState<Partial<Record<keyof Datos, string>>>({})
  const [enviado, setEnviado] = useState(false)

  const set = <K extends keyof Datos>(k: K, v: Datos[K]) => {
    setDatos((d) => ({ ...d, [k]: v }))
    setErrores((e) => ({ ...e, [k]: undefined }))
  }

  // Reinicia el formulario cada vez que se abre y respeta el servicio prerrellenado.
  useEffect(() => {
    if (!abierta) return
    devolverFoco.current = document.activeElement as HTMLElement
    setPaso(0)
    setEnviado(false)
    setErrores({})
    setDatos({ ...VACIO, servicio: servicio ?? '' })
  }, [abierta, servicio])

  useEffect(() => {
    if (!abierta) {
      devolverFoco.current?.focus?.()
      return
    }
    const previo = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const t = window.setTimeout(() => {
      panel.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus()
    }, 80)
    return () => {
      document.body.style.overflow = previo
      window.clearTimeout(t)
    }
  }, [abierta])

  // Escape cierra; Tab queda atrapado dentro del diálogo.
  useEffect(() => {
    if (!abierta) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        cerrar()
        return
      }
      if (e.key !== 'Tab' || !panel.current) return
      const focos = panel.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])',
      )
      if (!focos.length) return
      const primero = focos[0]
      const ultimo = focos[focos.length - 1]
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault()
        ultimo.focus()
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault()
        primero.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [abierta, cerrar])

  function validar(n: number) {
    const e: Partial<Record<keyof Datos, string>> = {}
    if (n === 0 && !datos.servicio) e.servicio = 'Elige qué necesitas para poder darte cita.'
    if (n === 1) {
      if (!datos.vehiculo.trim()) e.vehiculo = 'Dinos marca y modelo, así preparamos las piezas.'
      if (!datos.fecha) e.fecha = 'Elige el día que quieres traerlo.'
    }
    if (n === 2) {
      if (!datos.nombre.trim()) e.nombre = 'Necesitamos un nombre para la ficha.'
      if (!/^[0-9+\s().-]{9,}$/.test(datos.telefono.trim())) e.telefono = 'Escribe un teléfono donde podamos llamarte.'
      if (datos.email && !/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(datos.email.trim())) e.email = 'Revisa el correo, parece incompleto.'
      if (!datos.acepta) e.acepta = 'Marca la casilla para que podamos contactarte.'
    }
    setErrores(e)
    return Object.keys(e).length === 0
  }

  function siguiente() {
    if (validar(paso)) setPaso((p) => p + 1)
  }

  function enviar(ev: FormEvent) {
    ev.preventDefault()
    if (!validar(2)) return
    setEnviado(true)
  }

  const hoy = hoyISO()
  const opciones = [...SERVICIOS.map((s) => s.nombre), ...EXTRAS]
  const listaServicios = datos.servicio && !opciones.includes(datos.servicio) ? [datos.servicio, ...opciones] : opciones

  return (
    <AnimatePresence>
      {abierta && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[70] flex items-end justify-center bg-ink-900/80 p-0 backdrop-blur-md sm:items-center sm:p-6"
          onMouseDown={(e) => e.target === e.currentTarget && cerrar()}
        >
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cita-titulo"
            initial={quieto ? false : { opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={quieto ? undefined : { opacity: 0, y: 30, scale: 0.985 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-[92svh] w-full max-w-2xl overflow-y-auto rounded-t-[28px] border border-ink-line bg-ink-800 shadow-plate sm:rounded-[28px]"
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-6 border-b border-ink-line bg-ink-800/95 px-6 py-5 backdrop-blur-xl md:px-9 md:py-7">
              <div>
                <h2 id="cita-titulo" className="font-display text-[1.35rem] font-bold tracking-display text-chalk md:text-[1.6rem]">
                  {enviado ? 'Cita solicitada' : 'Pedir cita'}
                </h2>
                {!enviado && (
                  <p className="num mt-1.5 tag text-mute">
                    Paso {paso + 1} de 3 · {PASOS[paso]}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={cerrar}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-line text-mute transition-colors duration-300 hover:border-white/40 hover:text-chalk"
                aria-label="Cerrar"
              >
                <X className="h-[18px] w-[18px]" aria-hidden="true" />
              </button>
            </div>

            {!enviado && (
              <div className="flex gap-1.5 px-6 pt-5 md:px-9" aria-hidden="true">
                {PASOS.map((p, i) => (
                  <span key={p} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= paso ? 'bg-accent' : 'bg-ink-600'}`} />
                ))}
              </div>
            )}

            <div className="px-6 pb-8 pt-7 md:px-9 md:pb-10">
              {enviado ? (
                <div className="py-4 text-center">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-ink-900">
                    <Check className="h-7 w-7" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  <p className="mt-6 font-display text-[1.5rem] font-bold tracking-display text-chalk">
                    Gracias, {datos.nombre.split(' ')[0]}.
                  </p>
                  <p className="mx-auto mt-3 max-w-[42ch] text-[0.95rem] leading-relaxed text-mute">
                    Hemos recibido tu solicitud. Te llamamos al <span className="num text-chalk">{datos.telefono}</span>{' '}
                    en menos de dos horas para confirmar el hueco.
                  </p>

                  <dl className="mx-auto mt-8 max-w-sm space-y-3 rounded-2xl border border-ink-line bg-ink-900 p-6 text-left text-[0.875rem]">
                    <div className="flex justify-between gap-4">
                      <dt className="text-mute">Servicio</dt>
                      <dd className="text-right font-semibold text-chalk">{datos.servicio}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-mute">Vehículo</dt>
                      <dd className="text-right font-semibold text-chalk">{datos.vehiculo}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-mute">Día</dt>
                      <dd className="num text-right font-semibold text-chalk">
                        {new Date(`${datos.fecha}T12:00:00`).toLocaleDateString('es-ES', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                        })}{' '}
                        · {datos.franja}
                      </dd>
                    </div>
                  </dl>

                  <p className="mt-6 text-[0.75rem] text-mute/70">
                    Demo: no se envía ningún dato ni se guarda nada en ningún servidor.
                  </p>

                  <SecondaryButton onClick={cerrar} className="mt-7" bare>
                    Cerrar
                  </SecondaryButton>
                </div>
              ) : (
                <form onSubmit={enviar} noValidate>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={paso}
                      initial={quieto ? false : { opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={quieto ? undefined : { opacity: 0, x: -18 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {paso === 0 && (
                        <fieldset>
                          <legend className={etiqueta}>¿Qué necesitas?</legend>
                          <div className="grid gap-2 sm:grid-cols-2">
                            {listaServicios.map((nombre, i) => {
                              const def = SERVICIOS.find((s) => s.nombre === nombre)
                              const Icono = def ? ICONOS[def.icono] : Wrench
                              const elegido = datos.servicio === nombre
                              return (
                                <button
                                  key={nombre}
                                  type="button"
                                  data-autofocus={i === 0 ? '' : undefined}
                                  onClick={() => set('servicio', nombre)}
                                  aria-pressed={elegido}
                                  className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-[0.9rem] font-semibold transition-colors duration-300 ${
                                    elegido
                                      ? 'border-accent bg-accent/10 text-chalk'
                                      : 'border-ink-line text-mute hover:border-white/25 hover:text-chalk'
                                  }`}
                                >
                                  <Icono className={`h-[18px] w-[18px] shrink-0 ${elegido ? 'text-accent' : ''}`} aria-hidden="true" />
                                  {nombre}
                                </button>
                              )
                            })}
                          </div>
                          {errores.servicio && (
                            <p role="alert" className="mt-3 text-[0.8125rem] text-accent">
                              {errores.servicio}
                            </p>
                          )}

                          <div className="mt-7">
                            <span className={etiqueta}>Tipo de vehículo</span>
                            <div className="flex flex-wrap gap-2">
                              {TIPOS_VEHICULO.map((v) => (
                                <button
                                  key={v.id}
                                  type="button"
                                  onClick={() => set('tipo', v.id)}
                                  aria-pressed={datos.tipo === v.id}
                                  className={`rounded-full border px-4 py-2.5 text-[0.8125rem] font-semibold transition-colors duration-300 ${
                                    datos.tipo === v.id
                                      ? 'border-accent bg-accent text-ink-900'
                                      : 'border-ink-line text-mute hover:border-white/30 hover:text-chalk'
                                  }`}
                                >
                                  {v.nombre}
                                </button>
                              ))}
                            </div>
                          </div>
                        </fieldset>
                      )}

                      {paso === 1 && (
                        <div className="grid gap-5 sm:grid-cols-2">
                          <div className="sm:col-span-2">
                            <label htmlFor="vehiculo" className={etiqueta}>
                              Marca y modelo
                            </label>
                            <input
                              id="vehiculo"
                              data-autofocus
                              value={datos.vehiculo}
                              onChange={(e) => set('vehiculo', e.target.value)}
                              placeholder="Seat León 1.5 TSI"
                              aria-invalid={Boolean(errores.vehiculo)}
                              className={campo}
                            />
                            {errores.vehiculo && (
                              <p role="alert" className="mt-2 text-[0.8125rem] text-accent">
                                {errores.vehiculo}
                              </p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="matricula" className={etiqueta}>
                              Matrícula <span className="normal-case tracking-normal text-mute/70">(opcional)</span>
                            </label>
                            <input
                              id="matricula"
                              value={datos.matricula}
                              onChange={(e) => set('matricula', e.target.value.toUpperCase())}
                              placeholder="0000 ABC"
                              className={`${campo} num uppercase tracking-[0.08em]`}
                            />
                          </div>

                          <div>
                            <label htmlFor="fecha" className={etiqueta}>
                              Día preferido
                            </label>
                            <input
                              id="fecha"
                              type="date"
                              min={hoy}
                              value={datos.fecha}
                              onChange={(e) => set('fecha', e.target.value)}
                              aria-invalid={Boolean(errores.fecha)}
                              className={`${campo} num`}
                            />
                            {errores.fecha && (
                              <p role="alert" className="mt-2 text-[0.8125rem] text-accent">
                                {errores.fecha}
                              </p>
                            )}
                          </div>

                          <fieldset className="sm:col-span-2">
                            <legend className={etiqueta}>Franja</legend>
                            <div className="flex gap-2">
                              {(['Mañana', 'Tarde'] as const).map((f) => (
                                <button
                                  key={f}
                                  type="button"
                                  onClick={() => set('franja', f)}
                                  aria-pressed={datos.franja === f}
                                  className={`flex-1 rounded-xl border px-4 py-3 text-[0.875rem] font-semibold transition-colors duration-300 ${
                                    datos.franja === f
                                      ? 'border-accent bg-accent text-ink-900'
                                      : 'border-ink-line text-mute hover:border-white/25 hover:text-chalk'
                                  }`}
                                >
                                  {f}
                                </button>
                              ))}
                            </div>
                          </fieldset>
                        </div>
                      )}

                      {paso === 2 && (
                        <div className="grid gap-5 sm:grid-cols-2">
                          <div>
                            <label htmlFor="nombre" className={etiqueta}>
                              Nombre
                            </label>
                            <input
                              id="nombre"
                              data-autofocus
                              value={datos.nombre}
                              onChange={(e) => set('nombre', e.target.value)}
                              autoComplete="name"
                              aria-invalid={Boolean(errores.nombre)}
                              className={campo}
                            />
                            {errores.nombre && (
                              <p role="alert" className="mt-2 text-[0.8125rem] text-accent">
                                {errores.nombre}
                              </p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="telefono" className={etiqueta}>
                              Teléfono
                            </label>
                            <input
                              id="telefono"
                              type="tel"
                              inputMode="tel"
                              value={datos.telefono}
                              onChange={(e) => set('telefono', e.target.value)}
                              placeholder="600 000 000"
                              autoComplete="tel"
                              aria-invalid={Boolean(errores.telefono)}
                              className={`${campo} num`}
                            />
                            {errores.telefono && (
                              <p role="alert" className="mt-2 text-[0.8125rem] text-accent">
                                {errores.telefono}
                              </p>
                            )}
                          </div>

                          <div className="sm:col-span-2">
                            <label htmlFor="email" className={etiqueta}>
                              Correo <span className="normal-case tracking-normal text-mute/70">(opcional)</span>
                            </label>
                            <input
                              id="email"
                              type="email"
                              value={datos.email}
                              onChange={(e) => set('email', e.target.value)}
                              autoComplete="email"
                              aria-invalid={Boolean(errores.email)}
                              className={campo}
                            />
                            {errores.email && (
                              <p role="alert" className="mt-2 text-[0.8125rem] text-accent">
                                {errores.email}
                              </p>
                            )}
                          </div>

                          <div className="sm:col-span-2">
                            <label className="flex cursor-pointer items-start gap-3 text-[0.8125rem] leading-relaxed text-mute">
                              <input
                                type="checkbox"
                                checked={datos.acepta}
                                onChange={(e) => set('acepta', e.target.checked)}
                                aria-invalid={Boolean(errores.acepta)}
                                className="mt-0.5 h-4 w-4 shrink-0 accent-[#FF5A1F]"
                              />
                              <span>
                                Acepto que {TALLER.nombre} me contacte para gestionar esta cita. Es una web de
                                demostración: no se envía ni se guarda ningún dato.
                              </span>
                            </label>
                            {errores.acepta && (
                              <p role="alert" className="mt-2 text-[0.8125rem] text-accent">
                                {errores.acepta}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-9 flex items-center justify-between gap-3">
                    {paso > 0 ? (
                      <button
                        type="button"
                        onClick={() => setPaso((p) => p - 1)}
                        className="group inline-flex items-center gap-2 tag text-mute transition-colors duration-300 hover:text-chalk"
                      >
                        <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden="true" />
                        Atrás
                      </button>
                    ) : (
                      <span />
                    )}

                    {paso < 2 ? (
                      <ContactButton onClick={siguiente} icon={<ArrowRight className="h-4 w-4" />}>
                        Continuar
                      </ContactButton>
                    ) : (
                      <ContactButton type="submit">Solicitar cita</ContactButton>
                    )}
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
