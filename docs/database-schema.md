# 📊 Database Schema (Initial Draft)

This document defines the **starting database schema** for the Mobile Business Toolkit when using **Supabase**.  
It is designed to support:

- Authentication  
- Calculator history  
- User settings  
- Future modules (sales logging, AI notes, visual data input, etc.)  
- Multi-tenant business usage  
- Enterprise-ready RLS policies  

This schema will expand as the app evolves, but this is a strong, secure, scalable baseline.

---

# 🧱 Core Tables

Below are the core tables the application will use early on.

---

## 1. `profiles`  
Stores basic user information and links Supabase Auth → app users.

Table: profiles
------------------------------------------------------------
id              uuid (PK, matches auth.users.id)
full_name       text
created_at      timestamp (default now())
updated_at      timestamp
role            text  (default 'user')  -- 'admin' later
company_id      uuid  -- optional, for teams / stores
------------------------------------------------------------
RLS:
  - Users can select/update only their own profile
  - Admins can access company-level user data (future)

---

## 2. `calculator_history`  
Stores past calculations for analytics, history, or basic reporting.

Table: calculator_history
------------------------------------------------------------
id              bigint (PK)
user_id         uuid (FK → profiles.id)
calculator_type text        -- "payroll", etc.
input_data      jsonb       -- sales, percent, etc.
output_data     jsonb       -- payroll dollars, hours, etc.
created_at      timestamp   default now()
------------------------------------------------------------
RLS:
  - User can only read/write their own records

---

## 3. `sales_call_logs` (future module)  
Stores notes, visit logs, AI-assisted suggestions, etc.

Table: sales_call_logs
------------------------------------------------------------
id              bigint (PK)
user_id         uuid (FK → profiles.id)
client_name     text
visit_notes     text
ai_suggestions  jsonb       -- generated prompts / actions
created_at      timestamp   default now()
updated_at      timestamp
------------------------------------------------------------
RLS:
  - User can only manage their own logs
  - Optional: company-level admin access

---

## 4. `companies` (future multi-tenant support)  
Supports teams, multiple stores, and enterprise-level deployments.

Table: companies
------------------------------------------------------------
id              uuid (PK)
name            text
created_at      timestamp default now()
------------------------------------------------------------
RLS:
  - Admins only

---

## 5. `user_company_roles` (future multi-tenant support)

Table: user_company_roles
------------------------------------------------------------
user_id         uuid (FK → profiles.id)
company_id      uuid (FK → companies.id)
role            text   -- 'manager', 'employee', 'admin'
------------------------------------------------------------
Composite PK: (user_id, company_id)

RLS:
  - Users may only see roles belonging to their company

---

# 📦 Storage Buckets

Future features (visual input, photo uploads) will require storage.

### Buckets:

/photos (private)
  - For OCR, receipts, machinery images, etc.

/reports (private)
  - Generated PDFs from calculators or sales logs

All storage access uses:

- Private bucket  
- Signed URL access only  
- No public uploads  

---

# 🔐 RLS (Row-Level Security) Summary

Every table has RLS **ON** except basic non-sensitive metadata.

### Generic RLS Template

-- Example RLS for any table with user_id
CREATE POLICY "Users can read their rows"
ON table_name FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their rows"
ON table_name FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their rows"
ON table_name FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

For company-level admin roles, additional policies will be added.

---

# 🧩 Future Schema Additions

As the app grows, new modules will require new tables:

| Future Feature | Planned Table |
|----------------|---------------|
| AI-generated questions | `ai_question_templates` |
| Bug tracker | `feature_requests` & `bug_reports` |
| Data visualization module | `analytics_sources`, `analytics_snapshots` |
| Offline sync | `sync_queue` (local only), Supabase merge handlers |
| OCR / visual input | `ocr_results` |

We will expand the schema iteratively along the roadmap.
