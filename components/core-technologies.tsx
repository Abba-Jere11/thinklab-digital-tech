"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

const technologies = [
  {
    id: 1,
    title: "Guanlan Large-Scale AI Models",
    description:
      "Hikvision's suite of large AI models to revolutionize the AIoT technology ecosystem. These pre-trained machine learning engines leverage deep industry knowledge to excel in computer vision, multidimensional perception, and multimodal fusion.",
    image: "/smart.png",
    color: "blue",
  },
  {
    id: 2,
    title: "ColorVu Technology",
    description:
      "Revolutionary full-color night vision technology that captures vivid, colorful images 24/7. Advanced sensor technology and intelligent algorithms deliver exceptional image quality in complete darkness.",
    image: "/smart.png",
    color: "purple",
  },
  {
    id: 3,
    title: "AcuSense Intelligence",
    description:
      "Advanced AI-powered analytics that distinguish between humans, vehicles, and other objects with remarkable accuracy. Reduce false alarms and focus on what matters most with intelligent detection algorithms.",
    image: "/smart.png",
    color: "green",
  },
  {
    id: 4,
    title: "DarkFighter Technology",
    description:
      "Ultra-low light imaging technology that delivers clear, detailed images in challenging lighting conditions. Advanced sensor design and noise reduction algorithms ensure superior performance.",
    image: "/smart.png",
    color: "orange",
  },
]

const visualColors = {
  blue: {
    gradient: "from-blue-600/80 via-cyan-500/60 to-blue-400/40",
    glow: "shadow-blue-500/50",
    particles: "bg-blue-400",
    overlay: "from-blue-900/60 via-blue-800/40 to-transparent",
  },
  purple: {
    gradient: "from-purple-600/80 via-pink-500/60 to-purple-400/40",
    glow: "shadow-purple-500/50",
    particles: "bg-purple-400",
    overlay: "from-purple-900/60 via-purple-800/40 to-transparent",
  },
  green: {
    gradient: "from-green-600/80 via-emerald-500/60 to-green-400/40",
    glow: "shadow-green-500/50",
    particles: "bg-green-400",
    overlay: "from-green-900/60 via-green-800/40 to-transparent",
  },
  orange: {
    gradient: "from-orange-600/80 via-red-500/60 to-orange-400/40",
    glow: "shadow-orange-500/50",
    particles: "bg-orange-400",
    overlay: "from-orange-900/60 via-orange-800/40 to-transparent",
  },
}

export function CoreTechnologies() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [particles, setParticles] = useState<Array<{ x: number; y: number; delay: number; size: number }>>([])

  useEffect(() => {
    setMounted(true)
    // Generate particles for visual effects
    const newParticles = Array.from({ length: 25 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      size: Math.random() * 4 + 2,
    }))
    setParticles(newParticles)
  }, [])

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev + 1) % technologies.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev - 1 + technologies.length) % technologies.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return
    setIsTransitioning(true)
    setCurrentSlide(index)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  if (!mounted) return null

  const currentTech = technologies[currentSlide]
  const colorScheme = visualColors[currentTech.color as keyof typeof visualColors]

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white">Core Technologies</h2>
          <button className="flex items-center text-white hover:text-blue-400 transition-colors duration-300 group">
            <span className="mr-2 text-lg">View more</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[500px]">
          {/* Visual Side with Background Image */}
          <div className="relative">
            <div className="relative w-full h-96 bg-gradient-to-br from-slate-900 via-blue-900/50 to-black rounded-3xl overflow-hidden">
              {/* Background Image */}
              <div
                className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${isTransitioning ? "scale-110 opacity-0" : "scale-100 opacity-100"}`}
                style={{
                  backgroundImage: `url(${currentTech.image})`,
                }}
              />

              {/* Color Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${colorScheme.overlay} transition-all duration-700`}
              />

              {/* Animated particles overlay */}
              <div className="absolute inset-0">
                {particles.map((particle, i) => (
                  <div
                    key={i}
                    className={`absolute ${colorScheme.particles} rounded-full opacity-60 animate-float`}
                    style={{
                      left: `${particle.x}%`,
                      top: `${particle.y}%`,
                      width: `${particle.size}px`,
                      height: `${particle.size}px`,
                      animationDelay: `${particle.delay}s`,
                      animationDuration: `${3 + Math.random() * 2}s`,
                    }}
                  />
                ))}

                {/* Dot matrix pattern */}
                <div className="absolute bottom-0 left-0 w-full h-32 opacity-30">
                  <div className="grid grid-cols-12 gap-2 p-4">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-1 bg-white rounded-full animate-pulse"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Glowing border effect */}
                <div
                  className={`absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r ${colorScheme.gradient} opacity-30`}
                  style={{
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "xor",
                  }}
                />
              </div>

              {/* Floating tech elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Central glowing element */}
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${colorScheme.gradient} rounded-full shadow-2xl ${colorScheme.glow} animate-pulse`}
                    style={{
                      boxShadow: `0 0 60px ${currentTech.color === "blue" ? "#3b82f6" : currentTech.color === "purple" ? "#a855f7" : currentTech.color === "green" ? "#10b981" : "#f97316"}60`,
                    }}
                  >
                    <div className="absolute inset-2 bg-white/30 rounded-full animate-ping" />
                  </div>

                  {/* Orbiting elements */}
                  <div className="absolute inset-0 animate-spin" style={{ animationDuration: "15s" }}>
                    <div
                      className={`absolute -top-12 left-1/2 w-3 h-3 ${colorScheme.particles} rounded-full transform -translate-x-1/2`}
                    />
                    <div
                      className={`absolute top-1/2 -right-12 w-2 h-2 ${colorScheme.particles} rounded-full transform -translate-y-1/2`}
                    />
                    <div
                      className={`absolute -bottom-12 left-1/2 w-3 h-3 ${colorScheme.particles} rounded-full transform -translate-x-1/2`}
                    />
                    <div
                      className={`absolute top-1/2 -left-12 w-2 h-2 ${colorScheme.particles} rounded-full transform -translate-y-1/2`}
                    />
                  </div>
                </div>
              </div>

              {/* Technology name overlay */}
              <div className="absolute bottom-8 left-8">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
                  <h3 className="text-2xl font-bold text-white tracking-wider">{currentTech.title.split(" ")[0]}</h3>
                </div>
              </div>

              {/* Slide transition overlay */}
              <div
                className={`absolute inset-0 bg-black transition-opacity duration-300 ${isTransitioning ? "opacity-30" : "opacity-0"}`}
              />
            </div>
          </div>

          {/* Content Side */}
          <div
            className={`space-y-8 transition-all duration-500 ${isTransitioning ? "opacity-0 translate-x-8" : "opacity-100 translate-x-0"}`}
          >
            <div>
              <h3 className="text-4xl font-bold text-white mb-6 leading-tight">{currentTech.title}</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">{currentTech.description}</p>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 px-8 py-3 rounded-full bg-transparent hover:scale-105"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center mt-16 space-x-8">
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>

          <div className="flex space-x-3">
            {technologies.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`w-3 h-3 rounded-full transition-all duration-300 disabled:cursor-not-allowed ${
                  index === currentSlide ? "bg-white scale-125" : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Enhanced Floating Action Buttons */}
    
    </section>
  )
}
