# Top-level Dockerfile for Render deployment
# It simply delegates to the backend-src Dockerfile, copying the
# frontend-dist assets as well. Render expects a Dockerfile at the
# repo root, so we provide this small wrapper.

FROM node:18 AS builder
WORKDIR /app

# copy backend source and frontend assets
COPY backend-src/ ./backend-src/
COPY frontend-dist/share/nginx/html ./frontend-dist/share/nginx/html

# build backend using the existing Dockerfile
RUN cd backend-src && npm install && npm run build

# final image
FROM node:18
WORKDIR /app

# copy built backend and frontend into final image
COPY --from=builder /app/backend-src/dist ./dist
COPY --from=builder /app/backend-src/package*.json ./
COPY --from=builder /app/frontend-dist/share/nginx/html ./public

RUN npm install --production

EXPOSE 3000
ENV NODE_ENV=production

CMD ["node","dist/main.js"]
