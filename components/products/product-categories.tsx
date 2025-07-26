import { Button } from "@/components/ui/button"

export default function ProductCategories() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 left-10 w-32 h-32 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 right-10 w-32 h-32 bg-gradient-to-tr from-cyan-100/40 to-blue-100/40 rounded-full blur-2xl"></div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gray-50 rounded-full text-gray-600 font-medium mb-6 border border-gray-100">
            <span className="w-2 h-2 bg-gray-500 rounded-full mr-3 animate-pulse"></span>
            Our Solutions
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">Product categories</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-600 to-gray-800 mx-auto rounded-full"></div>
        </div>
        {/* Product Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Network Camera */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group overflow-hidden relative h-48">
              <div className="absolute inset-0 flex">
                <div className="w-1/3 flex items-center justify-center">
                  <img
                    src="/smart.png"
                    alt="Network Camera"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
                    Network Camera
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Designed for diverse needs from video security to business intelligence
                  </p>
                </div>
              </div>
            </div>
            {/* Network Video Recorder */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group overflow-hidden relative h-48">
              <div className="absolute inset-0 flex">
                <div className="w-1/3 flex items-center justify-center">
                  <img
                    src="/smart.png"
                    alt="Network Video Recorder"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
                    Network Video Recorder
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Centralize data management with video streams from varied edge devices
                  </p>
                </div>
              </div>
            </div>
            {/* PTZ Camera */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group overflow-hidden relative h-48">
              <div className="absolute inset-0 flex">
                <div className="w-1/3 flex items-center justify-center">
                  <img
                    src="/smart.png"
                    alt="PTZ Camera"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
                    PTZ Camera
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Get wide coverage and pan, tilt and zoom effortlessly for close-up views
                  </p>
                </div>
              </div>
            </div>
            {/* Explosion Proof & Anti-Corrosion */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group overflow-hidden relative h-48">
              <div className="absolute inset-0 flex">
                <div className="w-1/3 flex items-center justify-center">
                  <img
                    src="/smart.png"
                    alt="Explosion Proof Camera"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
                    Explosion Proof & Anti-Corrosion...
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Designed for reliable performance in hazardous and extreme environments
                  </p>
                </div>
              </div>
            </div>
            {/* Storage */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group overflow-hidden relative h-48">
              <div className="absolute inset-0 flex">
                <div className="w-1/3 flex items-center justify-center">
                  <img
                    src="/smart.png"
                    alt="Storage System"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
                    Storage
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Professional storage products for secure and sustainable data applications
                  </p>
                </div>
              </div>
            </div>
            {/* Data Center */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group overflow-hidden relative h-48">
              <div className="absolute inset-0 flex">
                <div className="w-1/3 flex items-center justify-center">
                  <img
                    src="/smart.png"
                    alt="Data Center Equipment"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
                    Data Center
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Transform raw security data into information that assists decision-making
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* View All Products Button */}
          <div className="text-center mt-16">
            <Button className="relative overflow-hidden bg-white text-red-600 border-2 border-red-600 font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
              <span className="absolute inset-0 bg-red-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">View All Products</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}




