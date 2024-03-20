export const attachToEvent = (
  player: HTMLAudioElement,
  name: string,
  callback: (el: HTMLAudioElement) => void
) => {
  if (player) {
    player.addEventListener(name, () => callback(player), false);
  }
};
export const removeFromEvent = (
  player: HTMLAudioElement,
  name: string,
  callback: (el: HTMLAudioElement) => void
) => {
  if (player) {
    player.removeEventListener(name, () => callback(player), false);
  }
};
