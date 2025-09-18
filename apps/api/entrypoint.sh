#!/bin/sh
# entrypoint.sh

# Run Prisma migrations
pnpm prisma generate
pnpm prisma migrate deploy  # use migrate dev in dev mode

# Start the NestJS server
pnpm start:dev
