---
name: panda-css
description: >
  Expert guidance for writing styles with Panda CSS — a build-time CSS-in-JS framework. Use this skill whenever the user is working with Panda CSS, whether they're applying styles with `css()`, building component recipes with `cva`/`sva`, using patterns like `stack` or `flex`, merging class names with `cx()`, writing conditional/responsive styles, or configuring tokens and themes. Trigger this skill for any Panda CSS question, even casual ones like "how do I do dark mode in Panda?" or "how do I merge styles?". This skill covers correct usage patterns, common pitfalls, advanced tips, and how to use the Panda CSS MCP server to introspect the user's live design system.
license: Apache-2.0
metadata:
  author: whoisryosuke
  version: "4.2.0"
  repository: https://github.com/whoisryosuke/skills
---

# Panda CSS Skill

Panda CSS is a build-time, type-safe CSS-in-JS framework that generates atomic CSS at compile time — no runtime overhead.

**Key imports:**

```ts
import { css, cx, cva, sva } from "../styled-system/css";
import {
  stack,
  flex,
  grid,
  box,
  circle,
  container,
  cq,
} from "../styled-system/patterns";
```

---

## 0. Panda CSS MCP Server — Always Check First

The user's project exposes a **Panda CSS MCP server** that gives you live introspection of their actual design system. Before writing any styles, tokens, or recipes from memory, **query the MCP server first** so your output matches their real codebase.

### When to use the MCP server

| Situation                                                          | What to query                                                             |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| Referencing a color, spacing, font, shadow, or any token           | `getTokens` — confirm the token name and value exist                      |
| Using or extending a recipe/variant                                | `getRecipes` — see exact variant keys and their styles                    |
| Using a layout pattern                                             | `getPatterns` — see available props and defaults                          |
| Wondering if a token or recipe is actually used                    | `getTokenUsage` / `getRecipeUsage` — find real usages across the codebase |
| User asks "what tokens do I have?" or "what colors are available?" | `getTokens` filtered by category                                          |

### How to call the MCP server

The MCP server is available in the current tool context. Call its tools directly before writing code:

```
// Look up all color tokens
getTokens({ category: "colors" })

// Look up a specific token by name
getTokens({ filter: "brand" })

// Get all available recipes
getRecipes()

// Get a specific recipe and its variants
getRecipes({ name: "button" })

// Get all layout patterns
getPatterns()

// Find where a token is used in the codebase
getTokenUsage({ token: "colors.brand.500" })

// Find where a recipe variant is used
getRecipeUsage({ recipe: "button", variant: "solid" })
```

### Workflow for token-aware style writing

1. **Query first** — call `getTokens` to confirm the token path before using it in `css()`
2. **Use real names** — never guess token names like `blue.500` if the project has a semantic token `brand.primary`
3. **Check recipes before recreating** — call `getRecipes` before writing a new `cva()` to avoid duplicating an existing recipe
4. **Validate patterns** — call `getPatterns` to see what props a built-in pattern accepts before customizing it

### Example: Token-aware component

```tsx
// 1. Query the MCP server → getTokens({ category: "colors" })
// → Returns: brand.primary = #7c3aed, brand.secondary = #a78bfa, surface.default = white/_dark:gray.900

// 2. Now write styles using the confirmed token names
const card = css({
  bg: "surface.default", // confirmed semantic token
  borderColor: "brand.secondary", // confirmed token
  _hover: { borderColor: "brand.primary" },
});
```

> **If the MCP server is unavailable** (tool not connected, project not running), fall back to the style patterns in this skill and note to the user that you're using generic Panda defaults rather than their actual token names.

---

## 1. Writing Styles with `css()`

The `css()` function is the foundation of Panda. It accepts a style object and returns a class string.

```tsx
import { css } from "../styled-system/css";

const className = css({
  display: "flex",
  bg: "blue.500", // shorthand for backgroundColor
  px: "4", // shorthand for paddingX (paddingInline)
  py: "2",
  color: "white",
  rounded: "md", // shorthand for borderRadius
  fontSize: "sm",
  fontWeight: "bold",
});
```

