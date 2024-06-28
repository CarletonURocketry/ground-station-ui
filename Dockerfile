FROM node:20 AS installer

COPY package.json ./
COPY tsconfig.json ./

RUN npm install

FROM node:20

WORKDIR /app

COPY --from=installer node_modules ./node_modules
COPY package.json ./
COPY tsconfig.json ./
COPY public/ ./public
COPY src/ ./src

CMD ["npm", "run", "start"]