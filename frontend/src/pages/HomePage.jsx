import HeroSection from "@/components/hero-section"
import SplineBackground from "@/components/spline-background"
import { useState } from "react"

function HomePage() {
  const [isDark, setIsDark] = useState(true)

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen text-foreground relative">
        {/* Spline Background */}
        <SplineBackground />
        
        {/* Content Container */}
        <div className="relative z-10 min-h-screen">
          {/* Hero Section Component */}
          <HeroSection />
        </div>
      </div>
    </div>
  )
}

export default HomePage