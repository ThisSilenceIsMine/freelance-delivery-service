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

const defaultCenter: Point = { lat: 50.4501, lng: 30.5234 };

export const Map = withScriptjs(
  withGoogleMap(
    ({
      isDestination,
      onPlacePicked,
      isViewOnly,
      initialDeparture, //= { lat: 0, lng: 0 },
      initialDestination, //= { lat: 0, lng: 0 },
    }: Props) => {
      const [departure, setDeparture] = useState<Point>(initialDeparture ?? defaultCenter);
      const [destination, setDestination] = useState<Point>(initialDestination ?? defaultCenter);
      const [showDep, setShowDep] = useBoolean(!!initialDeparture || isViewOnly);
      const [showDest, setShowDest] = useBoolean(!!initialDestination || isViewOnly);
      const isInitialMount = useRef(true);

      console.log(`Dep Prop: ${JSON.stringify(initialDeparture)}`);
      console.log(`Dest Prop: ${JSON.stringify(initialDestination)}`);
      console.log(`Dep State: ${JSON.stringify(departure)}`);
      console.log(`Dest State: ${JSON.stringify(destination)}`);
      console.log('-------------------------------');
      
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
        if (!initialDestination || !initialDeparture) {
          return;
        }
        
        setDeparture(initialDeparture);
        setDestination(initialDestination);
      }, [initialDeparture, initialDestination])

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
          defaultCenter={departure || defaultCenter}
          onClick={isViewOnly ? () => {} : handleMapClick}
        >
          {showDest && <Marker position={destination} />}
          {showDep && <Marker position={departure} />}
        </GoogleMap>
      );
    }
  )
);
