import { Box, Container, Divider } from '@mui/material'
import Search from '../search/Seach'
import Sorter from './Sorter'
import Filter from './Filter'

const Filters = () => {
  return (
    <Container sx={{margin:"4 auto", width: '100%'}}>        
        <Box sx={{display:"flex", gap: "10px"}}>
          <Filter />        
          <Divider variant='fullWidth' orientation='vertical' flexItem />
          <Sorter />
          <Divider variant='fullWidth' orientation='vertical' flexItem />
          <Search />
        </Box>
    </Container>
  )
}

export default Filters