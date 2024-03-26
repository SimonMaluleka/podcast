import { Avatar, Box, Typography } from '@mui/material'
import { ReactElement, useState } from 'react'
import ContextMenu from '../ContextMenu'
import { Logout, Settings } from '@mui/icons-material'
import { useTheme } from '@emotion/react'
const menuItems: {name: string, icon: ReactElement}[] = [
   {name: 'Settings' , icon: <Settings />},
   {name: 'Logout' , icon: <Logout /> },
]

const ProfileAvatar = () => {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>)=>{
    setAnchorEl(event.currentTarget);
  }

  const token = JSON.parse(sessionStorage.getItem('token')!)
  const fullName = token.user.user_metadata.first_name + " " + token.user.user_metadata.last_name


  return (
    <Box>
      <Box sx={{display: 'flex', gap:2, alignItems:'center'}}>
        <Typography variant='h5' sx={{sm: {display: 'block'}}}>{fullName}</Typography>
        <Avatar 
        variant='circular'
        onClick={handleAvatarClick}
        alt={"profile image"}
        />
      </Box>
      <ContextMenu list={menuItems} htmlElement={anchorEl} setHtmlElementl={setAnchorEl} />
    </Box>
    
  )
}

export default ProfileAvatar