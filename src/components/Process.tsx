import React from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

const PROCESS_STEPS = [
  {
    id: 1,
    title: 'Consultation',
    desc: 'We understand your goals, site conditions, and budget before making any recommendations.',
    icon: '/assets/our process/consultation.svg',
  },
  {
    id: 2,
    title: 'Planning',
    desc: 'Our team develops practical construction and solar solutions tailored to your project.',
    icon: '/assets/our process/planing.svg',
  },
  {
    id: 3,
    title: 'Construction',
    desc: 'Every stage is executed with quality workmanship, trusted materials, and professional supervision.',
    icon: '/assets/our process/construction.svg',
  },
  {
    id: 4,
    title: 'Solar Installation',
    desc: 'We install efficient solar systems designed to maximize long term savings and performance.',
    icon: '/assets/our process/solar instalation.svg',
  },
  {
    id: 5,
    title: 'Handover & Support',
    desc: 'We remain available with maintenance and continued support long after project completion.',
    icon: '/assets/our process/hardware&support.svg',
  },
]

export const Process: React.FC = () => {
  // Staggered container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // 200ms delay between each step
        delayChildren: 0.1,
      },
    },
  }

  // Individual item animation
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
  }

  // Circle text color animation
  const circleTextVariants: Variants = {
    hidden: { color: 'var(--color-navy-900)' },
    visible: {
      color: 'var(--color-navy-800)',
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  // SVG Circle draw animation
  const drawVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1, ease: 'easeInOut' }
    }
  }

  return (
    <section className="w-full bg-[#f4f5f8] py-12 md:py-20 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-[var(--color-navy-900)] tracking-wide uppercase">
            Every great project starts with the right plan.
          </h2>
        </motion.div>

        {/* Timeline Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative"
        >
          {/* Desktop Connecting Line (Base Grey) */}
          <div className="hidden lg:block absolute left-[10%] right-[10%] h-1 bg-[#dcdde1] top-[278px] z-0 transform -translate-y-1/2"></div>
          
          {/* Desktop Connecting Line (Animated Brand Blue) */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
            className="hidden lg:block absolute left-[10%] right-[10%] h-1 bg-[var(--color-navy-800)] top-[278px] z-0 transform -translate-y-1/2 origin-left"
          ></motion.div>
          
          {/* Mobile Connecting Line (Base Grey) */}
          <div className="hidden md:block lg:hidden absolute left-1/2 top-[180px] bottom-[180px] w-0.5 bg-slate-300 z-0 transform -translate-x-1/2"></div>
          
          {/* Mobile Connecting Line (Animated Brand Blue) */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
            className="hidden md:block lg:hidden absolute left-1/2 top-[180px] bottom-[180px] w-0.5 bg-[var(--color-navy-800)] z-0 transform -translate-x-1/2 origin-top"
          ></motion.div>

          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-stretch gap-12 lg:gap-4 relative z-10">
            {PROCESS_STEPS.map((step) => (
              <motion.div
                key={step.id}
                variants={itemVariants}
                className="flex flex-col lg:flex-col items-center w-full lg:w-[18%] gap-4 lg:gap-0"
              >
                {/* Illustration Box */}
                <div className="w-[100px] md:w-[120px] lg:w-full h-[100px] lg:h-[180px] shrink-0 flex items-end justify-center lg:mb-12 relative z-10 bg-[#f4f5f8]">
                  <img
                    src={step.icon}
                    alt={`${step.title} Illustration`}
                    className="max-h-full max-w-full object-contain relative z-10"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Bottom side for both mobile and desktop */}
                <div className="flex flex-col items-center w-full">
                  {/* Numbered Circle Container */}
                  <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full bg-[#f4f5f8] flex items-center justify-center text-3xl md:text-4xl font-heading font-medium mb-4 lg:mb-8 shrink-0 relative z-10 shadow-[0_0_0_8px_#f4f5f8]">
                    
                    {/* Base Grey SVG Circle */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90 overflow-visible" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="46" fill="none" stroke="#dcdde1" strokeWidth="8" />
                    </svg>
                    
                    {/* Animated Brand Blue SVG Circle */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90 overflow-visible" viewBox="0 0 100 100">
                      <motion.circle 
                        cx="50" cy="50" r="46" fill="none" 
                        stroke="var(--color-navy-800)" strokeWidth="8"
                        strokeLinecap="round"
                        variants={drawVariants}
                      />
                    </svg>

                    <motion.span variants={circleTextVariants} className="relative z-10">
                      {step.id}
                    </motion.span>
                  </div>

                  {/* Text Details */}
                  <div className="text-center mt-2 lg:mt-0 px-4">
                    <h3 className="font-heading font-bold text-lg md:text-xl text-[var(--color-navy-900)] mb-3 md:mb-4">
                      {step.title}
                    </h3>
                    <p className="text-[#5a657e] text-sm md:text-[14px] leading-relaxed font-medium max-w-[280px] mx-auto lg:max-w-full">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
