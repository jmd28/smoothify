import { NextResponse } from 'next/server';
import { createNewPlaylist } from '@/lib/spotify/createNewPlaylist';

export async function POST(request) {
  const { access_token } = await request.json();
  const { playlist_id, snapshot_id, new_playlist } =
    await createNewPlaylist(access_token);

  return NextResponse.json({ playlist_id, snapshot_id, new_playlist });
}
