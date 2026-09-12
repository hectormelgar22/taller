import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

type Props = {
  text: string
  className?: string
  /** Color de partida y de llegada. Ambos extremos cumplen contraste AA. */
  from?: string
  to?: string
}

/**
 * Revelado del párrafo carácter a carácter según avanza el scroll.
 * La tinta se oscurece en lugar de desvanecerse: así el texto se lee
 * completo incluso si nadie llega a hacer scroll.
 */
export default function AnimatedText({ text, className = '', from = '#666B70', to = '#0B0D0F' }: Props) {
  const ref = useRef<HTMLParagraphElement>(null)
  const quieto = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] })

  if (quieto) return <p className={className} style={{ color: to }}>{text}</p>

  const palabras = text.split(' ')
  const total = text.length
  let indice = 0

  return (
    <p ref={ref} className={className}>
      {palabras.map((palabra, p) => {
        const letras = [...palabra]
        const nodos = letras.map((letra) => {
          const rango: [number, number] = [indice / total, (indice + 1) / total]
          indice += 1
          return <Caracter key={indice} letra={letra} rango={rango} progreso={scrollYProgress} from={from} to={to} />
        })
        indice += 1 // el espacio entre palabras también consume avance
        return (
          <span key={p}>
            <span className="inline-block whitespace-nowrap">{nodos}</span>
            {p < palabras.length - 1 ? ' ' : ''}
          </span>
        )
      })}
    </p>
  )
}

function Caracter({
  letra,
  rango,
  progreso,
  from,
  to,
}: {
  letra: string
  rango: [number, number]
  progreso: ReturnType<typeof useScroll>['scrollYProgress']
  from: string
  to: string
}) {
  const color = useTransform(progreso, rango, [from, to])
  return (
    <motion.span style={{ color }} className="inline-block">
      {letra}
    </motion.span>
  )
}
