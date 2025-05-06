FROM oven/bun:canary-slim
LABEL AUTHOR="Elias Hawa"
WORKDIR /app
COPY package.json ./
RUN bun install
COPY . .
RUN bun run build
CMD ["bunx", "serve", "dist", "-p", "4173"]