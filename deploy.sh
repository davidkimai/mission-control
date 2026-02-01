#!/bin/bash

# Mission Control Frontend Deployment Script

echo "🚀 Building Mission Control frontend..."
npm run build

echo "📦 Deploying to Vercel..."
npx vercel --prod

echo "✅ Deployment complete!"
