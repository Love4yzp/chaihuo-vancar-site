#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"; }

cd "$SCRIPT_DIR"

log "Stopping existing container..."
docker-compose down --remove-orphans 2>/dev/null || true
docker rm -f chaihuo-mcv-site 2>/dev/null || true

log "Building and starting container..."
docker-compose up -d --build || { log "Docker build failed"; exit 1; }

sleep 3

if ! docker ps --filter "name=chaihuo-mcv-site" --filter "status=running" -q | grep -q .; then
    log "Container not running"
    docker-compose logs --tail=50 chaihuo-mcv-site
    exit 1
fi

log "Cleaning up old images..."
docker image prune -f > /dev/null 2>&1 || true

log "✓ Container is running on port 3000"

