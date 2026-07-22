import React from 'react'
import { motion } from 'framer-motion'
import { Home, Building2, Factory, Wrench } from 'lucide-react'

const services = [
  {
    title: "Residential Rooftop Solar",
    description: "Ideal for independent homes and villas looking to reduce monthly electricity bills.",
    icon: Home,
  },
  {
    title: "Commercial Solar",
    description: "Efficient systems designed for offices, shops, schools, and commercial buildings.",
    icon: Building2,
  },
  {
    title: "Industrial Solar",
    description: "Large-capacity solar systems designed for factories, industrial facilities, and manufacturing units.",
    icon: Factory,
  },
  {
    title: "Solar Maintenance",
    description: "Annual maintenance, panel cleaning, system inspections, and performance optimization.",
    icon: Wrench,
  }
]

export const SolarServicesSection: React.FC = () => {
  return (
    <section id="services" className="w-full py-16 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Heading */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center text-[var(--color-navy-900)] mb-12 font-heading"
        >
          Solar Solutions We Offer
        </motion.h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-6 md:p-8 border border-slate-300 rounded-2xl bg-white hover:shadow-xl hover:border-[var(--color-gold-400)] transition-all duration-300 group"
              >
                {/* Icon Container (Using Lucide Icons as placeholders) */}
                <div className="w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-[var(--color-navy-50)] text-[var(--color-navy-800)] group-hover:bg-[var(--color-gold-400)] group-hover:text-[var(--color-navy-900)] transition-colors duration-300">
                  <Icon size={40} strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[var(--color-navy-900)] mb-3 font-heading">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
