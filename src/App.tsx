import Header  from './components/header'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import Home from './pages/Home'
import ShowDetailsPage from './pages/ShowDetailsPage'

const sectionTitles = [
  "Top trending podcasts",
  "Shows to try"
]

function App() {
  
  return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<ShowDetailsPage />}/>     
        </Routes>
      </BrowserRouter>      
  )
}

export default App
