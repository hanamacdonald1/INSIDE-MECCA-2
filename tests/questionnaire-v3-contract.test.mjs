import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

test("the questionnaire is a three-screen nonblank story flow", async () => {
  const page = await source("app/share-story/research-questionnaire/page.tsx");
  const config = await source("app/share-story/research-questionnaire/config.ts");

  assert.match(page, /v3_story/);
  assert.match(page, /v3_privacy/);
  assert.match(page, /v3_review/);
  assert.equal((page.match(/data-questionnaire-step=/g) || []).length, 3);
  assert.match(page, /maxLength=\{maximumAccountLength\}/);
  assert.doesNotMatch(page, /minLength/);
  assert.match(page, /!String\(data\.get\("What happened\?"\) \|\| ""\)\.trim\(\)/);
  assert.match(config, /Mixed or unsure/);
  assert.match(config, /Prefer not to say/);
  assert.match(page, /Need to pause\?/);
  assert.match(page, /Copy current answers/);
});

test("submit attempt measurement happens only after validation and before the request", async () => {
  const page = await source("app/share-story/research-questionnaire/page.tsx");
  const validation = page.indexOf("const invalid = validateEntireQuestionnaire()");
  const attempt = page.indexOf('trackFunnelEvent("questionnaire_submit_attempt"');
  const request = page.indexOf('fetch("/api/submissions"');
  const success = page.indexOf('trackFunnelEvent("questionnaire_submit_success"');

  assert.ok(validation >= 0);
  assert.ok(attempt > validation);
  assert.ok(request > attempt);
  assert.ok(success > request);
});

test("the server derives v3 consent wording and keeps v2 rollback compatibility", async () => {
  const route = await source("app/api/submissions/route.ts");
  const config = await source("app/share-story/research-questionnaire/config.ts");

  for (const id of ["accuracy", "sensitive_information", "no_publication", "confidentiality_limits"]) {
    assert.match(config, new RegExp(`id: "${id}"`));
  }
  assert.match(route, /consent_acknowledgements/);
  assert.match(route, /consentStatementsV3/);
  assert.match(route, /submit_research_questionnaire_v3/);
  assert.match(route, /submit_research_questionnaire_v2/);
  assert.match(route, /!usesV3Contract && accountText\.length < 20/);
  assert.match(route, /publication_permission: false/);
});

test("the additive v3 migration is service-role-only and accepts any nonblank story", async () => {
  const sql = await source("supabase/migrations/20260815060032_simplify_questionnaire_v3.sql");

  assert.match(sql, /create or replace function public\.submit_research_questionnaire_v3\(payload jsonb\)/i);
  assert.match(sql, /security definer/i);
  assert.match(sql, /set search_path to 'pg_catalog', 'public', 'pg_temp'/i);
  assert.match(sql, /current_4_v3_plain/);
  assert.match(sql, /if account_value = '' then/i);
  assert.doesNotMatch(sql, /char_length\(account_value\) < 20/i);
  assert.match(sql, /revoke all on function public\.submit_research_questionnaire_v3\(jsonb\) from public, anon, authenticated/i);
  assert.match(sql, /grant execute on function public\.submit_research_questionnaire_v3\(jsonb\) to service_role/i);
  assert.match(sql, /publication_permission[\s\S]*false/i);
});
