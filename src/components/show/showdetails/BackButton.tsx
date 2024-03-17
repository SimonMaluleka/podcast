import { IconButton } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useNavigate } from "react-router-dom";


const BackButton = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate(-1);
  return (    
      <IconButton 
        onClick={handleClick} 
        sx={{ 
          borderRadius: 50, 
          background: '#ffc965',
          display:'flex',
          justifyContent:'center',
          alignItems:'center'
        }}>
        <NavigateBeforeIcon sx={{color:'white'}} />
      </IconButton>      
  );
}

export default BackButton