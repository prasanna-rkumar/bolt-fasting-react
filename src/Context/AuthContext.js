import { createContext } from "react";
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "../firebase";

export const AuthContext = createContext();

export const AuthProvider = () => {
  const [user, loading] = useAuthState(auth);

  

  return {
    user,
    loading
  }
}