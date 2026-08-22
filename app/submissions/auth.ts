import { getChatGPTUser, requireChatGPTUser, type ChatGPTUser } from "../chatgpt-auth";

function adminEmails(): Set<string> {
  return new Set(
    (process.env.SUBMISSIONS_ADMIN_EMAILS || "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  );
}

export function isSubmissionsAdmin(user: ChatGPTUser): boolean {
  return adminEmails().has(user.email.trim().toLowerCase());
}

export async function requireSubmissionsViewer(returnTo: string) {
  const user = await requireChatGPTUser(returnTo);
  return { user, allowed: isSubmissionsAdmin(user) };
}

export async function getSubmissionsApiAdmin(): Promise<ChatGPTUser | null> {
  const user = await getChatGPTUser();
  return user && isSubmissionsAdmin(user) ? user : null;
}
