# 🔐 Mobile Business Toolkit — Security Checklist  
*A living document to ensure strong security practices across all features.*

Security is not a one-time task — it evolves with the product.  
Every time we add persistence, networking, or authentication, **review this checklist**.

---

# 🛡️ 1. Authentication & Authorization

### ✔ Use a managed auth provider  
Recommended: **Clerk** or **Supabase Auth**

- Avoid writing your own password system.
- Never store raw passwords.
- Never use symmetric secrets inside the client.

### ✔ Enforce role-based access
Examples:
- employee
- manager
- district/regional manager
- admin/IT

### ✔ Use short-lived access tokens  
- Access tokens expire quickly.  
- Refresh tokens stored securely (SecureStore).

---

# 🔒 2. Client-Side Secure Storage

### ✔ Use `expo-secure-store` for:
- auth tokens  
- refresh tokens  
- login state  
- any sensitive configuration  

### ❌ Never store these in AsyncStorage:
- passwords  
- tokens  
- API keys  
- personal data  

### ✔ AsyncStorage is allowed for:
- UI preferences  
- non-sensitive cached calculator inputs  
- offline drafts that contain *no proprietary business logic*  

---

# 🌐 3. API & Networking Security

### ✔ Use HTTPS always  
No exceptions.

### ✔ Never hardcode secrets  
Use:
- environment variables  
- secure vaults (later phase)  

### ✔ Validate all server responses  
Even trusted endpoints can fail.

### ✔ Rate-limit sensitive endpoints  
Auth-related endpoints are high-risk.

---

# 🔏 4. Database Security (Supabase / PocketBase)

### ✔ Row-Level Security (RLS) must be ON  
Supabase defaults to safe mode with RLS—keep it that way.

### ✔ Define policies BEFORE enabling any write access  
Example:
- User can only access records tied to their org/store.
- Managers can access their direct reports.
- Corporate admins have full access.

### ✔ Encrypt backups  
Especially if deployed on your own VPS.

---

# 🔍 5. Input Validation & Sanitization

### ✔ Validate *every user input*  
Checklist:
- no empty required fields  
- no malformed percent/currency values  
- enforce numeric conversions  
- warn on divide-by-zero  
- sanitize clipboard output  

### ✔ Perform validation in `logic.ts`, not UI  
Keeps logic testable and consistent.

---

# 📦 6. Offline Storage & Sync Safety

### ✔ If using local SQLite or AsyncStorage:
- ensure no sensitive data is cached  
- ensure corrupted or partial syncs cannot overwrite server data  
- avoid storing business KPIs or proprietary calculations locally  

### ✔ Sync logic must be idempotent  
Multiple sync attempts should not duplicate or corrupt data.

---

# 🧪 7. Testing & QA

### ✔ Add unit tests for logic  
Tools:
- **Jest**

Test types:
- input validation  
- output math correctness  
- edge cases (0, null, divide-by-zero, extreme values)

### ✔ Add end-to-end tests (later phase)  
Tools:
- **Detox** for React Native apps

Test flows:
- login → calculation → save → copy → logout  

### ✔ Add pre-commit hooks  
Tools:
- Husky  
- Lint-staged  
- Prettier  

They prevent:
- committing secrets  
- committing syntax errors  
- inconsistent formatting  

---

# 🧰 8. Build & Deployment Security

### ✔ Use `.gitignore` to block:
- node_modules  
- generated build files  
- environment secrets  
- system files  

### ✔ Never commit `.env` or API keys  
Use `.env.example` instead.

### ✔ For production builds:
- enable minification  
- avoid verbose logging  
- strip console logs (except errors)  

---

# 📝 9. Security Red Flags During Development

🚫 Storing tokens in AsyncStorage  
🚫 Logging passwords or tokens in console  
🚫 Pasting API keys into GitHub  
🚫 Writing custom cryptography  
🚫 Disabling SSL certificate validation  
🚫 Wide-open Supabase policies (like `ALLOW ALL`)  

If a feature introduces any of these risks, STOP and ask:  
**“Is there a secure pattern we can follow instead?”**

---

# 🧭 10. Quick Security Review Procedure

Before merging new features, confirm:

| Question | Yes / No |
|---------|-----------|
| Does this feature store any sensitive data? | |
| If so, is it stored using SecureStore? | |
| Does it communicate with an API? If yes, is auth required? | |
| Are UI inputs validated in logic.ts? | |
| Are Supabase policies enforced for this table? | |
| Does this feature expose any business intelligence data? | |
| Could a competitor misuse this feature if not secured? | |
| Has this change introduced any dependencies that need reviewing? | |

---

# 🛡️ Final Note  
Security grows with the product — treat this checklist as a **living document**.  
Update it whenever new risks or systems are added.
