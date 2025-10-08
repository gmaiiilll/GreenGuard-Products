import React from 'react'
import { Package, Building2, Factory } from 'lucide-react'

function Stats({ stats }) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-4">
            <div className="bg-primary-100 p-3 rounded-lg">
              <Package className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">{stats.total_products}</p>
              <p className="text-sm text-gray-600">Certified Products</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-primary-100 p-3 rounded-lg">
              <Building2 className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">{stats.total_categories}</p>
              <p className="text-sm text-gray-600">Product Categories</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-primary-100 p-3 rounded-lg">
              <Factory className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">{stats.total_manufacturers}</p>
              <p className="text-sm text-gray-600">Manufacturers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats
