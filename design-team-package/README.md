# Mentor Design Team Package

This package gives the design team everything needed to create frontend designs in Figma (using Cursor + Figma MCP) that match the Mentor app stack and patterns—**without access to the repo**. You use **mock data only**; engineering will connect real APIs later.

**New to this package?** → Read **START-HERE.md** first (what to look for and in what order).

## What's in this package

| Document                       | Purpose                                                                                                                                                                                                              |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **START-HERE.md**              | What to look for first and in what order when you receive this package.                                                                                                                                              |
| **stack-and-context.md**       | Repo snapshot, project overview, frontend tech stack and conventions.                                                                                                                                                |
| **app-theme-and-patterns.md**  | **Reference only**: Tailwind theme (colors, typography, radius), UI patterns (layout, filters, tables, tabs, drawer), and hover/focus/interaction logic so you can align designs with the app when you want.         |
| **feature-summaries.md**       | Short description of each major feature, main screens, and data shapes (field names).                                                                                                                                |
| **mock-data-guide.md**         | How mock data works: **engineering creates mock data per feature** when you work on that feature. How to request it, where it lives, and what shapes to expect.                                                      |
| **mock-data/**                 | Folder where feature-specific mock data files are added by engineering. When you start a feature, ask for mock data; we'll add a file here (e.g. `recommendations.json`) and you reference it in your Figma prompts. |
| **figma-mcp-prompts.md**       | Ready-to-use prompts to run in Cursor (with Figma MCP) to generate or refine screens and components.                                                                                                                 |
| **handoff-and-integration.md** | What to deliver (Figma + annotations) and how we map designs into the codebase so integration is smooth.                                                                                                             |

## How to use this with Cursor + Figma MCP

1. **Keep this package in the same project** as your Figma work. In every prompt, **include the path** to the package or to the specific files so the AI can read them (see **figma-mcp-prompts.md**; replace `[path]` with your actual path). Design system and tokens are defined in your project and Figma MCP, not in this package.
2. **Request mock data** from engineering for the feature you're designing (see **mock-data-guide.md**). Once you have it in `mock-data/`, reference it in your prompts (e.g. use the path to `mock-data/recommendations.json`).
3. **Run prompts** from **figma-mcp-prompts.md** in order: design system → app shell → feature screens (new pages) → components/states → handoff. Use only the mock data provided for that feature; no API calls.
4. **Iterate** with follow-ups in your Figma MCP workflow (e.g. refine components or layouts using your design system).

## Stack and app reference (for prompts)

- **UI**: React 19, Ant Design 5, Tailwind CSS v4, Inter font.
- **Patterns**: Sidebar + main content, filters (site/component/date/impact/urgency), tables, drawers, modals, Plotly-style chart placeholders.
- **Theme and interactions**: See **app-theme-and-patterns.md** for our Tailwind theme, UI patterns, and hover/focus logic—use as reference when you want designs to match the app.
- **No backend in design**: All data in designs comes from the mock data we provide per feature.

## Questions or missing mock data?

- Need mock data for a feature? Ask engineering; we'll add it to `mock-data/` and tell you the filename.
- Need more detail on a feature or data shape? See **feature-summaries.md** and **mock-data-guide.md**.
