import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

type Estado = { abierta: boolean; servicio?: string }

type Ctx = Estado & {
  abrir: (servicio?: string) => void
  cerrar: () => void
}

const CitaCtx = createContext<Ctx | null>(null)

/** Estado compartido del modal de cita: cualquier CTA puede abrirlo prerrellenado. */
export function CitaProvider({ children }: { children: ReactNode }) {
  const [estado, setEstado] = useState<Estado>({ abierta: false })

  const abrir = useCallback((servicio?: string) => setEstado({ abierta: true, servicio }), [])
  const cerrar = useCallback(() => setEstado((e) => ({ ...e, abierta: false })), [])

  const valor = useMemo(() => ({ ...estado, abrir, cerrar }), [estado, abrir, cerrar])
  return <CitaCtx.Provider value={valor}>{children}</CitaCtx.Provider>
}

export function useCita() {
  const ctx = useContext(CitaCtx)
  if (!ctx) throw new Error('useCita debe usarse dentro de <CitaProvider>')
  return ctx
}
