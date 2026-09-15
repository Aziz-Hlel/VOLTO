# [VOLTO]

Including server, admin dashboard and main website

> **Note on Architecture:** This project operates as a **structural repo**. Each component inside `apps/` is an independent application with its own isolated dependencies and environment. There are no shared workspace tools.

## Prerequisites

Tools you need installed before running:

- **Docker Desktop** (with WSL 2 integration enabled)
- **Make**

## Environment Variables

An env file `config/.env.dev` is provided for development.

## Install Make

To install make if not installed on Ubuntu/Debian:

```bash
sudo apt update
sudo apt install make -y
```

## How to run

Open WSL and run the following command:

```bash
make docker-infra-up
```

afterwards run apps locally using for backend :

```bash
cd apps/api

pnpm run start:dev
```

and for frontend:

```bash
cd apps/web

pnpm run dev
```

and admin dashboard:

```bash
cd apps/admin

pnpm run dev
```

## How Seed Data

cd to api folder
run `npx ts-node .\src\seed\seed.ts`

### Some technical decisions :

- why i stopped using cuid and migrated to uuid for new tables : because cuid and prisma fcking sucks, this ofrmat doesnt have a validator by default and prisma now recommending cuid2, like aight fck this shit , it s just better to stick with standards and use uuid rather than dealing with this shit
