import { Container, Typography, Divider } from '@mui/material'
import Carousel from '../components/carousel/Carousel'
import Filters from '../components/filters/Filters'
import ShowList from '../components/show/ShowList'

const Home = () => {
  return (
    <Container sx={{mt: 4}}>
        <Typography variant='h5' color="black" mt={16}>Top trending podcasts</Typography>
        <Carousel /> 
        <Divider sx={{marginY: 2}}/>      
        <Filters />
        <Typography variant='h5' color="black" mt={8} mb={4}>Shows to try</Typography>     
        <ShowList />
    </Container>
  )
}

export default Home