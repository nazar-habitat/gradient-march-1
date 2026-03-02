# Mock Data Guide (Design Team)

We **do not** reuse existing mock files from the repo. **Engineering creates mock data per feature** when the design team works on that feature. Designs use only this provided mock data; no backend or API calls.

## How it works

1. **You start designing a feature** (e.g. Recommendations, Implementations, Report export, ADCA, Insights).
2. **You request mock data** for that feature from engineering (e.g. "We need mock data for the Recommendations list and drawer").
3. **We add a file** to the `mock-data/` folder in this package (e.g. `mock-data/recommendations.json` or `recommendations.ts`) with sample data that matches the app’s data shapes.
4. **You use that file in your Figma prompts** (e.g. "Use the mock data in `mock-data/recommendations.json` for labels and table content"). Cursor + Figma MCP can read the file from the package.
5. **Handoff**: When engineering implements the feature, we replace mock data with real API calls; the shapes stay the same.

## Where mock data lives

- **In this package**: `mock-data/` folder.
- **Naming**: One file (or a small set) per feature, e.g.:
  - `recommendations.json`
  - `implementations.json`
  - `report-export.json` or `export-activity.json`
  - `adca.json`
  - `insights.json`
  - `static-data.json` (if we provide shared sites/components/assets/KPIs)

Engineering will tell you the exact filename when we add it.

## Data shapes (so we know what to generate)

We use the same TypeScript interfaces as the app so mock data matches what the UI expects. Summary by feature:

- **Recommendations**: `RecommendationData[]` + totals; fields: site, component, urgency, effort, impact, detection, entity, status, etc. (see **feature-summaries.md**).
- **Implementations**: `ImplementationData[]`; totals and impact-over-time for charts; fields: site, location, urgency, effort, impact, detection, entity, descriptions, etc.
- **Reports**: Sites → components → assets tree; sites → components → KPIs tree; export config; activity rows (id, date, status, config summary).
- **ADCA**: Filter params; chart data (e.g. scatter, time series) per our `adcaTypes`.
- **Insights**: Rows and detail fields per `insightsTypes`.

If you need a new entity or field for a design (e.g. a new column or filter), tell us and we can extend the mock data and interfaces together.

## What to put in your Figma prompts

- Always say: **"Use only the mock data provided for this feature in this package; no API calls."**
- Reference the file: e.g. **"Use the mock data in `mock-data/recommendations.json` for the table and drawer content."**
- If the feature doesn’t have mock data yet: **"Use placeholder labels and values that match the data shapes in feature-summaries.md for [Feature name]."** Then request mock data from engineering so you can switch to real-looking content.

## Requesting mock data

Send a short request to engineering, for example:

- **"We’re designing the Recommendations list and detail drawer. Please add Recommendations mock data to the design-team package (`mock-data/recommendations.json` or similar) so we can use it in Figma prompts."**
- **"We need ADCA mock data (filter options + sample chart data) in `mock-data/adca.json` for the Data Center Analysis screens."**

We’ll add the file(s) and tell you the path and a one-line description of what’s inside.
