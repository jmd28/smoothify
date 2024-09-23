import { getProfile, getUserId } from './getProfile';

/**
 * creates a new playlist with the given name and description
 *
 * @returns an object containing: id, snapshot_id, name
 */
export const createNewPlaylist = async (access_token, name, description) => {
  const profileRes = await getProfile(access_token);
  const profile = await profileRes.json()
  console.log("profile", profile)
  const { id } = profile

  console.log("name", name, "desc", description)

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
        name: name,
        description: description,
        public: false,
      }),
    }
  );
  console.log("response", response)

  const playlist = await response.json();
  return playlist;
  // return { playlist_id: "", snapshot_id: "", new_playlist: "" }
};
