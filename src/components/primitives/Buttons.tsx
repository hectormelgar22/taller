import { ArrowUpRight } from 'lucide-react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type Base = {
  children: ReactNode
  className?: string
  icon?: ReactNode
  /** Oculta la flecha de la esquina. */
  bare?: boolean
}

type AsButton = Base & ComponentPropsWithoutRef<'button'> & { href?: undefined }
type AsLink = Base & ComponentPropsWithoutRef<'a'> & { href: string }
type Props = AsButton | AsLink

const SHAPE =
  'group relative inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 ' +
  'text-[0.8125rem] font-bold uppercase tracking-[0.14em] leading-none ' +
  'transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-out ' +
  'active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45'

function Inner({ children, icon, bare }: Base) {
  return (
    <>
      <span className="relative">{children}</span>
      {!bare &&
        (icon ?? (
          <ArrowUpRight
            className="h-4 w-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        ))}
    </>
  )
}

/**
 * Acción principal. Texto casi negro sobre naranja: mantiene el acento
 * exacto de marca (#FF5A1F) y llega a 6.2:1 de contraste, que el blanco no alcanza.
 */
export function ContactButton({ children, className = '', icon, bare, ...rest }: Props) {
  const cls = `${SHAPE} bg-accent text-ink-900 hover:bg-accent-hi hover:shadow-glow hover:-translate-y-0.5 ${className}`
  const inner = <Inner icon={icon} bare={bare}>{children}</Inner>
  return 'href' in rest && rest.href !== undefined ? (
    <a className={cls} {...(rest as ComponentPropsWithoutRef<'a'>)}>{inner}</a>
  ) : (
    <button type="button" className={cls} {...(rest as ComponentPropsWithoutRef<'button'>)}>{inner}</button>
  )
}

/** Acción secundaria sobre fondo oscuro. */
export function SecondaryButton({ children, className = '', icon, bare, ...rest }: Props) {
  const cls =
    `${SHAPE} border border-white/25 text-chalk hover:border-white/50 hover:bg-white/[0.07] ` +
    `hover:-translate-y-0.5 ${className}`
  const inner = <Inner icon={icon} bare={bare}>{children}</Inner>
  return 'href' in rest && rest.href !== undefined ? (
    <a className={cls} {...(rest as ComponentPropsWithoutRef<'a'>)}>{inner}</a>
  ) : (
    <button type="button" className={cls} {...(rest as ComponentPropsWithoutRef<'button'>)}>{inner}</button>
  )
}

/** Acción secundaria sobre las secciones claras. */
export function PaperButton({ children, className = '', icon, bare, ...rest }: Props) {
  const cls =
    `${SHAPE} border border-ink-900/20 text-ink-900 hover:border-ink-900/45 hover:bg-ink-900/[0.05] ` +
    `hover:-translate-y-0.5 ${className}`
  const inner = <Inner icon={icon} bare={bare}>{children}</Inner>
  return 'href' in rest && rest.href !== undefined ? (
    <a className={cls} {...(rest as ComponentPropsWithoutRef<'a'>)}>{inner}</a>
  ) : (
    <button type="button" className={cls} {...(rest as ComponentPropsWithoutRef<'button'>)}>{inner}</button>
  )
}
