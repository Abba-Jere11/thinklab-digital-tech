"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Search, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

// Sample product data
const products = Array.from({ length: 1517 }, (_, i) => ({
  id: i + 1,
  model: `DS-2CD${2000 + i}G3-${["IZ", "LIZS", "LIZS2UY", "LIZ"][i % 4]}${i % 2 === 0 ? "(2U)Y" : ""}`,
  name: `${[4, 6, 8][i % 3]} MP ${["Acusense", "Smart Hybrid Light with ColorVu"][i % 2]} Motorized Varifocal ${["Bullet", "Turret"][i % 2]} Network Camera`,
  isNew: i % 3 === 0, // Every 3rd product is new
  image: "smart.png",
}))

export default function ProductCatalog() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(12)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [searchQuery])

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 7

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i)
        pages.push("...")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 3) {
        pages.push(1)
        pages.push("...")
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push("...")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
        pages.push("...")
        pages.push(totalPages)
      }
    }

    return pages
  }

  const handleProductSelect = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const resetSearch = () => {
    setSearchQuery("")
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Enhanced Modern Sidebar */}
          <div className="w-80 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 overflow-hidden h-fit">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold tracking-tight">Search List</h2>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={resetSearch}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-200 hover:scale-105"
                >
                  Reset
                </Button>
              </div>

              {/* Results Counter with Animation */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-lg font-semibold">
                    <span className="text-2xl font-bold text-yellow-300">{filteredProducts.length}</span>
                    <span className="text-sm opacity-90 ml-1">Products Found</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Search Section */}
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Product Search</label>
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors duration-200" />
                  <Input
                    placeholder="Search for Product Models..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 text-gray-900 placeholder-gray-500 hover:border-gray-300"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery("")
                        setCurrentPage(1)
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">{Math.floor(filteredProducts.length * 0.3)}</div>
                  <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">New Items</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                  <div className="text-2xl font-bold text-green-600">{selectedProducts.length}</div>
                  <div className="text-xs text-green-600 font-medium uppercase tracking-wide">Selected</div>
                </div>
              </div>

              {/* Categories Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Categories</h3>
                  <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>

                <div className="space-y-2">
                  {[
                    { name: "Bullet Cameras", count: 847, color: "blue" },
                    { name: "Turret Cameras", count: 670, color: "purple" },
                    { name: "Acusense Series", count: 423, color: "green" },
                    { name: "ColorVu Series", count: 289, color: "orange" },
                  ].map((category, index) => (
                    <div
                      key={category.name}
                      className="group cursor-pointer bg-white rounded-lg p-3 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-3 h-3 rounded-full bg-${category.color}-500 group-hover:scale-110 transition-transform duration-200`}
                          ></div>
                          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                            {category.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {category.count}
                          </span>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Filters Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Filters</h3>
                  <div className="w-8 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
                </div>

                <div className="space-y-3">
                  {/* Resolution Filter */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-700">Resolution</span>
                      <Plus className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors duration-200" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["4MP", "6MP", "8MP"].map((res) => (
                        <button
                          key={res}
                          className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 hover:scale-105"
                        >
                          {res}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Features Filter */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-700">Features</span>
                      <Plus className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors duration-200" />
                    </div>
                    <div className="space-y-2">
                      {["Motorized", "ColorVu", "Acusense"].map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <Checkbox className="border-gray-300" />
                          <label className="text-sm text-gray-600 cursor-pointer hover:text-gray-900 transition-colors duration-200">
                            {feature}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]">
                  Apply Filters
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-all duration-200 bg-transparent"
                >
                  Clear All
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentProducts.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`} className="block">
                  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 cursor-pointer">
                    {/* NEW Badge */}
                    {product.isNew && (
                      <div className="mb-4">
                        <span className="inline-block bg-red-500 text-white text-xs font-bold px-2 py-1 rounded transform -rotate-12">
                          NEW
                        </span>
                      </div>
                    )}

                    {/* Product Image */}
                    <div className="mb-4 flex justify-center">
                      <Image
                        src={`/${product.image}`}
                        alt={product.model}
                        width={200}
                        height={150}
                        className="object-contain"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="space-y-3">
                      <h3 className="font-bold text-lg text-gray-900 leading-tight">{product.model}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{product.name}</p>

                      {/* Compare Checkbox */}
                      <div className="flex items-center space-x-2 pt-2">
                        <Checkbox
                          id={`compare-${product.id}`}
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={() => handleProductSelect(product.id)}
                          className="border-gray-300"
                        />
                        <label
                          htmlFor={`compare-${product.id}`}
                          className="text-sm font-medium text-gray-700 cursor-pointer"
                        >
                          Compare
                        </label>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center space-x-4 bg-white rounded-lg shadow-sm p-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex items-center space-x-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </Button>

              <div className="flex items-center space-x-1">
                {getPageNumbers().map((page, index) => (
                  <div key={index}>
                    {page === "..." ? (
                      <span className="px-3 py-2 text-gray-500">...</span>
                    ) : (
                      <Button
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page as number)}
                        className={`min-w-[40px] ${
                          currentPage === page ? "bg-red-500 hover:bg-red-600 text-white" : "hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center space-x-1"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </Button>

              <div className="flex items-center space-x-2 ml-4">
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) => {
                    setItemsPerPage(Number.parseInt(value))
                    setCurrentPage(1)
                  }}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6">6 / page</SelectItem>
                    <SelectItem value="12">12 / page</SelectItem>
                    <SelectItem value="24">24 / page</SelectItem>
                    <SelectItem value="48">48 / page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
