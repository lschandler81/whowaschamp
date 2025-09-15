#!/bin/bash
# Production ETL Runner
# Handles running ETL processes in production with proper error handling and logging

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')] [INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')] [SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')] [WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] [ERROR]${NC} $1"
}

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
LOG_DIR="$PROJECT_ROOT/logs/etl"
LOCK_DIR="/tmp/whowaschamp-etl"

# Ensure log directory exists
mkdir -p "$LOG_DIR"
mkdir -p "$LOCK_DIR"

# Function to check if ETL is already running
check_lock() {
    local etl_type="$1"
    local lock_file="$LOCK_DIR/${etl_type}.lock"
    
    if [ -f "$lock_file" ]; then
        local lock_pid=$(cat "$lock_file")
        if ps -p "$lock_pid" > /dev/null 2>&1; then
            log_error "ETL process $etl_type is already running (PID: $lock_pid)"
            return 1
        else
            log_warning "Stale lock file found for $etl_type, removing..."
            rm -f "$lock_file"
        fi
    fi
    
    # Create new lock file
    echo $$ > "$lock_file"
    return 0
}

# Function to remove lock file
remove_lock() {
    local etl_type="$1"
    local lock_file="$LOCK_DIR/${etl_type}.lock"
    rm -f "$lock_file"
}

# Function to run UFC ETL
run_ufc_etl() {
    local mode="${1:-incremental}"
    
    log_info "Starting UFC ETL process (mode: $mode)..."
    
    if ! check_lock "ufc"; then
        return 1
    fi
    
    local log_file="$LOG_DIR/ufc_$(date +%Y%m%d_%H%M%S).log"
    local start_time=$(date +%s)
    
    {
        log_info "UFC ETL started at $(date)"
        log_info "Mode: $mode"
        log_info "Log file: $log_file"
        
        if [ "$mode" = "full" ]; then
            npx tsx scripts/etl/backfill_ufc_new.ts
        else
            npx tsx scripts/etl/backfill_ufc_new.ts --since="$(date -d '7 days ago' '+%Y-%m-%d')"
        fi
        
        local end_time=$(date +%s)
        local duration=$((end_time - start_time))
        
        log_success "UFC ETL completed successfully in ${duration} seconds"
        
    } 2>&1 | tee "$log_file"
    
    local exit_code=${PIPESTATUS[0]}
    remove_lock "ufc"
    
    if [ $exit_code -ne 0 ]; then
        log_error "UFC ETL failed with exit code $exit_code"
        return $exit_code
    fi
    
    return 0
}

# Function to run WWE ETL
run_wwe_etl() {
    local mode="${1:-incremental}"
    
    log_info "Starting WWE ETL process (mode: $mode)..."
    
    if ! check_lock "wwe"; then
        return 1
    fi
    
    local log_file="$LOG_DIR/wwe_$(date +%Y%m%d_%H%M%S).log"
    local start_time=$(date +%s)
    
    {
        log_info "WWE ETL started at $(date)"
        log_info "Mode: $mode"
        log_info "Log file: $log_file"
        
        if [ "$mode" = "full" ]; then
            npx tsx scripts/etl/backfill_wwe_new.ts
        else
            npx tsx scripts/etl/backfill_wwe_new.ts --since="$(date -d '30 days ago' '+%Y-%m-%d')"
        fi
        
        local end_time=$(date +%s)
        local duration=$((end_time - start_time))
        
        log_success "WWE ETL completed successfully in ${duration} seconds"
        
    } 2>&1 | tee "$log_file"
    
    local exit_code=${PIPESTATUS[0]}
    remove_lock "wwe"
    
    if [ $exit_code -ne 0 ]; then
        log_error "WWE ETL failed with exit code $exit_code"
        return $exit_code
    fi
    
    return 0
}

# Function to run both ETL processes
run_all_etl() {
    local mode="${1:-incremental}"
    
    log_info "Starting full ETL suite (mode: $mode)..."
    
    local overall_start=$(date +%s)
    local failed_jobs=()
    
    # Run UFC ETL
    if ! run_ufc_etl "$mode"; then
        failed_jobs+=("UFC")
    fi
    
    # Run WWE ETL
    if ! run_wwe_etl "$mode"; then
        failed_jobs+=("WWE")
    fi
    
    local overall_end=$(date +%s)
    local overall_duration=$((overall_end - overall_start))
    
    if [ ${#failed_jobs[@]} -eq 0 ]; then
        log_success "All ETL processes completed successfully in ${overall_duration} seconds"
        return 0
    else
        log_error "ETL failures detected: ${failed_jobs[*]}"
        return 1
    fi
}

# Function to check ETL health
check_health() {
    log_info "Checking ETL health..."
    
    # Check database connectivity
    if ! npx prisma db push --accept-data-loss >/dev/null 2>&1; then
        log_error "Database connectivity check failed"
        return 1
    fi
    
    # Check recent ETL runs
    local recent_events=$(node -e "
        const { PrismaClient } = require('@prisma/client');
        const prisma = new PrismaClient();
        
        prisma.event.count({
            where: {
                updatedAt: {
                    gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
                }
            }
        }).then(count => {
            console.log(count);
            return prisma.\$disconnect();
        }).catch(() => {
            console.log(0);
        });
    ")
    
    log_info "Database connectivity: OK"
    log_info "Events updated in last 7 days: $recent_events"
    
    # Check for stale lock files
    local stale_locks=$(find "$LOCK_DIR" -name "*.lock" -mmin +120 2>/dev/null | wc -l)
    if [ "$stale_locks" -gt 0 ]; then
        log_warning "Found $stale_locks stale lock files"
        find "$LOCK_DIR" -name "*.lock" -mmin +120 -delete
        log_info "Cleaned up stale lock files"
    fi
    
    log_success "ETL health check completed"
}

# Function to clean up old logs
cleanup_logs() {
    local days="${1:-30}"
    
    log_info "Cleaning up ETL logs older than $days days..."
    
    local deleted_count=$(find "$LOG_DIR" -name "*.log" -mtime +$days -delete -print | wc -l)
    
    log_success "Cleaned up $deleted_count old log files"
}

# Usage information
usage() {
    cat << EOF
Usage: $0 [COMMAND] [OPTIONS]

Commands:
    ufc [full|incremental]     - Run UFC ETL process
    wwe [full|incremental]     - Run WWE ETL process  
    all [full|incremental]     - Run all ETL processes
    health                     - Check ETL health status
    cleanup [days]             - Clean up old log files (default: 30 days)

Examples:
    $0 all incremental         - Run incremental update for all promotions
    $0 ufc full               - Full UFC data refresh
    $0 health                 - Check system health
    $0 cleanup 7              - Clean logs older than 7 days

EOF
}

# Main script logic
main() {
    cd "$PROJECT_ROOT"
    
    case "${1:-help}" in
        "ufc")
            run_ufc_etl "${2:-incremental}"
            ;;
        "wwe")
            run_wwe_etl "${2:-incremental}"
            ;;
        "all")
            run_all_etl "${2:-incremental}"
            ;;
        "health")
            check_health
            ;;
        "cleanup")
            cleanup_logs "${2:-30}"
            ;;
        "help"|*)
            usage
            ;;
    esac
}

# Trap to ensure cleanup on exit
trap 'remove_lock "ufc"; remove_lock "wwe"' EXIT

# Execute main function
main "$@"
