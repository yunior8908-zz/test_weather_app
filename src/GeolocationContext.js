import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';

const GeolocationContext = createContext({});

export const GeolocationContextProvider = ({ children }) => {
  const [position, setPosition] = useState({});

  useEffect(() => {
    const watcher = window.navigator.geolocation.watchPosition(
      success => {
        setPosition({ lat: success.coords.latitude, lon: success.coords.longitude });
      },
      err => {
        console.log(err);
      }
    );

    return () => {
      window.navigator.geolocation.clearWatch(watcher);
    };
  }, []);

  const memoizedPosition = useMemo(() => position, [position]);

  return <GeolocationContext.Provider value={{ ...memoizedPosition }}>{children}</GeolocationContext.Provider>;
};

export const useGeolocationContext = () => {
  const value = useContext(GeolocationContext);
  if (!value) throw new Error(`"useGeolocationContext" only works inside "GeolocacionContextProvider"`);
  return { ...value };
};
