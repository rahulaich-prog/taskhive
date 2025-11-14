import React from 'react'
import { ArrowLeft, Search, Filter, Star, Heart, ShoppingCart, Users, DollarSign, User, Bell, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const MarketplaceHeader = ({ 
  showBackButton = true, 
  title = "TaskHive Marketplace",
  customActions = null 
}) => {
  const defaultActions = (
    <div className="flex items-center gap-4">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => {
          document.getElementById('start-selling-section')?.scrollIntoView({ 
            behavior: 'smooth' 
          })
        }}
      >
        <Users className="h-4 w-4 mr-2" />
        Sell Services
      </Button>
      <Button 
        size="sm"
        onClick={() => {
          // In a real app, this would navigate to orders page
          alert('My Orders functionality would go here!')
        }}
      >
        <ShoppingCart className="h-4 w-4 mr-2" />
        My Orders
      </Button>
    </div>
  )

  return (
    <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-700">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <>
                <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <ArrowLeft className="h-5 w-5" />
                  <span>Back to TaskHive</span>
                </Link>
                <div className="h-6 w-px bg-gray-600" />
              </>
            )}
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {title}
            </h1>
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex">
            {customActions || defaultActions}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="md:hidden mt-4 flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => {
              document.getElementById('start-selling-section')?.scrollIntoView({ 
                behavior: 'smooth' 
              })
            }}
          >
            <Users className="h-4 w-4 mr-2" />
            Sell
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => {
              alert('My Orders functionality would go here!')
            }}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Orders
          </Button>
        </div>
      </div>
    </header>
  )
}

export default MarketplaceHeader