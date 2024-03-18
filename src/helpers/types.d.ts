import { ReactElement } from "react";
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
export type AppContextProps = {
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
};

export type ContextMenuProps = {
  list: ContextMenuItemsProps[];
  htmlElement: HTMLElement | null;
  setHtmlElementl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
};
