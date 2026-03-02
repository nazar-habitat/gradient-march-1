# Feature Summaries

Short overview of each major feature for design and Figma prompts. **Mock data for each feature is created by engineering when you work on that feature**—see **mock-data-guide.md**. Data shapes below come from our TypeScript interfaces; use them so labels and fields in designs match the app.

---

## Overview (Data center overview)

- **Purpose**: High-level dashboard / landing after login.
- **Main screens**: Overview page with key metrics or navigation to other features.
- **Data**: Site/customer context; optional KPI summaries. Request mock data from engineering when designing.

---

## Recommendations

- **Purpose**: List and manage optimization recommendations (filter, sort, open detail drawer, status actions).
- **Main screens**: Table of recommendations; filter bar (site, component, date, impact, urgency, effort, occurs); drawer for recommendation detail; status dropdown and actions.
- **Data shapes** (from interfaces): `RecommendationData` — e.g. site, component, urgency (label, value, colorClass), effort (daysToImplement), impact (per metric), detection (firstDate, lastDate, count, daysOpen), entity (id, name), status. `RecommendationResponse`: `{ data: RecommendationData[], totals: TotalsRecommendationData }`. Filter state: sites, components, dates, effort, urgency, impact, occurs.
- **Mock data**: Request "Recommendations" mock data; we'll add e.g. `mock-data/recommendations.json`.

---

## Implementations

- **Purpose**: Show implemented recommendations, KPI totals, top implementations, and a full implementations table.
- **Main screens**: KPI metric cards (energy, water, emissions, etc.); "top implementations" slider/cards; data table; implementation detail drawer.
- **Data shapes**: `ImplementationData` — key, site, location (room, floor), urgency, effort, impact (per metric), detection, entity, diagnosticsDescription, solutionProposed, etc. Totals and impact-over-time for charts.
- **Mock data**: Request "Implementations" mock data; we'll add e.g. `mock-data/implementations.json`.

---

## Reports (Report export & export activity)

- **Purpose**: (1) 3-step export wizard (sites/assets + date → data points → confirmation → download). (2) Export activity table (past exports, open detail, reuse config).
- **Main screens**: Reports page with "Export" CTA and activity table; ExportDataModal with Step1 (sites, assets, date range), Step2 (KPIs), Step3 (confirmation); ExportItemModal for viewing a past export.
- **Data shapes**: Sites → components → assets tree; sites → components → KPIs tree; export config (sites, assets, data points, date range); activity rows (e.g. export id, date, status, config summary).
- **Mock data**: Request "Report export" / "Export activity" mock data if you need realistic trees and configs; we'll add to `mock-data/`.

---

## ADCA (Data Center Analysis)

- **Purpose**: Analytical view with filters and charts (e.g. scatter, time resolution, KPI/color options).
- **Main screens**: Filter bar (sites, components, date range, KPI dropdown, time resolution); chart area (scatter and other visualizations).
- **Data shapes**: Filter params; chart data (e.g. scatter points, time series). See `adcaTypes.ts` for exact shapes.
- **Mock data**: Request "ADCA" mock data when designing; we'll add e.g. `mock-data/adca.json`.

---

## Insights

- **Purpose**: Insights table with filters and a detail drawer.
- **Main screens**: Filters; table of insights; drawer for insight detail.
- **Data shapes**: From `insightsTypes.ts` (insight rows, dimensions, metrics). Request mock data for the feature.
- **Mock data**: Request "Insights" mock data; we'll add to `mock-data/`.

---

## Settings

- **Purpose**: User/session settings (e.g. profile, security, preferences).
- **Main screens**: Settings page with sections (e.g. personal info, security, language). No heavy data shapes; placeholder or simple mock is enough unless we specify.
- **Mock data**: Usually minimal; ask if you need structured mock.

---

## Static data (sites, components, assets, KPIs)

- **Purpose**: Hierarchical reference data used across features (site → component → asset; site → component → KPI). Used in filters and dropdowns.
- **Data shapes**: Sites list; per-site components; per-site-component assets (with floor, room); per-site-component KPIs. Methods like getSites, getComponentsFromSite, getAssetsFromComponent, getKpisFromComponent.
- **Mock data**: Can be part of a feature mock (e.g. recommendations mock includes site/component lists) or a dedicated `static-data.json`; ask engineering.

---

## App shell (shared)

- **Layout**: Sidebar (~250px) + main content. Sidebar: nav items, language switcher. Main: header with breadcrumbs and actions.
- **No feature-specific mock**: Use design tokens and component list from **design-tokens.md** and **stack-and-context.md**.
