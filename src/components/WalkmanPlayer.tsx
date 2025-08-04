import React from 'react'
import type { SpotifyTrack } from '../types/spotify'

interface WalkmanPlayerProps {
  track?: SpotifyTrack
  formattedTime?: string
}

export const WalkmanPlayer: React.FC<WalkmanPlayerProps> = ({
  track,
  formattedTime
}) => {
  const trackName = track?.name || 'Nothing playing'
  const artistName = track?.artists?.[0]?.name || ''
  const albumArt = track?.album?.images?.[0]?.url || ''
  const spotifyUrl = track?.external_urls?.spotify || '#'

  return (
    <>
      <div
        className="bg-image"
        style={{ backgroundImage: `url('${albumArt}')` }}
      />

      <div className="walkman-player">
        <div className="walkman-brand">WALKMAN</div>
        <div className="walkman-inner">
          <div className="cassette-window">
            <div className="cassette">
              <div
                className="cassette-label"
                style={{ backgroundImage: `url('${albumArt}')` }}
              />
              <div className="cassette-reels">
                <div className="reel left"></div>
                <div className="reel right"></div>
                <div className="tape"></div>
              </div>
            </div>
          </div>
          <div className="display-panel">
            <div className="track-info">
              <div className="track-title">{trackName}</div>
              <div className="artist-name">{artistName}</div>
              <div className="time-ago">
                {formattedTime ? `Played ${formattedTime}` : ''}
              </div>
            </div>
          </div>
          <div className="controls">
            <button
              className="control-btn"
              onClick={() => window.open(spotifyUrl, '_blank')}
            >
              <svg viewBox="0 0 24 24">
                <path d="M6,5H10V19H6V5M18,5V19H14V5H18Z" />
              </svg>
            </button>
            <button
              className="control-btn play-btn"
              onClick={() => window.open(spotifyUrl, '_blank')}
            >
              <svg viewBox="0 0 24 24">
                <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
              </svg>
            </button>
            <button
              className="control-btn"
              onClick={() => window.open(spotifyUrl, '_blank')}
            >
              <svg viewBox="0 0 24 24">
                <path d="M16,18V6H18V18H16M6,18L14.5,12L6,6V18Z" />
              </svg>
            </button>
            <button
              className="control-btn"
              onClick={() => window.open(spotifyUrl, '_blank')}
            >
              <svg viewBox="0 0 24 24">
                <path d="M18,18H6V6H18V18Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <footer>Made with ♥ using Spotify API</footer>
    </>
  )
}
