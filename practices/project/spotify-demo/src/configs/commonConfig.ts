//export const spotifyBaseURL = process.env.SPOTIFY_BASE_URL;
export const spotifyBaseURL =
  (process.env.REACT_APP_SPOTIFY_BASE_URL as string) ??
  "https://api.spotify.com/v1";
