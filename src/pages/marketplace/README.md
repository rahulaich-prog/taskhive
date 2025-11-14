# TaskHive Marketplace

A modern, customizable marketplace component for student services built with React and Tailwind CSS.

## 🚀 Features

- **Modular Architecture**: Easy to customize and extend
- **Advanced Search & Filtering**: Search by keywords, category, price range, and more
- **Responsive Design**: Works perfectly on all device sizes
- **Smooth Animations**: Beautiful transitions and hover effects
- **Customizable Content**: Easy-to-modify sample data and configuration
- **Modern UI**: Clean, professional design with dark/light mode support

## 📁 File Structure

```
src/pages/marketplace/
├── MarketplacePage.jsx          # Main marketplace page component
├── components/
│   ├── MarketplaceHeader.jsx    # Header with navigation and actions
│   ├── SearchAndFilter.jsx      # Search bar and filtering options
│   ├── ServiceCard.jsx          # Individual service card component
│   └── StatsSection.jsx         # Statistics display component
└── data/
    └── sampleData.js            # Sample data and configuration
```

## 🎨 Customization

### 1. **Modify Sample Data**

Edit `src/pages/marketplace/data/sampleData.js`:

```javascript
export const sampleServices = [
  {
    id: 1,
    title: "Your Service Title",
    description: "Service description...",
    seller: {
      name: "Seller Name",
      avatar: "avatar-url",
      verified: true
    },
    // ... more properties
  }
]
```

### 2. **Customize Configuration**

Update the `marketplaceConfig` object in `sampleData.js`:

```javascript
export const marketplaceConfig = {
  hero: {
    title: "Your Marketplace Title",
    subtitle: "Your custom subtitle",
    primaryButtonText: "Browse Services",
    secondaryButtonText: "Start Selling"
  },
  colors: {
    primary: "blue",    // Change to your brand color
    secondary: "purple",
    accent: "green"
  }
}
```

### 3. **Add New Categories**

Add categories to the `categories` array in `sampleData.js`:

```javascript
export const categories = [
  'All Categories',
  'Your New Category',
  'Another Category',
  // ... existing categories
]
```

### 4. **Customize Components**

Each component is modular and can be easily modified:

- **MarketplaceHeader.jsx**: Modify navigation and action buttons
- **SearchAndFilter.jsx**: Add new filter options or modify search behavior
- **ServiceCard.jsx**: Change card layout, add new fields, or modify styling
- **StatsSection.jsx**: Update statistics or add new metrics

## 🛠️ Adding New Features

### Adding a New Filter

1. **Update SearchAndFilter.jsx**:
```javascript
// Add new state in MarketplacePage.jsx
const [newFilter, setNewFilter] = useState('')

// Add new filter input in SearchAndFilter.jsx
<select
  value={newFilter}
  onChange={(e) => setNewFilter(e.target.value)}
  className="px-4 py-3 rounded-lg border bg-background"
>
  {/* Your options */}
</select>
```

2. **Update filtering logic in MarketplacePage.jsx**:
```javascript
const filteredServices = services.filter(service => {
  // ... existing filters
  const matchesNewFilter = !newFilter || service.newProperty === newFilter
  return matchesSearch && matchesCategory && matchesNewFilter
})
```

### Adding a New Service Property

1. **Update sample data** in `sampleData.js`:
```javascript
{
  id: 1,
  title: "Service Title",
  newProperty: "New Value",  // Add your new property
  // ... existing properties
}
```

2. **Display in ServiceCard.jsx**:
```javascript
<div className="new-property-display">
  {service.newProperty}
</div>
```

## 🎯 Navigation Integration

The marketplace is integrated with React Router. The main navigation in `header.jsx` includes a link to `/marketplace`.

To customize navigation:
1. Update the menu items in `src/components/header.jsx`
2. The marketplace link automatically redirects users to the marketplace page

## 📱 Responsive Design

The marketplace is fully responsive with:
- **Mobile**: Stacked layout with mobile-optimized filters
- **Tablet**: 2-column service grid
- **Desktop**: 3-column service grid with full feature set

## 🎨 Styling Customization

The marketplace uses Tailwind CSS classes. To customize:

1. **Colors**: Update color classes throughout components
2. **Spacing**: Modify padding and margin classes
3. **Typography**: Change text size and weight classes
4. **Effects**: Modify transition and hover effects

Example color customization:
```javascript
// Change from blue theme to green theme
className="bg-blue-600"  // Change to bg-green-600
className="text-blue-600"  // Change to text-green-600
className="border-blue-300"  // Change to border-green-300
```

## 🚀 Getting Started

1. **Install dependencies** (if not already done):
   ```bash
   npm install react-router-dom
   ```

2. **Navigate to marketplace**:
   - Click "Marketplace" in the main navigation
   - Or go directly to `/marketplace` route

3. **Customize content**:
   - Edit `sampleData.js` for your content
   - Modify components as needed
   - Update styling to match your brand

## 🔧 Configuration Options

### Display Options
```javascript
display: {
  servicesPerPage: 9,           // Number of services to show
  showFeaturedBadge: true,      // Show featured badges
  showSellerVerification: true,  // Show verification badges
  showDeliveryTime: true,       // Show delivery time
  enableFavorites: true         // Enable favorite functionality
}
```

### Search Options
```javascript
search: {
  placeholder: "Custom search placeholder...",
  showAdvancedFilters: true,    // Show advanced filter panel
  enablePriceFilter: true,      // Enable price range filter
  enableRatingFilter: true      // Enable rating filter
}
```

## 📊 Analytics Integration

To add analytics tracking, add event handlers to components:

```javascript
// In ServiceCard.jsx
<Button 
  onClick={() => {
    // Analytics tracking
    gtag('event', 'view_service', {
      service_id: service.id,
      service_category: service.category
    })
  }}
>
  View Details
</Button>
```

## 🤝 Contributing

To add new features or components:
1. Create new components in the `components/` folder
2. Update sample data in `data/sampleData.js`
3. Import and use in `MarketplacePage.jsx`
4. Update this README with new customization options

## 📝 Notes

- All components are functional components using React hooks
- The marketplace is separate from the main landing page
- Images are loaded from Unsplash for demo purposes
- Replace with your own images and data for production use
- The marketplace supports both light and dark themes automatically