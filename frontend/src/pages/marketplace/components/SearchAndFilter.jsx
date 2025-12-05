import React from 'react'
import { Search, Filter, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'

const SearchAndFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory, 
  sortBy, 
  setSortBy,
  priceRange,
  setPriceRange,
  showFilters,
  setShowFilters
}) => {
  const categories = [
    'All Categories',
    'Tutoring',
    'Assignment Help',
    'Study Resources',
    'Research Services',
    'Design & Creative',
    'Programming',
    'Writing & Translation',
    'Language Learning',
    'Test Preparation'
  ]

  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'reviews', label: 'Most Reviewed' }
  ]

  return (
    <div className="bg-gray-800/50 py-8">
      <div className="container mx-auto px-6">
        {/* Main Search and Basic Filters */}
        <div className="flex flex-col lg:flex-row gap-4 items-center mb-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <input
              type="text"
              placeholder="Search for services, tutoring, assignments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px]"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          
          {/* Sort Options */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[180px]"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Advanced Filters Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Advanced Filters Panel */}
        {showFilters && (
          <div className="bg-gray-800 rounded-lg border border-gray-600 p-6 mt-4">
            <h3 className="font-semibold mb-4 text-white">Advanced Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium mb-2">Price Range</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange?.min || ''}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-400">to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange?.max || ''}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Minimum Rating</label>
                <select className="w-full px-3 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Any Rating</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4.0">4.0+ Stars</option>
                  <option value="3.5">3.5+ Stars</option>
                  <option value="3.0">3.0+ Stars</option>
                </select>
              </div>

              {/* Delivery Time */}
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Delivery Time</label>
                <select className="w-full px-3 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Any Time</option>
                  <option value="24h">Within 24 hours</option>
                  <option value="3d">Within 3 days</option>
                  <option value="1w">Within 1 week</option>
                  <option value="custom">Custom timeline</option>
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex items-center gap-4 mt-6">
              <Button variant="outline" onClick={() => {
                setSearchTerm('')
                setSelectedCategory('All Categories')
                setSortBy('popular')
                setPriceRange({ min: '', max: '' })
              }}>
                Clear All Filters
              </Button>
              <Button onClick={() => setShowFilters(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchAndFilter