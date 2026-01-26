#!/bin/bash

# Chaihuo MCV Site - Docker Compose Deployment Script
# Purpose: Pull latest image, restart container, and clean up old images
# Features: Lock file mechanism to prevent concurrent deploys, timestamped logging

set -euo pipefail

# Configuration
LOCK_FILE="/tmp/chaihuo-deploy.lock"
LOCK_TIMEOUT=300  # 5 minutes timeout for stale locks
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Color codes for logging (optional, for readability)
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging function with timestamp
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

log_error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}" >&2
}

log_success() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')] SUCCESS: $1${NC}"
}

# Cleanup function to be called on exit
cleanup() {
    local exit_code=$?
    if [ -f "$LOCK_FILE" ]; then
        rm -f "$LOCK_FILE"
        log "Lock file removed"
    fi
    if [ $exit_code -eq 0 ]; then
        log_success "Deployment completed successfully"
    else
        log_error "Deployment failed with exit code $exit_code"
    fi
    exit $exit_code
}

# Trap EXIT to ensure lock file cleanup
trap cleanup EXIT

# Check if lock file exists and is stale
if [ -f "$LOCK_FILE" ]; then
    lock_age=$(($(date +%s) - $(stat -f%m "$LOCK_FILE" 2>/dev/null || stat -c%Y "$LOCK_FILE")))
    if [ "$lock_age" -lt "$LOCK_TIMEOUT" ]; then
        log_error "Another deployment is in progress (lock file exists and is recent)"
        exit 1
    else
        log "Removing stale lock file (older than $LOCK_TIMEOUT seconds)"
        rm -f "$LOCK_FILE"
    fi
fi

# Create lock file
touch "$LOCK_FILE"
log "Lock file created at $LOCK_FILE"

# Change to script directory
cd "$SCRIPT_DIR"
log "Changed to deploy directory: $SCRIPT_DIR"

# Pull latest image
log "Starting docker-compose pull..."
if docker-compose pull; then
    log_success "Image pull completed"
else
    log_error "Failed to pull image"
    exit 1
fi

# Restart container with detached mode
log "Starting docker-compose up -d..."
if docker-compose up -d; then
    log_success "Container started/restarted"
else
    log_error "Failed to start container"
    exit 1
fi

# Wait for container to be healthy (optional, gives time for healthcheck)
log "Waiting for container to stabilize..."
sleep 5

# Verify container is running
if docker-compose ps | grep -q "chaihuo-mcv-site.*Up"; then
    log_success "Container is running and healthy"
else
    log_error "Container failed to start or become healthy"
    exit 1
fi

# Clean up old/dangling images
log "Cleaning up old images with docker image prune..."
if docker image prune -f; then
    log_success "Image cleanup completed"
else
    log_error "Failed to clean up images (but deployment may still be successful)"
    # Don't exit here - image prune failure shouldn't block deployment
fi

log "Deployment pipeline completed successfully"
exit 0
