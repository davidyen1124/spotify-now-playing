const axios = require('axios')
const querystring = require('querystring')

/**
 * Get a new access token using the refresh token
 */
async function getAccessToken() {
  // Get Spotify credentials from environment variables
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Missing Spotify credentials in environment variables.')
  }

  // Use the refresh token to get a new access token
  const tokenResponse = await axios.post(
    'https://accounts.spotify.com/api/token',
    querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
      }
    }
  )

  return tokenResponse.data.access_token
}

/**
 * Get the most recently played track from Spotify
 */
async function getRecentTrack() {
  try {
    const accessToken = await getAccessToken()

    // Get recently played track (limit=1)
    const recentResponse = await axios.get(
      'https://api.spotify.com/v1/me/player/recently-played?limit=1',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )

    const items = recentResponse.data.items || []
    if (!items.length) {
      return null // No recently played songs
    }

    // Extract track info
    const mostRecent = items[0]
    const track = mostRecent.track
    const playedAt = new Date(mostRecent.played_at)
    const albumArt =
      track.album.images && track.album.images[0]
        ? track.album.images[0].url
        : ''
    const artistNames = track.artists.map((a) => a.name).join(', ')

    // Return the track data
    return {
      track,
      playedAt,
      albumArt,
      artistNames
    }
  } catch (error) {
    console.error('Error fetching recent track:', error)
    throw error
  }
}

module.exports = {
  getAccessToken,
  getRecentTrack
}
