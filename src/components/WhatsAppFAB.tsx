import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PHONE_NUMBER = '918110076818'
const MESSAGE = encodeURIComponent("Hello Moonlite Builders, I'm interested in your construction and solar services. I would like to discuss my project.")
const WHATSAPP_URL = `https://wa.me/${PHONE_NUMBER}?text=${MESSAGE}`

export const WhatsAppFAB: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    // Check if we've already shown the tooltip in this session
    const hasSeenTooltip = sessionStorage.getItem('moonlite_wa_tooltip')
    
    if (!hasSeenTooltip) {
      const timerId = setTimeout(() => {
        setShowTooltip(true)
        sessionStorage.setItem('moonlite_wa_tooltip', 'true')
        
        // Hide tooltip after 4 seconds
        setTimeout(() => setShowTooltip(false), 4000)
      }, 8000)
      
      return () => clearTimeout(timerId)
    }
  }, [])

  return (
    <div className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-[90] flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mb-4 pointer-events-auto shadow-lg"
          >
            <div className="bg-white px-4 py-2.5 rounded-[10px] text-[13px] md:text-sm font-medium text-[var(--color-navy-800)] relative shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
              <p className="whitespace-nowrap">Need help?<br/>Chat with us on WhatsApp.</p>
              {/* Tooltip triangle */}
              <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white rotate-45 transform" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Moonlite Builders on WhatsApp"
        className="pointer-events-auto flex items-center justify-center w-[56px] h-[56px] md:w-[64px] md:h-[64px] rounded-full text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50"
        initial={{ 
          backgroundColor: '#25D366', 
          boxShadow: '0 12px 30px rgba(37,211,102,0.35)',
          y: 0,
          scale: 1 
        }}
        whileHover={{ 
          backgroundColor: '#29e46f', // slightly brighter green
          boxShadow: '0 16px 36px rgba(37,211,102,0.45)',
          y: -2,
          scale: 1.08 
        }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      </motion.a>
    </div>
  )
}
