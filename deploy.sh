#!/bin/bash

# QuikNotes Deployment Script
echo "🚀 Deploying QuikNotes to Production..."

# Build the production application
echo "📦 Building production assets..."
npm run build

echo "✅ Build complete!"
echo "📋 Your app is ready for deployment!"
echo ""
echo "🔗 Free Deployment Options:"
echo "1. Render: Deploy as a Docker service (recommended - permanent free tier)"
echo "2. Fly.io: Docker-native deployment"
echo "3. Koyeb: Free tier with Docker support"
echo ""
echo "🗃️  Don't forget to set up a production database!"
echo "📚 Check DEPLOYMENT.md for detailed instructions"
