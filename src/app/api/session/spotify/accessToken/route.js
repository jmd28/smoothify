import { TOKEN_ENDPOINT } from '@/lib/spotify/endpoints';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  const { refresh_token } = await request.json();

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + basic,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
      code: refresh_token,
      redirect_uri: 'http://localhost:3000/api/auth/callback/spotify',
    }),
  });

  const { access_token, expires_in } = await response.json();
  return NextResponse.json({ access_token, expires_in });
}
