import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { constructionPackages } from '../../data/construction'
import { PackageCard } from './PackageCard'

export const PackageCards: React.FC = () => {
  return (
    <section id="packages" className="w-full bg-[#fcfcfc] py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-[700px] mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-8 bg-[var(--color-gold-500)]/50" />
            <span className="text-[var(--color-gold-500)] text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
              CONSTRUCTION PACKAGES
            </span>
            <div className="h-px w-8 bg-[var(--color-gold-500)]/50" />
          </div>
          
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-[2.75rem] text-[var(--color-navy-800)] leading-tight mb-6">
            Choose The Package That Fits Your Vision.
          </h2>
          
          <p className="text-[var(--color-navy-400)] text-base md:text-lg">
            Transparent Pricing. Premium Materials. Quality Construction.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 mb-16">
          {constructionPackages.map((pkg, index) => (
            <PackageCard key={pkg.id} pkg={pkg} index={index} />
          ))}
        </div>

        {/* Assured Quality Banner */}
        <div className="w-full flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-[#e2e5e9] rounded-full py-4 px-6 md:px-10 inline-flex flex-row items-center justify-center gap-4 w-[90%] md:w-[75%] max-w-[900px] border border-gray-200/50 shadow-sm"
          >
            <ShieldCheck className="w-6 h-6 text-[var(--color-navy-800)] shrink-0" />
            <p className="text-[var(--color-navy-800)] text-sm md:text-base leading-tight font-medium">
              <strong className="font-bold mr-2">Assured Quality.</strong>
              All Packages Include Structural Safety, Expert Supervision And On-Time Delivery.
            </p>
          </motion.div>
        </div>
        
      </div>
    </section>
  )
}
