'use client';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { useContext } from 'react';
import { tokenContext } from '@/context/TokenContextProvider';

import { useRouter } from 'next/navigation'

const keyLookup = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

export default function ReorderPage({ params }) {
    const router = useRouter();
    const { data: session } = useSession();
    const [playlist, setPlaylist] = useState();
    const [tracks, setTracks] = useState([]);

    const { accessToken, setAccessToken } = useContext(tokenContext);


    const handleAccessTokenExpiration = useCallback(async (time) => {
        setTimeout(() => {
            setAccessToken(null);
            console.log('token expired');
        }, time * 1000);
    }, [setAccessToken]);

    const getAccessToken = useCallback(async () => {
        if (accessToken) {
            console.log('Theres already a token');
            return accessToken;
        }

        const refresh_token = session.token.accessToken;
        const response = await fetch('api/session/spotify/accessToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refresh_token,
            }),
        });

        try {
            const data = await response.json();
            handleAccessTokenExpiration(data.expires_in);
            setAccessToken(data.access_token);
            return data.access_token;
        } catch (e) {
            console.log(e);
            return null;
        }
    }, [accessToken, handleAccessTokenExpiration, session, setAccessToken]);

    const getPlaylist = useCallback(async () => {
        const access_token = await getAccessToken();
        const id = params.id;
        const response = await fetch('/api/spotify/getPlaylist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                access_token,
                id,
            }),
        });

        try {
            const { playlist } = await response.json()
            console.log(playlist)
            setPlaylist(playlist)
            setTracks(playlist?.tracks?.items)
        } catch (e) {
            console.log(e)
        }
    }, [getAccessToken, params])

    const savePlaylist = useCallback(async () => {
        const access_token = await getAccessToken();
        console.log("tracks", tracks.map(t => t.track.name))
        const response = await fetch('/api/spotify/createNewPlaylist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                access_token,
                name: playlist?.name,
                description: playlist?.description || "",
                track_uris: tracks.map(t => t.track.uri)
            }),
        });

        try {
            const res = await response.json()
            // const { id, snapshot_id, name } = res
            alert(JSON.stringify(res))
        } catch (e) {
            console.log("error saving playlist!")
        }
    }, [getAccessToken, playlist, tracks])

    const getFeatures = useCallback(async () => {
        const access_token = await getAccessToken();
        const ids = playlist?.tracks?.items?.map(e => e?.track?.id)
        if (!ids) {
            return
        }
        const response = await fetch('/api/spotify/getFeatures', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                access_token,
                ids,
            }),
        });

        try {
            const { features } = await response.json()
            console.log("features:", features[0])

            const _tracks = tracks?.map((t, i) => {
                const _track = { ...t?.track, features: features[i] }
                return { ...t, track: _track }
            })

            setTracks(_tracks)
        } catch (e) {
            console.log(e)
        }
    }, [getAccessToken, playlist, tracks])

    const smoothify = useCallback(async () => {
        const access_token = await getAccessToken();
        // const ids = playlist?.tracks?.items?.map(e => e?.track?.id)
        // const id = params.id;
        const response = await fetch('/api/spotify/getSmoothifiedPlaylist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tracks
            }),
        });

        try {
            const { tracks } = await response.json()
            console.log("smoothified:", tracks)
            setTracks(tracks)
        } catch (e) {
            console.log(e)
        }
    }, [getAccessToken, playlist, tracks])

    // fire this to get the playlist
    useEffect(() => {
        async function fetchData() {
            await getPlaylist()
        }
        if (session && !playlist) {
            fetchData()
        }
    }, [session, getPlaylist])

    // fire this when playlist has loaded to get track details
    // todo: does the UI ever need this data? maybe, maybe not
    // TODO: make get playlist do this? e.g. getTracksWithFeatures
    useEffect(() => {
        async function fetchData() {
            await getFeatures()
        }
        console.log("get track details", playlist)
        if (session) {
            fetchData()
        }
    }, [playlist])

    if (!session) {
        router.push('/signin')
    }
    // signed in
    return (
        <div>
            <div className='mx-4'>
                <button className='btn btn-blue' onClick={() => {
                    smoothify()
                }}>sort by key</button>
                <button className='btn btn-blue' onClick={() => {
                    savePlaylist()
                }}>save playlist</button>
                <h1>{playlist?.name}</h1>
                <h1>{playlist?.owner?.display_name}</h1>
            </div>
            <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                <thead>
                    <tr>
                        <th className='p-2 text-center' scope="col">#</th>
                        <th className='p-2 text-left' scope="col">Title</th>
                        <th className='p-2 text-left' scope="col">Artist</th>
                        <th className='p-2 text-left' scope="col">Album</th>
                        <th className='p-2 text-left' scope="col">Key</th>
                    </tr>
                </thead>
                <tbody>
                    {tracks
                        ?.map(e => e?.track)
                        ?.map((e, i) =>
                            <tr key={i}>
                                <th className='p-2 text-center' scope="row">{i}</th>
                                <td className='p-2 text-left' >{e?.name}</td>
                                <td className='p-2 text-left' >{e?.artists.map(a => a?.name).join(', ')}</td>
                                <td className='p-2 text-left' >{e?.album?.name}</td>
                                <td className='p-2 text-left' >{keyLookup?.[e?.features?.key]}</td>
                            </tr>
                        )
                    }

                </tbody>
            </table>
        </div>
    )
}