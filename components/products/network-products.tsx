"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  
  Play,
  MessageCircle,
  Home,
  ChevronRightIcon as BreadcrumbChevron,
  Menu,
  Globe,
  User,
  Search,
  ExternalLink,
} from "lucide-react"
import { ModernNavbar } from "../modern-navbar"
import ProductCategories from "./product-categories"
import ProductCatalog from "./product-catalog"

const heroSlides = [
  {
    id: 1,
    title: "Making Pro, More Pro",
    subtitle: "Advanced AI-Powered Solutions",
    description:
      "Experience the next generation of professional tools with cutting-edge AI technology that transforms your security infrastructure.",
    backgroundImage: "/smart.png",
    ctaText: "Explore AI Solutions",
  },
  {
    id: 2,
    title: "Innovation Redefined",
    subtitle: "Smart Security Ecosystem",
    description:
      "Comprehensive security solutions that adapt to your needs with intelligent automation and real-time monitoring capabilities.",
    backgroundImage: "/smart.png",
    ctaText: "Discover Smart Tech",
  },
 
]

export default function ModernHeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const currentHero = heroSlides[currentSlide]

  return (
    <div className="relative">
      {/* Navigation Bar */}
      <ModernNavbar/>

      {/* Hero Carousel */}
      <div
        className="relative h-[70vh] bg-cover bg-center bg-no-repeat transition-all duration-800 ease-in-out overflow-hidden"
        style={{ backgroundImage: `url('${currentHero.backgroundImage}')` }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center pt-20">
          <div className="w-full px-6 lg:px-12">
            <div className="max-w-4xl">
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/30">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    Now Available
                  </div>

                  <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight drop-shadow-lg transition-all duration-700">
                    {currentHero.title}
                  </h1>

                  <div className="space-y-4">
                    <h2 className="text-xl lg:text-3xl font-semibold text-white/90 drop-shadow transition-all duration-700">
                      {currentHero.subtitle}
                    </h2>
                    <p className="text-lg lg:text-xl text-white/80 max-w-2xl leading-relaxed drop-shadow transition-all duration-700">
                      {currentHero.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                  >
                    {currentHero.ctaText}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 bg-transparent text-lg"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Watch Video
                  </Button>
                </div>

                {/* Slide indicators */}
                <div className="flex space-x-3">
                  {heroSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        index === currentSlide ? "bg-white w-12" : "bg-white/50 w-6"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        
      </div>

      {/* Contact Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300">
          <MessageCircle className="w-5 h-5 mr-2" />
          Contact Us
        </Button>
      </div>
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-tr from-cyan-100/30 to-blue-100/30 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-blue-50 rounded-full text-blue-600 font-medium mb-6 border border-blue-100">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></span>
              Innovation & Excellence
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">What we offer</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          {/* Content Grid */}
          <div className="max-w-6xl mx-auto">
            {/* Main Content Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-xl border border-white/20 mb-12">
              <div className="space-y-8">
                {/* First Paragraph */}
                <div className="group">
                  <p className="text-lg lg:text-xl text-gray-700 leading-relaxed transition-all duration-500 group-hover:text-gray-900">
                    It's time to take a step into the future. Whether you're contemplating an upgrade or you want to
                    carry out a fresh install of the entire security system,
                    <span className="font-semibold text-blue-600"> IP is the way to go</span>. Compared with the
                    traditional analog setup, an IP-based system does so much more, like better image quality and higher
                    resolution. Plus it has tons of advanced features, even including
                    <span className="font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      {" "}
                      Artificial Intelligence
                    </span>
                    . And it gets even better - all these can be done with fewer devices and considerably fewer cables.
                  </p>
                </div>

                {/* Feature Highlights */}
                <div className="grid md:grid-cols-2 gap-8 my-12">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100/50">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
                        <span className="text-white font-bold text-xl">IP</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">IP-Based Systems</h3>
                    </div>
                    <p className="text-gray-600">
                      Superior image quality, higher resolution, and advanced features with simplified installation.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100/50">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mr-4">
                        <span className="text-white font-bold text-xl">AI</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Artificial Intelligence</h3>
                    </div>
                    <p className="text-gray-600">
                      Smart recognition, automated analysis, and intelligent monitoring capabilities.
                    </p>
                  </div>
                </div>

                {/* Second Paragraph */}
                <div className="group">
                  <p className="text-lg lg:text-xl text-gray-700 leading-relaxed transition-all duration-500 group-hover:text-gray-900">
                    At Hikvision, we offer a wide array of IP products including
                    <span className="font-semibold text-blue-600"> Network Video Recorders (NVRs)</span>,
                    <span className="font-semibold text-green-600"> PTZ dome cameras</span>,
                    <span className="font-semibold text-purple-600"> panoramic cameras</span>, cameras for special
                    applications and a variety of network transmission equipment and accessories. Designed with the
                    state-of-the-art technology and manufactured to high levels of quality, Hikvision is your
                    one-stop-shop to build a security system that can meet the most complex and demanding requirements.
                  </p>
                </div>

                {/* Deep Learning Section */}
                <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-8 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mr-6">
                        <span className="text-white font-bold text-2xl">DL</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Deep Learning Technology</h3>
                        <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                      </div>
                    </div>

                    <p className="text-lg text-gray-100 leading-relaxed mb-6">
                      Based on Deep Learning technology,{" "}
                      <span className="font-semibold text-blue-300">DeepinView cameras</span> and{" "}
                      <span className="font-semibold text-purple-300">DeepinMind NVRs</span> are among the most advanced
                      products of the family. The built-in Artificial Intelligence allows you to perform tasks such as
                      recognizing people and vehicles, as well as identifying customer interests, and much more.
                    </p>

                    <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                      Explore more about Deep Learning →
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Categories Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">NVR</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Network Video Recorders</h3>
                <p className="text-gray-600">
                  Advanced recording solutions with intelligent storage management and seamless integration.
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">PTZ</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">PTZ Dome Cameras</h3>
                <p className="text-gray-600">
                  Pan-tilt-zoom cameras with precise control and exceptional image quality for comprehensive coverage.
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">360°</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Panoramic Cameras</h3>
                <p className="text-gray-600">
                  Complete 360-degree coverage with advanced stitching technology for seamless monitoring.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

<ProductCategories/>
<ProductCatalog/>

      {/* Bottom Navigation */}
      
    </div>
  )
}
