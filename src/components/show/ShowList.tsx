import Grid from '@mui/material/Unstable_Grid2';
import { useAppContext } from '../../context/AppContext';
import ShowCard from './ShowCard';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';

const sectionTitles = [
  "Top trending podcasts",
  "Shows to try"
]

const ShowList = () => {
    const { shows, isLoading } = useAppContext()

    // const [sort, setSort] = useState<string>('')

    "By Title, A-Z"
    "By Title, Z-A"
    "By Updated, ASC"
    "By Updated, DSC"
    
    // const sortedShows = ()=>{

    // }
    //const theme = useTheme();
    // const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));
    // const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Box sx={{width: "100%", margin: "0 auto"}}>
      <Grid container spacing={2} columns={{ xs: 1, sm: 4, md: 12 }}>
        { 
          isLoading ? <Typography>Loading...</Typography> :
          shows.
          // sort((a, b) => {
          //   if(sort === "By Title, A-Z"){
          //     return a.title - b.title
          //   }

          // }).
          map((show: Show)=>(
              <ShowCard {...show} key={show.id}/>
          ))
        }        
      </Grid> 
    </Box>
    
        
    
  )
}

export default ShowList