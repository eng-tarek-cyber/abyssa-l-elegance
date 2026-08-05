# ---- Build stage ----
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first for better layer caching
COPY package.json package-lock.json ./
RUN npm ci

# Copy source files
COPY . .

# Build the production bundle (vite build + esbuild server bundle)
RUN npm run build

# ---- Runtime stage ----
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy production dependencies only (excludes devDependencies like vite/esbuild/tsx)
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy the built application from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the application port
EXPOSE 3000

# Run the Express production server
CMD ["node", "dist/server.cjs"]
