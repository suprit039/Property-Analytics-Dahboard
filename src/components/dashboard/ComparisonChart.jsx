import { useMemo } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useSelector } from "react-redux";
import { selectCityCollectionData } from "../../features/properties/propertiesSelectors";
import { CITIES } from "../../utils/constants";
import { formatLakhs } from "../../utils/formatters";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        p: 1.5,
        borderRadius: 1,
        boxShadow: 2,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="subtitle2">{label}</Typography>
      <Typography variant="body2" color="primary.main">
        Collection: {formatLakhs(payload[0].value * 1e5)}
      </Typography>
    </Box>
  );
};

export default function ComparisonChart() {
  const cityData = useSelector(selectCityCollectionData);

  const chartData = useMemo(() => {
    const map = Object.fromEntries(cityData.map((d) => [d.city, d.collectionLakhs]));
    return CITIES.map((city) => ({
      city,
      collectionLakhs: Number((map[city] ?? 0).toFixed(2)),
    }));
  }, [cityData]);

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          City-wise Tax Collection Comparison
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Collection values in INR Lakhs (all cities — unaffected by tenant filter)
        </Typography>
        <Box sx={{ width: "100%", height: 320 }}>
          <ResponsiveContainer>
            <BarChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
              <XAxis
                dataKey="city"
                tick={{ fontSize: 11 }}
                interval={0}
                angle={-25}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 12 }} unit=" L" />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                formatter={() => "Collection"}
                iconType="circle"
              />
              <Bar
                dataKey="collectionLakhs"
                name="Collection"
                fill="#547C81"
                radius={[6, 6, 0, 0]}
                maxBarSize={48}
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
