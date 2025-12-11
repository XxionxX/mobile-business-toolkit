# 🔄 Mobile Business Toolkit — Offline Sync Design  
*A structured approach to local-first operation with secure, conflict-safe syncing.*

The Mobile Business Toolkit should feel responsive and usable even with unreliable Wi-Fi or mobile data.  
This document defines how offline data is stored, validated, synchronized, and protected.

---

# 🌐 1. Goals of Offline-First Design

The offline system must provide:

### ✔ **Instant local interaction**
- Calculations run instantly.
- Inputs persist even without network access.

### ✔ **Safe persistence**
No data loss when:
- the app closes
- the OS kills the session
- the user temporarily loses connectivity

### ✔ **Secure local storage**
Sensitive items are **never** stored in plaintext.

### ✔ **Graceful sync to Supabase (or future backend)**
- Idempotent operations  
- Conflict-aware merges  
- Clear error reporting  

---

# 📦 2. Local Storage Layers

We use a two-layer storage model:

---

## **Layer A — SecureStore (sensitive data)**  
Stores:
- auth tokens  
- refresh tokens  
- last successful sync timestamp  
- any data tied to identity / permissions  

Properties:
- encrypted  
- OS-level isolation  
- not queryable  
- small key/value pairs only  

---

## **Layer B — AsyncStorage (non-sensitive cached calculations)**  
Stores:
- last used payroll input fields  
- UI state (dark mode, preferences)  
- temporary offline drafts  
- calculator configurations  

Properties:
- NOT for sensitive or proprietary data  
- easy to migrate to SQLite later  
- replaceable without UX disruption  

---

# 🔐 3. What MUST NOT Be Cached Offline

To prevent data exposure if a device is lost:

🚫 Company performance data  
🚫 KPI logs  
🚫 Manager notes  
🚫 Forecasts  
🚫 Historical wage or payroll exports  
🚫 Business proprietary algorithms  

These must always stay server-side.

---

# 🏗️ 4. Data Sync Architecture

Below is the high-level structure for how syncing works once Supabase is added.

React Native UI
      ↓
Local cache (AsyncStorage)
      ↓
Sync Engine (deterministic logic)
      ↓
Supabase REST/RPC calls
      ↓
Row Level Security policies
      ↓
Postgres tables

---

# 🔁 5. Sync Engine Responsibilities

The Sync Engine (later `/lib/sync-engine.ts`) handles:

### ✔ **Queueing offline operations**
Every local change is stored as a small object:


{
  "id": "uuid",
  "type": "UPDATE_PAYROLL_SETTINGS",
  "timestamp": 171234567,
  "payload": { ... }
}

### ✔ **Debouncing sync attempts**
Sync only runs when:
- the user opens the app  
- the user submits certain actions  
- connectivity becomes available  

### ✔ **Applying operations idempotently**
Running the sync multiple times should NOT create duplicates.

### ✔ **Conflict resolution**
Rules:
1. **Server wins when data is authoritative**  
   (e.g., manager role, configuration tables)

2. **Client wins for user-local settings**  
   (e.g., UI preferences)

3. **Timestamp-based resolution**  
   If equal authority → newest record wins.

### ✔ **Error recovery**
If a sync step fails:
- queue entry remains  
- retry on next connectivity  
- optional retry backoff (1s → 5s → 30s → 5min)

---

# 📡 6. Detecting Connectivity

Use Expo’s built-in hook:

import * as Network from "expo-network";

const state = await Network.getNetworkStateAsync();
state.isConnected;

Offline mode UI changes:
- fade out "submit to server"
- show a small "offline" indicator (later UX polish)
- allow local-only usage for non-sensitive features

---

# 🧪 7. Testing Offline Behavior

Unit tests using **Jest**:

- ensure no sensitive fields enter AsyncStorage  
- ensure math logic does not depend on network  
- test sync-engine priority rules  
- test duplicate sync prevention  

E2E tests using **Detox**:

- simulate airplane mode  
- modify calculator values  
- restore connectivity  
- check if server received correct updates  

---

# 🧰 8. Future Upgrade Path (SQLite)

If we need:
- more complex caching  
- multi-record drafts  
- offline KPI browsing  

We will transition to:

**Expo SQLite + SQLCipher**  
Encrypted and schema-based.

Migration plan:
1. Detect existing AsyncStorage keys  
2. Convert to SQLite rows  
3. Clear old storage  
4. Continue using SQLCipher  

This is optional and only needed for advanced features.

---

# 🔐 9. Security Considerations

### ✔ Keep sensitive data OUT of AsyncStorage  
AsyncStorage ≠ secure.

### ✔ All sync operations must pass auth + RLS  
Never allow client-chosen user_id.

### ✔ Supabase tables MUST have RLS enabled  
Every row restricted by:

user_id = auth.uid()

### ✔ Never sync data meant only for local calculations  
(Intellectual property risk)

---

# 📄 10. Summary

| Layer | Technology | Purpose | Security |
|------|------------|---------|----------|
| A | SecureStore | Tokens, identity | 🔐 Encrypted |
| B | AsyncStorage | UI + calculator drafts | ⚠ Not secure |
| C (future) | SQLite + SQLCipher | Offline datasets | 🔐 Encrypted |
| Cloud | Supabase | True source of business data | 🛡️ RLS-protected |
