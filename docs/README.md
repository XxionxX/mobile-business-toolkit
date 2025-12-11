# 📚 Documentation Index  
*Mobile Business Toolkit — Developer Docs*

Welcome to the **official documentation hub** for the Mobile Business Toolkit.  
This directory contains all technical, architectural, security, and planning documents used to build and maintain the framework.

Use this index to quickly navigate the available documents.

---

## 🏛 Architecture & System Design

- **[ARCHITECTURE.md](ARCHITECTURE.md)**  
  High-level overview of the system’s purpose, layers, and guiding philosophy.

- **[architecture-diagram.md](architecture-diagram.md)**  
  ASCII diagram of the app’s major components and data flows.

- **[auth-flow-diagram.md](auth-flow-diagram.md)**  
  Diagrams for authentication flows, including managed Supabase and future self-hosted architecture.

- **[database-schema.md](database-schema.md)**  
  Current and planned data models, including users, roles, calculators, and sync tables.

- **[data-classification.md](data-classification.md)**  
  Rules for how data is categorized, protected, and handled in both local and cloud contexts.

- **[offline-sync-design.md](offline-sync-design.md)**  
  Strategy for offline-first capabilities, conflict resolution, and secure local storage.

---

## 🔐 Security & Compliance

- **[SECURITY.md](SECURITY.md)**  
  Global security policy, threat model, and expectations for contributors.

- **[security-checklist.md](security-checklist.md)**  
  Practical checklist for secure development, covering storage, auth, network, and error handling.

---

## 🧭 Roadmap & Development Planning

- **[ROADMAP.md](ROADMAP.md)**  
  Version milestones, roadmap phases, and major feature goals.

- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)**  
  Guide to the repository’s file layout and best practices for organizing modules.

- **[PRINCIPLES.md](PRINCIPLES.md)**  
  Architectural rules and standards all modules must follow.

---

## 🧱 Modules & Implementation Guides

- **[calculator-module-template.md](calculator-module-template.md)**  
  Standard template for building new calculator modules (UI, logic, storage, validation).

- **[installing-supabase.md](installing-supabase.md)**  
  Instructions for connecting the project to Supabase, including dev → production workflow.

---

## 🤝 Contribution, Issues & PR Workflow

- **[CONTRIBUTING.md](CONTRIBUTING.md)**  
  Contributor guidelines, branching strategy, commit format, and review process.

- **[PULL_REQUEST_TEMPLATE.md](PULL_REQUEST_TEMPLATE.md)**  
  Default template for PR quality and safety.

- **[BUG_REPORT.md](BUG_REPORT.md)**  
  Template for issue reporting and replication steps.

- **[FEATURE_REQUEST.md](FEATURE_REQUEST.md)**  
  Template for proposing and reviewing new features.

---

## 🗂 How to Use This Folder

- All new documentation should be placed inside this `docs/` directory.  
- Filenames should use **kebab-case** for consistency:  
  `example-file-name.md`
- Diagrams should be ASCII-only so they remain readable in raw text.
