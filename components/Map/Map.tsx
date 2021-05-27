import { useState, useEffect, useRef } from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { getPlaceName } from '~/lib/Api/reverseGeocoding';
import { Box } from '@chakra-ui/layout';
import { useBoolean } from '@chakra-ui/hooks';

export interface Props {
  isDestination: boolean;
  onPlacePicked: (_arg0: string) => void;
}

interface Point {
  lat: number;
  lng: number;
}
    // googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.NEXT_PUBLIC_GMAP_API_KEY}`,
    // loadingElement: <Box h="full" />,
    // containerElement: <Box h="full" />,
    // mapElement: <Box h="full" />,

export const Map = withScriptjs(withGoogleMap(({ isDestination, onPlacePicked }: Props) => {
  const [departure, setDeparture] = useState<Point>({ lat: 0, lng: 0 });
  const [destination, setDestination] = useState<Point>({ lat: 0, lng: 0 });
  const [showDep, setShowDep] = useBoolean(false);
  const [showDest, setShowDest] = useBoolean(false);
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
      try {
        const name = await getPlaceName(departure.lat, departure.lng);

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
      defaultCenter={{ lat: 50.449950585577824, lng: 30.52404566087585 }}
      onClick={handleMapClick}
    >
      {showDest && <Marker position={destination} />}
      {showDep && <Marker position={departure} />}
    </GoogleMap>
  );
}))

  



// export const Map = compose<Props, {}>(
//   withProps({
//     googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.NEXT_PUBLIC_GMAP_API_KEY}`,
//     loadingElement: <Box h="full" />,
//     containerElement: <Box h="full" />,
//     mapElement: <Box h="full" />,
//   }),
//   withScriptjs,
//   withGoogleMap
// )(({ isDestination, onPlacePicked }) => {
//   const [departure, setDeparture] = useState<Point>({ lat: 0, lng: 0 });
//   const [destination, setDestination] = useState<Point>({ lat: 0, lng: 0 });
//   const [showDep, setShowDep] = useBoolean(false);
//   const [showDest, setShowDest] = useBoolean(false);
//   const isInitialMount = useRef(true);

//   const handleMapClick = (data: any) => {
//     const point: Point = {
//       lat: data.latLng.lat(),
//       lng: data.latLng.lng(),
//     };

//     if (isDestination) {
//       setDestination(point);
//       return setShowDest.on();
//     }

//     setDeparture(point);
//     setShowDep.on();
//   };

//   useEffect(() => {
//     const placeName = async () => {
//       try {
//         const name = await getPlaceName(departure.lat, departure.lng);

//         onPlacePicked(name);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     if (isInitialMount.current) {
//       isInitialMount.current = false;
//     } else {
//       placeName();
//     }
//   }, [departure]);

//   return (
//     <GoogleMap
//       defaultZoom={8}
//       defaultCenter={{ lat: -34.397, lng: 150.644 }}
//       onClick={handleMapClick}
//     >
//       {showDest && <Marker position={destination} />}
//       {showDep && <Marker position={departure} />}
//     </GoogleMap>
//   );
// });
