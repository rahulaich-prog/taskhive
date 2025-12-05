import React from 'react'
import { Star, Heart, Users, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ServiceCard = ({ service, onFavorite, isFavorited = false }) => {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-400 transition-all duration-300 hover:shadow-lg group">
      {/* Service Image */}
      <div className="relative overflow-hidden rounded-t-xl">
        <img 
          src={service.image} 
          alt={service.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={() => onFavorite && onFavorite(service.id)}
          className="absolute top-3 right-3 p-2 rounded-full bg-gray-900/80 backdrop-blur-sm hover:bg-gray-900 transition-colors"
        >
          <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>
        {service.featured && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            Featured
          </div>
        )}
        {service.badge && (
          <div className="absolute bottom-3 left-3 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            {service.badge}
          </div>
        )}
      </div>
      
      {/* Service Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-white group-hover:text-blue-400 transition-colors">
              {service.title}
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <img 
                src={service.seller.avatar} 
                alt={service.seller.name}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm text-gray-400">{service.seller.name}</span>
              {service.seller.verified && (
                <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{service.rating}</span>
                <span className="text-sm text-muted-foreground">({service.reviews})</span>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {service.description}
        </p>
        
        {/* Service Tags */}
        {service.tags && (
          <div className="flex flex-wrap gap-1 mb-4">
            {service.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Starting at</span>
            <span className="text-xl font-bold text-blue-400">₹{service.startingPrice}</span>
          </div>
          <Button size="sm" className="hover:bg-blue-600">
            View Details
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard