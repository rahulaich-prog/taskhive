# Quick Customization Guide

## 🚀 Quick Start

Your marketplace is ready! Here are the most common customizations:

### 1. **Change Marketplace Title & Content**
Edit `src/pages/marketplace/data/sampleData.js`:

```javascript
export const marketplaceConfig = {
  hero: {
    title: "Your Marketplace Name",  // ← Change this
    subtitle: "Your custom description",  // ← And this
    primaryButtonText: "Browse Services",
    secondaryButtonText: "Start Selling"
  }
}
```

### 2. **Add Your Own Services**
Replace the sample services in `sampleData.js`:

```javascript
export const sampleServices = [
  {
    id: 1,
    title: "Your Service Title",
    description: "Your service description...",
    seller: {
      name: "Seller Name",
      avatar: "https://your-image-url.com/avatar.jpg",
      verified: true
    },
    image: "https://your-image-url.com/service.jpg",
    rating: 4.9,
    reviews: 50,
    startingPrice: 25,
    category: "Tutoring",  // Must match a category below
    featured: true,
    tags: ["Math", "Calculus", "Help"]
  }
  // Add more services...
]
```

### 3. **Customize Categories**
Update categories in `sampleData.js`:

```javascript
export const categories = [
  'All Categories',
  'Your Category 1',    // ← Add your categories
  'Your Category 2',
  'Your Category 3',
  // ... more categories
]
```

### 4. **Change Colors (Optional)**
To change the color scheme, find and replace these classes in the components:

- `bg-blue-600` → `bg-your-color-600` (for backgrounds)
- `text-blue-600` → `text-your-color-600` (for text)
- `border-blue-300` → `border-your-color-300` (for borders)

Available Tailwind colors: `red`, `green`, `purple`, `yellow`, `pink`, `indigo`, etc.

### 5. **Update Statistics**
Modify the stats in `src/pages/marketplace/components/StatsSection.jsx`:

```javascript
const defaultStats = [
  { icon: Users, label: 'Your Metric', value: '1,000+', color: 'text-blue-600' },
  { icon: Star, label: 'Success Rate', value: '95%', color: 'text-yellow-600' },
  // ... more stats
]
```

## 🎨 Advanced Customization

### Adding New Service Properties

1. **Add to sample data**:
```javascript
{
  id: 1,
  title: "Service Title",
  yourNewField: "Your Value",  // ← Add here
  // ... existing fields
}
```

2. **Display in ServiceCard**:
Edit `src/pages/marketplace/components/ServiceCard.jsx`:
```javascript
<div className="your-custom-styling">
  {service.yourNewField}
</div>
```

### Adding New Filters

1. **Add state in MarketplacePage.jsx**:
```javascript
const [yourFilter, setYourFilter] = useState('')
```

2. **Add filter UI in SearchAndFilter.jsx**:
```javascript
<select
  value={yourFilter}
  onChange={(e) => setYourFilter(e.target.value)}
  className="px-4 py-3 rounded-lg border bg-background"
>
  <option value="">All Options</option>
  <option value="option1">Option 1</option>
</select>
```

3. **Update filtering logic**:
```javascript
const filteredServices = services.filter(service => {
  // ... existing filters
  const matchesYourFilter = !yourFilter || service.yourProperty === yourFilter
  return matchesSearch && matchesCategory && matchesYourFilter
})
```

## 📱 Testing Your Changes

1. **Start the dev server**: `npm run dev`
2. **Navigate to**: `http://localhost:5174/marketplace`
3. **Test features**:
   - Search functionality
   - Category filtering
   - Service card interactions
   - Responsive design (resize browser)

## ✅ Common Customizations Checklist

- [ ] Updated marketplace title and subtitle
- [ ] Added your own service data
- [ ] Customized categories for your use case
- [ ] Updated seller information and avatars
- [ ] Changed service images to your own
- [ ] Modified pricing to match your services
- [ ] Updated statistics to reflect your metrics
- [ ] Tested on mobile and desktop
- [ ] Verified all links and buttons work

## 🔧 File Locations Quick Reference

- **Main Page**: `src/pages/marketplace/MarketplacePage.jsx`
- **Data & Config**: `src/pages/marketplace/data/sampleData.js`
- **Service Cards**: `src/pages/marketplace/components/ServiceCard.jsx`
- **Search/Filter**: `src/pages/marketplace/components/SearchAndFilter.jsx`
- **Header**: `src/pages/marketplace/components/MarketplaceHeader.jsx`
- **Stats**: `src/pages/marketplace/components/StatsSection.jsx`

## 🎯 Need Help?

Check the detailed README at `src/pages/marketplace/README.md` for more advanced customization options and examples.