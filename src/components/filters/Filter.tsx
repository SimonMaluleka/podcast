import { Button } from '@mui/material';
import React, { useState } from 'react'
import { ContextMenuItemsProps } from '../../helpers/types';
import ContextMenu from '../ContextMenu';

const Filter = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const menuItems: ContextMenuItemsProps[] = [
        {name:"Title or Genre", icon:<input placeholder="Search Shows" className='m-2 border rounded-sm p-2' />}
    ]
  return (
    <>
        <Button  
            variant='outlined' sx={{flex: 1, width: '200px'}}
            onClick={handleButtonClick}
            >
            Filter By
        </Button>          
        <ContextMenu list={menuItems} htmlElement={anchorEl} setHtmlElementl={setAnchorEl} />
    </>
    
  )
}

export default Filter


