import React, { useState, useEffect, useRef } from 'react';
import { AudioPlayerProps } from '../../helpers/types';
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
    const [duration, setDuration] = useState(0)
    const [current, setCurrent] = useState(0)
    const [progress, setProgress] = useState(0)
    const { episodeFile, 
            isPlaying,
            setIsPlaying, 
            isLooping, 
            setIsLooping, 
            isMuted, 
            setIsMuted 
          } = useAppContext()
    const playerRef = useRef<HTMLAudioElement | null>(null);

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
  const handleChange = (progress: number | number[], player: HTMLAudioElement) => {
    if (player) {
      const currentTime = getCurrentTime(progress as number, player.duration);

      if (!isNaN(currentTime)) {
        player.currentTime = currentTime;
      }

      setProgress(currentTime);
    }
  };
  
  useEffect(() => {
    // handleCanPlay(playerRef.current!)
    if (playerRef.current) {
      if (autoPlay) {
        playerRef.current.play        
      }
    }
}, [autoPlay]);

const PlayStatusIcon = getIconByPlayerStatus(isPlaying); // Replace with actual function

  // const isLoopEnable = loopStatus === Player.Status.LOOP; // Replace with actual comparison
  // const isMuteEnable = muteStatus === Player.Status.MUTE; // Replace with actual comparison

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
                    value={progress}                    
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
