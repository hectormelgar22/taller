import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type Props = { value: number; decimals?: number; suffix?: string; className?: string }

/** Cuenta hasta el valor final la primera vez que entra en pantalla. */
export default function Counter({ value, decimals = 0, suffix = '', className = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const visible = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })
  const quieto = useReducedMotion()
  const [n, setN] = useState(quieto ? value : 0)

  useEffect(() => {
    if (!visible || quieto) return
    const control = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(v),
    })
    return () => control.stop()
  }, [visible, value, quieto])

  const texto = n.toLocaleString('es-ES', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className={`num ${className}`}>
      {texto}
      {suffix}
    </span>
  )
}
