import Header  from './components/header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ShowDetailsPage from './pages/ShowDetailsPage'
import FavoritesPage from './pages/FavoritesPage'
import { RoutesEnum } from './routes'
import LoginPage from './pages/auth/login'
import RegisterPage from './pages/auth/register'
import ResetPasswordPage from './pages/auth/forgotPassword/ResetPasswordPage'
import SettingsPage from './pages/SettingsPage'
import Account from './modules/settings/profile/Account'
import Notifications from './modules/settings/notifications/Notifications'
import Subscriptions from './modules/settings/subscriptions/Subscriptions'
import RequireAuth from './auth'

function App() {   
  return (
      <BrowserRouter>
        <Header />
        <Routes>
          {/* public routes */}
          <Route path={RoutesEnum.Home} element={<Home />} />
          <Route path={RoutesEnum.ShowDetails} element={<ShowDetailsPage />}/>          
          <Route path={RoutesEnum.Login} element={<LoginPage />} />     
          <Route path={RoutesEnum.Register} element={<RegisterPage />}/> 
          <Route path={RoutesEnum.ResetPassword} element={<ResetPasswordPage />}/>

          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path={RoutesEnum.Favorites} element={<FavoritesPage />}/>    
            <Route path={RoutesEnum.Settings} element={<SettingsPage />}>            
              <Route index element={<Account />} />
              <Route path={RoutesEnum.Subscriptions} element={<Subscriptions />} />
              <Route path={RoutesEnum.Notifications} element={<Notifications />} />
            </Route>
          </Route>     
               
        </Routes>
      </BrowserRouter>      
  )
}

export default App
