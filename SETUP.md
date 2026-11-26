# VOW Marketing Site - Setup Guide

## Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in the required values in `.env.local`:

### Required for Leads System:
- `SUPABASE_URL`: Your Supabase project URL (from Supabase dashboard → Settings → API)
- `SUPABASE_SERVICE_ROLE_KEY`: Your service role key (from Supabase dashboard → Settings → API → service_role)

### Required for Bot Protection:
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`: Your reCAPTCHA v3 site key (from [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin/create))
- `RECAPTCHA_SECRET_KEY`: Your reCAPTCHA v3 secret key (keep this private!)

### Required for the billing webhook (`api/billing/marketing-webhook`):
- `VOW_BILLING_WEBHOOK_SECRET`: Secret for VOW app webhook authentication

## Database Setup

Run the SQL migration to create the leads table:

1. Go to your Supabase project → SQL Editor
2. Copy the contents of `supabase-migrations/create_leads_table.sql`
3. Run the migration

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Production Build

```bash
npm run build
npm start
```

## Leads System

The leads system captures inquiries from 3 service buttons with **bot protection**:
- **עיצוב ופיתוח** → `design_development`
- **שיווק דיגיטלי** → `digital_marketing`
- **חשבונאות חכמה (AI)** → `smart_accounting_ai`

### Features:
- ✅ **Invisible reCAPTCHA v3** - No user interaction required
- ✅ **Bot scoring** - Filters out automated submissions (threshold: 0.5)
- ✅ **Server-side validation** - All checks happen on the backend
- ✅ **Source tracking** - Know which service generated each lead

All leads are saved to `public.leads` table with:
- User info (first_name, last_name, email, phone)
- Source tracking (which button clicked)
- Page context (page_path, user_agent)
- Server-side timestamp (created_at)

### Security Notes:
- reCAPTCHA tokens are verified server-side only
- Leads with score < 0.5 are rejected
- Service role key bypasses RLS (only API has access)
- All form data is validated with Zod before insertion
