import { Container } from '@mui/material'
import React from 'react'

export const PageLayout = ({ children }: ChildrenProps) => {
  return (
    <Container>{ children }</Container>
  )
}
