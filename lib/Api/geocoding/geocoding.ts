import { Point } from '@lib/types';
import { api } from './api.axios';

export const getLatLng = async (place: string): Promise<Point> => {
  const data = (
    await api.get('/json', {
      params: {
        address: place.replace(" ", "+"),
      },
    })
  ).data.results[0].geometry.location;

  if (!data) {
    throw new Error('Geocoding API error!');
  }

  return data;
};
