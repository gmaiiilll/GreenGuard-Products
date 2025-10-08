import React from 'react'
import { X } from 'lucide-react'

function FilterSidebar({ 
  categories, 
  applications, 
  selectedCategory, 
  selectedApplication, 
  onCategoryChange, 
  onApplicationChange,
  showFilters 
}) {
  return (
    <div className={`lg:block ${showFilters ? 'block' : 'hidden'} lg:w-64 flex-shrink-0`}>
      <div className="card sticky top-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          <button className="lg:hidden">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Category</h4>
          <div className="space-y-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === ''}
                onChange={() => onCategoryChange('')}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">All Categories</span>
            </label>
            {categories.map(category => (
              <label key={category} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === category}
                  onChange={() => onCategoryChange(category)}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Applications */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Application</h4>
          <div className="space-y-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="application"
                checked={selectedApplication === ''}
                onChange={() => onApplicationChange('')}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">All Applications</span>
            </label>
            {applications.map(application => (
              <label key={application} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="application"
                  checked={selectedApplication === application}
                  onChange={() => onApplicationChange(application)}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{application}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
          <h4 className="text-sm font-semibold text-primary-900 mb-2">About GreenGuard Gold</h4>
          <p className="text-xs text-primary-800">
            GreenGuard Gold certification ensures products meet strict chemical emissions limits, 
            contributing to healthier indoor air quality.
          </p>
        </div>
      </div>
    </div>
  )
}

export default FilterSidebar
