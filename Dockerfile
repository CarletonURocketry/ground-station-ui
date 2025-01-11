FROM node:20-alpine AS installer

COPY package.json ./
COPY tsconfig.json ./

# Solution obtained from https://github.com/oven-sh/bun/issues/5545#issuecomment-1722461083
# Add dependencies to get Bun working on Alpine
RUN apk --no-cache add ca-certificates wget

# Install glibc to run Bun
RUN if [[ $(uname -m) == "aarch64" ]] ; \
    then \
    # aarch64
    wget https://raw.githubusercontent.com/squishyu/alpine-pkg-glibc-aarch64-bin/master/glibc-2.26-r1.apk ; \
    apk add --no-cache --allow-untrusted --force-overwrite glibc-2.26-r1.apk ; \
    rm glibc-2.26-r1.apk ; \
    else \
    # x86_64
    wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.28-r0/glibc-2.28-r0.apk ; \
    wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub ; \
    apk add --no-cache --force-overwrite glibc-2.28-r0.apk ; \
    rm glibc-2.28-r0.apk ; \
    fi

RUN npm install

FROM node:20-alpine

WORKDIR /app

COPY --from=installer node_modules ./node_modules
COPY package.json ./
COPY tsconfig.json ./
COPY public/ ./public
COPY src/ ./src

npm run build

CMD ["npm", "run", "start"]