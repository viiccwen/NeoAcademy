FROM oven/bun:latest

WORKDIR /

COPY package.json bun.lockb ./

RUN bun install --production

COPY . .

EXPOSE 8080

CMD ["bun", "run", "app.ts"]