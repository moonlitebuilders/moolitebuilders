import React from 'react'

export const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-0 select-none ${className}`}>
      {/* Brand SVG Icon from public/assets/logo/ */}
      <img
        src="/assets/logo/moonlite builders logo.svg"
        alt="Moonlite Builders Logo Icon"
        className="w-[72px] h-[64px] md:w-[115px] md:h-[102px] object-contain transform hover:scale-105 transition-transform duration-300"
        loading="eager"
        decoding="async"
      />
      {/* Company Name */}
      <span className="text-[12px] md:text-base font-heading font-extrabold tracking-wider uppercase text-white leading-none -mt-1.5 md:-mt-2">
        Moonlite Builders
      </span>
    </div>
  )
}
