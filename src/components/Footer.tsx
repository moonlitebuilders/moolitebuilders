import React from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { MapPin, Phone, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

/* ── Animation variants ────────────────────────────────── */


const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const childFadeIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
}

const InstagramIcon: React.FC<{ size?: number; strokeWidth?: number; className?: string }> = ({ size = 18, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

/* ── Data ──────────────────────────────────────────────── */

const SERVICES = [
  { label: 'Construction', href: '/services/construction' },
  { label: 'Solar', href: '/#services' },
  { label: 'Renovation', href: '/#services' },
  { label: 'AMC', href: '/#services' },
] as const

const QUICK_LINKS = [
  { label: 'Home', href: '/#hero' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Projects', href: '/#gallery' },
  { label: 'Contact', href: '/#contact' },
] as const

const CONTACT_ITEMS = [
  {
    icon: MapPin,
    label: 'Office Address',
    text: '338A, Kamalam Nagar Main Road,\nThirumullaivoyal, Chennai 600062',
    href: 'https://maps.google.com/?q=338A+Kamalam+Nagar+Main+Road+Thirumullaivoyal+Chennai+600062',
    external: true,
  },
  {
    icon: Phone,
    label: 'Phone Number',
    text: '8110076818',
    href: 'tel:+918110076818',
    external: false,
  },
  {
    icon: Mail,
    label: 'Email Address',
    text: 'moonlitebuilders.jdk@gmail.com',
    href: 'mailto:moonlitebuilders.jdk@gmail.com',
    external: false,
  },
  {
    icon: InstagramIcon,
    label: 'Instagram',
    text: '@moonlitebuilder',
    href: 'https://www.instagram.com/moonlitebuilder?igsh=OHZkZzdleml5bTdo',
    external: true,
  },
] as const

/* ═══════════════════════════════════════════════════════════
   FOOTER COMPONENT
   ═══════════════════════════════════════════════════════════ */

export const Footer: React.FC = () => {

  return (
    <footer
      className="w-full"
      style={{ backgroundColor: 'var(--color-navy-800)' }}
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-12 md:pt-16 pb-10 md:pb-12">

        {/* ── 4-column grid ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start"
        >

          {/* ═══ Column 1: Logo + Copyright ═══ */}
          <motion.div
            variants={childFadeIn}
            className="lg:col-span-4 flex flex-col items-center md:items-start"
          >
            {/* Logo */}
            <Link
              to="/"
              aria-label="Moonlite Builders — Back to top"
              className="inline-block transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-500)]/40 focus-visible:rounded-md"
            >
              <img
                src="/assets/logo/moonlite builders logo.svg"
                alt="Moonlite Builders Logo"
                className="w-[150px] md:w-[170px] h-auto"
                loading="lazy"
                decoding="async"
              />
            </Link>

            {/* Copyright */}
            <p className="mt-5 text-white/90 text-[15px] font-normal leading-[1.6] text-center md:text-left">
              © 2026 Moonlite Builders.<br />
              All Rights Reserved.
            </p>
          </motion.div>

          {/* ═══ Column 2: Services ═══ */}
          <motion.div
            variants={childFadeIn}
            className="lg:col-span-2 flex flex-col items-center md:items-start"
          >
            <h3 className="text-white font-heading font-bold text-[20px] uppercase tracking-wide mb-5">
              Services
            </h3>
            <ul className="flex flex-col gap-3">
              {SERVICES.map((service) => (
                <li key={service.label}>
                  <Link
                    to={service.href}
                    className="text-[var(--color-navy-200)] hover:text-[var(--color-gold-400)] transition-colors duration-200 text-sm md:text-base inline-flex items-center group"
                  >
                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-200 ease-out inline-block">
                      -
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200 ease-out">
                      {service.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ═══ Column 3: Quick Links ═══ */}
          <motion.div
            variants={childFadeIn}
            className="lg:col-span-2 flex flex-col items-center md:items-start"
          >
            <h3 className="text-white font-heading font-bold text-[20px] uppercase tracking-wide mb-5">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-[var(--color-navy-200)] hover:text-[var(--color-gold-400)] transition-colors duration-200 text-sm md:text-base inline-flex items-center group"
                  >
                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-200 ease-out inline-block">
                      -
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200 ease-out">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ═══ Column 4: Contact Information ═══ */}
          <motion.div
            variants={childFadeIn}
            className="lg:col-span-4 flex flex-col items-center md:items-start"
          >
            <div className="flex flex-col gap-7 w-full">
              {CONTACT_ITEMS.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    {...(item.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    aria-label={item.label}
                    className="group flex items-start gap-4 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-500)]/40 focus-visible:rounded-md"
                  >
                    {/* Icon */}
                    <span className="flex-shrink-0 mt-0.5 text-white/80 group-hover:text-[var(--color-gold-500)] transition-all duration-200 group-hover:scale-105">
                      <Icon size={18} strokeWidth={2} />
                    </span>

                    {/* Text */}
                    <span className="text-white/90 text-[15px] font-medium leading-[1.6] whitespace-pre-line group-hover:text-[var(--color-gold-500)] transition-colors duration-200">
                      {item.text}
                    </span>
                  </a>
                )
              })}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </footer>
  )
}
