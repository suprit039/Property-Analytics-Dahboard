import { Card, CardContent, Typography, Box } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useSelector } from "react-redux";
import { selectStatusDistribution } from "../../features/properties/propertiesSelectors";
import { formatNumber } from "../../utils/formatters";

export default function StatusDonutChart() {
  const data = useSelector(selectStatusDistribution);
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <Card sx={{ height: 420 }}>
      <CardContent sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" gutterBottom>
          Property Status Distribution
        </Typography>
        <Box sx={{ flex: 1, minHeight: 220, position: "relative" }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [formatNumber(value), name]} />
            </PieChart>
          </ResponsiveContainer>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              pointerEvents: "none",
            }}
          >
            <Typography variant="h6" fontWeight={700}>
              {formatNumber(total)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Total
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
          {data.map((item) => (
            <Box key={item.name} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: item.color }} />
              <Typography variant="body2" sx={{ flex: 1 }}>
                {item.name}
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {formatNumber(item.value)}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
