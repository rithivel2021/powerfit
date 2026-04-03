"use client"

import { useEffect, useRef, useState } from "react"
import { Dumbbell, Users, Clock, Award, Zap, Heart } from "lucide-react"

const features = [
  {
    icon: Dumbbell,
    title: "Premium Equipment",
    description: "State-of-the-art machines and free weights from leading brands worldwide.",
  },
  {
    icon: Users,
    title: "Expert Trainers",
    description: "Certified professionals dedicated to helping you achieve your goals.",
  },
  {
    icon: Clock,
    title: "24/7 Access",
    description: "Train on your schedule with round-the-clock gym access.",
  },
  {
    icon: Award,
    title: "Proven Results",
    description: "Join thousands who have transformed their lives with us.",
  },
  {
    icon: Zap,
    title: "High Energy",
    description: "Motivating atmosphere with pumping music and like-minded individuals.",
  },
  {
    icon: Heart,
    title: "Wellness Focus",
    description: "Holistic approach combining fitness, nutrition, and recovery.",
  },
]

export function FeaturesSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleCards((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    )

    const cards = sectionRef.current?.querySelectorAll("[data-index]")
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" ref={sectionRef} className="py-24 md:py-32 relative">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Why Choose Us
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            BUILT FOR <span className="text-primary">CHAMPIONS</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Everything you need to reach your peak performance, all under one roof.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              data-index={index}
              data-hover="true"
              className={`group relative p-8 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-500 ${
                visibleCards.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
                </div>
                {/* Animated line */}
                <div className="absolute -bottom-3 left-0 w-0 h-0.5 bg-primary group-hover:w-14 transition-all duration-500" />
              </div>

              {/* Content */}
              <h3
                className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-xl">
                <div className="absolute top-0 right-0 w-[2px] h-8 bg-primary/30 group-hover:h-12 transition-all duration-500" />
                <div className="absolute top-0 right-0 w-8 h-[2px] bg-primary/30 group-hover:w-12 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
