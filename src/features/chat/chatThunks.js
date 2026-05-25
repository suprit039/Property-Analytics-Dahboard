import { createAsyncThunk } from "@reduxjs/toolkit";
import { buildDataSummary } from "../../hooks/useDataSummary";

const FALLBACK_MODELS = ["gemini-1.5-flash", "gemini-2.0-flash-lite", "gemini-2.5-flash-lite"];

function getModelsToTry() {
  const preferred = import.meta.env.VITE_GEMINI_MODEL?.trim();
  const models = preferred ? [preferred, ...FALLBACK_MODELS] : FALLBACK_MODELS;
  return [...new Set(models)];
}

function parseGeminiError(data, status) {
  const raw = data?.error?.message || data?.error?.status || `Gemini API error (${status})`;
  if (/quota|rate.?limit|429/i.test(raw)) {
    return (
      "Gemini quota exceeded. Wait ~1 minute and retry. Use VITE_GEMINI_MODEL=gemini-1.5-flash (avoid gemini-2.0-flash on free tier)."
    );
  }
  return raw;
}

async function callGemini(apiKey, model, prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: 512,
        temperature: 0.3,
      },
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const err = new Error(parseGeminiError(data, response.status));
    err.isQuota = response.status === 429 || /quota|rate.?limit/i.test(data?.error?.message || "");
    err.isModelError = response.status === 404 || /not found|invalid model/i.test(data?.error?.message || "");
    throw err;
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!text) {
    const blockReason = data.candidates?.[0]?.finishReason;
    throw new Error(blockReason ? `No response (${blockReason})` : "Empty response from Gemini");
  }

  return text;
}

export const sendMessage = createAsyncThunk(
  "chat/send",
  async (userText, { getState, rejectWithValue }) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      return rejectWithValue(
        "Gemini API key missing. Copy .env.example to .env and set VITE_GEMINI_API_KEY."
      );
    }

    const { allRecords } = getState().properties;
    const summary = buildDataSummary(allRecords);
    const userPrompt = `Here is the complete property data:\n\n${summary}\n\nAnswer this question using ONLY the data above. Do not guess or make up numbers. If the data does not contain the answer, say so.\n\nQuestion: ${userText}`;

    const models = getModelsToTry();
    let lastError = "All Gemini models failed.";

    for (const model of models) {
      try {
        return await callGemini(apiKey, model, userPrompt);
      } catch (err) {
        lastError = err.message;
        if (!err.isQuota && !err.isModelError) {
          return rejectWithValue(lastError);
        }
      }
    }

    return rejectWithValue(lastError);
  }
);
