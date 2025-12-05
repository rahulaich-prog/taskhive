
-- Enable RLS on tables
alter table public.todos enable row level security;
alter table public.study_plans enable row level security;
alter table public.marketplace_items enable row level security;
alter table public.events enable row level security;

-- Helper function: returns true if current user has "admin" role in auth metadata
-- (Optional: you can store custom claims in JWT or in a separate table; this example checks auth.token() metadata)
-- Note: Supabase stores JWT claim `role` or custom claims under `app_metadata`/`user_metadata` depending on your setup.
-- We'll provide simple policies that allow the user OR allow users with 'admin' role via top-level 'role' claim.

-- Policy for todos: users can manage their own todos
create policy "todos_owner_policy" on public.todos
  for all
  using (auth.uid() = user_id or auth.role() = 'authenticated' and (auth.jwt() ->> 'role') = 'admin');

-- Short explanation: the 'using' expression must evaluate to boolean. auth.uid() is the user's id.
-- The admin check above depends on how you add custom claims. Adjust the admin condition to match your token claims.

-- For study_plans
create policy "study_plans_owner_policy" on public.study_plans
  for all
  using (auth.uid() = user_id or (auth.jwt() ->> 'role') = 'admin');

-- For marketplace_items
create policy "marketplace_items_owner_policy" on public.marketplace_items
  for all
  using (auth.uid() = user_id or (auth.jwt() ->> 'role') = 'admin');

-- For events
create policy "events_owner_policy" on public.events
  for all
  using (auth.uid() = user_id or (auth.jwt() ->> 'role') = 'admin');

-- NOTE:
-- Replace "(auth.jwt() ->> 'role') = 'admin'" with your actual JWT custom claim check.
-- If you don't have custom claims, consider maintaining an "admins" table and checking membership via a function.
-- Example fallback admin function (optional):
-- create table if not exists public.admins (user_id uuid primary key);
-- then change policy: using (auth.uid() = user_id OR exists(select 1 from public.admins a where a.user_id = auth.uid()));

