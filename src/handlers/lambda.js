const { getRecentTrack } = require('../../src/services/spotify')
const {
  renderWalkmanHTML,
  renderNoTracksHTML,
  renderErrorHTML,
  buildHtmlResponse
} = require('../../src/utils/html')

/**
 * AWS Lambda Handler
 * Returns an HTML page showing your most recent Spotify track
 */
exports.nowPlaying = async (event) => {
  try {
    const trackData = await getRecentTrack()

    if (!trackData) {
      return buildHtmlResponse(200, renderNoTracksHTML())
    }

    return buildHtmlResponse(200, renderWalkmanHTML(trackData))
  } catch (error) {
    console.error('Error:', error)
    return buildHtmlResponse(500, renderErrorHTML(error.message))
  }
}

/**
 * AWS Lambda Handler for API
 * Returns the most recently played Spotify track as JSON
 */
exports.recentlyPlayed = async (event) => {
  try {
    const trackData = await getRecentTrack()

    // If there's no recent track, return a 204 "No Content"
    if (!trackData) {
      return {
        statusCode: 204,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: 'No recent track found.' })
      }
    }

    // Extract the data we want to expose in the API
    const { track, playedAt, albumArt, artistNames } = trackData

    // Build a JSON response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        name: track.name,
        artists: artistNames,
        album: track.album.name,
        albumArt,
        spotifyUrl: track.external_urls.spotify,
        playedAt
      })
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: error.message })
    }
  }
}
