import React, { useState, useEffect } from 'react'
import { Search, Filter, Leaf, Building2, CheckCircle2, ExternalLink, Mail, Phone } from 'lucide-react'
import ProductCard from './components/ProductCard'
import FilterSidebar from './components/FilterSidebar'
import Header from './components/Header'
import Stats from './components/Stats'

function App() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedApplication, setSelectedApplication] = useState('')
  const [categories, setCategories] = useState([])
  const [applications, setApplications] = useState([])
  const [stats, setStats] = useState(null)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [searchTerm, selectedCategory, selectedApplication, products])

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes, applicationsRes, statsRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories'),
        fetch('/api/applications'),
        fetch('/api/stats')
      ])

      const productsData = await productsRes.json()
      const categoriesData = await categoriesRes.json()
      const applicationsData = await applicationsRes.json()
      const statsData = await statsRes.json()

      setProducts(productsData.products)
      setFilteredProducts(productsData.products)
      setCategories(categoriesData.categories)
      setApplications(applicationsData.applications)
      setStats(statsData)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
    }
  }

  const filterProducts = () => {
    let filtered = [...products]

    if (searchTerm) {
      const search = searchTerm.toLowerCase()
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(search) ||
        p.manufacturer.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search)
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    if (selectedApplication) {
      filtered = filtered.filter(p => p.applications.includes(selectedApplication))
    }

    setFilteredProducts(filtered)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
    setSelectedApplication('')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Leaf className="w-12 h-12 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold">GreenGuard Gold Products</h1>
            </div>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Find certified low-emission building materials for healthier, sustainable construction projects
            </p>
            <div className="mt-8 flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                <span>Low VOC Emissions</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                <span>Third-Party Certified</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                <span>LEED Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {stats && <Stats stats={stats} />}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products, manufacturers, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center justify-center md:w-auto"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>

          {/* Active Filters */}
          {(selectedCategory || selectedApplication) && (
            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-600">Active filters:</span>
              {selectedCategory && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                  {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory('')}
                    className="ml-2 hover:text-primary-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedApplication && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                  {selectedApplication}
                  <button
                    onClick={() => setSelectedApplication('')}
                    className="ml-2 hover:text-primary-900"
                  >
                    ×
                  </button>
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <FilterSidebar
            categories={categories}
            applications={applications}
            selectedCategory={selectedCategory}
            selectedApplication={selectedApplication}
            onCategoryChange={setSelectedCategory}
            onApplicationChange={setSelectedApplication}
            showFilters={showFilters}
          />

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredProducts.length} Product{filteredProducts.length !== 1 ? 's' : ''} Found
              </h2>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="card text-center py-12">
                <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                <button onClick={clearFilters} className="btn-primary">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Leaf className="w-8 h-8 text-primary-500 mr-2" />
                <span className="text-xl font-bold text-white">GreenGuard Gold</span>
              </div>
              <p className="text-sm">
                Your trusted source for certified low-emission building materials and sustainable construction products.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary-400">About GreenGuard</a></li>
                <li><a href="#" className="hover:text-primary-400">Certification Process</a></li>
                <li><a href="#" className="hover:text-primary-400">For Manufacturers</a></li>
                <li><a href="#" className="hover:text-primary-400">Resources</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  info@greenguardproducts.com
                </li>
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  1-800-GREEN-BUILD
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
            <p>&copy; 2025 GreenGuard Gold Products Directory. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
