# DATER Landing — Design System

Single source of truth for typography, colors, layouts, and responsive rules. All UI work in this project must follow these specs. Prefer Tailwind utilities defined in `tailwind.config.js` (or documented arbitrary classes) — never hardcode typography via inline styles.

---

## Colors

| Token | Hex / Value | Tailwind class | Usage |
|-------|-------------|----------------|--------|
| Primary Text | `#000000` | `text-text-primary` | Headings, primary copy |
| Muted Text | `#565656` | `text-text-muted` | Section body / subtext |
| Muted Text Alt | `#484848` | `text-text-muted-alt` | Alternate muted copy |
| Hero Overlay | `rgba(0, 0, 0, 0.45)` | `bg-hero-overlay` | Dark scrim over hero imagery |
| Accent Lime | `#DAEF68` | `bg-accent-lime` | Feature cards + download CTA band |
| Accent Blue | `#5E9CFE` | `bg-accent-blue` | Feature card |
| Accent Orange | `#FE8E59` | `bg-accent-orange` | Feature card |
| Accent Periwinkle | `#8F9BFE` | `bg-accent-periwinkle` | Feature card |
| Accent Yellow | `#FBFE54` | `bg-accent-yellow` | Feature card |
| Accent Pink | `#FDB2EE` | `bg-accent-pink` | Feature card |
| Accent Lavender | `#EDE8FF` | `bg-accent-lavender` | Behind-the-scenes / blog section background |
| Accent Pink Soft | `#F3B6EC` | `bg-accent-pink-soft` | Secondary pink / hover accent |

### Feature card accent order (homepage, top → bottom)

1. `#DAEF68` Lime  
2. `#5E9CFE` Blue  
3. `#FE8E59` Orange  
4. `#8F9BFE` Periwinkle  
5. `#FBFE54` Yellow  
6. `#DAEF68` Lime  
7. `#FDB2EE` Pink  

Section band: `#EDE8FF` (lavender). Soft pink accent: `#F3B6EC`.

Constants mirror: `src/constants/colors.js`.

---

## Font family

**Google Sans Flex** — primary UI font. Weights loaded: **300, 400, 500, 600, 700**.

- Tailwind: `font-google-sans-flex`
- Loaded via Google Fonts in `index.html`
- Apply on `body` by default (`index.css`)

---

## Desktop (PC) Typography — Google Sans Flex

Use these as the `md:` (and up) targets.

| Role | Size | Weight | Line-height | Color / notes |
|------|------|--------|-------------|----------------|
| Hero Main Title | 44px | SemiBold (600) | Auto | Primary text; often uppercase |
| Hero Subtitle | 26px | Light (300) | Auto | — |
| Section Heading | 40px | SemiBold (600) | 46px | Primary text |
| Section Subtext / Body | 22px | Light (300) or Regular (400) | 34px | `#565656` (`text-text-muted`) |
| Blog Card Title | 24px | Regular (400) | 30px | — |
| Feature Card Title | 22px | Medium (500) | 26px | — |
| Feature Card Body | 16px | Regular (400) | 20px | — |
| Footer Link | 18px | Medium (500) | Auto | — |
| QR Code Subtext | 22px | Regular (400) | Auto | — |

### Tailwind utilities (desktop companions)

| Role | Mobile base class | Desktop override |
|------|-------------------|------------------|
| Hero Title | `text-hero-title` | `md:text-hero-title-md` |
| Hero Subtitle | `text-hero-subtitle` | `md:text-hero-subtitle-md` |
| Section Heading | `text-section-heading` | `md:text-section-heading-md` |
| Body (Light) | `text-body-lg` | `md:text-body-lg-md` |
| Body (Regular) | `text-body-lg-regular` | `md:text-body-lg-regular-md` |
| Blog Card Title | `text-blog-card-title` | `md:text-blog-card-title-md` |
| Feature Card Title | `text-feature-card-title` | `md:text-feature-card-title-md` |
| Feature Card Body | `text-feature-card-body` | `md:text-feature-card-body-md` |
| Footer Link | `text-footer-link` | `md:text-footer-link-md` |
| QR Subtext | `text-qr-subtext` | `md:text-qr-subtext-md` |

Convenience class strings: `src/constants/typography.js` (`TYPOGRAPHY.*`).

---

## Mobile Typography Guidelines (Mobile-First Defaults)

Downscale headings fluidly with Tailwind mobile base + `md:` desktop overrides.

| Role | Mobile | Desktop (`md:`) |
|------|--------|-----------------|
| Hero Title | **28px–32px** (token: 28px) | **44px** (`md:text-hero-title-md` or `md:text-[44px]`) |
| Section Titles | **28px–32px** (token: 28px) | **40px** (`md:text-section-heading-md` or `md:text-[40px]`) |
| Body Text | **14px–16px** (token: 16px) | **22px** (`md:text-body-lg-md`) |

If a one-off size is needed, use an explicit arbitrary class that matches this doc (e.g. `text-[30px] md:text-[44px]`), not inline `style={{ fontSize }}`.

---

## Layout & Responsive Rules

1. **Mobile-first** — Always write mobile dimensions as base classes; apply `md:` for PC overrides.
2. **Breakpoints** — Prefer default Tailwind `sm` / `md` / `lg`. Desktop Figma specs apply at `md:` and up unless a design calls for `lg:`.
3. **Hero overlay** — Place `bg-hero-overlay` (or a gradient using the same token) over hero imagery so white / light text remains readable.
4. **Accent cards** — Use the named accent background classes; keep card corner radius consistent with Figma (typically large / `rounded-3xl`+).
5. **Max content width** — Prefer a shared max width (e.g. `max-w-6xl`) for page shells unless a full-bleed section (hero, accent bands) requires otherwise.

---

## Development Rules

1. **Zero hardcoded inline typography** — Do not use `style={{ fontSize, fontWeight, lineHeight, color }}` for type. Use Tailwind custom utilities or documented arbitrary classes from this file.
2. **Colors from tokens** — Prefer `text-text-*`, `bg-accent-*`, etc. Avoid raw hex in components except when extending `tailwind.config.js` / `constants/colors.js`.
3. **Google Sans Flex everywhere** — Use `font-google-sans-flex` (already on `body`); do not introduce alternate UI fonts without updating this doc.
4. **Update this file first** — Any new type scale, color, or layout rule must be added here and mirrored in `tailwind.config.js` before use in components.
5. **Constants** — Shared hex maps and WP URL placeholders live under `src/constants/`.

---

## Example usage

```jsx
<h1 className="font-google-sans-flex uppercase text-hero-title md:text-hero-title-md text-text-primary">
  YOUR PET PREFERS US OVER OTHER APPS
</h1>

<p className="text-body-lg md:text-body-lg-md text-text-muted">
  Section supporting copy.
</p>

<section className="bg-accent-lavender">
  {/* Behind the scenes */}
</section>

<div className="bg-accent-lime rounded-3xl">
  {/* Feature card */}
</div>
```
