import React, { ReactNode, createContext, useContext, useState } from "react";

type LocationContextType = {
  location: {
    lat: number;
    lng: number;
  } | null;
  setLocation: (
    location: {
      lat: number;
      lng: number;
    } | null
  ) => void;
};

const LocationContext = createContext<LocationContextType>({
  location: null,
  setLocation: () => {},
});

type LocationProviderProps = {
  children: ReactNode;
};

export const LocationProvider: React.FC<LocationProviderProps> = ({
  children,
}) => {
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
