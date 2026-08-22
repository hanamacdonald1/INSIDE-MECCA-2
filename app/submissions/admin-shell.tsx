import Link from "next/link";
import type { ChatGPTUser } from "../chatgpt-auth";

export function AdminShell({ user, children, section = "Private submissions workspace" }: { user: ChatGPTUser; children: React.ReactNode; section?: string }) {
  return <main className="sd-site">
    <header className="sd-header">
      <Link className="sd-brand" href="/submissions"><span>INSIDE</span><strong>MECCA</strong></Link>
      <div><b>{section}</b><small>Signed in as {user.email}</small></div>
      <nav className="sd-admin-nav" aria-label="Private workspace"><Link href="/submissions">Submissions</Link><Link href="/audience-insights">Audience insights</Link><Link href="/commentary-admin">Public commentary</Link></nav>
      <a className="sd-signout" href="/signout-with-chatgpt?return_to=%2F">Sign out</a>
    </header>
    {children}
  </main>;
}

export function AccessDenied({ user, area = "Questionnaire records", returnTo = "/submissions" }: { user: ChatGPTUser; area?: string; returnTo?: string }) {
  return <main className="sd-site"><section className="sd-message"><p className="sd-kicker">Access restricted</p><h1>This account is not authorised.</h1><p>You are signed in as {user.email}. {area} are limited to the project owner.</p><a className="sd-button" href={`/signout-with-chatgpt?return_to=${encodeURIComponent(returnTo)}`}>Use another account</a></section></main>;
}

export function ConfigurationPending() {
  return <section className="sd-message inline"><p className="sd-kicker">Secure connection pending</p><h2>The dashboard is protected, but private database access still needs to be connected.</h2><p>No submission data is exposed. Complete the secure connection to load the existing records.</p></section>;
}

export function StatusBadge({ value }: { value: string }) {
  return <span className={`sd-status ${value}`}>{value.replaceAll("_", " ")}</span>;
}
