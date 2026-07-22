import React, { useState, useMemo, useEffect, useRef } from 'react'
import { motion, animate } from 'framer-motion'
import { Lightbulb, Zap, Sprout, PiggyBank, ChevronDown } from 'lucide-react'

// --- Helper Component for Number Animation ---
const AnimatedNumber = ({ value, prefix = '' }: { value: number; prefix?: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null)
  const prevValue = useRef(value)

  useEffect(() => {
    const node = nodeRef.current
    if (!node) return
    
    const controls = animate(prevValue.current, value, {
      duration: 0.5,
      ease: 'easeOut',
      onUpdate(v) {
        node.textContent = `${prefix}${new Intl.NumberFormat('en-IN').format(Math.round(v))}`
      }
    })
    
    prevValue.current = value
    return () => controls.stop()
  }, [value, prefix])

  return <span ref={nodeRef}>{prefix}{new Intl.NumberFormat('en-IN').format(value)}</span>
}

export const SolarSavingsSection: React.FC = () => {
  // --- States ---
  const [monthlyBill, setMonthlyBill] = useState<number>(5000)
  const [propertyType, setPropertyType] = useState<string>('independent-house')
  
  // Track if user clicked calculate
  const [hasCalculated, setHasCalculated] = useState<boolean>(false)

  const formatINR = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value)
  }

  // --- Calculation Logic ---
  const results = useMemo(() => {
    // Recommended Solar Size based on monthly bill
    let systemSize = '1kW'
    if (monthlyBill > 15000) systemSize = '10kW+'
    else if (monthlyBill >= 10001) systemSize = '8kW'
    else if (monthlyBill >= 7001) systemSize = '5kW'
    else if (monthlyBill >= 4001) systemSize = '3kW'
    else if (monthlyBill >= 2001) systemSize = '2kW'
    else systemSize = '1kW'

    // Monthly Savings (80% of bill)
    const monthlySavings = Math.round(monthlyBill * 0.8)
    
    // Annual Savings
    const annualSavings = monthlySavings * 12

    // Payback Period logic (Defaulting to On-Grid standard)
    let pbMin = 4
    let pbMax = 5

    if (propertyType === 'commercial') {
      pbMin = Math.max(1, pbMin - 1)
      pbMax = Math.max(2, pbMax - 1)
    }

    const paybackPeriod = `${pbMin}-${pbMax} Years`

    return {
      systemSize,
      monthlySavings,
      annualSavings,
      paybackPeriod
    }
  }, [monthlyBill, propertyType])

  // Determine what to display based on whether Calculate was clicked
  const displayResults = hasCalculated 
    ? results 
    : {
        systemSize: '0kW',
        monthlySavings: 0,
        annualSavings: 0,
        paybackPeriod: '0 Years'
      }

  return (
    <section className="w-full py-8 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT SIDE: Header & Value Proposition List */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <h3 className="text-amber-600 text-sm font-semibold mb-2 uppercase tracking-wide">
                Why Go Solar
              </h3>
              <h2 className="text-[var(--color-navy-900)] text-3xl lg:text-4xl font-bold font-heading">
                Benefits That Make Different
              </h2>
            </motion.div>

            <div className="space-y-8">
              {/* Feature 1 */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-black text-white rounded-full" aria-hidden="true">
                  <Lightbulb size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg mb-1">Reduce Electricity Bills</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Lower Your Monthly Energy Expenses With Clean, Renewable Power.
                  </p>
                </div>
              </motion.div>

              {/* Feature 2 */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-black text-white rounded-full" aria-hidden="true">
                  <Zap size={24} fill="currentColor" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg mb-1">Energy Independence</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Generate Your Own Electricity And Reduce Dependence On The Grid.
                  </p>
                </div>
              </motion.div>

              {/* Feature 3 */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-black text-white rounded-full" aria-hidden="true">
                  <Sprout size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg mb-1">Environment Friendly</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Reduce Your Carbon Footprint With Sustainable Energy.
                  </p>
                </div>
              </motion.div>

              {/* Feature 4 */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-black text-white rounded-full" aria-hidden="true">
                  <PiggyBank size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg mb-1">Long-Term Savings</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Enjoy Decades Of Energy Production With Minimal Maintenance.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT SIDE: Calculator Card */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border border-slate-200 rounded-xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-6 sm:p-8"
              role="region"
              aria-label="Solar Savings Calculator"
            >
              <div className="flex flex-col gap-8">
                
                {/* Inputs Panel */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 font-heading">
                    Estimate Your Solar Savings
                  </h3>

                  {/* Monthly Bill Slider */}
                  <div className="mb-6">
                    <div className="flex justify-between items-end mb-3">
                      <label htmlFor="bill-slider" className="font-bold text-slate-900 text-sm md:text-base">
                        Monthly Electricity Bill
                      </label>
                      <span className="text-amber-600 font-bold text-base bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200/60 shadow-2xs transition-colors">
                        {formatINR(monthlyBill)}
                      </span>
                    </div>
                    <input 
                      id="bill-slider"
                      type="range" 
                      min="500" 
                      max="30000" 
                      step="100"
                      value={monthlyBill} 
                      onChange={(e) => {
                        setMonthlyBill(Number(e.target.value))
                        setHasCalculated(false)
                      }}
                      className="w-full h-12 bg-transparent rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 touch-manipulation"
                      aria-valuenow={monthlyBill}
                      aria-valuemin={500}
                      aria-valuemax={30000}
                      style={{ background: `linear-gradient(to right, var(--color-gold-400) 0%, var(--color-gold-400) ${(monthlyBill - 500) / (30000 - 500) * 100}%, #e2e8f0 ${(monthlyBill - 500) / (30000 - 500) * 100}%, #e2e8f0 100%)`, height: '8px', marginTop: '14px', marginBottom: '14px' }}
                    />
                  </div>

                  {/* Property Type Select & Calculate Button Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                    <div className="relative">
                      <label htmlFor="property-type" className="font-bold text-slate-900 text-sm md:text-base mb-2 block">
                        Property Type
                      </label>
                      <div className="relative group">
                        <select 
                          id="property-type"
                          value={propertyType}
                          onChange={(e) => {
                            setPropertyType(e.target.value)
                            setHasCalculated(false)
                          }}
                          className="w-full h-12 appearance-none border border-slate-300 rounded-lg px-4 text-slate-800 bg-white hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent font-medium transition-colors cursor-pointer touch-manipulation text-sm md:text-base"
                          aria-label="Select property type"
                        >
                          <option value="apartment">Apartment</option>
                          <option value="independent-house">Independent House</option>
                          <option value="villa">Villa</option>
                          <option value="commercial">Commercial</option>
                          <option value="industrial">Industrial</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 group-hover:text-slate-600 transition-colors">
                          <ChevronDown size={20} strokeWidth={2.5} />
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setHasCalculated(true)}
                      className="w-full h-12 bg-[var(--color-gold-500)] hover:bg-[var(--color-gold-600)] text-[var(--color-navy-950)] font-bold px-4 rounded-lg transition-all duration-200 font-heading tracking-wide uppercase shadow-md hover:-translate-y-0.5 touch-manipulation text-sm md:text-base flex items-center justify-center"
                    >
                      Calculate Savings
                    </button>
                  </div>
                </div>

                {/* Results Panel */}
                <div className="bg-[#FAF9F6] p-6 lg:p-7 rounded-2xl border border-[#EAE6DF]" aria-live="polite">
                  <h3 className="text-xl font-bold text-slate-900 font-heading mb-4">
                    Estimated Results
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                      <p className="text-xs md:text-sm text-slate-500 font-medium mb-1.5">System Size</p>
                      <motion.p 
                        key={displayResults.systemSize}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xl md:text-2xl font-bold text-slate-900"
                      >
                        {displayResults.systemSize}
                      </motion.p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                      <p className="text-xs md:text-sm text-slate-500 font-medium mb-1.5">Monthly Savings</p>
                      <p className="text-xl md:text-2xl font-bold text-slate-900">
                        <AnimatedNumber value={displayResults.monthlySavings} prefix="₹" />
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                      <p className="text-xs md:text-sm text-slate-500 font-medium mb-1.5">Annual Savings</p>
                      <p className="text-xl md:text-2xl font-bold text-slate-900">
                        <AnimatedNumber value={displayResults.annualSavings} prefix="₹" />
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                      <p className="text-xs md:text-sm text-slate-500 font-medium mb-1.5">Payback Period</p>
                      <motion.p 
                        key={displayResults.paybackPeriod}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xl md:text-2xl font-bold text-slate-900"
                      >
                        {displayResults.paybackPeriod}
                      </motion.p>
                    </div>

                  </div>
                </div>

              </div>
            </motion.div>

            {/* Disclaimer */}
            <p className="text-xs text-center text-slate-500 mt-6 w-full leading-relaxed px-4">
              *This is an estimate. Actual savings may vary according to your location, DISCOM electricity tariffs, state solar policy, and roof shading.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
