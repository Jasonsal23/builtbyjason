'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  external?: boolean
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  external = false,
}: ButtonProps) {
  const base =
    'inline-flex items-center gap-2 px-6 py-3 rounded-sm font-body font-medium text-sm tracking-wide transition-all duration-200 cursor-pointer'

  const variants = {
    primary:
      'bg-gold text-background hover:bg-gold-light active:scale-95',
    secondary:
      'border border-gold text-gold hover:bg-gold hover:text-background active:scale-95',
    ghost:
      'text-cream hover:text-gold active:scale-95',
  }

  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
        <Link
          href={href}
          className={classes}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={classes}
    >
      {children}
    </motion.button>
  )
}
