import Header  from './components/header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ShowDetailsPage from './pages/ShowDetailsPage'

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
