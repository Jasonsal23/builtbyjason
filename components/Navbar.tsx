'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#projects' },
  { label: 'Pricing', href: '#pricing' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-background/95 backdrop-blur-sm border-b border-border shadow-xl shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading text-xl font-bold text-cream hover:text-gold transition-colors duration-200 tracking-wider"
          >
            JS
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="font-body text-sm text-muted hover:text-cream transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('#contact')}
              className="font-body text-sm px-4 py-2 border border-gold text-gold hover:bg-gold hover:text-background transition-all duration-200 rounded-sm tracking-wide"
            >
              Let's Build
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
              className="block w-5 h-px bg-cream origin-center"
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              className="block w-5 h-px bg-cream"
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
              className="block w-5 h-px bg-cream origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-sm flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => handleNavClick(link.href)}
                className="font-heading text-4xl font-bold text-cream hover:text-gold transition-colors duration-200"
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: navLinks.length * 0.07 }}
              onClick={() => handleNavClick('#contact')}
              className="font-body text-base px-8 py-3 bg-gold text-background rounded-sm font-semibold mt-4 hover:bg-gold-light transition-colors duration-200"
            >
              Let's Build
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
