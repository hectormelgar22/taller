/**
 * Fotografía de stock real (Pexels, licencia libre sin atribución obligatoria).
 * Cada entrada lleva su texto alternativo descriptivo en español.
 */
const BASE = 'https://images.pexels.com/photos'

type Fit = { w: number; h: number }

/**
 * WebP en lugar de JPEG: el CDN de Pexels lo sirve con `fm=webp` y pesa
 * alrededor de un 38 % menos con la misma calidad percibida. El parámetro `q`
 * lo ignora, así que el ahorro viene del formato.
 */
const FORMATO = 'auto=compress&cs=tinysrgb&fm=webp'

/** Construye la URL servida por el CDN de Pexels con recorte y compresión. */
function px(path: string, { w, h }: Fit) {
  return `${BASE}/${path}?${FORMATO}&fit=crop&w=${w}&h=${h}`
}

export type Shot = { path: string; alt: string }

export const SHOTS = {
  heroLift: {
    path: '4489737/pexels-photo-4489737.jpeg',
    alt: 'Mecánico revisando los bajos de un coche elevado con una lámpara de inspección',
  },
  underLift: {
    path: '4489749/pexels-photo-4489749.jpeg',
    alt: 'Mecánico trabajando bajo un coche subido al elevador',
  },
  bayWide: {
    path: '8986148/pexels-photo-8986148.jpeg',
    alt: 'Vista general de una nave de taller con varios puestos de trabajo',
  },
  liftsRow: {
    path: '8986145/pexels-photo-8986145.jpeg',
    alt: 'Coches sobre elevadores en el interior de un taller mecánico',
  },
  carryEngine: {
    path: '8985518/pexels-photo-8985518.jpeg',
    alt: 'Técnico trasladando un motor por la nave del taller',
  },
  underside: {
    path: '8985514/pexels-photo-8985514.jpeg',
    alt: 'Bajos de un vehículo elevado en el puente del taller',
  },
  underCar: {
    path: '8985614/pexels-photo-8985614.jpeg',
    alt: 'Mecánico trabajando bajo el chasis de un coche',
  },
  tabletDiag: {
    path: '4116198/pexels-photo-4116198.jpeg',
    alt: 'Manos sosteniendo una tableta de diagnosis conectada a un vehículo',
  },
  techTablet: {
    path: '6870295/pexels-photo-6870295.jpeg',
    alt: 'Técnico consultando una tableta de diagnosis junto al capó abierto',
  },
  techTabletClose: {
    path: '6870326/pexels-photo-6870326.jpeg',
    alt: 'Técnico de taller con una tableta de diagnosis en las manos',
  },
  diagLead: {
    path: '13065689/pexels-photo-13065689.jpeg',
    alt: 'Vano motor con el cable de diagnosis conectado a la centralita',
  },
  cluster: {
    path: '241188/pexels-photo-241188.jpeg',
    alt: 'Cuadro de instrumentos iluminado de un coche moderno',
  },
  brakeDisc: {
    path: '4022543/pexels-photo-4022543.jpeg',
    alt: 'Disco de freno perforado y buje al descubierto',
  },
  caliper: {
    path: '833320/pexels-photo-833320.jpeg',
    alt: 'Pinza de freno roja tras una llanta de aleación',
  },
  wheelHub: {
    path: '20408753/pexels-photo-20408753.jpeg',
    alt: 'Detalle de una llanta de aleación con la pinza de freno al fondo',
  },
  coilover: {
    path: '13393008/pexels-photo-13393008.jpeg',
    alt: 'Amortiguador con muelle helicoidal fotografiado en primer plano',
  },
  engineMacro: {
    path: '6517339/pexels-photo-6517339.jpeg',
    alt: 'Componentes internos de un motor desmontado sobre el banco',
  },
  engineParts: {
    path: '19499386/pexels-photo-19499386.jpeg',
    alt: 'Detalle de la distribución de un motor abierto',
  },
  headWork: {
    path: '8986146/pexels-photo-8986146.jpeg',
    alt: 'Técnico trabajando sobre una culata en el banco del taller',
  },
  engineBayClean: {
    path: '4315575/pexels-photo-4315575.jpeg',
    alt: 'Vano motor limpio de un coche moderno con el capó abierto',
  },
  engineBayDark: {
    path: '12330644/pexels-photo-12330644.jpeg',
    alt: 'Vano motor de un coche con iluminación tenue de taller',
  },
  oilPour: {
    path: '13065690/pexels-photo-13065690.jpeg',
    alt: 'Manos enguantadas vertiendo aceite nuevo en el motor',
  },
  handsEngine: {
    path: '8478219/pexels-photo-8478219.jpeg',
    alt: 'Manos de un mecánico trabajando dentro del vano motor',
  },
  openBonnet: {
    path: '8478202/pexels-photo-8478202.jpeg',
    alt: 'Mecánico abriendo el capó de un vehículo en el taller',
  },
  mechanicEngine: {
    path: '8478259/pexels-photo-8478259.jpeg',
    alt: 'Mecánico con mono de trabajo revisando el motor de un coche',
  },
  wheelHands: {
    path: '17623850/pexels-photo-17623850.jpeg',
    alt: 'Manos limpiando la llanta de una rueda montada',
  },
  benchMechanic: {
    path: '4489761/pexels-photo-4489761.jpeg',
    alt: 'Mecánico trabajando en el banco de su taller',
  },
  partWork: {
    path: '3807517/pexels-photo-3807517.jpeg',
    alt: 'Mecánico manipulando una pieza de carrocería en el taller',
  },
  engineStand: {
    path: '4116294/pexels-photo-4116294.jpeg',
    alt: 'Bloque motor apoyado en su soporte dentro del taller',
  },
  spanners: {
    path: '7019374/pexels-photo-7019374.jpeg',
    alt: 'Juego de llaves fijas sobre la mesa de trabajo',
  },
  socketSet: {
    path: '8985918/pexels-photo-8985918.jpeg',
    alt: 'Maletín de vasos y llaves ordenado en el taller',
  },
  toolReach: {
    path: '9606741/pexels-photo-9606741.jpeg',
    alt: 'Mano cogiendo un vaso de la caja de herramientas',
  },
  darkCar: {
    path: '10940696/pexels-photo-10940696.jpeg',
    alt: 'Coche oscuro aparcado bajo la luz tenue de un garaje',
  },
} satisfies Record<string, Shot>

