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
    document.title = "Moonlite Builders | MNRE Approved Rooftop Solar Solutions"
    
    // Set Meta Description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'MNRE approved rooftop solar solutions across Tamil Nadu by Moonlite Builders. Power your home or business with clean energy, high efficiency panels and government subsidy support.')
    } else {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      metaDescription.setAttribute('content', 'MNRE approved rooftop solar solutions across Tamil Nadu by Moonlite Builders. Power your home or business with clean energy, high efficiency panels and government subsidy support.')
      document.head.appendChild(metaDescription)
    }

    // Set Canonical URL
    const canonicalHref = window.location.pathname.startsWith('/solar') 
      ? 'https://moonlitebuilders.com/solar' 
      : 'https://moonlitebuilders.com/services/solar'
    let canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) {
      canonical.setAttribute('href', canonicalHref)
    } else {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      canonical.setAttribute('href', canonicalHref)
      document.head.appendChild(canonical)
    }

    return () => {
      document.title = "Moonlite Builders & Promoters | Premium Construction & Rooftop Solar — Tamil Nadu"
      if (canonical) {
        canonical.setAttribute('href', 'https://moonlitebuilders.com/')
      }
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

