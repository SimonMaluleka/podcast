import { Container, Typography, Divider } from '@mui/material'
import Carousel from '../components/carousel/Carousel'
import Filters from '../components/filters/Filters'
import ShowList from '../components/show/ShowList'

const Home = () => {
  return (
    <Container sx={{mt: 4}}>
        <Typography variant='h5' color="black" mt={20}>Top trending podcasts</Typography>
        <Carousel /> 
        <Divider />      
        <Filters />
        <Divider /> 
        <Typography variant='h6' color="black" mt={20}>Shows to try</Typography>     
        <ShowList />
    </Container>
  )
}

export default Home