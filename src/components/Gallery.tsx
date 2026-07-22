import React, { useState } from 'react'

// Map predefined types to specific CSS Grid spans for responsive tiling
// This guarantees zero white gaps when the array is ordered correctly
const CARD_TYPES = {
  hero: {
    span: 'col-span-1 md:col-span-2 lg:col-span-2 row-span-1 md:row-span-2 lg:row-span-2',
    aspectClass: 'aspect-[16/9]',
  },
  small: {
    span: 'col-span-1 md:col-span-1 lg:col-span-1 row-span-1 md:row-span-1 lg:row-span-1',
    aspectClass: 'aspect-square',
  },
  wide: {
    span: 'col-span-1 md:col-span-2 lg:col-span-2 row-span-1 md:row-span-1 lg:row-span-1',
    aspectClass: 'aspect-[16/10]',
  },
  medium: {
    span: 'col-span-1 md:col-span-1 lg:col-span-1 row-span-1 md:row-span-2 lg:row-span-2',
    aspectClass: 'aspect-[4/5]',
  },
  tall: {
    span: 'col-span-1 md:col-span-1 lg:col-span-1 row-span-1 md:row-span-2 lg:row-span-2',
    aspectClass: 'aspect-[3/4]',
  },
}

// 16 carefully sequenced items to perfectly tile on 3-col and 2-col grids without gaps
// The sequence is designed so that the first 8 items form a perfectly flush rectangle on their own,
// and the next 8 items also form a perfectly flush rectangle, leaving zero white spaces.
const galleryLayout = [
  // BATCH 1 (Initial 8 items - Flawless Rectangle)
  { imageFile: 'WhatsApp Image 2026-06-29 at 8.36.52 PM.jpeg', type: 'wide', title: 'Corporate Headquarters', category: 'Commercial' },
  { imageFile: 'WhatsApp Image 2026-06-29 at 8.36.50 PM.jpeg', type: 'small', title: 'Modern Kitchen', category: 'Interior Design' },
  { imageFile: 'WhatsApp Image 2026-06-29 at 8.36.51 PM (2).jpeg', type: 'tall', title: 'Solar Installation', category: 'Solar' },
  { imageFile: 'WhatsApp Image 2026-06-29 at 8.36.53 PM (1).jpeg', type: 'medium', title: 'Living Space', category: 'Interior Design' },
  { imageFile: 'WhatsApp Image 2026-06-29 at 8.36.51 PM.jpeg', type: 'small', title: 'Patio Deck', category: 'Renovation' },
  { imageFile: 'WhatsApp Image 2026-06-29 at 8.36.52 PM (1).jpeg', type: 'small', title: 'Smart Home', category: 'Electrical' },
  { imageFile: 'WhatsApp Image 2026-06-29 at 8.36.52 PM (2).jpeg', type: 'small', title: 'Lighting Design', category: 'Interior' },
  { imageFile: 'WhatsApp Image 2026-06-29 at 8.36.54 PM.jpeg', type: 'wide', title: 'Commercial Complex', category: 'Construction' },
  
  // BATCH 2 (Next 8 items for Load More - Flawless Rectangle)
  { imageFile: 'WhatsApp Image 2026-06-29 at 8.36.50 PM (1).jpeg', type: 'hero', title: 'Luxury Villa', category: 'Construction' },
  { imageFile: 'WhatsApp Image 2026-06-29 at 8.36.51 PM (1).jpeg', type: 'small', title: 'Bathroom Remodel', category: 'Renovation' },
  { imageFile: 'WhatsApp Image 2026-06-29 at 8.36.53 PM.jpeg', type: 'small', title: 'Commercial Build', category: 'Construction' },
  { imageFile: 'WhatsApp Image 2026-06-29 at 8.36.56 PM.jpeg', type: 'wide', title: 'Eco Residence', category: 'Solar' },
  { imageFile: 'WhatsApp Image 2026-06-29 at 8.36.54 PM (1).jpeg', type: 'small', title: 'Roof Installation', category: 'Solar' },
  { imageFile: 'WhatsApp Image 2026-06-29 at 8.36.55 PM.jpeg', type: 'small', title: 'Minimalist Interior', category: 'Interior Design' },
  { imageFile: 'WhatsApp Image 2026-06-29 at 8.36.56 PM (1).jpeg', type: 'small', title: 'Outdoor Space', category: 'Renovation' },
  { imageFile: 'WhatsApp Image 2026-06-29 at 8.36.55 PM (1).jpeg', type: 'small', title: 'Staircase Design', category: 'Interior Design' },
]

