create table if not exists public.todos (
  id bigserial primary key,
  user_id uuid references auth.users (id) on delete cascade,
  title text not null,
  description text,
  due_date timestamptz,
  completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.study_plans (
  id bigserial primary key,
  user_id uuid references auth.users (id) on delete cascade,
  title text not null,
  subjects text[] not null default '{}',
  duration text,
  progress integer not null default 0,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  deadline timestamptz
);

create table if not exists public.marketplace_items (
  id bigserial primary key,
  user_id uuid references auth.users (id) on delete cascade,
  title text not null,
  description text,
  price numeric(12,2) not null default 0,
  available boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id bigserial primary key,
  user_id uuid references auth.users (id) on delete cascade,
  title text not null,
  description text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  location text,
  created_at timestamptz not null default now()
);

create index if not exists idx_todos_userid on public.todos (user_id);
create index if not exists idx_study_userid on public.study_plans (user_id);
create index if not exists idx_market_userid on public.marketplace_items (user_id);
create index if not exists idx_events_userid on public.events (user_id);
