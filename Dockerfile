# FROM node:20-alpine AS installer
FROM oven/bun:canary-alpine AS installer

COPY package.json ./
COPY tsconfig.json ./

# RUN npm install -g bun 
RUN bun install

# FROM node:20-alpine
FROM oven/bun:canary-alpine

WORKDIR /app

COPY --from=installer /home/bun/app/node_modules ./node_modules
COPY package.json ./
COPY tsconfig.json ./
COPY public/ ./public
COPY src/ ./src

CMD ["bun", "start"]