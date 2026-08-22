revoke all on function public.submit_research_questionnaire(jsonb) from public, anon, authenticated;
grant execute on function public.submit_research_questionnaire(jsonb) to service_role;

notify pgrst, 'reload schema';
