"use client"

interface MorphOrbProps {
  size?: "sm" | "md" | "lg"
  pulseIntensity?: number
}

export function MorphOrb({ size = "md", pulseIntensity = 1 }: MorphOrbProps) {
  const sizeClasses = {
    sm: { container: "h-[140px] w-[140px]", inner: "h-[90px] w-[90px]", core: "h-[45px] w-[45px]", orbit: "h-2 w-2" },
    md: { container: "h-[180px] w-[180px] sm:h-[200px] sm:w-[200px]", inner: "h-[100px] w-[100px] sm:h-[120px] sm:w-[120px]", core: "h-[50px] w-[50px] sm:h-[60px] sm:w-[60px]", orbit: "h-2.5 w-2.5" },
    lg: { container: "h-[240px] w-[240px]", inner: "h-[150px] w-[150px]", core: "h-[75px] w-[75px]", orbit: "h-3 w-3" },
  }

  const s = sizeClasses[size]

  return (
    <div className={`relative mx-auto my-4 flex items-center justify-center rounded-full sm:my-5 ${s.container}`}>
      {/* Outer glow ring */}
      <div 
        className="absolute inset-[-20px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, transparent 40%, #d1d9e6 70%, transparent 100%)",
          animation: `pulse ${3 / pulseIntensity}s ease-in-out infinite`,
        }}
      />
      
      {/* Orbit line with smooth rotation */}
      <div 
        className="absolute inset-0 rounded-full border border-[#d1d9e6]/60"
        style={{ animation: "spin 20s linear infinite" }}
      >
        <div 
          className={`absolute right-4 top-4 rounded-full bg-[#111111] shadow-[0_0_12px_rgba(17,17,17,0.2)] sm:right-5 sm:top-5 ${s.orbit}`}
          style={{ animation: "pulse 2s ease-in-out infinite" }}
        />
      </div>

      {/* Secondary orbit */}
      <div 
        className="absolute inset-2 rounded-full border border-[#d1d9e6]/30"
        style={{ animation: "spin 30s linear infinite reverse" }}
      >
        <div className="absolute bottom-3 left-3 h-1.5 w-1.5 rounded-full bg-[#666666]/50" />
      </div>
      
      {/* Inner orb container with neumorphic depth */}
      <div className={`z-10 flex items-center justify-center overflow-hidden rounded-full bg-[#f2f2f2] shadow-[inset_6px_6px_12px_#d1d9e6,inset_-6px_-6px_12px_#ffffff] ${s.inner}`}>
        {/* Morphing core */}
        <div 
          className={`bg-[#111111] animate-logo-morph ${s.core}`}
        />
      </div>

      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <div 
          className="absolute h-1 w-1 rounded-full bg-[#111111]/20"
          style={{ 
            top: "20%", 
            left: "15%",
            animation: "float 4s ease-in-out infinite",
          }}
        />
        <div 
          className="absolute h-0.5 w-0.5 rounded-full bg-[#111111]/15"
          style={{ 
            top: "70%", 
            right: "20%",
            animation: "float 5s ease-in-out infinite 1s",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-10px) translateX(5px); opacity: 0.5; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}
