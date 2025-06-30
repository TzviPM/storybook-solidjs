#!/bin/bash

# self_check.sh - Run all quality checks for the Storybook SolidJS project
# This script runs linting, tests, builds, and formatting in sequence
# Exit on any error to ensure we catch issues early

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_step() {
    echo -e "\n${BLUE}==>${NC} ${1}"
}

print_success() {
    echo -e "${GREEN}✓${NC} ${1}"
}

print_error() {
    echo -e "${RED}✗${NC} ${1}"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} ${1}"
}

# Start time tracking
START_TIME=$(date +%s)

echo "🔍 Starting comprehensive self-check for Storybook SolidJS..."

# 1. Ensure dependencies are up to date
print_step "Checking dependencies with frozen lockfile..."
pnpm install --frozen-lockfile 2>&1
print_success "Dependencies verified"

# 2. Run linters (fast check)
print_step "Running ESLint..."
pnpm check:lint 2>&1
print_success "Linting completed"

# 3. Check formatting (fast check)
print_step "Checking code formatting with Prettier..."
if pnpm check:format 2>&1; then
    print_success "Code formatting is correct"
else
    print_warning "Some files need formatting"
    
    # Offer to fix formatting
    print_step "Running auto-fix for formatting..."
    pnpm fix:format 2>&1
    print_success "Formatting fixed"
fi

# 4. Run tests
print_step "Running Vitest tests..."
pnpm check:test 2>&1
print_success "All tests passed"

# 5. Run TypeScript type checking for each package
print_step "Running TypeScript type checking..."
pnpm -r check 2>&1
print_success "Type checking completed"

# 6. Build all packages
print_step "Building all packages..."
pnpm build 2>&1
print_success "All packages built successfully"

# 7. Run example build to ensure it works
print_step "Building example Storybook..."
cd example && pnpm build-storybook 2>&1
cd ..
print_success "Example Storybook built successfully"

# Calculate total time
END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))
MINUTES=$((DURATION / 60))
SECONDS=$((DURATION % 60))

echo -e "\n${GREEN}✅ All checks completed successfully!${NC}"
echo -e "Total time: ${MINUTES}m ${SECONDS}s"

# Check if any files were modified by formatting
if git diff --quiet; then
    print_success "No changes made by quality checks"
else
    print_warning "Some files were modified by auto-formatting. Please review and commit them."
    echo "Modified files:"
    git diff --name-only
fi

# Optional: Show commit readiness
if git status --porcelain | grep -qE "^(M|A|D|R|C|U)"; then
    print_warning "You have staged or modified files. Remember to commit your changes!"
fi