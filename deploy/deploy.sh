#!/bin/bash
set -euo pipefail

LOCK_FILE="/tmp/chaihuo-deploy.lock"
LOCK_TIMEOUT=300
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="$(dirname "$SCRIPT_DIR")"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"; }

cleanup() {
    rm -f "$LOCK_FILE"
    [ $? -eq 0 ] && log "Done" || log "Failed"
}
trap cleanup EXIT

if [ -f "$LOCK_FILE" ]; then
    lock_age=$(($(date +%s) - $(stat -f%m "$LOCK_FILE" 2>/dev/null || stat -c%Y "$LOCK_FILE")))
    [ "$lock_age" -lt "$LOCK_TIMEOUT" ] && { log "Another deployment in progress"; exit 1; }
    rm -f "$LOCK_FILE"
fi
touch "$LOCK_FILE"

cd "$REPO_DIR"
log "Pulling latest code..."
git pull --ff-only || { log "Git pull failed"; exit 1; }

cd "$SCRIPT_DIR"
log "Building and starting container..."
docker-compose up -d --build || { log "Docker failed"; exit 1; }

sleep 3
docker-compose ps | grep -q "chaihuo-mcv-site.*Up" || { log "Container not healthy"; exit 1; }
docker image prune -f >/dev/null 2>&1 || true
log "Container is running on port 3000"
