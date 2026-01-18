# 📱 Mobile Business Toolkit
*A modular React Native framework for business analytics, KPI tracking, staffing, and operational decision support.*

---

## ⭐ Overview

**Mobile Business Toolkit** is a React Native / Expo framework designed to help managers and business operators make informed decisions quickly from any mobile device.

It provides:

- **modular calculators**
- **payroll & staffing estimators**
- **revenue and hourly forecasting**
- **KPI and profitability insights**
- **offline-first data entry and persistence**
- **copyable results for field or store reporting**

The goal is to build a **lightweight operational decision system** that can be extended over time with new business modules while preserving clean architecture and reusable UI components.

This project demonstrates **mobile engineering, product thinking, business logic design, and framework architecture** in a single repo.

---

## 🎯 Problem the Toolkit Solves

Many operational and mid-market businesses rely on manual spreadsheets or back-office systems to:

- estimate staffing needs
- control payroll percentages
- forecast sales vs hours
- plan weekly labor
- compare shifts or departments
- understand profitability per labor hour

Most of these tools are:

- **not mobile-friendly**
- **not available on-site**
- **not usable by field-level or store-level employees**
- **not designed for quick decision-making**

**Mobile Business Toolkit** solves this by bringing operational math into a mobile-native interface that anyone can use quickly — at a store, on a job site, inside a warehouse, or during scheduling.

---

## 🧩 Architecture & Philosophy

The framework is designed to be:

- **modular** — each calculator lives in its own folder
- **extensible** — adding a new business module requires minimal boilerplate
- **UI + logic separated** — business math lives outside screen components
- **offline-capable** — persistence via AsyncStorage (non-sensitive data only) and SecureStore for secrets/tokens
- **reusable** — shared UI patterns, formatting utilities, and validation

### Directory Structure (simplified)

    mobile-business-toolkit/
    │
    ├── app/
    │   ├── _layout.tsx
    │   ├── index.tsx
    │   └── calculators/
    │       └── payroll/
    │           ├── index.tsx        # UI screen
    │           └── logic.ts         # business math, persistence, formatting
    │
    ├── components/
    │   └── (removed legacy NumericInput)
    │
    ├── lib/
    │   └── formatting.ts
    │
    ├── assets/
    ├── .gitignore
    ├── app.json
    ├── package.json
    └── README.md

Each calculator is **self-contained and expandable**, making it easy to extend this toolkit with new operational modules as needed.

---

## ✨ Current Features

- Payroll calculator
- Automated formatting:
  - **currency**
  - **percentage**
  - **labor hours**
- Persistent user inputs (device offline)
- Input validation and warning messages
- Safe division logic
- Copy-to-clipboard for reporting
- Clean, reusable UI elements

---

## 🚧 Roadmap

### 🔢 Business Calculators & Analytics

- Revenue forecasting
- Profit per labor hour
- Overtime risk assessment
- Staffing optimization
- KPI tracking over time
- Inventory costing and shrink
- Field job costing
- Multi-team and multi-location rollups
- Scheduling efficiency calculators
- Budgeting and labor allocation planning
- Seasonal trend or moving average forecasting

### 🧩 Framework Enhancements

- Reusable calculator definition pattern
- Automated formatting & validation library
- Shared UI design system
- Architecture documentation
- Screenshot gallery for README
- Export (CSV, PDF, or clipboard-rich formats)
- Test coverage for math logic
- Version tagging and release notes
- CI through GitHub Actions
- Optional KPI charts

---

## 🚀 Tech Stack

- **React Native**
- **Expo**
- **TypeScript**
- **expo-router**
- **AsyncStorage**
- **React Hooks**

Planned improvements:

- **Jest unit testing**
- **CI pipelines**

---

## 🛠 Local Development

    git clone https://github.com/USERNAME/mobile-business-toolkit.git
    cd mobile-business-toolkit
    npm install
    npx expo start

Preview using the **Expo Go** mobile app.

---

## 🔐 Security Notes (important)

- **Do not store tokens or passwords in AsyncStorage.**
- Store sensitive items (auth tokens, secrets) using **expo-secure-store**.
- Offline/sync designs are documented in `/docs` and should be implemented with encryption and least-privilege access controls.

See:
- `/docs/SECURITY.md`
- `/docs/security-checklist.md`
- `/docs/data-classification.md`

---

## 📸 Screenshots (coming soon)

UI images, component cards, and calculator usage flows will be added as the design stabilizes.

---

## 🔬 Test Focus (planned)

- Business math validation
- Percentage formatting
- Currency formatting
- User input handling
- Edge case handling (division by zero)
- Persisted storage behavior

Tests will run independently of UI.

---

## 🧭 Contribution Pattern (future)

- UI and business logic remain separate
- Formatting utilities are reused
- Mathematical assumptions documented inside logic files
- Each calculator isolated as a module
- New modules added using a shared template

---

## 📅 Release Notes (future)

Release artifacts may include:

- APK downloads
- Screenshots
- Feature summaries
- Performance notes
- Tagged versions

---

## 🙏 Credits

Maintainer: **placeholder-name**  
Contact: **placeholder@email.com**

---

## 📜 License

This project is licensed under the **Apache License 2.0**.

You may use, modify, and distribute this software for commercial or internal purposes. However, patent rights associated with this work are also licensed, and patent trolling or litigation against the author is prohibited.

See the full license in the `LICENSE` file.
