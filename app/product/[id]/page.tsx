"use client"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Download, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ModernNavbar } from "@/components/modern-navbar"

// Mock product data with detailed specifications
const getProductDetails = (id: string) => ({
  id,
  model: `DS-2CD2687G3T-LIZSY`,
  name: "8 MP Smart Hybrid Light with ColorVu Motorized Varifocal Bullet Network Camera",
  image: "smart.png",
  isNew: true,
  specifications: {
    camera: {
      "Image Sensor": '1/1.8" Progressive Scan CMOS',
      "Max. Resolution": "3840 × 2160",
      "Min. Illumination": "Color: 0.001 Lux @ (F1.2, AGC ON),0 Lux with light",
      "Shutter Time": "1 s to 1/100,000 s",
      "Day & Night": "IR cut filter",
      "Angle Adjustment": "Pan: 0° to 355°,tilt: 0° to 90°,rotate: 0° to 360°",
    },
    lens: {
      "Lens Type": "Varifocal lens, motorized lens, 2.8 to 12 mm",
      "Focal Length & FOV":
        "2.8 to 12 mm, horizontal FOV 112.3° to 41.2°, vertical FOV 58.1° to 23.1°, diagonal FOV 137.4° to 47.3°",
      "Lens Mount": "Integrated",
      "Iris Type": "Fixed",
      Aperture: "F1.2",
      "Depth Of Field": "1 m to ∞",
    },
    dori: {
      DORI: "Wide: D: 89.2 m, O: 35.4 m, R: 17.8 m, I: 8.9 m\nTele: D: 220.0 m, O: 87.3 m, R: 44.0 m, I: 22.0 m",
    },
    illuminator: {
      "Supplement Light Type": "White Light",
      "Illumination Distance": "Up to 40 m",
      Wavelength: "White Light",
    },
    video: {
      "Video Compression": "H.265+/H.265/H.264+/H.264",
      "Video Bitrate": "32 Kbps to 16 Mbps",
      "Max. Resolution": "3840 × 2160",
      "Frame Rate": "Max. 25/30 fps",
    },
    audio: {
      "Audio Compression": "G.722.1/G.711ulaw/G.711alaw/MP2L2/G.726/AAC",
      "Audio Bitrate": "64 Kbps (G.711)/16 Kbps (G.726)/16 Kbps to 128 Kbps (AAC)",
      "Audio Input": "1-ch, line in",
      "Audio Output": "1-ch, line out",
    },
    network: {
      "Network Storage": "NAS (NFS,SMB/CIFS), ANR",
      Protocols:
        "TCP/IP, ICMP, HTTP, HTTPS, FTP, DHCP, DNS, DDNS, RTP, RTSP, RTCP, PPPoE, NTP, UPnP, SMTP, SNMP, IGMP, 802.1X, QoS, IPv6, UDP, Bonjour",
      "General Function":
        "One-key reset, anti-flicker, heartbeat, mirror, privacy masks, flash log, password reset via e-mail, pixel counter",
      API: "Open Network Video Interface (ONVIF 2.6), ISAPI, SDK",
    },
    image: {
      "Image Enhancement": "BLC, HLC, 3D DNR",
      "White Balance": "Auto, manual, auto-tracking, sodium lamp, outdoor, day, night",
      "Gain Control": "Auto, manual",
      "Noise Reduction": "3D DNR",
    },
    interface: {
      "Communication Interface": "1 RJ45 10M/100M/1000M Ethernet",
      "On-board Storage": "Built-in micro SD/SDHC/SDXC slot, up to 512 GB",
      "Reset Button": "Yes",
      "External Interface": "1 audio input, 1 audio output, 1 alarm input, 1 alarm output",
    },
    event: {
      "Basic Event": "Motion detection, video tampering alarm, exception",
      "Smart Event":
        "Line crossing detection, intrusion detection, region entrance detection, region exiting detection",
      "Linkage Method": "Upload to FTP/NAS/Email, notify surveillance center, trigger channel, smart tracking",
    },
    deepLearning: {
      "Deep Learning Function":
        "Person/vehicle classification, face detection, perimeter protection, smart supplement light",
    },
    general: {
      "Operating Conditions": "-30 °C to 60 °C (-22 °F to 140 °F), humidity 95% or less (non-condensing)",
      "Storage Conditions": "-30 °C to 60 °C (-22 °F to 140 °F), humidity 95% or less (non-condensing)",
      "Power Supply": "12 VDC ± 25%, PoE+ (802.3at, class 4)",
      "Power Consumption": "Max. 25 W",
    },
    approval: {
      Certifications: "CE, FCC, UL",
      "Protection Level": "IP67",
      "Vandal Resistance": "IK10",
    },
  },
  resources: {
    technicalDocuments: [
      { name: "Data Sheet", filename: "DS-2CD2687G3T-LIZSY_datasheet.pdf" },
      { name: "User Manual", filename: "DS-2CD2687G3T-LIZSY_manual.pdf" },
      { name: "Quick Start Guide", filename: "DS-2CD2687G3T-LIZSY_quickstart.pdf" },
    ],
    firmware: [
      {
        name: "Firmware_V5.8.10_250605",
        filename: "firmware_v5.8.10.bin",
        note: "For better user experience, we highly recommend you to update your device to the latest firmware asap.",
      },
      {
        name: "Network Camera-V5.8.10_SP5 Release Note-H13 I",
        filename: "release_notes_v5.8.10.pdf",
        appliedTo: ["DS-2CD2687G3T-LIZSY(2.8-12mm)", "DS-2CD2687G3T-LIZSY(2.8-12mm)O-STD/BLACK"],
      },
    ],
  },
  accessories: [
    {
      id: "acc1",
      model: "DS-1260ZJ",
      name: "Junction box",
      image: "smart.png",
      isNew: false,
    },
    {
      id: "acc2",
      model: "DS-1275ZJ-S-SUS",
      name: "Vertical pole mount",
      image: "smart.png",
      isNew: true,
    },
    {
      id: "acc3",
      model: "DS-1275ZJ-SUS",
      name: "Vertical pole mount",
      image: "smart.png",
      isNew: false,
    },
    {
      id: "acc4",
      model: "DS-1276ZJ-SUS",
      name: "Corner mount",
      image: "smart.png",
      isNew: false,
    },
    {
      id: "acc5",
      model: "DS-1280ZJ-S",
      name: "Junction box",
      image: "smart.png",
      isNew: false,
    },
  ],
})

