# 🎧 Spotify Now Playing: Your Obsession, Publicly Displayed

> Because nothing says "I have exquisite music taste" like broadcasting your guilty pleasures to the world.

## What Is This Monstrosity?

This is a serverless AWS Lambda application that exposes your Spotify listening habits to the harsh judgment of the internet. It fetches your most recently played track from Spotify and displays it on a virtual retro Walkman interface, because apparently, we're all nostalgic for technology that required physical effort to enjoy music.

**🔴 [Check out the live demo!](https://spotify.daviddennislinda.com/)**

![Retro Walkman Interface](/.github/images/walkman-interface.png)

## Features

- 🕵️‍♀️ **Privacy Invasion**: Connects to your Spotify account so everyone can see you were listening to "Baby Shark" at 3 AM
- 🎨 **Retro Walkman Design**: Pretends your digital music is somehow more authentic by displaying it on a virtual cassette player
- ⏱️ **Time Stamps**: Helpfully shows how long ago you listened to that embarrassing song, in case someone needed that information
- 🤷‍♂️ **Error Pages**: For when Spotify decides your music taste is too shameful to share
- 🚀 **Serverless**: Because running an actual server for this would be admitting you care too much
- 🔌 **API Endpoint**: A shiny new JSON API so developers can programmatically judge your music taste

## Installation & Setup

1. Clone this repo (congratulations, you've made your first mistake)
2. Get Spotify API credentials (prepare to sell your soul in OAuth agreement form)
3. Store your secrets in environment variables (where they'll be slightly safer than writing them on a Post-it)
4. Deploy to AWS Lambda with `serverless deploy` (watch your AWS bill slowly creep up for this essential service)

## Environment Variables

```
SPOTIFY_CLIENT_ID=your_client_id_here_if_spotify_deems_you_worthy
SPOTIFY_CLIENT_SECRET=your_super_secret_that_you_will_accidentally_commit_anyway
SPOTIFY_REFRESH_TOKEN=a_magical_string_that_will_break_randomly
```

## How It Works

1. User visits your URL
2. AWS Lambda wakes up (groggily)
3. Lambda calls Spotify API (begging for access)
4. We render a fancy Walkman with your track (because it's 1985 apparently)
5. User judges your music taste silently
6. Everyone questions their life choices

## API Endpoint

For those who want to programmatically access your shameful music history:

- **URL**: `/api/recently-played`
- **Method**: GET
- **Response Format**: JSON
- **Example Response**:
  ```json
  {
    "name": "Never Gonna Give You Up",
    "artists": ["Rick Astley"],
    "album": "Whenever You Need Somebody",
    "albumArt": "https://i.scdn.co/image/...",
    "spotifyUrl": "https://open.spotify.com/track/...",
    "playedAt": "2023-06-01T12:34:56Z"
  }
  ```
- **No Content Response** (204): When you haven't played anything recently (impossible, we know)
- **Error Response** (500): When Spotify decides to be difficult

## Deployment

This app automatically deploys to AWS Lambda whenever you push to main, because you definitely need continuous deployment for something this mission-critical.

## Why Did I Make This?

Maybe you have too much free time. Maybe you genuinely believe people care what you're listening to. Maybe it's a cry for help. Who's to say, really?

## License

This project is licensed under the "Why Would Anyone Steal This" License.

---

_Built with Node.js, serverless, and the crushed dreams of people who thought physical media would last forever._
