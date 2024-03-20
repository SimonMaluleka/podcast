import Header  from './components/header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ShowDetailsPage from './pages/ShowDetailsPage'
import FavoritesPage from './pages/FavoritesPage'
import { RoutesEnum } from './routes'
import LoginPage from './pages/auth/login'
import RegisterPage from './pages/auth/register'

function App() {  
  return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={RoutesEnum.Home} element={<Home />} />
          <Route path={RoutesEnum.ShowDetails} element={<ShowDetailsPage />}/>     
          <Route path={RoutesEnum.Favorites} element={<FavoritesPage />}/>     
          <Route path={RoutesEnum.Login} element={<LoginPage />}/>     
          <Route path={RoutesEnum.Register} element={<RegisterPage />}/>     
        </Routes>
      </BrowserRouter>      
  )
}

export default App
