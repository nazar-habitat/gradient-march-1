# Inputs Component Branch — Build Plan

> **Last updated:** 2026-02-25
> **Status:** ✅ All done — Tag, Input, Select, MultiSelect built and exported
> **Figma nodes:** Input `1833-108316` · Select `161-5295` · MultiSelect `438-26138`
> **Related:** See `menu/PLAN.md` — Select and MultiSelect are the trigger+panel components that supersede `SelectMenu` and `MultiSelectMenu` from that plan.

---

## Components in this branch

| # | Component | Description |
|---|-----------|-------------|
| 1 | **Tag** | ✅ Done — Chip primitive — used inside MultiSelect trigger |
| 2 | **Input** | ✅ Done — Text/password field with label, icons, error state |
| 3 | **Select** | Single-select dropdown — styled trigger pill + panel |
| 4 | **MultiSelect** | Multi-select dropdown — trigger with Tag chips + panel |

Build in this order: Tag → Input → Select → MultiSelect.

---

## Naming clarification

The Figma design system calls these "Single Select" and "Multiple Select". In our codebase they are named `Select` and `MultiSelect`. These correspond directly to `SelectMenu` and `MultiSelectMenu` in `menu/PLAN.md` — those names should be treated as aliases. The menu plan may be updated to use the shorter names once these are built.

For implementation order, we build **Figma “Single Select” first** as the public component `Select`.
Actual composition implemented:
- `SelectMenu` (panel/list system — lives in `menu/SelectMenu.tsx`) — handles icons, dividers, cascading, header, search, bottom bar, sections
- `Select` (trigger pill + delegates panel to SelectMenu via `dropdownRender`) — lives in `ui/Select.tsx`
- No separate `SelectField` layer was needed — `Select` directly wraps antd `Dropdown`
`Select` is exported publicly from `ui/index.ts`; `SelectMenu` is exported from `menu/index.ts` for use as a standalone panel.

---

## Component Specs

### Tag
> Primitive chip — standalone and used inside MultiSelect trigger.

**Visual:**
- bg `#313131` (`bg-tag-neutral`)
- text `#dedede` (fg-secondary), 12px / Inter Medium, line-height 16
- rounded-6, padding px-4 py-2
- optional trailing close (×) icon, 24px, `currentColor`

**Props:**
```ts
interface TagProps {
  label:       React.ReactNode
  removable?:  boolean          // show close icon
  onRemove?:   () => void
  disabled?:   boolean
}
```

**Storybook:** Default, Removable, Disabled

---

### Input
> Text / password / search field. Wraps antd `Input` with custom styling.

**Sizes:**

| Size | Padding | Border-radius | Font |
|------|---------|---------------|------|
| md (default) | px-12 py-8 | 12px | 14px / Regular |
| sm | px-10 py-6 | 8px  | 13px / Regular |

**Layout variants:** `text` · `leadingIcon` · `trailingIcon` · `bothIcons`

**States & token values:**

| State | Border | Text |
|-------|--------|------|
| Default (empty) | `#313131` (outline-primary) | placeholder `#636363` |
| Filled | `#313131` | value `#ffffff` |
| Hover | `#4a4a4a` (outline-secondary) | — |
| Active/Focus | `#949494` (outline-tertiary) | caret `#ffffff` |
| Disabled | `#313131` | `#313131` (fg-disabled-low) |
| Error | `#fa7054` (outline-error) | value `#ffffff` |

Background always `#191919` (bg-tertiary). Disabled background same (no fill change).

**Label subcomponent** (optional, above field):
- Text: 13px / Inter Medium, color `#949494` (fg-subtle)
- Required asterisk: `#e53c1c` (red-600)
- Info icon: 12px, optional tooltip

**Error message** (below field, error state only):
- Alert icon 16px + text 13px / Regular, color `#fa7054` (fg-error)

