import { useState, useEffect, useRef } from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { Box } from '@chakra-ui/layout';
import { useBoolean } from '@chakra-ui/hooks';

import { getPlaceName } from '~/lib/Api/geocoding/reverseGeocoding';
import { Point } from '~/lib/types';

export interface Props {
  initialDeparture?: Point;
  initialDestination?: Point;
  isViewOnly?: boolean;
  isDestination: boolean;
  onPlacePicked?: (_arg0: string) => void;
}

const defaultCenter: Point = { lat: 50.449950585577824, lng: 30.52404566087585 };

export const Map = withScriptjs(
  withGoogleMap(
    ({
      isDestination,
      onPlacePicked,
      isViewOnly,
      initialDeparture, //= { lat: 0, lng: 0 },
      initialDestination, //= { lat: 0, lng: 0 },
    }: Props) => {
      const [departure, setDeparture] = useState<Point>(initialDeparture ?? { lat: 0, lng: 0 });
      const [destination, setDestination] = useState<Point>(
        initialDestination ?? { lat: 0, lng: 0 }
      );
      const [showDep, setShowDep] = useBoolean(isViewOnly);
      const [showDest, setShowDest] = useBoolean(isViewOnly);
      const isInitialMount = useRef(true);

      const handleMapClick = (data: any) => {
        const point: Point = {
          lat: data.latLng.lat(),
          lng: data.latLng.lng(),
        };

        if (isDestination) {
          setDestination(point);
          return setShowDest.on();
        }

        setDeparture(point);
        setShowDep.on();
      };

      useEffect(() => {
        const placeName = async () => {
          if (!onPlacePicked) {
            return;
          }
          try {
            let name;
            if (isDestination) {
              name = await getPlaceName(destination.lat, destination.lng);
            } else {
              name = await getPlaceName(departure.lat, departure.lng);
            }

            onPlacePicked(name);
          } catch (error) {
            console.error(error);
          }
        };

        if (isInitialMount.current) {
          isInitialMount.current = false;
        } else {
          placeName();
        }
      }, [departure, destination]);

      return (
        <GoogleMap
          defaultZoom={8}
          defaultCenter={isViewOnly ? initialDeparture : defaultCenter}
          onClick={isViewOnly ? () => {} : handleMapClick}
        >
          {showDest && <Marker position={destination} />}
          {showDep && <Marker position={departure} />}
        </GoogleMap>
      );
    }
  )
);
