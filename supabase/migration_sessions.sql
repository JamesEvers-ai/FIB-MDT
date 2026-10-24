create table if not exists public.fib_mdt_sessions (
  id uuid primary key default gen_random_uuid(),
  token_hash text not null unique,
  user_id text not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);
create index if not exists fib_mdt_sessions_user_id_idx on public.fib_mdt_sessions(user_id);
create index if not exists fib_mdt_sessions_expires_at_idx on public.fib_mdt_sessions(expires_at);

create table if not exists public.fib_record_shares (
  id text primary key,
  record_id text not null,
  token_hash text not null unique,
  created_by text,
  created_by_name text,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  revoked_at timestamptz
);
create index if not exists fib_record_shares_record_id_idx on public.fib_record_shares(record_id);
create index if not exists fib_record_shares_expires_at_idx on public.fib_record_shares(expires_at);
