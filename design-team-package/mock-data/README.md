# Mock data (per feature)

Mock data for design is **created by engineering per feature**—we do not reuse existing repo mocks.

- When the design team works on a feature, **request mock data** from engineering (see **../mock-data-guide.md**).
- We will add one or more files here, e.g.:
  - `recommendations.json`
  - `implementations.json`
  - `report-export.json` or `export-activity.json`
  - `adca.json`
  - `insights.json`
  - `static-data.json` (optional, for shared sites/components/assets/KPIs)

Use these files in your Figma MCP prompts (e.g. "Use the mock data in `mock-data/recommendations.json` for the table and drawer"). Always say "use only the mock data provided; no API calls."
