import React from 'react'
import { packageHighlights } from '../../data/construction'

export const PackageHighlights: React.FC = () => {
  return (
    <section className="w-full bg-white pt-0 pb-10 md:pt-0 md:pb-12">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="w-full bg-[#faf5ec] rounded-2xl py-5 px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 border border-[var(--color-gold-200)]/30 shadow-sm overflow-hidden max-w-full">
        
        {/* Left Side Text */}
        <div className="md:w-1/3 flex items-center justify-center md:justify-start">
          <h3 className="font-heading font-bold text-lg md:text-xl text-[var(--color-navy-800)] text-center md:text-left leading-snug">
            what's included in<br />every package?
          </h3>
        </div>

        {/* Vertical Divider (Desktop only) */}
        <div className="hidden md:block w-px h-16 bg-[var(--color-gold-400)]/30 mx-4" />

        {/* Right Side Highlights */}
        <div className="md:w-[65%] w-full grid grid-cols-2 gap-6 text-center md:flex md:justify-around items-center">
          {packageHighlights.map((highlight, idx) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center gap-3 shrink-0">
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                  <img src={highlight.icon} alt={highlight.title} className="w-full h-full object-contain" />
                </div>
                <p className="text-[10px] md:text-xs font-bold text-[var(--color-navy-800)] uppercase tracking-wider text-center max-w-[110px] md:max-w-[90px] leading-tight">
                  {highlight.title}
                </p>
              </div>
              {idx < packageHighlights.length - 1 && (
                <div className="hidden md:block w-px h-12 bg-[var(--color-gold-400)]/30 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
      </div>
    </section>
  )
}
