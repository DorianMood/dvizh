import React, { createContext, useState, useEffect } from "react";
import firebase from "firebase";
import bridge from "@vkontakte/vk-bridge";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState();

  useEffect(() => {
    const app = firebase.app();
    app.auth().onAuthStateChanged((user) => {
      setUser(user);
    })
  }, []);

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;