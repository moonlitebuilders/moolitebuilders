import React, { useEffect } from 'react'
import { Hero } from '../components/Hero'
import { About } from '../components/About'
import { Process } from '../components/Process'
import { Services } from '../components/Services'
import { WhyChooseUs } from '../components/WhyChooseUs'
import { Gallery } from '../components/Gallery'
import { Contact } from '../components/Contact'

export interface HomeProps {
  phase: number
  isSkipped: boolean
}

export const Home: React.FC<HomeProps> = ({ phase, isSkipped }) => {
  useEffect(() => {
    document.title = "Moonlite Builders & Promoters | Premium Construction & Rooftop Solar — Tamil Nadu"
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Moonlite Builders & Promoters delivers certified residential and commercial construction alongside MNRE-approved rooftop solar installations across Tamil Nadu since 2016. Free site assessment. Government subsidy assistance.')
    }
    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) {
      canonical.setAttribute('href', 'https://moonlitebuilders.com/')
    }
  }, [])
  return (
    <>
      {/* Hero Section — first visual section, full viewport height */}
      <Hero phase={phase} isSkipped={isSkipped} />
      
      {/* About Section */}
      <About />

      {/* Process Section */}
      <Process />

      {/* Services Section */}
      <Services />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Gallery Section */}
      <Gallery />

      {/* Contact Section */}
      <Contact />
    </>
  )
}
