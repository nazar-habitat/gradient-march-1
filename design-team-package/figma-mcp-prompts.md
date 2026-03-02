# Figma MCP Prompts (Design Team)

## How to use this package with Cursor + Figma MCP

**Reference this whole package** when you create designs. Everything in this folder is there so that:

1. You can **create** Figma screens and components that match our app (stack, data, patterns).
2. We can **integrate** your work into our codebase later with minimal rework.

**What’s in the package and why it matters**

| Document | Use it when |
|----------|-------------|
| **stack-and-context.md** | You need our tech stack (React 19, Ant Design, Tailwind, etc.), folder structure, and **component names** to annotate frames so we can map Figma → code. |
| **app-theme-and-patterns.md** | You want designs to match our theme (colors, typography, radius), UI patterns (layout, filters, tables, tabs, drawer), and **hover/focus logic**. Following this makes implementation straightforward. |
| **feature-summaries.md** | You need what each feature is for, which screens it has, and **data shapes** (field names). Use the same fields as in our interfaces so we can plug in real APIs later. |
| **mock-data-guide.md** | You need mock data for a feature. We create it per feature and add it to **mock-data/**; use only that data (no API calls). |
| **mock-data/** | Feature-specific mock files (e.g. `recommendations.json`). Reference them in your prompts so labels and content match our app. |
| **handoff-and-integration.md** | You want to know **what to deliver** (Figma + annotations) and **how we integrate** your designs into the codebase. Read this before handoff and use it to guide your annotations. |

**Your job:** You will mostly be **creating new pages** (and the components on them). Create the Figma files and screens using the prompts below. Follow our stack, data shapes, and patterns (from the docs above) so that when you hand off, we can map your frames to our routes and components and implement with minimal guesswork. Design system and tokens live in **your** project and Figma MCP; when you want parity with the app, use **app-theme-and-patterns.md** as reference.

**Before you prompt (include path in every prompt):** Keep this package in the same project as your Figma work. In each prompt, provide the path to the package (or to the specific files) so the AI can read them—e.g. design-team-package/stack-and-context.md, design-team-package/feature-summaries.md, design-team-package/mock-data/recommendations.json for the feature you’re designing. Include the path in your prompt (e.g. “Using this design package and the mock data for [feature]…”).

---

## 1. Design system

- **"Using your design system and Figma project, create a Figma component set for primary and secondary buttons and a small icon button."**

(Design system and tokens are your team’s responsibility. When you want these to match our app, use **app-theme-and-patterns.md** for colors, hover/focus, and button styles.)

---

## 2. App shell

- **"Read [path]/design-team-package/stack-and-context.md and [path]/design-team-package/app-theme-and-patterns.md, then create a desktop app shell in Figma: sidebar (250px) + main content, sidebar with nav items and language switcher, main area with header (breadcrumbs and actions). Follow our layout and patterns so it can be integrated into our codebase later."** (Replace [path] with your project path to the package, e.g. nothing if the package is at the project root, or `docs/` if the package is in docs/.)

---

## 3. Feature screens (use mock data for that feature)

Keep the package in the same project; in each prompt **provide the path** to the package and the relevant files (e.g. `[path]/design-team-package/feature-summaries.md`, `[path]/design-team-package/mock-data/recommendations.json`). Use only the mock data we provide; no API calls. Follow **app-theme-and-patterns** for tables, filters, and interactions so designs fit our codebase. You will mostly be **creating new pages** like these.

- **"Read [path]/design-team-package/feature-summaries.md (Recommendations), [path]/design-team-package/app-theme-and-patterns.md, and [path]/design-team-package/mock-data/recommendations.json, then create the Recommendations list page: table with columns for recommendation fields, filter bar (site, component, date, impact, urgency), and primary actions. Use Ant Design–style table. Use only the mock data provided. Follow our patterns so we can integrate this into our codebase (RecommendationTable, RecommendationFilters)."**

- **"Read [path]/design-team-package/feature-summaries.md (Implementations), [path]/design-team-package/app-theme-and-patterns.md, and [path]/design-team-package/mock-data/implementations.json, then create the Implementations page: KPI metric cards at top, then a 'top implementations' slider/cards, then a data table. Use only the mock data provided. Follow our patterns so we can integrate (ImplementationTable, ImplementationDrawer, MetricWidgets)."**

- **"Read [path]/design-team-package/feature-summaries.md (Reports), [path]/design-team-package/app-theme-and-patterns.md, and [path]/design-team-package/mock-data/ (Report export if available), then create the Report export flow: step 1 (select sites/assets), step 2 (select data points), step 3 (confirmation). Use only mock/placeholder data. Follow our patterns (ExportDataModal, Step1SelectSitesAndAssets, Step2SelectDataPoints, Step3Confirmation)."**

- **"Read [path]/design-team-package/feature-summaries.md (ADCA), [path]/design-team-package/app-theme-and-patterns.md, and [path]/design-team-package/mock-data/adca.json, then create the Data Center Analysis page: filter bar (sites, components, date range, KPI dropdown), chart area placeholder. Use only the mock data provided. Follow our patterns so we can integrate."**

- **"Read [path]/design-team-package/feature-summaries.md (Insights), [path]/design-team-package/app-theme-and-patterns.md, and [path]/design-team-package/mock-data/insights.json, then create the Insights page (table with filters and drawer for detail). Use only the mock data provided. Follow our patterns (InsightsTable, InsightsFilters, InsightsDrawer)."**

---

## 4. Components and states

- **"Using this design package (stack-and-context for component names, app-theme-and-patterns for filter/drawer/modal patterns), create a filter bar in Figma: site dropdown, component dropdown, date range picker, and 2–3 tag-style filters (e.g. Impact, Urgency). Follow our patterns so we can map to SitesSelect, ComponentDropdown, etc."**

- **"Create empty state and loading state components. Use app-theme-and-patterns for styling; we integrate these as NoDataFound, LoadingComponent."**

- **"Create a drawer (slide-from-right) and a modal. Use app-theme-and-patterns (drawer bg neutral-950, rounded-xl) so we can integrate with our drawer/modal patterns."**

---

## 5. Charts and data viz

- **"Using this design package (app-theme-and-patterns for chart area styling), create a placeholder chart card in Figma: title, legend area, chart area (line/bar placeholder). We use Plotly; this will integrate as a chart component."**

---

## 6. Responsiveness and accessibility

- **"Duplicate the app shell and Recommendations table for a tablet breakpoint: sidebar collapses or is compact; table horizontal scroll or key columns. Use this design package for layout and patterns."**

- **"Add focus and hover states to buttons and filters. Use app-theme-and-patterns.md (primary button hover/active/focus, table row hover, dropdown focus) so states match our codebase."**

---

## 7. Handoff (so we can integrate your work)

When you finish a screen or feature, annotate it so we can **integrate it into the codebase**. See **handoff-and-integration.md** for the full checklist; summary:

- **"Annotate this frame for handoff (see handoff-and-integration.md): (1) Screen/route name (e.g. Recommendations list, Implementations, Report export – Step 1). (2) Which mock data fields drive which UI (e.g. table columns = recommendation status, site, urgency, impact). (3) Component names where they match our codebase (use stack-and-context.md 'Component names' – e.g. RecommendationTable, ImplementationFilters, ExportDataModal). This way engineering can map Figma to our routes and components and integrate with minimal rework."**

**Why this matters:** We use your annotations to map Figma frames → our routes and components, keep data shapes aligned with our TypeScript types, and apply our Tailwind/theme. Good annotations = smooth integration.

---

## Workflow tips

1. **Same project, include path**: In prompts, say “Using this design package (stack-and-context, feature-summaries, app-theme-and-patterns, mock data for [feature])…” Replace [path] in the prompts above with your actual path (e.g. empty, or docs/, or mentor-design-package/).
2. **Follow our patterns**: Use app-theme-and-patterns for layout, tables, filters, drawer, hover/focus so the result fits our codebase. Use component names from stack-and-context when annotating.
3. **Data**: Use only the mock data we provide for that feature (in mock-data/). Same field names as our interfaces = easy integration (we swap mock → API).
4. **No backend**: No API calls in design; all content from mock data or placeholders that match feature-summaries data shapes.
5. **Before handoff**: Read **handoff-and-integration.md**. Deliver Figma + screen/route names + data-field annotations + component names (where applicable) so we can integrate your frontend designs into the codebase later.
