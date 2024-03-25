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
import { Box, Card, CardContent, CardHeader, Chip, Divider} from '@mui/material';
import { Favorite, PlayArrow } from '@mui/icons-material';
import { useAppContext } from '../../../context/AppContext';

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

export default function SeasonsAccordions({seasons }: { seasons: Season[] | undefined }) {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');
  const { setEpisodeFile } = useAppContext()
  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <>
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
                    <Box sx={{mt:4, padding: 1, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <Chip
                        clickable
                        sx={{background: '#6467AA'}}
                        onClick={()=> { 
                          setEpisodeFile(episode.file)
                          // setIsPlaying(true)
                          console.log("file set")
                        }}
                        label={<Box sx={{display:'flex'}}><PlayArrow sx={{color:'white'}} /><Typography variant={'button'} color={'white'}>Listen</Typography></Box> }
                       />
                      <Favorite sx={{color:'red'}}/>
                      {/* <AudioPlayerFunctional src={episode.file} /> */}
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