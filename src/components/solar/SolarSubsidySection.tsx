import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, XCircle, Contact, Home, Zap, Sun, Map, Key, Building2 } from 'lucide-react'

const Counter: React.FC<{ value: number; duration?: number }> = ({ value, duration = 1.2 }) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    const startValue = 0

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const easeOutQuad = progress * (2 - progress) // Easing helper
      
      const currentVal = Math.floor(easeOutQuad * (value - startValue) + startValue)
      setCount(currentVal)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString('en-IN')}
    </span>
  )
}

export const SolarSubsidySection: React.FC = () => {
  return (
    <section className="w-full py-8 md:py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* TOP SECTION: Text, Subsidy Cards, and Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 lg:mb-24">
          
          {/* Left Column: Content & Subsidy Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <h3 className="text-[var(--color-gold-500)] text-sm md:text-base font-bold mb-3 uppercase tracking-wider">
              PM SURYA GHAR YOJANA
            </h3>
            <h2 className="text-[var(--color-navy-900)] text-3xl md:text-4xl lg:text-5xl font-bold font-heading leading-tight mb-6">
              Government Solar Subsidy & How It Works
            </h2>
            <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-10 font-medium">
              Save up to ₹78,000 with the PM Surya Ghar Yojana. We handle installation, documentation, and subsidy processing for you.
            </p>

            {/* Subsidy Cards Flexbox */}
            <div className="flex flex-wrap sm:flex-nowrap gap-4 md:gap-6">
              
              {/* Card 1 */}
              <div className="flex-1 bg-[#FAF9F6] border border-[#EAE6DF] rounded-xl p-4 md:p-6 flex flex-col items-center justify-center text-center shadow-sm">
                <span className="text-slate-900 font-bold text-lg md:text-xl">1kw</span>
                <span className="text-slate-600 text-xs md:text-sm mb-2">system</span>
                <span className="text-[var(--color-navy-900)] text-xs md:text-sm font-semibold mb-1">government subsidy</span>
                <span className="text-2xl md:text-3xl font-bold text-slate-900">
                  <Counter value={30000} />
                </span>
              </div>

              {/* Card 2 */}
              <div className="flex-1 bg-[#FAF9F6] border border-[#EAE6DF] rounded-xl p-4 md:p-6 flex flex-col items-center justify-center text-center shadow-sm">
                <span className="text-slate-900 font-bold text-lg md:text-xl">2kw</span>
                <span className="text-slate-600 text-xs md:text-sm mb-2">system</span>
                <span className="text-[var(--color-navy-900)] text-xs md:text-sm font-semibold mb-1">government subsidy</span>
                <span className="text-2xl md:text-3xl font-bold text-slate-900">
                  <Counter value={60000} />
                </span>
              </div>

              {/* Card 3 */}
              <div className="flex-1 bg-[#FAF9F6] border border-[#EAE6DF] rounded-xl p-4 md:p-6 flex flex-col items-center justify-center text-center shadow-sm">
                <span className="text-slate-900 font-bold text-lg md:text-xl">3kw+</span>
                <span className="text-slate-600 text-xs md:text-sm mb-2">system</span>
                <span className="text-[var(--color-navy-900)] text-xs md:text-sm font-semibold mb-1">government subsidy</span>
                <span className="text-2xl md:text-3xl font-bold text-slate-900">
                  <Counter value={78000} />
                </span>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-xl"
          >
            <img 
              src="/assets/service/subsidy-section-image.png" 
              alt="House with solar panels on roof" 
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>

        {/* BOTTOM SECTION: Eligibility Rules Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full border border-slate-300 rounded-2xl p-8 md:p-12 bg-white relative overflow-hidden shadow-sm"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-navy-900)] font-heading text-center mb-12">
            Eligibility For Solar Subsidy
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x divide-slate-200">
            
            {/* Column 1 */}
            <div className="flex flex-col gap-8 md:pr-8">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="text-green-500 shrink-0 mt-1" size={24} fill="currentColor" stroke="white" />
                <div className="flex gap-4 items-center">
                  <Contact className="text-slate-700 shrink-0" size={32} strokeWidth={1.5} />
                  <span className="text-slate-900 font-semibold text-sm md:text-base">Indian citizen</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 className="text-green-500 shrink-0 mt-1" size={24} fill="currentColor" stroke="white" />
                <div className="flex gap-4 items-center">
                  <Home className="text-slate-700 shrink-0" size={32} strokeWidth={1.5} />
                  <span className="text-slate-900 font-semibold text-sm md:text-base">Residential Property Owner</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 className="text-green-500 shrink-0 mt-1" size={24} fill="currentColor" stroke="white" />
                <div className="flex gap-4 items-center">
                  <Zap className="text-slate-700 shrink-0" size={32} strokeWidth={1.5} />
                  <span className="text-slate-900 font-semibold text-sm md:text-base">Valid electricity connection in your name</span>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-8 md:px-8">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="text-green-500 shrink-0 mt-1" size={24} fill="currentColor" stroke="white" />
                <div className="flex gap-4 items-center">
                  <Sun className="text-slate-700 shrink-0" size={32} strokeWidth={1.5} />
                  <span className="text-slate-900 font-semibold text-sm md:text-base leading-snug">No existing rooftop solar on the same connection</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 className="text-green-500 shrink-0 mt-1" size={24} fill="currentColor" stroke="white" />
                <div className="flex gap-4 items-center">
                  <Map className="text-slate-700 shrink-0" size={32} strokeWidth={1.5} />
                  <span className="text-slate-900 font-semibold text-sm md:text-base">Urban & Rural homes eligible</span>
                </div>
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-8 md:pl-8">
              <div className="flex items-start gap-4">
                <XCircle className="text-red-500 shrink-0 mt-1" size={24} fill="currentColor" stroke="white" />
                <div className="flex gap-4 items-center">
                  <Key className="text-slate-700 shrink-0" size={32} strokeWidth={1.5} />
                  <span className="text-slate-900 font-semibold text-sm md:text-base">Rental properties not eligible</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <XCircle className="text-red-500 shrink-0 mt-1" size={24} fill="currentColor" stroke="white" />
                <div className="flex gap-4 items-center">
                  <Building2 className="text-slate-700 shrink-0" size={32} strokeWidth={1.5} />
                  <span className="text-slate-900 font-semibold text-sm md:text-base leading-snug">Commercial properties not eligible for subsidy</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
