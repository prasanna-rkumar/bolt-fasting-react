import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

const SERVER = 'http://localhost:8042'

export const AxiosContext = createContext();

export const AxiosProvidder = ({ children }) => {
  const { idToken, refreshToken } = useContext(AuthContext);
  const [axiosClient, setAxiosClient] = useState(() => (
    axios.create({
      baseURL: SERVER,
      headers: {
        authorization: `Bearer ${idToken}`
      }
    })
  ));

  useEffect(() => {
    if (idToken) {
      const instance = axios.create({
        baseURL: SERVER,
        headers: {
          authorization: `Bearer ${idToken}`
        }
      });
      setAxiosClient(() => instance);
    }
  }, [idToken])

  return (
    <AxiosContext.Provider value={{
      axiosClient,
      refreshToken
    }}>
      {children}
    </AxiosContext.Provider>
  );
}
