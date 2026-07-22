import React from 'react'
import { Link } from 'react-router-dom'

// SVG Check Icon for checklist
const CheckIcon = () => (
  <svg className="w-5 h-5 text-[var(--color-navy-800)] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)

export const Services: React.FC = () => {
  const constructionChecklist = [
    'Residential Construction',
    'Commercial Buildings',
    'Industrial Projects',
    'Renovation',
    'Interior Design',
    'Project Planning',
  ]

  const solarChecklist = [
    'Residential Solar',
    'Commercial Solar',
    'Industrial Solar',
    'Solar Subsidy Assistance',
    'Annual Maintenance',
    'Battery Backup',
  ]

  return (
    <section id="services" className="w-full bg-white py-12 md:py-20 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* SPLIT-COLUMN SECTION HEADER */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8 mb-12 sm:mb-16 lg:mb-20">
          
          {/* Left Column (Brand Anchoring) */}
          <div className="flex flex-col gap-3 lg:w-1/2">
            <span className="text-[var(--color-gold-500)] font-heading font-bold uppercase tracking-widest text-sm">
              — OUR SERVICES —
            </span>
            <h2 className="text-[#0f2247] font-heading font-extrabold text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.15] max-w-[600px]">
              COMPLETE CONSTRUCTION & SOLAR SOLUTIONS
            </h2>
          </div>

          {/* Right Column (Contextual Content & CTA) */}
          <div className="flex flex-col items-start lg:items-end gap-6 lg:w-[45%] text-left lg:text-right">
            <p className="text-slate-600 font-medium text-base md:text-lg leading-relaxed max-w-[500px]">
              From planning your dream space to powering it with clean energy, we deliver end-to-end solutions with quality, transparency and care.
            </p>
            <a
              href="#contact"
              className="btn-gold px-8 py-3.5 text-sm font-heading font-bold uppercase tracking-widest shadow-lg transition-all duration-200 text-center rounded-lg text-[var(--color-navy-950)] relative z-10"
              aria-label="Explore our services"
            >
              EXPLORE SERVICES ↗
            </a>
          </div>
        </div>

        {/* INTERACTIVE SERVICES MATRIX (Two-Column Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto items-start">
          
          {/* Construction Card */}
          <div className="group relative bg-[#F5E7B5] rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-400 ease-out hover:-translate-y-2 hover:scale-[1.015] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] focus-within:-translate-y-2 focus-within:scale-[1.015] focus-within:shadow-2xl flex flex-col">
            
            {/* Media Component */}
            <div className="w-full h-32 sm:h-48 md:h-56 overflow-hidden rounded-xl mb-4 sm:mb-6 md:mb-8">
              <img
                src="/assets/service/construction-service.jpg"
                alt="Construction Services"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-focus-within:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Content Typography */}
            <h3 className="text-[#0f2247] font-heading font-bold text-xl sm:text-2xl md:text-3xl capitalize mb-2 min-h-[auto] md:min-h-[36px]">
              construction
            </h3>
            <p className="text-slate-700 font-medium text-xs sm:text-sm md:text-base leading-relaxed mb-4 min-h-[auto] md:min-h-[72px]">
              Building residential, commercial and industrial spaces with quality craftsmanship and thoughtful planning.
            </p>

            {/* Badge Tag Wrapper */}
            <div className="flex flex-wrap gap-1.5 mb-4 min-h-[auto] md:min-h-[64px] content-start">
              {['Residential', 'Commercial', 'Industrial', 'Interior Design'].map((badge) => (
                <span key={badge} className="bg-[#0f2247] text-white text-[11px] sm:text-xs md:text-sm font-medium px-2.5 sm:px-3 py-1 rounded-full">
                  {badge}
                </span>
              ))}
            </div>

            {/* Hidden Checklist Expansion (Animated Grid Rows) */}
            {/* Always hidden by default, expands on hover/tap */}
            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
              <div className="overflow-hidden">
                <ul className="flex flex-col gap-2.5 sm:gap-3 pt-2 sm:pt-4 pb-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out">
                  {constructionChecklist.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 sm:gap-3 text-[#0f2247] font-medium text-xs sm:text-sm md:text-[15px]">
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Inline Text Anchor Link */}
            <div className="mt-auto pt-4 sm:pt-8 flex justify-end">
              <Link
                to="/services/construction"
                className="text-[#0f2247] font-heading font-bold text-sm sm:text-base md:text-lg hover:underline underline-offset-4 decoration-2 transition-all inline-flex items-center gap-2 cursor-pointer relative z-10 py-2 px-1"
                aria-label="Explore construction services"
              >
                Explore construction →
              </Link>
            </div>
          </div>

          {/* Solar Card */}
          <div className="group relative bg-[#F5E7B5] rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-400 ease-out hover:-translate-y-2 hover:scale-[1.015] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] focus-within:-translate-y-2 focus-within:scale-[1.015] focus-within:shadow-2xl flex flex-col">
            
            {/* Media Component */}
            <div className="w-full h-32 sm:h-48 md:h-56 overflow-hidden rounded-xl mb-4 sm:mb-6 md:mb-8">
              <img
                src="/assets/service/solar-service.jpg"
                alt="Solar Solutions"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-focus-within:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Content Typography */}
            <h3 className="text-[#0f2247] font-heading font-bold text-xl sm:text-2xl md:text-3xl capitalize mb-2 min-h-[auto] md:min-h-[36px]">
              Solar Solutions
            </h3>
            <p className="text-slate-700 font-medium text-xs sm:text-sm md:text-base leading-relaxed mb-4 min-h-[auto] md:min-h-[72px]">
              Premium rooftop solar systems engineered for maximum energy savings and dependable long-term performance.
            </p>

            {/* Badge Tag Wrapper */}
            <div className="flex flex-wrap gap-1.5 mb-4 min-h-[auto] md:min-h-[64px] content-start">
              {['Rooftop Solar', 'Subsidy Support', 'Battery Backup', 'AMC'].map((badge) => (
                <span key={badge} className="bg-[#0f2247] text-white text-[11px] sm:text-xs md:text-sm font-medium px-2.5 sm:px-3 py-1 rounded-full">
                  {badge}
                </span>
              ))}
            </div>

            {/* Hidden Checklist Expansion (Animated Grid Rows) */}
            {/* Always hidden by default, expands on hover/tap */}
            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
              <div className="overflow-hidden">
                <ul className="flex flex-col gap-2.5 sm:gap-3 pt-2 sm:pt-4 pb-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out">
                  {solarChecklist.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 sm:gap-3 text-[#0f2247] font-medium text-xs sm:text-sm md:text-[15px]">
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Inline Text Anchor Link */}
            <div className="mt-auto pt-4 sm:pt-8 flex justify-end">
              <Link
                to="/services/solar"
                className="text-[#0f2247] font-heading font-bold text-sm sm:text-base md:text-lg hover:underline underline-offset-4 decoration-2 transition-all inline-flex items-center gap-2 cursor-pointer relative z-10 py-2 px-1"
                aria-label="Explore solar solutions"
              >
                Explore solar →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
