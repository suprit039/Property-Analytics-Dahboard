import { Card, CardContent, Box, Typography } from "@mui/material";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import useCountUp from "../../hooks/useCountUp";

export default function KpiCard({ title, value, trendData = [], accentColor = "#161516", index = 0 }) {
  const animatedValue = useCountUp(value, { duration: 1500, delay: index * 100 });

  const chartData = trendData.map((v, i) => ({ v, i }));

  return (
    <Card
      sx={{
        height: "100%",
        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        },
      }}
    >
      <CardContent sx={{ p: 2.5, display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
          {title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1.5 }}>
          <Typography variant="h4" fontWeight={700} sx={{ lineHeight: 1 }}>
            {value >= 100000 ? `₹${(animatedValue / 1e5).toFixed(1)}L` : animatedValue.toLocaleString("en-IN")}
          </Typography>
        </Box>

        {trendData.length > 0 && (
          <Box sx={{ width: "100%", height: 48, mt: 0.5 }}>
            <ResponsiveContainer>
              <AreaChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id={`grad-${title.replace(/\s/g, "")}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={accentColor} stopOpacity={0.25} />
                    <stop offset="100%" stopColor={accentColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke={accentColor}
                  strokeWidth={2}
                  fill={`url(#grad-${title.replace(/\s/g, "")})`}
                  isAnimationActive={true}
                  animationDuration={800}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
