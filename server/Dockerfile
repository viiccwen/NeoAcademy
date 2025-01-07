FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install --production && \
    bun pm cache rm && \
    rm -rf node_modules

COPY . .

EXPOSE 8080

CMD ["bun", "run", "app.ts"]