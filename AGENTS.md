# AGENTS.md - Agentic Workflow Guide for Chaihuo MCV Website

This document provides essential context, commands, and guidelines for AI agents working on the `chaihuo-mcv-site` repository.

## 📁 Repository Structure

```text
chaihuo-mcv/
├── src/              # Astro source files
├── public/           # Static assets
├── dist/             # Build output
└── wrangler.jsonc    # Cloudflare Workers config
```

## 🛠 Website Environment

- **Framework**: Astro 5.x (Islands Architecture)
- **UI Libraries**: React 19 (for interactive components)
- **Styling**: Tailwind CSS 4 + DaisyUI 5
- **Runtime**: Node.js (ES Modules)
- **Deployment**: Cloudflare Pages (Worker-managed Static Site)
- **Primary Language**: JavaScript (JS/JSX) with TypeScript support configured

## 🏗 Deployment Architecture

The website uses **Static Site Generation (SSG)** but is deployed via the **Cloudflare Workers Adapter** in advanced mode.

- **Why**: This setup is "Future-Proof". It acts like a static site but allows for dynamic features (API routes, redirects, auth) via Workers if needed later.
- **The `ASSETS` Binding**: In `wrangler.jsonc`, the `"binding": "ASSETS"` configuration is **CRITICAL**.
  - Since a Worker intercepts all traffic, it uses this binding to fetch static files (images, CSS, JS) from Cloudflare's storage.
  - **Do NOT remove** this binding, or static assets will fail to load.

## 🚀 Common Commands

### Website Development & Build

```bash
npm install
npm run dev      # Start Astro dev server (localhost:4321)
npm run build    # Build to website/dist/
npm run preview  # Preview production build
```

### Deployment Commands

The site supports two deployment targets:

**Cloudflare Pages (default)**:

    npm run build        # Default Cloudflare build
    npm run build:cf     # Explicit Cloudflare build

**Node.js Server**:

    npm run build:node              # Build for Node.js (必须先执行)
    PORT=3000 npm run start         # Start Node.js server on port 3000

Note: `start` 命令需要显式指定 `PORT`，否则使用默认端口 4321。

**Docker**:

    docker build -t chaihuo-mcv .
    docker run -p 3000:3000 chaihuo-mcv  # 容器内已设置 PORT=3000

### Testing & Linting

- **Tests**: Currently, no automated testing framework (Jest/Vitest/Playwright) is configured. Manual verification is required.
- **Linting**: No dedicated linting script (ESLint/Prettier) in `package.json`. Follow existing file patterns for formatting.

## 📐 Code Style & Conventions

### 1. File Naming & Structure

- **Components**: `PascalCase` (e.g., `Hero.jsx`, `MainLayout.astro`)
- **Utilities/Configs**: `kebab-case` or `camelCase` (e.g., `route-config.js`, `useDevTools.js`)
- **Pages**: Follow Astro routing in `src/pages/`. Content-heavy pages should use Markdown (`.md`) or MDX if configured.

### 2. Component Architecture (Islands)

- Keep components as static `.astro` files by default.
- Use React components (`.jsx`) ONLY for interactive elements (maps, toggles, complex forms).
- **Hydration**: Use `client:load` or `client:visible` directives in `.astro` files when importing React components.

### 3. Styling & Design System

- **Colors**: Use the project's brand colors defined in `src/styles/global.css` via Tailwind classes:
  - `text-chaihuo` / `bg-chaihuo` (Brand Orange)
  - `text-tech-blue` / `bg-tech-blue` (Tech Blue)
  - `text-earth` / `bg-earth` (Earth Brown)
- **DaisyUI**: Prefer DaisyUI classes (`btn`, `card`, `stat`, `badge`) over custom utility soup.
- **Color Space**: The project uses **OKLCH** for color definitions in `global.css`.

### 4. Imports

- Use standard ES Modules (`import/export`).
- Relative imports are standard (e.g., `import X from "../components/X.astro"`).

### 5. Data Management

- Centralize static data (like map coordinates) in config files (e.g., `src/components/map/route-config.js`) rather than hardcoding in components.

## 🗺 Interactive Map Updates

- The route map is a core feature. Coordinates are handled via a custom grid system (0-100).
- Data source: `src/components/map/route-config.js`.
- Use the provided `useDevTools.js` logic (hidden in dev) to calibrate new coordinates if necessary.

## ⚠️ Guidelines for AI Agents

- **Visual Changes**: Always delegate visual styling, layout, and animation tasks to the `frontend-ui-ux-engineer` agent.
- **Logic Changes**: Logic, data flow, and Astro component structure can be handled directly.
- **Verification**: Since no test suite exists, you MUST manually verify changes by reading the code and ensuring `lsp_diagnostics` are clean.
- **TypeScript**: While `tsconfig.json` exists, the project is currently JS-heavy. Do not force-convert files to TS unless requested, but follow TS-like discipline in JS.
- **Chinese Content**: This is a Chinese-language site. Ensure all user-facing text is in Chinese unless it's a technical label.

## ✏️ Volunteer & Developer Guide （志愿者/开发者指南）

### 1️⃣ Modifying Text Content (`src/content`)

#### Hero Title & Subtitle

- File: `src/components/Hero.jsx`
- Look for `<h1>` block. Edit the Chinese text directly.

#### Project Intro Cards

- File: `src/components/ProjectIntro.astro`
- Edit `<h3>` (title) and `<p>` (description) tags.

#### Statistics

- File: `src/components/ProjectIntro.astro`
- Look for `<div class="stat-value">`.

### 2️⃣ Assets & Images

#### Replacing Hero Background

1. Place image in `public/`.
2. Update `src/components/Hero.jsx`: `backgroundImage: 'url(/your-image.jpg)'`.

### 3️⃣ Color Theme Configuration

- File: `src/styles/global.css`
- Core variables: `--color-chaihuo`, `--color-earth`, `--color-tech-blue`.
- Uses **OKLCH** color space (Lightness, Chroma, Hue).

### 4️⃣ Route Map Updates

- File: `src/components/map/route-config.js`
- **Key Cities**: Add to `KEY_CITIES` array (includes popup info).
- **Route Path**: Add to `ROUTE_POINTS` array.
- **Tip**: Use the built-in "Drawing Tool" in Dev mode (`IS_DEV = true` in `useDevTools.js`) to generate coordinate JSON.

### 5️⃣ Adding Impact Stories

- File: `src/pages/index.astro` (Impact Section) OR `src/content/stories/*.md` (if using collections).
- Copy existing card structure in `index.astro`.

## 📝 FAQ (Developer)

### Q: Changes not showing?

A: Ensure dev server is running (`npm run dev`) and refresh.

### Q: Debugging errors?

A: Check terminal output for Astro error messages.

### Q: Deployment targets?

A: The site supports two deployment targets:
1. **Cloudflare Pages** (default): Use `npm run build` or `npm run build:cf`
2. **Node.js Server**: Use `npm run build:node && PORT=3000 npm run start`
3. **Docker**: Use `docker build -t chaihuo-mcv . && docker run -p 3000:3000 chaihuo-mcv`

The build output in `dist/` varies by target:
- Cloudflare: `dist/_worker.js/` (Worker script)
- Node.js: `dist/server/entry.mjs` (standalone server)

**Note**: The `npm run start` command requires `PORT` environment variable.
Without it, the server uses the default port 4321.

### Q: Microsoft Clarity?

A: Configured in `src/layouts/MainLayout.astro`. Only loads in PROD (`import.meta.env.PROD`).
