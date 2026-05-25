import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setTenant } from "../../features/properties/propertiesSlice";
import { selectTenant } from "../../features/properties/propertiesSelectors";
import { TENANTS } from "../../utils/constants";

export default function PageHeader() {
  const dispatch = useDispatch();
  const selectedTenant = useSelector(selectTenant);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 2,
        mb: 3,
        animation: "fadeInUp 0.5s ease-out both",
      }}
    >
      <Box>
        <Typography variant="h5" color="text.primary">
          Dashboard Overview
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Real-time property tax performance across urban local bodies
        </Typography>
      </Box>

      <FormControl size="small" sx={{ minWidth: 220 }}>
        <InputLabel id="tenant-select-label">Select City/Tenant</InputLabel>
        <Select
          labelId="tenant-select-label"
          label="Select City/Tenant"
          value={selectedTenant}
          onChange={(e) => dispatch(setTenant(e.target.value))}
        >
          {TENANTS.map((tenant) => (
            <MenuItem key={tenant} value={tenant}>
              {tenant === "All" ? "All Cities" : tenant}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
