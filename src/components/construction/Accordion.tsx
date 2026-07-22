import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { FAQ } from '../../data/construction'

interface AccordionProps {
  faq: FAQ
  isOpen: boolean
  onClick: () => void
}

export const Accordion: React.FC<AccordionProps> = ({ faq, isOpen, onClick }) => {
  return (
    <div className="bg-[#faf5ec] rounded-xl overflow-hidden border border-[var(--color-gold-200)]/30 shadow-sm transition-all duration-300">
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        className="w-full px-6 py-5 flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-navy-800)]/40 rounded-xl"
      >
        <span className="font-heading font-bold text-sm md:text-base lg:text-lg text-[var(--color-navy-800)] pr-4">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="shrink-0 w-8 h-8 rounded-full bg-[var(--color-navy-800)] flex items-center justify-center"
        >
          <ChevronDown className="w-5 h-5 text-white" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-6 pr-12 text-[var(--color-navy-600)] text-sm md:text-base leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
