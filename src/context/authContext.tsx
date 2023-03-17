import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

interface ContextAuth {
  userLogged: User | null;
  isLogged: boolean;
}

const authContext = createContext({} as ContextAuth);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [userLogged, setUserLogged] = useState<User | null>(null);
  const [isLogged, setIsLogged] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserLogged(currentUser);
      setIsLogged(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <authContext.Provider value={{ userLogged, isLogged }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(authContext);

  return context;
};
