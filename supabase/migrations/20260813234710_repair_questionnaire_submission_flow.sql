alter table public.questionnaire_submissions
  add column if not exists identity_preference text,
  add column if not exists preferred_name_or_pseudonym text,
  add column if not exists primary_knowledge_basis text,
  add column if not exists consent_version text not null default 'legacy_7_v1',
  add column if not exists publication_permission boolean not null default false,
  add column if not exists email_delivery_status text not null default 'unknown',
  add column if not exists email_attempted_at timestamptz,
  add column if not exists email_delivered_at timestamptz,
  add column if not exists email_provider_message_id text,
  add column if not exists email_delivery_error_code text;

do $constraints$
begin
  if not exists (select 1 from pg_constraint where conname = 'questionnaire_submissions_identity_preference_check') then
    alter table public.questionnaire_submissions
      add constraint questionnaire_submissions_identity_preference_check
      check (identity_preference is null or identity_preference = any (array['Anonymous', 'Pseudonymous', 'Confidential contact']));
  end if;

  if not exists (select 1 from pg_constraint where conname = 'questionnaire_submissions_knowledge_basis_check') then
    alter table public.questionnaire_submissions
      add constraint questionnaire_submissions_knowledge_basis_check
      check (primary_knowledge_basis is null or primary_knowledge_basis = any (array[
        'I experienced it personally',
        'I directly witnessed it',
        'I have relevant records or documents',
        'It was told to me by another person'
      ]));
  end if;

  if not exists (select 1 from pg_constraint where conname = 'questionnaire_submissions_consent_version_check') then
    alter table public.questionnaire_submissions
      add constraint questionnaire_submissions_consent_version_check
      check (consent_version = any (array['current_4_v2', 'legacy_7_v1']));
  end if;

  if not exists (select 1 from pg_constraint where conname = 'questionnaire_submissions_publication_permission_check') then
    alter table public.questionnaire_submissions
      add constraint questionnaire_submissions_publication_permission_check
      check (publication_permission = false);
  end if;

  if not exists (select 1 from pg_constraint where conname = 'questionnaire_submissions_email_delivery_status_check') then
    alter table public.questionnaire_submissions
      add constraint questionnaire_submissions_email_delivery_status_check
      check (email_delivery_status = any (array['unknown', 'pending', 'sent', 'failed']));
  end if;
end;
$constraints$;

create or replace function public.submit_research_questionnaire_v2(payload jsonb)
returns jsonb
language plpgsql
security definer
set search_path to 'pg_catalog', 'public', 'pg_temp'
as $function$
declare
  new_ref uuid;
  new_received_at timestamptz;
  identity_choice text := btrim(coalesce(payload->>'identity_preference', ''));
  preferred_name text := btrim(coalesce(payload->>'preferred_name_or_pseudonym', ''));
  connection_choice text := btrim(coalesce(payload->>'connection_to_mecca', ''));
  knowledge_choice text := btrim(coalesce(payload->>'primary_knowledge_basis', ''));
  account_value text := btrim(coalesce(payload->>'account_text', ''));
  contact_value text := btrim(coalesce(payload->>'contact_email', ''));
  workplace_value text := btrim(coalesce(payload->>'workplace_type', ''));
  supporting text[];
  selected_themes text[];
  preferences text[];
  consents text[];
  consent_version_value text;
  current_consents constant text[] := array[
    'I confirm this account distinguishes what I experienced or directly witnessed from what others told me, and I am not knowingly submitting false information.',
    'I consent to Inside MECCA collecting the personal and sensitive information I choose to include for research and verification, and I have limited other people''s identifying information to what is necessary.',
    'I understand this submission is a research lead, not a verified finding, and does not grant permission to quote, publish or identify me; separate, specific permission is required.',
    'I have read the contributor data handling notice and understand that confidentiality and anonymity have technical and legal limits, including possible re-identification or legally compelled disclosure.'
  ];
  legacy_consents constant text[] := array[
    'I have separated what I experienced or directly witnessed from what other people told me.',
    'I consent to Inside MECCA collecting the personal and sensitive information I choose to include for research and verification.',
    'I have limited identifying information about other people to what I believe is necessary.',
    'I understand this submission is a research lead, not a verified finding.',
    'I understand this submission grants no permission to quote or publish any part of it; separate, specific permission is required.',
    'I understand confidentiality and anonymity have technical and legal limits, including possible re-identification or legally compelled disclosure.',
    'I confirm I am not knowingly submitting false information and have read the contributor data handling notice.'
  ];
  allowed_supporting constant text[] := array[
    'Emails', 'Messages', 'Rosters', 'Diary notes', 'Calendar records',
    'Performance documents', 'Photographs', 'Direct witnesses',
    'No supporting material', 'Other relevant information'
  ];
  allowed_themes constant text[] := array[
    'Bullying and harassment', 'Management and leadership', 'Psychological safety',
    'Workload and staffing', 'Training and development', 'Pay and benefits',
    'Career progression', 'Inclusion and accessibility', 'Team culture',
    'Work-life balance', 'Reporting concerns and retaliation',
    'Employment security and rostering', 'Other'
  ];
