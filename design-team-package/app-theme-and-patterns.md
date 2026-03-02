# App theme and patterns (reference)

This document describes **what the Mentor frontend actually uses**: Tailwind theme, UI patterns, and hover/focus/interaction logic. Use it as **reference** when you want designs to align with the app. Your design system and tokens stay in your project and Figma MCP; this is so you can match behavior and look if you choose to.

---

## Theme (Tailwind)

### Typography
- **Font**: Inter (weights 400, 500, 600, 700).
- **Body**: `font-family: Inter, sans-serif`; background `#000`; text `#fff`.

### Colors (Tailwind theme scale)
We use semantic scales; typical usage:

| Scale      | Typical use in app                          |
|-----------|---------------------------------------------|
| **neutral** | Backgrounds (900, 950, 850), borders (800), text (400, white), disabled (800/600) |
| **purple**  | Primary actions (500/600/700), links (400), focus outline (500), active pagination |
| **turquoise** | Charts, secondary data viz                   |
| **green**  | Success, positive impact                    |
| **lime**   | Lighter success                              |
| **orange** | Warning                                      |
| **red**    | Error, critical, destructive                |
| **plum**   | Accents                                      |

**Neutral**: 50 #f7f7f7 → 950 #141414 (50 lightest, 950 darkest).  
**Purple**: 50 #f6f6fe → 900 #0b0a54; primary is 500 #5452f5, hover 600 #4341f1, active 700 #3735bb.  
**Turquoise**: e.g. 400 #35dddf, 600 #14988f for charts.

### Spacing and radius
- **Radius**: `rounded-lg` (8px), `rounded-xl` (12px), `rounded-2xl` (16px). Buttons and cards use `rounded-xl`; table cells use `rounded-2xl` on first/last column.
- **Sidebar width**: 250px; main content has `margin-left: 250px`, padding 20px.
- **Button heights**: small 32px (h-8), medium 40px (h-10), xlarge 64px (h-16). Icon buttons: 40×40 (medium), 32×32 (small), 48×48 (xlarge).

### Button and control utilities (summary)
- **btn (base)**: text-sm, font-medium, h-10, px-4, py-2.5, rounded-xl, **hover:bg-white**.
- **btn-primary**: white text, bg purple-500, **hover purple-600**, **active purple-700**, **focus: outline purple-500, outline-offset 2**; disabled bg neutral-800 text neutral-600.
- **btn-secondary**: white text, bg neutral-900, border neutral-800.
- **btn-text**: text purple-400, transparent bg.
- **icon-btn**: p-2, 40×40, rounded-xl, **hover:bg-white**.
- **toggle-btn** (in toggle group): text neutral-400, **hover:bg neutral-850**, **active:bg neutral-800**; group has border and divide neutral-800.

---

## UI patterns

### Layout
- **Shell**: Sidebar (250px) + main content. Main area scrolls; charts section has `margin-left: 250px`, padding 20px, overflow-x auto.
- **Sidebar**: Nav items + language switcher; on **hover** (see below). Logo swaps on sidebar hover.

### Filters
- **Filter bar**: Site dropdown, component dropdown, date range picker, tag-style filters (e.g. Impact, Urgency). Dropdowns use **custom-dropdown**: bg neutral-900, border neutral-800; **hover/focused** border neutral-800. Option **active/selected** bg neutral-900. Dropdown arrow **rotates 180° on focus**.
- **Date picker**: **Hover and focused** border neutral-800.
- **Checkboxes** (e.g. in tree): border purple-400, **hover border purple-500**.

### Tables
- **custom-table**: Transparent table bg; header (th) bg black, text neutral-400, text-xs. Rows (td) bg neutral-950, rounded corners on first/last cell (rounded-tl-2xl, rounded-bl-2xl, etc.). Vertical separators between cells (1px neutral-850). **Row hover**: cursor pointer; action icons get border neutral-800 and icon text white; in some rows a “detected” section can hide content and show a button. **Pagination**: active item bg purple-500, border purple-500, text white; prev/next borders neutral-800.

### Tabs
- **pill-tabs**: Tabs in a pill row; **tab hover** bg neutral-700, text white; **active tab** bg purple-500, text white; inactive tab text neutral-400.
- **status-tabs**: **Active** text white; **inactive** text neutral-400.
- **chiller-tabs**: Uppercase, neutral-400; active white.

### Drawer
- Slide-from-right; content wrapper has padding; **drawer content** bg neutral-950, **rounded-xl**; header no bottom border; close button positioned top-right.

### Modals
- Ant Design modal patterns; overlay and panel use app background and borders (neutral, purple for primary actions).

### Charts
- Plotly; chart area with title, legend, and plot. We use purple/turquoise/neutral for series and axes.

---

## Hover, focus, and interaction logic

### Buttons
- **Primary**: hover → purple-600; active → purple-700; focus → outline purple-500, offset 2; disabled → neutral-800 bg, neutral-600 text.
- **Base/icon (non-primary)**: hover → bg white (on dark background).
- **Toggle in group**: hover → bg neutral-850; active → bg neutral-800.

### Form controls
- **Date picker, asset/site dropdowns**: hover or focused → border neutral-800 (no extra shadow).
- **Dropdown option**: active (keyboard hover) or selected → bg neutral-900.
- **Custom dropdown**: when focused, arrow rotates 180°.

### Table rows
- **Hover**: row cursor pointer; action icons: border neutral-800, icon color white; in some tables, “detected” content hides and a button block shows.

### Sidebar
- **Sidebar hover**: main logo opacity 0, alternate logo (logo-f) opacity 100.
- **Nav link**: **active or hover** → icon-wrapper and text-node text white.

### Tabs
- **Pill tab**: hover → bg neutral-700, text white; active → bg purple-500, text white.
- **Status/chiller**: active → white; inactive → neutral-400.

### Radio button (custom-tab-radios)
- Checked: bg neutral-800, border neutral-800, text white; checked+hover: keep text white, border neutral-800.

### Pagination
- **Active page item**: bg purple-500, border purple-500, text white. Others use neutral-800 borders.

### Collapse
- Active collapse item/content use `ant-collapse-item-active` / `ant-collapse-content-active` for expanded state.

---

## Summary for design

- **Dark shell**: bg #000, cards/panels neutral-950 or neutral-900, borders neutral-800.
- **Primary actions**: purple-500, hover 600, active 700; focus ring purple-500.
- **Hover on neutral controls**: often neutral-850 or white (buttons) or neutral-900 (dropdown options).
- **Tables**: row hover reveals actions (cursor pointer, icons visible); cells rounded on sides; pagination active = purple.
- **Sidebar**: hover swaps logo; nav link hover/active = white icon and text.
- **Tabs**: pill style with hover neutral-700, active purple-500; or simple active white / inactive neutral-400.

Use this as a reference when you want Figma screens to behave and look like the app; your design system still lives in your project and Figma MCP.
