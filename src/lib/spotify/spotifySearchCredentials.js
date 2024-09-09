//client credentials
const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
//String created combining the client credentials in a base64 string
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

export const SpotifyCredentials = {
  basic,
};