### Common Shorthands

| Shorthand                               | Expands to                     |
| --------------------------------------- | ------------------------------ |
| `bg`                                    | `backgroundColor`              |
| `p`, `px`, `py`, `pt`, `pb`, `pl`, `pr` | padding variants               |
| `m`, `mx`, `my`, `mt`, `mb`, `ml`, `mr` | margin variants                |
| `w`, `h`                                | `width`, `height`              |
| `minW`, `maxW`, `minH`, `maxH`          | min/max size                   |
| `rounded`                               | `borderRadius`                 |
| `shadow`                                | `boxShadow`                    |
| `ring`                                  | outline ring utilities         |
| `pos`                                   | `position`                     |
| `inset`                                 | top/right/bottom/left together |

---

## 2. Merging Styles with `cx()` — KEY TIP

`cx()` is how you **concatenate/merge** multiple class names in Panda. Use it instead of template literals.

```tsx
import { css, cx } from "../styled-system/css";

// ✅ Correct — merge two css() results
const base = css({ bg: "blue.500", color: "white" });
const active = css({ bg: "blue.700", fontWeight: "bold" });

const className = cx(base, active);

// ✅ Also works with raw class strings, conditional classes, arrays
const className2 = cx(
  css({ px: "4", py: "2" }),
  isActive && css({ bg: "green.500" }),
  someExternalClass,
);
```

> **Tip:** `cx()` doesn't merge style properties — it concatenates class names. Panda generates atomic CSS, so the last rule in the cascade wins for conflicts. For true property merging, pass multiple style objects to a single `css()` call or use `css.raw()`.

### `css()` as a merge function

You can pass multiple style objects directly to `css()` — later objects override earlier ones:

```tsx
const merged = css(
  { bg: "blue.500", color: "white", px: "4" },
  props.css, // override from parent component
);
```

---

## 3. Conditional Styles (Pseudo-States)

Panda provides `_` prefixed shortcuts for all common pseudo-states and media queries.

```tsx
css({
  bg: "blue.500",
  _hover: { bg: "blue.700" }, // :hover
  _focus: { outline: "2px solid blue" }, // :focus
  _active: { bg: "blue.900" }, // :active
  _disabled: { opacity: "0.5", cursor: "not-allowed" },
  _placeholder: { color: "gray.400" }, // input placeholder
  _before: { content: '"→"', mr: "2" }, // ::before — wrap content in double quotes!
  _after: { content: '"←"', ml: "2" }, // ::after
});
```

### Property-Level Conditions (concise syntax)

Instead of nesting, apply the condition directly on the property:

```tsx
// Verbose ❌
css({ bg: "blue.500", _hover: { bg: "blue.700" } });

// Concise ✅
css({ bg: { base: "blue.500", _hover: "blue.700" } });
```

> `base` is the default (no condition). Use it when defining property-level conditions.

### Dark Mode

```tsx
css({
  bg: "white",
  color: "gray.900",
  _dark: { bg: "gray.900", color: "white" }, // data-theme="dark" or .dark class
  _osDark: { bg: "gray.800" }, // prefers-color-scheme: dark
});
```

### Nested Conditions

```tsx
css({
  // Focused AND hovered
  bg: { base: "blue.500", _hover: { _focus: "blue.700" } },
  // Dark mode + hover
  _dark: { _hover: { bg: "gray.700" } }, // ✅ condition BEFORE pseudo-element
});
```

> **Rule:** Always place media/theme conditions (`_dark`, `_hover`) **before** pseudo-elements (`_before`, `_after`) when nesting.

---

## 4. Responsive Design

Panda uses mobile-first breakpoints. Default breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px).

```tsx
// Responsive font size — mobile first
css({
  fontSize: { base: "sm", md: "lg", xl: "2xl" },
  px: { base: "4", lg: "8" },
  flexDir: { base: "column", md: "row" },
});
```

