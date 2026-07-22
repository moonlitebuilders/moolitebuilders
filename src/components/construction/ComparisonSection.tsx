import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { comparisonCategories } from '../../data/construction'
import { ComparisonTabs } from './ComparisonTabs'
import { ComparisonTable } from './ComparisonTable'

export const ComparisonSection: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState(() => {
    try {
      return sessionStorage.getItem('activeConstructionTab') || comparisonCategories[0].id
    } catch {
      return comparisonCategories[0].id
    }
  })

  const activeCategory = comparisonCategories.find(c => c.id === activeCategoryId) || comparisonCategories[0]

  const handleSelectCategory = (id: string) => {
    setActiveCategoryId(id)
    try {
      sessionStorage.setItem('activeConstructionTab', id)
    } catch (e) {
      console.warn('Failed to save active tab:', e)
    }
  }

  return (
    <section id="compare" className="w-full bg-white pt-12 lg:pt-16 pb-0 lg:pb-0 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-[700px] mx-auto mb-16"
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-[var(--color-navy-800)] mb-6">
            Compare Package Inclusions
          </h2>
          <p className="text-[var(--color-navy-400)] text-sm md:text-base">
            Compare materials and specifications across all packages.
          </p>
        </motion.div>
 
        {/* Comparison Content */}
        <div className="w-full">
          <ComparisonTabs
            categories={comparisonCategories}
            activeId={activeCategoryId}
            onSelect={handleSelectCategory}
          />
          
          <ComparisonTable activeCategory={activeCategory} />
        </div>

      </div>
    </section>
  )
}
