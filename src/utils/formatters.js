export const formatNumber = (value) =>
  new Intl.NumberFormat("en-IN").format(Math.round(value));

export const formatCurrency = (inr) => {
  if (inr >= 1e7) {
    return `₹${(inr / 1e7).toFixed(2)} Cr`;
  }
  if (inr >= 1e5) {
    return `₹${(inr / 1e5).toFixed(2)} L`;
  }
  return `₹${new Intl.NumberFormat("en-IN").format(Math.round(inr))}`;
};

export const formatLakhs = (inr) => `${(inr / 1e5).toFixed(1)} L`;

export const formatPercent = (value, total) =>
  total === 0 ? "0%" : `${Math.round((value / total) * 100)}%`;