export type ShotKey = keyof typeof SHOTS

/** Devuelve `src` + `alt` listos para un `<img>` al tamaño pedido. */
export function shot(key: ShotKey, size: Fit) {
  const s = SHOTS[key]
  return { src: px(s.path, size), alt: s.alt }
}

/** Variante `srcSet` de 1x/2x para las piezas grandes. */
export function shotSet(key: ShotKey, size: Fit) {
  const s = SHOTS[key]
  return {
    src: px(s.path, size),
    srcSet: `${px(s.path, size)} 1x, ${px(s.path, { w: size.w * 2, h: size.h * 2 })} 2x`,
    alt: s.alt,
  }
}

/**
 * Juego de anchos para una imagen que ocupa todo el ancho de la ventana.
 * El navegador elige el archivo según su viewport y densidad.
 */
/**
 * @param sizes  Las fotos a sangre van bajo un velo oscuro y viñeta, así que
 *               pedir menos píxeles que el ancho real es imperceptible y
 *               ahorra bastante en la métrica LCP.
 */
export function shotFull(key: ShotKey, ratio?: number, sizes = '100vw') {
  const s = SHOTS[key]
  const anchos = [640, 960, 1280, 1600]
  const url = (w: number) =>
    ratio ? px(s.path, { w, h: Math.round(w * ratio) }) : `${BASE}/${s.path}?${FORMATO}&w=${w}`
  return {
    src: url(1280),
    srcSet: anchos.map((w) => `${url(w)} ${w}w`).join(', '),
    sizes,
    alt: s.alt,
  }
}
