import type { RecentlyPlayedResponse } from '../types/spotify'

export class SpotifyService {
  private clientId: string
  private clientSecret: string
  private refreshToken: string

  constructor(clientId: string, clientSecret: string, refreshToken: string) {
    this.clientId = clientId
    this.clientSecret = clientSecret
    this.refreshToken = refreshToken
  }

  private async getAccessToken(): Promise<string> {
    const params = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: this.refreshToken,
      client_id: this.clientId,
      client_secret: this.clientSecret
    })

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `Failed to refresh token: ${response.statusText} - ${errorText}`
      )
    }

    const data = (await response.json()) as {
      access_token: string
      expires_in: number
    }

    return data.access_token
  }

  async getRecentlyPlayed(limit: number = 10): Promise<RecentlyPlayedResponse> {
    const token = await this.getAccessToken()

    const response = await fetch(
      `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch recently played: ${response.statusText}`)
    }

    return response.json()
  }
}
