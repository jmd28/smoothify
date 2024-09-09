import { NextResponse } from 'next/server';
import { getUserPlaylists } from '@/lib/spotify/getUserPlaylists';

export async function POST(request) {
  const { access_token } = await request.json();

  const response = await getUserPlaylists(access_token);
  const { items } = await response.json();

  return NextResponse.json({ playlists: items });
}
