#!/bin/bash

# Force deployment script update
# Run this manually on the server to resolve divergent branches

echo "Force updating deployment script..."

# Reset to a clean state
git reset --hard HEAD
git clean -fd

# Force fetch and reset to remote
echo "Fetching latest changes..."
git fetch origin main

echo "Resetting to remote main..."
git reset --hard origin/main

echo "Verifying deploy.sh is updated..."
if grep -q "Strategy 1:" deploy.sh; then
    echo "✅ deploy.sh is updated with robust divergent branch handling"
else
    echo "❌ deploy.sh is not updated - something went wrong"
    exit 1
fi

echo "✅ Force update completed successfully!"
echo "The next deployment should work properly now." 