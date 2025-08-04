import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { SpotifyService } from './services/spotify'
import { renderPage } from './render'

type Bindings = {
  SPOTIFY_CLIENT_ID: string
  SPOTIFY_CLIENT_SECRET: string
  SPOTIFY_REFRESH_TOKEN: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/api/*', cors())

app.get('/', async (c) => {
  try {
    const clientId = c.env.SPOTIFY_CLIENT_ID
    const clientSecret = c.env.SPOTIFY_CLIENT_SECRET
    const refreshToken = c.env.SPOTIFY_REFRESH_TOKEN

    const spotifyService = new SpotifyService(
      clientId,
      clientSecret,
      refreshToken
    )

    const recentlyPlayed = await spotifyService.getRecentlyPlayed(1)

    const html = renderPage(recentlyPlayed)

    return c.html(html, {
      headers: {
        'Cache-Control': 'public, max-age=60, s-maxage=60',
        'CDN-Cache-Control': 'public, max-age=300'
      }
    })
  } catch (error) {
    console.error('Error fetching Spotify data:', error)
    return c.html('<h1>Error loading Spotify data</h1>')
  }
})

app.get('/api/recently-played', async (c) => {
  try {
    const clientId = c.env.SPOTIFY_CLIENT_ID
    const clientSecret = c.env.SPOTIFY_CLIENT_SECRET
    const refreshToken = c.env.SPOTIFY_REFRESH_TOKEN

    const spotifyService = new SpotifyService(
      clientId,
      clientSecret,
      refreshToken
    )

    const recentlyPlayed = await spotifyService.getRecentlyPlayed(1)

    if (!recentlyPlayed.items || recentlyPlayed.items.length === 0) {
      return c.json({ message: 'No recent track found.' })
    }

    const mostRecent = recentlyPlayed.items[0]
    const track = mostRecent.track
    const artistNames = track.artists.map((a: any) => a.name).join(', ')

    return c.json({
      name: track.name,
      artists: artistNames,
      album: track.album.name,
      albumArt: track.album.images?.[0]?.url || '',
      spotifyUrl: track.external_urls.spotify,
      playedAt: mostRecent.played_at
    })
  } catch (error) {
    console.error('Error fetching recently played:', error)
    return c.json({ error: (error as Error).message }, 500)
  }
})

export default app
