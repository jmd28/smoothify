import { getProfile, getUserId } from './getProfile';

export const createNewPlaylist = async (access_token) => {
  const { id } = await getProfile(access_token);
  const response = await fetch(
    `https://api.spotify.com/v1/users/${id}/playlists`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: 'New playlist',
        description: 'smooth',
        public: false,
      }),
    }
  );

  const playlist = await response.json();
  return playlist;
};
