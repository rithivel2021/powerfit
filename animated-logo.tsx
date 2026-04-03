"use client"

import { useEffect, useState } from "react"

interface AnimatedLogoProps {
  scrollY: number
}

export function AnimatedLogo({ scrollY }: AnimatedLogoProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    setIsVisible(scrollY < 100)
    setRotation(scrollY * 0.5)
  }, [scrollY])

  return (
    <div
      className={`fixed top-6 left-6 z-50 transition-all duration-500 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
      }`}
    >
      <div className="relative w-16 h-16 md:w-20 md:h-20">
        {/* Outer rotating ring */}
        <div
          className="absolute inset-0 rounded-full border-4 border-primary"
          style={{
            transform: `rotate(${rotation}deg)`,
            borderTopColor: "transparent",
            borderBottomColor: "transparent",
          }}
        />
        {/* Inner rotating ring (opposite direction) */}
        <div
          className="absolute inset-2 rounded-full border-3 border-primary/60"
          style={{
            transform: `rotate(${-rotation * 1.5}deg)`,
            borderLeftColor: "transparent",
            borderRightColor: "transparent",
          }}
        />
        {/* Center logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <span
              className="text-xl md:text-2xl font-bold text-primary"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              PF
            </span>
            {/* Pulsing glow effect */}
            <div className="absolute inset-0 animate-ping opacity-20">
              <span
                className="text-xl md:text-2xl font-bold text-primary"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                PF
              </span>
            </div>
          </div>
        </div>
        {/* Orbiting dot */}
        <div
          className="absolute w-2 h-2 bg-primary rounded-full shadow-lg shadow-primary/50"
          style={{
            top: "50%",
            left: "50%",
            transform: `rotate(${rotation * 2}deg) translateX(32px) translateY(-50%)`,
          }}
        />
      </div>
    </div>
  )
}
