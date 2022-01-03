import LoadingModal from 'components/LoadingModal';
import React, {createContext, useContext, useState} from 'react';

const LoadingContext = createContext<{
  isLoading: boolean;
  setIsLoading: any;
  loadingMessage: string;
  setLoadingMessage: any;
}>({
  isLoading: false,
  setIsLoading: () => {},
  loadingMessage: 'Loading',
  setLoadingMessage: () => {},
});

export const LoadingProvider = ({children}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading');

  return (
    <LoadingContext.Provider
      value={{isLoading, setIsLoading, loadingMessage, setLoadingMessage}}>
      {children}
      <LoadingModal isOpen={isLoading} message={loadingMessage} />
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
