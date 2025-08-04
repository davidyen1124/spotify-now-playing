export interface SpotifyImage {
  url: string
  height: number
  width: number
}

export interface SpotifyArtist {
  name: string
  id: string
  external_urls: {
    spotify: string
  }
}

export interface SpotifyAlbum {
  name: string
  images: SpotifyImage[]
}

export interface SpotifyTrack {
  name: string
  artists: SpotifyArtist[]
  album: SpotifyAlbum
  external_urls: {
    spotify: string
  }
}

export interface RecentlyPlayedItem {
  track: SpotifyTrack
  played_at: string
}

export interface RecentlyPlayedResponse {
  items: RecentlyPlayedItem[]
}
