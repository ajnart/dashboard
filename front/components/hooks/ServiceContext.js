import { createContext, useState } from 'react';
import { providers } from "../Providers"

export const ServiceContext = createContext();

export function ServiceContextProvider(props) {
  const [selectedService, selectService] = useState();
  const [activatedServices, setActivatedServices] = useState();
  return (
    <ServiceContext.Provider value={{
      selectedService,
      selectService,
      activatedServices,
      setActivatedServices,
      providers
    }}>
      {props.children}
    </ ServiceContext.Provider>
  );
}

