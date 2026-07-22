import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import type { Package } from '../../data/construction'

interface PackageCardProps {
  pkg: Package
  index: number
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.2, 0.65, 0.3, 0.9] as const,
    },
  }),
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg, index }) => {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white rounded-3xl p-6 md:p-8 flex flex-col h-full border-2 border-[var(--color-gold-400)] shadow-[0_0_15px_rgba(205,163,79,0.3)] hover:shadow-[0_0_25px_rgba(205,163,79,0.6)] hover:-translate-y-2 transition-all duration-300"
    >
      {/* Icon & Title Row */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl bg-[#f4f5f8] flex items-center justify-center p-3">
          <img src={pkg.icon} alt={pkg.name} className="w-full h-full object-contain" loading="lazy" />
        </div>
        <div>
          <h3 className="text-[var(--color-navy-800)] font-heading font-bold text-xl uppercase tracking-wider">
            {pkg.name}
          </h3>
          <p className="text-2xl font-bold text-[var(--color-gold-500)] mt-1">
            {pkg.price}
          </p>
        </div>
      </div>

      {/* Best For section */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-[var(--color-navy-400)] uppercase tracking-wider mb-1">
          Best For
        </p>
        <p className="text-[var(--color-navy-800)] font-medium text-lg">
          {pkg.bestFor}
        </p>
      </div>

      {/* Features List */}
      <ul className="flex flex-col gap-4 mb-10 flex-grow">
        {pkg.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[var(--color-gold-500)] shrink-0 mt-0.5" />
            <span className="text-[var(--color-navy-600)] text-[15px] leading-relaxed">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <a
        href="#compare"
        className="mt-auto w-full flex items-center justify-center gap-2 py-4 rounded-xl border border-[var(--color-navy-200)] text-[var(--color-navy-800)] font-heading font-bold text-sm tracking-widest hover:bg-[var(--color-navy-800)] hover:text-white hover:border-[var(--color-navy-800)] transition-colors duration-300"
      >
        VIEW DETAILS
        <span aria-hidden="true">→</span>
      </a>
    </motion.div>
  )
}
