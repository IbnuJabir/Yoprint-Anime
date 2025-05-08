import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import SearchPage from "./pages/SearchPage"
import AnimeDetailPage from "./pages/AnimeDetailPage"

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/anime/:id" element={<AnimeDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}