begin
  if payload is null or jsonb_typeof(payload) <> 'object' then
    raise exception 'Submission data is required' using errcode = '22023';
  end if;

  if nullif(btrim(coalesce(payload->>'website', '')), '') is not null then
    raise exception 'Submission rejected' using errcode = '22023';
  end if;

  if identity_choice <> all (array['Anonymous', 'Pseudonymous', 'Confidential contact']) then
    raise exception 'Invalid identity preference' using errcode = '22023';
  end if;

  if connection_choice <> all (array[
    'Current employee', 'Former employee', 'Contractor', 'Former contractor',
    'Former manager', 'Direct witness', 'Other first-hand workplace connection'
  ]) then
    raise exception 'Invalid connection to MECCA' using errcode = '22023';
  end if;

  if knowledge_choice <> all (array[
    'I experienced it personally', 'I directly witnessed it',
    'I have relevant records or documents', 'It was told to me by another person'
  ]) then
    raise exception 'Invalid knowledge basis' using errcode = '22023';
  end if;

  if char_length(account_value) < 20 then
    raise exception 'Account must contain at least 20 characters' using errcode = '22023';
  end if;

  if exists (
    select 1
    from jsonb_each(payload) as field(key, value)
    where field.key = any (array[
      'website', 'identity_preference', 'preferred_name_or_pseudonym',
      'connection_to_mecca', 'primary_knowledge_basis', 'employment_period',
      'region', 'workplace_type', 'broad_role_category', 'account_text',
      'happened_when', 'happened_where', 'role_at_time', 'direct_witnesses',
      'internal_report_and_response', 'repeated_or_affected_others',
      'uncertainties', 'hearsay_details', 'contact_email', 'user_agent'
    ]) and jsonb_typeof(field.value) <> 'string'
  ) then
    raise exception 'Questionnaire text fields must be strings' using errcode = '22023';
  end if;

  if char_length(preferred_name) > 200
    or char_length(btrim(coalesce(payload->>'employment_period', ''))) > 250
    or char_length(btrim(coalesce(payload->>'region', ''))) > 250
    or char_length(workplace_value) > 120
    or char_length(btrim(coalesce(payload->>'broad_role_category', ''))) > 250
    or char_length(account_value) > 30000
    or char_length(btrim(coalesce(payload->>'happened_when', ''))) > 2000
    or char_length(btrim(coalesce(payload->>'happened_where', ''))) > 2000
    or char_length(btrim(coalesce(payload->>'role_at_time', ''))) > 2000
    or char_length(btrim(coalesce(payload->>'direct_witnesses', ''))) > 5000
    or char_length(btrim(coalesce(payload->>'internal_report_and_response', ''))) > 10000
    or char_length(btrim(coalesce(payload->>'repeated_or_affected_others', ''))) > 5000
    or char_length(btrim(coalesce(payload->>'uncertainties', ''))) > 5000
    or char_length(btrim(coalesce(payload->>'hearsay_details', ''))) > 5000
    or char_length(contact_value) > 320
    or char_length(btrim(coalesce(payload->>'user_agent', ''))) > 1000 then
    raise exception 'One or more questionnaire fields are too long' using errcode = '22023';
  end if;

  if workplace_value <> '' and workplace_value <> all (array['Store', 'Support office', 'Distribution centre', 'Other']) then
    raise exception 'Invalid workplace type' using errcode = '22023';
  end if;

  if jsonb_typeof(coalesce(payload->'supporting_information', '[]'::jsonb)) <> 'array'
    or jsonb_typeof(coalesce(payload->'themes', '[]'::jsonb)) <> 'array'
    or jsonb_typeof(coalesce(payload->'contact_preferences', '[]'::jsonb)) <> 'array'
    or jsonb_typeof(coalesce(payload->'consent_confirmations', '[]'::jsonb)) <> 'array' then
    raise exception 'Questionnaire choices must be arrays' using errcode = '22023';
  end if;

  select coalesce(array_agg(value order by ordinality), '{}'::text[]) into supporting
  from jsonb_array_elements_text(coalesce(payload->'supporting_information', '[]'::jsonb)) with ordinality;

  select coalesce(array_agg(value order by ordinality), '{}'::text[]) into selected_themes
  from jsonb_array_elements_text(coalesce(payload->'themes', '[]'::jsonb)) with ordinality;

  select coalesce(array_agg(value order by ordinality), '{}'::text[]) into preferences
  from jsonb_array_elements_text(coalesce(payload->'contact_preferences', '[]'::jsonb)) with ordinality;

  select coalesce(array_agg(value order by ordinality), '{}'::text[]) into consents
  from jsonb_array_elements_text(coalesce(payload->'consent_confirmations', '[]'::jsonb)) with ordinality;

  if not (supporting <@ allowed_supporting) or cardinality(supporting) > cardinality(allowed_supporting) then
    raise exception 'Invalid supporting information choice' using errcode = '22023';
  end if;

  if cardinality(supporting) <> (select count(distinct item) from unnest(supporting) as item) then
    raise exception 'Duplicate supporting information choice' using errcode = '22023';
  end if;

  if not (selected_themes <@ allowed_themes) or cardinality(selected_themes) > cardinality(allowed_themes) then
    raise exception 'Invalid research theme' using errcode = '22023';
  end if;

  if cardinality(selected_themes) <> (select count(distinct item) from unnest(selected_themes) as item) then
    raise exception 'Duplicate research theme' using errcode = '22023';
  end if;

  if cardinality(preferences) <> 1 or preferences[1] <> all (array[
    'I do not want to provide contact details',
    'The project may email me with verification questions',
    'I am open to a confidential research conversation'
  ]) then
    raise exception 'Invalid contact preference' using errcode = '22023';
  end if;

  if identity_choice = 'Anonymous' and (contact_value <> '' or preferences[1] <> 'I do not want to provide contact details') then
    raise exception 'Anonymous submissions cannot include contact details' using errcode = '22023';
  end if;

  if identity_choice = 'Anonymous' and preferred_name <> '' then
    raise exception 'Anonymous submissions cannot include a preferred name or pseudonym' using errcode = '22023';
  end if;

  if identity_choice = 'Confidential contact' and preferences[1] = 'I do not want to provide contact details' then
    raise exception 'Confidential contact requires an email contact option' using errcode = '22023';
  end if;

  if preferences[1] = 'I do not want to provide contact details' and contact_value <> '' then
    raise exception 'Contact email is not permitted for this preference' using errcode = '22023';
  end if;

  if preferences[1] <> 'I do not want to provide contact details'
    and (contact_value = '' or contact_value !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$') then
    raise exception 'A valid contact email is required' using errcode = '22023';
  end if;

  if not (payload ? 'publication_permission')
    or jsonb_typeof(payload->'publication_permission') <> 'boolean'
    or (payload->>'publication_permission')::boolean then
    raise exception 'Publication permission is not collected by this form' using errcode = '22023';
  end if;

  if cardinality(consents) = cardinality(current_consents)
    and consents @> current_consents and current_consents @> consents then
    consent_version_value := 'current_4_v2';
  elsif cardinality(consents) = cardinality(legacy_consents)
    and consents @> legacy_consents and legacy_consents @> consents then
    consent_version_value := 'legacy_7_v1';
  else
    raise exception 'All consent confirmations are required' using errcode = '22023';
  end if;

  insert into public.questionnaire_submissions (
    identity_preference, preferred_name_or_pseudonym, connection_to_mecca,
    primary_knowledge_basis, employment_period, region, workplace_type,
    broad_role_category, account_text, happened_when, happened_where,
    role_at_time, direct_witnesses, internal_report_and_response,
    repeated_or_affected_others, uncertainties, hearsay_details,
    supporting_information, themes, contact_email, contact_preferences,
    consent_confirmations, consent_version, publication_permission,
    evidence_provided, follow_up_required, user_agent, email_delivery_status
  ) values (
    identity_choice,
    nullif(left(preferred_name, 200), ''),
    left(connection_choice, 120),
    left(knowledge_choice, 200),
    nullif(left(btrim(coalesce(payload->>'employment_period', '')), 250), ''),
    nullif(left(btrim(coalesce(payload->>'region', '')), 250), ''),
    nullif(left(workplace_value, 120), ''),
    nullif(left(btrim(coalesce(payload->>'broad_role_category', '')), 250), ''),
    left(account_value, 30000),
    nullif(left(btrim(coalesce(payload->>'happened_when', '')), 2000), ''),
    nullif(left(btrim(coalesce(payload->>'happened_where', '')), 2000), ''),
    nullif(left(btrim(coalesce(payload->>'role_at_time', '')), 2000), ''),
    nullif(left(btrim(coalesce(payload->>'direct_witnesses', '')), 5000), ''),
    nullif(left(btrim(coalesce(payload->>'internal_report_and_response', '')), 10000), ''),
    nullif(left(btrim(coalesce(payload->>'repeated_or_affected_others', '')), 5000), ''),
    nullif(left(btrim(coalesce(payload->>'uncertainties', '')), 5000), ''),
    nullif(left(btrim(coalesce(payload->>'hearsay_details', '')), 5000), ''),
    supporting,
    selected_themes,
    nullif(left(contact_value, 320), ''),
    preferences,
    consents,
    consent_version_value,
    false,
    cardinality(supporting) > 0 and not ('No supporting material' = any(supporting)),
    preferences[1] = any (array[
      'The project may email me with verification questions',
      'I am open to a confidential research conversation'
    ]),
    nullif(left(btrim(coalesce(payload->>'user_agent', '')), 1000), ''),
    'pending'
  )
  returning submission_ref, received_at into new_ref, new_received_at;

  return jsonb_build_object(
    'submission_ref', new_ref,
    'received_at', new_received_at,
    'consent_version', consent_version_value
  );
end;
$function$;

revoke all on function public.submit_research_questionnaire_v2(jsonb) from public, anon, authenticated;
grant execute on function public.submit_research_questionnaire_v2(jsonb) to service_role;

create or replace function public.submit_research_questionnaire(payload jsonb)
returns uuid
language plpgsql
security definer
set search_path to 'pg_catalog', 'public', 'pg_temp'
as $function$
declare
  result jsonb;
begin
  result := public.submit_research_questionnaire_v2(payload);
  return (result->>'submission_ref')::uuid;
end;
$function$;

revoke all on function public.submit_research_questionnaire(jsonb) from public;
grant execute on function public.submit_research_questionnaire(jsonb) to anon, authenticated, service_role;

notify pgrst, 'reload schema';
