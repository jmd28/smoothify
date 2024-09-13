import { PLAYLIST_ENDPOINT } from './endpoints';

export const getPlaylist = async (access_token, id) => {
  return fetch(PLAYLIST_ENDPOINT + `/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
