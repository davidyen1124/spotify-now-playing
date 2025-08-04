import React from 'react'
import { WalkmanPlayer } from './components/WalkmanPlayer'
import './styles/walkman.css'
import type { RecentlyPlayedResponse } from './types/spotify'

interface AppProps {
  recentlyPlayed?: RecentlyPlayedResponse
}

export const App: React.FC<AppProps> = ({ recentlyPlayed }) => {
  const track = recentlyPlayed?.items?.[0]?.track

  // Format time for last played track
  let formattedTime = ''
  if (recentlyPlayed?.items?.[0]) {
    const playedAt = new Date(recentlyPlayed.items[0].played_at)
    const now = new Date()
    const diffMs = now.getTime() - playedAt.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) {
      formattedTime = 'just now'
    } else if (diffMins < 60) {
      formattedTime = `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`
    } else {
      const diffHours = Math.floor(diffMins / 60)
      formattedTime = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    }
  }

  return (
    <WalkmanPlayer
      track={track}
      formattedTime={formattedTime}
    />
  )
}
