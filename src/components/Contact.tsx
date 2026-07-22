import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'

/* ── Types ─────────────────────────────────────────────── */

interface FormData {
  fullName: string
  contactNumber: string
  email: string
  service: string
  projectLocation: string
  projectDetails: string
}

interface FormErrors {
  fullName?: string
  contactNumber?: string
  email?: string
  service?: string
  projectLocation?: string
}

/* ── Service options ───────────────────────────────────── */

const SERVICE_OPTIONS = [
  'Residential Construction',
  'Commercial Construction',
  'Industrial Construction',
  'Interior Design',
  'Rooftop Solar Installation',
  'Solar AMC',
  'Solar Maintenance',
  'Construction + Solar',
  'Consultation',
  'Other',
] as const

/* ── Initial state ─────────────────────────────────────── */

const INITIAL_FORM: FormData = {
  fullName: '',
  contactNumber: '',
  email: '',
  service: '',
  projectLocation: '',
  projectDetails: '',
}

/* ── Animation variants ────────────────────────────────── */

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
  },
}

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const fadeInChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
}

/* ── Contact info items ────────────────────────────────── */

const CONTACT_INFO = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Address',
    value: '338A, Kamalam Nagar Main Road,\nThirumullaivoyal,\nChennai – 600062',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: 'Phone',
    value: '8110076818',
    href: 'tel:+918110076818',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Email',
    value: 'moonlitebuilders.jdk@gmail.com',
    href: 'mailto:moonlitebuilders.jdk@gmail.com',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    label: 'Instagram',
    value: '@moonlitebuilder',
    href: 'https://www.instagram.com/moonlitebuilder?igsh=OHZkZzdleml5bTdo',
    external: true,
  },
]

/* ═══════════════════════════════════════════════════════════
   CONTACT COMPONENT
   ═══════════════════════════════════════════════════════════ */

