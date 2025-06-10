import { useRouter } from "expo-router";
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const signIn = (userData) => {
    setUser(userData);
    setIsSignedIn(true);
    router.replace("/(tabs)");
  };

  const signOut = () => {
    setUser(null);
    setIsSignedIn(false);
    router.replace("/(auth)/sign-in");
  };

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
