import React, { useRef } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'

/* ─── Types ─────────────────────────────────────────────────── */
interface HeroProps {
  /** Orchestration phase (0–5). Assets activate at phase ≥ 2. */
  phase: number
  /** When true all intro delays collapse to 0 ms instantly. */
  isSkipped: boolean
}

interface MetricCard {
  id: string
  stat: string
  label: string
  /** Public-folder path served by Vite as a static asset */
  iconSrc: string
  /** Full accessible description for screen readers */
  iconAlt: string
  iconWidth: number
  iconHeight: number
}

interface MetricCardProps {
  card: MetricCard
  isActive: boolean
  isSkipped: boolean
  index: number
}

/* ─── Metric Card Data ───────────────────────────────────────── */
const METRIC_CARDS: MetricCard[] = [
  {
    id: 'years',
    stat: '10+',
    label: 'Years Of Experience',
    iconSrc: '/assets/hero/10-years-badge-icon.svg',
    iconAlt: '',
    iconWidth: 69,
    iconHeight: 94,
  },
  {
    id: 'projects',
    stat: '30+',
    label: 'Projects Completed',
    iconSrc: '/assets/hero/projects-icon.svg',
    iconAlt: '',
    iconWidth: 100,
    iconHeight: 91,
  },
  {
    id: 'solar',
    stat: '1kW – 10kW',
    label: 'For All Purpose',
    iconSrc: '/assets/hero/solar-badge-icon.svg',
    iconAlt: '',
    iconWidth: 89,
    iconHeight: 80,
  },
  {
    id: 'amc',
    stat: '1 Year',
    label: 'Free AMC',
    iconSrc: '/assets/hero/amc-badge-icon.svg',
    iconAlt: '',
    iconWidth: 78,
    iconHeight: 80,
  },
]

/* ─── Phase 2 — Asset Convergence Variants ───────────────────── */
function makeAssetVariant(fromX: string) {
  return {
    hidden: { opacity: 0, x: fromX, scale: 1.02 },
    visible: (isSkipped: boolean) => ({
      opacity: 1,
      x: '0%',
      scale: 1,
      transition: isSkipped
        ? { duration: 0 }
        : {
          type: 'spring' as const,
          stiffness: 75,
          damping: 16,
          mass: 1.0,
          opacity: { duration: 0.5, ease: 'easeOut' },
        },
    }),
  }
}

const constructionVariants = makeAssetVariant('-120%')
const solarVariants = makeAssetVariant('120%')

const cloudLeftVariants = {
  hidden: { opacity: 0, x: '-60%', y: -10 },
  visible: (isSkipped: boolean) => ({
    opacity: 0.60,
    x: '0%',
    y: 0,
    transition: isSkipped
      ? { duration: 0 }
      : {
        type: 'spring' as const,
        stiffness: 90,
        damping: 18,
        delay: 0.1,
      },
  }),
}

const cloudRightVariants = {
  hidden: { opacity: 0, x: '60%', y: -10 },
  visible: (isSkipped: boolean) => ({
    opacity: 0.55,
    x: '0%',
    y: 0,
    transition: isSkipped
      ? { duration: 0 }
      : {
        type: 'spring' as const,
        stiffness: 90,
        damping: 18,
        delay: 0.15,
      },
  }),
}


/* ─── Phase 3 — Content Stagger Variants ────────────────────── */
function makeContentVariant(delay: number) {
  return {
    hidden: { opacity: 0, y: 22 },
    visible: (isSkipped: boolean) => ({
      opacity: 1,
      y: 0,
      transition: isSkipped
        ? { duration: 0 }
        : {
          type: 'spring' as const,
          stiffness: 130,
          damping: 20,
          delay,
        },
    }),
  }
}

const subheadVariants = makeContentVariant(0)
const headlineVariants = makeContentVariant(0.06)
const descriptionVariants = makeContentVariant(0.12)
const primaryBtnVariants = makeContentVariant(0.18)
const secondaryBtnVariants = makeContentVariant(0.24)

/* ─── Metric Card Stagger ────────────────────────────────────── */
function makeCardVariant(index: number) {
  return {
    hidden: { opacity: 0, y: 18, scale: 0.97 },
    visible: (isSkipped: boolean) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: isSkipped
        ? { duration: 0 }
        : {
          type: 'spring' as const,
          stiffness: 140,
          damping: 20,
          delay: 0.08 + index * 0.05,
        },
    }),
  }
}

