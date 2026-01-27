# VPS Deployment

Local build deployment for Chaihuo MCV website.

## Setup (First Time)

```bash
# Clone repo on VPS
git clone https://github.com/Chaihuo-Makerspace/chaihuo-mcv-site.git /opt/chaihuo-mcv
cd /opt/chaihuo-mcv/deploy
chmod +x deploy.sh
```

## Deploy

```bash
cd /opt/chaihuo-mcv

# 1. Pull latest code (你自己控制)
git pull

# 2. Deploy with Docker (脚本只负责这个)
./deploy/deploy.sh
```

The deploy script will:

1. Build Docker image from current code
2. Start/restart container
3. Verify container health
4. Clean up old images

## Manual Commands

```bash
cd /opt/chaihuo-mcv/deploy

docker compose up -d --build   # Build and start
docker compose logs -f         # View logs
docker compose down            # Stop
docker compose ps              # Status
docker compose restart         # Restart without rebuild
```

## Verify

```bash
curl http://localhost:3000
```
