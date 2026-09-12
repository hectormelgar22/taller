import type { ShotKey } from './images'

export const TALLER = {
  nombre: 'MOTORLAB GARAGE',
  marca: 'MOTORLAB',
  telefono: '+34 910 000 000',
  telefonoTel: '+34910000000',
  whatsapp: '34910000000',
  email: 'hola@motorlabgarage.es',
  calle: 'Calle del Taller 24, Nave 7',
  cp: '28019 Madrid',
  ciudad: 'Madrid',
  horario: 'LUN–VIE 08:00–19:00',
  horarioLargo: 'Lunes a viernes de 08:00 a 19:00 · Sábados de 09:00 a 13:30',
} as const

export type Servicio = {
  n: string
  nombre: string
  desc: string
  icono: 'gauge' | 'disc' | 'droplets' | 'cog' | 'car' | 'snowflake'
}

export const SERVICIOS: Servicio[] = [
  {
    n: '01',
    nombre: 'Diagnosis electrónica',
    desc: 'Lectura de centralita y pruebas avanzadas para localizar la avería real antes de sustituir una sola pieza.',
    icono: 'gauge',
  },
  {
    n: '02',
    nombre: 'Frenos',
    desc: 'Revisión completa, pastillas, discos, líquido y puesta a punto de todo el sistema de frenado.',
    icono: 'disc',
  },
  {
    n: '03',
    nombre: 'Mantenimiento y aceite',
    desc: 'Revisiones periódicas para que tu coche siga fiable, eficiente y listo para cualquier viaje.',
    icono: 'droplets',
  },
  {
    n: '04',
    nombre: 'Mecánica de motor',
    desc: 'Inspección y reparación de motor con equipos de diagnosis modernos y oficio de taller.',
    icono: 'cog',
  },
  {
    n: '05',
    nombre: 'Suspensión y dirección',
    desc: 'Amortiguadores, suspensión, dirección y alineado para una conducción segura y precisa.',
    icono: 'car',
  },
  {
    n: '06',
    nombre: 'Aire acondicionado',
    desc: 'Diagnóstico, recarga y mantenimiento del climatizador para conducir a gusto todo el año.',
    icono: 'snowflake',
  },
]

export const PROCESO = [
  {
    n: '01',
    titulo: 'Pide cita',
    desc: 'Cuéntanos qué le pasa al coche y elige el día que mejor te venga. Te confirmamos en menos de dos horas.',
  },
  {
    n: '02',
    titulo: 'Diagnosticamos',
    desc: 'Nuestros técnicos revisan el vehículo y localizan la causa real de la avería, no solo el síntoma.',
  },
  {
    n: '03',
    titulo: 'Apruebas',
    desc: 'Te llamamos, te lo explicamos claro y te pasamos el presupuesto cerrado. No tocamos nada sin tu visto bueno.',
  },
  {
    n: '04',
    titulo: 'Conduce',
    desc: 'Terminamos la reparación, te enseñamos las piezas sustituidas y te devolvemos el coche listo para la carretera.',
  },
]

export const ESTADISTICAS: { valor: number; sufijo: string; etiqueta: string; decimales?: number }[] = [
  { valor: 15, sufijo: '+', etiqueta: 'Años de oficio' },
  { valor: 2.5, sufijo: 'K+', etiqueta: 'Coches atendidos', decimales: 1 },
  { valor: 98, sufijo: '%', etiqueta: 'Clientes satisfechos' },
  { valor: 12, sufijo: '', etiqueta: 'Servicios técnicos' },
]

export type Vitrina = {
  n: string
  categoria: string
  titulo: string
  etiqueta: string
  /** Servicio con el que se prerrellena la cita desde esta tarjeta. */
  servicio: string
  fotos: ShotKey[]
}

export const VITRINA: Vitrina[] = [
  {
    n: '01',
    categoria: 'Diagnosis',
    titulo: 'La precisión empieza por el diagnóstico correcto',
    etiqueta: 'Diagnosis avanzada',
    servicio: 'Diagnosis electrónica',
    fotos: ['tabletDiag', 'cluster', 'diagLead', 'techTablet'],
  },
  {
    n: '02',
    categoria: 'Mantenimiento',
    titulo: 'Tu coche siempre listo para la carretera',
    etiqueta: 'Mantenimiento preventivo',
    servicio: 'Mantenimiento y aceite',
    fotos: ['oilPour', 'underCar', 'engineBayClean', 'underside'],
  },
  {
    n: '03',
    categoria: 'Reparación',
    titulo: 'Un trabajo que se puede mirar de cerca',
    etiqueta: 'Reparación mecánica',
    servicio: 'Mecánica de motor',
    fotos: ['brakeDisc', 'coilover', 'toolReach', 'wheelHub'],
  },
]

