import { createContext, useEffect, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth'
import * as axios from "../axios-helper";
import { auth } from "../firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [idToken, setIdToken] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (user) {
      auth.currentUser.getIdToken().then(idToken => {
        setIdToken(idToken)
        localStorage.setItem('idToken', idToken);
        axios.post({
          url: '/login',
          data: {
            name: user.displayName,
            email: user.email
          }
        }).then((resp) => {
          setUserData(resp.data)
        }).catch(e => {
          console.log(e)
        })
      })

    }
  }, [user])

  const logout = () => {
    setIdToken();
    setUserData();
    auth.signOut();
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      idToken,
      userData,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}