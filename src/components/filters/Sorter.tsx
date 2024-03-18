import { Button } from '@mui/material'
import ContextMenu from '../ContextMenu'
import { ContextMenuItemsProps } from '../../helpers/types'
import { useState } from 'react';

const Sorter = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const menuItems: ContextMenuItemsProps[] = [
        {name:"Title alphabetically, A-Z"},
        {name:"Title alphabetically, Z-A"},
        {name:"Last update, Ascending"},
        {name:"Last update, Descending"},
    ]
  return (
    <>
        <Button  
            variant='outlined' sx={{flex: 1, width: '200px'}}
            onClick={handleButtonClick}
            >
            Sort By
        </Button>          
        <ContextMenu list={menuItems} htmlElement={anchorEl} setHtmlElementl={setAnchorEl} />
    </>
    
  )
}

export default Sorter