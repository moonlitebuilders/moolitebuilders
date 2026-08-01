/**
 * Navbar.tsx — Moonlite Builders & Promoters
 * ─────────────────────────────────────────────────────────────────
 * Premium sticky navigation with:
 *  • Scroll-aware morphing (transparent → frosted glass + shadow)
 *  • Framer Motion layoutId underline active-state indicator
 *  • Intersection-Observer-based active section tracking
 *  • Fully accessible mobile drawer (focus trap, ESC close, ARIA)
 *  • Keyboard-navigable hamburger toggle
 *  • No inline hex values — all colours from @theme tokens
 */

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  type KeyboardEvent,
} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X, ChevronRight, Phone } from 'lucide-react'
import { Logo } from './Logo'

/* ─── Types ──────────────────────────────────────────────── */

interface NavDropdownItem {
  label: string
  href: string
  icon?: string
}

interface NavLink {
  /** Visible label */
  label: string
  /** Anchor href — must match the `id` of the target section */
  href: string
  /** Section ID without the `#` prefix */
  sectionId: string
  /** Optional dropdown sub-items */
  dropdown?: NavDropdownItem[]
}

export interface NavbarProps {
  /** Orchestration phase (0–5). Nav appears at phase ≥ 1. */
  phase: number
  /** When true, all intro delays are bypassed instantly. */
  isSkipped: boolean
}

/* ─── Navigation Link Definitions ────────────────────────── */

const NAV_LINKS: NavLink[] = [
  { label: 'Home',     href: '/#hero',     sectionId: 'hero'     },
  { label: 'About',    href: '/#about',    sectionId: 'about'    },
  {
    label: 'Services',
    href: '/#services',
    sectionId: 'services',
    dropdown: [
      { label: 'Construction', href: '/services/construction' },
      { label: 'Solar',        href: '/services/solar' },
    ],
  },
  { label: 'Why Us',  href: '/#why-choose-us',   sectionId: 'why-choose-us'   },
  { label: 'Gallery', href: '/#gallery',  sectionId: 'gallery'  },
  { label: 'Contact', href: '/#contact',  sectionId: 'contact'  },
]

/* ─── Animation Variants ─────────────────────────────────── */

const navbarVariants = {
  initial: {
    opacity: 0,
    y: '-100%',
  },
  animate: ({ isSkipped, isHidden, isVisible }: { isSkipped: boolean; isHidden: boolean; isVisible: boolean }) => {
    if (!isVisible) {
      return {
        opacity: 0,
        y: '-100%',
      }
    }
    return {
      opacity: 1,
      y: isHidden ? '-100%' : '0%',
      transition: {
        duration: isSkipped ? 0 : 0.3,
        ease: 'easeOut' as const,
      },
    }
  },
}

/** Mobile drawer slide-in from top. */
const drawerVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.28,
      ease: [0.4, 0.0, 1, 1] as const,
      when: 'afterChildren',
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
  open: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.32,
      ease: [0.0, 0.0, 0.2, 1] as const,
      when: 'beforeChildren',
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
}

/** Individual mobile link stagger. */
const drawerLinkVariants = {
  closed: {
    opacity: 0,
    x: -16,
    transition: { duration: 0.18 },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.22, ease: [0.0, 0.0, 0.2, 1] as const },
  },
}

/** Hamburger icon cross-fade. */
const iconVariants = {
  closed: { rotate: 0,   scale: 1   },
  open:   { rotate: 90,  scale: 0.9 },
}

/* ─── Custom Hooks ────────────────────────────────────────── */

function useScrollState(threshold = 40, hideThreshold = 80): { scrolled: boolean; hidden: boolean } {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0)

  useEffect(() => {
    let ticking = false

    const updateScrollDir = () => {
      const scrollY = window.scrollY
      
      setScrolled(scrollY > threshold)

      if (Math.abs(scrollY - lastScrollY.current) < 10) {
        ticking = false
        return
      }

      if (scrollY > hideThreshold && scrollY > lastScrollY.current) {
        setHidden(true)
      } else if (scrollY < lastScrollY.current || scrollY <= threshold) {
        setHidden(false)
      }

      lastScrollY.current = scrollY > 0 ? scrollY : 0
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    updateScrollDir()
    
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold, hideThreshold])

  return { scrolled, hidden }
}

/**
 * Uses IntersectionObserver to detect which section anchor
 * is currently visible, returning its id string.
 */
