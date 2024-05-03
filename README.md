# 🍕 url-shortener

URL shortener app back-end built with TypeScript, Drizzle a ElysiaJS and front-end built with Typescript, React, Vite and Shadcn-ui.

> 🔥 This project aims to keep runtime agnostic, this means it should work on Bun, Node, Cloudflare Workers or any Web Standard API compatible runtime.

## Running

This project depends on Docker to setup database. With Docker installed, clone the project, install dependencies, setup Docker containers and run the application.

> You must also run migrations to create database tables and run the seed to populate the database with fake data.

```sh
bun i
docker compose up -d
bun generate
bun migrate
bun dev
```
