export const addDefaultSongsToPlaylists = async (playlist_id, access_token) => {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uris: [
          'spotify:track:1HNkqx9Ahdgi1Ixy2xkKkL',
          'spotify:track:77aXNAp5v0RxqOSIQmiP9F',
        ],
        position: 0,
      }),
    }
  );

  const { snapshot_id } = await response.json();

  return snapshot_id;
};
