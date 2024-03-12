import { AppBar, Box, Button, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material"
import { MenuIcon } from "./MenuIcon"
import { useAppContext } from "../../context/AppContext"
import Logo from'../../assets/logo.png'

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
  const { mobileMenuOpen, setMobileMenuOpen } = useAppContext()
  const { window } = props
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
  
  return (
    <Box sx={{ display: 'flex' }}>
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
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{display: { sm: 'none' } }}
                    >
                    <MenuIcon setMobileMenuOpen={setMobileMenuOpen} />
                </IconButton>
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
  )
}

export default Header