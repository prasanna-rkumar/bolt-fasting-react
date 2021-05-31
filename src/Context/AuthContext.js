import { createContext, useState } from "react";
import * as axios from "../axios-helper";
import { auth } from "../firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [idToken, setIdToken] = useState(localStorage.getItem('idToken'));
  const [userData, setUserData] = useState();

  const logout = () => {
    setIdToken();
    setUserData();
    auth.signOut();
  }

  const refreshToken = () => {
    auth.currentUser.getIdToken().then(idToken => {
      setIdToken(idToken)
      localStorage.setItem('idToken', idToken);
      console.info('TOKEN REFRESHED')
    })
  }

  const login = (email, password) => {
    auth.signInWithEmailAndPassword(email, password).then(() => {
      auth.currentUser.getIdToken().then(idToken => {
        setIdToken(idToken)
        localStorage.setItem('idToken', idToken);
        axios.post({
          url: '/login',
          headers: {
            authorization: `Bearer ${idToken}`
          }
        }).then((resp) => {
          setUserData(resp.data)
        }).catch(e => {
          console.log(e)
        })
      })
    })
  }

  return (
    <AuthContext.Provider value={{
      idToken,
      userData,
      logout,
      login,
      refreshToken
    }}>
      {children}
    </AuthContext.Provider>
  );
}