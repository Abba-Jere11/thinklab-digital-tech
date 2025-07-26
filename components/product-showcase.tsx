"use client"

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useState, useEffect } from "react"

const products = [
  {
    id: 1,
    title: "DeepinViewX Bullet Network Camera",
    description: "Advanced AI-powered surveillance with superior night vision and intelligent analytics",
    image: "/smart.png",
    category: "Network Cameras",
    gradient: "from-blue-600 to-purple-600",
  },
  {
    id: 2,
    title: "WonderHub Interactive Display",
    description: "Touch-enabled smart display for collaborative workspaces and presentations",
    image: "/smart.png",
    category: "Interactive Displays",
    gradient: "from-green-600 to-teal-600",
  },
  {
    id: 3,
    title: "AcuSeek NVRs",
    description: "AI-powered video management with natural language search capabilities",
    image: "/smart.png",
    category: "NVR Systems",
    gradient: "from-red-600 to-orange-600",
  },
  {
    id: 4,
    title: "Pro Series with ColorVu",
    description: "Full-color night vision technology for 24/7 surveillance clarity",
   image: "/smart.png",
    category: "Pro Series",
    gradient: "from-purple-600 to-pink-600",
  },
  {
    id: 5,
    title: "Smart Analytics Platform",
    description: "Real-time video analytics with facial recognition and behavior analysis",
    image: "/smart.png",
    category: "Analytics",
    gradient: "from-indigo-600 to-blue-600",
  },
  {
    id: 6,
    title: "Thermal Imaging Solutions",
    description: "Advanced thermal detection for perimeter protection and fire prevention",
    image: "/smart.png",
    category: "Thermal",
    gradient: "from-orange-600 to-red-600",
  },
]

export function ProductShowcase() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -350, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: "smooth" })
    }
  }

  if (!mounted) return null

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-200/30 to-orange-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-200/20 to-teal-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Animated Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-4 relative">
              Featured Products
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 rounded-full transform scale-x-0 animate-scale-x delay-500"></div>
            </h2>
          </div>
        </div>

        {/* Products Container */}
        <div className="relative">
          {/* Enhanced Scroll Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-4 bg-white/80 backdrop-blur-md rounded-full shadow-xl hover:bg-white hover:shadow-2xl transition-all duration-300 hover:scale-110 group border border-gray-200/50"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-red-500 transition-colors duration-300" />
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-4 bg-white/80 backdrop-blur-md rounded-full shadow-xl hover:bg-white hover:shadow-2xl transition-all duration-300 hover:scale-110 group border border-gray-200/50"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-red-500 transition-colors duration-300" />
          </button>

          {/* Scrollable Products */}
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide pb-6 px-12"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product, index) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-80 h-96 relative group cursor-pointer"
                onMouseEnter={() => setHoveredCard(product.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Main Card */}
                <div className="w-full h-full rounded-3xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-2 relative animate-fade-in-up">
                  {/* Image Container */}
                  <div className="relative w-full h-full overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500`}
                    />

                    {/* Animated Border */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${product.gradient} opacity-0 group-hover:opacity-20 transition-all duration-500`}
                    />
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-3xl transition-all duration-500" />
                  </div>

                  {/* Hover Content */}
                  <div
                    className={`absolute inset-0 flex flex-col justify-end p-6 transform transition-all duration-500 ${
                      hoveredCard === product.id ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${product.gradient} text-white uppercase tracking-wider`}
                        >
                          {product.category}
                        </span>
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                          <ArrowRight className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      <h3 className="text-white text-xl font-bold leading-tight">{product.title}</h3>

                      <p className="text-gray-200 text-sm leading-relaxed">{product.description}</p>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div
                    className={`absolute top-4 right-4 w-3 h-3 bg-gradient-to-r ${product.gradient} rounded-full transition-all duration-500 ${
                      hoveredCard === product.id ? "scale-150 opacity-100" : "scale-100 opacity-60"
                    }`}
                  />

                  <div
                    className={`absolute top-8 right-8 w-2 h-2 bg-white rounded-full transition-all duration-700 ${
                      hoveredCard === product.id ? "scale-200 opacity-80" : "scale-100 opacity-40"
                    }`}
                  />
                </div>

                {/* Reflection Effect */}
                <div className="absolute -bottom-2 left-2 right-2 h-8 bg-gradient-to-b from-black/10 to-transparent rounded-b-3xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Floating Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {products.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-gray-300 transition-all duration-300 hover:bg-red-500"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Floating Action Buttons */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 space-y-4">
        {[
          { icon: "🎯", color: "from-blue-500 to-purple-500" },
          { icon: "📊", color: "from-green-500 to-teal-500" },
          { icon: "🚀", color: "from-red-500 to-orange-500" },
        ].map((item, index) => (
          <button
            key={index}
            className={`w-14 h-14 bg-gradient-to-r ${item.color} rounded-full shadow-lg flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-300 group animate-bounce`}
            style={{
              animationDelay: `${index * 0.2}s`,
              animationDuration: "2s",
            }}
          >
            <span className="text-xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
