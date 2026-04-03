"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const classes = [
  {
    name: "HIIT Training",
    duration: "45 min",
    intensity: "High",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
  },
  {
    name: "Strength & Power",
    duration: "60 min",
    intensity: "Medium",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=600&h=400&fit=crop",
  },
  {
    name: "Boxing Fitness",
    duration: "50 min",
    intensity: "High",
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&h=400&fit=crop",
  },
  {
    name: "Yoga Flow",
    duration: "60 min",
    intensity: "Low",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
  },
]

export function ClassesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
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
      id="classes"
      ref={sectionRef}
      className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 md:mb-16">
          <div>
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">
              Our Classes
            </span>
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mt-4 text-foreground transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
              style={{ fontFamily: "var(--font-heading)" }}
            >
              TRAIN WITH THE <span className="text-primary">BEST</span>
            </h2>
          </div>
          <Button
            variant="outline"
            className={`mt-6 lg:mt-0 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            data-hover="true"
          >
            View All Classes
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        {/* Classes grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {classes.map((cls, index) => (
            <div
              key={index}
              data-hover="true"
              className={`group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              } ${hoveredIndex === index ? "lg:scale-105 z-10" : ""}`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image */}
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={cls.image}
                  alt={cls.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {/* Intensity badge */}
                  <div
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                      cls.intensity === "High"
                        ? "bg-primary text-primary-foreground"
                        : cls.intensity === "Medium"
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {cls.intensity}
                  </div>

                  <span className="text-sm text-primary font-medium">{cls.duration}</span>
                  <h3
                    className="text-2xl font-bold text-foreground mt-1 group-hover:text-primary transition-colors"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {cls.name}
                  </h3>

                  {/* Arrow indicator */}
                  <div className="flex items-center gap-2 mt-4 text-primary opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <span className="text-sm font-medium">Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Red accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
