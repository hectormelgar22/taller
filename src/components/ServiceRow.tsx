import { ArrowUpRight } from 'lucide-react'
import type { Servicio } from '../data/content'

type Props = { servicio: Servicio; onSelect: (nombre: string) => void }

/**
 * Fila de servicio. Es un botón real: al pulsarla se abre la cita
 * con ese servicio ya seleccionado.
 */
export default function ServiceRow({ servicio, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={() => onSelect(servicio.nombre)}
      className="group relative block w-full cursor-pointer overflow-hidden border-t border-ink-line text-left transition-colors duration-500 hover:bg-white/[0.025]"
    >
      {/* Línea de acento que crece al pasar por encima */}
      <span
        className="absolute inset-x-0 top-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
        aria-hidden="true"
      />

      <div className="flex items-start gap-5 px-1 py-8 transition-transform duration-500 ease-out group-hover:translate-x-1.5 md:items-center md:gap-8 md:py-10 md:group-hover:translate-x-3">
        <span className="num mt-1 shrink-0 font-display text-[1.05rem] font-bold tracking-[-0.02em] text-mute transition-colors duration-500 group-hover:text-accent md:mt-0 md:text-[1.35rem]">
          {servicio.n}
        </span>

        <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center md:gap-10">
          <h3 className="flex-1 font-display text-[clamp(1.45rem,4.2vw,2.5rem)] font-bold uppercase leading-[1.02] tracking-display text-chalk md:max-w-[13ch]">
            {servicio.nombre}
          </h3>
          <p className="max-w-[52ch] text-[0.95rem] leading-relaxed text-mute transition-colors duration-500 group-hover:text-chalk md:flex-1 md:text-base">
            {servicio.desc}
          </p>
        </div>

        <span
          className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink-line text-mute transition-all duration-500 ease-out group-hover:border-accent group-hover:bg-accent group-hover:text-ink-900 md:mt-0"
          aria-hidden="true"
        >
          <ArrowUpRight className="h-5 w-5 transition-transform duration-500 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </button>
  )
}
