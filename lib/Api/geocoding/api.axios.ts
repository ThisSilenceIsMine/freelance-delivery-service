import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/geocode/',
  params: {
    key: process.env.NEXT_PUBLIC_GMAP_API_KEY,
  },
});
