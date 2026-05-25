import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadProperties = createAsyncThunk("properties/load", async () => {
  const res = await fetch("/properties.json");
  if (!res.ok) throw new Error("Failed to load properties data");
  return res.json();
});

const propertiesSlice = createSlice({
  name: "properties",
  initialState: {
    allRecords: [],
    selectedTenant: "All",
    status: "idle",
    error: null,
  },
  reducers: {
    setTenant(state, action) {
      state.selectedTenant = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProperties.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadProperties.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allRecords = action.payload;
      })
      .addCase(loadProperties.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setTenant } = propertiesSlice.actions;
export default propertiesSlice.reducer;