/* ─── HeroMetricCard ─────────────────────────────────────────── */
const HeroMetricCard: React.FC<MetricCardProps> = ({
  card,
  isActive,
  isSkipped,
  index,
}) => {
  const variants = makeCardVariant(index)
  return (
    <motion.article
      custom={isSkipped}
      variants={variants}
      initial="hidden"
      animate={isActive ? 'visible' : 'hidden'}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="rounded-xl p-3 md:p-4 flex flex-col items-center text-center group cursor-default
                 relative overflow-hidden"
      style={{
        background: 'rgba(15, 34, 71, 0.92)',
        border: '1px solid rgba(255, 255, 255, 0.14)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.12)',
      }}
      aria-label={`${card.stat} — ${card.label}`}
    >
      {/* Subtle gold shimmer line at top */}
      <div
        className="absolute top-0 left-[15%] right-[15%] h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(232,190,91,0.55), transparent)' }}
        aria-hidden="true"
      />
      <div
        className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300 overflow-hidden shrink-0"
        aria-hidden="true"
      >
        <img
          src={card.iconSrc}
          alt=""
          width={card.iconWidth}
          height={card.iconHeight}
          loading="eager"
          decoding="async"
          className="w-full h-full object-contain pointer-events-none select-none"
        />
      </div>
      <p
        className="font-heading font-black text-sm sm:text-base md:text-xl leading-snug tracking-tight whitespace-normal sm:whitespace-nowrap"
        style={{ color: 'var(--color-gold-400)' }}
        aria-hidden="true"
      >
        {card.stat}
      </p>
      <p className="mt-1 text-slate-300 text-[11px] sm:text-xs leading-tight font-medium">
        {card.label}
      </p>
    </motion.article>
  )
}

