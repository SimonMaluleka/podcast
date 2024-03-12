import { Show } from "../../context/AppContext";
import Grid from '@mui/material/Unstable_Grid2';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';

const ShowCard = (show: Show) => { 
  const genreMap = {
    "1": "Personal Growth",
    "2":	"True Crime and Investigative Journalism",
    "3":	"History",
    "4":	"Comedy",
    "5":	"Entertainment",
    "6":	"Business",
    "7":	"Fiction",
    "8":	"News",
    "9":	"Kids and Family"
  }

  return (
    <Grid xs={4} key={show.id}>
        <Card variant="outlined" sx={{
          background: '#ffc965', 
          color:"white",
          display: "flex",
          flexDirection: "column",
          }}>
            <CardContent className='flex flex-col text-white items-center'>
              <CardMedia
                component="img"
                alt={show.title}
                image={show.image}
                sx={{ width: {xs: "100px", sm:"100vw"}, margin: "auto", borderRadius: 50 }}
              />
              
                <Typography gutterBottom variant="h5" component="div">
                    { show.title}
                </Typography>
                <Button variant="contained" sx={{fontSize: 12, width: "80%", border:" 1px solid #6467AA"}}>View Seasons {"("+show.seasons+")"}</Button>
                {
                  show.description.length > 100 ? 
                    (<Typography sx={{display:"flex", marginTop:1, flexDirection:"column", justifyContent:"center"}}>{show.description.substring(0,100)+"... "}<Button sx={{fontSize: 12}}>more</Button></Typography>)
                    : <Typography sx={{display:"flex", marginTop:1, flexDirection:"column", justifyContent:"center"}}>{show.description}<Button sx={{fontSize: 12}}>more</Button></Typography>
                }                
                <fieldset className="w-full border p-1 rounded-md">
                  <legend className="font-semibold ml-3 px-2 text-orange-500 ">Genres</legend>                  
                  <section className="flex flex-col items-start justify-between">
                    { 
                      show.genres.map((genre: number)=> <Typography sx={{fontSize: 12}}>{ Object.values(genreMap)[genre-1] }</Typography>)
                    }
                  </section>                
                </fieldset>
                <Typography sx={{fontSize: 12, marginTop: 2, }}>Last updated: { new Date(show.updated).getDay()+"-"+new Date(show.updated).getMonth()+"-"+new Date(show.updated).getFullYear() }</Typography>
            </CardContent>                     
        </Card>
    </Grid>
  )
}

export default ShowCard