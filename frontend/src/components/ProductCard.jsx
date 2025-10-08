import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Award, Building2, ExternalLink, DollarSign, Wrench } from 'lucide-react'

function ProductCard({ product }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="card hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.manufacturer}</p>
        </div>
        <div className="ml-4">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
            <Award className="w-3 h-3 mr-1" />
            GreenGuard Gold
          </span>
        </div>
      </div>

      {/* Category and Subcategory */}
      <div className="flex items-center space-x-2 mb-3">
        <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
          {product.category}
        </span>
        <span className="text-xs text-gray-500">•</span>
        <span className="text-xs text-gray-600">{product.subcategory}</span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 mb-4">{product.description}</p>

      {/* Key Info Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-start space-x-2">
          <Building2 className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-500">Applications</p>
            <p className="text-sm font-medium text-gray-900">
              {product.applications.slice(0, 2).join(', ')}
              {product.applications.length > 2 && '...'}
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <DollarSign className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-500">Price Range</p>
            <p className="text-sm font-medium text-gray-900">{product.price_range}</p>
          </div>
        </div>
      </div>

      {/* VOC Level Badge */}
      <div className="mb-4">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          product.voc_level === 'Zero VOC' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-blue-100 text-blue-800'
        }`}>
          {product.voc_level} Emissions
        </span>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-gray-200 pt-4 mt-4 space-y-3">
          {/* All Certifications */}
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-2">Certifications</p>
            <div className="flex flex-wrap gap-2">
              {product.certifications.map(cert => (
                <span key={cert} className="inline-flex items-center px-2 py-1 rounded text-xs bg-primary-50 text-primary-700 border border-primary-200">
                  <Award className="w-3 h-3 mr-1" />
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* All Applications */}
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-2">Suitable For</p>
            <div className="flex flex-wrap gap-2">
              {product.applications.map(app => (
                <span key={app} className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                  {app}
                </span>
              ))}
            </div>
          </div>

          {/* Installation Notes */}
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-1 flex items-center">
              <Wrench className="w-3 h-3 mr-1" />
              Installation Notes
            </p>
            <p className="text-sm text-gray-600">{product.installation_notes}</p>
          </div>

          {/* Supplier Contact */}
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-1">Supplier Information</p>
            <a 
              href={product.supplier_contact.startsWith('http') ? product.supplier_contact : `https://${product.supplier_contact}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
            >
              {product.supplier_contact}
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
        </div>
      )}

      {/* Expand/Collapse Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full mt-4 flex items-center justify-center text-sm font-medium text-primary-600 hover:text-primary-700"
      >
        {expanded ? (
          <>
            Show Less <ChevronUp className="w-4 h-4 ml-1" />
          </>
        ) : (
          <>
            View Details <ChevronDown className="w-4 h-4 ml-1" />
          </>
        )}
      </button>
    </div>
  )
}

export default ProductCard
