import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectAllRecords } from "../features/properties/propertiesSelectors";
import { CITIES } from "../utils/constants";

export function buildDataSummary(records) {
  if (!records.length) return "No property data loaded.";

  const byCity = {};
  let totalApproved = 0;
  let totalRejected = 0;
  let totalPending = 0;
  let totalCollection = 0;

  records.forEach((r) => {
    if (!byCity[r.tenant]) {
      byCity[r.tenant] = { total: 0, approved: 0, rejected: 0, pending: 0, collection: 0 };
    }
    const c = byCity[r.tenant];
    c.total += 1;
    if (r.status === "Approved") {
      c.approved += 1;
      totalApproved += 1;
    } else if (r.status === "Rejected") {
      c.rejected += 1;
      totalRejected += 1;
    } else {
      c.pending += 1;
      totalPending += 1;
    }
    c.collection += r.collection_inr;
    totalCollection += r.collection_inr;
  });

  const cityLines = CITIES.map((city) => {
    const c = byCity[city] || { total: 0, approved: 0, rejected: 0, pending: 0, collection: 0 };
    return `${city}: ${c.total} total, ${c.approved} approved, ${c.rejected} rejected, ${c.pending} pending, ₹${(c.collection / 1e5).toFixed(1)}L collection`;
  });

  const topCity = CITIES.reduce(
    (best, city) => {
      const col = byCity[city]?.collection ?? 0;
      return col > best.collection ? { city, collection: col } : best;
    },
    { city: CITIES[0], collection: 0 }
  );

  return [
    `There are exactly 1000 properties across 10 cities. collection_inr is non-zero only for Approved properties.`,
    ``,
    ...cityLines,
    ``,
    `Totals across all cities: ${totalApproved} approved, ${totalRejected} rejected, ${totalPending} pending, ₹${(totalCollection / 1e5).toFixed(1)}L (₹${(totalCollection / 1e7).toFixed(2)}Cr) total collection.`,
    `City with highest collection: ${topCity.city} at ₹${(topCity.collection / 1e5).toFixed(1)}L.`,
  ].join("\n");
}

export default function useDataSummary() {
  const records = useSelector(selectAllRecords);
  return useMemo(() => buildDataSummary(records), [records]);
}
