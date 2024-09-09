import { createNewPlaylist } from '@/lib/spotify/createNewPlaylist';
import { addSongsToPlaylist } from '@/lib/spotify/addSongsToPlaylist';

export const createAndPopulatePlaylist = async (access_token) => {
  const newPlaylist = await createNewPlaylist(access_token);
  const response = await addSongsToPlaylist(newPlaylist.id, access_token);

  return {
    playlist_id: newPlaylist.id,
    snapshot_id: response,
    new_playlist: newPlaylist,
  };
};
