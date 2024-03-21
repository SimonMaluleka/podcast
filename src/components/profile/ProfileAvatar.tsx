import { Avatar, Box } from '@mui/material'
import { ReactElement, useState } from 'react'
import ContextMenu from '../ContextMenu'
import { Logout, Settings } from '@mui/icons-material'
const menuItems: {name: string, icon: ReactElement}[] = [
   {name: 'Settings' , icon: <Settings />},
   {name: 'Logout' , icon: <Logout /> },
]

const ProfileAvatar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>)=>{
    setAnchorEl(event.currentTarget);
  }
  return (
    <Box>
      <Avatar 
        variant='circular'
        onClick={handleAvatarClick}
        alt={"profile image"}
      />
      <ContextMenu list={menuItems} htmlElement={anchorEl} setHtmlElementl={setAnchorEl} />
    </Box>
    
  )
}

export default ProfileAvatar