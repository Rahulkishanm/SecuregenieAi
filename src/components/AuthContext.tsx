// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth ,firestore } from '../utils/firebase-config';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';

const AuthContext = createContext({
  currentUser:"", login:()=>{console.log("we tried to login from null context")}, logout:()=>{} 
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = () => {
    console.log("we are here safe")

    return signInWithPopup(auth, new GoogleAuthProvider());
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = { currentUser, login, logout };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
