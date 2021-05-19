import { useState, useEffect } from 'react';

interface WindowDimensions {
  width?: number;
  height?: number;
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({width: undefined, height: undefined});

  useEffect(() => {

    function handleResize() {
      const { innerWidth: width, innerHeight: height } = window;
      setWindowDimensions({ width, height });
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);

      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return windowDimensions;
};
