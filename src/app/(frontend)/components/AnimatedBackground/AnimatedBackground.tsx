'use client'

import { Box } from '@mui/material'
import { usePathname } from 'next/navigation'

export default function AnimatedBackground() {
  const pathname = usePathname()
  const isHomePage =
    pathname === '/' ||
    pathname === '/en' ||
    pathname === '/hr' ||
    pathname === '/he' ||
    pathname === '/tr'

  return (
    <Box
      component="div"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
      sx={{
        background: 'linear-gradient(135deg, rgba(249, 250, 255, 0.7), rgba(250, 249, 255, 0.6))', // Soft white/purple blend
      }}
    >
      {/* 🌈 Soft Gradient Glow Overlay */}

      <Box
        sx={{
          position: 'absolute',
          bottom: '-15%',
          right: '-20%',
          width: '60%',
          height: '60%',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at center, rgba(59, 130, 246, 0.12), transparent 80%)', // Softer blue glow
          filter: 'blur(90px)', // Enhanced blur
          zIndex: -1,
        }}
      />

      {/* 🌿 Floating MUI Glass Shapes (Pastel Colors) */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          left: '25%',
          width: 70,
          height: 70,
          borderRadius: '12px',
          backgroundColor: 'rgba(107, 142, 35, 0.25)', // Olive green (pastel)
          backdropFilter: 'blur(10px)', // Enhanced blur
          boxShadow: '0 4px 25px rgba(107, 142, 35, 0.2)', // Softer shadow
          border: '1px solid rgba(107, 142, 35, 0.2)', // Soft border
        }}
        className={isHomePage ? 'animate-float-slow' : 'animate-float-fast'}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          right: '20%',
          width: 50,
          height: 50,
          borderRadius: '50%',
          backgroundColor: 'rgba(236, 72, 153, 0.2)', // Soft pink
          backdropFilter: 'blur(8px)', // Enhanced blur
          boxShadow: '0 6px 25px rgba(236, 72, 153, 0.15)', // Softer shadow
          border: '1px solid rgba(236, 72, 153, 0.15)', // Soft border
        }}
        className={isHomePage ? 'animate-float-slow2' : 'animate-float-fast2'}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '35%',
          right: '30%',
          width: 60,
          height: 60,
          borderRadius: '50%',
          backgroundColor: 'rgba(139, 92, 246, 0.2)', // Soft violet
          backdropFilter: 'blur(7px)', // Enhanced blur
          boxShadow: '0 6px 30px rgba(139, 92, 246, 0.15)', // Softer shadow
          border: '1px solid rgba(139, 92, 246, 0.15)', // Soft border
        }}
        className={isHomePage ? 'animate-float-slow3' : 'animate-float-fast3'}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '25%',
          left: '15%',
          width: 55,
          height: 55,
          borderRadius: '8px',
          backgroundColor: 'rgba(245, 158, 11, 0.2)', // Soft amber
          backdropFilter: 'blur(9px)', // Enhanced blur
          boxShadow: '0 5px 20px rgba(245, 158, 11, 0.15)', // Softer shadow
          border: '1px solid rgba(245, 158, 11, 0.15)', // Soft border
        }}
        className={isHomePage ? 'animate-float-slow4' : 'animate-float-fast4'}
      />

      {/* 🧩 Floating Hexagons (SVGs) - Pastel Colors */}
      <svg
        className={`absolute top-1/4 left-1/5 w-16 h-16 ${
          isHomePage ? 'animate-float-hex-slow' : 'animate-float-hex-fast'
        }`}
        viewBox="0 0 100 100"
      >
        <polygon
          points="50,0 93,25 93,75 50,100 7,75 7,25"
          fill="rgba(147, 51, 234, 0.18)" // Soft purple
          stroke="rgba(147, 51, 234, 0.3)" // Soft border
          strokeWidth="1"
          style={{
            filter: 'drop-shadow(0 0 15px rgba(147, 51, 234, 0.2))', // Softer glow
            backdropFilter: 'blur(6px)', // Enhanced blur inside SVG
          }}
        />
      </svg>

      <svg
        className={`absolute top-2/3 right-1/4 w-20 h-20 ${
          isHomePage ? 'animate-float-hex2-slow' : 'animate-float-hex2-fast'
        }`}
        viewBox="0 0 100 100"
      >
        <polygon
          points="50,0 93,25 93,75 50,100 7,75 7,25"
          fill="rgba(16, 185, 129, 0.18)" // Soft emerald
          stroke="rgba(16, 185, 129, 0.3)" // Soft border
          strokeWidth="1"
          style={{
            filter: 'drop-shadow(0 0 18px rgba(16, 185, 129, 0.2))', // Softer glow
            backdropFilter: 'blur(5px)', // Enhanced blur inside SVG
          }}
        />
      </svg>

      <svg
        className={`absolute bottom-1/4 left-1/3 w-12 h-12 ${
          isHomePage ? 'animate-float-hex3-slow' : 'animate-float-hex3-fast'
        }`}
        viewBox="0 0 100 100"
      >
        <polygon
          points="50,0 93,25 93,75 50,100 7,75 7,25"
          fill="rgba(59, 130, 246, 0.15)" // Soft blue
          stroke="rgba(59, 130, 246, 0.25)" // Soft border
          strokeWidth="1"
          style={{
            filter: 'drop-shadow(0 0 16px rgba(59, 130, 246, 0.18))', // Softer glow
            backdropFilter: 'blur(5px)', // Enhanced blur inside SVG
          }}
        />
      </svg>

      {/* ✨ Animation styles */}
      <style>{`
        @keyframes floaty {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          25% { transform: translateY(-12px) translateX(8px) rotate(3deg); }
          50% { transform: translateY(-4px) translateX(-8px) rotate(-3deg); }
          75% { transform: translateY(8px) translateX(4px) rotate(2deg); }
        }
        @keyframes float-rotate {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(10deg); }
          100% { transform: translateY(0) rotate(360deg); }
        }

        /* Regular Shapes */
        .animate-float-slow { animation: floaty 6s ease-in-out infinite; }
        .animate-float-slow2 { animation: floaty 7s ease-in-out infinite; }
        .animate-float-slow3 { animation: floaty 8s ease-in-out infinite; }
        .animate-float-slow4 { animation: floaty 7.5s ease-in-out infinite; }
        .animate-float-fast { animation: floaty 3s ease-in-out infinite; }
        .animate-float-fast2 { animation: floaty 3.5s ease-in-out infinite; }
        .animate-float-fast3 { animation: floaty 4s ease-in-out infinite; }
        .animate-float-fast4 { animation: floaty 3.75s ease-in-out infinite; }

        /* Hexagon Animations */
        .animate-float-hex-slow { animation: float-rotate 10s linear infinite; }
        .animate-float-hex2-slow { animation: float-rotate 12s linear infinite; }
        .animate-float-hex3-slow { animation: float-rotate 11s linear infinite; }
        .animate-float-hex-fast { animation: float-rotate 5s linear infinite; }
        .animate-float-hex2-fast { animation: float-rotate 6s linear infinite; }
        .animate-float-hex3-fast { animation: float-rotate 5.5s linear infinite; }
      `}</style>
    </Box>
  )
}
