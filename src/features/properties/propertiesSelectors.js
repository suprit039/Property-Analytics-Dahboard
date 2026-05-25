import { createSelector } from "@reduxjs/toolkit";

const selectPropertiesState = (state) => state.properties;

export const selectAllRecords = createSelector(
  [selectPropertiesState],
  (properties) => properties.allRecords
);

export const selectTenant = createSelector(
  [selectPropertiesState],
  (properties) => properties.selectedTenant
);

export const selectLoadStatus = createSelector(
  [selectPropertiesState],
  (properties) => properties.status
);

export const selectFilteredRecords = createSelector(
  [selectAllRecords, selectTenant],
  (records, tenant) =>
    tenant === "All" ? records : records.filter((r) => r.tenant === tenant)
);

export const selectCityCollectionData = createSelector([selectAllRecords], (records) => {
  const byCity = {};
  records.forEach((r) => {
    if (!byCity[r.tenant]) byCity[r.tenant] = 0;
    byCity[r.tenant] += r.collection_inr;
  });
  return Object.entries(byCity)
    .map(([city, collection]) => ({
      city,
      collection,
      collectionLakhs: collection / 1e5,
    }))
    .sort((a, b) => b.collection - a.collection);
});

export const selectStatusDistribution = createSelector(
  [selectFilteredRecords],
  (records) => {
    const approved = records.filter((r) => r.status === "Approved").length;
    const rejected = records.filter((r) => r.status === "Rejected").length;
    const pending = records.filter((r) => r.status === "Pending").length;
    return [
      { name: "Approved", value: approved, color: "#2FA084" },
      { name: "Rejected", value: rejected, color: "#C3232A" },
      { name: "Pending", value: pending, color: "#E58C00" },
    ];
  }
);
