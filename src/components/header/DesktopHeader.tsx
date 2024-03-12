import { Button, IconButton, Link } from "@mui/material"
import { MenuIcon } from "./MenuIcon"
import { useAppContext } from "../../context/AppContext"
import Logo from'../../assets/logo.png'
import DarkModeIcon from '@mui/icons-material/DarkMode';

const DesktopHeader = () => {
  const { setDesktopMenuOpen } = useAppContext()
  return (
    <nav className="md:flex items-center justify-between px-6 sm:py-2 lg:px-8 hidden" aria-label="Global">
      {/* logo */}
      <div className="flex flex-col md:flex-1 mt-4 items-center justify-start">
        <Link>
          <img className="h-20 w-auto" src={Logo} alt="Podcast Streamer" />
        </Link>
        <p className="text-2xl font-semibold tracking-wide leading-7 hover:text-gray-500 text-white">Podcast Streamer</p>
      </div>
      {/* login button */}
      <div className="hidden lg:flex lg:justify-end lg:items-center">
        {/* theme toggle */}
        { <IconButton><DarkModeIcon className="text-white text-2xl"/></IconButton> }
        {/* login */}
        <Button variant="contained">
          <span className="font-semibold text-white">
            Login <span aria-hidden="true"> &rarr;</span>
          </span>
        </Button>
      </div>
    </nav>
  
  )
}

export default DesktopHeader