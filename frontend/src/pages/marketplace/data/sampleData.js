// Sample data for the marketplace
// You can easily modify this data to customize the marketplace content

export const sampleServices = [
  {
    id: 1,
    title: "Math Tutoring - Calculus & Algebra Expert Help",
    description: "Professional math tutoring with 5+ years experience. Help with homework, exam prep, and concept understanding. Available for one-on-one sessions and group study.",
    seller: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612e8c5?w=100&h=100&fit=crop&crop=face",
      verified: true,
      rating: 4.9,
      completedOrders: 127
    },
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 127,
    startingPrice: 2000,
    category: "Tutoring",
    featured: true,
    badge: "Top Rated",
    tags: ["Mathematics", "Calculus", "Algebra", "Homework Help"],
    deliveryTime: "24 hours",
    languages: ["English", "Spanish"]
  },
  {
    id: 2,
    title: "Essay Writing & Research Paper Assistance",
    description: "High-quality academic writing help for essays, research papers, and thesis projects with proper citations and formatting according to APA, MLA, Chicago styles.",
    seller: {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      verified: true,
      rating: 4.8,
      completedOrders: 89
    },
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 89,
    startingPrice: 1200,
    category: "Writing & Translation",
    featured: false,
    tags: ["Essay Writing", "Research", "Citations", "Academic Writing"],
    deliveryTime: "3 days",
    languages: ["English", "Mandarin"]
  },
  {
    id: 3,
    title: "Programming Help - Python, Java, Web Development",
    description: "Expert programming assistance for assignments, projects, and debugging. Specializing in Python, Java, JavaScript, React, and full-stack development. All skill levels welcome.",
    seller: {
      name: "Alex Rodriguez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      verified: true,
      rating: 4.9,
      completedOrders: 156
    },
    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 156,
    startingPrice: 2400,
    category: "Programming",
    featured: true,
    badge: "Expert",
    tags: ["Python", "Java", "JavaScript", "React", "Full Stack"],
    deliveryTime: "2 days",
    languages: ["English", "Spanish"]
  },
  {
    id: 4,
    title: "Graphic Design for Student Projects & Presentations",
    description: "Creative design solutions for presentations, posters, infographics, and academic visual materials. Professional quality designs that help your projects stand out.",
    seller: {
      name: "Emma Thompson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      verified: false,
      rating: 4.7,
      completedOrders: 94
    },
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 94,
    startingPrice: 1600,
    category: "Design & Creative",
    featured: false,
    tags: ["Graphic Design", "Presentations", "Infographics", "Visual Design"],
    deliveryTime: "1-2 days",
    languages: ["English"]
  },
  {
    id: 5,
    title: "Chemistry Lab Report Writing & Analysis",
    description: "Detailed chemistry lab reports with proper analysis, calculations, and scientific methodology. Experienced with organic, inorganic, and analytical chemistry.",
    seller: {
      name: "Dr. James Wilson",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
      verified: true,
      rating: 4.9,
      completedOrders: 73
    },
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 73,
    startingPrice: 2800,
    category: "Assignment Help",
    featured: false,
    badge: "PhD Verified",
    tags: ["Chemistry", "Lab Reports", "Analysis", "Scientific Writing"],
    deliveryTime: "2-3 days",
    languages: ["English"]
  },
  {
    id: 6,
    title: "Study Guide Creation & Exam Preparation",
    description: "Comprehensive study guides, flashcards, and exam prep materials for various subjects. Personalized study plans and effective learning strategies included.",
    seller: {
      name: "Lisa Park",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      verified: true,
      rating: 4.8,
      completedOrders: 112
    },
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 112,
    startingPrice: 1440,
    category: "Study Resources",
    featured: false,
    tags: ["Study Guides", "Exam Prep", "Flashcards", "Learning Strategies"],
    deliveryTime: "1-3 days",
    languages: ["English", "Korean"]
  },
  {
    id: 7,
    title: "Statistics & Data Analysis with R and SPSS",
    description: "Professional statistical analysis and data visualization using R, SPSS, and Excel. Perfect for research projects, thesis work, and data-driven assignments.",
    seller: {
      name: "David Kumar",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      verified: true,
      rating: 4.8,
      completedOrders: 85
    },
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 85,
    startingPrice: 3200,
    category: "Research Services",
    featured: true,
    tags: ["Statistics", "Data Analysis", "R", "SPSS", "Research"],
    deliveryTime: "3-5 days",
    languages: ["English", "Hindi"]
  },
  {
    id: 8,
    title: "Language Exchange & Conversation Practice",
    description: "Native Spanish speaker offering conversation practice, grammar help, and cultural insights. Perfect for language learning and exam preparation.",
    seller: {
      name: "Maria Gonzalez",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face",
      verified: true,
      rating: 4.9,
      completedOrders: 203
    },
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 203,
    startingPrice: 960,
    category: "Language Learning",
    featured: false,
    tags: ["Spanish", "Conversation", "Grammar", "Cultural Exchange"],
    deliveryTime: "Flexible",
    languages: ["Spanish", "English"]
  }
]

export const categories = [
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

export const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'reviews', label: 'Most Reviewed' }
]

export const marketplaceStats = [
  { icon: 'Users', label: 'Active Students', value: '10,000+', color: 'text-blue-600' },
  { icon: 'Star', label: 'Success Rate', value: '98%', color: 'text-yellow-600' },
  { icon: 'DollarSign', label: 'Earned by Students', value: '₹2.5Cr+', color: 'text-green-600' },
  { icon: 'ShoppingCart', label: 'Services Delivered', value: '25,000+', color: 'text-purple-600' }
]

// Configuration for easy customization
export const marketplaceConfig = {
  // Hero section
  hero: {
    title: "Student Marketplace",
    subtitle: "Connect with talented students, get help with your academics, and earn from your skills",
    primaryButtonText: "Browse Services",
    secondaryButtonText: "Start Selling"
  },

  // Search and filter
  search: {
    placeholder: "Search for services, tutoring, assignments...",
    showAdvancedFilters: true,
    enablePriceFilter: true,
    enableRatingFilter: true
  },

  // Display options
  display: {
    servicesPerPage: 9,
    showFeaturedBadge: true,
    showSellerVerification: true,
    showDeliveryTime: true,
    enableFavorites: true
  },

  // Colors (you can customize these)
  colors: {
    primary: "blue",
    secondary: "purple",
    accent: "green"
  }
}