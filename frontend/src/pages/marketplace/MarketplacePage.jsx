import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { TextEffect } from '@/components/ui/text-effect'

// Import modular components
import MarketplaceHeader from './components/MarketplaceHeader'
import SearchAndFilter from './components/SearchAndFilter'
import ServiceCard from './components/ServiceCard'
import StatsSection from './components/StatsSection'

// Import sample data
import { sampleServices, marketplaceConfig } from './data/sampleData'

// Main Marketplace Page Component
const MarketplacePage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [sortBy, setSortBy] = useState('popular')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState(new Set())

  // Use sample data from separate file
  const services = sampleServices

  // Handle favorites
  const handleFavorite = (serviceId) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(serviceId)) {
      newFavorites.delete(serviceId)
    } else {
      newFavorites.add(serviceId)
    }
    setFavorites(newFavorites)
  }

  // Filter services based on search, category, and price
  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'All Categories' || service.category === selectedCategory
    
    const matchesPrice = (!priceRange.min || service.startingPrice >= parseInt(priceRange.min)) &&
                        (!priceRange.max || service.startingPrice <= parseInt(priceRange.max))
    
    return matchesSearch && matchesCategory && matchesPrice
  })

  // Sort services
  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating
      case 'price-low':
        return a.startingPrice - b.startingPrice
      case 'price-high':
        return b.startingPrice - a.startingPrice
      case 'newest':
        return b.id - a.id
      default: // popular
        return b.reviews - a.reviews
    }
  })

  const transitionVariants = {
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { type: 'spring', bounce: 0.3, duration: 0.6 }
      }
    }
  }

  return (
    <div className="dark">
      <div className="min-h-screen bg-gray-900 text-white">
        <MarketplaceHeader />
        
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <AnimatedGroup variants={transitionVariants}>
            <TextEffect
              per="word"
              as="h1"
              preset="fade"
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              {marketplaceConfig.hero.title}
            </TextEffect>
          </AnimatedGroup>
          <AnimatedGroup variants={transitionVariants}>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              {marketplaceConfig.hero.subtitle}
            </p>
          </AnimatedGroup>
          <AnimatedGroup variants={transitionVariants}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50"
                onClick={() => {
                  document.getElementById('services-section')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  })
                }}
              >
                {marketplaceConfig.hero.primaryButtonText}
              </Button>
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50"
                onClick={() => {
                  document.getElementById('start-selling-section')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  })
                }}
              >
                {marketplaceConfig.hero.secondaryButtonText}
              </Button>
            </div>
          </AnimatedGroup>
        </div>
      </section>

      {/* Search and Filter */}
      <SearchAndFilter 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />

      {/* Services Grid */}
      <section id="services-section" className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">
              {selectedCategory === 'All Categories' ? 'All Services' : selectedCategory}
            </h2>
            <span className="text-muted-foreground">
              {sortedServices.length} services found
            </span>
          </div>
          
          <AnimatedGroup 
            variants={{
              container: {
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              },
              ...transitionVariants
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {sortedServices.map((service) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                onFavorite={handleFavorite}
                isFavorited={favorites.has(service.id)}
              />
            ))}
          </AnimatedGroup>
          
          {sortedServices.length === 0 && (
            <div className="text-center py-16">
              <div className="text-muted-foreground text-lg mb-4">
                No services found matching your criteria
              </div>
              <Button 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All Categories')
                  setPriceRange({ min: '', max: '' })
                  setShowFilters(false)
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Start Selling Section */}
      <section id="start-selling-section" className="py-16 bg-gradient-to-r from-gray-800 to-gray-700">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">Start Selling Your Skills</h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Turn your knowledge into income. Join thousands of students earning money by helping their peers succeed.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Create Your Service</h3>
                <p className="text-gray-400">Set up your profile and describe what you can offer to other students.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Connect with Students</h3>
                <p className="text-gray-400">Get matched with students who need help in your areas of expertise.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Earn Money</h3>
                <p className="text-gray-400">Get paid for your time and expertise while helping fellow students.</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                Create Seller Account
              </Button>
              <Button size="lg" variant="outline">
                Learn More About Selling
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-800/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already earning and learning together
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => {
                document.getElementById('start-selling-section')?.scrollIntoView({ 
                  behavior: 'smooth' 
                })
              }}
            >
              Create Your First Service
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => {
                document.getElementById('services-section')?.scrollIntoView({ 
                  behavior: 'smooth' 
                })
              }}
            >
              Browse More Services
            </Button>
          </div>
        </div>
      </section>
      </div>
    </div>
  )
}

export default MarketplacePage