import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ComparisonCategory } from '../../data/construction'

interface ComparisonTableProps {
  activeCategory: ComparisonCategory
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ activeCategory }) => {
  const [hoveredCol, setHoveredCol] = useState<number | null>(null)

  return (
    <>
      {/* Desktop Table (Visible md and above) */}
      <div className="hidden md:block w-full overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
        <div className="min-w-[500px] w-full">
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="col-span-1 flex items-center justify-start pl-4 md:pl-8">
              <span className="text-[var(--color-navy-800)] font-bold text-sm uppercase tracking-wider">
                Material
              </span>
            </div>
            <div 
              onMouseEnter={() => setHoveredCol(1)}
              onMouseLeave={() => setHoveredCol(null)}
              className={`col-span-1 bg-[#1c1a52] text-white py-3 rounded-md text-center font-bold text-sm tracking-wide transition-all duration-300 ${hoveredCol === 1 ? 'shadow-lg -translate-y-1' : ''}`}
            >
              Standard (₹2,400)
            </div>
            <div 
              onMouseEnter={() => setHoveredCol(2)}
              onMouseLeave={() => setHoveredCol(null)}
              className={`col-span-1 bg-[#1b4b2c] text-white py-3 rounded-md text-center font-bold text-sm tracking-wide transition-all duration-300 ${hoveredCol === 2 ? 'shadow-lg -translate-y-1' : ''}`}
            >
              Classic (₹2,900)
            </div>
            <div 
              onMouseEnter={() => setHoveredCol(3)}
              onMouseLeave={() => setHoveredCol(null)}
              className={`col-span-1 bg-[#9e7a3f] text-white py-3 rounded-md text-center font-bold text-sm tracking-wide transition-all duration-300 ${hoveredCol === 3 ? 'shadow-lg -translate-y-1' : ''}`}
            >
              Premium (₹3,600)
            </div>
          </div>

          {/* Table Body */}
          <div className="flex flex-col gap-6 relative min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-4"
              >
                {activeCategory.rows.map((row, idx) => (
                  <div key={idx} className="grid grid-cols-4 gap-4 items-center">
                    
                    {/* Material Column */}
                    <div className="col-span-1 flex items-center gap-4 pl-4 md:pl-8 py-2">
                      <div className="w-12 h-12 shrink-0">
                        <img src={row.icon} alt={row.material} className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[var(--color-navy-800)] font-bold text-[15px]">
                        {row.material}
                      </span>
                    </div>

                    {/* Standard Column */}
                    <div 
                      onMouseEnter={() => setHoveredCol(1)}
                      onMouseLeave={() => setHoveredCol(null)}
                      className={`col-span-1 text-center px-4 py-4 rounded-xl border-2 border-transparent hover:border-[#1c1a52] transition-colors duration-300 ${hoveredCol === 1 ? 'bg-[#1c1a52]/5' : ''}`}
                    >
                      <span className="text-[var(--color-navy-600)] text-sm font-medium">
                        {row.standard}
                      </span>
                    </div>

                    {/* Classic Column */}
                    <div 
                      onMouseEnter={() => setHoveredCol(2)}
                      onMouseLeave={() => setHoveredCol(null)}
                      className={`col-span-1 text-center px-4 py-4 rounded-xl border-2 border-transparent hover:border-[#1b4b2c] transition-colors duration-300 ${hoveredCol === 2 ? 'bg-[#1b4b2c]/5' : ''}`}
                    >
                      <span className="text-[var(--color-navy-600)] text-sm font-medium">
                        {row.classic}
                      </span>
                    </div>

                    {/* Premium Column */}
                    <div 
                      onMouseEnter={() => setHoveredCol(3)}
                      onMouseLeave={() => setHoveredCol(null)}
                      className={`col-span-1 text-center px-4 py-4 rounded-xl border-2 border-transparent hover:border-[#9e7a3f] transition-colors duration-300 ${hoveredCol === 3 ? 'bg-[#9e7a3f]/5' : ''}`}
                    >
                      <span className="text-[var(--color-navy-600)] text-sm font-medium">
                        {row.premium}
                      </span>
                    </div>

                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Card Layout (Visible below 768px / md) */}
      <div className="block md:hidden w-full pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="flex flex-col gap-4"
          >
            {activeCategory.rows.map((row, idx) => (
              <div 
                key={idx} 
                className="w-full bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-5 border border-slate-100/80 flex flex-col gap-4"
              >
                {/* Top Area: Icon + Material Name */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-slate-50 rounded-xl p-2 border border-slate-100">
                    <img src={row.icon} alt={row.material} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[var(--color-navy-800)] font-bold text-base">
                    {row.material}
                  </span>
                </div>
                
                {/* Divider */}
                <div className="h-[1px] w-full bg-slate-100" />
                
                {/* Comparison Rows */}
                <div className="flex flex-col gap-4">
                  {/* Standard Row */}
                  <div className="flex flex-col gap-1.5 items-start">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-white bg-[#1c1a52]">
                      Standard
                    </span>
                    <span className="text-[var(--color-navy-600)] text-sm font-semibold pl-0.5">
                      {row.standard}
                    </span>
                  </div>
                  
                  {/* Classic Row */}
                  <div className="flex flex-col gap-1.5 items-start">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-white bg-[#1b4b2c]">
                      Classic
                    </span>
                    <span className="text-[var(--color-navy-600)] text-sm font-semibold pl-0.5">
                      {row.classic}
                    </span>
                  </div>
                  
                  {/* Premium Row */}
                  <div className="flex flex-col gap-1.5 items-start">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-white bg-[#9e7a3f]">
                      Premium
                    </span>
                    <span className="text-[var(--color-navy-600)] text-sm font-semibold pl-0.5">
                      {row.premium}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
}
