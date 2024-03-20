import React from 'react'

const FavoritesCard = () => {
  return (
    <Card variant="outlined" sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%"
          }}>
             <CardMedia
                component="img"
                loading="eager"
                alt={show.title}
                image={show.image}
              />
            <CardContent className='flex flex-col items-center'>
              <Typography gutterBottom variant="h5" component="div">
                  { show.title}
              </Typography>
              <Chip variant="filled" label={`Seasons ${show.seasons}`} sx={{color:"white", background: '#ffc965'}} />
              {
                show.description.length > 100 ? 
                  (<Typography sx={{display:"flex", marginTop:1, flexDirection:"column", justifyContent:"center"}}>{show.description.substring(0,100)+"... "}<Button sx={{fontSize: 12}}>more</Button></Typography>)
                  : <Typography sx={{display:"flex", marginTop:1, flexDirection:"column", justifyContent:"center"}}>{show.description}<Button sx={{fontSize: 12}}>more</Button></Typography>
              }                
              <fieldset className="w-full border p-1 rounded-md">
                <legend className="font-semibold ml-3 px-2 text-[#ffc965] ">Genres</legend>                  
                <section className="flex flex-col items-start justify-between">
                  { 
                    show.genres.map((genre: number, index)=> <Typography sx={{fontSize: 12}} key={index}>{ Object.values(genreMap)[genre-1] }</Typography>)
                  }
                </section>                
              </fieldset>
              <Typography sx={{fontSize: 12, marginTop: 2, }}>Last updated: { new Date(show.updated).getDay()+"-"+new Date(show.updated).getMonth()+"-"+new Date(show.updated).getFullYear() }</Typography>
            </CardContent>                     
        </Card>
  )
}

export default Favorites