---

## 5. Color Opacity Modifier

Use the `{color}/{opacity}` syntax to set color opacity without a separate utility:

```tsx
css({
  bg: "blue.500/40", // blue.500 at 40% opacity
  color: "red.300/75", // red.300 at 75% opacity
  border: "1px solid",
  borderColor: "gray.200/50",
});
```

This uses CSS `color-mix()` under the hood with an automatic fallback.

---

## 6. Group & Sibling Selectors

Style children based on parent state using `group` and `peer`:

```tsx
// Group: style child based on parent hover
<div className="group">
  <p className={css({ color: 'gray.500', _groupHover: { color: 'black' } })}>
    I change when parent is hovered
  </p>
</div>

// Peer: style element based on preceding sibling state
<div>
  <input className="peer" type="text" />
  <p className={css({ _peerFocus: { color: 'blue.500' } })}>
    I change when the input is focused
  </p>
</div>
```

Available: `_groupHover`, `_groupFocus`, `_groupDisabled`, `_peerHover`, `_peerFocus`, `_peerDisabled`, `_peerChecked`, etc.

---

## 7. Recipes with `cva()` — Component Variants

`cva()` (Class Variance Authority style) creates reusable, typed component style recipes.

```tsx
import { cva } from '../styled-system/css'

const button = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    px: '4',
    py: '2',
    rounded: 'md',
    fontWeight: 'semibold',
    cursor: 'pointer',
    transition: 'all',
    _disabled: { opacity: '0.5', cursor: 'not-allowed' },
  },
  variants: {
    visual: {
      solid: { bg: 'blue.500', color: 'white', _hover: { bg: 'blue.700' } },
      outline: { border: '2px solid', borderColor: 'blue.500', color: 'blue.500' },
      ghost: { color: 'blue.500', _hover: { bg: 'blue.50' } },
    },
    size: {
      sm: { px: '3', py: '1', fontSize: 'sm' },
      md: { px: '4', py: '2', fontSize: 'md' },
      lg: { px: '6', py: '3', fontSize: 'lg' },
    },
  },
  compoundVariants: [
    // Special rule when multiple variants combine
    {
      visual: 'solid',
      size: 'lg',
      css: { letterSpacing: 'wide' },
    },
  ],
  defaultVariants: {
    visual: 'solid',
    size: 'md',
  },
})

// Usage
<button className={button({ visual: 'outline', size: 'lg' })}>
  Click me
</button>
```

---

## 8. Slot Recipes with `sva()` — Multi-Part Components

`sva()` applies recipes across multiple parts of a component:

```tsx
import { sva } from '../styled-system/css'

const card = sva({
  slots: ['root', 'header', 'body', 'footer'],
  base: {
    root: { bg: 'white', rounded: 'lg', shadow: 'md', overflow: 'hidden' },
    header: { px: '6', py: '4', borderBottom: '1px solid', borderColor: 'gray.100' },
    body: { px: '6', py: '4' },
    footer: { px: '6', py: '4', bg: 'gray.50' },
  },
  variants: {
    size: {
      sm: { root: { maxW: 'sm' }, body: { fontSize: 'sm' } },
      lg: { root: { maxW: 'lg' }, body: { fontSize: 'md' } },
    },
  },
  defaultVariants: { size: 'sm' },
})

// Usage
const styles = card({ size: 'lg' })
<div className={styles.root}>
  <div className={styles.header}>Header</div>
  <div className={styles.body}>Body</div>
  <div className={styles.footer}>Footer</div>
</div>
```

---

## 9. Patterns

Patterns are high-level layout utilities. Import from `styled-system/patterns`.

