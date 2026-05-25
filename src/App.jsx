import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { loadProperties } from "./features/properties/propertiesSlice";
import { selectLoadStatus } from "./features/properties/propertiesSelectors";
import TopBar from "./components/layout/TopBar";
import DashboardPage from "./pages/DashboardPage";
import LoadingSpinner from "./components/common/LoadingSpinner";
import FloatingChatButton from "./components/chat/FloatingChatButton";

export default function App() {
  const dispatch = useDispatch();
  const status = useSelector(selectLoadStatus);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(loadProperties());
    }
  }, [dispatch, status]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", display: "flex", flexDirection: "column" }}>
      <TopBar onToggleChat={() => setChatOpen((prev) => !prev)} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {status === "loading" || status === "idle" ? (
          <LoadingSpinner />
        ) : status === "failed" ? (
          <LoadingSpinner message="Failed to load data. Please refresh." />
        ) : (
          <DashboardPage />
        )}
      </Box>
      <FloatingChatButton open={chatOpen} onClose={() => setChatOpen(false)} />
    </Box>
  );
}
