import { Box, Container } from '@mui/material'

const SettingsPage = () => {
  return (
    <Container sx={{mt:'180px', display:'flex'}}>
        <Box sx={{width:"30%"}}>
            settings leftside
        </Box>
        <Box sx={{width:"70%"}}>
            settings main
        </Box>
    </Container>
  )
}

export default SettingsPage