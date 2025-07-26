"use client"

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  MapPin,
  Phone,
  Mail,
  Play,
  Shield,
  Zap,
  Home,
  Mic,
  Lightbulb,
  Thermometer,
  ArrowRight,
  Star,
  Users,
  Award,
} from "lucide-react"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import LogoLogin from "@/components/logo-login"
import { ModernNavbar } from "./modern-navbar"
import { ProductShowcase } from "./product-showcase"
import { CoreTechnologies } from "./core-technologies"
import { Newsroom } from "./newsroom"
import ShowroomSection from "./showroom-section"



// Typewriter Text Component - Fixed for hydration
function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText((prev) => prev + text[currentIndex])
          setCurrentIndex((prev) => prev + 1)
        }, 50)
        return () => clearTimeout(timeout)
      }
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [currentIndex, text, delay, isClient])

  // Show full text immediately on server, animate on client
  if (!isClient) {
    return <span>{text}</span>
  }

  return (
    <span>
      {displayText}
      {currentIndex < text.length && (
        <motion.span
          className="inline-block w-0.5 h-6 bg-red-500 ml-1"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
        />
      )}
    </span>
  )
}

export default function DigitechWebsite() {
  const { scrollY, scrollYProgress } = useScroll()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isClient, setIsClient] = useState(false)

  const heroRef = useRef(null)
  const productsRef = useRef(null)
  const showroomRef = useRef(null)
  const automationRef = useRef(null)
  const statsRef = useRef(null)

  // Ensure client-side only
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Advanced scroll transforms
  const heroY = useTransform(scrollY, [0, 1000], [0, -500])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.1])

  const textY = useTransform(scrollY, [0, 1000], [0, -200])
  const backgroundY = useTransform(scrollY, [0, 2000], [0, -1000])

  // Mouse parallax effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 700 }
  const mouseXSpring = useSpring(mouseX, springConfig)
  const mouseYSpring = useSpring(mouseY, springConfig)

  useEffect(() => {
    if (!isClient) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX - innerWidth / 2) / innerWidth
      const y = (clientY - innerHeight / 2) / innerHeight
      mouseX.set(x * 50)
      mouseY.set(y * 50)
      setMousePosition({ x: clientX, y: clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY, isClient])

  // Fixed particle positions to avoid hydration issues
  const particlePositions = [
    { left: 10, top: 15 },
    { left: 85, top: 25 },
    { left: 20, top: 70 },
    { left: 75, top: 80 },
    { left: 45, top: 30 },
    { left: 60, top: 60 },
    { left: 30, top: 45 },
    { left: 90, top: 50 },
    { left: 15, top: 85 },
    { left: 70, top: 20 },
    { left: 40, top: 75 },
    { left: 80, top: 40 },
    { left: 25, top: 55 },
    { left: 55, top: 35 },
    { left: 35, top: 65 },
  ]

  const products = [
    {
      name: "Smart Door Pro",
      tagline: "The future of home security",
      description: "Biometric access control with facial recognition, voice commands, and seamless mobile integration",
      features: ["Facial Recognition", "Voice Control", "Mobile App", "AI Security"],
      image: "/smart.png",
      color: "from-blue-600 to-purple-600",
    },
    {
      name: "Alexa Hub Max",
      tagline: "Your home's command center",
      description: "Central intelligence hub that connects and controls every smart device in your home",
      features: ["Voice AI", "Multi-Device Sync", "Smart Routines", "Learning Algorithm"],
      image: "/smart.png",
      color: "from-emerald-600 to-teal-600",
    },
    {
      name: "Vision AI Camera",
      tagline: "See everything, miss nothing",
      description: "Advanced AI-powered surveillance with real-time threat detection and smart alerts",
      features: ["AI Detection", "4K Night Vision", "Cloud Storage", "Smart Alerts"],
      image: "/smart.png",
      color: "from-orange-600 to-red-600",
    },
    {
      name: "Climate Master",
      tagline: "Perfect comfort, automatically",
      description: "Intelligent HVAC system that learns your preferences and optimizes energy usage",
      features: ["Auto Learning", "Energy Saving", "Zone Control", "Weather Sync"],
      image: "/smart.png",
      color: "from-indigo-600 to-blue-600",
    },
  ]

  const automationSteps = [
    {
      icon: Home,
      title: "Welcome Home",
      description: "Motion sensors detect your arrival and trigger the welcome sequence",
      detail: "Advanced proximity sensors recognize your approach from 50 feet away",
      
    },
    {
      icon: Lightbulb,
      title: "Lights Activate",
      description: "Ambient lighting adjusts to your personal preference and time of day",
      detail: "Circadian rhythm lighting that adapts to your natural sleep cycle",
    },
    {
      icon: Thermometer,
      title: "Climate Adjusts",
      description: "Temperature optimizes for maximum comfort and energy efficiency",
      detail: "AI learns your preferences and pre-cools or pre-heats your home",
    },
    {
      icon: Mic,
      title: "Voice Ready",
      description: "Alexa greets you with personalized daily briefing and updates",
      detail: "Customized news, weather, calendar, and smart home status updates",
    },
    {
      icon: Shield,
      title: "Security Armed",
      description: "System automatically secures your home and activates night mode",
      detail: "Multi-layered security with AI-powered threat detection and response",
    },
  ]

  const stats = [
    { icon: Users, number: "10,000+", label: "Happy Customers" },
    { icon: Home, number: "50,000+", label: "Smart Homes" },
    { icon: Award, number: "25+", label: "Industry Awards" },
    { icon: Star, number: "4.9", label: "Customer Rating" },
  ]

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      {/* Navigation */}
     
      <ModernNavbar/>
      

      {/* Mobile Menu Button */}
      

      {/* Hero Section with Enhanced Animations */}
      <section className="relative z-10 text-center text-white max-w-6xl mx-auto px-6">
        {/* Animated Background Grid */}
        {isClient && (
          <motion.div className="absolute inset-0 opacity-5" style={{ y: backgroundY }}>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)
              `,
                backgroundSize: "50px 50px",
              }}
            />
          </motion.div>
        )}

        {/* Animated Background Shapes - Only render on client */}
        {isClient && (
          <>
            <motion.div
              className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-full opacity-20"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.div
              className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-orange-100 to-red-100 rounded-full opacity-15"
              animate={{
                scale: [1, 0.8, 1.3, 1],
                rotate: [0, -90, -180, -360],
                x: [0, -40, 20, 0],
                y: [0, 40, -20, 0],
              }}
              transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.div
              className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-red-200 to-pink-200 rounded-full opacity-10"
              animate={{
                scale: [1, 1.5, 0.8, 1],
                rotate: [0, 270, 360],
                x: [0, 60, -30, 0],
                y: [0, -50, 30, 0],
              }}
              transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </>
        )}

        {/* Enhanced Floating Elements - Only render on client */}
        {isClient && (
          <>
            <motion.div
              className="absolute top-20 left-20 w-3 h-3 bg-red-500 rounded-full"
              animate={{
                y: [0, -40, 0],
                x: [0, 20, 0],
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.5, 1],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              style={{ x: mouseXSpring, y: mouseYSpring }}
            />
            <motion.div
              className="absolute top-40 right-32 w-2 h-2 bg-orange-400 rounded-full"
              animate={{
                y: [0, -60, 0],
                x: [0, -30, 0],
                opacity: [0.4, 0.9, 0.4],
                scale: [1, 2, 1],
              }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 1, ease: "easeInOut" }}
              style={{ x: mouseXSpring, y: mouseYSpring }}
            />
            <motion.div
              className="absolute bottom-40 left-1/3 w-4 h-4 bg-red-400 rounded-full"
              animate={{
                y: [0, -50, 0],
                x: [0, 40, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.8, 1],
              }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, delay: 2, ease: "easeInOut" }}
              style={{ x: mouseXSpring, y: mouseYSpring }}
            />
            <motion.div
              className="absolute top-1/2 left-10 w-1 h-1 bg-pink-500 rounded-full"
              animate={{
                y: [0, -30, 0],
                x: [0, 50, 0],
                opacity: [0.5, 1, 0.5],
                scale: [1, 3, 1],
              }}
              transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, delay: 0.5, ease: "easeInOut" }}
              style={{ x: mouseXSpring, y: mouseYSpring }}
            />
            <motion.div
              className="absolute bottom-20 right-1/4 w-2 h-2 bg-red-600 rounded-full"
              animate={{
                y: [0, -45, 0],
                x: [0, -25, 0],
                opacity: [0.4, 0.9, 0.4],
                scale: [1, 2.5, 1],
              }}
              transition={{ duration: 4.5, repeat: Number.POSITIVE_INFINITY, delay: 1.5, ease: "easeInOut" }}
              style={{ x: mouseXSpring, y: mouseYSpring }}
            />
          </>
        )}

        {/* Particle System - Only render on client with fixed positions */}
        {isClient &&
          particlePositions.map((position, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-300 rounded-full opacity-30"
              style={{
                left: `${position.left}%`,
                top: `${position.top}%`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, (i % 2 === 0 ? 1 : -1) * 50, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5 + (i % 3) * 0.5, 1],
              }}
              transition={{
                duration: 8 + (i % 5),
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}

        {/* Hero Content with Enhanced Animations */}
        <motion.div
          className="relative z-10 text-center text-black max-w-6xl mx-auto px-4 sm:px-6 "
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        >
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            {/* Animated Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 bg-red-50 border border-red-200 rounded-full px-6 py-2 mb-1 mt-7"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(254, 242, 242, 1)" }}
            >
              {isClient && (
                <motion.div
                  className="w-2 h-2 bg-red-500 rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              )}
              <span className="text-red-600 text-sm font-medium tracking-wider uppercase">Welcome to the Future</span>
            </motion.div>

            {/* Animated Main Title */}
            <div className="mb- sm:mb-2">
               <motion.h1
              className="text-7xl md:text-9xl font-thin mb-8 leading-none"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1 }}
            >
              Smart
              <br />
              <motion.span
                className="font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                Living
              </motion.span>
            </motion.h1>
            </div>

            {/* Animated Subtitle with Typewriter Effect */}
            <motion.div
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 sm:mb-12 text-gray-600 font-light max-w-4xl mx-auto leading-relaxed px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <TypewriterText
                text="Experience the pinnacle of home automation technology in our immersive showroom where innovation meets luxury"
                delay={0.5}
              />
            </motion.div>

            {/* Enhanced Animated Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 3 }}
            >
              <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} className="relative group">
                {isClient && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                )}
                <Button
                  size="lg"
                  className="relative w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl rounded-full shadow-2xl border-2 border-transparent hover:border-red-300 transition-all duration-300"
                >
                  {isClient ? (
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <MapPin className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                    </motion.div>
                  ) : (
                    <MapPin className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                  )}
                  Visit Showroom
                  {isClient ? (
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                    >
                      <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
                    </motion.div>
                  ) : (
                    <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
                  )}
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} className="relative group">
                {isClient && (
                  <motion.div
                    className="absolute inset-0 bg-gray-200 rounded-full opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
                  />
                )}
                <Button
                  size="lg"
                  variant="outline"
                  className="relative w-full sm:w-auto border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl rounded-full bg-transparent transition-all duration-300"
                >
                  {isClient ? (
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Play className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                    </motion.div>
                  ) : (
                    <Play className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                  )}
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Animated Stats */}
            
          </motion.div>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div className="absolute bottom-8 left-1/2 transform -translate-x-1/2" style={{ opacity: heroOpacity }}>
          <motion.div
            className="flex flex-col items-center space-y-2"
            animate={isClient ? { y: [0, 10, 0] } : {}}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            
          </motion.div>
          
        </motion.div>
        <motion.div
              className="w-5 sm:w-8 h-10 sm:h-14 border-2 border-gray-400 rounded-full flex justify-center relative overflow-hidden absolute bottom-3 left-1/2 transform -translate-x-1/2 mt-8"
              whileHover={{ borderColor: "#ef4444", scale: 1.1 }}
            >
              <motion.div
                className="w-1 sm:w-1.5 h-3 sm:h-4 bg-red-500 rounded-full mt-2 sm:mt-3"
                animate={
                  isClient
                    ? {
                        y: [0, 20, 0],
                        opacity: [1, 0.3, 1],
                      }
                    : {}
                }
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>
            <motion.p
              className="text-xs text-gray-500 font-medium "
              animate={isClient ? { opacity: [0.5, 1, 0.5] } : {}}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              Scroll to explore
            </motion.p>

        {/* Animated Corner Decorations - Only render on client */}
        {isClient && (
          <>
            <motion.div
              className="absolute top-10 left-10 w-16 h-16 border-l-2 border-t-2 border-red-200 opacity-30"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 2, delay: 4 }}
            />
            <motion.div
              className="absolute top-10 right-10 w-16 h-16 border-r-2 border-t-2 border-red-200 opacity-30"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 2, delay: 4.2 }}
            />
            <motion.div
              className="absolute bottom-10 left-10 w-16 h-16 border-l-2 border-b-2 border-red-200 opacity-30"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 2, delay: 4.4 }}
            />
            <motion.div
              className="absolute bottom-10 right-10 w-16 h-16 border-r-2 border-b-2 border-red-200 opacity-30"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 2, delay: 4.6 }}
            />
          </>
        )}
      </section>

      <ProductShowcase/>
      <CoreTechnologies/>
      <Newsroom/>

      {/* Product Journey with Sticky Sections */}
      <section id="products" className="relative">
        {products.map((product, index) => (
          <ProductSection key={index} product={product} index={index} />
        ))}
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-32 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-7xl font-thin mb-6">
              Trusted by
              <br />
              <span className="font-bold text-red-500">Thousands</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-red-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <stat.icon className="h-10 w-10 text-red-500" />
                </div>
                <motion.div
                  className="text-5xl md:text-6xl font-bold mb-2 text-red-500"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.div>
                <p className="text-gray-400 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Showroom with 3D Effect */}
      <ShowroomSection />

      {/* Smart Automation Demo */}
      <section ref={automationRef} id="experience" className="py-32 bg-black text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-7xl font-thin mb-6">
              Smart Tech
              <br />
              <span className="font-bold text-red-500">In Motion</span>
            </h2>
            <p className="text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Watch how our integrated ecosystem creates a seamless, intelligent living experience
            </p>
          </motion.div>

          <AutomationDemo steps={automationSteps} />
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-7xl font-thin mb-8">
              Experience It
              <br />
              <span className="font-bold text-red-500">Live</span>
            </h2>
            <p className="text-2xl text-gray-600 mb-16 max-w-3xl mx-auto leading-relaxed">
              Book your private tour and discover how smart technology can transform your lifestyle
            </p>

            <motion.div
              className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8 text-left">
                  {[
                    { icon: Calendar, text: "Choose your preferred date & time" },
                    { icon: MapPin, text: "Visit our premium showroom location" },
                    { icon: Zap, text: "Interactive product demonstrations" },
                    { icon: Users, text: "Personal consultation with experts" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-4"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="bg-red-50 p-3 rounded-full">
                        <item.icon className="h-6 w-6 text-red-500" />
                      </div>
                      <span className="text-lg text-gray-700">{item.text}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-6">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full bg-red-500 hover:bg-red-600 text-white py-6 text-xl rounded-2xl shadow-lg">
                      <Calendar className="mr-3 h-6 w-6" />
                      Schedule Your Visit
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="outline"
                      className="w-full border-2 border-red-500 text-red-500 hover:bg-red-50 py-6 text-xl rounded-2xl bg-transparent"
                    >
                      <Phone className="mr-3 h-6 w-6" />
                      Call Now: (555) 123-4567
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <motion.div
                className="text-3xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <LogoLogin/>
              </motion.div>
              <p className="text-gray-400 text-lg mb-8 max-w-md leading-relaxed">
                Transforming homes with intelligent technology solutions that seamlessly integrate into your lifestyle.
              </p>
              <div className="flex space-x-4">
                {[Phone, Mail].map((Icon, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-gray-400 hover:text-white hover:border-red-500 bg-transparent rounded-full p-3"
                    >
                      <Icon className="h-5 w-5" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>

            {[
              {
                title: "Products",
                links: ["Smart Doors", "Voice Control", "Security Systems", "Climate Control"],
              },
              {
                title: "Services",
                links: ["Installation", "Maintenance", "Support", "Consultation"],
              },
            ].map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-6 text-lg">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li key={linkIndex} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        {link}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">&copy; 2025 Think-Lab Digitech. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Product Section Component with Advanced Animations
function ProductSection({ product, index }: { product: any; index: number }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])
  const rotate = useTransform(scrollYProgress, [0, 1], [5, -5])

  const isEven = index % 2 === 0

  return (
    <div ref={ref} className="h-screen flex items-center justify-center sticky top-0 overflow-hidden">
      <motion.div
        className={`w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
          isEven ? "" : "lg:grid-flow-col-dense"
        }`}
        style={{ opacity, scale }}
      >
        <motion.div className={`space-y-8 ${isEven ? "" : "lg:col-start-2"}`} style={{ y }}>
          <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Badge className={`bg-gradient-to-r ${product.color} text-white px-4 py-2 text-sm mb-4`}>
              New Technology
            </Badge>
            <h3 className="text-5xl md:text-6xl font-thin mb-4">
              {product.name.split(" ")[0]}
              <br />
              <span className="font-bold text-red-500">{product.name.split(" ").slice(1).join(" ")}</span>
            </h3>
            <p className="text-xl text-red-500 mb-6 font-medium">{product.tagline}</p>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">{product.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {product.features.map((feature: string, featureIndex: number) => (
                <motion.div
                  key={featureIndex}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: featureIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="relative overflow-hidden bg-white text-red-600 border-2 border-red-600 font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
              <span className="absolute inset-0 bg-red-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Slide Up</span>
            </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div className={`relative ${isEven ? "" : "lg:col-start-1"}`} style={{ y: y, rotate }}>
          <motion.div
            className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-20`} />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

