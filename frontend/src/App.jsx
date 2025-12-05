import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import MarketplacePage from '@/pages/marketplace/MarketplacePage'
import StudyPlannerPage from '@/pages/study-planner/StudyPlannerPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/study-planner" element={<StudyPlannerPage />} />
      </Routes>
    </Router>
  )
}

export default App