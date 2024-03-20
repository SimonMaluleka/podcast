import { Box, Card, CardContent, CardMedia, Chip, Container, List, ListItem, Typography } from '@mui/material'
import React from 'react'
import { Show } from '../helpers/types'
import { Download, PlayArrow, Save } from '@mui/icons-material'

const FavoritesPage = () => {
    const favorites: Show[] = [
        {
        "id": "10716",
        "title": "Something Was Wrong",
        "description": "Something Was Wrong is an Iris Award-winning true-crime docuseries about the discovery, trauma, and recovery from shocking life events and abusive relationships.",
        "seasons": 14,
        "image": "https://content.production.cdn.art19.com/images/cc/e5/0a/08/cce50a08-d77d-490e-8c68-17725541b0ca/9dcebd4019d57b9551799479fa226e2a79026be5e2743c7aef19eac53532a29d66954da6e8dbdda8219b059a59c0abe6dba6049892b10dfb2f25ed90d6fe8d9a.jpeg",
        "genres": [
            1,
            2
        ],
        "updated": "2022-11-03T07:00:00.000Z"
    },
    {
        "id": "5675",
        "title": "This Is Actually Happening",
        "description": "What if your mother left to follow a cult… or you woke up in a morgue… or if your boat got caught in a storm and began to sink -- what would you do?   This is Actually Happening brings you extraordinary true stories of life-changing events told by the people who lived them. From a man who finds out a celebrity crush isn’t who she seems to a woman stranded in a Mexican desert fighting to survive, these stories will have you on the edge of your seat waiting to hear what happens next. New episodes come out every Tuesday for free. Listen 1-week early and to exclusive past episodes - all ad-free - with Wondery+ or Amazon Music with a Prime membership or Amazon Music Unlimited subscription.",
        "seasons": 12,
        "image": "https://content.production.cdn.art19.com/images/5a/4f/d4/19/5a4fd419-11af-4270-b31c-2c7ed2f563a5/bc913bc926be23d04c9a4d29a829269a753be3d2612dad91f7e92ba4618fefc5c8802af29a1d32b3261eb03f83613e2535e3c574469b0cb510c32cd8d94cfaa1.png",
        "genres": [
            2
        ],
        "updated": "2022-11-01T10:00:00.000Z"
    },
    ]
  return (
    <Container sx={{mt: "50px"}}>
        <List sx={{display:"flex", flexDirection: "column", justifyContent: "space-around"}}>
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
        </List>
    </Container>
  )
}

export default FavoritesPage