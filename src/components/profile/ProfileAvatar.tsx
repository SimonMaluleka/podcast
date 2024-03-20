import { Avatar } from '@mui/material'
import React from 'react'

const ProfileAvatar = (name: string) => {
  return (
    <Avatar 
        variant='circular'
        alt={name}
    />
  )
}

export default ProfileAvatar