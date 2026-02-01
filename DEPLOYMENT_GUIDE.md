# Deployment Guide - Mission Control Frontend

## Prerequisites

1. **Node.js** 18+ installed
2. **Vercel account** (free tier works)
3. **Convex backend** deployed (optional - can deploy with mock data first)

## Option 1: Deploy to Vercel (Recommended)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy
```bash
cd /Users/jasontang/clawd/projects/mission-control/frontend
npm run build
vercel --prod
```

### Step 4: Configure Environment Variables (if using Convex)
```bash
vercel env add VITE_CONVEX_URL
# Paste your Convex deployment URL
```

### Step 5: Redeploy with Environment Variables
```bash
vercel --prod
```

## Option 2: Deploy via GitHub + Vercel (Auto-deployment)

### Step 1: Create GitHub Repository
```bash
cd /Users/jasontang/clawd/projects/mission-control/frontend
git init
git add .
git commit -m "Initial commit - Mission Control frontend"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mission-control-frontend.git
git push -u origin main
```

### Step 2: Connect to Vercel
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Step 3: Add Environment Variables
1. Go to Project Settings → Environment Variables
2. Add `VITE_CONVEX_URL` with your Convex deployment URL
3. Save and redeploy

## Option 3: Deploy to Netlify

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Build the Project
```bash
npm run build
```

### Step 3: Deploy
```bash
netlify deploy --prod --dir=dist
```

### Step 4: Configure Environment Variables
1. Go to Site Settings → Environment Variables
2. Add `VITE_CONVEX_URL`

## Option 4: Self-hosted (Docker)

### Create Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Build and Run
```bash
docker build -t mission-control-frontend .
docker run -p 80:80 mission-control-frontend
```

## Post-Deployment Checklist

- [ ] Verify site loads at deployment URL
- [ ] Check all components render correctly
- [ ] Verify fonts load (Inter, Merriweather)
- [ ] Test responsive layout on mobile
- [ ] Confirm Convex connection (if backend is ready)
- [ ] Check browser console for errors
- [ ] Test all navigation links
- [ ] Verify dark theme displays correctly

## Troubleshooting

### Build Fails
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Fonts Not Loading
- Check Google Fonts CDN in `index.html`
- Verify internet connection during build
- Try adding fonts to `public/fonts/` folder

### Convex Connection Issues
- Verify `VITE_CONVEX_URL` is set correctly
- Check Convex deployment status
- Ensure environment variable starts with `VITE_`

### Tailwind Styles Not Applying
- Verify `@tailwindcss/postcss` is installed
- Check `postcss.config.js` configuration
- Rebuild after config changes

## Performance Tips

1. **Enable Compression**: Vercel/Netlify do this automatically
2. **Use CDN**: Static assets served from edge network
3. **Lazy Load Components**: Split code for faster initial load
4. **Optimize Images**: Use WebP format and proper sizing
5. **Enable Caching**: Configure cache headers for static assets

## Monitoring

### Vercel Analytics
```bash
npm install @vercel/analytics
```

Add to `main.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

<Analytics />
```

### Performance Metrics
- Check Lighthouse score (should be 90+)
- Monitor bundle size (currently ~270KB)
- Track Core Web Vitals

## Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate provisioning

### Example DNS Records
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.21.21
```

## Rollback Procedure

### Vercel
```bash
vercel rollback [deployment-url]
```

### Git
```bash
git revert HEAD
git push
# Vercel will auto-deploy the reverted version
```

## Updating the Deployment

```bash
# Make changes
git add .
git commit -m "Update: description of changes"
git push

# Vercel will automatically deploy
# Or manually: vercel --prod
```

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Vite Docs: https://vite.dev/guide/
- Tailwind Docs: https://tailwindcss.com/docs
