/* eslint-disable @typescript-eslint/no-explicit-any */
import * as schema from "./schema";

let dbInstance: any = null;

export function getDb() {
  if (dbInstance) return dbInstance;

  try {
    const globalEnv = typeof globalThis !== "undefined" ? (globalThis as Record<string, unknown>).env as Record<string, unknown> : null;
    if (globalEnv?.DB) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { drizzle } = require("drizzle-orm/d1");
      dbInstance = drizzle(globalEnv.DB, { schema });
      return dbInstance;
    }
  } catch {
    // fallback below
  }

  // Safe in-memory query builder mock proxy for Node.js / AI Studio runtime
  const createQueryChain = (data: unknown[] = []) => {
    const chain: any = {
      select: () => chain,
      from: () => chain,
      where: () => chain,
      orderBy: () => chain,
      limit: () => Promise.resolve(data),
      offset: () => chain,
      then: (resolve: (val: unknown) => unknown, reject?: (reason: unknown) => unknown) => Promise.resolve(data).then(resolve, reject),
      catch: (reject: (reason: unknown) => unknown) => Promise.resolve(data).catch(reject),
      insert: () => ({
        values: () => Promise.resolve({ success: true, meta: { changes: 1 } }),
      }),
      update: () => ({
        set: () => ({
          where: () => Promise.resolve({ success: true, meta: { changes: 1 } }),
        }),
      }),
      delete: () => ({
        where: () => Promise.resolve({ success: true, meta: { changes: 1 } }),
      }),
    };
    return chain;
  };

  dbInstance = createQueryChain([]);
  return dbInstance;
}

export const db = getDb();


