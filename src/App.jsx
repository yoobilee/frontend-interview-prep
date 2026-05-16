import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import QuestionsPage from './pages/QuestionsPage'
import PracticePage from './pages/PracticePage'
import BookmarksPage from './pages/BookmarksPage'
import QuestionDetailPage from './pages/QuestionDetailPage'
import CodingTestPage from './pages/CodingTestPage'
import CodingProblemPage from './pages/CodingProblemPage'
import SettingsPage from './pages/SettingsPage'
import AdminPage from './pages/AdminPage'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/questions" element={<Layout><QuestionsPage /></Layout>} />
          <Route path="/practice" element={<Layout><PracticePage /></Layout>} />
          <Route path="/bookmarks" element={<Layout><BookmarksPage /></Layout>} />
          <Route path="/questions/:id" element={<Layout><QuestionDetailPage /></Layout>} />
          <Route path="/coding" element={<Layout><CodingTestPage /></Layout>} />
          <Route path="/coding/:id" element={<Layout><CodingProblemPage /></Layout>} />
          <Route path="/settings" element={<Layout><SettingsPage /></Layout>} />
          <Route path="/admin" element={<Layout><AdminPage /></Layout>} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App