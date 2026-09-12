import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { TALLER } from '../data/content'
import { useCita } from '../lib/cita'
import { ContactButton } from './primitives/Buttons'

const ENLACES = [
  { href: '#servicios', texto: 'Servicios' },
  { href: '#garaje', texto: 'Presupuesto' },
  { href: '#taller', texto: 'Taller' },
  { href: '#proceso', texto: 'Proceso' },
  { href: '#contacto', texto: 'Contacto' },
]

export default function Navbar() {
  const [posado, setPosado] = useState(false)
  const [menu, setMenu] = useState(false)
  const { abrir } = useCita()
  const quieto = useReducedMotion()
  const { scrollY, scrollYProgress } = useScroll()
  const avance = useSpring(scrollYProgress, { stiffness: 180, damping: 32, restDelta: 0.001 })

  useMotionValueEvent(scrollY, 'change', (v) => setPosado(v > 24))

  // El menú desplegable bloquea el scroll del documento mientras está abierto.
  useEffect(() => {
    if (!menu) return
    const previo = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previo
    }
  }, [menu])

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [])

  return (
    <>
      <motion.header
        initial={quieto ? false : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`relative transition-[background-color,backdrop-filter,border-color] duration-500 ease-out ${
            posado
              ? 'border-b border-white/[0.08] bg-ink-900/80 backdrop-blur-xl supports-[backdrop-filter]:bg-ink-900/65'
              : 'border-b border-transparent bg-transparent'
          }`}
        >
          <nav className="shell flex h-[4.5rem] items-center justify-between gap-6 md:h-20" aria-label="Principal">
            <a href="#inicio" className="group flex items-center gap-2.5" aria-label={`${TALLER.marca}, inicio`}>
              <span className="font-display text-[1.35rem] font-bold tracking-[-0.03em] text-chalk md:text-[1.5rem]">
                {TALLER.marca}
              </span>
              <span className="mb-2 h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150" />
            </a>

            <ul className="hidden items-center gap-8 lg:flex">
              {ENLACES.map((e) => (
                <li key={e.href}>
                  <a href={e.href} className="group relative block py-1.5 tag text-mute transition-colors duration-300 hover:text-chalk">
                    {e.texto}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-[width] duration-300 ease-out group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 md:gap-3">
              <a
                href={`tel:${TALLER.telefonoTel}`}
                className="hidden items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 tag text-mute transition-colors duration-300 hover:border-white/35 hover:text-chalk md:inline-flex"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden xl:inline">{TALLER.telefono}</span>
                <span className="xl:hidden">Llamar</span>
              </a>

              <ContactButton onClick={() => abrir()} className="hidden px-5 py-3 sm:inline-flex" bare>
                Pedir cita
              </ContactButton>

              <button
                type="button"
                onClick={() => setMenu(true)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-chalk transition-colors duration-300 hover:border-white/40 lg:hidden"
                aria-label="Abrir menú"
                aria-expanded={menu}
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </nav>

          {/* Avance de lectura de la página. */}
          <motion.div
            style={{ scaleX: avance }}
            className={`absolute inset-x-0 bottom-0 h-px origin-left bg-accent transition-opacity duration-500 ${
              posado ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden="true"
          />
        </div>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-ink-900 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
          >
            <div className="shell flex h-[4.5rem] items-center justify-between md:h-20">
              <span className="font-display text-[1.35rem] font-bold tracking-[-0.03em]">{TALLER.marca}</span>
              <button
                type="button"
                onClick={() => setMenu(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-white/40"
                aria-label="Cerrar menú"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav className="shell mt-6" aria-label="Navegación móvil">
              <ul className="border-t border-ink-line">
                {ENLACES.map((e, i) => (
                  <motion.li
                    key={e.href}
                    initial={quieto ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i + 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-ink-line"
                  >
                    <a
                      href={e.href}
                      onClick={() => setMenu(false)}
                      className="flex items-baseline gap-4 py-5 font-display text-[2rem] font-bold tracking-display text-chalk"
                    >
                      <span className="tag num text-accent">{String(i + 1).padStart(2, '0')}</span>
                      {e.texto}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-9 flex flex-col gap-3">
                <ContactButton
                  onClick={() => {
                    setMenu(false)
                    abrir()
                  }}
                  className="w-full"
                >
                  Pedir cita
                </ContactButton>
                <a
                  href={`tel:${TALLER.telefonoTel}`}
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-white/25 px-7 py-3.5 text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-chalk"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {TALLER.telefono}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
