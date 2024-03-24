import { Pause, PlayArrow } from "@mui/icons-material";

export * from "./actions";
export * from "./events";

export const appendZero = (number: number) =>
  number < 10 ? `0${number}` : number;

export const getFormattedTime = (time: number) => {
  const dateTime = new Date(0, 0, 0, 0, 0, time, 0);

  const dateTimeM = appendZero(dateTime.getMinutes());
  const dateTimeS = appendZero(dateTime.getSeconds());

  return `${dateTimeM}:${dateTimeS}`;
};

export const getIconByPlayerStatus = (playerStatus: boolean) => {
  switch (playerStatus) {
    case true:
      return Pause;
    default:
      return PlayArrow;
  }
};

export const getProgress = (currentTime: number, duration: number) =>
  parseFloat(String(100 * (currentTime / duration)));

export const getCurrentTime = (progress: number, duration: number) =>
  parseFloat(String((progress * duration) / 100));
