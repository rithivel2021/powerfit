"use client"

import { useEffect, useState } from "react"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([])

  useEffect(() => {
    let trailId = 0

    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      
      // Add trail particle
      setTrail(prev => [
        ...prev.slice(-8),
        { x: e.clientX, y: e.clientY, id: trailId++ }
      ])
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.dataset.hover === "true"
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = () => {
      setIsHovering(false)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener("mousemove", updateCursor)
    window.addEventListener("mouseover", handleMouseOver)
    window.addEventListener("mouseout", handleMouseOut)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", updateCursor)
      window.removeEventListener("mouseover", handleMouseOver)
      window.removeEventListener("mouseout", handleMouseOut)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  // Remove old trail particles
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail(prev => prev.slice(1))
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Trail particles */}
      {trail.map((particle, index) => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-[9998] rounded-full bg-primary/30 mix-blend-screen hidden md:block"
          style={{
            left: particle.x,
            top: particle.y,
            width: 4 + index * 0.5,
            height: 4 + index * 0.5,
            transform: "translate(-50%, -50%)",
            opacity: (index + 1) / trail.length * 0.5,
          }}
        />
      ))}
      
      {/* Main cursor */}
      <div
        className={`fixed pointer-events-none z-[9999] rounded-full mix-blend-difference transition-transform duration-150 hidden md:block ${
          isClicking ? "scale-75" : isHovering ? "scale-150" : "scale-100"
        }`}
        style={{
          left: position.x,
          top: position.y,
          width: isHovering ? 40 : 20,
          height: isHovering ? 40 : 20,
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgb(239, 68, 68)",
          border: "2px solid rgba(255, 255, 255, 0.8)",
        }}
      />
      
      {/* Inner dot */}
      <div
        className="fixed pointer-events-none z-[9999] w-1 h-1 rounded-full bg-foreground hidden md:block"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  )
}
