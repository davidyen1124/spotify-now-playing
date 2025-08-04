import React from 'react'
import { renderToString } from 'react-dom/server.edge'
import { App } from './App'
import { ErrorBoundary } from './components/ErrorBoundary'
import walkmanStyles from './styles/walkman.css?inline'
import indexHtmlTemplate from './template.html?raw'
import type { RecentlyPlayedResponse } from './types/spotify'
import { escapeHtmlAttribute } from './utils/html-escape'

export function renderPage(recentlyPlayed: RecentlyPlayedResponse) {
  const appHtml = renderToString(
    React.createElement(ErrorBoundary, {
      children: React.createElement(App, { recentlyPlayed })
    })
  )

  const track = recentlyPlayed?.items?.[0]?.track

  // Generate meta tags
  const metaTags = track
    ? `
  <meta property="og:title" content="${escapeHtmlAttribute(
    track.name
  )} by ${escapeHtmlAttribute(track.artists[0]?.name || '')}" />
  <meta property="og:description" content="Recently played on Spotify" />
  <meta property="og:image" content="${escapeHtmlAttribute(
    track.album.images[0]?.url || ''
  )}" />
  <meta property="og:url" content="${escapeHtmlAttribute(
    track.external_urls.spotify
  )}" />
  <meta property="og:type" content="music" />
  <meta property="og:site_name" content="Spotify Walkman Player" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtmlAttribute(
    track.name
  )} by ${escapeHtmlAttribute(track.artists[0]?.name || '')}" />
  <meta name="twitter:description" content="Recently played on Spotify" />
  <meta name="twitter:image" content="${escapeHtmlAttribute(
    track.album.images[0]?.url || ''
  )}" />`
    : ''

  // Replace placeholders
  let html = indexHtmlTemplate
  html = html.replace('<!--app-meta-tags-->', metaTags)
  html = html.replace('<!--app-head-->', `<style>${walkmanStyles}</style>`)
  html = html.replace('<!--app-html-->', appHtml)

  return html
}
