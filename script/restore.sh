#!/bin/bash
set -e

# --- Configuration ---
DB_HOST="${DB_CONTAINER_NAME}"       
DB_USER="${POSTGRES_USER}"
DB_PASS="${POSTGRES_PASSWORD}"
DB_NAME="${POSTGRES_DB}"
BACKUP_DIR="backup"

# --- Locate latest backup file ---
LATEST_BACKUP=$(ls -t "$BACKUP_DIR"/backup_*.sql.gz 2>/dev/null | head -n 1)
if [ -z "$LATEST_BACKUP" ]; then
    echo "[ERROR] No backup file found in $BACKUP_DIR"
    exit 1
fi

echo "[INFO] Found latest backup: $LATEST_BACKUP"

# --- Export password for non-interactive access ---
export PGPASSWORD="$DB_PASS"

# --- Terminate active connections ---
echo "[INFO] Terminating active connections on $DB_NAME..."
psql -h "$DB_HOST" -U "$DB_USER" -d postgres -c \
"SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '$DB_NAME';"

# --- Drop and recreate database ---
echo "[INFO] Dropping and recreating database: $DB_NAME..."
psql -h "$DB_HOST" -U "$DB_USER" -d postgres -v ON_ERROR_STOP=1 <<SQL
DROP DATABASE IF EXISTS "$DB_NAME";
CREATE DATABASE "$DB_NAME";
SQL

# --- Restore database from latest backup ---
echo "[INFO] Restoring database from backup..."
gunzip -c "$LATEST_BACKUP" | psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" --single-transaction

echo "[SUCCESS] Database restore completed successfully!"
