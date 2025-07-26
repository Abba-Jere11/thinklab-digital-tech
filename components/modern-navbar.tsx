"use client"

import { ChevronDown, ExternalLink, Globe, Menu, Search, User } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import LogoLogin from "./logo-login"

// Sample data structure - replace with your actual content
const navigationData = {
  products: {
    categories: [
      {
        title: "Smart Cameras",
        link: "/products",
        items: [
          "Turbo HD Products",
          "Access Control",
          "Video Intercom",
          "Speed Gates and Turnstiles",
          "Alarm",
          "LED Displays",
          "Interactive Flat Panel Displays",
          "Display and Control",
          "Networking",
          "Thermal",
          "Parking Management",
          "Intelligent Traffic",
          "Portable Products",
          "Onboard Security",
          "Security Inspection",
          "Audio and Sensing",
          "Radar",
          "Premises Distribution System",
        ],
      },
      {
        title: "Smart Locks",
        link: "/products/network-cameras",
        items: [
          "Pro Series",
          "Pro Series with AcuSense",
          "Pro Series with ColorVu 3.0",
          "DeepinView Series",
          "Panoramic Series",
          "Special Series",
          "Ultra Series",
          "Cable-Free Series",
          "Solar-powered Series",
          "PT Series",
          "Value Series",
        ],
      },
      {
        title: "PTZ Cameras",
        link: "/products/ptz-cameras",
        items: ["Tandemvu PTZ Cameras", "Ultra Series", "Pro Series", "Value Series", "Special Series"],
      },
      {
        title: "Specialized Solutions",
        link: "/products/specialized-solutions",
        items: [
          "Explosion-Proof Series",
          "Anti-Corrosion Series",
          "Accessories",
          "General Purpose Server",
          "VMS Servers",
          "Hybrid SAN",
          "Cluster Storage",
          "PoE Kits",
          "Wi-Fi Kits",
        ],
      },
    ],
  },
  solutions: {
    categories: [
      {
        title: "Solutions by Industry",
        link: "/solutions/by-industry",
        items: [
          "Buildings",
          "Chemical Industry",
          "Education",
          "Hospitals",
          "Logistics",
          "Industrial Park",
          "Mining",
          "Oil & Gas",
          "Power & Utilities",
          "Retail",
        ],
      },
      {
        title: "Solutions by Scenario",
        link: "/solutions/by-scenario",
        items: [
          "Apartments",
          "Bus Stop",
          "Car Dealerships",
          "Classroom Hub",
          "Conference Rooms",
          "Construction Site",
          "Electrical Substations",
          "Factories",
          "Supermarkets",
          "Gas Stations",
        ],
      },
      {
        title: "Solutions by Function",
        link: "/solutions/by-function",
        items: [
          "Advanced Driving Assistance",
          "Access Control",
          "AR Live Interaction",
          "Course Recording",
          "Distance Learning",
          "Dock Management",
          "Entrance & Exit Management",
          "Incident Detection",
          "Industrial Thermography",
          "Remote Audit",
        ],
      },
      {
        title: "Small & Medium Business",
        link: "/solutions/small-medium-business",
        items: ["Small Offices", "Stores", "Houses", "Farms"],
      },
    ],
  },
  technologies: {
    categories: [
      {
        title: "AI & Analytics",
        link: "/technologies/ai-analytics",
        items: [
          "Deep Learning",
          "Computer Vision",
          "Facial Recognition",
          "Behavior Analysis",
          "Object Detection",
          "License Plate Recognition",
          "People Counting",
          "Heat Mapping",
          "Crowd Analysis",
          "Perimeter Protection",
        ],
      },
      {
        title: "Video Technologies",
        link: "/technologies/video-technologies",
        items: [
          "4K Ultra HD",
          "ColorVu Technology",
          "DarkFighter",
          "WDR Pro",
          "Smart IR",
          "Panoramic Imaging",
          "Thermal Imaging",
          "Multi-Sensor",
          "Light Fighter",
          "Ultra Low Light",
        ],
      },
      {
        title: "Network & Storage",
        link: "/technologies/network-storage",
        items: [
          "H.265+ Compression",
          "Cloud Storage",
          "Edge Storage",
          "Network Optimization",
          "Bandwidth Management",
          "Video Streaming",
          "Data Encryption",
          "Cybersecurity",
          "Network Protocols",
          "Redundancy Systems",
        ],
      },
      {
        title: "Integration & APIs",
        link: "/technologies/integration-apis",
        items: [
          "Open Platform",
          "SDK Development",
          "API Integration",
          "Third-party Integration",
          "Mobile Applications",
          "Web Services",
          "Cloud APIs",
          "Webhook Support",
        ],
      },
    ],
  },
}

