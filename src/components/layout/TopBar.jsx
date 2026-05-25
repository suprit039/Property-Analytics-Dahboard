import { AppBar, Toolbar, Typography, Box, IconButton, Tooltip } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useThemeMode } from "../../hooks/useThemeMode";

export default function TopBar({ onToggleChat }) {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="inherit"
      sx={{
        bgcolor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ gap: 1.5, minHeight: { xs: 56, sm: 64 }, width: "100%", px: { xs: 2, md: 3 } }}>
        <AccountBalanceIcon sx={{ fontSize: 28, color: "info.main" }} />
        <Box>
          <Typography variant="subtitle1" fontWeight={700} lineHeight={1.2} color="text.primary">
            UPYOG
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Property Tax Analytics
          </Typography>
        </Box>

        <Box sx={{ flex: 1 }} />

        <Tooltip title="AI Tax Assistant">
          <IconButton
            size="small"
            onClick={onToggleChat}
            sx={{
              bgcolor: (t) => t.palette.secondary.main + "18",
              color: "secondary.main",
              "&:hover": { bgcolor: (t) => t.palette.secondary.main + "30" },
            }}
          >
            <AutoAwesomeIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}>
          <IconButton size="small" onClick={toggleTheme}>
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
