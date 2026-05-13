import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import QuestionsPage from './pages/QuestionsPage'
import PracticePage from './pages/PracticePage'
import BookmarksPage from './pages/BookmarksPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/questions" element={<Layout><QuestionsPage /></Layout>} />
        <Route path="/practice" element={<Layout><PracticePage /></Layout>} />
        <Route path="/bookmarks" element={<Layout><BookmarksPage /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App