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
make docker-dev-up
```
