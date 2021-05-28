import { getPlaceName } from '../geocoding/reverseGeocoding';


describe('Reverse Geocoding', () => {
  it('Returns adress from geocoded data', async () => {
    const lat = '40.714224';
    const lng = '-73.961452';
    const name = await getPlaceName(lat, lng);

    console.log(name);

    expect(name).toBeDefined();

  })
})