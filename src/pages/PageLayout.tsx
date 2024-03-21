import { Container } from '@mui/material'
import { ChildrenProps } from '../helpers/types'

export const PageLayout = ({ children }: ChildrenProps) => {
  return (
    <Container sx={{}}>{ children }</Container>
  )
}
