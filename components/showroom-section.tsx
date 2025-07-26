"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Maximize, Minimize } from "lucide-react"

export default function ShowroomSection() {
  const showroomRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleFullscreen = async () => {
    if (!containerRef.current) return

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch (error) {
      console.error("Error toggling fullscreen:", error)
    }
  }

  return (
    <section ref={showroomRef} id="showroom" className="py-32 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-6xl md:text-7xl font-thin mb-6">
            Virtual
            <br />
            <span className="font-bold text-red-500">Experience</span>
          </h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Step into our digital showroom and explore the future of smart living through immersive 360° technology
          </p>
        </motion.div>

        <motion.div
          className="relative perspective-1000"
          initial={{ opacity: 0, rotateX: 20 }}
          whileInView={{ opacity: 1, rotateX: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <div
            ref={containerRef}
            className={`relative ${isFullscreen ? "h-screen w-screen" : "h-[70vh]"} rounded-3xl overflow-hidden shadow-2xl transform-gpu bg-black`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              src="/Network.mp4"
              muted
              loop
              autoPlay
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Interactive Hotspots - only show when not fullscreen */}
            {!isFullscreen &&
              [
                { x: "25%", y: "30%", label: "Smart Lighting" },
                { x: "60%", y: "45%", label: "Voice Control" },
                { x: "80%", y: "25%", label: "Security System" },
                { x: "40%", y: "70%", label: "Climate Control" },
              ].map((hotspot, index) => (
                <motion.div
                  key={index}
                  className="absolute w-6 h-6 bg-red-500 rounded-full cursor-pointer shadow-lg z-10"
                  style={{ left: hotspot.x, top: hotspot.y }}
                  animate={{
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(239, 68, 68, 0.7)",
                      "0 0 0 20px rgba(239, 68, 68, 0)",
                      "0 0 0 0 rgba(239, 68, 68, 0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                  whileHover={{ scale: 1.5 }}
                >
                  <motion.div
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0"
                    whileHover={{ opacity: 1 }}
                  >
                    {hotspot.label}
                  </motion.div>
                </motion.div>
              ))}

            {/* Controls - only show center controls when NOT in fullscreen */}
            {!isFullscreen && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-4">
                  {/* Play/Pause Button */}
                  <motion.button
                    onClick={togglePlayPause}
                    className="bg-white/20 backdrop-blur-md rounded-full p-6 hover:bg-white/30 transition-all duration-300 group z-20"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {isPlaying ? (
                      <Pause className="h-12 w-12 text-white group-hover:scale-110 transition-transform" />
                    ) : (
                      <Play className="h-12 w-12 text-white ml-1 group-hover:scale-110 transition-transform" />
                    )}
                  </motion.button>

                  {/* Fullscreen Button */}
                  <motion.button
                    onClick={toggleFullscreen}
                    className="bg-white/20 backdrop-blur-md rounded-full p-6 hover:bg-white/30 transition-all duration-300 group z-20"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.7 }}
                    viewport={{ once: true }}
                  >
                    <Maximize className="h-12 w-12 text-white group-hover:scale-110 transition-transform" />
                  </motion.button>
                </div>
              </div>
            )}

            {/* Fullscreen Controls Bar */}
            {isFullscreen && (
              <motion.div
                className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-md rounded-full px-6 py-3 flex items-center gap-4 z-30 transition-opacity duration-300 ${
                  isHovering ? "opacity-100" : "opacity-0"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isHovering ? 1 : 0, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <button onClick={togglePlayPause} className="text-white hover:text-red-500 transition-colors p-2">
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </button>
                <button onClick={toggleFullscreen} className="text-white hover:text-red-500 transition-colors p-2">
                  <Minimize className="h-6 w-6" />
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
