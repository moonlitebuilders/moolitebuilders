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
    document.title = "Construction Services | Moonlite Builders"
    
    // Set Meta Description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Premium residential, commercial and industrial construction services by Moonlite Builders. Transparent pricing, quality materials and expert supervision.')
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = 'Premium residential, commercial and industrial construction services by Moonlite Builders. Transparent pricing, quality materials and expert supervision.'
      document.head.appendChild(meta)
    }
    
    return () => {
      document.title = "Moonlite Builders & Promoters"
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
