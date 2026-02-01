# Mission Control Frontend

A modern dashboard for coordinating AI agents with a dark gray and blue editorial theme.

## Features

- **Real-time Activity Feed**: Monitor agent activities as they happen
- **Kanban Task Board**: Track tasks across 5 stages (inbox, assigned, in_progress, review, done)
- **Agent Status Cards**: View all agents and their current status
- **Editorial Design**: Clean, newspaper-inspired aesthetic with dark gray (#1f2937, #111827) and blue (#0073ff) theme

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Convex** for real-time backend (to be integrated)

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start dev server:
```bash
npm run dev
```

3. Open http://localhost:5173/

## Build for Production

```bash
npm run build
```

## Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
npm run build
vercel --prod
```

Or connect your GitHub repo to Vercel for automatic deployments.

## Convex Integration

Currently using mock data. To integrate with Convex backend:

1. Set up Convex project in parent directory
2. Update `VITE_CONVEX_URL` in `.env` with your Convex deployment URL
3. Replace mock API in `src/convex/_generated/api.ts` with actual generated API
4. Implement Convex schema with:
   - `activities` table with `message` and `timestamp` fields
   - `tasks` table with `title`, `description`, and `status` fields
   - `agents` table with `name`, `role`, and `status` fields

## Component Structure

```
src/
├── components/
│   ├── ActivityFeed.tsx      - Real-time activity stream
│   ├── TaskBoard.tsx          - Kanban board with 5 columns
│   ├── AgentCards.tsx         - Agent status display
│   ├── DocumentPanel.tsx      - Document list (unused in main layout)
│   └── Sidebar.tsx            - Navigation sidebar
├── convex/
│   └── _generated/
│       └── api.ts             - Mock API (replace with Convex generated)
├── App.tsx                    - Main application layout
├── main.tsx                   - Entry point with Convex provider
└── index.css                  - Tailwind + custom styles
```

## Theme

The application uses a dark editorial theme inspired by newspaper design:

- **Primary Blue**: #0073ff
- **Dark Gray Background**: #1f2937, #111827
- **Fonts**: 
  - Sans: Inter
  - Serif: Merriweather (for headings)

## Current Status

✅ Frontend setup complete  
✅ Dark gray and blue theme implemented  
✅ All UI components built with mock data  
✅ Editorial aesthetic applied  
✅ Responsive layout with Tailwind  
⏳ Convex backend integration pending  
⏳ Vercel deployment pending  

## Next Steps

1. Set up Convex backend with proper schema
2. Replace mock data with real Convex queries
3. Deploy to Vercel
4. Add authentication
5. Implement drag-and-drop for task board
