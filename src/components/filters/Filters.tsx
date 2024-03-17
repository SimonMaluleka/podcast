import { Box, Button, Container, Divider } from '@mui/material'
import Search from '../search/Seach'

const Filters = () => {
  return (
    <Container sx={{margin:"4 auto", width: '100%'}}>        
        <Box sx={{display:"flex", gap: "10px"}}>
            <Button variant='outlined' sx={{flex: 1}}>
                Show Filters
            </Button>        
            <Divider variant='fullWidth' orientation='vertical' flexItem />
            <Button  variant='outlined' sx={{flex: 1}}>
                Sort By
            </Button>
            <Divider variant='fullWidth' orientation='vertical' flexItem />
            <Search />
        </Box>
    </Container>
  )
}

export default Filters