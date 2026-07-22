import React from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Link } from 'react-router-dom'

/* ─── Animation Variants ────────────────────────────────── */
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] },
  },
}

export const ConstructionHero: React.FC = () => {
  return (
    <section id="construction-hero" className="w-full bg-white px-5 md:px-6 lg:px-8 mt-[72px] py-4 md:py-10">
      <div className="relative w-full flex flex-col md:justify-end rounded-[24px] md:rounded-2xl overflow-hidden shadow-2xl mx-auto max-w-7xl bg-gradient-to-b from-slate-900 to-slate-950 md:from-transparent md:to-transparent md:bg-none p-0 md:p-16 min-h-0 md:min-h-[600px] lg:min-h-[650px]">
        
        {/* Background Image Wrapper */}
        <div className="relative md:absolute md:inset-0 z-0 w-full h-[240px] md:h-full rounded-t-[24px] md:rounded-none overflow-hidden">
          <img 
            src="/assets/service/construction-service.jpg" 
            alt="Premium Construction Project" 
            className="w-full h-full object-cover object-center"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          {/* Dark Gradient Overlay for Left-Aligned Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/90 via-black/60 to-transparent sm:to-black/10" />
        </div>

        {/* Hero Text Content & Buttons Layered Inside Image */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 w-full md:w-1/2 lg:w-5/12 flex flex-col justify-center text-left space-y-4 md:space-y-6 px-5 pb-6 md:px-0 md:pb-0 mt-[-100px] md:mt-0"
        >
          {/* Label with Line */}
          <motion.div variants={fadeUpVariant} className="flex items-center gap-4 w-full">
            <span className="text-[var(--color-gold-500)] font-bold text-xs sm:text-sm md:text-base uppercase tracking-widest shrink-0">
              CONSTRUCTION SERVICES
            </span>
            <div className="h-[2px] w-12 sm:w-20 bg-[var(--color-gold-500)]"></div>
          </motion.div>
          
          {/* Heading */}
          <motion.h1 variants={fadeUpVariant} className="text-[40px] md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] md:leading-tight drop-shadow-md">
            Building Spaces <br />
            That <span className="text-[var(--color-gold-500)]">Last.</span>
          </motion.h1>
          
          {/* Paragraph */}
          <motion.p variants={fadeUpVariant} className="w-full max-w-[90%] md:max-w-none text-base md:text-base lg:text-lg text-slate-200 leading-[1.7] md:leading-relaxed font-normal drop-shadow-md">
            From Residential Homes To Commercial And Industrial Developments, We Deliver Expertly Planned Construction Solutions Built With Premium Materials And Lasting Craftsmanship.
          </motion.p>
          
          {/* Buttons */}
          <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full pt-2">
            <Link 
              to="/#contact"
              className="w-full sm:w-auto h-[52px] sm:h-auto sm:px-8 sm:py-3.5 flex items-center justify-center bg-[var(--color-gold-500)] hover:bg-[var(--color-gold-400)] text-[var(--color-navy-950)] font-bold rounded-md text-sm md:text-base tracking-wide shadow-lg transition-transform hover:-translate-y-1 text-center touch-manipulation"
            >
              GET A FREE QUOTE
            </Link>
            <a 
              href="#services"
              className="w-full sm:w-auto h-[52px] sm:h-auto sm:px-8 sm:py-3.5 flex items-center justify-center bg-transparent hover:bg-white/10 text-white font-bold rounded-md text-sm md:text-base tracking-wide border-2 border-[var(--color-gold-500)] shadow-lg transition-transform hover:-translate-y-1 text-center touch-manipulation"
            >
              EXPLORE SERVICES
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
