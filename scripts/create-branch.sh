#!/bin/bash

# Script to create feature branches from GitHub issues
# Usage: ./scripts/create-branch.sh <issue_number>
# Example: ./scripts/create-branch.sh 2

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if issue number is provided
if [ $# -eq 0 ]; then
    print_error "Please provide an issue number"
    echo "Usage: $0 <issue_number>"
    echo "Example: $0 2"
    exit 1
fi

ISSUE_NUMBER=$1

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    print_error "GitHub CLI (gh) is not installed"
    echo "Install it from: https://cli.github.com/"
    exit 1
fi

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    print_error "Not in a git repository"
    exit 1
fi

print_info "Fetching issue #${ISSUE_NUMBER} details..."

# Get issue details using GitHub CLI
ISSUE_DATA=$(gh issue view $ISSUE_NUMBER --json title,state 2>/dev/null || {
    print_error "Failed to fetch issue #${ISSUE_NUMBER}"
    echo "Please check if the issue exists and you have access to the repository"
    exit 1
})

# Parse issue data
ISSUE_TITLE=$(echo "$ISSUE_DATA" | jq -r '.title')
ISSUE_STATE=$(echo "$ISSUE_DATA" | jq -r '.state')

# Check if issue is open
if [ "$ISSUE_STATE" != "OPEN" ]; then
    print_warning "Issue #${ISSUE_NUMBER} is ${ISSUE_STATE}"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_info "Cancelled"
        exit 0
    fi
fi

print_info "Issue: ${ISSUE_TITLE}"

# Sanitize title for branch name
# Convert to lowercase, replace spaces with hyphens, remove special characters
SANITIZED_TITLE=$(echo "$ISSUE_TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9 ]//g' | sed 's/ \+/-/g' | sed 's/--*/-/g' | sed 's/^-\+\|-\+$//g')

# Calculate how much space we have for the title part
PREFIX="feature/${ISSUE_NUMBER}-"
PREFIX_LENGTH=${#PREFIX}
MAX_TITLE_LENGTH=$((50 - PREFIX_LENGTH))

# Truncate the sanitized title if needed
if [ ${#SANITIZED_TITLE} -gt $MAX_TITLE_LENGTH ]; then
    TRUNCATED_TITLE=$(echo "$SANITIZED_TITLE" | cut -c1-$MAX_TITLE_LENGTH | sed 's/-$//')
    BRANCH_NAME="${PREFIX}${TRUNCATED_TITLE}"
    print_warning "Branch name truncated to 50 characters"
else
    BRANCH_NAME="${PREFIX}${SANITIZED_TITLE}"
fi

print_info "Branch name: ${BRANCH_NAME}"

# Check if branch already exists locally
if git show-ref --verify --quiet refs/heads/$BRANCH_NAME; then
    print_error "Branch '${BRANCH_NAME}' already exists locally"
    exit 1
fi

# Check if branch exists on remote
if git ls-remote --exit-code --heads origin $BRANCH_NAME > /dev/null 2>&1; then
    print_error "Branch '${BRANCH_NAME}' already exists on remote"
    exit 1
fi

# Ensure we're on main branch and it's up to date
print_info "Switching to main branch and updating..."
git checkout main
git pull origin main

# Create and checkout new branch
print_info "Creating branch: ${BRANCH_NAME}"
git checkout -b $BRANCH_NAME

print_success "Branch '${BRANCH_NAME}' created and checked out successfully!"

# Optional: Push branch to remote and set upstream
read -p "Push branch to remote and set upstream? (Y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Nn]$ ]]; then
    print_info "Pushing branch to remote..."
    git push -u origin $BRANCH_NAME
    print_success "Branch pushed to remote with upstream tracking"
fi

# Optional: Link branch to issue (if supported)
print_info "You can now start working on issue #${ISSUE_NUMBER}"
print_info "Remember to reference the issue in your commits: 'fix: implement XYZ (#${ISSUE_NUMBER})'"

echo
print_success "🚀 Ready to start development!"
echo "Branch: ${BRANCH_NAME}"
echo "Issue: #${ISSUE_NUMBER} - ${ISSUE_TITLE}"