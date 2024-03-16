import { Show } from '../../context/AppContext'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import Logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'

const CarouselShowPreview = (show: Show) => {
  const navigate = useNavigate()
 
  return (    
      <Card variant="outlined"
          key={show.id} 
          sx={{ maxWidth: 445 }}
          onClick={()=>navigate(`/${show.id}`)}
      >
         <CardMedia
                component="img"
                loading='eager'
                alt={show.title}
                image={show.image ? show.image: Logo}
                sx={{ height:"250px", sm:{ height: "300px"}, margin: "auto" }}
              />
        <CardContent sx={{width: "300px", sm: {width:"400px"}}}>
          <Typography gutterBottom variant="h6" component="div">
              { show.title}
          </Typography>
          {
            <Typography variant='body2'
              sx={{
                display:"flex", 
                marginTop:1, 
                flexDirection:"column", 
                justifyContent:"center"
              }}>
                {show.description.substring(0,100)}
              </Typography>
          }                
        </CardContent>                     
        </Card>
  )
}

export default CarouselShowPreview