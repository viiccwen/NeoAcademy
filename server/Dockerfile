FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install --production --frozen-lockfile

COPY . .

EXPOSE 8080

CMD ["bun", "run", "app.ts"]