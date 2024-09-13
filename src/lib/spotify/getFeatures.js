import { FEATURES_ENDPOINT } from './endpoints';

export const getFeatures = async (access_token, [...ids]) => {
  console.log("requested for ", ids)
  console.log(`/${ids.join(',')}`)

  return fetch(FEATURES_ENDPOINT + `?ids=${ids.join(',')}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
