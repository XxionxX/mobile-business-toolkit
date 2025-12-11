# 📘 Documentation Versioning Guide  
*How the Mobile Business Toolkit manages and tracks changes across its documentation suite.*

---

## 📌 Purpose

As the Mobile Business Toolkit grows into a full-featured framework (calculators, offline sync, auth, Supabase, UI kit, etc.), the documentation must remain **synchronized with code changes**, **easy to audit**, and **safe to update**.

This guide explains:

- How docs relate to software versions  
- How updates should be tracked  
- How to prevent documentation drift  
- How contributors (including Future You™) should maintain consistency  

---

## 🧭 Versioning Principles

### 1. **Docs follow semantic versioning**
Documentation always tracks the **software version**:

- **MAJOR** changes → Rewrite or restructure docs  
- **MINOR** updates → Add or modify sections  
- **PATCH** updates → Typos, clarifications, cleanup  

Example:

| Software Version | Docs Version Meaning |
|------------------|----------------------|
| `1.0.0` | First complete docs set |
| `1.1.0` | New module added → update relevant docs |
| `1.1.1` | Fix formatting, clarify instructions |
| `2.0.0` | Major architecture shift → large doc rewrite |

---

### 2. **Every docs edit must reference a release or PR**
This prevents lost context.

A proper commit message looks like:

docs: update offline-sync section for v0.3.0 queueing logic

A proper PR title looks like:

Docs Update: Refactor security-checklist for new auth model

---

### 3. **ROADMAP updates trigger docs updates**
Whenever ROADMAP changes, the docs must reflect the new planned direction.

---

### 4. **Docs live in `/docs` and mirror the architecture**
Each document has a specific purpose.  
If a file doesn't clearly match a location — it doesn't belong.

---

## 🗂 Documentation Release Workflow

### Step 1 — Update code  
Implement new feature / fix.

### Step 2 — Update or create docs  
Modify:

- relevant module doc  
- architecture doc  
- API or schema docs (if applicable)  
- security notes (if applicable)

### Step 3 — Update CHANGELOG  
Always.

### Step 4 — Tag the release  

```
gh release create v0.X.X --notes "Docs updated for new feature"
```

### Step 5 — Verify with Docs Checklist  

```
[ ] ROADMAP updated  
[ ] Architecture docs reflect new component  
[ ] Security docs checked  
[ ] Offline-sync or queueing updated (if applicable)  
[ ] Module templates still valid  
[ ] All new files added to SIDEBAR.md  
```

---

## 📚 Documentation Folder Rules

### `/docs` contains only:

- architecture  
- auth  
- database design  
- templates  
- roadmap  
- security  
- installation  
- offline sync  
- contributing & templates  
- versioning (this file)  

### Files that do *not* belong here:

- source code  
- assets for the React app  
- marketing copy  
- user-manuals for non-developers (go in `/docs/user-guides`)  

---

## 🧱 Branching Strategy for Docs

### 📌 Option A — Keep it simple (recommended)
Everything happens on `main`, but every doc edit must be part of a pull request.

### 📌 Option B — Use `docs/*` branches
Example:

- `docs/auth-overhaul`
- `docs/v0.3.0-offline-rewrite`

This is cleaner for large updates.

---

## 🔖 Tagging Documentation Releases

When documentation is significantly updated without code:

v0.1.0-docs.1
v0.1.0-docs.2
v0.1.1-docs.1

This signals:

- The code has not changed
- The docs have improved

---

## 🧩 Future Enhancements

- **Auto-generate docs site** with Docusaurus or MkDocs Material  
- **Versioned docs site** (multiple versions preserved)  
- **Continuous docs validation** ensuring links don’t break  
- **Automated diagrams** via Mermaid CI  
