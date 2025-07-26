"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, ChevronRight, Pause, Play, Volume2, VolumeX } from "lucide-react"
import { useState, useEffect, useRef } from "react"

const newsStories = [
  {
    id: 1,
    category: "Success Story",
    title: "Hikvision helps Vialia Vigo Shopping Center boost safety, efficiency and customer satisfaction",
    subtitle: "Retail, Security and Intelligence, Spain",
    description:
      "Discover how advanced AI-powered surveillance systems transformed customer experience and operational efficiency at one of Spain's premier shopping destinations.",
    videoUrl: "/Network.mp4",
    date: "March 15, 2024",
    readTime: "5 min read",
  },
  {
    id: 2,
    category: "Innovation",
    title: "Revolutionary AI Technology Transforms Smart City Infrastructure in Singapore",
    subtitle: "Smart Cities, AI Analytics, Singapore",
    description:
      "Learn how cutting-edge artificial intelligence and IoT integration created a safer, more efficient urban environment for millions of residents.",
    videoUrl: "/Network.mp4",
    date: "March 10, 2024",
    readTime: "7 min read",
  },
  {
    id: 3,
    category: "Case Study",
    title: "Advanced Thermal Imaging Solutions Enhance Industrial Safety Standards",
    subtitle: "Industrial, Thermal Technology, Germany",
    description:
      "Explore how thermal imaging technology revolutionized safety protocols and prevented critical incidents in manufacturing facilities.",
    videoUrl: "/Network.mp4",
    date: "March 5, 2024",
    readTime: "6 min read",
  },
  {
    id: 4,
    category: "Partnership",
    title: "Global Collaboration Brings Next-Gen Security to Educational Institutions",
    subtitle: "Education, Access Control, United States",
    description:
      "See how innovative access control systems and intelligent monitoring created secure learning environments across multiple campuses.",
    videoUrl: "/Network.mp4",
    date: "February 28, 2024",
    readTime: "4 min read",
  },
]

export function Newsroom() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isPlaying && !isHovered && mounted) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % newsStories.length)
      }, 8000) // Increased to 8 seconds to allow video viewing
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, isHovered, mounted])

  // Handle video playback when slide changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      if (videoPlaying) {
        videoRef.current.play().catch(console.error)
      }
    }
  }, [currentSlide, videoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newsStories.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newsStories.length) % newsStories.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play().catch(console.error)
      }
      setVideoPlaying(!videoPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  if (!mounted) return null

  const currentStory = newsStories[currentSlide]

  return (
    <section className="py-20 bg-gray-100 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900">Newsroom</h2>
          <button className="flex items-center text-gray-700 hover:text-red-500 transition-colors duration-300 group">
            <span className="mr-2 text-lg font-medium">View more</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Main News Slider */}
        <div
          className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Video Background */}
          <div className="absolute inset-0">
            <video
              ref={videoRef}
              className="w-full h-full object-cover transition-all duration-1000 transform group-hover:scale-105"
              src={currentStory.videoUrl}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              onLoadedData={() => {
                if (videoRef.current && videoPlaying) {
                  videoRef.current.play().catch(console.error)
                }
              }}
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
            <div className="max-w-4xl">
              {/* Category Badge */}
              <div className="inline-block mb-4">
                <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30">
                  {currentStory.category}
                </span>
              </div>

              {/* Main Title */}
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {currentStory.title}
              </h3>

              {/* Subtitle */}
              <p className="text-xl text-gray-200 mb-6 font-light">{currentStory.subtitle}</p>

              {/* Hover Description */}
              <div
                className={`transition-all duration-500 overflow-hidden ${
                  isHovered ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <p className="text-gray-200 text-lg leading-relaxed mb-4">{currentStory.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-300">
                    <span>{currentStory.date}</span>
                    <span>•</span>
                    <span>{currentStory.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Read More Button (appears on hover) */}
              <div
                className={`transition-all duration-500 ${
                  isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="mt-6 border-2 border-white/50 text-white hover:bg-white hover:text-black transition-all duration-300 px-8 py-3 rounded-full bg-transparent backdrop-blur-sm"
                >
                  Read Full Story
                </Button>
              </div>
            </div>
          </div>

          {/* Video Controls */}
          <div className="absolute top-8 right-8 flex items-center space-x-3">
            {/* Video Play/Pause */}
            <button
              onClick={toggleVideoPlayback}
              className="w-12 h-12 bg-black/30 backdrop-blur-sm hover:bg-black/50 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/20"
            >
              {videoPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-1" />}
            </button>

            {/* Mute/Unmute */}
            <button
              onClick={toggleMute}
              className="w-12 h-12 bg-black/30 backdrop-blur-sm hover:bg-black/50 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/20"
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
            </button>
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-6">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-black/30 backdrop-blur-sm hover:bg-black/50 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/20"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>

            {/* Slide Indicators */}
            <div className="flex space-x-3">
              {newsStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-white scale-125" : "bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-black/30 backdrop-blur-sm hover:bg-black/50 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/20"
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Slideshow Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="absolute bottom-8 right-8 w-12 h-12 bg-black/30 backdrop-blur-sm hover:bg-black/50 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/20"
          >
            {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-1" />}
          </button>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
            <div
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{
                width: isPlaying && !isHovered ? `${((currentSlide + 1) / newsStories.length) * 100}%` : "0%",
              }}
            />
          </div>
        </div>

        {/* News Grid Preview */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsStories.slice(0, 3).map((story, index) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group"
            >
              <div className="relative h-48 overflow-hidden">
                <video
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  src={story.videoUrl}
                  muted
                  loop
                  autoPlay
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {story.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{story.title}</h4>
                <p className="text-gray-600 text-sm mb-4">{story.subtitle}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{story.date}</span>
                  <span>{story.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}