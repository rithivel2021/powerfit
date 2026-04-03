"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Classes", href: "#classes" },
  { label: "Trainers", href: "#trainers" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-lg shadow-primary/5"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-2 group"
          data-hover="true"
        >
          <div className="relative">
            <span
              className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              POWER
            </span>
            <span
              className="text-2xl md:text-3xl font-bold text-primary"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              FIT
            </span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-muted-foreground hover:text-foreground transition-colors group py-2"
              data-hover="true"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <span className="relative z-10">{link.label}</span>
              <span className="absolute inset-x-0 -bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Link href="/join">
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 relative overflow-hidden group"
              data-hover="true"
            >
              <span className="relative z-10">Join Now</span>
              <div className="absolute inset-0 bg-foreground/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          data-hover="true"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-20 bg-background/98 backdrop-blur-lg transition-all duration-500 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-2xl font-semibold text-foreground hover:text-primary transition-all duration-300 py-3 border-b border-border/50 ${
                  isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                }`}
                style={{
                  transitionDelay: `${index * 50}ms`,
                  fontFamily: "var(--font-heading)",
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link href="/join" onClick={() => setIsMobileMenuOpen(false)}>
              <Button
                className="mt-4 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg"
              >
                Join Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
