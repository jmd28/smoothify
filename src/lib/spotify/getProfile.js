import { PROFILE_ENDPOINT } from './endpoints';

export const getProfile = async (access_token) => {
  return await fetch(PROFILE_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
