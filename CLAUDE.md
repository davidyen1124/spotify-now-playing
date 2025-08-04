# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a Cloudflare Workers application that displays the user's most recently played Spotify track on a retro Walkman interface. It uses Hono framework for routing, React for the UI, and Vite for building.

## Development Commands
- `npm run dev` - Start local development with Vite
- `npm run build` - Build the application
- `npm run preview:wrangler` - Build and preview with Wrangler locally
- `npm run typecheck` - Run TypeScript type checking
- `npm run deploy` - Deploy to Cloudflare Workers
- `npm run clean` - Clean build artifacts

## Architecture
- **Entry Point**: `src/index.ts` - Hono application with two routes:
  - `/` - SSR React page displaying the Walkman interface
  - `/api/recently-played` - JSON API endpoint
- **Spotify Integration**: `src/services/spotify.ts` - Handles OAuth token refresh and API calls
- **UI Components**: 
  - `src/components/WalkmanPlayer.tsx` - Main Walkman interface
  - `src/render.tsx` - Server-side rendering logic
- **Deployment**: Cloudflare Workers using Wrangler

## Environment Secrets
Required secrets (set via `wrangler secret put`):
- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`

## Key Technical Details
- Uses React 19 with server-side rendering on Cloudflare Workers edge
- TypeScript with strict mode enabled
- Module resolution uses ESNext with bundler strategy
- Path alias: `~/*` maps to `./src/*`
- CORS enabled for API routes
- Caching headers set for performance (60s client, 300s CDN)