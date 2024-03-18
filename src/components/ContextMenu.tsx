import { Box, Divider, Menu, MenuItem, Typography } from '@mui/material'
import { ContextMenuItemsProps, ContextMenuProps } from '../helpers/types';

const ContextMenu = ({list, htmlElement, setHtmlElementl}: ContextMenuProps ) => {
    const open = Boolean(htmlElement);
    const handleClose = () => {
        setHtmlElementl(null);
    };
  return (
    <Menu
          id="show-details-menu"
          aria-labelledby="show-details-positioned-button"
          anchorEl={htmlElement}
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
            list.map((item: ContextMenuItemsProps, index )=>
              <Box key={index}>
                <MenuItem onClick={handleClose} sx={{display:"flex", justifyContent:"space-between"}}><Typography>{ item.name }</Typography>{item.icon}</MenuItem>
                <Divider />
              </Box>
            )
          }
    </Menu>
  )
}

export default ContextMenu