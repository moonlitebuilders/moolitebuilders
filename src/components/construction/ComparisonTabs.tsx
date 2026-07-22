import React from 'react'
import type { ComparisonCategory } from '../../data/construction'

interface ComparisonTabsProps {
  categories: ComparisonCategory[]
  activeId: string
  onSelect: (id: string) => void
}

export const ComparisonTabs: React.FC<ComparisonTabsProps> = ({ categories, activeId, onSelect }) => {
  return (
    <div className="w-full overflow-x-auto pb-2 md:pb-4 mb-5 md:mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
      <div className="flex overflow-x-auto scrollbar-hide gap-2 w-full pb-2 items-center justify-start md:justify-center">
        {categories.map((category) => {
          const isActive = activeId === category.id
          
          return (
            <button
              key={category.id}
              onClick={() => onSelect(category.id)}
              className={[
                'transition-all duration-200 whitespace-nowrap shrink-0 font-bold tracking-wide',
                'px-4 py-1.5 rounded-full text-xs border md:px-6 md:py-3 md:rounded-md md:text-sm md:border-2',
                isActive
                  ? 'bg-[var(--color-navy-800)] text-white border-[var(--color-navy-800)]'
                  : 'bg-slate-100 md:bg-[#cfcfcf] text-[var(--color-navy-800)] border-transparent hover:border-[var(--color-gold-400)]'
              ].join(' ')}
              aria-selected={isActive}
              role="tab"
            >
              {category.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
