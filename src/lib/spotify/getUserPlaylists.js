import { PLAYLISTS_ENDPOINT } from './endpoints';

export const getUserPlaylists = async (access_token) => {
  return fetch(PLAYLISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
