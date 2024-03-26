import { Session } from "@supabase/supabase-js";
import { ReactElement, ReactNode } from "react";
import { z } from "zod";
export type ContextMenuItemsProps = {
  name: string;
  icon?: ReactElement;
};

export interface Season {
  season: number;
  title: string;
  image: string;
  episodes: Episode[];
}

export interface Episode {
  title: string;
  description: string;
  episode: number;
  file: string;
}

export type Show = {
  id: string;
  title: string;
  description: string;
  seasons: number;
  image: string;
  genres: number[];
  updated: Date;
};

export type ShowDetails = {
  id: string;
  title: string;
  description: string;
  seasons: Season[];
  image: string;
  genres: string[];
  updated: Date;
};

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});
export type FormFields = z.infer<typeof schema>;

export type AppContextProps = {
  episodeFile: string;
  setEpisodeFile: React.Dispatch<React.SetStateAction<string>>;
  subscriptions: ShowDetails[];
  setSubscriptions: React.Dispatch<React.SetStateAction<ShowDetails[]>>;
  token: Session | null;
  setToken: React.Dispatch<React.SetStateAction<Session | null>>;
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
  shows: Show[];
  setShows: React.Dispatch<React.SetStateAction<Show[]>>;
  //   showDetails: ShowDetails;
  //   setShowDetails: React.Dispatch<React.SetStateAction<ShowDetails>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;

  //Audio player types
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  isLooping: boolean;
  setIsLooping: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ContextMenuProps = {
  showDetails?: ShowDetails;
  list: ContextMenuItemsProps[];
  htmlElement: HTMLElement | null;
  setHtmlElementl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
};

export type ClassnameTypes = {
  player?: string;
  loopIcon?: string;
  playIcon?: string;
  muteIcon?: string;
  slider?: string;
  track?: string;
  thumb?: string;
  text?: string;
};

export type AudioPlayerRefProps = {
  playerRef: HTMLAudioElement | null;
};

export type AudioPlayerProps = {
  width?: string;
  height?: string;
  rounded?: boolean;
  classes?: Record<string, string>;
  classNames?: ClassnameTypes;
  autoPlay?: boolean;
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | numbe;

  // setEpisodeFile: React.Dispatch<React.SetStateAction<string>>;
};

export type Profile = {
  id?: string;
  username: string;
  website: string;
  avatarUrl: string;
};

export type ChildrenProps = {
  children: ReactNode;
};
