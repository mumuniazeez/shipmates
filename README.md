# Welcome to Shipmate

Shipmate is an Hack Club match maker for hackers. Where you get to meet people to collaborate on project's with you.

## Folder Structure

```text
.
|-- client/
|   |-- app/
|   |   |-- components/
|   |   |-- lib/
|   |   |-- routes/
|   |   |-- routes.ts
|   |   |-- root.tsx
|   |-- public/
|   |-- package.json
|-- server/
|   |-- src/
|   |   |-- modules/
|   |   |-- app.module.ts
|   |   |-- main.ts
|   |-- prisma/
|   |   |-- migrations/
|   |   |-- schema.prisma
|   |-- test/
|   |-- package.json
|-- package.json
|-- README.md

```

## Get Started

Let's get you working on this project.

## Prerequisite

The following are needed for you to run this :

- Nodejs
- PNPM
- A PostgreSQL database

## Installation

This project is a monorepo project which utilize pnpm workspaces

```bash
pnpm install
```

This will install all client and server dependencies

### The `~/client` folder

The client folder contain the frontend code for the application and is build with:

- React Router Remix
- TailwindCSS
- Shadcn

To run the frontend code from use the following command:

From the root folder:

```bash
pnpm client
```

From the client folder:

```bash
pnpm dev
```

### The `~/server` foleder

The server folder contain the backend code for the application and is build with:

- Nodejs
- Nestjs
- Prisma
- PostgreSQL

To run the backend code from use the following command:

From the root folder:

```bash
pnpm server
```

From the server folder:

```bash
pnpm start:dev
```

### Running both client and server at the same time

To run the client and the server at the same time, run the command on the root directory

```bash
pnpm dev
```

This will start up both the frontend and the backend servers

## Contributing

Feel free to request a PR or raise issues

**Built by teens for teens**
