import Player from "./constants";

export const playAudio = (player: HTMLAudioElement) => {
  if (player) {
    let playStatus = null;

    if (player.paused) {
      player.play();
      playStatus = Player.Status.PLAY;
    } else {
      player.pause();
      playStatus = Player.Status.PAUSE;
    }

    return { playStatus };
  }

  return null;
};

export const muteAudio = (player: HTMLAudioElement) => {
  if (player) {
    let muteStatus = null;

    if (player.muted) {
      player.muted = false;
      muteStatus = Player.Status.UNMUTE;
    } else {
      player.muted = true;
      muteStatus = Player.Status.MUTE;
    }

    return { muteStatus };
  }

  return null;
};

export const loopAudio = (player: HTMLAudioElement) => {
  if (player) {
    let loopStatus = null;

    if (player.loop) {
      player.loop = false;
      loopStatus = Player.Status.UNLOOP;
    } else {
      player.loop = true;
      loopStatus = Player.Status.LOOP;
    }

    return { loopStatus };
  }

  return null;
};

export const getPlayerStateFromAction = (
  player: HTMLAudioElement,
  action: string
) => {
  let newState = null;

  switch (action) {
    case Player.Status.LOOP:
      newState = loopAudio(player);
      break;
    case Player.Status.MUTE:
      newState = muteAudio(player);
      break;
    case Player.Status.PLAY:
    default:
      newState = playAudio(player);
      break;
  }

  return newState;
};

// classes={{
//                       root: css(classes["player-slider-container"], slider),
//                       track: css(classes["player-slider-track"], track),
//                       thumb: css(classes["player-slider-thumb"], thumb)
//                     }}
