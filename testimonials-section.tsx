"use client"

import { useEffect, useRef, useState } from "react"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Michael Torres",
    role: "Lost 30 lbs in 3 months",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    content:
      "PowerFit completely changed my life. The trainers pushed me beyond what I thought was possible. The community here is incredibly supportive.",
    rating: 5,
  },
  {
    name: "Jennifer Lee",
    role: "Member for 2 years",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    content:
      "Best gym I&apos;ve ever been to. The equipment is top-notch, the classes are amazing, and the atmosphere keeps me motivated every single day.",
    rating: 5,
  },
  {
    name: "Robert Chen",
    role: "Gained 20 lbs muscle",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    content:
      "The personal training here is exceptional. My coach created a perfect program for my goals. I&apos;ve never felt stronger or more confident.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="testimonials" ref={sectionRef} className="py-24 md:py-32 relative">
      {/* Background quote */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5">
        <Quote className="w-96 h-96 text-primary" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Success Stories
          </span>
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mt-4 text-foreground transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            REAL <span className="text-primary">RESULTS</span>
          </h2>
        </div>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto">
          {/* Main testimonial display */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  activeIndex === index
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 absolute inset-0 translate-x-8 pointer-events-none"
                }`}
              >
                <div className="text-center">
                  {/* Quote */}
                  <Quote className="w-12 h-12 text-primary mx-auto mb-6" />

                  {/* Content */}
                  <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
                    {`"`}{testimonial.content}{`"`}
                  </p>

                  {/* Rating */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-primary fill-primary"
                      />
                    ))}
                  </div>

                  {/* Author */}
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-primary"
                    />
                    <div className="text-left">
                      <div
                        className="font-bold text-foreground"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-primary">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-primary w-8"
                    : "bg-muted hover:bg-primary/50"
                }`}
                data-hover="true"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
