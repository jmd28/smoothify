import { NextResponse } from 'next/server';
import { createNewPlaylist } from '@/lib/spotify/createNewPlaylist';
import { addSongsToPlaylist } from '@/lib/spotify/addSongsToPlaylist';

export async function POST(request) {
  const { access_token, name, description, track_uris } = await request.json()
  // create playlist
  const res = await createNewPlaylist(
    access_token,
    name + " (smoothified)",
    description + " - created using smoothify"
  )
  console.log("create new playlist", res)
  // add tracks
  addSongsToPlaylist(access_token, res.id, track_uris)
  return NextResponse.json(res)
}
