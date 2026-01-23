# AGENTS.md - Agentic Workflow Guide for Chaihuo VanCar

This document provides essential context, commands, and guidelines for AI agents working on the `chaihuo-vancar` monorepo.

## 📁 Monorepo Structure

```
chaihuo-vancar/
├── website/          # 宣传网站 (Astro + Cloudflare)
├── design/           # 设计源文件（可编辑）
│   ├── mechanical/   # 机械 CAD (STEP, 原生格式)
│   └── electrical/   # 电气原理图 (KiCad 等)
├── fabrication/      # 制造文件（给机器/供应商）
│   ├── 3d-print/     # STL/3MF 打印文件
│   ├── pcb/          # Gerber, 贴片文件
│   ├── cut/          # DXF 激光/CNC 切割
│   ├── bom/          # 物料清单 (CSV/Excel)
│   └── wiring/       # 接线图 (PDF)
└── operation/        # 运行代码
    ├── firmware/     # 嵌入式代码 (MCU)
    └── software/     # 服务器、IoT、控制软件
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
- **The `ASSETS` Binding**: In `website/wrangler.jsonc`, the `"binding": "ASSETS"` configuration is **CRITICAL**.
  - Since a Worker intercepts all traffic, it uses this binding to fetch static files (images, CSS, JS) from Cloudflare's storage.
  - **Do NOT remove** this binding, or static assets will fail to load.

## 🚀 Common Commands

### Website Development & Build

```bash
cd website
npm install
npm run dev      # Start Astro dev server (localhost:4321)
npm run build    # Build to website/dist/
npm run preview  # Preview production build
```

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

## ⚠️ Guidelines for AI Agents

- **Visual Changes**: Always delegate visual styling, layout, and animation tasks to the `frontend-ui-ux-engineer` agent.
- **Logic Changes**: Logic, data flow, and Astro component structure can be handled directly.
- **Verification**: Since no test suite exists, you MUST manually verify changes by reading the code and ensuring `lsp_diagnostics` are clean.
- **TypeScript**: While `tsconfig.json` exists, the project is currently JS-heavy. Do not force-convert files to TS unless requested, but follow TS-like discipline in JS.
- **Chinese Content**: This is a Chinese-language site. Ensure all user-facing text is in Chinese unless it's a technical label.

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
