import { createServerFn } from "@tanstack/react-start";
import { VisitorData } from "../utils/data";

export const logVisitServer = createServerFn("POST", async (visitor: VisitorData) => {
  try {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const LOG_FILE = path.join(process.cwd(), "visitor_logs.json");

    let logs: VisitorData[] = [];
    try {
      const data = await fs.readFile(LOG_FILE, "utf-8");
      logs = JSON.parse(data);
    } catch (e) {
      // File doesn't exist yet
    }

    // Add new visitor and keep last 500
    logs = [visitor, ...logs].slice(0, 500);
    await fs.writeFile(LOG_FILE, JSON.stringify(logs, null, 2));

    return { success: true };
  } catch (error) {
    console.error("Server logging error:", error);
    return { success: false };
  }
});

export const getVisitorsServer = createServerFn("GET", async () => {
  try {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const LOG_FILE = path.join(process.cwd(), "visitor_logs.json");

    const data = await fs.readFile(LOG_FILE, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
});

export const clearVisitorsServer = createServerFn("POST", async () => {
  try {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const LOG_FILE = path.join(process.cwd(), "visitor_logs.json");

    await fs.writeFile(LOG_FILE, "[]");
    return { success: true };
  } catch (e) {
    return { success: false };
  }
});
