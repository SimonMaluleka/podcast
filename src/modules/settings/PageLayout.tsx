import { NotificationsOutlined, PersonOutline, SubscriptionsOutlined } from '@mui/icons-material'
import { Box, Button, Container, Typography } from '@mui/material'
import { Outlet, useNavigate } from "react-router-dom"


export const PageLayout = () => {
  const navigate = useNavigate()
  return (
    <Container sx={{
      mt:'150px', 
      display:'flex',  
      gap: "4px"
      }}>
        <Box sx={{
          width:"25%", 
          display:"flex", 
          flexDirection:"column", 
          borderRight: "0.1rem solid #ffc965", 
          alignItems:"flex-start", 
          height: "100vh",
          gap:"8px"
          }}>
          <Box >
            <Typography 
              variant='h5' 
              sx={{color: "gray-400"}}
              >
              Settings
            </Typography>
          </Box>
          <Button 
            onClick={()=> navigate( '/settings')}
            variant='outlined' 
            sx={{
              color: "#ffc965", 
              ":hover": {background: "#6467AA", color: "white"},
              width: "90%", 
              display:'flex', 
              gap: "8px",
              justifyContent: 'flex-start'
              }}>
            <PersonOutline />
            <Typography  
              sx={{
                textDecoration:"none", 
                color: "#ffc965",
                ":hover": { color: "white"},
                }}>
                  Manage Account
              </Typography>
          </Button>
          <Button 
            onClick={()=> navigate( '/settings/subscriptions')}
            variant='outlined'
            sx={{
              color: "#ffc965",  
              width: "90%",
              ":hover": {background: "#6467AA", color: "white"},
              display:'flex', 
              gap: "8px",
              justifyContent: 'flex-start'              
              }}>
            <SubscriptionsOutlined />
            <Typography  
              sx={{
                textDecoration:"none", 
                color: "#ffc965",
                ":hover": { color: "white"},
                }}>
                  Subscriptions
                </Typography>
          </Button>
          <Button
            onClick={()=> navigate('/settings/notifications')} 
            variant='outlined'
              sx={{
                color: "#ffc965",  
                width: "90%", 
                display:'flex', 
                gap: "8px",
                justifyContent: 'flex-start'
                }}>
            <NotificationsOutlined />
            <Typography 
              sx={{
                textDecoration:"none", 
                color: "#ffc965",
                ":hover": { color: "white"},
                }}>
                  Notifications
            </Typography>
          </Button>
        </Box>
        <Box sx={{width:"75%"}}>
          <Outlet />
        </Box>
        
    </Container>    
  )
}
