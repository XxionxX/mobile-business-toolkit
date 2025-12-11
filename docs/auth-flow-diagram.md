# 🔐 Authentication Flow

This document outlines the end-to-end authentication flow for the Mobile Business Toolkit.  
It applies whether we use **Clerk** or **Supabase Auth**, since both follow a similar JWT-based model.

---

## 🧭 Overview

The authentication system ensures:

- Strong identity management  
- Secure token handling  
- Support for online & offline behavior  
- A clean separation of responsibilities between app, auth provider, and backend  

This allows all calculators and business modules to operate securely even as features scale.

---

## 🚶Step-by-Step Auth Flow

1. **App Launches**
   - Checks SecureStore for an existing refresh/session token.
   - If present → attempt silent login.
   - If not present → route to login screen.

2. **User Logs In**
   - User enters email/password (or OTP, magic link, etc.).
   - Auth provider validates credentials.

3. **Tokens Issued**
   - Provider returns:
     - Access Token (short-lived JWT)
     - Refresh Token (long-lived, stored securely)
   - Access token stored only in memory.
   - Refresh token stored in `expo-secure-store`.

4. **Backend Access**
   - App sends API/db requests with the access token.
   - Supabase validates token signature & RLS policies.

5. **Token Refresh Cycle**
   - When the access token expires:
     - App uses the refresh token (from SecureStore)
     - Requests a new access token automatically

6. **Logout**
   - SecureStore token is deleted.
   - User context reset.
   - Redirect to login.

7. **Offline Behavior (Future)**
   - If offline:
     - App uses cached local data
     - Writes queued locally (encrypted)
   - Once online:
     - Tokens refreshed
     - Sync process begins

---

## 🖼️ Authentication Flow Diagram (ASCII)

┌─────────────────────────────┐
│         App Launch          │
└──────────────┬──────────────┘
               │
     Check SecureStore for
       Existing Session
               │
      ┌────────┴───────────┐
      │                    │
   No Token             Token Found
      │                    │
      ▼                    ▼
 Login Screen        Attempt Silent Login
      │                    │
      ▼                    ▼
User Enters Creds     Refresh Session
      │                    │
      ▼                    ▼
┌───────────────┴────────────────┐
│      Auth Provider Validates    │
│     (Clerk / Supabase Auth)     │
└───────────────┬────────────────┘
                │ Issues Tokens
                ▼
     ┌─────────────────────────┐
     │  Access Token (JWT)     │
     │  Refresh Token (Secure) │
     └───────────┬─────────────┘
                 │
                 ▼
     ┌─────────────────────────┐
     │   App Makes Requests    │
     │ Access Token in Header  │
     └───────────┬─────────────┘
                 │
                 ▼
     ┌─────────────────────────┐
     │ Supabase Backend        │
     │ Validates JWT + RLS     │
     └───────────┬─────────────┘
                 │
       ┌─────────┴───────────┐
       │                     │
Token Expired        Request OK
       │                     │
       ▼                     ▼
Use Refresh Token        Return Data
       │
       ▼
Get New Access Token
       │
       ▼
 Continue Workflow

