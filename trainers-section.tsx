"use client"

import { useEffect, useRef, useState } from "react"
import { Instagram, Twitter } from "lucide-react"

const trainers = [
  {
    name: "Marcus Johnson",
    role: "Head Strength Coach",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=500&fit=crop",
    instagram: "#",
    twitter: "#",
  },
  {
    name: "Sarah Chen",
    role: "HIIT Specialist",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=500&fit=crop",
    instagram: "#",
    twitter: "#",
  },
  {
    name: "David Williams",
    role: "Boxing Coach",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=500&fit=crop",
    instagram: "#",
    twitter: "#",
  },
  {
    name: "Emma Rodriguez",
    role: "Yoga Instructor",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=500&fit=crop",
    instagram: "#",
    twitter: "#",
  },
]

export function TrainersSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
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
    <section id="trainers" ref={sectionRef} className="py-24 md:py-32 relative">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 border border-primary/20 rounded-full" />
      <div className="absolute bottom-20 left-10 w-24 h-24 border border-primary/10 rounded-full" />

      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Meet The Team
          </span>
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mt-4 text-foreground transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            ELITE <span className="text-primary">TRAINERS</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Our certified professionals are dedicated to helping you reach your
            fitness goals with personalized training and motivation.
          </p>
        </div>

        {/* Trainers grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {trainers.map((trainer, index) => (
            <div
              key={index}
              data-hover="true"
              className={`group relative rounded-xl overflow-hidden transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image container */}
              <div className="aspect-[4/5] relative overflow-hidden">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                    hoveredIndex === index ? "scale-110 grayscale-0" : "grayscale"
                  }`}
                />

                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent transition-opacity duration-500 ${
                    hoveredIndex === index ? "opacity-90" : "opacity-70"
                  }`}
                />

                {/* Red accent overlay on hover */}
                <div
                  className={`absolute inset-0 bg-primary/10 transition-opacity duration-500 ${
                    hoveredIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3
                    className="text-xl font-bold text-foreground group-hover:text-primary transition-colors"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {trainer.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">{trainer.role}</p>

                  {/* Social links */}
                  <div
                    className={`flex gap-3 mt-4 transition-all duration-500 ${
                      hoveredIndex === index
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    <a
                      href={trainer.instagram}
                      className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary transition-colors"
                      data-hover="true"
                    >
                      <Instagram className="w-5 h-5 text-foreground" />
                    </a>
                    <a
                      href={trainer.twitter}
                      className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary transition-colors"
                      data-hover="true"
                    >
                      <Twitter className="w-5 h-5 text-foreground" />
                    </a>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 left-0 w-0 h-0 border-l-[60px] border-l-primary border-b-[60px] border-b-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
