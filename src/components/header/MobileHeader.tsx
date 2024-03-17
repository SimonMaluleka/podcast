import { AppBar, Box, Button, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material"
import { MenuIcon } from "./MenuIcon"
import { useAppContext } from "../../context/AppContext"
import Logo from'../../assets/logo.png'

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];
interface Props {
  window?: () => Window;
}

const MobileHeader = (props: Props) => {
  const { mobileMenuOpen, setMobileMenuOpen } = useAppContext()
  const { window } = props
  const handleDrawerToggle = () => {
    setMobileMenuOpen((prevState) => !prevState);
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>)
  const container = window !== undefined ? () => window().document.body : undefined;
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon setMobileMenuOpen={setMobileMenuOpen} />
          </IconButton>
          <Box sx={{ 
            display: 'block', 
            paddingTop:"2rem",
            paddingBottom: "1rem",
            flex: 1, 
            flexDirection:"column", 
            justifyContent:"center", 
            alignItems:"center",  
            color: '#fff'
            }}>
            <img
              src={Logo}
              width={80}
              alt="Podcast Streamer"
              loading="lazy"
            />
            <Typography
            variant="h6"
            component="div" 
            sx={{}}           
            >
              Podcast Streamer
            </Typography>
          </Box>
          
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button variant="text">
              <span className="font-semibold text-white">
                Login <span aria-hidden="true"> &rarr;</span>
              </span>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileMenuOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      
    </Box>
    // <nav className="flex flex-col items-center justify-between px-6 py-4 lg:p-8 sm:hidden" aria-label="Global">
    //   {/* logo */}
    //   <div className="flex flex-col items-center lg:flex-1">
    //     <Link>
    //       <img className="h-10 w-auto" src={Logo} alt="Podcast Streamer" />
    //     </Link>
    //     <p className="text-xl font-semibold tracking-wide leading-7 hover:text-gray-500 text-white">Podcast Streamer</p>
    //   </div>
    //   {/* mobile menu icon */}
    //   <MenuIcon setMobileMenuOpen={ setMobileMenuOpen }/>
    // </nav>
  
  )
}

export default MobileHeader