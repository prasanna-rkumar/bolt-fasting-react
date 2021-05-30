import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

const SERVER = 'http://localhost:8042'

export const AxiosContext = createContext();

const instance = axios.create({
  baseURL: SERVER,
  headers: {
    authorization: `Bearer ${localStorage.getItem('idToken')}`
  }
})

export const AxiosProvidder = ({ children }) => {
  const { idToken } = useContext(AuthContext);
  const [axiosClient, setAxiosClient] = useState(() => instance);

  useEffect(() => {
    const instance = axios.create({
      baseURL: SERVER,
      headers: {
        authorization: `Bearer ${idToken}`
      }
    });
    setAxiosClient(() => instance);
  }, [idToken])

  return (
    <AxiosContext.Provider value={{
      axiosClient
    }}>
      {children}
    </AxiosContext.Provider>
  );
}
