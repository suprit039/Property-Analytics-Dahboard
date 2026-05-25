import { createSelector } from "@reduxjs/toolkit";
import { selectFilteredRecords } from "../properties/propertiesSelectors";

export const selectKpis = createSelector([selectFilteredRecords], (records) => {
  const totalRegistered = records.length;
  const totalApproved = records.filter((r) => r.status === "Approved").length;
  const totalRejected = records.filter((r) => r.status === "Rejected").length;
  const totalCollection = records.reduce((sum, r) => sum + r.collection_inr, 0);

  return {
    totalRegistered,
    totalApproved,
    totalRejected,
    totalCollection,
    approvalRate: totalRegistered ? (totalApproved / totalRegistered) * 100 : 0,
    rejectionRate: totalRegistered ? (totalRejected / totalRegistered) * 100 : 0,
  };
});

function getMonthKey(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function getLast12Months() {
  const months = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  }
  return months;
}

export const selectKpiTrends = createSelector([selectFilteredRecords], (records) => {
  const byMonth = {};
  records.forEach((r) => {
    const key = getMonthKey(r.registration_date);
    if (!key) return;
    if (!byMonth[key]) {
      byMonth[key] = { registrations: 0, approved: 0, rejected: 0, collection: 0 };
    }
    byMonth[key].registrations += 1;
    if (r.status === "Approved") byMonth[key].approved += 1;
    if (r.status === "Rejected") byMonth[key].rejected += 1;
    byMonth[key].collection += r.collection_inr;
  });

  const last12 = getLast12Months();
  const trend = last12.map((month) => ({
    month,
    ...byMonth[month] || { registrations: 0, approved: 0, rejected: 0, collection: 0 },
  }));

  const calcChange = (getValue) => {
    if (trend.length < 2) return 0;
    const curr = getValue(trend[trend.length - 1]);
    const prev = getValue(trend[trend.length - 2]);
    if (prev === 0) return curr > 0 ? 100 : 0;
    return ((curr - prev) / prev) * 100;
  };

  return {
    trend,
    registrationsChange: calcChange((m) => m.registrations),
    approvedChange: calcChange((m) => m.approved),
    rejectedChange: calcChange((m) => m.rejected),
    collectionChange: calcChange((m) => m.collection),
  };
});
