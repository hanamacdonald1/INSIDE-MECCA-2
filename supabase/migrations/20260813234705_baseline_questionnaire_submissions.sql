create table if not exists public.questionnaire_submissions (
  id bigint generated always as identity primary key,
  submission_ref uuid not null default gen_random_uuid() unique,
  received_at timestamptz not null default now(),
  status text not null default 'received'
    check (status = any (array['received', 'triage', 'reviewing', 'follow_up', 'closed', 'archived'])),
  connection_to_mecca text not null,
  employment_period text,
  region text,
  workplace_type text,
  broad_role_category text,
  account_text text not null,
  happened_when text,
  happened_where text,
  role_at_time text,
  direct_witnesses text,
  internal_report_and_response text,
  repeated_or_affected_others text,
  uncertainties text,
  hearsay_details text,
  supporting_information text[] not null default '{}',
  themes text[] not null default '{}',
  contact_email text,
  contact_preferences text[] not null default '{}',
  consent_confirmations text[] not null default '{}',
  evidence_provided boolean not null default false,
  verification_status text not null default 'unverified',
  risk_or_safeguarding_flag boolean not null default false,
  follow_up_required boolean not null default false,
  assigned_reviewer text,
  internal_notes text,
  source text not null default 'website_research_questionnaire',
  user_agent text
);

comment on table public.questionnaire_submissions is
  'Confidential Inside MECCA research questionnaire submissions. Not readable through the public API.';

alter table public.questionnaire_submissions enable row level security;
revoke all on table public.questionnaire_submissions from anon, authenticated;
grant all on table public.questionnaire_submissions to service_role;

create or replace function public.submit_research_questionnaire(payload jsonb)
returns uuid
language plpgsql
security definer
set search_path to 'public', 'pg_temp'
as $function$
declare
  new_ref uuid;
  supporting text[];
  selected_themes text[];
  preferences text[];
  consents text[];
begin
  if payload is null then
    raise exception 'Submission data is required';
  end if;

  if nullif(btrim(coalesce(payload->>'website', '')), '') is not null then
    raise exception 'Submission rejected';
  end if;

  if nullif(btrim(coalesce(payload->>'connection_to_mecca', '')), '') is null then
    raise exception 'Connection to MECCA is required';
  end if;

  if nullif(btrim(coalesce(payload->>'account_text', '')), '') is null then
    raise exception 'Account is required';
  end if;

  select coalesce(array_agg(value), '{}') into supporting
  from jsonb_array_elements_text(coalesce(payload->'supporting_information', '[]'::jsonb));

  select coalesce(array_agg(value), '{}') into selected_themes
  from jsonb_array_elements_text(coalesce(payload->'themes', '[]'::jsonb));

  select coalesce(array_agg(value), '{}') into preferences
  from jsonb_array_elements_text(coalesce(payload->'contact_preferences', '[]'::jsonb));

  select coalesce(array_agg(value), '{}') into consents
  from jsonb_array_elements_text(coalesce(payload->'consent_confirmations', '[]'::jsonb));

  if cardinality(consents) <> 7 then
    raise exception 'All consent confirmations are required';
  end if;

  insert into public.questionnaire_submissions (
    connection_to_mecca, employment_period, region, workplace_type,
    broad_role_category, account_text, happened_when, happened_where,
    role_at_time, direct_witnesses, internal_report_and_response,
    repeated_or_affected_others, uncertainties, hearsay_details,
    supporting_information, themes, contact_email, contact_preferences,
    consent_confirmations, evidence_provided, follow_up_required, user_agent
  ) values (
    left(payload->>'connection_to_mecca', 120),
    left(payload->>'employment_period', 250),
    left(payload->>'region', 250),
    left(payload->>'workplace_type', 120),
    left(payload->>'broad_role_category', 250),
    left(payload->>'account_text', 50000),
    left(payload->>'happened_when', 5000),
    left(payload->>'happened_where', 5000),
    left(payload->>'role_at_time', 5000),
    left(payload->>'direct_witnesses', 5000),
    left(payload->>'internal_report_and_response', 10000),
    left(payload->>'repeated_or_affected_others', 10000),
    left(payload->>'uncertainties', 10000),
    left(payload->>'hearsay_details', 10000),
    supporting,
    selected_themes,
    nullif(left(btrim(payload->>'contact_email'), 320), ''),
    preferences,
    consents,
    cardinality(supporting) > 0 and not ('No supporting material' = any(supporting)),
    ('The project may contact me by email' = any(preferences)
      or 'I am open to a confidential research conversation' = any(preferences)),
    left(payload->>'user_agent', 1000)
  )
  returning submission_ref into new_ref;

  return new_ref;
end;
$function$;

revoke all on function public.submit_research_questionnaire(jsonb) from public;
grant execute on function public.submit_research_questionnaire(jsonb) to anon, authenticated, service_role;
