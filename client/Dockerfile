FROM oven/bun:latest

WORKDIR /src

COPY package.json bun.lockb ./

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

EXPOSE 4173

CMD ["bun", "run", "preview"]