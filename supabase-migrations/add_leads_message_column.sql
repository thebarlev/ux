-- Optional message from inline / extended lead forms (e.g. idea-to-product)
alter table public.leads add column if not exists message text;

comment on column public.leads.message is 'Free-text note from lead form; may be null.';
