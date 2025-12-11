# 🧹 Documentation Quality Checklist
*A consistent standard for every document in the Mobile Business Toolkit.*

This checklist ensures every document meets our standards for clarity, structure, security, and technical accuracy.

---

## ✔️ 1. Structure & Formatting

- [ ] Title with a purpose statement
- [ ] Correct heading hierarchy (#, ##, ###)
- [ ] Consistent bullet and spacing style
- [ ] All code examples inside fenced blocks
- [ ] No broken or prematurely closed code fences
- [ ] Icons included where appropriate
- [ ] File renders cleanly on GitHub
- [ ] Document ends cleanly with no trailing formatting glitches

---

## 📄 2. Technical Accuracy

- [ ] Matches current architecture and logic
- [ ] All file paths are accurate
- [ ] Behavior descriptions reflect actual implementation
- [ ] Schema references match `/docs/database-schema.md`
- [ ] Auth logic matches `/docs/auth-flow-diagram.md`
- [ ] No outdated or deprecated references

---

## 🔐 3. Security Alignment

- [ ] No secrets, API keys, tokens in docs
- [ ] Mentions correct storage locations:
  - Expo SecureStore → tokens, credentials, secrets
  - SQLite (optional crypto) → sync queue + transient cache only
- [ ] No mention of AsyncStorage for sensitive values
- [ ] Documentation aligns with RLS expectations on backend

---

## 🧱 4. Architecture Consistency

- [ ] Terminology matches architecture docs
- [ ] Components (sync, queueing, auth, storage) described consistently
- [ ] Cross-document references added where needed
- [ ] Matches planned behaviors in `ROADMAP.md`
- [ ] Matches project structure boundaries

---

## 🧪 5. Clarity & Examples

- [ ] Complex processes have examples
- [ ] Input/output examples included where helpful
- [ ] ASCII diagrams added when appropriate
- [ ] No unnecessary duplicate explanations

---

## 📚 6. Cross-Document Integrity

- [ ] ROADMAP.md updated if new features appear
- [ ] CHANGELOG.md updated
- [ ] SIDEBAR.md updated with new files
- [ ] Architecture/schema docs updated when needed
- [ ] DOCS_VERSIONING.md updated if versioning rules changed

---

## 🧑‍🤝‍🧑 7. Contributor Friendliness

- [ ] Explains *why*, not only *how*
- [ ] Defines domain-specific terms
- [ ] Links to deeper references
- [ ] Modular and easy to update

---

## 🏁 Final Gate Before Merge

- [ ] Spell-check complete
- [ ] No TODO markers left in file
- [ ] All diagrams render correctly
- [ ] No malformed backticks
- [ ] Tone consistent with other docs
- [ ] Passed all checklist items

---

## ✔️ PR Certification Snippet

Add this to your PR before approval:

Documentation Checklist Completed
--------------------------------
[x] Structure & formatting
[x] Technical accuracy
[x] Security alignment
[x] Architecture consistency
[x] Examples included
[x] Cross-doc updates completed
[x] Contributor-friendly
[x] Final gate checks passed

---

## ⭐ Why This Matters

This checklist ensures:

- Documentation never drifts from code  
- Security practices stay consistent  
- New contributors can onboard quickly  
- The project maintains professional-grade polish  
- Your portfolio shows strong engineering discipline  
