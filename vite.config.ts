import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The dashboard reads monthly reports from the Expense Tracker API.
export default defineConfig({
  plugins: [react()],
  server: { proxy: { "/reports": "http://localhost:8000" } },
});