**Props:**
```ts
interface InputProps {
  size?:         'md' | 'sm'
  label?:        string
  required?:     boolean
  info?:         boolean        // show info icon on label
  placeholder?:  string
  value?:        string
  onChange?:     (value: string) => void
  leadingIcon?:  React.ReactNode
  trailingIcon?: React.ReactNode
  disabled?:     boolean
  error?:        string         // error message; also triggers error state
  type?:         'text' | 'password' | 'search'
  // ...standard HTML input attrs passed through
}
```

**Ant base:** `antd Input` — use for value binding + keyboard behaviour. Override all visual styles via inline `style` + JS event handlers (same pattern as buttons).

**Focus ring:** NOT the standard purple ring — Input uses border color change to `#949494` on focus (no separate outline). Follow antd's `onFocus`/`onBlur` approach.

**Storybook:** Playground · Sizes · Layouts · States · WithLabel · WithError

**Implementation notes (post-review):**
- Shell owns all padding; `variant="borderless"` strips antd styles; `input.css` zeros out `ant-input-affix-wrapper` padding — pattern is solid
- `resolveBorderColor` priority order: disabled → error → focused → hovered → default ✓
- `onChange` correctly unwraps the event to return `string` value ✓
- `info` prop currently renders a ⓘ unicode character — replace with a proper icon and wire up `infoTooltip` once `Tooltip` component is built
- `type="password"` passes through via `...rest` and hides characters, but has no show/hide toggle — check Figma to see if a password reveal variant is needed; if so, switch to `antd Input.Password`

---

### Select
> Single-select dropdown. Styled trigger pill that opens a panel.

**Scope for next implementation (v1):**
- Build against Figma node `161-5295` ("Single Select")
- Build/select panel against Figma node `438-7238` ("Single Select Menu")
- Public API/component name: `Select`
- Composition architecture:
  - `SelectField`: trigger-only
  - `SelectMenu`: list panel variants (icons, dividers, header, search, bottom bar)
  - `Select`: composed controller (open state + selection wiring)
- Single-choice behavior: selecting an item updates `value`, calls `onChange`, then closes the panel
- Keep `SelectField`/`SelectMenu` as internal by default; expose publicly only if reuse pressure appears

**Trigger pill anatomy:** `[leading icon?] [prefix?] [value or placeholder] [chevron ↓/↑]`

**Sizes:**

| Size | Padding | Border-radius | Font |
|------|---------|---------------|------|
| md (default) | px-12 py-10 | 12px | 14px / Medium |
| sm | px-10 py-8 | 8px  | 13px / Medium |

**Trigger states & tokens:**

| State | Border | Text |
|-------|--------|------|
| Default (no value) | `#313131` | `#636363` (neutral-600) |
| Default (with value) | `#313131` | `#ffffff` |
| Hover | `#4a4a4a` | — |
| Focused | `#313131` + focus ring | — |
| Active / Open | `#949494`, chevron flips to ↑ | — |
| Disabled | `#313131` | `#313131` |

Focus ring: 1.5px solid `#5452f5`, implemented as `absolute inset: -5px, border-radius: 16px` child div (not CSS outline — same injection-safe pattern).

Prefix text: `#949494` (fg-subtle), same size as label.

**Panel:** Reuses `MenuPanel` + `MenuItem` from menu family. Selected item shows checkmark trailing icon.

**Props:**
```ts
interface SelectProps {
  items:         SelectItem[]
  value?:        string
  onChange?:     (key: string) => void
  placeholder?:  string
  prefix?:       string         // e.g. "Sort by:"
  leadingIcon?:  React.ReactNode
  size?:         'md' | 'sm'
  disabled?:     boolean
  // Dropdown placement etc. via antd Dropdown passthrough
}

interface SelectItem {
  key:       string
  label:     React.ReactNode
  icon?:     React.ReactNode
  disabled?: boolean
}
```

**Ant base:** `antd Dropdown` for open state + positioning. We own trigger and panel markup entirely.

**Storybook:** Playground · WithPrefix · WithLeadingIcon · Sizes · States · Controlled

---

### MultiSelect
> Multi-select dropdown. Same trigger pill but renders `Tag` chips for selected values.

