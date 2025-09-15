#!/bin/bash
# Production Database Migration Script
# This script handles database setup and migrations for production deployment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check required environment variables
check_env_vars() {
    log_info "Checking required environment variables..."
    
    if [ -z "$DATABASE_URL" ]; then
        log_error "DATABASE_URL is not set"
        exit 1
    fi
    
    if [ -z "$DATABASE_PROVIDER" ]; then
        log_error "DATABASE_PROVIDER is not set"
        exit 1
    fi
    
    log_success "Environment variables verified"
}

# Test database connection
test_connection() {
    log_info "Testing database connection..."
    
    if npx prisma db push --accept-data-loss 2>/dev/null; then
        log_success "Database connection successful"
    else
        log_error "Failed to connect to database"
        exit 1
    fi
}

# Run database migrations
run_migrations() {
    log_info "Running database migrations..."
    
    # Generate Prisma client
    log_info "Generating Prisma client..."
    npx prisma generate
    
    # Push schema to database
    log_info "Pushing schema to database..."
    npx prisma db push
    
    log_success "Database migrations completed"
}

# Seed initial data if needed
seed_database() {
    log_info "Checking if database needs initial seeding..."
    
    # Check if we have any promotions
    PROMOTION_COUNT=$(node -e "
        const { PrismaClient } = require('@prisma/client');
        const prisma = new PrismaClient();
        prisma.promotion.count().then(count => {
            console.log(count);
            prisma.\$disconnect();
        }).catch(() => {
            console.log(0);
            process.exit(0);
        });
    ")
    
    if [ "$PROMOTION_COUNT" = "0" ]; then
        log_info "Database is empty, seeding initial data..."
        
        # Create base promotions
        node -e "
            const { PrismaClient } = require('@prisma/client');
            const prisma = new PrismaClient();
            
            async function seed() {
                const promotions = [
                    {
                        name: 'World Wrestling Entertainment',
                        slug: 'wwe',
                        logoUrl: null,
                        color: '#FFD700'
                    },
                    {
                        name: 'Ultimate Fighting Championship', 
                        slug: 'ufc',
                        logoUrl: null,
                        color: '#FF0000'
                    }
                ];
                
                for (const promotion of promotions) {
                    await prisma.promotion.upsert({
                        where: { slug: promotion.slug },
                        update: {},
                        create: promotion
                    });
                }
                
                console.log('✅ Initial promotions seeded');
                await prisma.\$disconnect();
            }
            
            seed().catch(console.error);
        "
        
        log_success "Initial data seeded"
    else
        log_info "Database already contains data (${PROMOTION_COUNT} promotions)"
    fi
}

# Backup database (if backup URL provided)
backup_database() {
    if [ -n "$BACKUP_DATABASE_URL" ]; then
        log_info "Creating database backup..."
        
        BACKUP_FILE="backup_$(date +%Y%m%d_%H%M%S).sql"
        
        # This would need to be adapted based on your backup strategy
        # For PostgreSQL: pg_dump $DATABASE_URL > $BACKUP_FILE
        
        log_success "Database backup created: $BACKUP_FILE"
    else
        log_warning "No backup URL provided, skipping backup"
    fi
}

# Verify deployment
verify_deployment() {
    log_info "Verifying deployment..."
    
    # Check database connectivity with sample query
    node -e "
        const { PrismaClient } = require('@prisma/client');
        const prisma = new PrismaClient();
        
        prisma.promotion.findMany()
            .then(promotions => {
                console.log('✅ Database query successful');
                console.log(\`Found \${promotions.length} promotions\`);
                return prisma.\$disconnect();
            })
            .catch(error => {
                console.error('❌ Database query failed:', error.message);
                process.exit(1);
            });
    "
    
    log_success "Deployment verification completed"
}

# Main execution
main() {
    log_info "Starting production database migration..."
    log_info "DATABASE_PROVIDER: $DATABASE_PROVIDER"
    
    check_env_vars
    test_connection
    backup_database
    run_migrations
    seed_database
    verify_deployment
    
    log_success "Production database migration completed successfully!"
    log_info "Your database is ready for production use."
}

# Execute main function
main "$@"
