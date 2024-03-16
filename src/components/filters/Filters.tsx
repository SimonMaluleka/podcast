import { Box, Button, Container, Divider } from '@mui/material'

const Filters = () => {
  return (
    <Container sx={{margin:"4 auto"}}>        
        <Box sx={{display:"flex", gap: "10px"}}>
            <Button variant='outlined' sx={{flex: 1}}>
                Show Filters
            </Button>        
            <Divider variant='fullWidth' orientation='vertical' flexItem />
            <Button  variant='outlined' sx={{flex: 1}}>
                Sort By
            </Button>
        </Box>
    </Container>
  )
}

export default Filters