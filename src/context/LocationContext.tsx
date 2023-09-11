import React, { createContext, useState, useEffect } from "react";

interface LocationContextProps {
  children: React.ReactNode;
}

interface LocationContextValue {
  location: string | null;
  updateLocation: (newLocation: string) => void;
}

const LocationContext = createContext<LocationContextValue | null>(null);

export const LocationProvider: React.FC<LocationContextProps> = ({ children }) => {
  const [location, setLocation] = useState<string | null>(localStorage.getItem("Location"));

  useEffect(() => {
    const storedLocation = localStorage.getItem("Location");
    if (storedLocation) {
      const locationArray = storedLocation.split(",");
      const lastElement = locationArray[locationArray.length - 1];
      setLocation(lastElement.toUpperCase());
    }
  }, []);

  const updateLocation = (newLocation: string) => {
    setLocation(newLocation);
  };

  const contextValue: LocationContextValue = {
    location,
    updateLocation
  };

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;