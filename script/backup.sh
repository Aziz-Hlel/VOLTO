#!/bin/bash
set -e

# --- Configurable Variables ---
RETENTION_DAYS=7   # 🧹 Delete backups older than this many days
BACKUP_DIR="backup"
DB_HOST="${DB_CONTAINER_NAME:-db}"
DB_USER="${POSTGRES_USER}"
DB_PASS="${POSTGRES_PASSWORD}"
DB_NAME="${POSTGRES_DB}"


#  Validation
: "${DB_HOST:?Missing DB_HOST}"
: "${DB_USER:?Missing DB_USER}"
: "${DB_NAME:?Missing DB_NAME}"
: "${DB_PASS:?Missing DB_PASS}"


# --- Derived values ---
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/backup_${TIMESTAMP}.sql"
BACKUP_COMPRESSED="$BACKUP_FILE.gz"

# --- Ensure backup directory exists ---
mkdir -p "$BACKUP_DIR"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] 🚀 Starting database backup..."

# --- Export password for non-interactive access ---
export PGPASSWORD="$DB_PASS"

# --- Create backup with gzip compression ---
if pg_dump -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" \
    --verbose \
    --format=plain \
    | gzip > "$BACKUP_COMPRESSED"; then

    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✅ Backup completed: $BACKUP_COMPRESSED"
    
    # Log backup size
    SIZE=$(du -h "$BACKUP_COMPRESSED" | cut -f1)
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] 📦 Backup size: $SIZE"
    
    # --- Cleanup old backups ---
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] 🧹 Deleting backups older than $RETENTION_DAYS days..."
    find "$BACKUP_DIR" -name "backup_${DB_NAME}_*.sql.gz" -type f -mtime +$RETENTION_DAYS -print -delete
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] 🧾 Cleanup complete."
else
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ❌ ERROR: Backup failed!"
    exit 1
fi
