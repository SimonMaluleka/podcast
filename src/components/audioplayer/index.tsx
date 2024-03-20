import Player  from './utils/constants'
import React, { useState, useEffect, useRef } from 'react';
// import PropTypes from 'prop-types'; // Import PropTypes if needed
import { AudioPlayerProps } from '../../helpers/types';
import { attachToEvent, getCurrentTime, getFormattedTime, getIconByPlayerStatus, getPlayerStateFromAction, getProgress, removeFromEvent } from './utils';
import { Loop, VolumeMute } from '@mui/icons-material';
import { Paper, Grid, Typography, Slider } from '@mui/material';


const AudioPlayerFunctional: React.FC<AudioPlayerProps> = ({
  src,
  width,
  height,
  rounded,
  autoPlay,
}: AudioPlayerProps) => {
    const playerRef = useRef<HTMLAudioElement | null>(null);
    const [current, setCurrent] = useState(0);
    const [progress, setProgress] = useState<number>(0);
    const [duration, setDuration] = useState(0);
    const [loopStatus, setLoopStatus] = useState(Player.Status.UNLOOP); // Replace with actual type
    const [playStatus, setPlayStatus] = useState(Player.Status.PAUSE); // Replace with actual type
    const [muteStatus, setMuteStatus] = useState(Player.Status.UNMUTE); // Replace with actual type

    const triggerAction = (action: string) => {      
      const newState = getPlayerStateFromAction(playerRef.current!, action);
      console.log(newState)
      // if (newState) {
        
      // }
    };

  const handleTimeUpdate = (player: HTMLAudioElement) => {
    setCurrent(player.currentTime)
    setProgress(getProgress(player.currentTime, player.duration))
  };
  
  const handleCanPlay = (player: HTMLAudioElement) => {
    attachToEvent(player, Player.Events.TIME_UPDATE, handleTimeUpdate);

    setDuration(player.duration);
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
    handleCanPlay(playerRef.current!)
    if (playerRef.current) {
        attachToEvent(playerRef.current, Player.Events.CAN_PLAY, handleCanPlay )
    //   playerRef.current.addEventListener(Player.Events.CAN_PLAY, handleCanPlay);
      if (autoPlay) {
        playerRef.current.play
        
      }

      return () => {
        if(playerRef.current){
            removeFromEvent(playerRef.current, Player.Events.CAN_PLAY, handleCanPlay)
        }
        
        // playerRef.current.removeEventListener(
        //   Player.Events.CAN_PLAY,
        //   handleCanPlay
        // );
      };
    }
  }, [autoPlay]);

  const PlayStatusIcon = getIconByPlayerStatus(playStatus); // Replace with actual function

  // const isLoopEnable = loopStatus === Player.Status.LOOP; // Replace with actual comparison
  // const isMuteEnable = muteStatus === Player.Status.MUTE; // Replace with actual comparison

  return (
    <React.Fragment>
        <audio
          ref={node => (playerRef.current = node)}
          controls={true}
          preload="true"
          hidden={true}
        >
          <source src={src} />
        </audio>
        <Paper
          square={!rounded}
          elevation={1}
          style={{
            width,
            height
          }}
        >
          <Grid sx={{alignItems:"center", justify:"center", padding: 2}} spacing={0} container>
            <Grid xs={1} item>
              <Loop
                onClick={() => triggerAction(Player.Status.LOOP)}
                focusable="true"
              />
            </Grid>
            <Grid xs={1} item>
              <PlayStatusIcon
                onClick={() => triggerAction(Player.Status.PLAY)}
                focusable="true"
              />
            </Grid>
            <Grid xs={1} item>
              <VolumeMute
                onClick={() => triggerAction(Player.Status.MUTE)}
                focusable="true"
              />
            </Grid>
            <Grid xs={9} item >
              <Grid sx={{display:'flex', justifyContent:'center', alignItems:'center'}} spacing={0} direction="row" container>
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
      </React.Fragment>
  );
};

export default AudioPlayerFunctional;
