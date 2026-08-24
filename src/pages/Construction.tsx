import React, { useEffect } from 'react'
import { ConstructionHero } from '../components/construction/ConstructionHero'
import { PackageCards } from '../components/construction/PackageCards'
import { ComparisonSection } from '../components/construction/ComparisonSection'
import { PackageHighlights } from '../components/construction/PackageHighlights'
import { ConstructionFAQ } from '../components/construction/ConstructionFAQ'

export const Construction: React.FC = () => {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0)
    
    // Set Document Title
    document.title = "Moonlite Builders | Residential & Commercial Construction Services"
    
    // Set Meta Description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Premium residential, commercial and industrial construction services by Moonlite Builders. Transparent pricing, quality materials and expert supervision.')
    } else {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      metaDescription.setAttribute('content', 'Premium residential, commercial and industrial construction services by Moonlite Builders. Transparent pricing, quality materials and expert supervision.')
      document.head.appendChild(metaDescription)
    }

    // Set Canonical URL
    const canonicalHref = window.location.pathname.startsWith('/construction') 
      ? 'https://moonlitebuilders.com/construction' 
      : 'https://moonlitebuilders.com/services/construction'
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
      <ConstructionHero />
      <PackageCards />
      <ComparisonSection />
      <PackageHighlights />
      <ConstructionFAQ />
    </>
  )
}
