import { createServerFn } from "@tanstack/react-start";
import { VisitorData } from "../utils/data";

export const logVisitServer = createServerFn({ method: "POST" })
  .inputValidator((visitor: VisitorData) => visitor)
  .handler(async ({ data: visitor }) => {
    try {
      // Dynamic string variables with /* @vite-ignore */ keep the Vite client-side 
      // bundler from trying to analyze or package Node.js built-ins.
      const fsName = "node:fs/promises";
      const pathName = "node:path";
      
      const fs = await import(/* @vite-ignore */ fsName);
      const path = await import(/* @vite-ignore */ pathName);

      const cwd = typeof process !== "undefined" && typeof process.cwd === "function" 
        ? process.cwd() 
        : "";
      const LOG_FILE = path.join(cwd, "visitor_logs.json");

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

export const getVisitorsServer = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const fsName = "node:fs/promises";
      const pathName = "node:path";
      
      const fs = await import(/* @vite-ignore */ fsName);
      const path = await import(/* @vite-ignore */ pathName);

      const cwd = typeof process !== "undefined" && typeof process.cwd === "function" 
        ? process.cwd() 
        : "";
      const LOG_FILE = path.join(cwd, "visitor_logs.json");

      const data = await fs.readFile(LOG_FILE, "utf-8");
      return JSON.parse(data) as VisitorData[];
    } catch (e) {
      return [];
    }
  });

export const clearVisitorsServer = createServerFn({ method: "POST" })
  .handler(async () => {
    try {
      const fsName = "node:fs/promises";
      const pathName = "node:path";
      
      const fs = await import(/* @vite-ignore */ fsName);
      const path = await import(/* @vite-ignore */ pathName);

      const cwd = typeof process !== "undefined" && typeof process.cwd === "function" 
        ? process.cwd() 
        : "";
      const LOG_FILE = path.join(cwd, "visitor_logs.json");

      await fs.writeFile(LOG_FILE, "[]");
      return { success: true };
    } catch (e) {
      return { success: false };
    }
  });