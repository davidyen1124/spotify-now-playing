/**
 * Main entry point for the Spotify Now Playing application
 * Re-exports all handlers
 */

// Lambda handlers
const { nowPlaying, recentlyPlayed } = require('./handlers/lambda')

// Express app handler
const { handler: expressHandler } = require('./handlers/express')

module.exports = {
  // Lambda handlers
  nowPlaying,
  recentlyPlayed,

  // Express handler for serverless
  handler: expressHandler
}
