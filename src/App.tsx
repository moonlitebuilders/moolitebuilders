/**
 * App.tsx — Moonlite Builders & Promoters
 * ─────────────────────────────────────────────────────────────────
 * Root layout wrapper.
 *
 * Responsibilities:
 *  • Orchestrates the timed intro reveal sequence (phases 0–5)
 *  • Provides the scroll-skip escape hatch (any scroll > 4px = instant reveal)
 *  • Wraps <Navbar /> and <Hero /> in a semantically correct document landmark
 *  • References only design-system CSS variables for background / text colours
 */

import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { WhatsAppFAB } from './components/WhatsAppFAB'
import { Home } from './pages/Home'
import { Construction } from './pages/Construction'
import { Solar } from './pages/Solar'

/* ─── Intro Phase Constants ───────────────────────────────── */
const PHASE_TIMINGS = [
  { phase: 1, delay: 0 },   // Navigation
  { phase: 2, delay: 50 },  // Headline & Assets
  { phase: 3, delay: 100 }, // Description
  { phase: 4, delay: 150 }, // CTAs
  { phase: 5, delay: 200 }, // Trust cards
] as const

/* ─── Scroll To Hash Utility ────────────────────────────── */
const ScrollToHash = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // If not a hash, scroll to top on route change
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }

    // Scroll to hash element if it exists
    setTimeout(() => {
      const id = hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 0)
  }, [pathname, hash])

  return null
}

function App() {
  const [isSkipped, setIsSkipped] = useState(false)
  const [phase, setPhase]         = useState(5)
  const timersRef                 = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    timersRef.current = PHASE_TIMINGS.map(({ phase: p, delay }) =>
      setTimeout(() => setPhase(p), delay)
    )

    const handleScroll = () => {
      if (window.scrollY > 4) {
        setIsSkipped(true)
        timersRef.current.forEach(clearTimeout)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      timersRef.current.forEach(clearTimeout)
    }
  }, [])

  return (
    <Router>
      <ScrollToHash />
      <div
        className="min-h-screen flex flex-col text-white relative w-full overflow-x-hidden"
        style={{
          backgroundColor: 'var(--color-navy-900)',
        }}
      >
        {/* Global Nav */}
        <Navbar phase={phase} isSkipped={isSkipped} />

        <main
          id="main-content"
          role="main"
          aria-label="Main site content"
          className="flex-grow flex flex-col"
          tabIndex={-1}
        >
          <Routes>
            <Route path="/" element={<Home phase={phase} isSkipped={isSkipped} />} />
            <Route path="/services/construction" element={<Construction />} />
            <Route path="/services/solar" element={<Solar />} />
          </Routes>
        </main>

        <Footer />
        <WhatsAppFAB />
      </div>
    </Router>
  )
}

export default App
