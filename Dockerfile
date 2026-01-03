FROM node:22-alpine3.22

WORKDIR /usr/src/app

# 启用 corepack 并安装 pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

CMD ["sh", "-c", "pnpm run db:deploy && pnpm run dev"]
