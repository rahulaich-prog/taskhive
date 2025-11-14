import React, { useState, useEffect } from 'react'
import { Calendar, Clock, MapPin, Users, Star, Filter, Plus, Edit3, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TextEffect } from '@/components/ui/text-effect'

const EventsSection = () => {
    const [events, setEvents] = useState([])
    const [filter, setFilter] = useState('all')

    // Load events from localStorage on component mount
    useEffect(() => {
        // Always load sample events (remove localStorage check)
        const sampleEvents = [
            {
                id: 1,
                title: "Study Group - Mathematics",
                description: "Join us for a collaborative math study session covering calculus and statistics.",
                date: "2025-10-30",
                time: "14:00",
                location: "Library Room 203",
                category: "study",
                attendees: 12,
                maxAttendees: 20,
                rating: 4.8,
                tags: ["Mathematics", "Study Group", "Calculus"],
                organizer: "Alex Johnson",
                price: "Free"
            },
            {
                id: 2,
                title: "Career Fair 2025",
                description: "Meet with top employers and explore internship and full-time opportunities.",
                date: "2025-11-05",
                time: "10:00",
                location: "Student Center Hall",
                category: "career",
                attendees: 150,
                maxAttendees: 300,
                rating: 4.9,
                tags: ["Career", "Networking", "Jobs"],
                organizer: "Career Services",
                price: "Free"
            },
            {
                id: 3,
                title: "Python Programming Workshop",
                description: "Learn Python basics and build your first web application in this hands-on workshop.",
                date: "2025-11-08",
                time: "18:00",
                location: "Computer Lab A",
                category: "workshop",
                attendees: 25,
                maxAttendees: 30,
                rating: 4.7,
                tags: ["Programming", "Python", "Web Development"],
                organizer: "Tech Club",
                price: "$15"
            },
            {
                id: 4,
                title: "Mental Health Awareness Seminar",
                description: "Learn about stress management and maintaining mental wellness during academic life.",
                date: "2025-11-12",
                time: "16:00",
                location: "Wellness Center",
                category: "wellness",
                attendees: 45,
                maxAttendees: 80,
                rating: 4.6,
                tags: ["Mental Health", "Wellness", "Self Care"],
                organizer: "Student Wellness",
                price: "Free"
            },
            {
                id: 5,
                title: "Startup Pitch Competition",
                description: "Present your business ideas to a panel of investors and win cash prizes.",
                date: "2025-11-15",
                time: "13:00",
                location: "Innovation Hub",
                category: "competition",
                attendees: 35,
                maxAttendees: 50,
                rating: 4.5,
                tags: ["Entrepreneurship", "Competition", "Innovation"],
                organizer: "Entrepreneurship Club",
                price: "Free"
            },
            
        ]
        
        console.log('Setting sample events:', sampleEvents.length) // Debug log
        setEvents(sampleEvents)
        localStorage.setItem('taskhive-events', JSON.stringify(sampleEvents))
    }, [])

    // Save events to localStorage whenever events change
    useEffect(() => {
        try {
            localStorage.setItem('taskhive-events', JSON.stringify(events))
        } catch (error) {
            console.error('Error saving events to localStorage:', error)
        }
    }, [events])

    const getCategoryColor = (category) => {
        switch (category) {
            case 'study': return 'bg-blue-500'
            case 'career': return 'bg-green-500'
            case 'workshop': return 'bg-purple-500'
            case 'wellness': return 'bg-pink-500'
            case 'competition': return 'bg-orange-500'
            case 'social': return 'bg-cyan-500'
            default: return 'bg-gray-500'
        }
    }

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'study': return <Calendar className="w-4 h-4" />
            case 'career': return <Users className="w-4 h-4" />
            case 'workshop': return <Plus className="w-4 h-4" />
            case 'wellness': return <Star className="w-4 h-4" />
            case 'competition': return <Filter className="w-4 h-4" />
            case 'social': return <Users className="w-4 h-4" />
            default: return <Calendar className="w-4 h-4" />
        }
    }

    const isEventUpcoming = (date) => {
        return new Date(date) >= new Date()
    }

    const filteredEvents = events.filter(event => {
        if (filter === 'all') return true
        if (filter === 'upcoming') return isEventUpcoming(event.date)
        if (filter === 'past') return !isEventUpcoming(event.date)
        return event.category === filter
    })

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const formatTime = (timeString) => {
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })
    }

    // Function to add new event (for backend integration)
    const addEvent = (eventData) => {
        const newEvent = {
            ...eventData,
            id: Date.now(),
            attendees: 0,
            rating: 0
        }
        setEvents(prev => [...prev, newEvent])
    }

    // Function to remove event (for backend integration)
    const removeEvent = (eventId) => {
        setEvents(prev => prev.filter(event => event.id !== eventId))
    }

    // Function to update event (for backend integration)
    const updateEvent = (eventId, updatedData) => {
        setEvents(prev => prev.map(event => 
            event.id === eventId ? { ...event, ...updatedData } : event
        ))
    }

    return (
        <section className="py-16 relative z-10">
            <div className="mx-auto max-w-7xl px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                        <span className="inline-block text-white">Upcoming</span>
                        <br />
                        <span className="inline-block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                            Campus Events
                        </span>
                    </h2>
                    <p className="mx-auto max-w-3xl text-lg text-white/80 font-medium">
                        Discover and join amazing events happening on campus. From study groups to career fairs, 
                        find opportunities to learn, network, and grow.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {[
                        { key: 'all', label: 'All Events' },
                        { key: 'upcoming', label: 'Upcoming' },
                        { key: 'study', label: 'Study Groups' },
                        { key: 'career', label: 'Career' },
                        { key: 'workshop', label: 'Workshops' },
                        { key: 'wellness', label: 'Wellness' },
                        { key: 'competition', label: 'Competitions' }
                    ].map((filterOption) => (
                        <button
                            key={filterOption.key}
                            onClick={() => setFilter(filterOption.key)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                                filter === filterOption.key
                                    ? 'bg-white/20 text-white border border-white/30'
                                    : 'text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
                            }`}
                        >
                            {filterOption.label}
                        </button>
                    ))}
                </div>

                {/* Events Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.length === 0 ? (
                        <div className="col-span-full text-center py-12">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                                <Calendar className="w-8 h-8 text-white/60" />
                            </div>
                            <p className="text-lg text-white/60 mb-2">No events found</p>
                            <p className="text-sm text-white/40">
                                {filter === 'all' ? 'No events available at the moment' : `No ${filter} events found`}
                            </p>
                        </div>
                    ) : (
                        filteredEvents.map((event) => (
                            <div
                                key={event.id}
                                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 group"
                            >
                                {/* Event Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-2 rounded-xl ${getCategoryColor(event.category)} flex items-center justify-center`}>
                                        {getCategoryIcon(event.category)}
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1 text-white/60 text-xs mb-1">
                                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                            <span>{event.rating}</span>
                                        </div>
                                        <span className="text-white/80 text-sm font-medium">{event.price}</span>
                                    </div>
                                </div>

                                {/* Event Content */}
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
                                    {event.title}
                                </h3>
                                
                                <p className="text-white/70 text-sm mb-4 leading-relaxed">
                                    {event.description}
                                </p>

                                {/* Event Details */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-white/60 text-sm">
                                        <Calendar className="w-4 h-4" />
                                        <span>{formatDate(event.date)}</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-white/60 text-sm">
                                        <Clock className="w-4 h-4" />
                                        <span>{formatTime(event.time)}</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-white/60 text-sm">
                                        <MapPin className="w-4 h-4" />
                                        <span>{event.location}</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-white/60 text-sm">
                                        <Users className="w-4 h-4" />
                                        <span>{event.attendees}/{event.maxAttendees} attending</span>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {event.tags.slice(0, 3).map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded-lg"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2">
                                    <Button
                                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 rounded-xl"
                                        size="sm"
                                    >
                                        {isEventUpcoming(event.date) ? 'Register' : 'View Details'}
                                    </Button>
                                    
                                    <Button
                                        variant="ghost"
                                        className="text-white/60 hover:text-white hover:bg-white/10 border border-white/20 rounded-xl"
                                        size="sm"
                                    >
                                        <Star className="w-4 h-4" />
                                    </Button>
                                </div>

                                {/* Organizer */}
                                <div className="mt-4 pt-4 border-t border-white/10">
                                    <p className="text-white/50 text-xs">
                                        Organized by <span className="text-white/70 font-medium">{event.organizer}</span>
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-12">
                    <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Want to Host Your Own Event?
                        </h3>
                        <p className="text-white/80 text-lg mb-6 max-w-2xl mx-auto">
                            Share your knowledge, build your network, and make an impact on campus by organizing your own event.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <div className="bg-white/20 backdrop-blur-sm rounded-[calc(var(--radius-xl)+0.125rem)] border border-white/30 p-0.5">
                                <Button size="lg" className="rounded-xl px-8 text-base bg-white text-black hover:bg-white/90">
                                    <Plus className="w-5 h-5 mr-2" />
                                    <span className="font-semibold">Create Event</span>
                                </Button>
                            </div>
                            <Button
                                size="lg"
                                variant="ghost"
                                className="h-12 rounded-xl px-8 text-white hover:bg-white/20 border border-white/30"
                            >
                                <span className="font-medium">Event Guidelines</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EventsSection