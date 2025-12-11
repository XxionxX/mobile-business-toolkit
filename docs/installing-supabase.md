# 🛠️ Installing & Setting Up Supabase
*A clean setup guide for using Supabase with the Mobile Business Toolkit (MBT).*

---

## 🚀 1. Create a Supabase Project

1. Visit: https://supabase.com/dashboard  
2. Click **New Project**
3. Choose:
   - **Free Tier** (plenty for development)
   - **Project Name:** mobile-business-toolkit-dev
   - **Database Password:** (store safely!)
4. Wait for provisioning.

---

## 🔑 2. Retrieve Your Project Credentials

In the Supabase dashboard:

- Go to **Project Settings → API**
- Copy:
  - **Project URL**
  - **anon public key** (client-side)
  - (We will NOT use the service key in the client app)

Save these in a secure place.

---

## 📦 3. Install Supabase JS for React Native

From your Expo project directory:

bash
npx expo install @supabase/supabase-js


If using Expo-native networking, no additional polyfills are needed.

---

## 🔧 4. Create MBT Supabase Client Wrapper

Create a file:

/lib/supabase.ts

ts
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

---

## 🔐 5. Store Credentials Securely

For local development:

Add to `app.config.js` or `app.json`:

json
{
  "expo": {
    "extra": {
      "supabaseUrl": "https://YOUR_URL.supabase.co",
      "supabaseAnon": "YOUR_PUBLIC_ANON_KEY"
    }
  }
}

For production:
- Use **Expo EAS Secrets**
- Never hardcode secrets in the repo!

---

## 🧪 6. Test Supabase Connection

Add a quick test:

ts
const { data, error } = await supabase.from("test_table").select("*");
console.log(data, error);

---

## 🧭 7. Create Initial Tables

Example for user profiles:

Table: profiles
id (uuid, PK)
email (text)
role (text)
created_at (timestamp)

---

## 🎉 Done!

You're ready to:

- Add authentication  
- Build protected routes  
- Sync calculator data to the cloud  
- Expand to self-hosted Postgres later  

Supabase is now fully integrated into MBT.
