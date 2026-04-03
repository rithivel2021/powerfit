"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown, Play } from "lucide-react"

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 50,
          y: (e.clientY - rect.top - rect.height / 2) / 50,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(239, 68, 68, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(239, 68, 68, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
          }}
        />
      </div>

      {/* Floating elements */}
      <div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"
        style={{
          transform: `translate(${mousePosition.x * 3}px, ${mousePosition.y * 3}px)`,
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"
        style={{
          animationDelay: "1s",
          transform: `translate(${-mousePosition.x * 2}px, ${-mousePosition.y * 2}px)`,
        }}
      />

      {/* Diagonal lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[2px] bg-primary/20 rotate-45" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[2px] bg-primary/20 rotate-45" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-primary font-medium">New Year, New You</span>
          </div>

          {/* Main heading */}
          <h1
            className={`text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="text-foreground">TRANSFORM</span>
            <br />
            <span className="text-primary relative">
              YOUR BODY
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-primary/30"
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 6 Q75 0 150 6 T300 6"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
              </svg>
            </span>
          </h1>

          {/* Subheading */}
          <p
            className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Join the ultimate fitness experience. World-class equipment, expert
            trainers, and a community that pushes you beyond your limits.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Link href="/join">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg relative overflow-hidden group"
                data-hover="true"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Free Trial
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
                <div className="absolute inset-0 bg-foreground/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Button>
            </Link>

            <Button
              variant="outline"
              size="lg"
              className="border-border hover:border-primary text-foreground font-semibold px-8 py-6 text-lg group"
              data-hover="true"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Video
            </Button>
          </div>

          {/* Stats */}
          <div
            className={`grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-border/50 transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {[
              { value: "10K+", label: "Active Members" },
              { value: "50+", label: "Expert Trainers" },
              { value: "100+", label: "Classes Weekly" },
            ].map((stat, index) => (
              <div key={index} className="text-center group" data-hover="true">
                <div
                  className="text-3xl md:text-4xl font-bold text-primary group-hover:scale-110 transition-transform"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-5 h-5 text-primary" />
      </div>
    </section>
  )
}
