/**
 * @jest-environment node
 */
import axios from 'axios';

const __key = 'AIzaSyCn2toRVcoV6grE1MJM2sUVWjV8as3YbDc';

const api = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/geocode/',
  params: {
    key: __key, //process.env.NEXT_PUBLIC_GMAP_API_KEY,
  },
});

export const getPlaceName = async (lat: number | string, lng: number | string) => {
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
