const ejs = require('ejs')
const path = require('path')
const fs = require('fs')

/**
 * Safely escape HTML special characters
 */
function escapeHtml(str) {
  if (typeof str !== 'string') return str
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Format how long ago a given date/time was
 */
function formatPlayedAt(date) {
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) {
    return 'just now'
  } else if (diffMins < 60) {
    return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`
  } else {
    return (
      'on ' +
      date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    )
  }
}

/**
 * Build an HTML response for Lambda Proxy
 */
function buildHtmlResponse(statusCode, html) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'text/html; charset=utf-8'
    },
    body: html
  }
}

// Cache templates for better performance
const templateCache = {}

/**
 * Get a template from cache or load from disk
 */
function getTemplate(templateName) {
  if (templateCache[templateName]) {
    return templateCache[templateName]
  }

  const templatePath = path.join(__dirname, '..', 'views', templateName)
  const template = fs.readFileSync(templatePath, 'utf-8')
  templateCache[templateName] = template
  return template
}

/**
 * Render HTML for the "No Tracks" scenario
 */
function renderNoTracksHTML() {
  const template = getTemplate('no-tracks.ejs')
  return ejs.render(template)
}

/**
 * Render error HTML
 */
function renderErrorHTML(errorMessage) {
  const template = getTemplate('error.ejs')
  return ejs.render(template, { errorMessage: escapeHtml(errorMessage) })
}

/**
 * Render the Walkman player HTML with track data
 */
function renderWalkmanHTML(trackData) {
  const { track, playedAt, albumArt, artistNames } = trackData
  const formattedTime = formatPlayedAt(playedAt)

  const template = getTemplate('walkman.ejs')
  return ejs.render(template, {
    track,
    playedAt,
    albumArt,
    artistNames,
    formattedTime
  })
}

module.exports = {
  escapeHtml,
  formatPlayedAt,
  buildHtmlResponse,
  renderNoTracksHTML,
  renderErrorHTML,
  renderWalkmanHTML
}
