import React, { createContext, ReactNode, useContext, useState } from 'react'
import { AppContextType, ToastMessageType } from '../misc/types';
import { useQuery } from 'react-query';
import { validateLogin } from '../api-client';
import Loading from '../components/Loading';
import { Toast } from '../components/Toast';

interface Props {
  children: ReactNode;
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const AppProvider = ({ children }: Props): React.JSX.Element => {
  const [toast, setToast] = useState<ToastMessageType | undefined>(undefined)

  const { isError, isLoading } = useQuery("validateToken", validateLogin, {
    retry: false,
    refetchOnWindowFocus: false
  })

  if (isLoading)
    return <Loading />

  return (
    <AppContext.Provider
      value={{
        isLoggedIn: !isError,
        showToast: (toastMessage) => setToast(toastMessage)
      }}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const CONTEXT = useContext(AppContext)
  return CONTEXT as AppContextType
}

export default AppProvider
