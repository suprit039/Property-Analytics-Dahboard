import { useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../features/chat/chatThunks";

export default function ChatInput() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.chat.loading);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    dispatch(sendMessage(trimmed));
    setText("");
  };

  return (
    <Box sx={{ display: "flex", gap: 1, pt: 1 }}>
      <TextField
        fullWidth
        size="small"
        placeholder="Ask about tax performance..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
        disabled={loading}
      />
      <IconButton
        color="primary"
        onClick={handleSend}
        disabled={loading || !text.trim()}
        sx={{ bgcolor: "primary.main", color: "white", "&:hover": { bgcolor: "primary.dark" } }}
      >
        <SendIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
