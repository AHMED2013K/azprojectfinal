#!/usr/bin/env sh
set -eu

: "${MONGODB_URI:?MONGODB_URI is required}"

BACKUP_DIR="${BACKUP_DIR:-/backups/mongo}"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"

mkdir -p "$BACKUP_DIR"
mongodump --uri="$MONGODB_URI" --gzip --archive="$BACKUP_DIR/edugrowth-crm-$TIMESTAMP.archive.gz"
find "$BACKUP_DIR" -type f -name 'edugrowth-crm-*.archive.gz' -mtime +14 -delete
