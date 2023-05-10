import { createContext, useEffect, useState } from "react";
import { getSignedinUser } from "../api";
import { useQuery } from "@tanstack/react-query";
import { deleteItem, setItem } from "../libs/storage";
import { useSignedinUserQuery } from "../api/rtkApi";
import { Text } from "react-native";

type AuthContextProps = {
  isLoading: boolean;
  user?: User | null;
};

const AuthContext = createContext<AuthContextProps>({
  isLoading: true,
} as AuthContextProps);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, isError, refetch } = useSignedinUserQuery();

  if (isLoading) {
    return null;
  }
  
  return (
    <AuthContext.Provider
      value={{ isLoading, user: data && data.success ? data.user : null }}
    > 
      {isError ? <Text>An error has occured</Text> : isLoading ? null : children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
