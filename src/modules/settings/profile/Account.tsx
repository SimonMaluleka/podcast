import { Avatar, Box, Container, TextField, Typography } from '@mui/material'
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const Account = () => {
  return (
    <Container sx={{display:'flex', flexDirection:'column', gap: 2, width: '100%'}}>
      <Avatar />
      <Typography variant='h5'>Basic Info</Typography>
      <Box sx={{display:'flex', alignItems:'center'}}>
        <Box>
          <Typography variant='body2'>Name</Typography>
          <TextField value={'Simon Maluleka'}></TextField>
        </Box>
        <NavigateNextIcon />
      </Box>
      <Box sx={{display:'flex', alignItems:'center'}}>
        <Box>
          <Typography variant='body2'>Phone number</Typography>
          <TextField value={'+27070000000'}></TextField>
        </Box>
        <NavigateNextIcon />
      </Box>
      <Box sx={{display:'flex', alignItems:'center'}}>
        <Box>
          <Typography variant='body2'>Email</Typography>
          <TextField value={'username@podcast-streamer.com'}></TextField>
        </Box>
        <NavigateNextIcon />
      </Box>
    </Container>
  )
}

export default Account