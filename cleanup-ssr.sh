#!/bin/bash

# Stop and remove SSR processes
echo "Stopping SSR processes..."
sudo supervisorctl stop inertia-ssr
sudo pkill -f "node.*ssr"

# Remove Supervisor configuration
echo "Removing Supervisor configuration..."
sudo rm -f /etc/supervisor/conf.d/supervisor-inertia-ssr.conf
sudo supervisorctl reread
sudo supervisorctl update

# Clean up SSR-related files
echo "Cleaning up SSR files..."
rm -rf /home/forge/earth-112/bootstrap/ssr
rm -rf /home/forge/earth-112/dist/server
rm -f /home/forge/earth-112/storage/logs/ssr.log
rm -f /home/forge/earth-112/storage/logs/ssr.error.log

echo "SSR cleanup complete!"
