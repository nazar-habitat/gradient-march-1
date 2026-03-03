# Gradient March

A monorepo for the **Mentor** app: a React frontend and a design-handoff package so design and engineering can work in sync.

## What's in this repo

| Folder | Description |
|--------|-------------|
| **mentor-ui** | Main web app — React 19, TypeScript, Vite, Ant Design 5, Tailwind CSS v4. Features include recommendations, implementations, reports, ADCA, and insights. Includes Storybook for component development. |
| **design-team-package** | Design handoff package for the design team. Docs, theme, patterns, mock data guide, and Figma MCP prompts so designs (Cursor + Figma) match the app and can be integrated without repo access. |
| **skills** | Project-specific skills (e.g. coding standards, composition patterns) for tooling. |

## Quick start (mentor-ui)

```bash
cd mentor-ui
npm install
npm run dev        # dev server
npm run storybook  # Storybook on port 6007
```

**Scripts:** `npm run build`, `npm run lint`, `npm run preview`, `npm run build-storybook`

## Tech stack (mentor-ui)

- **React** 19, **TypeScript**, **Vite**
- **Ant Design** 5, **Tailwind CSS** v4, **Inter** font
- **TanStack** Router & React Query, **Zustand**, **i18next**
- **Storybook** 10, **Chromatic**
- **Plotly.js** for charts, **date-fns**, **axios**

## Design workflow

The design team uses **design-team-package** with Cursor and Figma MCP: theme and patterns live there, mock data is added per feature, and handoff docs describe how we map Figma → code. Start with **design-team-package/START-HERE.md** and **design-team-package/README.md**.

## License

Private repository.
