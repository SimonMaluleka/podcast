import React, { useState, useEffect, useRef } from 'react';
import { AudioPlayerProps, Episode } from '../../helpers/types';
import { getCurrentTime, getFormattedTime, getIconByPlayerStatus } from './utils';
import { Loop, VolumeMute } from '@mui/icons-material';
import { Paper, Grid, Typography, Slider, Container } from '@mui/material';
import { useAppContext } from '../../context/AppContext';


const AudioPlayerFunctional: React.FC<AudioPlayerProps> = ({
  width,
  height,
  rounded,
  autoPlay,
  top,
  right,
  left,
  bottom 
}: AudioPlayerProps) => {
    const [currentFile, setCurrentFile] = useState<Episode | null>(null);
    const [playProgress, setPlayProgress] = useState<{ [id: string]: number }>({});
    const [duration, setDuration] = useState(0)
    const playerRef = useRef<HTMLAudioElement | null>(null);
    
    const { episodeFile, 
            isPlaying,
            setIsPlaying, 
            isLooping, 
            setIsLooping, 
            isMuted, 
            setIsMuted 
          } = useAppContext()
    
    useEffect(() => {
    if (playerRef.current) {
      playerRef.current.volume = 0.1; // Start at low volume
      const fadeInterval = setInterval(() => {
        if (playerRef.current && playerRef.current.volume < 1) {
          playerRef.current.volume += 0.1; // Increase volume
        } else {
          clearInterval(fadeInterval); // Stop when volume is max
        }
      }, 200); // Increase volume every 200ms

      return () => clearInterval(fadeInterval); // Clean up on unmount
    }
  }, [currentFile]);

  useEffect(() => {
    if (playerRef.current && currentFile) {
      playerRef.current.currentTime = playProgress[currentFile.episode] || 0; // Set time to saved progress
    }
  }, [currentFile, playProgress]);

  const handleClick = (file: Episode) => {
    if (playerRef.current && currentFile) {
      setPlayProgress({
        ...playProgress,
        [currentFile.episode]: playerRef.current.currentTime, // Save progress
      });
      playerRef.current.pause();
      playerRef.current.currentTime = 0; // Reset time
      playerRef.current.volume = 0.1; // Reset volume
    }
    setCurrentFile(file); // Set new file
  };

  const togglePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pause();
      } else {
        playerRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

   const togglePlayLoop = () => {
    if (playerRef.current) {
      if (isLooping) {
        playerRef.current.loop = true
      } else {
        playerRef.current.loop = false
      }
      setIsLooping(!isLooping);
    }
  };

  const togglePlayMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.muted = false;
      } else {
        playerRef.current.muted = true;
      }
      setIsMuted(!isMuted);
    }
  };
  const handleChange = (file: Episode, playProgress: number | number[], player: HTMLAudioElement) => {
    if (player) {
      const currentTime = getCurrentTime(playProgress as number, player.duration);

      if (!isNaN(currentTime)) {
        player.currentTime = currentTime;
      }

      setPlayProgress({[file.episode]: currentTime});
    }
  };

const PlayStatusIcon = getIconByPlayerStatus(isPlaying); // Replace with actual function

  const isLoopEnable = isLooping === playerRef.current?.loop; // Replace with actual comparison
  const isMuteEnable = isMuted === playerRef.current?.muted; // Replace with actual comparison

  return (
    <Container
     sx={{
      display: 'flex',
      width:{width},
      zIndex: '1230',
      justifyContent:'center',
      alignItems:'center',
      position: 'absolute',
      top: {top},
      right: {right},
      left: {left},
      bottom: {bottom},
     }}
    >
        <audio
          ref={node => (playerRef.current = node)}
          loop={isLoopEnable}
          muted={isMuteEnable}
          controls
          preload="true"
          hidden        
          src={episodeFile} 
        />
        <Paper
          square={!rounded}
          elevation={1}
          style={{
            width,
            height
          }}
        >
          <Grid sx={{alignItems:"center", justify:"center", padding: 2}} spacing={4} container>
            <Grid xs={1} item>
              <Loop
                onClick={togglePlayLoop}
                focusable="true"
              />
            </Grid>
            <Grid xs={1} item>
              <PlayStatusIcon
                onClick={togglePlayPause}
                focusable="true"
              />
            </Grid>
            <Grid xs={1} item>
              <VolumeMute
                onClick={togglePlayMute}
                focusable="true"
              />
            </Grid>
            <Grid xs={9} item >
              <Grid sx={{display:'flex', justifyContent:'center', alignItems:'center'}} spacing={2} direction="row" container>
                <Grid           
                  xs={2}
                  item
                  sx={{display:'flex',alignItems: 'center'}}
                >
                  <Typography
                    align="center"
                    gutterBottom
                    noWrap
                  >
                    {getFormattedTime(current)}
                  </Typography>
                </Grid>
                <Grid
                  xs={8}
                  item
                >
                  <Slider                    
                    color="secondary"
                    value={playProgress[episodeFile]}                    
                    onChange={(_, position: number | number[]) => handleChange(position, playerRef.current!)}
                  />
                </Grid>
                <Grid
                  xs={2}
                  item
                >
                  <Typography
                    align="center"
                    gutterBottom
                    noWrap
                  >
                    {getFormattedTime(duration)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
  );
};

export default AudioPlayerFunctional;
