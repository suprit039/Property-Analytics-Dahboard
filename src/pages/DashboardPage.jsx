import { Box } from "@mui/material";
import PageHeader from "../components/common/PageHeader";
import KpiGrid from "../components/dashboard/KpiGrid";
import ComparisonChart from "../components/dashboard/ComparisonChart";
import StatusDonutChart from "../components/dashboard/StatusDonutChart";

export default function DashboardPage() {
  return (
    <Box sx={{ p: { xs: 2, md: 3 }, width: "100%", maxWidth: "100%" }}>
      <PageHeader />
      <KpiGrid />
      <ComparisonChart />
      <Box sx={{ mt: 3 }}>
        <StatusDonutChart />
      </Box>
    </Box>
  );
}