export const MARQUESINA: { key: ShotKey; etiqueta?: string }[] = [
  { key: 'underLift', etiqueta: 'Elevador' },
  { key: 'wheelHub' },
  { key: 'tabletDiag', etiqueta: 'Diagnosis' },
  { key: 'engineMacro', etiqueta: 'Motor' },
  { key: 'caliper', etiqueta: 'Frenos' },
  { key: 'socketSet' },
  { key: 'liftsRow', etiqueta: 'Nave' },
  { key: 'coilover', etiqueta: 'Suspensión' },
  { key: 'wheelHands' },
  { key: 'oilPour', etiqueta: 'Mantenimiento' },
  { key: 'mechanicEngine' },
  { key: 'underside' },
  { key: 'spanners', etiqueta: 'Herramienta' },
  { key: 'bayWide' },
  { key: 'headWork', etiqueta: 'Culata' },
  { key: 'carryEngine' },
]

export const RESENAS = [
  {
    texto: 'Me dieron el presupuesto cerrado antes de tocar nada. Al final pagué exactamente lo que ponía en el papel, ni un euro más.',
    nombre: 'Laura Sedano',
    barrio: 'Chamberí',
    coche: 'Golf 1.6 TDI',
  },
  {
    texto: 'Llevé el coche con un fallo que en dos sitios no supieron encontrar. Lo tuvieron toda la mañana en diagnosis y salió una sonda lambda.',
    nombre: 'Javier Ortiz',
    barrio: 'Tetuán',
    coche: 'Mégane 1.3 TCe',
  },
  {
    texto: 'Te sacan la pieza vieja, te la enseñan y te explican por qué hay que cambiarla. Eso no me lo había hecho nadie antes.',
    nombre: 'Marta Ruiz',
    barrio: 'Arganzuela',
    coche: 'Ibiza 1.0 TSI',
  },
  {
    texto: 'Pedí cita un martes y el jueves tenía el coche. Frenos completos de los dos ejes, sin sorpresas y al precio dicho.',
    nombre: 'David Nieto',
    barrio: 'Chamartín',
    coche: 'Serie 3 320d',
  },
  {
    texto: 'Es la primera vez que salgo de un taller entendiendo de verdad lo que le han hecho al coche.',
    nombre: 'Carmen Villar',
    barrio: 'Salamanca',
    coche: 'Clase A 180d',
  },
  {
    texto: 'Trato de taller de barrio con medios de concesionario. Llevo los tres coches de casa con ellos.',
    nombre: 'Andrés Lillo',
    barrio: 'Latina',
    coche: 'Transit Custom',
  },
]

export const FAQ = [
  {
    p: '¿Pierdo la garantía del fabricante si no voy al concesionario?',
    r: 'No. El reglamento europeo 461/2010 te permite mantener el coche en un taller independiente sin perder la garantía, siempre que se usen recambios de calidad equivalente y quede constancia de la revisión. Nosotros te sellamos el libro de mantenimiento en cada visita.',
  },
  {
    p: '¿Me dais presupuesto antes de empezar?',
    r: 'Siempre. Diagnosticamos, te llamamos para explicarte qué hemos encontrado y te mandamos el presupuesto por escrito al móvil. No tocamos nada hasta que nos dices que sí.',
  },
  {
    p: '¿Cuánto tarda una diagnosis?',
    r: 'Entre 45 y 90 minutos según la avería. Si dejas el coche a primera hora, lo normal es que te llamemos con el diagnóstico el mismo día.',
  },
  {
    p: '¿Trabajáis con todas las marcas?',
    r: 'Somos multimarca. Tenemos equipos y licencias de diagnosis para los grupos VAG, Stellantis, BMW, Mercedes-Benz, Toyota, Renault-Nissan, Ford y Hyundai-Kia, además de acceso a la información técnica oficial.',
  },
  {
    p: '¿Preparáis el coche para la ITV?',
    r: 'Lo preparamos y lo pasamos por ti. Nos dejas las llaves, revisamos los puntos que más se suspenden, llevamos el coche a la estación y te lo devolvemos con la pegatina puesta.',
  },
  {
    p: '¿Puedo dejar el coche fuera de horario?',
    r: 'Sí. Tenemos buzón de llaves en la entrada con partes de recepción. Rellenas el parte, echas las llaves y por la mañana empezamos a trabajar sin que tengas que pedir permiso en el trabajo.',
  },
  {
    p: '¿Cómo se paga?',
    r: 'Tarjeta, transferencia o efectivo. En reparaciones de más de 300 € puedes fraccionar el pago en tres meses sin intereses.',
  },
]
