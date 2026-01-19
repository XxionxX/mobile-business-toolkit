# 🗺️ Roadmap — Mobile Business Toolkit

This roadmap reflects current progress, upcoming priorities, and the long-term
vision for scaling the toolkit from a single-module MVP to an enterprise-ready platform.

---

## 🚀 Phase 0 — MVP (Completed / Ongoing Polish)
- Basic project structure
- Payroll calculator (MVP math + formatting)
- Persistent local storage for user data
- UI improvements: spacing, inputs, rounding, readability
- Main menu navigation
- Initial documentation suite
- Apache 2.0 license
- GitHub project setup with private repo
- Security guardrails established (SecureStore, no sensitive AsyncStorage)

---

## 🎨 Phase 1 — UX Buildout & Design System
- Unified color system and spacing scale
- Reusable input components
- Header component + section wrappers
- Light/Dark theme architecture
- Motion & micro-interactions (Reanimated)
- Accessibility improvements (contrast, focus states)
- Typography system

---

## 🧩 Phase 2 — Framework Architecture
Focus: establishing a stable internal framework so new calculators and features
can be added without UI rewrites or architectural debt.

- Standardized module structure for all calculators
  - Shared screen wrapper (CalcScreen)
  - Consistent header, spacing, warnings, and toast handling
  - Storage helpers per calculator (hydrate/persist/defaults)
- `/lib` utilities:
  - formatting (currency, hours, percentages)
  - validation helpers
  - shared error utilities
- Central logging service (initially console-based, swappable later)
- Error boundaries for calculator screens and routes
- Runtime configuration system (env/app.json driven)
- API wrapper layer for Supabase (readiness, not full auth yet)

Notes:
- Start Phase 3 “light tooling” early (Prettier + minimal ESLint + typecheck scripts)
  to reduce refactor risk while Phase 2 is still moving quickly.

---

## 🛠️ Phase 3 — Developer Experience & Code Quality
Goal: improve safety and maintainability without slowing feature delivery.
Start light; tighten rules over time.

Core (light-first):
- Add npm scripts:
  - `format` / `format:check` (Prettier)
  - `lint` (ESLint)
  - `typecheck` (tsc --noEmit)
  - `test` (Jest for logic modules)
- Prettier formatting rules (low friction, repo-wide consistency)
- ESLint (minimal rules; avoid style rules that overlap with Prettier)
- Jest unit tests for `lib/calculators/**/logic.ts` (start with 1–2 modules)
- GitHub Actions CI:
  - run `typecheck`, `test`, and `lint` on pull requests and main pushes

Optional / later hardening:
- TypeScript strict mode (incremental migration)
- Husky pre-commit hooks (lint → test → typecheck)
- Commitlint (Conventional Commits)
- Detox E2E test scaffolding
- Automatic versioning via semantic releases (future)

---

## 🔐 Phase 4 — Authentication + Supabase Integration (Managed Hosting)
- Supabase project setup
- User authentication:
  - Email + password
  - Magic link login
  - Optional OAuth (Google, etc.)
- Secure token handling using SecureStore
- Row-Level Security (RLS) policies for:
  - users
  - locations
  - employees
  - reports
  - sales logs
- Storage migration from AsyncStorage → synced Supabase tables
- Protected routes in Expo Router

---

## 🔄 Phase 5 — Offline Sync Engine
- Local encrypted SQLite for caching
- Pending operations queue
- Conflict resolution strategy
- Background syncing
- Sync indicators (online/offline, pending changes)

---

## 📊 Phase 6 — Feature Modules

### 6A — 📸 OCR Input Assistance
- OCR for uploaded images or camera input
- Auto-detection of numbers (quantities, totals, invoices)
- Autofill calculator fields
- AI suggestions for missing or misread data

### 6B — 📄 PDF Generator
- Export formatted business reports
- Attachment-ready PDFs for internal reporting
- Screenshot-to-PDF for visual logs

### 6C — 📈 Dashboards & Visual Analytics
- KPI graphs
- Historical trends
- Forecasting estimates (AI-powered later)
- Multi-location summaries

### 6D — 📝 Sales Call Assistant
- Structured note-taking workflow
- “Suggested questions” powered by AI
- Product recommendation logic
- Summary generation + export
- Sentiment keywords (optional)

### 6E — 🗳️ Feedback Tracker (Voting Board)
- Users can submit bugs or ideas
- Voting system for prioritization
- Basic moderation UI

---

## 🏗️ Phase 7 — Supabase Self-Hosted Migration Path
- Dockerized Supabase install
- Backup & restore workflows
- JWT secret rotation
- Logging + monitoring
- Performance tuning and scaling guide

---

## 🏢 Phase 8 — Enterprise Features
- Multi-location support
- Role-based access control (RBAC)
- Audit logs for compliance
- SSO (Google Workspace / Azure AD / Okta)
- Custom branding options

---

## ♾️ Continuing Goals (Always Active)
- Security guardrails enforced everywhere
- Performance tuning as modules grow
- Code clarity and maintainability
- AI ethics + guardrails
