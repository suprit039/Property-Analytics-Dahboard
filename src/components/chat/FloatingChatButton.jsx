import { Drawer } from "@mui/material";
import ChatPanel from "./ChatPanel";

const DRAWER_WIDTH = 400;

export default function FloatingChatButton({ open, onClose }) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
    >
      <ChatPanel onClose={onClose} />
    </Drawer>
  );
}
