import React, { useEffect } from 'react'
import { SolarHero } from '../components/solar/SolarHero'
import { SolarServicesSection } from '../components/solar/SolarServicesSection'
import { SolarSubsidySection } from '../components/solar/SolarSubsidySection'
import { SolarSavingsSection } from '../components/solar/SolarSavingsSection'
import { SolarFAQ } from '../components/solar/SolarFAQ'

export const Solar: React.FC = () => {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0)
    
    // Set Document Title
    document.title = "Solar Services | Moonlite Builders"
    
    // Set Meta Description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Clean Energy. Smarter Savings. Power your home or business with professionally designed rooftop solar systems.')
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = 'Clean Energy. Smarter Savings. Power your home or business with professionally designed rooftop solar systems.'
      document.head.appendChild(meta)
    }
    
    return () => {
      document.title = "Moonlite Builders & Promoters"
    }
  }, [])

  return (
    <>
      <SolarHero />
      <SolarServicesSection />
      <SolarSubsidySection />
      <SolarSavingsSection />
      <SolarFAQ />
    </>
  )
}

