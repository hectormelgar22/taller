import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

const EASE = [0.25, 0.1, 0.25, 1] as const

type Props = {
  children: ReactNode
  delay?: number
  y?: number
  duration?: number
  className?: string
  /** Anima al entrar en viewport (por defecto) o inmediatamente al montar. */
  onMount?: boolean
  as?: 'div' | 'li' | 'span' | 'section' | 'figure'
}

/**
 * Envoltorio de entrada. Parte de un estado ya legible para que nada
 * dependa del JavaScript para poder leerse.
 */
export default function FadeIn({
  children,
  delay = 0,
  y = 30,
  duration = 0.7,
  className,
  onMount = false,
  as = 'div',
}: Props) {
  const quieto = useReducedMotion()
  const M = motion[as]

  if (quieto) return <M className={className}>{children}</M>

  const animacion = {
    initial: { opacity: 0, y },
    transition: { duration, delay, ease: EASE },
  }

  if (onMount) {
    return (
      <M {...animacion} animate={{ opacity: 1, y: 0 }} className={className}>
        {children}
      </M>
    )
  }

  return (
    <M
      {...animacion}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      className={className}
    >
      {children}
    </M>
  )
}

export { EASE }
