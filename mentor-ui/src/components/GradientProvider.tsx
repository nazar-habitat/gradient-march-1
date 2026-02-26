import React from 'react'
import { ConfigProvider, theme as antTheme } from 'antd'

/**
 * GradientProvider
 *
 * Wraps antd ConfigProvider with the Gradient Design System tokens.
 * Mount this once at the root of your app (or Storybook preview) so that
 * all antd components — Menu, Dropdown, Tree, TreeSelect, Cascader, etc. —
 * inherit the correct colours without needing CSS overrides.
 */
export function GradientProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        // Start from antd's dark algorithm — sets sensible dark defaults for
        // derived tokens we don't explicitly override.
        algorithm: antTheme.darkAlgorithm,

        token: {
          // ── Backgrounds ────────────────────────────────────────────────
          // colorBgContainer  → form controls, inputs, trigger pills
          colorBgContainer: '#191919',    // neutral-900
          // colorBgElevated   → popups, dropdowns, tooltips, modals
          colorBgElevated:  '#141414',    // neutral-950
          // colorBgBase       → page/canvas base
          colorBgBase:      '#0a0a0a',

          // ── Borders ─────────────────────────────────────────────────────
          colorBorder:          '#313131',  // outline-primary
          colorBorderSecondary: '#4a4a4a',  // outline-secondary

          // ── Text ────────────────────────────────────────────────────────
          colorText:            '#ffffff',  // fg-primary
          colorTextSecondary:   '#dedede',  // fg-secondary
          colorTextTertiary:    '#949494',  // fg-subtle
          colorTextQuaternary:  '#636363',  // fg-disabled
          colorTextDisabled:    '#636363',
          colorTextPlaceholder: '#636363',

          // ── Brand / accent ──────────────────────────────────────────────
          colorPrimary:      '#5452f5',    // purple-500
          colorPrimaryHover: '#4341f1',    // purple-600
          colorPrimaryActive:'#3735bb',    // purple-700

          // ── Semantic ────────────────────────────────────────────────────
          colorSuccess: '#45f583',   // green-400
          colorWarning: '#ffae19',   // orange-500
          colorError:   '#ff7064',   // red-500
          colorInfo:    '#5452f5',

          // ── Shape ───────────────────────────────────────────────────────
          borderRadius:   12,
          borderRadiusLG: 16,
          borderRadiusSM: 8,
          borderRadiusXS: 6,

          // ── Typography ──────────────────────────────────────────────────
          fontFamily:   'Inter, sans-serif',
          fontSize:     14,
          fontSizeSM:   12,
          fontSizeLG:   16,
          lineHeight:   1.5,

          // ── Misc ────────────────────────────────────────────────────────
          colorSplit:   '#313131',   // divider lines
          boxShadow:    '0px 8px 12px -2px rgba(87, 87, 87, 0.12)',
          boxShadowSecondary: '0px 4px 8px -2px rgba(87, 87, 87, 0.08)',

          // Disable antd's blue focus ring — our components use the purple
          // focus ring via inline styles instead.
          colorPrimaryBorder: '#5452f5',
        },

        components: {
          // ── Menu ──────────────────────────────────────────────────────
          // Covers SelectMenu list rows + submenu popups.
          Menu: {
            // Panel / popup backgrounds
            itemBg:     'transparent',
            popupBg:    '#141414',         // submenu popup — was the main issue

            // Row states
            itemColor:         '#ffffff',
            itemHoverColor:    '#ffffff',
            itemHoverBg:       '#191919',  // neutral-900
            itemActiveBg:      '#292929',  // neutral-850
            itemSelectedColor: '#ffffff',
            itemSelectedBg:    '#191919',
            itemDisabledColor: '#636363',

            // Submenu parent row
            subMenuItemBg: 'transparent',

            // Row geometry
            itemHeight:          32,
            itemPaddingInline:   8,
            itemMarginInline:    0,
            itemMarginBlock:     2,
            iconMarginInlineEnd: 8,
            iconSize:            16,

            // Group / section title
            groupTitleColor:    '#949494',
            groupTitleFontSize: 12,

            // Divider
            colorSplit: '#313131',

            // Arrow (submenu expand indicator)
            // antd uses colorTextDisabled for the arrow; overriding via token
          },

          // ── Dropdown ─────────────────────────────────────────────────
          // Covers the Dropdown portal wrapper used by Select, ActionMenu, etc.
          Dropdown: {
            colorBgElevated: '#141414',
            paddingXXS: 4,
          },

          // ── Input ─────────────────────────────────────────────────────
          // Our Input component uses variant="borderless" + custom shell,
          // so most of these won't show. Kept for completeness / fallback.
          Input: {
            colorBgContainer:    '#191919',
            activeBorderColor:   '#949494',
            hoverBorderColor:    '#4a4a4a',
            activeShadow:        'none',
            errorActiveShadow:   'none',
            colorTextPlaceholder:'#636363',
          },

          // ── Select ────────────────────────────────────────────────────
          // Antd Select is not used directly (we built our own), but guard
          // in case it appears elsewhere.
          Select: {
            colorBgContainer:    '#191919',
            colorBgElevated:     '#141414',
            optionSelectedBg:    '#191919',
            optionActiveBg:      '#292929',
          },

          // ── Tree ──────────────────────────────────────────────────────
          Tree: {
            colorBgContainer:    'transparent',
            nodeHoverBg:         '#191919',
            nodeSelectedBg:      '#191919',
            directoryNodeSelectedBg: '#191919',
            titleHeight:         32,
          },

          // ── TreeSelect ────────────────────────────────────────────────
          TreeSelect: {
            colorBgElevated:     '#141414',
          },

          // ── Checkbox ──────────────────────────────────────────────────
          Checkbox: {
            colorPrimary:        '#5452f5',
            colorPrimaryHover:   '#4341f1',
            colorBgContainer:    '#191919',
          },

          // ── Tag ───────────────────────────────────────────────────────
          // Our Tag wraps antd Tag but overrides everything via inline style.
          Tag: {
            colorBorder:         'transparent',
          },

          // ── Tooltip ───────────────────────────────────────────────────
          Tooltip: {
            colorBgSpotlight:    '#313131',
            colorTextLightSolid: '#ffffff',
            borderRadius:        8,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}

export default GradientProvider
