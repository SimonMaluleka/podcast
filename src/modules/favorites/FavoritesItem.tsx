import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import { useAppContext } from '../../context/AppContext'
import { FavoriteProp } from '../../helpers/types'



const FavoritesItem = () => {
  const { favorites } = useAppContext()         
  return ( 
    favorites.map((item: FavoriteProp, index)=> 
        <Card 
            variant="outlined"
            key={index} 
            sx={{
            display: "flex",
            flexDirection: { xs:'column', sm:'row'},
            margin: '4px'
            }}>
             <CardMedia
                component="img"
                loading="eager"
                sx={{height:'100%', width: '150px'}}
                alt={String(item.episode)}
                image={item.image}
              />
              <CardContent className='flex flex-col items-center'>
                <Typography gutterBottom variant="h5" component="div">
                    { item.description}
                </Typography>
                <Box sx={{display:'flex'}}>

                </Box>
             </CardContent>
             </Card>
    )
  )
}

export default FavoritesItem