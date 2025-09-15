# Production Deployment Runbook

This document provides comprehensive instructions for deploying Whowaschamp to production.

## Prerequisites

- Docker and Docker Compose installed
- PostgreSQL database available (local or hosted)
- Domain name configured (optional)
- SSL certificates (optional, for HTTPS)

## Quick Start

1. **Clone and Configure**
   ```bash
   git clone <repository-url>
   cd whowaschamp
   cp .env.production.example .env.production
   ```

2. **Configure Environment**
   Edit `.env.production` with your production values:
   ```bash
   # Required
   DATABASE_URL=postgresql://user:pass@host:5432/dbname
   DB_PASSWORD=your_secure_password
   APP_URL=https://your-domain.com
   
   # Optional
   REDIS_PASSWORD=your_redis_password
   ```

3. **Deploy with Docker Compose**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

4. **Run Database Migrations**
   ```bash
   docker-compose -f docker-compose.prod.yml exec app ./scripts/deploy/migrate-db.sh
   ```

5. **Verify Deployment**
   ```bash
   curl http://localhost:3000/api/health
   ```

## Detailed Setup

### 1. Environment Configuration

#### Required Variables
```bash
# Database
DATABASE_URL=postgresql://username:password@host:port/database
DATABASE_PROVIDER=postgresql

# Application
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Feature Flags
FEATURES_PPV_FLASHBACK=true
FEATURES_ENHANCED_ON_THIS_DAY=true
```

#### Optional Variables
```bash
# ETL Configuration
RATE_LIMIT_DELAY_MS=2000
ETL_CACHE_DIR=/app/.cache
ETL_MAX_RETRIES=3
ETL_TIMEOUT_MS=30000

# Monitoring
LOG_LEVEL=info
SENTRY_DSN=your_sentry_dsn

# Caching
REDIS_URL=redis://localhost:6379
CACHE_TTL_SECONDS=43200

# Security
ALLOWED_ORIGINS=https://your-domain.com
API_RATE_LIMIT=100
```

### 2. Database Setup

#### PostgreSQL Configuration
```sql
-- Create database and user
CREATE DATABASE whowaschamp_prod;
CREATE USER whowaschamp WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE whowaschamp_prod TO whowaschamp;

-- Enable required extensions
\c whowaschamp_prod;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

#### Migration Commands
```bash
# Run migrations
./scripts/deploy/migrate-db.sh

# Verify database
npx prisma studio --browser=none --port=5555
```

### 3. ETL Data Loading

#### Initial Data Load
```bash
# Load sample data (development/testing)
./scripts/deploy/run-etl.sh all incremental

# Full Wikipedia scraping (production)
# Note: This will be implemented in next phase
./scripts/deploy/run-etl.sh all full
```

#### Scheduled ETL Jobs
```bash
# Setup cron jobs for automated ETL
crontab -e

# Add these lines:
# Daily incremental update at 2 AM UTC
0 2 * * * /path/to/project/scripts/deploy/run-etl.sh all incremental

# Weekly full sync on Sundays at 3 AM UTC  
0 3 * * 0 /path/to/project/scripts/deploy/run-etl.sh all full

# Daily log cleanup
0 4 * * * /path/to/project/scripts/deploy/run-etl.sh cleanup 30
```

## Monitoring and Maintenance

### Health Checks

#### API Health Check
```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "responseTime": 45,
  "system": {
    "uptime": 3600,
    "nodeVersion": "v18.19.0",
    "environment": "production"
  },
  "database": {
    "status": "healthy",
    "responseTime": 23,
    "promotions": 2,
    "totalEvents": 1500,
    "recentUpdates": 45
  }
}
```

#### ETL Health Check
```bash
./scripts/deploy/run-etl.sh health
```

### Log Management

#### View Logs
```bash
# Application logs
docker-compose -f docker-compose.prod.yml logs -f app

# ETL logs
tail -f logs/etl/ufc_*.log
tail -f logs/etl/wwe_*.log

# Database logs
docker-compose -f docker-compose.prod.yml logs -f db
```

#### Log Rotation
```bash
# Clean old logs (default: 30 days)
./scripts/deploy/run-etl.sh cleanup

# Clean logs older than 7 days
./scripts/deploy/run-etl.sh cleanup 7
```

### Database Maintenance

#### Backup
```bash
# Create backup
docker-compose -f docker-compose.prod.yml exec db pg_dump -U whowaschamp whowaschamp_prod > backup_$(date +%Y%m%d).sql

# Restore from backup
docker-compose -f docker-compose.prod.yml exec -T db psql -U whowaschamp whowaschamp_prod < backup_20240101.sql
```

#### Performance Monitoring
```bash
# Check database size
docker-compose -f docker-compose.prod.yml exec db psql -U whowaschamp -d whowaschamp_prod -c "
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(tablename::regclass)) as size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(tablename::regclass) DESC;
"

