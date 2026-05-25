import { createSlice } from "@reduxjs/toolkit";
import { sendMessage } from "./chatThunks";

const initialMessage = {
  id: "welcome",
  role: "assistant",
  text: "How can I help you with property data today?",
  timestamp: Date.now(),
};

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [initialMessage],
    loading: false,
    error: null,
  },
  reducers: {
    clearChatError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.messages.push({
          id: `user-${Date.now()}`,
          role: "user",
          text: action.meta.arg,
          timestamp: Date.now(),
        });
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push({
          id: `assistant-${Date.now()}`,
          role: "assistant",
          text: action.payload,
          timestamp: Date.now(),
        });
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.messages.push({
          id: `error-${Date.now()}`,
          role: "assistant",
          text: `Sorry, I could not process your request. ${state.error}`,
          timestamp: Date.now(),
        });
      });
  },
});

export const { clearChatError } = chatSlice.actions;
export default chatSlice.reducer;
