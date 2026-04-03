"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Check, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Basic",
    price: 29,
    period: "month",
    description: "Perfect for beginners starting their fitness journey",
    features: [
      "Access to gym equipment",
      "Locker room access",
      "Free WiFi",
      "Basic fitness assessment",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: 59,
    period: "month",
    description: "Most popular choice for serious fitness enthusiasts",
    features: [
      "Everything in Basic",
      "All group classes",
      "Personal trainer (2x/month)",
      "Nutrition consultation",
      "Sauna & steam room",
      "Priority booking",
    ],
    popular: true,
  },
  {
    name: "Elite",
    price: 99,
    period: "month",
    description: "Ultimate package for maximum results",
    features: [
      "Everything in Pro",
      "Unlimited personal training",
      "Custom meal plans",
      "Recovery sessions",
      "Guest passes (4/month)",
      "Premium app features",
      "Exclusive events access",
    ],
    popular: false,
  },
]

export function PricingSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(1)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Pricing Plans
          </span>
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mt-4 text-foreground transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            INVEST IN <span className="text-primary">YOURSELF</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Choose the plan that fits your goals. All plans include a 7-day free trial.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              data-hover="true"
              className={`group relative rounded-2xl border transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              } ${
                plan.popular
                  ? "border-primary bg-card scale-105 shadow-xl shadow-primary/10"
                  : "border-border bg-card hover:border-primary/50"
              } ${hoveredIndex === index && !plan.popular ? "scale-[1.02]" : ""}`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(plan.popular ? 1 : null)}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  Most Popular
                </div>
              )}

              <div className="p-8">
                {/* Plan name */}
                <h3
                  className="text-2xl font-bold text-foreground"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {plan.name}
                </h3>
                <p className="text-muted-foreground text-sm mt-2">{plan.description}</p>

                {/* Price */}
                <div className="mt-6 mb-8">
                  <span className="text-5xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                    ${plan.price}
                  </span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          plan.popular ? "bg-primary" : "bg-primary/20"
                        }`}
                      >
                        <Check className={`w-3 h-3 ${plan.popular ? "text-primary-foreground" : "text-primary"}`} />
                      </div>
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link href="/join">
                  <Button
                    className={`w-full py-6 font-semibold relative overflow-hidden group/btn ${
                      plan.popular
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                        : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                    }`}
                    data-hover="true"
                  >
                    <span className="relative z-10">Get Started</span>
                    <div
                      className={`absolute inset-0 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ${
                        plan.popular ? "bg-foreground/20" : "bg-primary"
                      }`}
                    />
                  </Button>
                </Link>
              </div>

              {/* Decorative corner */}
              {plan.popular && (
                <>
                  <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[2px] h-16 bg-primary" />
                    <div className="absolute top-0 right-0 w-16 h-[2px] bg-primary" />
                  </div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-[2px] h-16 bg-primary" />
                    <div className="absolute bottom-0 left-0 w-16 h-[2px] bg-primary" />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
