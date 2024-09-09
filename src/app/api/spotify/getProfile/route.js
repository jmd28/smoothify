import { NextResponse } from 'next/server';
import { getProfile } from '@/lib/spotify/getProfile';

export async function POST(request) {
  const { access_token } = await request.json();

  const response = await getProfile(access_token);
  const res = await response.json();
  console.log(res);

  return NextResponse.json({ profile: res });
}
