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
  const skyY = useTransform(scrollY, [0, 600], [0, prefersReduced ? 0 : -40])
  const contentY = useTransform(scrollY, [0, 600], [0, prefersReduced ? 0 : 40])

  /* Phase activation gates */
  const contentActive = phase >= 3 || isSkipped

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-label="Moonlite Builders — Construction and Solar Services Hero"
      className="relative w-full bg-cover bg-center bg-no-repeat overflow-hidden min-h-screen min-h-[100dvh] flex flex-col justify-between py-12 md:py-20 lg:py-24"
    >
      {/* ── LAYER 0 — Sky Background (absolute, full-coverage) ── */}
      <motion.div
        style={{ y: skyY }}
        className="absolute -top-24 -bottom-24 -left-4 -right-4 z-0 will-change-transform bg-[url('/assets/hero/background-sky.webp')] bg-cover bg-center bg-no-repeat"
        aria-hidden="true"
      >
        <img
          src="/assets/hero/background-sky.webp"
          alt=""
          className="w-full h-full object-cover object-center pointer-events-none select-none"
        />
        {/* Subtle backdrop tint overlay for typography legibility */}
        <div
          className="absolute inset-0 bg-black/20 pointer-events-none"
          aria-hidden="true"
        />
      </motion.div>

      {/* ── LAYER 30 — All foreground content ── */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-[30] flex-1 flex flex-col items-center justify-center
                   w-full min-w-0 px-5 md:px-10 py-6 md:py-10 will-change-transform"
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

        {/* Primary headline */}
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

        {/* Supporting description */}
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

      {/* ── Feature Cards — aligned using standard mt-8 md:mt-12 ── */}
      <div
        className="relative z-[30] w-full max-w-6xl mx-auto px-5 md:px-8 mt-8 md:mt-12"
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
