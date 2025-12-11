# 🔐 Security Policy — Mobile Business Toolkit

Security is a core pillar of this project.  
All modules, code, and future features must follow these rules.

---

## ⚠️ Reporting Vulnerabilities
Do NOT open GitHub issues for security concerns.  
Please contact maintainers directly and privately.

---

## 🗄️ Storage Security Rules

### Sensitive data (tokens, user identifiers, location IDs)
- ❌ Not allowed in AsyncStorage
- ✔️ Must use SecureStore
- ✔️ Allowed in encrypted SQLite (future)

### Non-sensitive cached data (UI state, last screen, formatting)
- ✔️ AsyncStorage is acceptable

### Role-Level Security (backend)
- All tables in Supabase require RLS ON
- Each row must be scoped to a user or location_id
- Service role keys must NEVER be shipped in the client

---

## 🌐 Network Security
- HTTPS enforced at all times
- No hardcoded API keys
- Token rotation & refresh flows recommended
- Logging must scrub sensitive data

---

## 👤 Authentication Rules
- No storing credentials locally
- SecureStore only for refresh/session tokens
- Optional biometric unlock (future)
- Mandatory logout on token expiration

---

## 🧪 Secure Development Practices
- All PRs undergo security checks
- Linting for potential unsafe patterns
- Secrets scanning in CI pipeline
- Regular dependency audit (npm audit)
