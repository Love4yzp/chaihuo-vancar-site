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
cd /opt/chaihuo-mcv/deploy
./deploy.sh
```

The script will:
1. `git pull` latest code
2. `docker-compose up -d --build` (build & start)
3. Verify container health

## Manual Commands

```bash
cd /opt/chaihuo-mcv/deploy

docker-compose up -d --build   # Build and start
docker-compose logs -f         # View logs
docker-compose down            # Stop
docker-compose ps              # Status
```

## Verify

```bash
curl http://localhost:3000
```
