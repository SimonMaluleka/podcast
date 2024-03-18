import { API_BASE_URL } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import { Box, Button, Card, CardContent, CardMedia, Chip, Container, Divider, IconButton, Typography } from '@mui/material';
import BackButton from '../components/show/showdetails/BackButton';
import { Add, PlayArrow } from '@mui/icons-material';
import ShowMenuOptions from '../components/show/showdetails/ShowMenuOptions';
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { ShowDetails } from '../helpers/types';
import { useEffect, useRef, useState } from 'react';
import SeasonsAccordions from '../components/show/showdetails/SeasonsAccordions';


const ShowDetailsPage = () => {
  const { id } = useParams()
  const abortControllerRef = useRef<AbortController | null>(null)
  const [showDetails, setShowDetails ] = useState<ShowDetails>()

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
            <Chip 
            variant='filled' 
            icon={<Add sx={{color:'white'}} />} 
            label={'Follow'} 
            sx={{
              color:"white", 
              fontSize: '20px', 
              fontWeight: "semi-bold", 
              padding: 2,
              backgroundColor:"#ffc965"
              }}/>
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
                variant='contained'
                startIcon={<PlayArrow />}
                sx={{background: "#ffc965", margin:"8px"}}
                >
                  Latest Episode
              </Button>
            </CardContent>
          </Card>
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
          <Divider />
          {/* List of episodes or seasons */}
          <SeasonsAccordions seasons={showDetails?.seasons} />
    </Container>
  )
}

export default ShowDetailsPage