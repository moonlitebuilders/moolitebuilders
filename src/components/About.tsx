import React from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

export const About: React.FC = () => {
  // Animation variants
  const fadeInVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
    },
  }

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: [0.34, 1.56, 0.64, 1] },
    },
  }

  return (
    <section id="about" className="w-full bg-white py-12 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInVariants}
          className="w-full mx-auto max-w-[700px] text-center mb-12 md:mb-20"
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-[2.75rem] text-[var(--color-navy-800)] leading-tight">
            Building with Expertise. Powering with Purpose.
          </h2>
        </motion.div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-center gap-8 lg:gap-0">

          {/* Image Composition (approx 5 columns) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={imageVariants}
            className="relative w-[90%] sm:w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:h-[625px] mx-auto lg:mx-0 max-w-[380px] sm:max-w-[450px] lg:w-[480px] lg:max-w-none lg:flex-shrink-0 z-10"
          >
            {/* Rear Image (Construction) - Left side, shorter and vertically centered */}
            <div className="absolute left-0 top-[8.75%] w-[55%] h-[82.5%] z-0 transition-transform duration-500 hover:-translate-y-2 hover:scale-[1.02]">
              <img
                src="/assets/about/about-construction.png"
                alt="Moonlite Builders Construction Site"
                className="w-full h-full object-cover rounded-[2rem] shadow-lg"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Front Image (Solar) - Overlapping middle, full height */}
            <div className="absolute left-[30%] top-[14%] w-[63%] h-[93%] z-10 transition-transform duration-500 hover:-translate-y-2 hover:scale-[1.02]">
              <img
                src="/assets/about/about-solar.png"
                alt="Moonlite Builders Solar Engineers"
                className="w-full h-full object-cover rounded-3xl shadow-xl border-4 border-white"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>

          {/* Information Card (approx 7 columns) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInVariants}
            className="bg-[#f6f4ec] rounded-[2rem] p-5 md:p-7 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] lg:-ml-24 lg:mt-[120px] relative z-20 w-full lg:w-[580px] lg:flex-shrink-0"
          >
            <div className="flex flex-col gap-5 text-[var(--color-navy-800)] text-sm md:text-[14px] leading-[1.75] font-medium max-w-[500px]">
              <p>
                Moonlite Builders & Promoters was founded by a professionally trained
                husband and wife team who combine expertise in construction, interior
                design, and solar energy.
              </p>
              <p>
                We believe every successful project starts with understanding your
                vision not simply executing a plan. That's why we take time to recommend the right
                construction approach and the right solar solution for your property.
              </p>
              <p>
                From consultation to completion, we work alongside you as trusted
                partners to build spaces that are durable, efficient, and designed for
                the future.
              </p>
            </div>

            {/* Call to Action */}
            <div className="mt-4 md:mt-5 flex justify-start lg:justify-end w-full">
              <a
                href="#contact"
                className="btn-gold w-full sm:w-auto px-9 py-4 text-sm md:text-base font-heading font-bold uppercase tracking-widest shadow-lg hover:shadow-xl transition-all duration-200 text-center text-[var(--color-navy-950)]"
                style={{ borderRadius: 'var(--radius-md)' }}
                aria-label="Get a free quote from Moonlite Builders"
              >
                GET A FREE QUOTE
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
