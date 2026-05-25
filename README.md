# UPYOG Property Tax Analytics Dashboard

Multi-tenant property tax analytics dashboard for the UPYOG platform — NUDM Intern Assessment 2026. Built with React, Redux Toolkit, Material UI, Recharts, and Google Gemini.

## Features

- **KPI Dashboard** — 4 live-updating KPI cards (total registered, approved, rejected, collection) with count-up animation and sparkline trends
- **City Filter** — dropdown to filter KPIs and donut chart by any of 10 cities or view all
- **City Comparison Chart** — bar chart comparing tax collection across all 10 cities side by side
- **Status Distribution** — donut chart showing approved / rejected / pending breakdown
- **AI Tax Assistant** — Gemini-powered chat drawer for natural-language queries about the data
- **Dark / Light Mode** — theme toggle in the top bar
- **Responsive Layout** — works on desktop and mobile

## Prerequisites

- **Node.js** 18+ (20+ recommended)
- **npm** 9+
- **Google Gemini API key** — [aistudio.google.com/apikey](https://aistudio.google.com/apikey)

## Setup

```bash
# 1. Install dependencies
cd upyog-dashboard
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env and add your Gemini key:
#   VITE_GEMINI_API_KEY=AIza...
#   VITE_GEMINI_MODEL=gemini-1.5-flash

# 3. Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build for Production

```bash
npm run build
npm run preview
```

## Sample Chat Questions

1. Which city has the highest tax collection?
2. What is the approval rate in Mumbai?
3. How many properties are pending in Delhi?
4. How many properties are rejected in Mumbai?
5. Compare total registrations between Pune and Jaipur

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
│   ├── chat/         # Chat panel, drawer, input
│   └── layout/       # TopBar (branding + actions)
├── hooks/            # useCountUp, useDataSummary, useThemeMode
├── pages/            # DashboardPage
├── theme/            # MUI light & dark theme definitions
└── utils/            # Formatters & constants
public/
└── properties.json   # 1000 synthetic property records
```

## Assumptions & Known Limitations

- **Single page** — no routing; the dashboard is the only view
- **Static dataset** — `properties.json` is loaded once at startup; no backend API
- **Browser API calls** — Gemini is called directly from the browser (use a backend proxy in production to hide the API key)
- **collection_inr** — only non-zero for `Approved` records, per assessment spec
- **City chart vs filter** — the comparison bar chart always shows all 10 cities; KPIs and donut chart respect the tenant dropdown

## Tech Stack

| Layer      | Technology          |
|------------|---------------------|
| Framework  | React 18 (Vite)    |
| State      | Redux Toolkit       |
| UI         | Material UI v5     |
| Charts     | Recharts            |
| AI         | Google Gemini API  |
| Animations | CSS keyframes + Recharts |
| Linting    | ESLint + Prettier   |

## Color Palette

Inspired by [Color Hunt #eeeeee-6fcf97-2fa084-1f6f5f](https://colorhunt.co/palette/eeeeee6fcf972fa0841f6f5f)

| Role        | Hex       |
|-------------|-----------|
| Background  | `#EEEEEE` |
| Mint Accent | `#6FCF97` |
| Teal Accent | `#2FA084` |
| Dark Teal   | `#1F6F5F` |
| Text        | `#161516` |





## License

Assessment project — internal use.
