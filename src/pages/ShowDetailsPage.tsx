import { API_BASE_URL, useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import { Box, Button, Card, CardContent, CardMedia, Container, IconButton, Typography } from '@mui/material';
import BackButton from '../components/show/showdetails/BackButton';
import { PlayArrow } from '@mui/icons-material';
import ShowMenuOptions from '../components/show/showdetails/ShowMenuOptions';
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { ShowDetails } from '../helpers/types';
import { useEffect, useRef, useState } from 'react';
import SeasonsAccordions from '../components/show/showdetails/SeasonsAccordions';

const ShowDetailsPage = () => {
  const { subscriptions, setSubscriptions } = useAppContext()
  const { id } = useParams()
  const abortControllerRef = useRef<AbortController | null>(null)
  const [showDetails, setShowDetails ] = useState<ShowDetails>()

  const handleAddSubscription = (show: ShowDetails)=> {
    setSubscriptions([...subscriptions, show])
    console.log(subscriptions)
  }
  const fetchShowDetails = async(id: string) => {
            abortControllerRef.current?.abort()
            abortControllerRef.current = new AbortController()

            try {
                const response= await fetch(`${API_BASE_URL}/id/${id}`, {
                    signal: abortControllerRef.current.signal,
                    cache: "force-cache" 
                })
                const data = await response.json() as ShowDetails
                console.log(data)
                setShowDetails(data)
            } catch (error) {
                throw new Error(`${error}`)
            }
            // } finally {
            //     setIsLoading(false)
            // }            
        }
  
  useEffect(() => {
    fetchShowDetails(id!)      
  }, [id])
        
  // const show = shows.find((show: Show) => show.id === id)
  
  return (
    <Container sx={{mt: 14}}>
        <Box sx={{ 
          display:'flex', 
          alignItems:'center', 
          justifyContent: 'space-between',
          paddingY: '8px',
          }}>
          <BackButton />
          <Box sx={{ 
          display:'flex', 
          gap: 2,
          alignItems:'center', 
          }} >
            <Button 
              onClick={() => handleAddSubscription(showDetails!)}
              variant='contained'  
              sx={{
                color:"white", 
                fontSize: '20px', 
                fontWeight: "semi-bold", 
                padding: 2,
                backgroundColor:"#ffc965"
                }}>
                  + Follow
                </Button>
            <ShowMenuOptions />
          </Box>
        </Box>
        <Card variant="elevation" sx={{
          display: "flex",
          flexDirection: {xs: "column", sm:"row"}          
          }}>
             <CardMedia
                component="img"
                loading="eager"
                alt={showDetails?.title}
                image={showDetails?.image}
                sx={{
                  width: {xs:"400px", sm: "300px"},
                  height: "100%",
                }}
              />
            <CardContent className='flex flex-col items-center justify-between'>
              <Typography gutterBottom variant="h5" component="div">
                { showDetails?.title}
              </Typography>
              <Typography>
                {showDetails?.description}
              </Typography>
              <Button 
                onClick={()=>{
                  const latestEpisode = showDetails?.seasons.slice(-1)[0].episodes.slice(-1)[0]
                  console.log(latestEpisode)
                }}
                variant='contained'
                startIcon={<PlayArrow />}
                sx={{background: "#ffc965", margin:"8px"}}
                >
                  Latest Episode
              </Button>
            </CardContent>
        </Card>
        <Box sx={{ display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <IconButton 
            onClick={()=>{}} 
            sx={{ 
              borderRadius: "8px", 
              display:'flex',
              justifyContent:'center',
              alignItems:'center',
              marginTop: '4px'
            }}>
              <Typography variant='h5'>Seasons</Typography>
              <NavigateNextIcon type="Large" sx={{color:'#ffc965'}} />
          </IconButton>
        </Box>        
        {/* List of episodes or seasons */}
        <SeasonsAccordions seasons={showDetails?.seasons} />
    </Container>
  )
}

export default ShowDetailsPage