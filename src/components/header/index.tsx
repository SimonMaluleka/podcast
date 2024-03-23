import { AppBar, Box, Button, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material"
import { useAppContext } from "../../context/AppContext"
import Logo from'../../assets/logo.png'
import { Menu } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../routes";
import ProfileAvatar from "../profile/ProfileAvatar";

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const Header = (props: Props) => {
  const { mobileMenuOpen, setMobileMenuOpen, token } = useAppContext()
  const { window } = props
  const location = useLocation();
  const handleDrawerToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const drawer = (
    <Box 
        onClick={handleDrawerToggle} 
        sx={{ 
            textAlign: 'center', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'space-between'
         }}
    >
      <Box sx={{
        display: {xs: 'flex',},
        flexDirection:"column",
        alignItems: 'center',
        justifyContent: 'center',
        paddingY: 4,
        backgroundColor:'#6467AA'
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
            sx={{color:'white'}}           
            >
              Podcast Streamer
            </Typography>
      </Box>
      <Box sx={{
        display: "flex",
        flexDirection:"column",
        justifyContent: "space-between",
        height:"490px"
      }}>
        <List sx={{flex: 1}}>
            {navItems.map((item) => (
            <ListItem key={item} disablePadding>
                <ListItemButton sx={{ textAlign: 'center', color: '#6467AA' }}>
                <ListItemText primary={item} />
                </ListItemButton>
            </ListItem>
            ))}
        </List>
        <Box sx={{ display: 'block', justifyItems: "flex-end"  }}>
            <Button variant="text" sx={{backgroundColor: "#ffc965", margin: 1, width:"100%", color:"white"}}>
              <span>
                 Login <span aria-hidden="true"> &rarr;</span>
              </span>
            </Button>
        </Box>
        </Box>
    </Box>)
  const container = window !== undefined ? () => window().document.body : undefined;
  const navigate = useNavigate()

  if (location.pathname === '/login') {
    return null; // Hide the component
  }

  return (
    <Box sx={{ display: 'flex', width:{sm: '100%'} }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Box sx={{ 
            paddingTop:"1rem",
            width: "100%",
            flex: 1, 
            display:'flex', 
            flexDirection:"column", 
            justifyContent:"center", 
            alignItems:"center",  
            color: '#fff'
            }}>
                <Link to={RoutesEnum.Home} className="flex flex-col justify-center items-center">
                  <img
                  src={Logo}
                  width={50}
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
                </Link>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{display: { sm: 'none' } }}
                    >
                    <span className="sr-only" hidden>Open main menu</span>
                    <Menu  className={`h-6 w-12 text-[#ffc965]`} aria-hidden="true" />
                </IconButton>
          </Box>
          
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            { token == null ? <Button variant="text" onClick={()=>navigate(RoutesEnum.Login)}>
              <span className="font-semibold text-white">
                Login <span aria-hidden="true"> &rarr;</span>
              </span>
            </Button>:
            <Box sx={{display:'flex'}}>
             <Button variant="text" onClick={()=>navigate(RoutesEnum.Favorites)}>
              <span className="font-semibold text-white flex items-center">
                Favorites
              </span>
              </Button>
              <ProfileAvatar />
              {/* <Button 
                variant="contained" 
                sx={{backgroundColor: "#ffc965"}}
                onClick={()=>{
                  signOut()
                  setToken(null)
                  sessionStorage.removeItem("token")
                  navigate(RoutesEnum.Home)
                }
              }>
                <span className="font-semibold text-white flex items-center">
                  Logout
                </span>
              </Button> */}
            </Box>
            }
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
  )
}

export default Header