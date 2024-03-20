import Header  from './components/header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ShowDetailsPage from './pages/ShowDetailsPage'
import FavoritesPage from './pages/FavoritesPage'

function App() {  
  return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<ShowDetailsPage />}/>     
          <Route path="/favorites" element={<FavoritesPage />}/>     
        </Routes>
      </BrowserRouter>      
  )
}

export default App
