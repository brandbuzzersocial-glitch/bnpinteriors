# BNP INTERIORS — PROJECT RULES & DIRECTIVES

---

## 1. ⚡ SUPERPOWER RULE ENGINE
- **Production-Ready Standards**: Never use placeholder text, broken links, or temporary stub code. Every component must be fully implemented, styled, and functional.
- **Strict Verification Protocol**: Always preview, test, and verify changes locally on `http://localhost:8080` before suggesting deployment or pushing to Git.
- **Architectural Rigor**: Maintain clean CSS architecture (variables, utility classes, logical component blocks) and modular, event-driven JavaScript without console errors.
- **Zero Regression Guarantee**: Any modification to existing components must preserve cross-page design consistency, color tokens (`#caa05c` primary, `#1c1c1d` dark, `#59585d` text), and responsive behaviors.

---

## 2. 🎨 UI/UX PRO DESIGN ENGINE
- **Luxury Aesthetic**: Deliver a state-of-the-art, wow-factor visual aesthetic tailored for high-end architecture and interior design.
- **Rich Typography & Micro-Interactions**: Utilize Google Fonts (`Cal Sans` for headings, `Golos Text` for body) with fluid `clamp()` sizing, smooth hover transitions (`var(--ease)`), hover scales, and glassmorphism backdrops.
- **Blueprint Line Art & Architectural Sketch Overlays**: Integrate multi-layered 3D building wireframe sketch backgrounds (`sketch-bg-both`, `sketch-bg-1`, `sketch-bg-2`, `blueprint-grid-bg`) and gold geometric line icons across cards and headers.
- **Visual Feedback**: Every interactive element (buttons, cards, links, tabs, form fields) must provide crisp visual feedback on hover, focus, and active states.

---

## 3. 🔍 SEO & PERFORMANCE ENGINE
- **Semantic Document Hierarchy**: Enforce valid HTML5 semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) with exactly one `<h1>` per page.
- **Meta & OpenGraph Completeness**: Every HTML page must include descriptive `<title>`, `<meta name="description">`, `og:title`, `og:description`, `og:image`, and `twitter:card` tags.
- **Core Web Vitals Optimization**:
  - Image lazy loading (`loading="lazy"`).
  - Preconnected font origins (`fonts.googleapis.com` & `fonts.gstatic.com`).
  - Asynchronous script execution (`<script src="..." defer>`).
- **Structured Data**: Include JSON-LD schema markup (`Organization` / `LocalBusiness` / `ArchitecturalFirm`) for search engine indexing.

---

## 4. 📱 MOBILE OPTIMISATION ENGINE
- **Responsive Breakpoints**: Design fluid layouts adapting seamlessly across 5 breakpoint tiers:
  - Large Desktop: `> 1410px`
  - Laptop / Tablet Landscape: `1024px – 1200px`
  - Tablet Portrait: `768px – 1024px`
  - Mobile Landscape: `480px – 768px`
  - Mobile Small: `< 480px`
- **Touch Usability**: All touch targets (buttons, links, inputs, icons) must meet minimum 44x44px interactive bounds.
- **Mobile Navigation**: Provide a smooth side-drawer / drop-down menu with active tab highlights, closing automatically upon link selection.
- **Horizontal Overflow Prevention**: Strict `overflow-x: hidden` enforcement on body and container wrappers to prevent unwanted side-scrolling on mobile devices.
