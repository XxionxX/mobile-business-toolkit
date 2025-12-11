# 🏗️ Architecture Overview

This document describes the high-level system architecture for the Mobile Business Toolkit.  
It outlines how the mobile app interacts with authentication, backend services, and optional offline sync capabilities.

---

## 📦 Core Components

### **1. Mobile Client (Expo + React Native)**
- UI screens and calculator modules  
- Routing with `expo-router`  
- Secure token storage via `expo-secure-store`  
- Optional encrypted offline cache (SQLite)  

### **2. Authentication Provider**
*(Planned: Clerk or Supabase Auth)*  
- User login, signup, MFA  
- Issues JWTs  
- Protects routes and secure actions  

### **3. Backend**
*(Supabase Managed → Self-Hosted roadmap)*  
- PostgreSQL database  
- Row-Level Security (RLS)  
- Edge Functions  
- Realtime subscriptions  
- File storage buckets  

### **4. Offline Sync Engine (Future Feature)**
- Write queue  
- Conflict resolution  
- Background synchronization  
- Encryption at rest  

---

## 🧭 High-Level Flow

1. App launches  
2. SecureStore checks for existing auth session  
3. If offline → load cached data  
4. If online → authenticate with provider  
5. User interacts with calculators  
6. Data stored locally and/or synced  
7. Server validates and stores securely  
8. UI updates with latest synced results  

---

## 🖼️ Architecture Diagram (ASCII)

┌───────────────────────────┐
│       Mobile App          │
│   (Expo + React Native)   │
│───────────────────────────│
│ UI Screens                │
│ Calculators               │
│ SecureStore (Tokens)      │
│ SQLite (Offline Cache)    │
└──────────────┬────────────┘
               │
     Auth Token / API Calls
               │
┌──────────────▼────────────┐
│     Authentication Layer   │
│ (Clerk / Supabase Auth)    │
│────────────────────────────│
│ Issues JWTs                │
│ Session Management         │
│ Protected Routes           │
└──────────────┬────────────┘
               │
               │ Verified JWT
               │
┌──────────────▼────────────┐
│      Supabase Backend      │
│────────────────────────────│
│ PostgreSQL Database        │
│ RLS Security Policies      │
│ Edge Functions             │
│ File / Storage Buckets     │
└──────────────┬────────────┘
               │
      Sync + Validation Layer
               │
┌──────────────▼─────────────┐
│    Offline Sync Engine      │
│          (Future)           │
│─────────────────────────────│
│ Local Queue                 │
│ Conflict Resolution         │
│ Background Sync             │
└─────────────────────────────┘
