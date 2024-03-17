import { Beenhere, BookmarkAdd, DeleteForever, IosShare, Launch } from '@mui/icons-material'
import { Divider, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import React, { ReactElement, useState } from 'react'
import QueueMusicIcon from '@mui/icons-material/QueueMusic';

const menuItems: {name: string, icon: ReactElement}[] = [
  {name: 'Follow Show' , icon: <BookmarkAdd /> },
  {name: 'Remove...' , icon: <DeleteForever /> },
  {name: 'Add to Queue' , icon: <QueueMusicIcon /> },
  {name: 'Mark All as played' , icon: <Beenhere /> },
  {name: 'Share Show...' , icon: <IosShare /> },
  {name: 'Copy Link' , icon: <Launch /> },
]

const ShowMenuOptions = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleEllipsesClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <>
        <IconButton 
          onClick={handleEllipsesClick} 
         sx={{ 
          borderRadius: 50, 
          display:'flex',
          justifyContent:'center',
          alignItems:'center'
        }}>
          <Typography
            sx={{
              color:"#ffc965", 
              fontWeight:'semi-bold',
            fontSize:"30px"}}
          >...</Typography>
        </IconButton>
        <Menu
          id="show-details-menu"
          aria-labelledby="show-details-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          sx={{mt:8, width:"400px"}}
        >
          {
            menuItems.map((item: { name: string , icon: React.ReactElement })=>
              <>
                <MenuItem onClick={handleClose} sx={{display:"flex", justifyContent:"space-between"}}><Typography>{ item.name }</Typography>{item.icon}</MenuItem>
                <Divider />
              </>
            )
          }
        </Menu>
    </>
    
  )
}

export default ShowMenuOptions