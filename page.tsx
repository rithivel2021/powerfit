"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatedLogo } from "@/components/animated-logo"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { ClassesSection } from "@/components/classes-section"
import { TrainersSection } from "@/components/trainers-section"
import { PricingSection } from "@/components/pricing-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { CustomCursor } from "@/components/custom-cursor"

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-background overflow-x-hidden">
      <CustomCursor />
      <AnimatedLogo scrollY={scrollY} />
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ClassesSection />
        <TrainersSection />
        <PricingSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
