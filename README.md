# Guruprasad G • Senior Staff Engineering Portfolio

An absolute premium, world-class personal portfolio engineered for Software Engineers. Designed with a clinical slate cyber-aesthetic, boasting rich motion orchestrations, custom hardware cursor trails, responsive glassmorphism, and optimized SMTP delivery workflows.

---

## 🎨 Creative Direction & Aesthetic Language

### The Slate Dark Palette
- **Background**: `#09090B` (A solid, eye-safe deep onyx dark canvas)
- **Primary Accent**: `#3B82F6` (High-contrast, vibrant digital blue)
- **Secondary Accent**: `#06B6D4` (Luminous cyber cyan)
- **Gradients**: Fluid, mathematically staggered radial blurs acting as atmospheric ambient backlighting.
- **Glassmorphic Core**: Elevated layout panels utilizing high-blur filters (`backdrop-blur-md`) with 1px border frames (`rgba(255,255,255,0.05)`) to eliminate flat visual clutter.

### Typography
- **Primary Body & Display**: **Inter** (Clean, versatile, highly readable humanist sans-serif)
- **Developer Accents**: **JetBrains Mono** (Accredited monospaced typeface for micro-metrics, labels, and statistics)

---

## 🛠️ Architecture & Tech Stack

The architecture is strictly modular, modularizing states, layout configurations, and component logic:

- **Frontend Core**: React 19 & TypeScript 5.x (Full static type verification)
- **Styles Engine**: Tailwind CSS v4 (Highly optimized runtime compiling)
- **Motion Orchestrations**: Framer Motion (v12) (Fluid spring-dampened curves, physics-based custom cursor inertia)
- **Routing Engine**: React Router (v6) (Clean virtual routing for deep maps and standalone 404 screens)
- **Alert Systems**: React Hot Toast (Low-latency notifications)
- **Intersections Monitoring**: React Intersection Observer (Ensures animations only run inside active viewports to preserve CPU/GPU clock cycles)
- **SMTP Gateway**: EmailJS Integration (Verifiable form submissions with built-in development fallback simulation)

---

## 📂 Engineering Directory Layout

```text
/src
├── components/          # Reusable components
│   ├── layout/          # Page architectures (Navbar, Footer)
│   ├── sections/        # Scroll deck panels (Hero, About, Skills, etc.)
│   └── ui/              # Interactive components (CustomCursor, LoadingScreen, ThemeToggle)
├── data/                # Accurate portfolio constants (portfolioData.ts)
├── hooks/               # Custom lifecycle hooks (useMousePosition.ts)
├── pages/               # Primary pages (Home.tsx, NotFound.tsx)
├── App.tsx              # App initialization and routing
├── index.css            # Stylesheets and custom animations
└── main.tsx             # DOM entry point
```

---

## 🚀 Commands & Development Scripts

Initialize the project locally using:

```bash
# Install required dependencies
npm install

# Run the local development server on http://localhost:3000
npm run dev

# Build the highly optimized, bundle-split production static assets
npm run build
```

## 📜 Key Engineering Implementations

- **Hybrid Cursor Engine**: Deploys a physical spring core that reduces trailing delay on high refresh rate displays while hiding on touch-only mobile viewports to prevent accessibility regressions.
- **Active Scroll Progress Mapping**: Blends an active tracking progress line seamlessly along the bottom edge of the sticky glass header.
- **Form Dispatch Simulator**: Guarantees zero runtime crashes on submission when API credentials are absent by transitioning smoothly into a local telemetry logging simulator.
