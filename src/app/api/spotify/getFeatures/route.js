import { NextResponse } from 'next/server';
import { getFeatures } from '@/lib/spotify/getFeatures';

export async function POST(request) {
  const { access_token, ids } = await request.json();

  // todo: may need to chunk ids in here into batches of 100
  const response = await getFeatures(access_token, ids);
  const { audio_features } = await response.json();
  console.log(audio_features)

  return NextResponse.json({ features: audio_features });
}
