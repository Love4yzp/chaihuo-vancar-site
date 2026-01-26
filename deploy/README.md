# Chaihuo MCV Site - Deployment Guide

This guide covers deploying the Chaihuo MCV website to a VPS using Docker Compose and Jenkins CI/CD automation.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [VPS Setup](#vps-setup)
3. [Jenkins Configuration](#jenkins-configuration)
4. [GitHub Webhook Setup](#github-webhook-setup)
5. [Manual Deployment (Fallback)](#manual-deployment-fallback)
6. [Verification](#verification)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure your VPS has the following installed and running:

### 1. Docker & Docker Compose

**Install Docker** (Ubuntu/Debian example):
```bash
# Update package manager
sudo apt-get update

# Install Docker
sudo apt-get install -y docker.io

# Start Docker daemon
sudo systemctl start docker
sudo systemctl enable docker  # Auto-start on boot

# Add your user to docker group (avoid sudo for docker commands)
sudo usermod -aG docker $USER
# Log out and log back in for group changes to take effect
```

**Install Docker Compose** (latest version):
```bash
# Option 1: Docker Compose v2 (built into Docker 20.10+)
docker --version  # Should be 20.10 or higher
# Use as: docker compose <command>

# Option 2: Standalone docker-compose binary
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version  # Verify installation
```

### 2. Jenkins (Optional but Recommended)

**Install Jenkins** (Ubuntu/Debian):
```bash
# Add Jenkins repository
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null
echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/" | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null

# Install Jenkins
sudo apt-get update
sudo apt-get install -y jenkins

# Start Jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins

# Get initial admin password
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

Jenkins will be accessible at `http://your-vps-ip:8080`

**Required Jenkins Plugins:**
- GitHub (for webhook integration)
- Pipeline (declarative pipeline support)
- Docker Pipeline (optional, for enhanced Docker support)

Install plugins via Jenkins UI:
1. Go to **Manage Jenkins** → **Manage Plugins**
2. Search for "GitHub" and "Pipeline"
3. Click **Install** and restart Jenkins

### 3. Nginx (Optional - for reverse proxy)

**Install Nginx**:
```bash
sudo apt-get install -y nginx

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

**Basic Nginx Configuration** (reverse proxy to port 3000):

Create `/etc/nginx/sites-available/chaihuo-mcv`:
```nginx
server {
    listen 80;
    server_name your-domain.com;  # Replace with your domain

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/chaihuo-mcv /etc/nginx/sites-enabled/
sudo nginx -t  # Test configuration
sudo systemctl reload nginx
```

---

## VPS Setup

### Step 1: Create Deployment Directory

```bash
# Create the deployment directory
sudo mkdir -p /opt/chaihuo-mcv

# Set appropriate permissions (use your user or jenkins user)
sudo chown $(whoami):$(whoami) /opt/chaihuo-mcv
chmod 755 /opt/chaihuo-mcv
```

### Step 2: Copy Deployment Files

Copy these files from the repository to the VPS:

```bash
# Copy docker-compose.yml
scp deploy/docker-compose.yml user@your-vps:/opt/chaihuo-mcv/

# Copy deploy.sh (deployment fallback script)
scp deploy/deploy.sh user@your-vps:/opt/chaihuo-mcv/
```

Make the script executable:
```bash
ssh user@your-vps
cd /opt/chaihuo-mcv
chmod +x deploy.sh
ls -la  # Should show: docker-compose.yml and deploy.sh
```

### Step 3: Verify Docker Access

Ensure you can pull images from GitHub Container Registry (GHCR):

```bash
# If using a private registry or requiring auth, configure Docker login
docker login ghcr.io
# Enter your GitHub Personal Access Token when prompted

# Test the image pull
docker pull ghcr.io/chaihuo-makerspace/chaihuo-mcv-site:latest
```

### Step 4: Initial Deployment Test

```bash
cd /opt/chaihuo-mcv

# Pull the latest image
docker-compose pull

# Start the container
docker-compose up -d

# Verify it's running
docker-compose ps
docker-compose logs chaihuo-mcv-site
```

Expected output in logs:
```
Starting chaihuo-mcv-site...
...
Server running on port 3000
```

Visit `http://your-vps-ip:3000` in your browser. You should see the Chaihuo MCV website.

---

## Jenkins Configuration

### Step 1: Create a New Pipeline Job

1. Go to Jenkins Dashboard: `http://your-jenkins:8080`
2. Click **New Item**
3. Enter job name: `chaihuo-mcv-deploy`
4. Select **Pipeline** and click **OK**

### Step 2: Configure Job Parameters

In the Pipeline job configuration:

1. **Check**: Enable **"This project is parameterized"**
2. **Add Parameter**: String Parameter
   - Name: `DEPLOY_PATH`
   - Default Value: `/opt/chaihuo-mcv`
   - Description: `Deployment directory path on VPS`

### Step 3: Configure Pipeline Source

Under **Pipeline** section:

- **Definition**: Select **"Pipeline script from SCM"**
- **SCM**: Select **Git**
- **Repository URL**: `https://github.com/Chaihuo-Makerspace/chaihuo-mcv-site.git`
- **Branch**: `*/main`
- **Script Path**: `deploy/Jenkinsfile`

This tells Jenkins to use the `Jenkinsfile` from the `deploy/` directory.

### Step 4: Configure Build Triggers

Under **Build Triggers** section:

1. **Check**: **GitHub hook trigger for GITScm polling**
   - This enables webhook-based triggers (configured in GitHub next)

### Step 5: Save and Test

1. Click **Save**
2. Click **Build Now** to test the pipeline
3. Check the console output for any errors

---

## GitHub Webhook Setup

### Step 1: Generate Jenkins Webhook URL

The webhook URL format is:
```
http://your-jenkins:8080/github-webhook/
```

Replace `your-jenkins` with your actual Jenkins server IP or hostname.

Example: `http://192.168.1.100:8080/github-webhook/`

### Step 2: Configure Webhook in GitHub Repository

1. Go to your GitHub repository: `https://github.com/Chaihuo-Makerspace/chaihuo-mcv-site`
2. Navigate to **Settings** → **Webhooks**
3. Click **Add webhook**
4. Fill in the webhook details:

   | Field | Value |
   |-------|-------|
   | **Payload URL** | `http://your-jenkins:8080/github-webhook/` |
   | **Content type** | `application/json` |
   | **Events** | Select **"Just the push event"** |
   | **Active** | ✓ Check this box |

5. Click **Add webhook**

### Step 3: Test the Webhook

1. In GitHub, go to the webhook you just created
2. Scroll down and click **Recent Deliveries**
3. Look for recent delivery attempts
4. Click on a delivery to see the response
5. Expected response: Status `200` (success)

### Step 4: Test Full Pipeline

Trigger the pipeline by pushing code to `main` branch:

```bash
# Make a test commit
echo "# Updated" >> README.md
git add README.md
git commit -m "Test deployment trigger"
git push origin main
```

1. GitHub sends webhook to Jenkins
2. Jenkins automatically runs the `chaihuo-mcv-deploy` job
3. Check Jenkins console for deployment logs

---

## Manual Deployment (Fallback)

If Jenkins is down or you need to deploy manually, use the `deploy.sh` script:

### Quick Deploy

```bash
cd /opt/chaihuo-mcv
./deploy.sh
```

The script will:
1. Check for concurrent deployments (lock file mechanism)
2. Pull the latest image from GHCR
3. Restart the container with `docker-compose up -d`
4. Verify the container is healthy
5. Clean up old images

### Alternative: Direct Docker Compose Commands

```bash
cd /opt/chaihuo-mcv

# Pull latest image
docker-compose pull

# Start/restart container
docker-compose up -d

# View logs
docker-compose logs -f chaihuo-mcv-site

# Stop container
docker-compose down

# Clean up old images
docker image prune -f
```

### Deploy to Different Directory

If you need to deploy to a non-default location:

```bash
# Option 1: Jenkins parameter override
# In Jenkins UI, click "Build with Parameters" and change DEPLOY_PATH

# Option 2: Manual deployment to different path
cp deploy/docker-compose.yml /custom/path/
cp deploy/deploy.sh /custom/path/
chmod +x /custom/path/deploy.sh
cd /custom/path
./deploy.sh
```

---

## Verification

### Check Deployment Status

```bash
# View container status
docker-compose -f /opt/chaihuo-mcv/docker-compose.yml ps

# Expected output:
# NAME                   STATUS       PORTS
# chaihuo-mcv-site      Up (healthy) 0.0.0.0:3000->3000/tcp
```

### Verify Application Health

```bash
# Check if application responds
curl http://localhost:3000

# Should return HTML content of the website

# Or via Nginx (if configured)
curl http://your-domain.com
```

### View Deployment Logs

```bash
# Latest logs
docker-compose -f /opt/chaihuo-mcv/docker-compose.yml logs chaihuo-mcv-site

# Follow logs in real-time
docker-compose -f /opt/chaihuo-mcv/docker-compose.yml logs -f chaihuo-mcv-site

# View Jenkins deployment logs
# Go to Jenkins UI → Job → Latest Build → Console Output
```

### Check Docker Image

```bash
# List local images
docker images | grep chaihuo-mcv-site

# View image metadata
docker inspect ghcr.io/chaihuo-makerspace/chaihuo-mcv-site:latest
```

---

## Troubleshooting

### Issue 1: "docker-compose: command not found"

**Cause**: Docker Compose not installed.

**Solution**:
```bash
# Check if docker-compose is installed
which docker-compose
docker-compose --version

# If not found, install it
sudo apt-get install -y docker-compose

# Or use Docker Compose v2 (built into Docker)
docker compose version
```

Update `Jenkinsfile` if using `docker compose` (v2) instead:
```groovy
sh 'docker compose pull'  // Instead of 'docker-compose pull'
```

### Issue 2: "Permission denied" when running docker

**Cause**: Jenkins user not in docker group.

**Solution**:
```bash
# Add Jenkins user to docker group
sudo usermod -aG docker jenkins

# Restart Jenkins
sudo systemctl restart jenkins

# Verify
sudo -u jenkins docker ps  # Should work without sudo
```

### Issue 3: "Image pull failed" or "Unable to find image"

**Cause**: Authentication issue with GHCR or network connectivity.

**Solution**:
```bash
# Verify internet connectivity
ping github.com

# Test Docker login
docker login ghcr.io
# Use your GitHub username and Personal Access Token

# Or use Docker credentials helper:
# https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry

# Test pulling manually
docker pull ghcr.io/chaihuo-makerspace/chaihuo-mcv-site:latest
```

If Jenkins needs credentials, configure them:
1. Go to Jenkins → **Manage Jenkins** → **Manage Credentials**
2. Create credential (Username + Token)
3. Reference in pipeline if needed

### Issue 4: Container exits immediately or fails health check

**Cause**: Application errors or port conflicts.

**Solution**:
```bash
# Check logs for errors
docker-compose -f /opt/chaihuo-mcv/docker-compose.yml logs chaihuo-mcv-site

# Check if port 3000 is in use
sudo netstat -tlnp | grep 3000
sudo lsof -i :3000

# If port is in use, either:
# 1. Stop the other service, or
# 2. Modify docker-compose.yml port mapping

# Restart container with verbose output
docker-compose -f /opt/chaihuo-mcv/docker-compose.yml up chaihuo-mcv-site
```

### Issue 5: Webhook not triggering Jenkins

**Cause**: Webhook URL incorrect, Jenkins not accessible, or GitHub event not matching.

**Solution**:
```bash
# 1. Verify Jenkins webhook URL is correct
echo "Expected: http://your-jenkins:8080/github-webhook/"

# 2. Test connectivity from GitHub
curl -I http://your-jenkins:8080/github-webhook/
# Should return HTTP 200 or 302

# 3. Check GitHub webhook deliveries
# Go to GitHub Settings → Webhooks → Select webhook → Recent Deliveries
# Look for response status and error messages

# 4. Verify Jenkins GitHub plugin is installed
# Go to Jenkins → Manage Jenkins → Manage Plugins
# Search for "GitHub" plugin

# 5. Check event type in GitHub webhook settings
# Ensure "Push events" is selected
```

### Issue 6: Stale lock file prevents deployment

**Cause**: Previous deployment crashed or timed out.

**Solution**:
```bash
# The deploy.sh script has a 300-second (5 minute) timeout for lock files
# If a deployment is stuck:

# Remove stale lock file manually
rm -f /tmp/chaihuo-deploy.lock

# Then retry deployment
./deploy.sh
```

### Issue 7: Deployment succeeds but website not loading

**Cause**: Nginx not configured, firewall blocking port, or DNS issues.

**Solution**:
```bash
# 1. Verify container is running
docker-compose -f /opt/chaihuo-mcv/docker-compose.yml ps

# 2. Test locally on VPS
curl http://localhost:3000

# 3. Check Nginx configuration (if using proxy)
sudo nginx -t
sudo systemctl status nginx

# 4. Check firewall
sudo ufw status
sudo ufw allow 80/tcp
sudo ufw allow 3000/tcp

# 5. Verify DNS (if using domain)
nslookup your-domain.com
```

### Issue 8: Jenkins job can't find deploy.sh

**Cause**: Script not copied to VPS or wrong permissions.

**Solution**:
```bash
# On VPS, verify files exist
ls -la /opt/chaihuo-mcv/

# Should show:
# -rw-r--r-- docker-compose.yml
# -rwxr-xr-x deploy.sh  (executable)

# If not executable, fix it
chmod +x /opt/chaihuo-mcv/deploy.sh

# Verify Jenkins can access it
sudo -u jenkins ls -la /opt/chaihuo-mcv/
```

---

## Quick Reference

### Deployment Workflows

**Automatic (via GitHub webhook):**
```
Code push to main → GitHub webhook → Jenkins → deploy.sh → Container restarted
```

**Manual (Jenkins UI):**
```
Jenkins → Build with Parameters → deploy.sh → Container restarted
```

**Emergency fallback (SSH):**
```
SSH to VPS → cd /opt/chaihuo-mcv → ./deploy.sh → Container restarted
```

### Common Commands

```bash
# Deploy
cd /opt/chaihuo-mcv && ./deploy.sh

# View status
docker-compose -f /opt/chaihuo-mcv/docker-compose.yml ps

# View logs
docker-compose -f /opt/chaihuo-mcv/docker-compose.yml logs -f

# Manual restart
cd /opt/chaihuo-mcv && docker-compose down && docker-compose up -d

# Pull latest image manually
docker pull ghcr.io/chaihuo-makerspace/chaihuo-mcv-site:latest
```

---

## Support & Next Steps

- **GitHub Actions**: Builds and pushes images to GHCR (see `.github/workflows/deploy.yml`)
- **Jenkins**: Orchestrates deployment on VPS (see `deploy/Jenkinsfile`)
- **Docker Compose**: Runs the container (see `deploy/docker-compose.yml`)
- **deploy.sh**: Fallback script with health checks and logging

For issues or questions, check the **Troubleshooting** section above.
