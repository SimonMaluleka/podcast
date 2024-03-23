import { ArrowRight } from '@mui/icons-material'
import { Avatar, Box, Container, Divider, TextField, Typography } from '@mui/material'
import React from 'react'

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
        <ArrowRight />
      </Box>
      <Box sx={{display:'flex', alignItems:'center'}}>
        <Box>
          <Typography variant='body2'>Phone number</Typography>
          <TextField value={'+27070000000'}></TextField>
        </Box>
        <ArrowRight />
      </Box>
      <Box sx={{display:'flex', alignItems:'center'}}>
        <Box>
          <Typography variant='body2'>Email</Typography>
          <TextField value={'username@podcast-streamer.com'}></TextField>
        </Box>
        <ArrowRight />
      </Box>
    </Container>
  )
}

export default Account