export function ModernNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center mb-2 ">
            <LogoLogin/>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-10 px-4 py-2 text-sm font-medium">Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[800px] p-6">
                    <div className="grid grid-cols-4 gap-6">
                      {navigationData.products.categories.map((category, index) => (
                        <div key={index} className="space-y-3">
                          <Link href={category.link}>
                            <h3 className="font-semibold text-sm text-gray-900 border-b border-gray-200 pb-2 hover:text-red-600 transition-colors cursor-pointer">
                              {category.title}
                            </h3>
                          </Link>
                          <ul className="space-y-2">
                            {category.items.slice(0, 8).map((item, itemIndex) => (
                              <li key={itemIndex}>
                                <span className="block text-sm text-gray-600">
                                  {item}
                                </span>
                              </li>
                            ))}
                            {category.items.length > 8 && (
                              <li>
                                <Link href="#" className="text-sm text-red-600 hover:text-red-700 font-medium">
                                  View All →
                                </Link>
                              </li>
                            )}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-10 px-4 py-2 text-sm font-medium">Solutions</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[800px] p-6">
                    <div className="grid grid-cols-4 gap-6">
                      {navigationData.solutions.categories.map((category, index) => (
                        <div key={index} className="space-y-3">
                          <Link href={category.link}>
                            <h3 className="font-semibold text-sm text-gray-900 border-b border-gray-200 pb-2 hover:text-red-600 transition-colors cursor-pointer">
                              {category.title}
                            </h3>
                          </Link>
                          <ul className="space-y-2">
                            {category.items.map((item, itemIndex) => (
                              <li key={itemIndex}>
                                <span className="block text-sm text-gray-600">
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-10 px-4 py-2 text-sm font-medium">
                  Technologies
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[800px] p-6">
                    <div className="grid grid-cols-4 gap-6">
                      {navigationData.technologies.categories.map((category, index) => (
                        <div key={index} className="space-y-3">
                          <Link href={category.link}>
                            <h3 className="font-semibold text-sm text-gray-900 border-b border-gray-200 pb-2 hover:text-red-600 transition-colors cursor-pointer">
                              {category.title}
                            </h3>
                          </Link>
                          <ul className="space-y-2">
                            {category.items.map((item, itemIndex) => (
                              <li key={itemIndex}>
                                <span className="block text-sm text-gray-600">
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="#"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    Support
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="#"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    Commercial Display
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right side utilities */}
          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-1">
              <Globe className="h-4 w-4" />
              <span className="text-xs">Global EN</span>
              <ChevronDown className="h-3 w-3" />
            </Button>

            {/* User Account */}
            <Button variant="ghost" size="sm" className="hidden md:flex">
              
            </Button>

            {/* Search */}
            <Button variant="ghost" size="sm">
              
            </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-6">
                  <div className="space-y-2">
                    <Link href={navigationData.products.categories[0].link}>
                      <h3 className="font-semibold text-lg hover:text-red-600 transition-colors cursor-pointer">Products</h3>
                    </Link>
                    <div className="pl-4 space-y-1">
                      {navigationData.products.categories[0].items.slice(0, 5).map((item, index) => (
                        <span
                          key={index}
                          className="block py-1 text-sm text-gray-600"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Link href={navigationData.solutions.categories[0].link}>
                      <h3 className="font-semibold text-lg hover:text-red-600 transition-colors cursor-pointer">Solutions</h3>
                    </Link>
                    <div className="pl-4 space-y-1">
                      {navigationData.solutions.categories[0].items.slice(0, 5).map((item, index) => (
                        <span
                          key={index}
                          className="block py-1 text-sm text-gray-600"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Link href={navigationData.technologies.categories[0].link}>
                      <h3 className="font-semibold text-lg hover:text-red-600 transition-colors cursor-pointer">Technologies</h3>
                    </Link>
                    <div className="pl-4 space-y-1">
                      {navigationData.technologies.categories[0].items.slice(0, 5).map((item, index) => (
                        <span
                          key={index}
                          className="block py-1 text-sm text-gray-600"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link href="#" className="block py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>
                    Support
                  </Link>

                  <Link
                    href="#"
                    className="block py-2 font-medium flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Commercial Display
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}