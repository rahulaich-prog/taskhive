# TaskHive Frontend v2

A modern React application with marketplace and AI-powered study planner features, built with Vite and styled with Tailwind CSS.

## 🚀 Quick Start

### Prerequisites

Before running this project, make sure you have the following installed on your system:

- **Node.js** (version 18.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** package manager
- **Git** (optional, for cloning) - [Download here](https://git-scm.com/)

### Installation & Setup

1. **Extract/Clone the Project**
   ```bash
   # If you received a zip file, extract it
   # If using Git:
   git clone [repository-url]
   cd forntendv2
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   *This will install all required packages including React, Vite, Tailwind CSS, and other dependencies*

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   *The application will start on http://localhost:5173*

4. **Open in Browser**
   - Open your web browser
   - Navigate to `http://localhost:5173`
   - The application should load with the main homepage

## 📱 Available Features

### Main Application
- **Homepage**: Modern hero section with navigation
- **Dark Theme**: Professional dark UI throughout the application

### Marketplace Page
- Browse and search services
- Filter by categories and price ranges
- Service provider profiles
- Statistics dashboard
- **Access**: Click "Marketplace" in the navigation menu

### AI Study Planner
- ChatGPT-like interface for study planning
- Quick action templates for common study needs
- Study tips and techniques
- Progress tracking capabilities
- **Access**: Click "Study Planner" in the navigation menu

## 🛠 Available Scripts

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 🔧 Project Structure

```
src/
├── components/          # Shared UI components
├── pages/
│   ├── marketplace/     # Marketplace feature
│   └── study-planner/   # Study planner feature
├── lib/                 # Utilities and helpers
└── assets/             # Images and static files
```

## 💻 Technology Stack

- **React 19** - UI framework
- **Vite 7** - Build tool and dev server
- **Tailwind CSS 4** - Styling framework
- **React Router DOM 7** - Client-side routing
- **Lucide React** - Icons
- **Radix UI** - Accessible UI components

## 🎯 Usage Instructions

### For Development:
1. Run `npm run dev` to start the development server
2. Make changes to files in the `src/` directory
3. Changes will automatically reload in the browser

### For Production:
1. Run `npm run build` to create an optimized production build
2. Files will be generated in the `dist/` folder
3. Deploy the `dist/` folder to your web hosting service

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📞 Troubleshooting

### Common Issues:

**"Module not found" errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port already in use:**
- The app will automatically try a different port
- Or specify a custom port: `npm run dev -- --port 3000`

**Build errors:**
```bash
npm run lint
npm run build
```

### Performance Tips:
- Keep the development server running while coding
- Use `npm run preview` to test the production build locally
- Close unused browser tabs for better performance

## 🔄 Updates & Maintenance

To update dependencies:
```bash
npm update
```

To check for outdated packages:
```bash
npm outdated
```

---

**Need Help?** If you encounter any issues, check that all prerequisites are installed and try running `npm install` again.
