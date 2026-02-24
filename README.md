# Teacher Tool Box Site

Standalone Next.js app for GradeBridge support and reviews.

## Features

- Issue report form (bug/question/feature)
- Review submission form (moderated)
- Approved review list
- Supabase-backed API routes

## Project path

- `/Users/mohammedsebbagh/github/teacher-toolbox-site`

## Routes

- `/` (main support + review page)
- `/api/teacher-toolbox/issues` (POST)
- `/api/teacher-toolbox/reviews` (GET, POST)

## 1. Create Supabase tables

Run this SQL in Supabase:

- `supabase/teacher_toolbox_schema.sql`

## 2. Environment variables (Vercel)

Set in Vercel project settings:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## 3. Local run

```bash
cd /Users/mohammedsebbagh/github/teacher-toolbox-site
npm install
npm run dev
```

## 4. Deploy

Deploy this folder to Vercel.

Live page will be:

- `https://<your-domain>/`

## 5. Review moderation

Reviews are inserted as `approved = false` by default.

Approve manually in Supabase:

```sql
update public.reviews
set approved = true
where id = '<review-id>';
```
