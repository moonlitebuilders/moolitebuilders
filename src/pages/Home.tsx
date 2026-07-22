import React from 'react'
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
