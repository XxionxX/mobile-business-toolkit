# 🏛️ Architecture Overview — Mobile Business Toolkit

A modular, layered architecture designed for growth, reliability, and security.

---

## 🧱 Layers Overview

### 1. **UI Layer**
- Screens, layouts, components
- Navigation via Expo Router
- Theming and accessibility

### 2. **Logic Layer**
- Pure functions (formatting, math, validation)
- Calculator modules independent of UI

### 3. **Data Layer**
- AsyncStorage (non-sensitive)
- SecureStore (sensitive)
- Supabase (remote synced data)
- SQLite (offline sync cache)

### 4. **Offline Sync Layer (Future)**
- Encrypted SQLite cache
- Background syncing system
- Merge/conflict resolution strategy

### 5. **AI Layer (Future)**
- OCR processing
- Suggestion models
- Summarization
- Input correction

---

## 📁 Folder Structure

app/
  _layout.tsx
  index.tsx
  calculators/
    payroll/
      index.tsx
      logic.ts

components/
lib/
assets/
docs/
tests/
scripts/

---

## 🔐 Security Architecture Summary
- Sensitive → SecureStore
- Remote DB → Supabase with RLS
- Local cache → SQLite (encrypted)
- Network → HTTPS, short-lived tokens

---

## 🔄 Offline Sync (Planned)
1. User enters data offline  
2. Stored in encrypted SQLite  
3. Enqueued into a "pending ops" table  
4. Background worker syncs when online  
5. Conflict rules applied (server-wins or merge)  

Offline is *first-class*, not an afterthought.
