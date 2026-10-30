'use client'

import { useId } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// Mason: a little gold brick (masons build with bricks) with a glass visor and an AI spark.
// Moods: idle (floats + blinks), thinking (eyes scan, spark spins), happy (^ ^ eyes).
export type MasonMood = 'idle' | 'thinking' | 'happy'

interface MasonAvatarProps {
  size?: number
  mood?: MasonMood
  className?: string
}

const center = { transformBox: 'fill-box' as const, transformOrigin: 'center' }

export default function MasonAvatar({ size = 40, mood = 'idle', className = '' }: MasonAvatarProps) {
  const id = useId().replace(/:/g, '')
  const still = useReducedMotion()
  const thinking = mood === 'thinking'

  const eye = (x: number) =>
    mood === 'happy' ? (
      <path
        d={`M${x - 3} 37.5 Q${x} 32.5 ${x + 3} 37.5`}
        stroke="#f5dd8f"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
      />
    ) : (
      <rect x={x - 2.25} y={31.75} width={4.5} height={5.5} rx={2.25} fill="#f5dd8f" />
    )

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Mason, the AI web designer"
      className={className}
    >
      <defs>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ecd38a" />
          <stop offset=".5" stopColor="#c9a84c" />
          <stop offset="1" stopColor="#8f6f22" />
        </linearGradient>
        <linearGradient id={`${id}-visor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1e1e1e" />
          <stop offset="1" stopColor="#050505" />
        </linearGradient>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0" stopColor="#c9a84c" stopOpacity=".35" />
          <stop offset="1" stopColor="#c9a84c" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="32" cy="32" r="31" fill="#151515" stroke="#c9a84c" strokeOpacity=".45" strokeWidth="1" />
      <motion.circle
        cx="32"
        cy="35"
        r="24"
        fill={`url(#${id}-glow)`}
        animate={still ? undefined : { opacity: thinking ? [0.6, 1, 0.6] : [0.8, 1, 0.8] }}
        transition={{ duration: thinking ? 1.2 : 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Head, floating gently */}
      <motion.g
        animate={still ? undefined : { y: thinking ? [0, -1.2, 0] : [0, -1.5, 0] }}
        transition={{ duration: thinking ? 0.9 : 3.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="12.5" y="18.5" width="39" height="34" rx="10" fill={`url(#${id}-gold)`} />
        <path d="M17.5 24.5 H46.5" stroke="#fff" strokeOpacity=".35" strokeWidth="1.3" strokeLinecap="round" />
        <rect x="17" y="27.5" width="30" height="14" rx="7" fill={`url(#${id}-visor)`} />

        {/* Eyes: blink when idle, scan side to side when thinking */}
        <motion.g
          style={center}
          animate={
            still || mood === 'happy'
              ? undefined
              : thinking
                ? { x: [-3, 3, -3] }
                : { scaleY: [1, 1, 0.1, 1, 1] }
          }
          transition={
            thinking
              ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 4, times: [0, 0.9, 0.93, 0.96, 1], repeat: Infinity }
          }
        >
          {eye(27)}
          {eye(37)}
        </motion.g>

        <path
          d={mood === 'happy' ? 'M27.5 46 Q32 49.5 36.5 46' : 'M28.5 46.5 Q32 48.7 35.5 46.5'}
          stroke="#6b5317"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
      </motion.g>

      {/* AI spark */}
      <motion.path
        d="M51 7.5 L52.4 12.1 L57 13.5 L52.4 14.9 L51 19.5 L49.6 14.9 L45 13.5 L49.6 12.1 Z"
        fill="#dfc06e"
        style={center}
        animate={
          still
            ? undefined
            : thinking
              ? { rotate: [0, 180, 360], scale: [1, 1.25, 1] }
              : { scale: [1, 0.8, 1], opacity: [1, 0.7, 1] }
        }
        transition={{ duration: thinking ? 1.4 : 2.6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  )
}
