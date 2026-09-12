import FadeIn from './primitives/FadeIn'

type Props = { n: string; titulo: string; desc: string; delay: number; ultimo: boolean }

export default function ProcessStep({ n, titulo, desc, delay, ultimo }: Props) {
  return (
    <li className="relative pl-14 md:pl-24">
      {/* Punto sobre el raíl */}
      <FadeIn delay={delay} y={0} duration={0.5}>
        <span
          className="absolute left-[13px] top-2 z-10 flex h-[17px] w-[17px] items-center justify-center rounded-full border-2 border-accent bg-paper md:left-[21px]"
          aria-hidden="true"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
      </FadeIn>

      <FadeIn delay={delay + 0.06} className={ultimo ? 'pb-0' : 'pb-16 md:pb-24'}>
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-10">
          <span className="num font-display text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[0.8] tracking-tightest text-ink-900/45 md:w-[3.5ch] md:shrink-0">
            {n}
          </span>
          <div className="md:flex-1">
            <h3 className="font-display text-[clamp(1.6rem,4.2vw,2.5rem)] font-bold uppercase leading-[1.02] tracking-display text-ink-900">
              {titulo}
            </h3>
            <p className="mt-3 max-w-[52ch] text-[0.975rem] leading-relaxed text-mute-ink md:mt-4 md:text-lg">{desc}</p>
          </div>
        </div>
      </FadeIn>
    </li>
  )
}
