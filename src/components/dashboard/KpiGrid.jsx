import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { selectKpis, selectKpiTrends } from "../../features/kpi/kpiSelectors";
import KpiCard from "../common/KpiCard";

const CARDS = [
  {
    key: "totalRegistered",
    title: "Total Properties Registered",
    getValue: (k) => k.totalRegistered,
    trendKey: "registrations",
    color: "#1F6F5F",
  },
  {
    key: "totalApproved",
    title: "Total Approved",
    getValue: (k) => k.totalApproved,
    trendKey: "approved",
    color: "#2FA084",
  },
  {
    key: "totalRejected",
    title: "Total Rejected",
    getValue: (k) => k.totalRejected,
    trendKey: "rejected",
    color: "#C3232A",
  },
  {
    key: "totalCollection",
    title: "Total Collection",
    getValue: (k) => k.totalCollection,
    trendKey: "collection",
    color: "#6FCF97",
  },
];

export default function KpiGrid() {
  const kpis = useSelector(selectKpis);
  const trends = useSelector(selectKpiTrends);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(4, 1fr)" },
        gap: 2,
        mb: 3,
      }}
    >
      {CARDS.map((card, idx) => {
        const value = card.getValue(kpis);
        const trendData = trends.trend.map((m) => m[card.trendKey]);

        return (
          <KpiCard
            key={card.key}
            title={card.title}
            value={value}
            trendData={trendData}
            accentColor={card.color}
            index={idx}
          />
        );
      })}
    </Box>
  );
}
