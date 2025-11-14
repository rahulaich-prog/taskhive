import React from 'react'
import { Users, Star, DollarSign, ShoppingCart, TrendingUp, Award } from 'lucide-react'

const StatsSection = ({ customStats = null }) => {
  const defaultStats = [
    { icon: Users, label: 'Active Students', value: '10,000+', color: 'text-blue-600' },
    { icon: Star, label: 'Success Rate', value: '98%', color: 'text-yellow-600' },
    { icon: DollarSign, label: 'Earned by Students', value: '$250K+', color: 'text-green-600' },
    { icon: ShoppingCart, label: 'Services Delivered', value: '25,000+', color: 'text-purple-600' }
  ]

  const stats = customStats || defaultStats

  return (
    <div className="py-16 bg-gradient-to-r from-gray-800 to-gray-700">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">Marketplace Statistics</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join a thriving community of students helping students succeed
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-xl shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StatsSection