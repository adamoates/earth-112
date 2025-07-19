#!/bin/bash

# Server Fix Script - Run this directly on the Forge server
# This script forces the server to get the latest deploy.sh and resolves divergent branches

echo "🔧 Server Fix Script - Resolving Divergent Branches"
echo "=================================================="

# Check if we're in the right directory
if [ ! -f "deploy.sh" ]; then
    echo "❌ Error: deploy.sh not found. Please run this from your project directory."
    exit 1
fi

echo "📋 Current state:"
echo "   Current commit: $(git rev-parse HEAD)"
echo "   Current branch: $(git branch --show-current)"

# Step 1: Reset to clean state
echo ""
echo "🔄 Step 1: Resetting to clean state..."
git reset --hard HEAD
git clean -fd

# Step 2: Fetch latest changes
echo ""
echo "📥 Step 2: Fetching latest changes..."
git fetch origin main

# Step 3: Force reset to remote
echo ""
echo "🔄 Step 3: Force resetting to remote main..."
git reset --hard origin/main

# Step 4: Verify the fix
echo ""
echo "✅ Step 4: Verifying the fix..."
if grep -q "Strategy 1:" deploy.sh; then
    echo "   ✅ deploy.sh is updated with robust divergent branch handling"
else
    echo "   ❌ deploy.sh is not updated - something went wrong"
    exit 1
fi

echo ""
echo "🎉 Server fix completed successfully!"
echo "   New commit: $(git rev-parse HEAD)"
echo "   Next deployment should work properly now."
echo ""
echo "💡 To test, you can run: ./deploy.sh" 