// Automation Demo Component
function AutomationDemo({ steps }: { steps: any[] }) {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [steps.length])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className={`p-6 rounded-2xl cursor-pointer transition-all duration-500 ${
              activeStep === index
                ? "bg-red-500/20 border-2 border-red-500 shadow-lg"
                : "bg-gray-800/50 border-2 border-transparent hover:bg-gray-800"
            }`}
            onClick={() => setActiveStep(index)}
            whileHover={{ x: 10 }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-start space-x-4">
              <motion.div
                className={`p-4 rounded-full transition-all duration-300 ${
                  activeStep === index ? "bg-red-500 scale-110" : "bg-gray-700"
                }`}
                animate={{ scale: activeStep === index ? 1.1 : 1 }}
              >
                <step.icon className="h-6 w-6" />
              </motion.div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400 mb-2">{step.description}</p>
                <motion.p
                  className="text-sm text-gray-500"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: activeStep === index ? 1 : 0,
                    height: activeStep === index ? "auto" : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {step.detail}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative h-96 md:h-[600px] rounded-3xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Image src="/smart.png" alt="Smart Home Automation" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Animated Progress Bar */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-white/20 rounded-full h-2 mb-4">
            <motion.div
              className="bg-red-500 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-white text-lg font-medium">
            Step {activeStep + 1} of {steps.length}: {steps[activeStep].title}
          </p>
        </div>
      </motion.div>
    </div>
  )
}
