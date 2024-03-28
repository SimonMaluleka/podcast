import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Episode, Season } from '../../../helpers/types';
import { Box, Button, Card, CardContent, CardHeader, Chip, Divider} from '@mui/material';
import { Favorite, PlayArrow } from '@mui/icons-material';
import { useAppContext } from '../../../context/AppContext';
import { supabase } from '../../../auth/supabase.service';
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css'
import { useEffect, useRef } from 'react';
import AudioPlayer from '../../audioplayer/AudioPlayer';
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function SeasonsAccordions({ seasons }: { seasons: Season[] | undefined }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [expanded, setExpanded] = React.useState<string | false>('panel1');
  const { favorites, setFavorites } = useAppContext()
  const [currentFile, setCurrentFile] = React.useState<Episode | null>(null);
  const [playProgress, setPlayProgress] = React.useState<{ [id: string]: number }>({});

  const handleClick = (file: Episode) => {
    if (audioRef.current && currentFile) {
      setPlayProgress({
        ...playProgress,
        [currentFile.episode]: audioRef.current.currentTime, // Save progress
      });
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset time
      audioRef.current.volume = 0.5; // Reset volume
    }
    setCurrentFile(file); // Set new file
    audioRef.current?.play()
  };

  // useEffect(() => {
  //   if (audioRef.current) {
  //     audioRef.current.volume = 0.1; // Start at low volume
  //     const fadeInterval = setInterval(() => {
  //       if (audioRef.current && audioRef.current.volume < 1) {
  //         audioRef.current.volume += 0.1; // Increase volume
  //       } else {
  //         clearInterval(fadeInterval); // Stop when volume is max
  //       }
  //     }, 200); // Increase volume every 200ms

  //     return () => clearInterval(fadeInterval); // Clean up on unmount
  //   }
  // }, []);

  useEffect(() => {
    if (audioRef.current && currentFile) {
      audioRef.current.currentTime = playProgress[currentFile.episode] || 0; // Set time to saved progress
    }
  }, [currentFile, playProgress]);

  
  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  
  const handleAddToFavorites = async (
    id: number, 
    description: string, 
    season: number, 
    image: string
    )=>{
      try {
        const { data, error } = await supabase.from('favorites').insert([
        {
          episode: id,
          description,
          season: season,
          image,
          user: (await supabase.auth.getUser()).data.user?.id
        }
      ])

      if(error) throw new Error(error.message)
      setFavorites(prev => [...prev, data!])
      console.log(favorites)
      Store.addNotification({
        title:<Typography variant='h4'>Add to Favorites</Typography>,
        message: 'Added successfully to favorites',
        type:'success',
        container: 'top-right',
        animationIn:['animated', 'fadeIn'],
        animationOut:['animated', 'fadeOut'],
        dismiss: { duration: 5000, onScreen: true},
        width: 400
      })
    
      } catch (error) {
        console.log(error)
      }
    }
      
  return (
    <> 
      <Box sx={{width:'100%',display:'flex', alignItems: 'center', justifyContent:'center', background: '#ffc965'}}>
        <Typography variant='h4' sx={{color: '#6467AA', mr: '100px', ml: '50px',width: '600px'}}>
          <marquee >{currentFile?.title}</marquee>
        </Typography>
        <AudioPlayer audioFile={currentFile!}  audioRef={audioRef} />  
      </Box>    
      {
        seasons?.map((season: Season, index)=>(
          <Accordion key={index} expanded={expanded === `panel${index+1}`} onChange={handleChange(`panel${index}`)}>
            <AccordionSummary aria-controls={`panel${index}d-content`} id={`panel${index}d-header`}>
              <Typography variant='h5'><span className='text-semibold'>Season </span>{season?.season}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              { season.episodes.map((episode: Episode, index)=>(                
                <Card key={index} variant='elevation' sx={{my: '18px'}}>
                  <CardHeader title={<Box sx={{display:'flex', alignItems:'center', gap: 2}}><Chip label={`Episode ${episode.episode}`} sx={{background: "#ffc965", color:"white"}}/><Typography variant='h6'>{episode.title}</Typography></Box> }/>
                  <CardContent>
                    <Typography variant='body1'>{episode.description}</Typography>
                    {/* <Typography variant='body1'>{episode.episode}</Typography> */}
                    <Box sx={{mt:4, padding: 1, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <Chip
                        clickable
                        sx={{background: '#6467AA', }}
                        onClick={()=>handleClick(episode)}
                        label={<Box sx={{display:'flex'}}><PlayArrow sx={{color:'white', '&:hover':{
                              color: '#6467AA'
                            }}} /><Typography variant={'button'} color={'white'} sx={{'&:hover':{
                              color: '#6467AA'
                            }}}>Listen</Typography></Box> }
                       />
                      <Button
                        disabled={favorites.some((favorite) => favorite.season == season.season && favorite.episode == episode.episode)}
                        sx={{"&.Mui-disabled": {
                              background: "#eaeaea",
                              color: "#c0c0c0"
                            },
                            background: '#6467AA', 
                            color:'white',
                            '&:hover':{
                              color: '#6467AA'
                            }
                          }}
                        onClick={()=>handleAddToFavorites(episode.episode, episode.description, season.season, season.image)}
                        >
                          <Typography sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>Add to favorites<Favorite  sx={{color:'red'}}/></Typography>
                        </Button>
                    </Box>
                  </CardContent>
                  <Divider />
                </Card>                 
              ))}
            </AccordionDetails>
          </Accordion>
        ))
      }
      
    </>
  );
}