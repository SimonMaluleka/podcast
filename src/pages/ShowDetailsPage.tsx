import { Show, useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import { Box, Card, CardContent, CardMedia, Chip, Container, Typography } from '@mui/material';
import BackButton from '../components/show/showdetails/BackButton';
import { Add } from '@mui/icons-material';
import ShowMenuOptions from '../components/show/showdetails/ShowMenuOptions';



const ShowDetailsPage = () => {
  const { shows }= useAppContext()
  const { id } = useParams()
  
  const show = shows.find((show: Show) => show.id === id)

  return (
    <Container sx={{mt: 18}}>
        <Box sx={{ 
          display:'flex', 
          alignItems:'center', 
          justifyContent: 'space-between',
          paddingY: '8px',
          }}>
          <BackButton />
          <Box sx={{ 
          display:'flex', 
          gap: 2,
          alignItems:'center', 
          }} >
            <Chip 
            variant='filled' 
            icon={<Add color='white' />} 
            label={'Follow'} 
            sx={{
              color:"white", 
              fontSize: '20px', 
              fontWeight: "semi-bold", 
              padding: 2,
              backgroundColor:"#ffc965"
              }}/>
            <ShowMenuOptions />
          </Box>
        </Box>
        <Card variant="elevation" sx={{
          display: "flex",
          flexDirection: "column",
          
          }}>
             <CardMedia
                component="img"
                loading="eager"
                alt={show?.title}
                image={show?.image}
              />
            <CardContent className='flex flex-col items-center'>
              <Typography gutterBottom variant="h5" component="div">
                  { show?.title}
              </Typography>
            </CardContent>
            </Card>
    </Container>
  )
}

export default ShowDetailsPage