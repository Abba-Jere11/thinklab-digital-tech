"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Play } from "lucide-react"
import { useEffect, useState } from "react"

export function CleanHero() {
  const [mounted, setMounted] = useState(false)
  const [floatingElements, setFloatingElements] = useState<
    Array<{
      id: number
      x: number
      y: number
      size: number
      color: string
      delay: number
      duration: number
    }>
  >([])

  useEffect(() => {
    setMounted(true)
    // Generate floating elements only on client side
    const elements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      color: ["bg-red-400", "bg-orange-400", "bg-pink-400", "bg-red-300", "bg-orange-300"][
        Math.floor(Math.random() * 5)
      ],
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 4,
    }))
    setFloatingElements(elements)
  }, [])

  if (!mounted) {
    return (
      <div className="h-screen w-full bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0">
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className={`absolute rounded-full ${element.color} opacity-60 animate-float`}
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.size}px`,
              height: `${element.size}px`,
              animationDelay: `${element.delay}s`,
              animationDuration: `${element.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          {/* Welcome badge */}
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center px-6 py-2 bg-red-50 border border-red-200 rounded-full">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
              <span className="text-red-600 font-medium text-sm tracking-wide uppercase">Welcome to the Future</span>
            </div>
          </div>

          {/* Main heading */}
          <div className="space-y-4 animate-fade-in-up delay-300">
            <h1 className="text-7xl md:text-9xl font-light text-gray-900 leading-none tracking-tight">Smart</h1>
            <h1 className="text-7xl md:text-9xl font-light bg-gradient-to-r from-red-500 via-red-400 to-orange-400 bg-clip-text text-transparent leading-none tracking-tight">
              Living
            </h1>
          </div>

          {/* Subtitle */}
          <div className="animate-fade-in-up delay-500">
            <p className="text-2xl md:text-3xl text-gray-600 font-light">Experience</p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-fade-in-up delay-700">
            <Button
              size="lg"
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Visit Showroom
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg bg-transparent"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-fade-in-up delay-1000">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-red-500 rounded-full mt-2 animate-bounce"></div>
          </div>
          <span className="text-gray-500 text-sm font-medium">Scroll to explore</span>
        </div>
      </div>

      {/* Additional floating elements for more visual interest */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-red-400 rounded-full opacity-40 animate-pulse"></div>
      <div className="absolute top-40 right-32 w-6 h-6 bg-orange-400 rounded-full opacity-30 animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-16 w-3 h-3 bg-pink-400 rounded-full opacity-50 animate-pulse delay-500"></div>
      <div className="absolute bottom-60 right-20 w-5 h-5 bg-red-300 rounded-full opacity-40 animate-pulse delay-1500"></div>
    </div>
  )
}