export const Contact: React.FC = () => {
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  /* ── Handlers ──────────────────────────────────────────── */

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setForm((prev) => ({ ...prev, [name]: value }))
      // Clear error on change
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }))
      }
    },
    [errors]
  )

  const handleServiceSelect = useCallback(
    (service: string) => {
      setForm((prev) => ({ ...prev, service }))
      setIsDropdownOpen(false)
      if (errors.service) {
        setErrors((prev) => ({ ...prev, service: undefined }))
      }
    },
    [errors.service]
  )

  /* ── Validation ────────────────────────────────────────── */

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {}

    if (!form.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.'
    }

    if (!form.contactNumber.trim()) {
      newErrors.contactNumber = 'Enter a valid mobile number.'
    } else if (!/^\d{10}$/.test(form.contactNumber.trim())) {
      newErrors.contactNumber = 'Mobile number must be exactly 10 digits.'
    }

    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = 'Enter a valid email address.'
    }

    if (!form.service) {
      newErrors.service = 'Please select a service.'
    }

    if (!form.projectLocation.trim()) {
      newErrors.projectLocation = 'Please enter your project location.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [form])

  /* ── Submit ────────────────────────────────────────────── */

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!validate()) return

      setIsSubmitting(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSubmitting(false)
      setIsSuccess(true)
      setForm(INITIAL_FORM)

      // Reset success after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000)
    },
    [validate]
  )

  /* ── Shared input classes ──────────────────────────────── */

  const inputBase = [
    'w-full bg-white border border-gray-200 rounded-[10px]',
    'px-4 py-3.5 min-h-[48px] text-sm text-[var(--color-navy-800)]',
    'placeholder:text-gray-400',
    'outline-none transition-all duration-200',
    'focus:border-[var(--color-gold-400)] focus:ring-2 focus:ring-[var(--color-gold-400)]/20',
    'hover:border-gray-300',
  ].join(' ')

  const errorInputClass = 'border-red-400 focus:border-red-400 focus:ring-red-400/20'

  return (
    <section
      id="contact"
      className="w-full bg-white py-12 md:py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Section Heading ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeInUp}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-[var(--color-gold-500)] font-heading font-bold text-sm uppercase tracking-[0.2em] mb-3">
            Contact Us
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-[2.75rem] text-[var(--color-navy-800)] leading-tight">
            Let's Discuss Your Next Project
          </h2>
        </motion.div>

        {/* ── Two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* ════════════════════════════════════════════════
              LEFT COLUMN — Contact Info + Illustration
              ════════════════════════════════════════════════ */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            {/* Contact information cards */}
            <div className="flex flex-col gap-5">
              {CONTACT_INFO.map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeInChild}
                  className="flex items-start gap-4 group"
                >
                  {/* Icon circle */}
                  <div className="flex-shrink-0 w-11 h-11 rounded-full bg-[var(--color-gold-400)]/10 flex items-center justify-center text-[var(--color-gold-600)] group-hover:bg-[var(--color-gold-400)]/20 transition-colors duration-300">
                    {item.icon}
                  </div>

                  {/* Text */}
                  <div>
                    <p className="text-xs font-heading font-bold uppercase tracking-wider text-[var(--color-navy-400)] mb-1">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="text-sm text-[var(--color-navy-800)] font-medium hover:text-[var(--color-gold-600)] transition-colors duration-200"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-[var(--color-navy-800)] font-medium whitespace-pre-line leading-relaxed">
                        {item.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Illustration */}
            <motion.div variants={fadeInChild} className="mt-2">
              <img
                src="/assets/contact/contact-page.jpg"
                alt="Moonlite Builders — Construction and Solar Illustration"
                className="w-full max-w-[420px] mx-auto lg:mx-0 object-contain rounded-2xl"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </motion.div>

          {/* ════════════════════════════════════════════════
              RIGHT COLUMN — Contact Form
              ════════════════════════════════════════════════ */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeInUp}
            className="lg:col-span-7"
          >
            <div className="bg-[#f6f4ec] rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.10)]">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  /* ── Success State ── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-16 text-center w-full min-h-[450px]"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
                      <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-heading font-bold text-xl text-[var(--color-navy-800)] mb-2">
                      Thank you!
                    </h3>
                    <p className="text-sm text-[var(--color-navy-600)] w-full max-w-[400px] mx-auto leading-relaxed">
                      Thank you for contacting Moonlite Builders.<br />
                      Our team will get in touch with you shortly.
                    </p>
                  </motion.div>
                ) : (
                  /* ── Form ── */
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="flex flex-col gap-5"
                  >
                    {/* Row 1: Full Name + Contact Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Full Name */}
                      <div>
                        <label htmlFor="fullName" className="block text-xs font-heading font-bold uppercase tracking-wider text-[var(--color-navy-600)] mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          placeholder="Enter Your Full Name"
                          aria-label="Full Name"
                          required
                          maxLength={80}
                          value={form.fullName}
                          onChange={handleChange}
                          className={`${inputBase} ${errors.fullName ? errorInputClass : ''}`}
                        />
                        {errors.fullName && (
                          <p className="text-xs text-red-500 mt-1.5 ml-1">{errors.fullName}</p>
                        )}
                      </div>

                      {/* Contact Number */}
                      <div>
                        <label htmlFor="contactNumber" className="block text-xs font-heading font-bold uppercase tracking-wider text-[var(--color-navy-600)] mb-2">
                          Contact Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="contactNumber"
                          name="contactNumber"
                          type="tel"
                          placeholder="Mobile Number"
                          aria-label="Contact Number"
                          required
                          value={form.contactNumber}
                          onChange={(e) => {
                            // Allow only digits
                            const cleaned = e.target.value.replace(/\D/g, '').slice(0, 10)
                            setForm((prev) => ({ ...prev, contactNumber: cleaned }))
                            if (errors.contactNumber) {
                              setErrors((prev) => ({ ...prev, contactNumber: undefined }))
                            }
                          }}
                          className={`${inputBase} ${errors.contactNumber ? errorInputClass : ''}`}
                        />
                        {errors.contactNumber && (
                          <p className="text-xs text-red-500 mt-1.5 ml-1">{errors.contactNumber}</p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Email + Services */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-xs font-heading font-bold uppercase tracking-wider text-[var(--color-navy-600)] mb-2">
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter Your Email Address"
                          aria-label="Email Address"
                          value={form.email}
                          onChange={handleChange}
                          className={`${inputBase} ${errors.email ? errorInputClass : ''}`}
                        />
                        {errors.email && (
                          <p className="text-xs text-red-500 mt-1.5 ml-1">{errors.email}</p>
                        )}
                      </div>

                      {/* Services — Custom Select */}
                      <div className="relative">
                        <label htmlFor="service" className="block text-xs font-heading font-bold uppercase tracking-wider text-[var(--color-navy-600)] mb-2">
                          Services <span className="text-red-500">*</span>
                        </label>
                        <button
                          id="service"
                          type="button"
                          aria-label="Select Service"
                          aria-expanded={isDropdownOpen}
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          onBlur={() => setTimeout(() => setIsDropdownOpen(false), 150)}
                          className={`${inputBase} ${errors.service ? errorInputClass : ''} text-left flex items-center justify-between`}
                        >
                          <span className={form.service ? 'text-[var(--color-navy-800)]' : 'text-gray-400'}>
                            {form.service || 'Select Service'}
                          </span>
                          <svg
                            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {/* Dropdown menu */}
                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.ul
                              initial={{ opacity: 0, y: -8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.15 }}
                              className="absolute z-50 mt-1.5 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-[220px] overflow-y-auto"
                            >
                              {SERVICE_OPTIONS.map((opt) => (
                                <li key={opt}>
                                  <button
                                    type="button"
                                    onMouseDown={() => handleServiceSelect(opt)}
                                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 
                                      ${form.service === opt
                                        ? 'bg-[var(--color-gold-400)]/10 text-[var(--color-gold-700)] font-semibold'
                                        : 'text-[var(--color-navy-800)] hover:bg-gray-50'
                                      }
                                      first:rounded-t-xl last:rounded-b-xl`}
                                  >
                                    {opt}
                                  </button>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>

                        {errors.service && (
                          <p className="text-xs text-red-500 mt-1.5 ml-1">{errors.service}</p>
                        )}
                      </div>
                    </div>

                    {/* Row 3: Project Location (full width) */}
                    <div>
                      <label htmlFor="projectLocation" className="block text-xs font-heading font-bold uppercase tracking-wider text-[var(--color-navy-600)] mb-2">
                        Project Location <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="projectLocation"
                        name="projectLocation"
                        type="text"
                        placeholder="Project Location"
                        aria-label="Project Location"
                        required
                        value={form.projectLocation}
                        onChange={handleChange}
                        className={`${inputBase} ${errors.projectLocation ? errorInputClass : ''}`}
                      />
                      {errors.projectLocation && (
                        <p className="text-xs text-red-500 mt-1.5 ml-1">{errors.projectLocation}</p>
                      )}
                    </div>

                    {/* Row 4: Project Details (textarea, full width) */}
                    <div>
                      <label htmlFor="projectDetails" className="block text-xs font-heading font-bold uppercase tracking-wider text-[var(--color-navy-600)] mb-2">
                        Tell Us About Your Project
                      </label>
                      <textarea
                        id="projectDetails"
                        name="projectDetails"
                        placeholder="Briefly describe your project requirements..."
                        aria-label="Project Details"
                        rows={5}
                        maxLength={500}
                        value={form.projectDetails}
                        onChange={handleChange}
                        className={`${inputBase} resize-none`}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`btn-gold w-full px-9 py-4 text-sm md:text-base font-heading font-bold uppercase tracking-widest shadow-lg transition-all duration-200 text-center
                        ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl'}`}
                      style={{ borderRadius: 'var(--radius-md)' }}
                      aria-label="Submit contact form"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        'GET A FREE QUOTE'
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