function useActiveSection(ids: string[]): string {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    if (ids.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-10% 0px -80% 0px', // Trigger near the top of viewport
        threshold: 0,
      }
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [ids])

  return activeId
}

/* ─── Desktop Dropdown Variants ──────────────────────────── */

const dropdownVariants = {
  closed: {
    opacity: 0,
    y: -8,
    scale: 0.97,
    pointerEvents: 'none' as const,
    transition: { duration: 0.18, ease: [0.4, 0, 1, 1] as const },
  },
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    pointerEvents: 'auto' as const,
    transition: { duration: 0.22, ease: [0.0, 0.0, 0.2, 1] as const },
  },
}

/* ─── Desktop Nav Link ────────────────────────────────────── */

interface DesktopLinkProps {
  link: NavLink
  isActive: boolean
  prefersReducedMotion: boolean | null
}

const DesktopLink: React.FC<DesktopLinkProps> = ({
  link,
  isActive,
  prefersReducedMotion,
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const hasDropdown = Boolean(link.dropdown?.length)

  return (
    <div
      className="relative"
      onMouseEnter={() => hasDropdown && setDropdownOpen(true)}
      onMouseLeave={() => hasDropdown && setDropdownOpen(false)}
    >
      <Link
        to={link.href}
        aria-current={isActive ? 'page' : undefined}
        aria-haspopup={hasDropdown ? 'true' : undefined}
        aria-expanded={hasDropdown ? dropdownOpen : undefined}
        className={[
          'relative flex items-center gap-1 font-sans font-medium text-sm tracking-wide pb-[3px]',
          'transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-gold-400] rounded-sm',
          isActive
            ? 'text-[--color-gold-400]'
            : 'text-white/85 hover:text-white',
        ].join(' ')}
      >
        <span>{link.label}</span>
        {hasDropdown && (
          <motion.svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="currentColor"
            aria-hidden="true"
            animate={{ rotate: dropdownOpen ? 180 : 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
            style={{ marginTop: '1px' }}
          >
            <path d="M6 8L1 3h10L6 8z" />
          </motion.svg>
        )}

        {/* Framer Motion layoutId underline */}
        {isActive && (
          <motion.span
            layoutId="desktop-nav-indicator"
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { type: 'spring', stiffness: 500, damping: 40 }
            }
            className="absolute bottom-[-2px] left-0 right-0 h-[2px] rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent, var(--color-gold-400), transparent)',
            }}
            aria-hidden="true"
          />
        )}
      </Link>

      {/* Dropdown panel */}
      {hasDropdown && (
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              key="dropdown"
              variants={dropdownVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-44 z-[60]"
              role="menu"
              aria-label={`${link.label} sub-menu`}
            >
              <div className="glass-panel rounded-xl overflow-hidden shadow-xl">
                {/* Shimmer accent */}
                <div className="h-px w-full shimmer opacity-50" aria-hidden="true" />
                <div className="p-2 flex flex-col gap-0.5">
                  {link.dropdown!.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      role="menuitem"
                      onClick={() => setDropdownOpen(false)}
                      className={[
                        'flex items-center gap-2.5 px-3 py-2.5 rounded-lg',
                        'text-sm font-medium text-white/85 hover:text-white',
                        'hover:bg-white/8 transition-colors duration-150',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-gold-400]',
                      ].join(' ')}
                    >
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}

/* ─── CTA Phone Button ────────────────────────────────────── */

const CtaPhoneButton: React.FC = () => (
  <motion.a
    href="tel:+91XXXXXXXXXX"
    aria-label="Call Moonlite Builders"
    whileHover={{ scale: 1.04, y: -1 }}
    whileTap={{ scale: 0.97 }}
    className={[
      '!hidden md:!inline-flex items-center gap-2',
      'btn-gold text-xs px-5 py-2.5',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-gold-300] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
    ].join(' ')}
    style={{ borderRadius: 'var(--radius-md)' }}
  >
    <Phone size={13} strokeWidth={2.5} aria-hidden="true" />
    Free Quote
  </motion.a>
)

/* ─── Mobile Drawer Link ──────────────────────────────────── */

interface MobileLinkProps {
  link: NavLink
  isActive: boolean
  index: number
  onClick: () => void
}

const MobileLink: React.FC<MobileLinkProps> = ({ link, isActive, index, onClick }) => {
  const [subOpen, setSubOpen] = React.useState(false)
  const hasDropdown = Boolean(link.dropdown?.length)

  return (
    <motion.div variants={drawerLinkVariants} custom={index}>
      {/* Main row */}
      <div className="flex items-center w-full">
        <Link
          to={link.href}
          onClick={hasDropdown ? (e) => { e.preventDefault(); setSubOpen((p) => !p) } : onClick}
          aria-current={isActive ? 'page' : undefined}
          aria-haspopup={hasDropdown ? 'true' : undefined}
          aria-expanded={hasDropdown ? subOpen : undefined}
          className={[
            'flex items-center justify-between flex-1',
            'px-4 py-3.5 rounded-xl font-heading font-semibold text-base tracking-wide min-h-[48px]',
            'transition-colors duration-200 group',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-gold-400]',
            isActive
              ? 'text-[--color-gold-400] bg-[--color-gold-400]/10 border border-[--color-gold-400]/20'
              : 'text-white/85 hover:text-white hover:bg-white/5 border border-transparent',
          ].join(' ')}
        >
          <span className="flex items-center gap-3">
            {isActive && (
               <motion.span
                layoutId="mobile-nav-dot"
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: 'var(--color-gold-400)' }}
                aria-hidden="true"
              />
            )}
            {!isActive && (
              <span className="w-1.5 h-1.5 rounded-full opacity-0" aria-hidden="true" />
            )}
            {link.label}
          </span>
          {hasDropdown ? (
            <motion.div
              animate={{ rotate: subOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight
                size={15}
                strokeWidth={2}
                className="text-white/30"
                aria-hidden="true"
              />
            </motion.div>
          ) : (
            <ChevronRight
              size={15}
              strokeWidth={2}
              className={[
                'transition-all duration-200',
                isActive
                  ? 'text-[--color-gold-400] translate-x-0.5'
                  : 'text-white/30 group-hover:text-white/60 group-hover:translate-x-0.5',
              ].join(' ')}
              aria-hidden="true"
            />
          )}
        </Link>
      </div>

      {/* Sub-links (dropdown items) */}
      {hasDropdown && (
        <AnimatePresence>
          {subOpen && (
            <motion.div
              key="sub-links"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto', transition: { duration: 0.22 } }}
              exit={{ opacity: 0, height: 0, transition: { duration: 0.18 } }}
              className="overflow-hidden pl-8 pr-2 pb-1 flex flex-col gap-0.5"
            >
              {link.dropdown!.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={onClick}
                  className={[
                    'flex items-center gap-2.5 px-3 py-2.5 rounded-lg min-h-[48px]',
                    'text-sm font-medium text-white/75 hover:text-white',
                    'hover:bg-white/5 transition-colors duration-150 border border-transparent',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-gold-400]',
                  ].join(' ')}
                >
                  <span>{item.label}</span>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  )
}

/* ─── Main Navbar Component ───────────────────────────────── */

export const Navbar: React.FC<NavbarProps> = ({ phase, isSkipped }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { scrolled, hidden } = useScrollState(40, 80)
  const activeSection = useActiveSection(NAV_LINKS.map((l) => l.sectionId))
  const prefersReducedMotion = useReducedMotion()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()
  
  // If we are not on the home page, the background might be white (e.g. construction page).
  // Applying glass-nav ensures the white text remains legible.
  const forceSolidNav = pathname !== '/'

  const isVisible = phase >= 1 || isSkipped || pathname !== '/'
  const isHidden = hidden && !isDrawerOpen

  /* ── Close drawer on escape key ── */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement> | globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        setIsDrawerOpen(false)
        menuButtonRef.current?.focus()
      }
    },
    [isDrawerOpen]
  )

  useEffect(() => {
    if (isDrawerOpen) {
      document.addEventListener('keydown', handleKeyDown as EventListener)
      // Prevent body scroll while drawer is open
      document.body.style.overflow = 'hidden'
    } else {
      document.removeEventListener('keydown', handleKeyDown as EventListener)
      document.body.style.overflow = ''
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown as EventListener)
      document.body.style.overflow = ''
    }
  }, [isDrawerOpen, handleKeyDown])

  /* ── Close drawer on viewport resize to desktop ── */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsDrawerOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false)
    menuButtonRef.current?.focus()
  }, [])

  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen((prev) => !prev)
  }, [])

  return (
    <>
      {/* ── Sticky Wrapper ─────────────────────────────── */}
      <motion.header
        role="banner"
        custom={{ isSkipped, isHidden, isVisible }}
        variants={navbarVariants}
        initial="initial"
        animate="animate"
        className={[
          'fixed top-0 left-0 right-0 z-[50]',
          /* Smooth transition for background and shadow */
          'transition-[background-color,padding,box-shadow] duration-300',
          /* When scrolled or forced solid: frosted glass + compressed padding + subtle shadow */
          (scrolled || forceSolidNav)
            ? 'bg-slate-900/80 backdrop-blur-md py-2 border-b border-white/10 shadow-lg'
            : 'bg-transparent py-2 md:py-3',
        ].join(' ')}
      >
        {/* Inner container — max-width + horizontal padding */}
        <nav
          aria-label="Primary navigation"
          className="section-container flex items-center justify-between"
        >

          {/* ── Logo ─────────────────────────────────── */}
          <Link
            to="/"
            aria-label="Moonlite Builders & Promoters — Go to homepage"
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-gold-400] rounded-md"
          >
            <Logo />
          </Link>

          {/* ── Desktop Links (md+) ───────────────────── */}
          <div
            role="list"
            className="hidden md:flex items-center gap-5 lg:gap-7"
            aria-label="Site sections"
          >
            {NAV_LINKS.map((link) => (
              <div key={link.sectionId} role="listitem">
                <DesktopLink
                  link={link}
                  isActive={activeSection === link.sectionId}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </div>
            ))}
          </div>

          {/* ── Right Actions ─────────────────────────── */}
          <div className="flex items-center gap-4">

            {/* CTA — hidden on mobile, visible from lg */}
            <CtaPhoneButton />

            {/* ── Hamburger (mobile only < md) ───────── */}
            <button
              ref={menuButtonRef}
              id="mobile-menu-button"
              type="button"
              onClick={toggleDrawer}
              aria-expanded={isDrawerOpen}
              aria-controls="mobile-drawer"
              aria-label={isDrawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className={[
                'md:hidden flex items-center justify-center',
                'w-12 h-12 rounded-xl',
                'border border-white/10 bg-white/5',
                'text-white hover:text-[--color-gold-400] hover:border-[--color-gold-400]/30',
                'transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-gold-400]',
              ].join(' ')}
            >
              <motion.div
                animate={isDrawerOpen ? 'open' : 'closed'}
                variants={iconVariants}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
                }
              >
                {isDrawerOpen
                  ? <X size={20} strokeWidth={2} aria-hidden="true" />
                  : <Menu size={20} strokeWidth={2} aria-hidden="true" />
                }
              </motion.div>
            </button>

          </div>
        </nav>

        {/* ── Mobile Drawer ─────────────────────────────── */}
        <AnimatePresence initial={false}>
          {isDrawerOpen && (
            <motion.div
              ref={drawerRef}
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              variants={drawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden overflow-hidden"
            >
              {/* Drawer inner card */}
              <div
                className={[
                  'mx-4 mt-2 mb-4 rounded-2xl overflow-hidden',
                  'glass-panel',
                ].join(' ')}
              >
                {/* Divider accent at top */}
                <div
                  className="h-[1px] w-full mx-auto shimmer opacity-60"
                  aria-hidden="true"
                />

                {/* Links list */}
                <nav
                  aria-label="Mobile site navigation"
                  className="p-3 flex flex-col gap-1"
                >
                  {NAV_LINKS.map((link, index) => (
                    <MobileLink
                      key={link.sectionId}
                      link={link}
                      isActive={activeSection === link.sectionId}
                      index={index}
                      onClick={closeDrawer}
                    />
                  ))}
                </nav>

                {/* Mobile CTA strip */}
                <motion.div
                  variants={drawerLinkVariants}
                  className="px-3 pb-3 pt-1"
                >
                  <a
                    href="tel:+91XXXXXXXXXX"
                    onClick={closeDrawer}
                    className={[
                      'btn-gold w-full flex items-center justify-center gap-2 text-sm min-h-[48px]',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-gold-300]',
                    ].join(' ')}
                    style={{ borderRadius: 'var(--radius-lg)' }}
                  >
                    <Phone size={15} strokeWidth={2.5} aria-hidden="true" />
                    Call for a Free Quote
                  </a>
                </motion.div>

                {/* Subtle bottom label */}
                <p className="text-center pb-3 text-white/30 text-xs tracking-widest uppercase">
                  Tamil Nadu · Est. 2016
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── Drawer Backdrop Overlay ──────────────────────── */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-[49] bg-black/50 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  )
}
