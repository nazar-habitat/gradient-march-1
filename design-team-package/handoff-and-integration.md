# Handoff and integration

This page describes what we need from design so that we can **integrate your work into the codebase** with minimal rework. Following this makes the path from Figma → React straightforward.

## What we need from design

1. **Figma file(s)** for the feature(s), with:
   - **Screen/route mapping**: Each main frame or artboard should be identifiable with our route or page (e.g. "Recommendations list", "Implementations", "Report export – Step 1"). Use names that match **feature-summaries.md** (Recommendations, Implementations, Reports, ADCA, Insights, etc.).
   - **Annotations**: For each screen, note which **mock data fields** drive which UI (e.g. "table columns = recommendation status, site, urgency, impact"). We already have TypeScript types for these; alignment with mock data keeps implementation simple.
   - **Component hints** (optional but helpful): If a section maps to an existing component, name it (e.g. "RecommendationTable", "ImplementationFilters", "SitesSelect", "ExportDataModal"). Our structure is in **stack-and-context.md** (e.g. `components/recommendations/`, `components/implementations/`, `components/reports/`). New components are fine—we’ll implement them; naming helps us reuse where possible.
   - **States**: Empty, loading, error, and key hover/focus where they affect layout or copy. **app-theme-and-patterns.md** describes our hover/focus logic so you can match.

2. **Alignment with this package**:
   - **Data**: Designs use the **mock data we provided** for that feature (same field names and structure as our interfaces). We’ll swap mock → API when implementing.
   - **Theme and patterns**: If you used **app-theme-and-patterns.md** as reference, colors, spacing, and interactions will match our Tailwind and Ant Design setup; implementation is then mostly wiring components and data.
   - **Stack**: Screens assume our stack (Ant Design tables/filters/drawers/modals, Plotly-style charts, sidebar layout). We won’t change stack to match design; we implement within this stack.

## How we integrate

- **Existing components**: We map your screens to our existing components (e.g. RecommendationTable, ImplementationDrawer) where the design matches. Your annotations (route name, component names, data fields) speed this up.
- **New components**: If you designed something we don’t have yet, we add a new component in the right feature folder and follow our conventions (TypeScript, Tailwind, Ant Design).
- **Data**: We keep the same data shapes (from our interfaces). We replace mock data with React Query hooks and BFF calls; the UI structure and props stay aligned with your design.
- **Styling**: We use our Tailwind theme and **app-theme-and-patterns** (hover, focus, spacing). If your design followed the reference, we apply our utilities; if there are small divergences, we adjust in code.

## Summary

With this package you have: **stack and structure**, **feature and data shapes**, **mock data per feature**, and **theme/patterns/hover reference**. If designs follow that and handoff includes **screen/route names**, **data-field annotations**, and (where useful) **component names**, we can integrate your frontend designs into the codebase without guessing. New patterns or components are fine; we’ll implement them in line with our conventions.
