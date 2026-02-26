# Menu Component Family — Build Plan

> **Last updated:** 2026-02-25
> **Status:** 🟡 In progress — Tag ✅ Input ✅ Select 🟡 ActionMenu 🔲 next
> **Note:** `Menu.tsx`, `SingleSelectMenu.tsx`, and their stories already exist in this folder. Ignore them for now; they will be revisited or replaced once the new family is complete.
> **Related:** See `../PLAN-INPUTS.md` for the parallel inputs branch (Input, Select, MultiSelect, Tag).
> **Naming:** What this doc calls `SelectMenu` / `MultiSelectMenu` corresponds to `Select` / `MultiSelect` in the Figma and in PLAN-INPUTS.md. The shorter names are preferred; this doc may be updated once building starts.
> **Prerequisite:** Build `Tag` and `Input` (from PLAN-INPUTS.md) before starting SelectMenu/MultiSelectMenu. Build `ActionMenu` first to establish shared `MenuPanel`/`MenuItem` subcomponents used by Select and MultiSelect panels.

**Progress note:** `Tag` ✅ `Input` ✅ `SelectMenu` (panel) ✅ `Select` (trigger + composed with SelectMenu) 🟡 in progress. Architecture: `Select` owns the trigger pill; `SelectMenu` owns the panel — `Select` delegates to `SelectMenu` via `dropdownRender`. No separate `SelectField` layer needed.

---

## Overview

Five menu components, plus prerequisite primitives:

| # | Component | Ant Design base | Description |
|---|-----------|-----------------|-------------|
| 0 | **Input** | `antd Input` | ✅ Done — Text input — needed for search inside menus |
| 1 | **ActionMenu** | `Dropdown` | Simple action list — items with `onClick`, no selection state |
| 2 | **SelectMenu** | `Dropdown` | Single-select — value/onChange + checkmark on selected item |
| 3 | **MultiSelectMenu** | `Dropdown` | Multi-select — checkboxes + Apply footer |
| 4 | **Tree** | `Tree` | Standalone collapsible tree (no dropdown) |
| 5 | **TreeSelectMenu** | `Dropdown` + custom tree | Tree inside a dropdown — single or multi select |

### Other components — add on-demand (not blocking menus)

| Component | Why / When |
|-----------|-----------|
| **Tooltip** | Needed everywhere (especially IconButton labels); add right after menus |
| **Tag/Chip** | ✅ Confirmed needed — MultiSelect trigger shows selected items as Tag chips. Planned in PLAN-INPUTS.md. |
| **Switch** | Common form primitive; not menu-related |
| **Radio / RadioGroup** | Form primitive; SelectMenu uses checkmark so not needed for menus |
| **Avatar** | Could appear in menu items (user lists, assignees); cosmetic, not structural |
| **Spinner / Skeleton** | Async loading states; add when first async menu is needed |

**Already done:**
- ✅ Button, TextButton, LinkButton, IconButton
- ✅ Checkbox (sourced from antd)

---

## Figma References

- **ActionMenu** — node `1827-5678` *(TODO: confirm exact node)*
- **SelectMenu** — node referenced in design doc
- **MultiSelectMenu** — node referenced in design doc
- **Tree / TreeSelectMenu** — node referenced in design doc

Fetched Figma context during planning session — re-fetch if tokens expire.

---

## Shared Subcomponents

All panel-based menus (ActionMenu, SelectMenu, MultiSelectMenu, TreeSelectMenu) share:

```
MenuPanel      — outer container (border, shadow, bg, border-radius)
MenuHeader     — optional title row at the top of the panel
MenuItem       — single row (icon?, label, trailing slot, hover state)
MenuDivider    — horizontal rule between sections
MenuFooter     — bottom row for Apply / Cancel buttons
```

Tree-specific:
```
TreeItem       — node row with expand/collapse chevron + optional checkbox
```

These subcomponents live in `menu/` alongside the main components (not exported from the top-level `ui/index.ts` unless needed externally).

---

## API Patterns

### Trigger — children as trigger (Ant Dropdown pattern)
```tsx
<ActionMenu items={[...]}>
  <Button>Open menu</Button>
</ActionMenu>

<SelectMenu items={[...]} value={v} onChange={setV}>
  <IconButton icon={<ChevronDown />} aria-label="Select" />
</SelectMenu>
```
The child is cloned with Ant's `open`/`onOpenChange` props attached.

### ActionMenu items
```ts
interface ActionMenuItem {
  key:      string
  label:    React.ReactNode
  icon?:    React.ReactNode   // leading icon (currentColor)
  disabled?: boolean
  danger?:  boolean           // red tint
  onClick?: () => void
}
```

### SelectMenu items
```ts
interface SelectMenuItem {
  key:   string
  label: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
}
// Props
value?:    string
onChange?: (key: string) => void
```

### MultiSelectMenu items
```ts
// Same shape as SelectMenuItem
value?:    string[]
onChange?: (keys: string[]) => void   // fires live if onApply absent
onApply?:  (keys: string[]) => void   // always show Apply button; optional = live-update backdoor
```
> **Apply button**: Always rendered in the footer. If `onApply` is omitted, clicking Apply calls `onChange` with the current draft selection. This keeps the UI consistent while allowing the caller to choose live-update vs. explicit-commit.

