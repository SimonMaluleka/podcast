import React from 'react'
import { Show, useAppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, CardContent, CardMedia, Container, Typography } from '@mui/material';

const GoBack = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate(-1);

  return (
    <Button 
        variant='contained'
        onClick={handleClick} 
        sx={{fontSize:"18px", fontWeight:"bold", margin: 4}}>
      &larr; Go Back
    </Button>
  );
};

const ShowDetailsPage = () => {
    const { shows }= useAppContext()
    const { id } = useParams()
    
    const show = shows.find((show: Show) => show.id === id)
    console.log(show)
  return (
    <Container sx={{mt: 16}}>
        <GoBack />
        <Card variant="outlined" sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%"
          }}>
             <CardMedia
                component="img"
                loading="eager"
                alt={show?.title}
                image={show?.image}
              />
            <CardContent className='flex flex-col items-center'>
              <Typography gutterBottom variant="h5" component="div">
                  { show?.title}
              </Typography>
            </CardContent>
            </Card>
    </Container>
  )
}

export default ShowDetailsPage