export default function ProductDetail() {
  const params = useParams()
  const [activeSection, setActiveSection] = useState("specifications")
  const [activeSpecSection, setActiveSpecSection] = useState("camera")
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([])

  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})
  const specSectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  const product = getProductDetails(params.id as string)

  const mainSections = [
    { id: "specifications", label: "Specification" },
    { id: "resources", label: "Resources" },
    { id: "accessories", label: "Accessories" },
  ]

  const specSections = [
    { id: "camera", label: "Camera" },
    { id: "lens", label: "Lens" },
    { id: "dori", label: "DORI" },
    { id: "illuminator", label: "Illuminator" },
    { id: "video", label: "Video" },
    { id: "audio", label: "Audio" },
    { id: "network", label: "Network" },
    { id: "image", label: "Image" },
    { id: "interface", label: "Interface" },
    { id: "event", label: "Event" },
    { id: "deepLearning", label: "Deep Learning Function" },
    { id: "general", label: "General" },
    { id: "approval", label: "Approval" },
  ]

  // Scroll spy effect for main sections
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      // Check main sections
      for (const section of mainSections) {
        const element = sectionRefs.current[section.id]
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }

      // Check spec sections when in specifications
      if (activeSection === "specifications") {
        for (const section of specSections) {
          const element = specSectionRefs.current[section.id]
          if (element) {
            const { offsetTop, offsetHeight } = element
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSpecSection(section.id)
              break
            }
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeSection])

  const handleDownload = (filename: string) => {
    // Create a mock PDF download
    const link = document.createElement("a")
    link.href = `data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVGl0bGUgKCR7ZmlsZW5hbWV9KQovQ3JlYXRvciAoTW9jayBQREYgR2VuZXJhdG9yKQovUHJvZHVjZXIgKE1vY2sgUERGIEdlbmVyYXRvcikKL0NyZWF0aW9uRGF0ZSAoRDoyMDI0MDEwMTEyMDAwMFopCj4+CmVuZG9iago0IDAgb2JqCjw8Ci9UeXBlIC9DYXRhbG9nCi9QYWdlcyAyIDAgUgo+PgplbmRvYmoKMiAwIG9iago8PAovVHlwZSAvUGFnZXMKL0tpZHMgWzMgMCBSXQovQ291bnQgMQo+PgplbmRvYmoKMyAwIG9iago8PAovVHlwZSAvUGFnZQovUGFyZW50IDIgMCBSCi9NZWRpYUJveCBbMCAwIDYxMiA3OTJdCj4+CmVuZG9iagp4cmVmCjAgNQowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwMDIwOCAwMDAwMCBuIAowMDAwMDAwMjY1IDAwMDAwIG4gCjAwMDAwMDAxNTggMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSA1Ci9Sb290IDQgMCBSCj4+CnN0YXJ0eHJlZgozMzQKJSVFT0Y=`
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleAccessorySelect = (accessoryId: string) => {
    setSelectedAccessories((prev) =>
      prev.includes(accessoryId) ? prev.filter((id) => id !== accessoryId) : [...prev, accessoryId],
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
     <ModernNavbar/>

      <div className="container mx-auto px-4 py-8">
        {/* Product Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3">
              <div className="relative">
                {product.isNew && (
                  <span className="absolute -top-2 -left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded transform -rotate-12 z-10">
                    NEW
                  </span>
                )}
                <Image
                  src={`/${product.image}`}
                  alt={product.model}
                  width={400}
                  height={300}
                  className="object-contain w-full"
                />
              </div>
            </div>
            <div className="lg:w-2/3">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.model}</h1>
              <p className="text-lg text-gray-600 mb-6">{product.name}</p>

              {/* Main Navigation Tabs */}
              <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                {mainSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      setActiveSection(section.id)
                      sectionRefs.current[section.id]?.scrollIntoView({ behavior: "smooth" })
                    }}
                    className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                      activeSection === section.id
                        ? "bg-red-500 text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white"
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="flex gap-8">
          {/* Sidebar - Only show for specifications */}
          {activeSection === "specifications" && (
            <div className="w-80 bg-white rounded-lg shadow-sm p-6 h-fit sticky top-8">
              <nav className="space-y-2">
                {specSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      setActiveSpecSection(section.id)
                      specSectionRefs.current[section.id]?.scrollIntoView({ behavior: "smooth" })
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeSpecSection === section.id
                        ? "bg-red-50 text-red-600 border-l-4 border-red-500 font-medium"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center">
                      {activeSpecSection === section.id && <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>}
                      {section.label}
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Specifications Section */}
            <section ref={(el) => (sectionRefs.current.specifications = el)} className="mb-16">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Specification</h2>

                {specSections.map((section) => (
                  <div key={section.id} ref={(el) => (specSectionRefs.current[section.id] = el)} className="mb-12">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">{section.label}</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <tbody>
                          {Object.entries(
                            product.specifications[section.id as keyof typeof product.specifications] || {},
                          ).map(([key, value]) => (
                            <tr key={key} className="border-b border-gray-100">
                              <td className="py-4 px-4 bg-gray-50 font-medium text-gray-700 w-1/3">{key}</td>
                              <td className="py-4 px-4 text-gray-900 whitespace-pre-line">{value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Resources Section */}
            <section ref={(el) => (sectionRefs.current.resources = el)} className="mb-16">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Resources</h2>

                {/* Technical Documents */}
                <div className="mb-8">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Technical documents</h3>
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  </div>

                  <div className="space-y-4">
                    {product.resources.technicalDocuments.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-700">{doc.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownload(doc.filename)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Firmware */}
                <div className="mb-8">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold text-gray-900">Firmware</h3>
                      <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">i</span>
                      </div>
                    </div>
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    For better user experience, we highly recommend you to update your device to the latest firmware
                    asap.
                  </p>

                  <div className="space-y-4">
                    {product.resources.firmware.map((firmware, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between py-3">
                          <span className="text-gray-700">{firmware.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownload(firmware.filename)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                        {firmware.appliedTo && (
                          <div className="text-sm text-gray-500 pl-4">
                            <span className="font-medium">Applied to: </span>
                            {firmware.appliedTo.join(", ")}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Accessories Section */}
            <section ref={(el) => (sectionRefs.current.accessories = el)} className="mb-16">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Accessories</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {product.accessories.map((accessory) => (
                    <div
                      key={accessory.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      {accessory.isNew && (
                        <div className="mb-4">
                          <span className="inline-block bg-red-500 text-white text-xs font-bold px-2 py-1 rounded transform -rotate-12">
                            NEW
                          </span>
                        </div>
                      )}

                      <div className="mb-4 flex justify-center">
                        <Image
                          src={`/${accessory.image}`}
                          alt={accessory.model}
                          width={120}
                          height={90}
                          className="object-contain"
                        />
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-bold text-lg text-gray-900">{accessory.model}</h3>
                        <p className="text-gray-600 text-sm">{accessory.name}</p>

                        <div className="flex items-center space-x-2 pt-2">
                          <Checkbox
                            id={`accessory-${accessory.id}`}
                            checked={selectedAccessories.includes(accessory.id)}
                            onCheckedChange={() => handleAccessorySelect(accessory.id)}
                          />
                          <label
                            htmlFor={`accessory-${accessory.id}`}
                            className="text-sm font-medium text-gray-700 cursor-pointer"
                          >
                            Compare
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