/* ─── Hero (main export) ─────────────────────────────────────── */
export const Hero: React.FC<HeroProps> = ({ phase, isSkipped }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  /* Parallax scroll transforms */
  const { scrollY } = useScroll()
  const skyY = useTransform(scrollY, [0, 600], [0, prefersReduced ? 0 : 80])
  const assetsY = useTransform(scrollY, [0, 600], [0, prefersReduced ? 0 : 60])
  const contentY = useTransform(scrollY, [0, 600], [0, prefersReduced ? 0 : 40])

  /* Phase activation gates */
  const assetsActive = phase >= 2 || isSkipped
  const contentActive = phase >= 3 || isSkipped

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-label="Moonlite Builders — Construction and Solar Services Hero"
      className="relative min-h-[95vh] lg:min-h-screen w-full overflow-hidden flex flex-col"
      style={{ backgroundColor: 'var(--color-navy-900)' }}
    >
      {/* ── LAYER 0 — Sky Background (absolute, no layout impact) ── */}
      <motion.div
        style={{ y: skyY }}
        className="absolute inset-0 z-0 will-change-transform bg-[url('/assets/hero/background-sky.svg')] bg-cover bg-center"
        aria-hidden="true"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-75"
          style={{ objectPosition: 'center bottom' }}
        >
          <source src="/assets/hero/sky-video.mp4" type="video/mp4" />
          <source src="/assets/hero/sky-video.webm" type="video/webm" />
          {/* Fallback image if video completely fails inside tag */}
          <img
            src="/assets/hero/background-sky.svg"
            alt=""
            className="w-full h-full object-cover opacity-75"
            style={{ objectPosition: 'center bottom' }}
          />
        </video>
        {/* Readability veil — darkens edges, keeps centre bright */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(12,21,36,0.20) 0%, rgba(15,34,71,0.10) 45%, rgba(12,21,36,0.82) 100%)',
          }}
        />
      </motion.div>

      {/* ── LAYER 5 — Centre radial overlay (absolute) ── */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse at 50% 55%, rgba(15,34,71,0.12) 0%, transparent 68%)',
        }}
      />

      {/* ── LAYER 10 — Construction SVG left (absolute, no layout impact) ── */}
      <motion.div
        style={{ y: assetsY }}
        className="absolute bottom-[10%] left-0 z-[10] will-change-transform pointer-events-none select-none
                   w-[75%] sm:w-[60%] md:w-[55%] lg:w-[48%] xl:w-[45%]"
        aria-hidden="true"
      >
        <AnimatePresence>
          {assetsActive && (
            <motion.div
              key="construction"
              custom={isSkipped}
              variants={constructionVariants}
              initial="hidden"
              animate="visible"
            >
              <img
                src="/assets/hero/construction-building-left.svg"
                alt="Construction building structure — Moonlite Builders"
                width={820}
                height={680}
                fetchPriority="high"
                decoding="auto"
                className="w-full h-auto object-contain object-bottom"
                style={{ filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.40))' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── LAYER 10 — Solar SVG right (absolute, no layout impact) ── */}
      <motion.div
        style={{ y: assetsY }}
        className="absolute bottom-[10%] right-0 z-[10] will-change-transform pointer-events-none select-none
                   w-[70%] sm:w-[55%] md:w-[50%] lg:w-[45%] xl:w-[42%]"
        aria-hidden="true"
      >
        <AnimatePresence>
          {assetsActive && (
            <motion.div
              key="solar"
              custom={isSkipped}
              variants={solarVariants}
              initial="hidden"
              animate="visible"
            >
              <img
                src="/assets/hero/solar-right.svg"
                alt="Rooftop solar panel array — Moonlite Builders Solar Solutions"
                width={760}
                height={620}
                fetchPriority="high"
                decoding="auto"
                className="w-full h-auto object-contain object-bottom"
                style={{ filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.35))' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── LAYER 15 — Cloud overlays (absolute) ── */}
      <AnimatePresence>
        {assetsActive && (
          <>
            <motion.div
              key="cloud-left"
              aria-hidden="true"
              custom={isSkipped}
              variants={cloudLeftVariants}
              initial="hidden"
              animate="visible"
              className="absolute top-[6%] left-0 z-[15] w-[45%] md:w-[36%] pointer-events-none select-none"
            >
              <motion.img
                src="/assets/hero/clouds-left.svg"
                alt=""
                width={640}
                height={320}
                loading="lazy"
                decoding="async"
                className="w-full h-auto opacity-60 mix-blend-screen"
                animate={prefersReduced ? {} : { x: [0, 12, 0], y: [0, -5, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>

            <motion.div
              key="cloud-right"
              aria-hidden="true"
              custom={isSkipped}
              variants={cloudRightVariants}
              initial="hidden"
              animate="visible"
              className="absolute top-[4%] right-0 z-[15] w-[42%] md:w-[34%] pointer-events-none select-none"
            >
              <motion.img
                src="/assets/hero/clouds-right.svg"
                alt=""
                width={640}
                height={320}
                loading="lazy"
                decoding="async"
                className="w-full h-auto opacity-55 mix-blend-screen"
                animate={prefersReduced ? {} : { x: [0, -14, 0], y: [0, -7, 0] }}
                transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── LAYER 20 — Horizon gradient (absolute) ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 z-[20] pointer-events-none h-64 md:h-80"
        style={{
          background:
            'linear-gradient(to top, var(--color-navy-900) 0%, rgba(12,21,36,0.85) 40%, transparent 100%)',
        }}
      />

      {/* ── LAYER 25 — Readability overlay (absolute) — improves typography contrast ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[25] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(15,34,71,0.40) 0%, rgba(12,21,36,0.30) 50%, rgba(12,21,36,0.35) 100%)',
        }}
      />

      {/* ── LAYER 30 — All foreground content (normal flow, full-width) ── */}
      {/* Navbar spacer — keeps text below the fixed nav bar */}
      <div className="h-20 md:h-24 shrink-0" aria-hidden="true" />

      {/* Central text column — full viewport width, completely independent of decorative assets */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-[30] flex-1 flex flex-col items-center justify-center
                   w-full min-w-0 px-5 md:px-10 py-4 md:py-6 will-change-transform"
      >
        {/* Establishment label chip */}
        <motion.div
          custom={isSkipped}
          variants={subheadVariants}
          initial="hidden"
          animate={contentActive ? 'visible' : 'hidden'}
          className="mb-3"
        >
          <span
            className="inline-block px-5 py-1.5 rounded-full border
                       text-[10px] md:text-[11px] font-heading font-semibold
                       tracking-[0.18em] uppercase"
            style={{
              borderColor: 'rgba(232,190,91,0.30)',
              backgroundColor: 'rgba(232,190,91,0.08)',
              color: 'var(--color-gold-400)',
            }}
          >
            Tamil Nadu's Trusted Builder · Est. 2016
          </span>
        </motion.div>

        {/* Primary headline — solid white, single line on desktop */}
        <motion.h1
          custom={isSkipped}
          variants={headlineVariants}
          initial="hidden"
          animate={contentActive ? 'visible' : 'hidden'}
          className="font-heading font-black text-white text-center leading-[1.08]
                     tracking-tight drop-shadow-lg w-full mx-auto
                     text-[2.5rem] md:text-[3.5rem] lg:text-[clamp(3.2rem,5.5vw,5.2rem)]
                     xl:whitespace-nowrap"
          style={{
            letterSpacing: '-0.02em',
          }}
        >
          We Build It. We Power It.
        </motion.h1>

        {/* Supporting description — wide horizontal paragraph */}
        <motion.p
          custom={isSkipped}
          variants={descriptionVariants}
          initial="hidden"
          animate={contentActive ? 'visible' : 'hidden'}
          className="mt-3 md:mt-4 text-slate-200/90 font-medium text-center leading-relaxed
                     drop-shadow w-full max-w-[48rem] mx-auto whitespace-normal break-words"
          style={{ fontSize: 'clamp(0.95rem, 1.35vw + 0.4rem, 1.2rem)' }}
        >
          From foundation to rooftop solar Moonlite Builders brings certified
          construction expertise and MNRE-approved solar solutions under one roof,
          serving homeowners across Tamil Nadu since 2016.
        </motion.p>

        {/* CTA button row */}
        <div
          className="mt-5 md:mt-6 flex flex-col sm:flex-row items-center
                     justify-center gap-4 sm:gap-5 w-full"
          role="group"
          aria-label="Call to action buttons"
        >
          <motion.a
            href="#contact"
            custom={isSkipped}
            variants={primaryBtnVariants}
            initial="hidden"
            animate={contentActive ? 'visible' : 'hidden'}
            whileHover={prefersReduced ? {} : { scale: 1.04, y: -2, boxShadow: '0 12px 32px -6px rgba(232,190,91,0.50)' }}
            whileTap={{ scale: 0.97 }}
            className="btn-gold w-full sm:w-auto px-9 py-4 text-sm md:text-base
                       font-heading font-bold uppercase tracking-widest
                       shadow-lg transition-all duration-200 text-center"
            style={{ borderRadius: 'var(--radius-md)' }}
            aria-label="Get a free quote from Moonlite Builders"
          >
            Get a Free Quote
          </motion.a>

          <motion.a
            href="#services"
            custom={isSkipped}
            variants={secondaryBtnVariants}
            initial="hidden"
            animate={contentActive ? 'visible' : 'hidden'}
            whileHover={
              prefersReduced
                ? {}
                : {
                  scale: 1.04,
                  y: -2,
                  borderColor: 'rgba(232,190,91,0.75)',
                  backgroundColor: 'rgba(255,255,255,0.04)',
                }
            }
            whileTap={{ scale: 0.97 }}
            className="btn-outline-gold w-full sm:w-auto px-9 py-4 text-sm md:text-base
                       font-heading font-bold uppercase tracking-widest
                       transition-all duration-200 text-center"
            style={{ borderRadius: 'var(--radius-md)' }}
            aria-label="Explore Moonlite Builders services"
          >
            Explore Services
          </motion.a>
        </div>
      </motion.div>

      {/* ── Metric Cards — pinned to bottom inside normal flow ── */}
      <div
        className="relative z-[30] w-full max-w-6xl mx-auto px-5 md:px-8
                   pb-6 md:pb-8 mt-10 md:mt-16 shrink-0"
        role="list"
        aria-label="Key achievements and credentials"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {METRIC_CARDS.map((card, index) => (
            <div key={card.id} role="listitem">
              <HeroMetricCard
                card={card}
                isActive={contentActive}
                isSkipped={isSkipped}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <AnimatePresence>
        {contentActive && (
          <motion.div
            key="scroll-hint"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1.6, duration: 0.5 } }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            aria-hidden="true"
            className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[35]
                       hidden md:flex flex-col items-center gap-1"
          >
            <span
              className="text-[10px] tracking-[0.14em] uppercase"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              Scroll
            </span>
            <motion.div
              animate={prefersReduced ? {} : { y: [0, 5, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              className="w-px h-6 rounded-full"
              style={{ background: 'rgba(232,190,91,0.40)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