# Check query performance
docker-compose -f docker-compose.prod.yml exec db psql -U whowaschamp -d whowaschamp_prod -c "
SELECT query, calls, total_time, mean_time 
FROM pg_stat_statements 
ORDER BY total_time DESC 
LIMIT 10;
"
```

## Scaling and Performance

### Horizontal Scaling

#### Multiple App Instances
```yaml
# In docker-compose.prod.yml
services:
  app:
    deploy:
      replicas: 3
    # ... other config
```

#### Load Balancer Configuration
```nginx
# nginx.conf
upstream whowaschamp_backend {
    server app:3000;
    server app2:3000;
    server app3:3000;
}
```

### Caching Configuration

#### Redis Setup
```bash
# Enable Redis caching
REDIS_URL=redis://redis:6379
CACHE_TTL_SECONDS=43200
```

#### CDN Integration
- Configure CloudFlare or similar CDN
- Cache static assets and API responses
- Set appropriate cache headers

## Security

### Environment Security
```bash
# Set secure file permissions
chmod 600 .env.production
chmod +x scripts/deploy/*.sh

# Use Docker secrets for sensitive data
echo "secure_password" | docker secret create db_password -
```

### Database Security
```sql
-- Revoke public access
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT USAGE ON SCHEMA public TO whowaschamp;

-- Create read-only user for monitoring
CREATE USER monitor WITH PASSWORD 'monitor_password';
GRANT CONNECT ON DATABASE whowaschamp_prod TO monitor;
GRANT USAGE ON SCHEMA public TO monitor;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO monitor;
```

## Troubleshooting

### Common Issues

#### Database Connection Failed
```bash
# Check database connectivity
docker-compose -f docker-compose.prod.yml exec app npx prisma db push

# Check database logs
docker-compose -f docker-compose.prod.yml logs db

# Restart database
docker-compose -f docker-compose.prod.yml restart db
```

#### ETL Process Stuck
```bash
# Check for lock files
ls -la /tmp/whowaschamp-etl/

# Remove stale locks
rm -f /tmp/whowaschamp-etl/*.lock

# Check ETL logs
tail -f logs/etl/ufc_*.log
```

#### High Memory Usage
```bash
# Check container stats
docker stats

# Check Node.js memory usage
docker-compose -f docker-compose.prod.yml exec app node -e "console.log(process.memoryUsage())"

# Restart application
docker-compose -f docker-compose.prod.yml restart app
```

### Emergency Procedures

#### Service Restart
```bash
# Restart all services
docker-compose -f docker-compose.prod.yml restart

# Restart specific service
docker-compose -f docker-compose.prod.yml restart app
```

#### Rollback Deployment
```bash
# Stop current deployment
docker-compose -f docker-compose.prod.yml down

# Restore from backup
docker-compose -f docker-compose.prod.yml exec -T db psql -U whowaschamp whowaschamp_prod < backup_previous.sql

# Deploy previous version
git checkout previous-tag
docker-compose -f docker-compose.prod.yml up -d
```

#### Maintenance Mode
```bash
# Enable maintenance mode
echo 'MAINTENANCE_MODE=true' >> .env.production
docker-compose -f docker-compose.prod.yml restart app

# Disable maintenance mode  
sed -i '/MAINTENANCE_MODE=true/d' .env.production
docker-compose -f docker-compose.prod.yml restart app
```

## Performance Monitoring

### Key Metrics to Monitor
- API response times
- Database query performance
- ETL job completion times
- Memory and CPU usage
- Error rates

### Monitoring Tools
- Health check endpoint: `/api/health`
- Docker stats: `docker stats`
- Database monitoring: PostgreSQL logs and pg_stat_statements
- Application logs: Docker logs

### Alerting Thresholds
- API response time > 1000ms
- Database connection failures
- ETL job failures
- Memory usage > 80%
- Disk space < 10% free

## Support

### Log Locations
- Application logs: Docker container logs
- ETL logs: `logs/etl/`
- Database logs: PostgreSQL container logs
- System logs: `/var/log/` (host system)

### Debug Commands
```bash
# Check system status
./scripts/deploy/run-etl.sh health

# Test API endpoints
curl http://localhost:3000/api/events/on-this-day?month=4&day=6
curl http://localhost:3000/api/events/ppv-flashback?weekOf=2016-07-09

# Database query test
docker-compose -f docker-compose.prod.yml exec db psql -U whowaschamp -d whowaschamp_prod -c "SELECT COUNT(*) FROM events;"
```
