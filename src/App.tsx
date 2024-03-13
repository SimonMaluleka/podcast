import Carousel from './components/carousel/Carousel'
import { Box, Toolbar } from '@mui/material'
import Header  from './components/header'
import ShowList from './components/show/ShowList'


function App() {
  return (
    <>
      <Header />
      <Carousel />       
      <Toolbar sx={{ height: 160 }}/>
      <Box sx={{marginX: 2}}>
        <ShowList />
      </Box>     
    </>
  )
}

export default App
