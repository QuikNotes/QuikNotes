#!/usr/bin/env bash

# Exit on error
set -o errexit

# Install dependencies
npm install

# Build frontend
npm run build

# Set production environment variable
export NODE_ENV=production

# Print diagnostic information
echo "NODE_ENV: $NODE_ENV"
echo "Listing files in project root:"
ls -la
echo "Listing files in client/dist:"
ls -la client/dist || echo "client/dist directory not found"

# Start server
echo "Starting server..."
npm start
