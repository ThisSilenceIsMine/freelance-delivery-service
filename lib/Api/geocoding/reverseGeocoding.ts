/**
 * @jest-environment node
 */
import { api } from './api.axios';

export const getPlaceName = async (lat: number | string, lng: number | string): Promise<string> => {
  try {
    const data = (
      await api.get('/json', {
        params: {
          latlng: `${lat},${lng}`,
        },
      })
    ).data;

    return data.results[0].formatted_address;
  } catch (error) {
    console.log('ERROR' + error);

    return null;
  }
};
