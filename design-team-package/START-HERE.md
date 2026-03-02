# Start here

When you receive this package, use it like this.

## What this is

A **design package** so you can create Figma screens (with Cursor + Figma MCP) that match our app and that we can **integrate into our codebase** later. You don’t need repo access. You use **mock data** we provide per feature; we connect real APIs when we implement.

## What to look for first (in order)

1. **README.md** — What’s in the package and how it fits together. Read this first.
2. **figma-mcp-prompts.md** — How to use the package with Cursor + Figma MCP: same project, **include the path** in every prompt, and the ready-made prompts for creating new pages (app shell, Recommendations, Implementations, Reports, ADCA, Insights, etc.). This is your main workflow.
3. **feature-summaries.md** — What each feature is, which pages it has, and what **data fields** we use. When you start a feature, read its section here.
4. **mock-data-guide.md** — How to get **mock data** for a feature (we create it per feature). Request it from us; we’ll add a file under `mock-data/` and you use that path in your prompts.
5. **app-theme-and-patterns.md** — When you want designs to match our app: theme (colors, typography), layout, tables, filters, drawer, and **hover/focus** behaviour. Use as reference.
6. **stack-and-context.md** — Our stack (React, Ant Design, Tailwind, etc.) and **component names** to use when you annotate frames so we can map Figma → code.
7. **handoff-and-integration.md** — **Before you hand off**: what to deliver (Figma + annotations: screen/route name, data fields, component names) and how we integrate. Read this when you’re finishing a feature.

## First steps

1. Put this package **in the same project** as your Figma work (e.g. a folder like `design-team-package/` or `mentor-design-package/`).
2. For the **feature** you’re designing: read its part in **feature-summaries.md** and **request mock data** from us if you don’t have it yet (see **mock-data-guide.md**).
3. Open **figma-mcp-prompts.md** and use the prompts there. In every prompt **include the path** to this package (or to the specific files), and replace `[path]` with your actual path (e.g. empty if the package is at project root, or `docs/`, etc.).
4. You’ll mostly be **creating new pages**; follow the prompts and our patterns so we can integrate your work later. Before handoff, read **handoff-and-integration.md** and add the annotations we need.

## Quick reference

| I want to… | Look at… |
|------------|----------|
| Understand what’s in the package | README.md |
| Create a new page with Cursor + Figma MCP | figma-mcp-prompts.md (and include the package path in the prompt) |
| Know what a feature is and what data it uses | feature-summaries.md |
| Get mock data for a feature | mock-data-guide.md, then ask us; we add a file in mock-data/ |
| Match our app’s look and hover/focus | app-theme-and-patterns.md |
| Know our component names for annotations | stack-and-context.md → “Component names” |
| Know what to deliver and how we integrate | handoff-and-integration.md |
