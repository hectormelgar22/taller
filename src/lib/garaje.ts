/**
 * Lógica del "Garaje digital": tarifas orientativas, calendario de ITV,
 * seguimiento de reparación y estado de apertura del taller.
 */

/* ------------------------------------------------------------------ *
 * Presupuesto orientativo
 * ------------------------------------------------------------------ */

export type TipoVehiculo = 'turismo' | 'suv' | 'furgoneta' | 'electrificado'

export const TIPOS_VEHICULO: { id: TipoVehiculo; nombre: string; factor: number }[] = [
  { id: 'turismo', nombre: 'Turismo', factor: 1 },
  { id: 'suv', nombre: 'SUV / 4x4', factor: 1.15 },
  { id: 'furgoneta', nombre: 'Furgoneta', factor: 1.28 },
  { id: 'electrificado', nombre: 'Híbrido / eléctrico', factor: 1.12 },
]

export type Tarifa = {
  id: string
  nombre: string
  min: number
  max: number
  /** Duración aproximada en el taller. */
  duracion: string
  nota?: string
}

export const TARIFAS: Tarifa[] = [
  { id: 'diagnosis', nombre: 'Diagnosis electrónica', min: 45, max: 75, duracion: '45–90 min' },
  { id: 'aceite', nombre: 'Cambio de aceite y filtros', min: 95, max: 165, duracion: '1 h' },
  { id: 'pastillas', nombre: 'Pastillas de freno (un eje)', min: 120, max: 220, duracion: '1–2 h' },
  { id: 'discos', nombre: 'Discos y pastillas (un eje)', min: 220, max: 390, duracion: '2–3 h' },
  { id: 'preitv', nombre: 'Revisión pre-ITV', min: 39, max: 69, duracion: '45 min' },
  { id: 'amortiguadores', nombre: 'Amortiguadores (un eje)', min: 260, max: 480, duracion: '3 h' },
  { id: 'clima', nombre: 'Recarga de aire acondicionado', min: 75, max: 130, duracion: '1 h' },
  { id: 'distribucion', nombre: 'Correa de distribución', min: 480, max: 890, duracion: '1 día', nota: 'Incluye bomba de agua' },
  { id: 'embrague', nombre: 'Embrague completo', min: 650, max: 1200, duracion: '1–2 días' },
]

/** Redondea al alza a la decena más cercana para que el rango se lea limpio. */
const alDiez = (n: number) => Math.round(n / 10) * 10

export function estimar(tarifaId: string, tipo: TipoVehiculo) {
  const tarifa = TARIFAS.find((t) => t.id === tarifaId) ?? TARIFAS[0]
  const factor = TIPOS_VEHICULO.find((v) => v.id === tipo)?.factor ?? 1
  return {
    tarifa,
    min: alDiez(tarifa.min * factor),
    max: alDiez(tarifa.max * factor),
  }
}

export const eur = (n: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)

/* ------------------------------------------------------------------ *
 * Calendario de ITV — Real Decreto 920/2017
 * ------------------------------------------------------------------ */

export type TipoItv = 'turismo' | 'furgoneta' | 'moto'

export const TIPOS_ITV: { id: TipoItv; nombre: string; regla: string }[] = [
  {
    id: 'turismo',
    nombre: 'Turismo',
    regla: 'Exento hasta los 4 años · cada 2 años de los 4 a los 10 · anual a partir de los 10',
  },
  {
    id: 'furgoneta',
    nombre: 'Furgoneta (hasta 3.500 kg)',
    regla: 'Exenta hasta los 2 años · cada 2 años de los 2 a los 6 · anual de los 6 a los 10 · cada 6 meses después',
  },
  {
    id: 'moto',
    nombre: 'Motocicleta',
    regla: 'Exenta hasta los 4 años · cada 2 años a partir de entonces',
  },
]

const sumarMeses = (fecha: Date, meses: number) => {
  const d = new Date(fecha)
  const dia = d.getDate()
  d.setMonth(d.getMonth() + meses)
  // Evita el desbordamiento de mes (31 de enero + 1 mes).
  if (d.getDate() < dia) d.setDate(0)
  return d
}

/**
 * Años cumplidos por calendario. Dividir milisegundos entre la duración media
 * del año da 9,9988 en un décimo aniversario exacto y hace que el vehículo
 * caiga en la cadencia equivocada justo el año que cambia.
 */
function aniosCumplidos(desde: Date, hasta: Date) {
  let anios = hasta.getFullYear() - desde.getFullYear()
  const meses = hasta.getMonth() - desde.getMonth()
  if (meses < 0 || (meses === 0 && hasta.getDate() < desde.getDate())) anios -= 1
  return anios
}

/** Meses hasta la siguiente inspección según la edad que tendrá el vehículo. */
function cadenciaMeses(tipo: TipoItv, edad: number) {
  if (tipo === 'moto') return 24
  if (tipo === 'turismo') return edad >= 10 ? 12 : 24
  if (edad >= 10) return 6
  if (edad >= 6) return 12
  return 24
}

