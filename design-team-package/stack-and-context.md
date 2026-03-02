# Stack & Context (Mentor Frontend)

## Repo snapshot (AGENTS.md)

- Monorepo: React SPA + Fastify BFF + Nginx. Design work is **frontend-only**; no BFF or auth in Figma.
- **react-frontend/**: React 19 + Vite 7, feature-first structure (`components/`, `features/`, `pages/`, hooks, stores), Tailwind + Ant Design.
- Spec-Driven Development (SDD) under `specs/`; designers don’t need repo access—this package is the source of truth for design.

## Project overview

- **Product**: Data center cooling optimization platform; analytics and insights to save resources and make infrastructure more sustainable.
- **Frontend**: User interface for analytics, recommendations, implementations, reports, ADCA, insights, settings.

## Frontend tech stack

- **Framework**: React 19 + Vite 7, TypeScript.
- **Routing**: TanStack Router.
- **State**: Zustand (+ Immer).
- **Data fetching**: TanStack React Query + Axios (design uses **mock data only**).
- **UI**: Ant Design 5 (with React 19 patch), Tailwind CSS v4, Plotly.js for charts.
- **Auth** (not in Figma): Stytch B2B.
- **i18n**: i18next.
- **Other**: date-fns, papaparse, react-to-print.

## Frontend structure (for reference)

- **components/** — Reusable UI: `ui/` (Header, Sidebar, buttons, tags, modals), `charts/`, `filters/`, `recommendations/`, `implementations/`, `insights/`, `reports/`, `ADCA/`.
- **pages/** — Route-level screens: ADCA, Implementations, Insights, Recommendations, Reports, Settings, Login, etc.
- **routes/** — TanStack Router: `_private/` (overview, data-center-analysis, implementations, insights, recommendations, reports, settings), `_public/` (login, authenticate, totp, etc.).
- **hooks/** — Data and UI hooks (design doesn’t call APIs; mock data is provided per feature).
- **store/** — Zustand stores.
- **interfaces/** — TypeScript types (recommendationTypes, implementationTypes, adcaTypes, staticDataTypes, insightsTypes, chillerPerformanceTypes). Data shapes for mock data and designs.

## Conventions

- Organize by feature; UI follows Ant Design–style components (tables, filters, drawers, modals). Design system and tokens are defined in the design team’s own project and Figma MCP.
- Tables, filters (site, component, date, impact, urgency), drawers for details, modals for actions.
- Charts: Plotly-style placeholders (title, legend, chart area).

## Component names (for handoff annotations)

When annotating Figma so we can integrate later, you can reference these existing component names where the design matches. (New components are fine—we'll implement them.)

- **Layout**: `Sidebar`, `Header`
- **Filters**: `SitesSelect`, `ComponentDropdown`, `AssetDropdown`; feature-specific: `RecommendationFilters`, `ImplementationFilters`, `InsightsFilters`; ADCA: `Filters`, `KPIDropdown`, `TimeResolutionDropdown`
- **Recommendations**: `RecommendationTable`, `RecommendationDrawer`, `RecommendationFilters`, `RecommendationActionMenu`, `StatusDropdown`
- **Implementations**: `ImplementationTable`, `ImplementationDrawer`, `ImplementationFilters`, `ImplementationPick`, `ImplementationItem`, `MetricWidgets`, `SavingComparisonTable`, `SavingComparisonDrawer`
- **Reports**: `ExportDataModal`, `Step1SelectSitesAndAssets`, `Step2SelectDataPoints`, `Step3Confirmation`, `ExportActivityTable`, `ExportItemModal`
- **Insights**: `InsightsTable`, `InsightsFilters`, `InsightsDrawer`
- **ADCA**: `AdcaCharts`, `Filters`, `ChillerPerformanceModal`
- **Charts**: `BoxPlotChart`, `LinePlotChart`, `ScatterPlotChart`, `PueChart`, `TimelineChart`, etc.
- **UI**: `StatusTag`, `UrgencyTag`, `EffortTag`, `ImpactTagsContainer`, `NoDataFound`, `LoadingComponent`, `ErrorComponent`

See **handoff-and-integration.md** for how we use these when integrating.
