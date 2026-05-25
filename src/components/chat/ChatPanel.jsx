import { useRef, useEffect } from "react";
import { Box, Typography, Chip, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

export default function ChatPanel({ onClose }) {
  const { messages, loading } = useSelector((state) => state.chat);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", p: 2.5 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
        <Box>
          <Typography variant="h6">AI Tax Assistant</Typography>
          <Chip
            label="Online & Processing"
            size="small"
            sx={{
              mt: 0.5,
              bgcolor: (t) => t.palette.success.main + "18",
              color: "success.main",
              fontWeight: 500,
              height: 22,
              "& .MuiChip-label": { px: 1 },
            }}
          />
        </Box>
        {onClose && (
          <IconButton size="small" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      <Box
        ref={scrollRef}
        sx={{
          flex: 1,
          overflowY: "auto",
          pr: 0.5,
          mb: 1,
        }}
      >
        {messages.map((msg) => (
          <ChatMessage key={msg.id} role={msg.role} text={msg.text} />
        ))}
        {loading && (
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
            Analyzing property data...
          </Typography>
        )}
      </Box>

      <ChatInput />

      <Typography variant="caption" color="text.disabled" sx={{ mt: 1.5, textAlign: "center" }}>
        AI can make mistakes. Verify critical financial data.
      </Typography>
    </Box>
  );
}
