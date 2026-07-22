import React from 'react'

const features = [
  {
    title: 'Professional Leadership',
    icon: '/assets/why choose moonlite/professional.svg',
    description: 'Led by experienced professionals with expertise in construction and certified solar solutions.',
  },
  {
    title: 'Consultation Before Construction',
    icon: '/assets/why choose moonlite/Consultation Before Construction.svg',
    description: 'We recommend the best solution based on your property, budget, and future energy needs.',
  },
  {
    title: 'Complete Turnkey Solutions',
    icon: '/assets/why choose moonlite/Complete Turnkey Solutions.svg',
    description: 'From construction and interiors to rooftop solar, everything is managed under one trusted team.',
  },
  {
    title: 'Registered MSME Enterprise',
    icon: '/assets/why choose moonlite/Registered MSME Enterprise.svg',
    description: 'Officially registered as a Udyam (MSME) enterprise under the Government of India.',
  },
  {
    title: 'Certified Solar Expertise',
    icon: '/assets/why choose moonlite/Certified Solar Expertise.svg',
    description: 'Certified in Solar PV and Solar Thermal installation through the Skill India and NSDC framework.',
  },
  {
    title: 'Transparent Pricing',
    icon: '/assets/why choose moonlite/Transparent Pricing.svg',
    description: 'Clear package details, branded materials, and transparent pricing with no hidden costs.',
  },
]

const certificates = [
  {
    title: 'MSME Registered',
    icon: '/assets/trusted-certificates/MSME Registered.jpg',
  },
  {
    title: 'NSDC Qualification',
    icon: '/assets/trusted-certificates/Clip path group.jpg', // Assuming this is NSDC
  },
  {
    title: 'Skill India Certified',
    icon: '/assets/trusted-certificates/Skill India Certified.jpg',
  },
  {
    title: 'Solar PV & Solar Thermal System Certified',
    icon: '/assets/trusted-certificates/Solar PV & Solar Thermal System Certified.jpg',
  },
]

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-choose-us" className="w-full bg-[#fcfcfc] py-12 md:py-20 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-[#0f2247] font-heading font-extrabold text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.15] mb-6">
            Why Choose Moonlite
          </h2>
          <p className="text-[#0f2247] font-medium text-base md:text-lg leading-relaxed max-w-[700px]">
            More than builders, we're your planning partners—delivering quality construction and smart solar solutions with transparency, expertise, and long-term value.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 sm:gap-6 mb-12 sm:mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <h3 className="text-[#0f2247] font-heading font-bold text-base sm:text-sm md:text-[15px] leading-tight mb-3 sm:mb-4 min-h-0 sm:min-h-[40px] flex items-center justify-center">
                {feature.title}
              </h3>
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mb-3 sm:mb-4 flex items-center justify-center shrink-0">
                <img 
                  src={feature.icon} 
                  alt={feature.title} 
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              <p className="text-slate-600 text-xs sm:text-xs md:text-[13px] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trusted Certification Banner */}
        <div className="bg-[#e4e7ee] rounded-xl p-8 md:p-10 mx-auto max-w-5xl shadow-sm">
          {/* Divider Title */}
          <div className="flex flex-row items-center justify-center gap-3 mb-8 md:mb-12">
            <div className="h-[1.5px] bg-[#d4af37] w-12 md:w-20"></div>
            <h3 className="text-[#0f2247] font-heading font-bold text-xl md:text-2xl px-1 md:px-4 text-center">
              Trusted<br className="block md:hidden" /> Certification
            </h3>
            <div className="h-[1.5px] bg-[#d4af37] w-12 md:w-20"></div>
          </div>

          {/* Logos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-start justify-items-center">
            {certificates.map((cert, index) => (
              <div key={index} className="flex flex-col items-center text-center w-full max-w-[180px]">
                <div className="h-16 md:h-20 mb-4 w-full flex items-center justify-center">
                  <img 
                    src={cert.icon} 
                    alt={cert.title} 
                    className="max-w-full max-h-full object-contain mix-blend-multiply"
                    loading="lazy"
                  />
                </div>
                <p className="text-[#0f2247] font-bold text-sm md:text-[15px] leading-tight">
                  {cert.title}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
