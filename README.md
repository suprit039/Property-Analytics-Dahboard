# UPYOG Property Tax Analytics Dashboard

Multi-tenant property tax analytics dashboard for the UPYOG platform (NUDM Intern Assessment 2026). Built with React, Redux Toolkit, Material UI, Recharts, and Google Gemini for natural-language insights over property tax data.

## Project Overview

This dashboard visualizes 1,000 synthetic property tax records across 10 Indian cities. It provides:

- **KPI cards** — total registered, approved, rejected, and collection (filtered by tenant)
- **City comparison chart** — bar chart of tax collection per city (always shows all 10 cities)
- **Status distribution** — donut chart of approval status
- **AI Tax Assistant** — Gemini-powered chat grounded in live dataset summaries

## Prerequisites

- **Node.js** 18 or higher (20+ recommended)
- **npm** 9+
- **Google Gemini API key** for the AI chat feature ([aistudio.google.com/apikey](https://aistudio.google.com/apikey))

## Installation

```bash
cd upyog-dashboard
npm install
```

## Environment Setup

1. Copy the example env file:

   ```bash
   cp .env.example .env
   ```

2. Add your Gemini API key:

   ```bash
   VITE_GEMINI_API_KEY=AIza...
   VITE_GEMINI_MODEL=gemini-1.5-flash
   ```

   > Use `gemini-1.5-flash` on free tier — `gemini-2.0-flash` often has zero quota.

> Never commit `.env` — it is listed in `.gitignore`.

## Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

```bash
npm run build
npm run preview
```

## Folder Structure

```
src/
├── app/              # Redux store & root reducer
├── features/
│   ├── properties/   # Data loading & tenant filter
│   ├── kpi/          # Memoized KPI selectors
│   └── chat/         # Gemini chat slice & thunks
├── components/
│   ├── common/       # KpiCard, PageHeader, LoadingSpinner
│   ├── dashboard/    # Charts & KPI grid
│   ├── chat/         # Chat UI
│   └── layout/       # Sidebar & TopBar
├── hooks/            # useDataSummary for AI context
├── pages/            # DashboardPage
├── theme/            # MUI theme
└── utils/            # Formatters & constants
public/
└── properties.json   # 1000 property records
```

## Sample Chat Questions

Try asking the AI assistant:

1. Which city has the highest tax collection?
2. What is the approval rate in Mumbai?
3. How many properties are pending in Delhi?
4. What is the total collection across all cities?
5. Compare rejected properties in Chennai vs Bengaluru

## Assumptions & Known Limitations

- **Single page** — sidebar nav items are visual only (no routing); Overview is the active view.
- **Static dataset** — `properties.json` is loaded once at startup; no backend API.
- **Browser API calls** — Gemini is called directly from the browser (suitable for demos; use a backend proxy in production to hide the API key).
- **PDF Report button** — UI placeholder only; not wired to export.
- **Search bar** — decorative; not connected to filtering.
- **collection_inr** — only non-zero for `Approved` records, per assessment spec.
- **Chart vs filter** — city comparison chart always uses all records; KPIs and donut chart respect the tenant dropdown.

## Tech Stack

| Layer    | Technology        |
| -------- | ----------------- |
| Framework | React 18+ (Vite) |
| State    | Redux Toolkit     |
| UI       | Material UI v5+   |
| Charts   | Recharts          |
| AI       | Google Gemini API |
| Linting  | ESLint + Prettier |

## License

Assessment project — internal use.
