const express = require('express')
const serverless = require('serverless-http')
const { getRecentTrack } = require('../../src/services/spotify')
const {
  renderWalkmanHTML,
  renderNoTracksHTML,
  renderErrorHTML
} = require('../../src/utils/html')

const app = express()

app.get('/', async (req, res) => {
  try {
    const trackData = await getRecentTrack()

    if (!trackData) {
      res.set('Content-Type', 'text/html; charset=utf-8')
      return res.send(renderNoTracksHTML())
    }

    res.set('Content-Type', 'text/html; charset=utf-8')
    res.send(renderWalkmanHTML(trackData))
  } catch (error) {
    console.error('Error:', error)
    res.status(500)
    res.set('Content-Type', 'text/html; charset=utf-8')
    res.send(renderErrorHTML(error.message))
  }
})

app.get('/api/recently-played', async (req, res) => {
  try {
    const trackData = await getRecentTrack()

    if (!trackData) {
      return res.status(204).json({ message: 'No recent track found.' })
    }

    const { track, playedAt, albumArt, artistNames } = trackData

    res.json({
      name: track.name,
      artists: artistNames,
      album: track.album.name,
      albumArt,
      spotifyUrl: track.external_urls.spotify,
      playedAt
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: error.message })
  }
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    error: 'An unexpected error occurred'
  })
})

module.exports.handler = serverless(app)
