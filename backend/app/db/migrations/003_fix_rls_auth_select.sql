-- 002_fix_rls_auth_select.sql
-- Drop and recreate owner policies using SELECT form for auth functions
-- Run in your Supabase project's SQL editor.

-- TODOS
DROP POLICY IF EXISTS todos_owner_policy ON public.todos;
CREATE POLICY todos_owner_policy
  ON public.todos
  FOR ALL
  USING (
    (SELECT auth.uid()) = user_id
    OR (SELECT (auth.jwt() ->> 'role')) = 'admin'
  );

-- STUDY_PLANS
DROP POLICY IF EXISTS study_plans_owner_policy ON public.study_plans;
CREATE POLICY study_plans_owner_policy
  ON public.study_plans
  FOR ALL
  USING (
    (SELECT auth.uid()) = user_id
    OR (SELECT (auth.jwt() ->> 'role')) = 'admin'
  );

-- MARKETPLACE_ITEMS
DROP POLICY IF EXISTS marketplace_items_owner_policy ON public.marketplace_items;
CREATE POLICY marketplace_items_owner_policy
  ON public.marketplace_items
  FOR ALL
  USING (
    (SELECT auth.uid()) = user_id
    OR (SELECT (auth.jwt() ->> 'role')) = 'admin'
  );

-- EVENTS
DROP POLICY IF EXISTS events_owner_policy ON public.events;
CREATE POLICY events_owner_policy
  ON public.events
  FOR ALL
  USING (
    (SELECT auth.uid()) = user_id
    OR (SELECT (auth.jwt() ->> 'role')) = 'admin'
  );
