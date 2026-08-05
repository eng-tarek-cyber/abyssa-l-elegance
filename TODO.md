# Deployment Fix Checklist

- [x] Create `src/vite-env.d.ts` to fix image import type errors
- [x] Refactor `server.ts` to lazy-load Vite only in development
- [x] Update `package.json` with Node engines and Windows-safe scripts
- [x] Add `.env.example` for deployment configuration
- [x] Run `npm run lint` to verify typecheck passes
- [x] Run `npm run build` to verify production build succeeds
- [x] Verify `dist/server.cjs` uses dynamic `import("vite")` only in dev (no top-level `require("vite")`)
- [x] Create `Dockerfile` (Node 20 Alpine multi-stage) to bypass failing Nixpacks `/mise/installs` step
- [x] Create `.dockerignore` to reduce Docker build context
- [x] Create `railway.toml` to force Docker builder + configure healthcheck/start
- [x] Verify production server starts and `/api/health` returns `{"status":"ok","app":"Abyssal Elegance"}`
