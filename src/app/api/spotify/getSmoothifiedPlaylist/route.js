import { smoothify } from '@/lib/smoothify/ordering';
import { NextResponse } from 'next/server';


// TODO: should the client send the tracks data?
// or should this endpoint request it again?
export async function POST(request) {
    const { tracks } = await request.json();

    const res = smoothify(tracks);

    return NextResponse.json({ tracks: res });
}
