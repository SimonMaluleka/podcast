import { Beenhere, BookmarkAdd, DeleteForever, IosShare, Launch } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import React, { ReactElement, useState } from 'react'
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import ContextMenu from '../../ContextMenu';

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
  const handleEllipsesClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
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
        <ContextMenu list={menuItems} htmlElement={anchorEl} setHtmlElementl={setAnchorEl}/>
    </>
  )
}

export default ShowMenuOptions