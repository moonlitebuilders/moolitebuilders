import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { constructionFAQs } from '../../data/construction'
import { Accordion } from './Accordion'

export const ConstructionFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const handleToggle = (index: number) => {
    setOpenIndex(prev => prev === index ? null : index)
  }

  return (
    <section className="w-full bg-white py-12 lg:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-[700px] mx-auto mb-16"
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-[2.75rem] text-[var(--color-navy-800)]">
            Frequently Asked Questions
          </h2>
        </motion.div>

        {/* 2-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between">
          
          {/* Left: Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full lg:w-5/12 shrink-0"
          >
            <div className="w-full aspect-square md:aspect-auto md:h-[500px] bg-[#fafafa] rounded-3xl overflow-hidden flex items-center justify-center p-6">
              <img
                src="/assets/Faq/construction/faq-construction-service.jpg"
                alt="Construction FAQ Illustration"
                className="w-full h-full object-contain mix-blend-multiply"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Right: Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="w-full lg:w-7/12"
          >
            <div className="flex flex-col gap-4">
              {constructionFAQs.map((faq, index) => (
                <Accordion
                  key={index}
                  faq={faq}
                  isOpen={openIndex === index}
                  onClick={() => handleToggle(index)}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
