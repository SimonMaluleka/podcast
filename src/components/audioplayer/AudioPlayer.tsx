import React from 'react';
import { Episode } from '../../helpers/types';
import { Container } from '@mui/material';

type Props = {
  audioFile: Episode;
  audioRef: React.LegacyRef<HTMLAudioElement> | undefined
  };

const AudioPlayer: React.FC<Props> = ({audioFile, audioRef}) => {   
  return (
    <Container
    sx={{margin: 4, alignItems:'center'}}>
      {/* {audioFile && ( */}
        <audio ref={audioRef} src={audioFile?.file} autoPlay controls />
        {/* )}  */}
    </Container>
  );
};

export default AudioPlayer;