**Trigger variants:**
- Unselected: same as Select (placeholder text + chevron)
- Selected: `[leading icon?] [prefix?] [Tag...] [chevron ↓]`
- Selected + hover: chevron replaced by clear (×) button → clicking clears all

**Tags:** rendered inline inside trigger using `Tag` component (removable=true).

**Panel:** Same `MenuPanel` with `Checkbox` leading slot per row + `MenuFooter` (Apply button always rendered; `onApply` optional — see menu plan for Apply backdoor pattern).

**Props:**
```ts
interface MultiSelectProps {
  items:         SelectItem[]          // same shape as Select
  value?:        string[]
  onChange?:     (keys: string[]) => void   // fires live if onApply absent
  onApply?:      (keys: string[]) => void   // explicit commit
  placeholder?:  string
  prefix?:       string
  leadingIcon?:  React.ReactNode
  size?:         'md' | 'sm'
  disabled?:     boolean
}
```

**Storybook:** Playground · WithTags · WithApply · LiveUpdate · Sizes · States

---

## Shared styling notes

All interactive states go through **inline `style` / `el.style.*`** — never Tailwind `@layer` classes. Same injection-safe pattern established for buttons.

| Token | Value |
|-------|-------|
| Trigger bg | `#191919` (bg-tertiary) |
| Border default | `#313131` (outline-primary) |
| Border hover | `#4a4a4a` (outline-secondary) |
| Border active | `#949494` (outline-tertiary) |
| Border error | `#fa7054` (outline-error) |
| Focus ring | `#5452f5` (purple-500), 1.5px |
| Placeholder | `#636363` (neutral-600) |
| Value text | `#ffffff` |
| Disabled text | `#313131` (neutral-800) |
| Prefix text | `#949494` (fg-subtle) |
| Tag bg | `#313131` (bg-tag-neutral) |
| Tag text | `#dedede` (fg-secondary) |

---

## Exports

Add to `src/components/ui/index.ts` when done:

```ts
export { Tag }          from './Tag'
export type { TagProps } from './Tag'

export { Input }        from './Input'
export type { InputProps } from './Input'

export { Select }       from './Select'
export type { SelectProps, SelectItem } from './Select'

export { MultiSelect }  from './MultiSelect'
export type { MultiSelectProps } from './MultiSelect'
```

---

## Build order & status

```
[1] Tag            ✅ DONE
[2] Input          ✅ DONE  ← note: password reveal toggle not built; info icon needs Tooltip wired up later
[3] Select         ✅ DONE
                   - ✅ SelectMenu panel built (icons, dividers, cascading, header, search, bottom bar, sections)
                   - ✅ Select trigger pill built (sizes, states, focus ring, controlled/uncontrolled open)
                   - ✅ Select delegates to SelectMenu via dropdownRender
                   - ✅ Color fixes: panel bg #141414, accent #7f7df8, pressed #292929
                   - ✅ GradientProvider wires antd Menu tokens — submenu portals now styled correctly
                   - ✅ SelectMenu.stories: Default/Icons/Dividers/Cascading/Header/Search/BottomBar/Overflow/States
                   - ✅ Select.stories: Playground/Layouts/Sizes/States/Controlled
[4] MultiSelect    ✅ DONE
                   - ✅ MultiSelectMenu panel (custom rows with Checkbox, header, search, dividers, footer)
                   - ✅ MultiSelect trigger (Tag chips for selections, clear-all on hover, chevron flip)
                   - ✅ onApply support (draft → committed workflow)
                   - ✅ MultiSelectMenu.stories: Default/Icons/Dividers/Header/Search/Apply/Overflow/Disabled
                   - ✅ MultiSelect.stories: Playground/WithSelections/WithPrefix/WithLeadingIcon/WithApply/Sizes/States/Controlled
```

> ⚠️ Select and MultiSelect share the panel with the menu family.
> Build `Tag` and `Input` independently, but build `Select`/`MultiSelect` after
> `ActionMenu` (which establishes `MenuPanel`, `MenuItem`, `MenuDivider`).

---

*This document was written during the planning session on 2026-02-25. Resume here after any interruption.*