### Tree (standalone)
```ts
// Thin wrapper around antd Tree
// Exposes: treeData, checkedKeys, onCheck, expandedKeys, onExpand, selectable, checkable, ...
```

### TreeSelectMenu (dropdown)
```ts
// children as trigger (same pattern as ActionMenu)
// mode: 'single' | 'multi'
// value, onChange, onApply (multi only, same Apply backdoor)
// treeData: antd-compatible TreeDataNode[]
```

---

## Styling Rules

All interactive colours go through **inline `style` prop** or **`el.style.*` in JS event handlers** — never Tailwind `@layer utilities`. This is the established pattern from Button / TextButton / IconButton to avoid Storybook's unlayered CSS reset overriding our tokens.

Token values come from `src/index.css` `@theme` (authoritative, synced with `design-team-package/index.css`):

| Token | Value |
|-------|-------|
| Panel bg | `#141414` (neutral-950) |
| Panel border | `#313131` (neutral-800) |
| Item hover bg | `#191919` (neutral-900) |
| Item pressed bg | `#292929` (neutral-850) |
| Item text | `#ffffff` |
| Item disabled text | `#636363` (neutral-600) |
| Item danger text | `#ff7064` (red-500) |
| Focus ring | `#5452f5` (purple-500), 1.5px, offset 4px |
| Checkbox accent | `#5452f5` (purple-500) |

---

## Build Order & Status

```
[0] Input              ✅ DONE  ← see PLAN-INPUTS.md for implementation notes

[1] ActionMenu         🔲 TODO
    - MenuPanel, MenuHeader, MenuItem, MenuDivider subcomponents
    - Storybook: Playground, WithHeader, WithDividers, WithIcons, Danger, Disabled

[2] SelectMenu / Select   🟡 IN PROGRESS
    - ✅ SelectMenu panel built: icons, dividers, cascading, header, search, bottom bar, sections, scrollable body
    - ✅ Select trigger pill built: sizes, states, focus ring, controlled/uncontrolled open
    - ✅ Select now delegates to SelectMenu via dropdownRender (composition wired)
    - ✅ Color fixes applied: panel bg #141414, accent #7f7df8, pressed #292929
    - 🔲 Select stories need updating to reflect SelectMenu composition
    - 🔲 Verify remaining Select stories match all SelectMenu variants (search, header, cascading, bottom bar)

[3] MultiSelectMenu    🔲 TODO
    - Add checkbox leading slot to MenuItem
    - MenuFooter (Apply + optional Cancel)
    - Optional search input at top
    - Storybook: Playground, WithApply, LiveUpdate (no onApply), WithSearch
    - Tag ✅ already built — MultiSelect trigger can use it directly

[4] Tree               🔲 TODO
    - Standalone antd Tree wrapper
    - Custom row renderer matching design tokens
    - Storybook: Default, Checkable, Controlled

[5] TreeSelectMenu     🔲 TODO
    - Dropdown shell (same as ActionMenu)
    - Embed Tree inside MenuPanel
    - mode='single' | 'multi', Apply footer for multi
    - Storybook: SingleSelect, MultiSelect

--- After menus ---

[6] Tooltip            🔲 TODO  ← high priority, needed everywhere
[7] Tag/Chip           ✅ DONE
[8] Switch             🔲 TODO  ← on-demand
[9] Radio/RadioGroup   🔲 TODO  ← on-demand
```

---

## Exports

When complete, add to `src/components/ui/index.ts`:

```ts
export { ActionMenu }     from './menu/ActionMenu'
export type { ActionMenuProps, ActionMenuItemData } from './menu/ActionMenu'

export { SelectMenu }     from './menu/SelectMenu'
export type { SelectMenuProps, SelectMenuItemData } from './menu/SelectMenu'

export { MultiSelectMenu } from './menu/MultiSelectMenu'
export type { MultiSelectMenuProps, MultiSelectMenuItemData } from './menu/MultiSelectMenu'

export { Tree }           from './menu/Tree'
export type { TreeProps } from './menu/Tree'

export { TreeSelectMenu } from './menu/TreeSelectMenu'
export type { TreeSelectMenuProps } from './menu/TreeSelectMenu'
```

---

## Ant Design Notes

- Using **antd v5** (`^5.24.0`) — not v6.
- `Dropdown` from `antd` is used for positioning and open-state only. We own the panel markup via `dropdownRender`. `SelectMenu` uses antd `Menu` internally for its list (handles cascading submenus), but all visual styles are overridden via CSS and inline styles — antd `items` prop is used only as a data bridge, not for antd's visual styling.
- `Tree` from `antd` is used for tree functionality (expand/collapse, checkbox selection). We override row styles via `titleRender` and `className`.
- `TreeSelect` from antd is **not** used — we build TreeSelectMenu ourselves with Dropdown + Tree so we control the trigger.

---

*This document was generated at the end of the planning session. Resume here after any interruption.*
