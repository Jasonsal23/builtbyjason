import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Built By Jason — You Describe It. Mason Designs It. I Build It.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Gold corner accent top-left */}
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: 80, height: 80,
          borderTop: '3px solid #c9a84c',
          borderLeft: '3px solid #c9a84c',
        }} />
        {/* Gold corner accent bottom-right */}
        <div style={{
          position: 'absolute', bottom: 0, right: 0,
          width: 80, height: 80,
          borderBottom: '3px solid #c9a84c',
          borderRight: '3px solid #c9a84c',
        }} />

        {/* Monogram */}
        <div style={{
          fontSize: 18,
          fontWeight: 700,
          color: '#c9a84c',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: 32,
        }}>
          BUILT BY JASON
        </div>

        {/* Headline */}
        <div style={{
          display: 'flex',
          fontSize: 64,
          fontWeight: 800,
          color: '#f0ece4',
          lineHeight: 1.05,
          marginBottom: 28,
          maxWidth: 800,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>You Describe It.</span>
            <span>Mason Designs It.</span>
            <span style={{ color: '#c9a84c' }}>I Build It.</span>
          </div>
        </div>

        {/* Subtext */}
        <div style={{
          fontSize: 24,
          color: '#9a9a9a',
          marginBottom: 48,
        }}>
          Free AI website designs in minutes. Built for real by Jason.
        </div>

        {/* Tags row */}
        <div style={{ display: 'flex', gap: 12 }}>
          {['Free AI Website Designer', 'Custom Websites', 'AI Chatbots', 'AI Agents'].map((tag) => (
            <div key={tag} style={{
              fontSize: 14,
              color: '#c9a84c',
              border: '1px solid rgba(201,168,76,0.4)',
              padding: '6px 16px',
              borderRadius: 2,
              background: 'rgba(201,168,76,0.05)',
              letterSpacing: '0.05em',
            }}>
              {tag}
            </div>
          ))}
        </div>

        {/* Domain */}
        <div style={{
          position: 'absolute',
          bottom: 48,
          right: 80,
          fontSize: 16,
          color: '#9a9a9a',
          letterSpacing: '0.1em',
        }}>
          builtbyjason.dev
        </div>
      </div>
    ),
    { ...size }
  )
}
