import Grid from '@mui/material/Unstable_Grid2';
import { Show, useAppContext } from '../../context/AppContext';
import ShowCard from './ShowCard';
import { Box, Typography } from '@mui/material';


const ShowList = () => {
    const { shows, isLoading } = useAppContext()
    //const theme = useTheme();
    // const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));
    // const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Box sx={{width: "100%"}}>
      <Grid container spacing={2} columns={{ xs: 1, sm: 4, md: 12 }}>
        { 
          isLoading ? <Typography>Loading...</Typography> :shows.map((show: Show)=>(
              <ShowCard {...show}/>
          ))
        }        
      </Grid> 
    </Box>
    
        
    
  )
}

export default ShowList