export type ResultadoItv = {
  proxima: Date
  dias: number
  primera: boolean
  cadencia: string
  edad: number
}

/**
 * Calcula la próxima ITV a partir de la fecha de primera matriculación.
 * Encadena las inspecciones desde la primera obligatoria hasta superar hoy.
 */
export function proximaItv(matriculacion: Date, tipo: TipoItv, hoy = new Date()): ResultadoItv | null {
  if (Number.isNaN(matriculacion.getTime())) return null
  if (matriculacion > hoy) return null

  const exencionMeses = tipo === 'furgoneta' ? 24 : 48
  let cursor = sumarMeses(matriculacion, exencionMeses)
  let primera = true

  let guardia = 0
  while (cursor < hoy && guardia < 200) {
    const edad = aniosCumplidos(matriculacion, cursor)
    cursor = sumarMeses(cursor, cadenciaMeses(tipo, edad))
    primera = false
    guardia++
  }

  const edadAhora = aniosCumplidos(matriculacion, hoy)
  const dias = Math.ceil((cursor.getTime() - hoy.getTime()) / 86_400_000)
  const meses = cadenciaMeses(tipo, edadAhora)

  return {
    proxima: cursor,
    dias,
    primera,
    cadencia: meses === 6 ? 'cada 6 meses' : meses === 12 ? 'una vez al año' : 'cada 2 años',
    edad: edadAhora,
  }
}

/**
 * Fecha de hoy en formato YYYY-MM-DD según el reloj local.
 * `toISOString()` devuelve UTC: en España, a partir de las 23:00 (22:00 en
 * invierno) daría el día anterior y el selector bloquearía el día de hoy.
 */
export function hoyISO(d = new Date()) {
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

export const fechaLarga = (d: Date) =>
  new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }).format(d)

/* ------------------------------------------------------------------ *
 * Seguimiento de reparación
 * ------------------------------------------------------------------ */

export const FASES = ['Recepción', 'Diagnosis', 'Presupuesto', 'Reparación', 'Control y entrega'] as const

export type Expediente = {
  codigo: string
  vehiculo: string
  matricula: string
  trabajo: string
  fase: number
  tecnico: string
  entrega: string
  nota: string
}

export const EXPEDIENTES: Expediente[] = [
  {
    codigo: 'ML-2847',
    vehiculo: 'Volkswagen Golf 1.6 TDI',
    matricula: '4821 KLM',
    trabajo: 'Discos y pastillas eje delantero',
    fase: 3,
    tecnico: 'Rubén A.',
    entrega: 'Hoy a partir de las 17:30',
    nota: 'Discos delanteros montados. Falta el rodaje de frenos y la prueba en carretera.',
  },
  {
    codigo: 'ML-3190',
    vehiculo: 'Renault Mégane 1.3 TCe',
    matricula: '9034 FTR',
    trabajo: 'Diagnosis de fallo de encendido',
    fase: 2,
    tecnico: 'Nuria P.',
    entrega: 'Pendiente de tu aprobación',
    nota: 'Bobina del cilindro 3 con fuga. Te hemos mandado el presupuesto al móvil.',
  },
  {
    codigo: 'ML-4412',
    vehiculo: 'Ford Transit Custom',
    matricula: '1177 GBD',
    trabajo: 'Revisión de 120.000 km',
    fase: 4,
    tecnico: 'Sergio M.',
    entrega: 'Listo para recoger',
    nota: 'Revisión terminada y ficha sellada. Puedes pasar cuando quieras.',
  },
]

export function buscarExpediente(codigo: string) {
  const limpio = codigo.trim().toUpperCase().replace(/\s+/g, '')
  return EXPEDIENTES.find((e) => e.codigo.replace('-', '') === limpio.replace('-', '')) ?? null
}

/* ------------------------------------------------------------------ *
 * Estado del taller en tiempo real
 * ------------------------------------------------------------------ */

/** Lun–Vie 08:00–19:00, Sáb 09:00–13:30, Dom cerrado. */
export function estadoTaller(ahora = new Date()) {
  const dia = ahora.getDay()
  const min = ahora.getHours() * 60 + ahora.getMinutes()
  const tramo = dia === 0 ? null : dia === 6 ? { abre: 9 * 60, cierra: 13 * 60 + 30 } : { abre: 8 * 60, cierra: 19 * 60 }

  if (tramo && min >= tramo.abre && min < tramo.cierra) {
    const h = Math.floor(tramo.cierra / 60)
    const m = tramo.cierra % 60
    return {
      abierto: true,
      texto: `Abierto · cierra a las ${h}:${String(m).padStart(2, '0')}`,
    }
  }

  if (tramo && min < tramo.abre) {
    const h = Math.floor(tramo.abre / 60)
    return { abierto: false, texto: `Cerrado · abre hoy a las ${h}:00` }
  }

  const manana = dia === 6 || dia === 0 ? 'el lunes a las 8:00' : dia === 5 ? 'el sábado a las 9:00' : 'mañana a las 8:00'
  return { abierto: false, texto: `Cerrado · abre ${manana}` }
}