export const Gallery: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(8)
  
  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 8, galleryLayout.length))
  }

  const visibleProjects = galleryLayout.slice(0, visibleCount)

  return (
    <section id="gallery" className="w-full bg-white py-12 md:py-20 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <span className="text-[var(--color-gold-500)] font-heading font-medium uppercase tracking-[0.2em] text-sm mb-3">
            Featured Projects
          </span>
          <h2 className="text-[#0f2247] font-heading font-extrabold text-4xl md:text-5xl leading-tight">
            Built By Moonlite
          </h2>
        </div>

        {/* BENTO GRID */}
        {/* Fixed CSS Grid with predefined spans and auto-rows to maintain strict structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 auto-rows-[250px] md:auto-rows-[220px] lg:auto-rows-[280px] grid-flow-row-dense mb-16">
          {visibleProjects.map((project, index) => {
            const layoutConfig = CARD_TYPES[project.type as keyof typeof CARD_TYPES]
            // We only want the fade-up animation to stagger for the newly revealed batch
            const animationDelay = (index % 8) * 75
            
            return (
              <div
                key={project.imageFile + index}
                className={`group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-350 cursor-pointer w-full h-full ${layoutConfig.span} ${layoutConfig.aspectClass} md:aspect-auto`}
                style={{
                  animation: 'gallery-fade-up 0.5s ease-out forwards',
                  animationDelay: `${animationDelay}ms`,
                  opacity: 0,
                }}
                tabIndex={0}
              >
                {/* Image */}
                <img
                  src={`/assets/gallery-built by moolite/${project.imageFile}`}
                  alt={`${project.title} - ${project.category}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-105 group-focus:scale-105"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-350 ease-out z-10 pointer-events-none"></div>

                {/* Content Reveal */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-20 pointer-events-none overflow-hidden">
                  <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100 transition-all duration-350 ease-out">
                    <h3 className="text-white font-heading font-bold text-xl md:text-2xl truncate drop-shadow-md">
                      Moonlite Builders
                    </h3>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* LOAD MORE & END MESSAGE */}
        <div className="flex justify-center mb-20 lg:mb-24">
          {visibleCount < galleryLayout.length ? (
            <button
              onClick={handleLoadMore}
              className="btn-gold px-8 py-3.5 text-sm font-heading font-bold uppercase tracking-widest shadow-lg transition-all duration-200 rounded-lg text-[var(--color-navy-950)] hover:scale-[1.02]"
              aria-label="Load more projects"
            >
              LOAD MORE PROJECTS
            </button>
          ) : (
            <p className="text-slate-500 font-medium text-sm md:text-base italic">
              You've reached the end of our featured projects.
            </p>
          )}
        </div>

        {/* CTA SECTION */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-white border border-gray-100 border-l-4 border-l-[var(--color-gold-500)] p-8 md:p-12 rounded-3xl shadow-[0_10px_35px_rgba(0,0,0,0.05)] max-w-5xl mx-auto transition-all duration-300 hover:shadow-[0_20px_50px_rgba(15,34,71,0.1)] hover:-translate-y-1.5">
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h3 className="text-[#0f2247] font-heading font-bold text-2xl md:text-3xl mb-2">
              Having A Project In Mind
            </h3>
            <p className="text-slate-600 font-medium text-base md:text-lg">
              Let's Build Something Together
            </p>
          </div>
          <a
            href="#contact"
            className="btn-gold px-8 py-4 text-sm font-heading font-bold uppercase tracking-widest shadow-lg transition-all duration-200 rounded-lg text-[var(--color-navy-950)] whitespace-nowrap"
            aria-label="Get a free quote"
          >
            GET A FREE QUOTE
          </a>
        </div>

      </div>

      <style>{`
        @keyframes gallery-fade-up {
          0% {
            opacity: 0;
            transform: translateY(24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
