import { Container } from '@mui/material'
import FavoritesItem from '../modules/favorites/FavoritesItem'

const FavoritesPage = () => {
  return (
    <Container sx={{mt: "50px"}}>
        <FavoritesItem />
        {/* <List sx={{display:"flex", flexDirection: "column", justifyContent: "space-around"}}>
            { favorites.map((show: Show)=>(                
                <Card variant="elevation" key={show.id} sx={{display: "flex", height: "200px", width: "100%",alignItems:'center'}}>
                    <CardMedia 
                    sx={{width: "200px"}}
                        component="img"
                        loading="eager"
                        alt={show.title}
                        image={show.image}
                    />
                    <CardContent sx={{display:"flex", flexDirection:"column", flex: 1, justifyContent: "space-between", height: "100%", width:"100%"}}>
                        <Typography variant='body2'>{new Date(show.updated).getDate() +" "+ new Date(show.updated).getMonth()}</Typography>
                        <Typography variant='body2'>{show.title}</Typography>
                        <Box sx={{display:'flex', width: "100%"}}>
                            <Chip label={<PlayArrow /> + "40m"}/>
                            <Box sx={{display:'flex'}}>
                                <Save />
                                <Download />
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </List> */}
    </Container>
  )
}

export default FavoritesPage