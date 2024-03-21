import { Menu, MenuItem, Typography } from '@mui/material'
import { ContextMenuItemsProps, ContextMenuProps } from '../helpers/types';
import { useNavigate, useParams } from 'react-router-dom';
import { signOut } from '../auth/supabase.service';

const ContextMenu = ({list, htmlElement, setHtmlElementl}: ContextMenuProps ) => {
    const open = Boolean(htmlElement);
    const { id } = useParams()
    const navigate = useNavigate()
    const handleClose = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const element = e.currentTarget.firstChild?.textContent
        console.log(element)
        switch(element){
          case "Follow Show...": alert("Follow Show")
          break       
          case "Remove...": alert("Remove...")
          break
          case "Add to Queue": alert("Add to Queue")
          break
          case "Share Show...": alert("Share Show...")
          break 
          case "Copy Link": alert(`http://localhost:5173/${id}`)
          break
          case "Settings": navigate("/settings")
          break
          case "Logout": signOut()
          break
          default: "Mark All as played"
        }
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
              <MenuItem 
                key={index}
                onClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent>)=>handleClose(e)} 
                sx={{display:"flex", justifyContent:"space-between", width: "200px"}}
                >
                <Typography>{ item.name }</Typography>
                <>{item.icon}</>
              </MenuItem>
            )
          }
    </Menu>
  )
}

export default ContextMenu