```tsx
import { stack, flex, grid, box, circle, container } from '../styled-system/patterns'

// stack — vertical flex column
<div className={stack({ gap: '4', align: 'center' })}>...</div>

// flex — horizontal flex row
<div className={flex({ gap: '2', justify: 'space-between' })}>...</div>

// grid — CSS grid
<div className={grid({ columns: 3, gap: '4' })}>...</div>

// box — generic div with Panda props
<div className={box({ p: '4', bg: 'gray.100' })}>...</div>

// circle — perfect circle
<div className={circle({ size: '40px', bg: 'blue.500' })}>...</div>

// container — centered content with max-width
<div className={container({ maxW: '6xl', px: '4' })}>...</div>
```

---

## 10. Global Styles & Cascade Layers

Panda organizes CSS into cascade layers (lowest → highest priority):
`reset → base → tokens → recipes → utilities`

Global styles go in `panda.config.ts`:

```ts
export default defineConfig({
  globalCss: {
    "html, body": { margin: 0, fontFamily: "sans-serif" },
    a: { color: "inherit", textDecoration: "none" },
  },
});
```

Always include the layer declaration at the top of your main CSS file:

```css
@layer reset, base, tokens, recipes, utilities;
```

---

## 11. Tokens & Semantic Tokens

Access design tokens in style objects by their name. Define custom tokens in `panda.config.ts`:

```ts
export default defineConfig({
  theme: {
    extend: {
      tokens: {
        colors: {
          brand: { value: "#7c3aed" },
        },
        fontSizes: {
          hero: { value: "4rem" },
        },
      },
      semanticTokens: {
        colors: {
          // Automatically switches in dark mode
          surface: {
            value: { base: "{colors.white}", _dark: "{colors.gray.900}" },
          },
        },
      },
    },
  },
});

// Then use in styles:
css({ color: "brand", fontSize: "hero", bg: "surface" });
```

---

## 12. `css.raw()` — Composable Style Objects

Use `css.raw()` to get the raw style object without generating a class name. Useful for composition before rendering:

```tsx
const cardBase = css.raw({ bg: "white", rounded: "lg", p: "4" });
const elevated = css.raw({
  shadow: "md",
  border: "1px solid",
  borderColor: "gray.100",
});

// Merge at call site — later props override earlier
const finalClass = css(cardBase, elevated, { bg: "gray.50" });
```

---

## 13. Arbitrary Selectors & Values

For one-off selectors or values not in your token scale:

```tsx
css({
  // Arbitrary selector
  "&[data-state=open]": { opacity: "1" },
  "& > *": { mb: "2" },
  "& + &": { mt: "4" },

  // Arbitrary values — wrap in brackets
  w: "[327px]",
  mt: "[13px]",
  color: "[#ff6b6b]",
  gridTemplateColumns: "[repeat(auto-fit,minmax(200px,1fr))]",
});
```

---

## Common Pitfalls

| Problem                                     | Solution                                                                             |
| ------------------------------------------- | ------------------------------------------------------------------------------------ |
| `_before`/`_after` content not appearing    | Wrap content in double quotes: `content: '"text"'`                                   |
| Condition inside pseudo-element not working | Put condition BEFORE pseudo-element: `_dark: { _before: {...} }` ✅                  |
| Dynamic class concatenation breaking styles | Use `cx()` not template literals                                                     |
| Style properties not overriding             | Use `css()` with multiple args instead of `cx()`                                     |
| Styles not generated in production          | Panda requires static analysis — avoid fully dynamic style objects                   |
| `px` meaning pixels vs padding              | `px` = `paddingX` in Panda; use `[14px]` for pixel values or `14` for spacing tokens |

---

## Quick Reference

```tsx
// Apply styles → className string
css({ ... })

// Merge class names
cx(classA, classB, conditionalClass && classC)

// Composable style object (no class yet)
css.raw({ ... })

// Component variants
cva({ base: {}, variants: {} })

// Multi-slot component variants
sva({ slots: [], base: {}, variants: {} })

// Layout patterns
stack / flex / grid / box / circle / container / cq

// Color with opacity
css({ bg: 'blue.500/50' })

// Responsive
css({ fontSize: { base: 'sm', md: 'lg' } })

// Pseudo-states
css({ _hover: {}, _focus: {}, _dark: {}, _disabled: {} })
```
