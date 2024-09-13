'use client';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { useContext } from 'react';
import { tokenContext } from '@/context/TokenContextProvider';

import SignedIn from '@/app/components/SignedIn';
import Playlist from '@/app/components/Playlist';

import { useRouter } from 'next/navigation'

export default function PlaylistsPage() {
    const { data: session } = useSession();
    const [profile, setProfile] = useState(null);
    const [list, setList] = useState([]);
    const [newPlaylist, setNewPlaylist] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [newPlaylistCreated, setNewPlaylistCreated] = useState(false);
    const router = useRouter();

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

    const getProfile = useCallback(async () => {
        const access_token = await getAccessToken();

        const response = await fetch('api/spotify/getProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                access_token,
            }),
        });

        try {
            const { profile } = await response.json();
            console.log(profile);
            setProfile(profile);
        } catch (e) {
            console.log(e);
        }
    }, [getAccessToken]);

    const getPlaylists = useCallback(async () => {
        const access_token = await getAccessToken();

        const response = await fetch('api/spotify/getUserPlaylists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                access_token,
            }),
        });

        try {
            const { playlists } = await response.json();
            console.log(playlists);
            setList(playlists);
        } catch (e) {
            console.log(e);
        }
    }, [getAccessToken]);

    const createNewPlaylist = async () => {
        const access_token = await getAccessToken();

        const response = await fetch('api/spotify/createNewPlaylist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/npm rjson',
            },
            body: JSON.stringify({
                access_token,
            }),
        });

        try {
            const data = await response.json();
            console.log(data);
            setNewPlaylistCreated(true);
            setNewPlaylist(data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (session) {
            getProfile();
            getPlaylists();
        }
    }, [session, accessToken, setAccessToken, getPlaylists, getProfile]);

    if (!session) {
        router.push('/signin')
    }
    // signed in
    return (
        <div className='container mb-40 mx-auto px-8'>
            <SignedIn profile={profile} />
            <div>
                <input placeholder='filter'
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="grid xlg:grid-cols-4 x lg:grid-cols-3 md:grid-cols-2 x">
                {list
                    .filter(x => x.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((item) =>
                        <Playlist key={item.id} content={item} />
                    )
                }
            </div>
        </div>
    );


}