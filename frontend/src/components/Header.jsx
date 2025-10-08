import React from 'react'
import { Leaf, Menu } from 'lucide-react'

function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Leaf className="w-8 h-8 text-primary-600 mr-2" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">GreenGuard Gold</h1>
              <p className="text-xs text-gray-500">Certified Products Directory</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-700 hover:text-primary-600 font-medium">Products</a>
            <a href="#" className="text-gray-700 hover:text-primary-600 font-medium">About</a>
            <a href="#" className="text-gray-700 hover:text-primary-600 font-medium">Resources</a>
            <a href="#" className="text-gray-700 hover:text-primary-600 font-medium">Contact</a>
          </nav>
          <button className="md:hidden">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
