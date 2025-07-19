#!/bin/bash

# SSH tunnel to Forge MySQL database
# This script establishes an SSH tunnel to connect to the Forge MySQL database

FORGE_HOST="198.58.114.92"
FORGE_USER="forge"
LOCAL_PORT="3307"  # Use 3307 to avoid conflicts with local MySQL
REMOTE_PORT="3306"

echo "Establishing SSH tunnel to Forge MySQL database..."
echo "Local port: $LOCAL_PORT"
echo "Remote host: $FORGE_HOST"
echo "Remote port: $REMOTE_PORT"

# Kill any existing tunnel on this port
lsof -ti:$LOCAL_PORT | xargs kill -9 2>/dev/null || true

# Establish SSH tunnel
ssh -L $LOCAL_PORT:localhost:$REMOTE_PORT $FORGE_USER@$FORGE_HOST -N -f

if [ $? -eq 0 ]; then
    echo "✅ SSH tunnel established successfully!"
    echo "MySQL is now accessible at localhost:$LOCAL_PORT"
    echo ""
    echo "To connect to the database:"
    echo "  Host: 127.0.0.1"
    echo "  Port: $LOCAL_PORT"
    echo "  Database: earth_112_dev"
    echo "  Username: forge"
    echo ""
    echo "To stop the tunnel, run: pkill -f 'ssh -L $LOCAL_PORT'"
else
    echo "❌ Failed to establish SSH tunnel"
    exit 1
fi 