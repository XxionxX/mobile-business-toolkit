# 🔐 Data Classification & Sensitivity Model

This document defines **what types of data the Mobile Business Toolkit handles**, their **security requirements**, and **how they must be stored, transmitted, and protected**.

Understanding data categories is essential before implementing authentication, RLS, offline sync, or multi-device access.

---

# 🎯 Goals of This Classification System

- Establish clear rules for **where** and **how** data may be stored  
- Ensure **no sensitive data is ever stored in AsyncStorage**  
- Provide a roadmap for secure scaling (MVP → Enterprise)  
- Guide future features such as analytics, AI modules, offline sync, and uploads

---

# 🏷️ Data Categories

We divide all app data into **four sensitivity levels**.

---

## 🟩 Level 1: Public or Non-Sensitive Data

Examples:
- App UI content  
- Static calculator definitions  
- Non-user-specific formulas  
- Documentation or tooltips  
- Public release notes  

Allowed storage:
- AsyncStorage  
- Supabase public tables  
- CDN-delivered assets  

Security:
- No special protections required  

Used for:
- Lightweight UI personalization  
- Formula updates  
- General configuration  

---

## 🟨 Level 2: Internal Operational Data (Low Sensitivity)

Examples:
- Calculator input values (non-identifying)  
- Local, temporary UI state  
- Non-identifying analytic metadata  
- Offline cache of non-sensitive screens  

Allowed storage:
- AsyncStorage (safe for non-sensitive local state)
- SQLite (unencrypted OK for Level 2)
- Supabase tables with RLS ON  

Restrictions:
- Cannot include user emails, JWTs, tokens, passwords, or financial identifiers  

Used for:
- Improving UX  
- Persisting calculator fields  
- Light telemetry  

---

## 🟧 Level 3: User-Associated Sensitive Data

Examples:
- Calculator history records  
- User notes (non-confidential)  
- Sales call summaries (if they do not contain protected info)
- Uploaded images (non-confidential)  
- Company-specific settings  

Allowed storage:
- Supabase tables with RLS  
- Supabase Storage with private bucket & signed URLs  
- SQLite (but encrypted recommended)

NOT allowed:
- AsyncStorage (unless encrypted)

Encryption rules:
- **Store only encrypted identifiers locally**  
- **Never store raw user data unencrypted on device**  

---

## 🟥 Level 4: High-Sensitivity / Confidential Business Data

Examples:
- JWT tokens  
- API keys  
- User authentication tokens  
- Sales forecasts  
- Employee-hour data  
- Company-specific performance metrics  
- AI-generated sales notes (contains proprietary business logic)  

Allowed storage:
- `expo-secure-store` (encrypted keychain)  
- Supabase encrypted or RLS-protected tables  
- Encrypted offline queue (future module)

NOT allowed:
- AsyncStorage  
- Logs / debugging output  
- Any unencrypted on-device file  

Rules:
- Must use HTTPS/TLS  
- Must never appear in crash reports  
- Must never be included in the AI prompt log without escaping/sanitizing  

---

# 🧩 Classification Overview Table

+---------------------------+----------------------+-----------------------------+
| Data Type                 | Sensitivity Level    | Allowed Storage             |
+---------------------------+----------------------+-----------------------------+
| UI config                 | Level 1 (Public)     | AsyncStorage, CDN           |
| Calculator formulas       | Level 1              | Local or remote             |
| Temporary inputs          | Level 2              | AsyncStorage, SQLite        |
| Calculator history        | Level 3              | Supabase (RLS), encrypted   |
| Sales call notes          | Level 3-4            | Supabase (RLS), encrypted   |
| Business KPIs             | Level 4              | SecureStore, Supabase       |
| JWT tokens                | Level 4              | SecureStore ONLY            |
| API keys                  | Level 4              | SecureStore ONLY            |
+---------------------------+----------------------+-----------------------------+

---

# 🔒 Special Notes on Storage Technologies

### **AsyncStorage**
❌ Never store:
- tokens  
- emails  
- sensitive business data  

✅ Safe for:
- UI state  
- temporary text fields  
- non-sensitive cache  

---

### **SecureStore**
Use for:
- JWT tokens  
- user identifiers  
- refresh tokens  
- encrypted offline sync keys  

---

### **Supabase Tables**
- Enable **Row Level Security (RLS)** on *every* table except public metadata  
- Use **policies that restrict access to `auth.uid()`**  
- Use **Edge functions** for sensitive write operations  

---

### **Supabase Storage**
- Private buckets  
- Signed URLs for temporary access  
- Never expose keys client-side  

---

### **Offline Data**
MVP:
- Only allow non-sensitive data offline

Future:
- Encrypted offline queue  
- SQLite + SQLCipher for secure caching  
- Conflict resolution layer  
