import { NextResponse } from 'next/server';
import { getPlaylist } from '@/lib/spotify/getPlaylist';

export async function POST(request) {
  const { access_token, id } = await request.json();

  const response = await getPlaylist(access_token, id);
  const res = await response.json();

  return NextResponse.json({ playlist: res });
}
