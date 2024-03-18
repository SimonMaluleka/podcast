import { ContextMenuItemsProps } from "../helpers/types";
import {
  Beenhere,
  BookmarkAdd,
  DeleteForever,
  IosShare,
  Launch,
} from "@mui/icons-material";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";

export const showDetailsMenuItems: ContextMenuItemsProps[] = [
  { name: "Follow Show", icon: <BookmarkAdd /> },
  { name: "Remove...", icon: <DeleteForever /> },
  { name: "Add to Queue", icon: <QueueMusicIcon /> },
  { name: "Mark All as played", icon: <Beenhere /> },
  { name: "Share Show...", icon: <IosShare /> },
  { name: "Copy Link", icon: <Launch /> },
];
