FROM oven/bun:canary-slim
WORKDIR /app
COPY package.json ./
RUN bun install
COPY . .
RUN bun run build
CMD ["bun", "run", "preview"]