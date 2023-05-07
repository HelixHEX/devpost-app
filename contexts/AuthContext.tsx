import { createContext, useEffect, useState } from "react";
import { getSignedinUser } from "../api";
import { useQuery } from "@tanstack/react-query";
import { deleteItem } from "../libs/storage";

type AuthContextProps = {
  isLoading: boolean;
  user?: User;
};

const AuthContext = createContext<AuthContextProps>({
  isLoading: true,
} as AuthContextProps);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getSignedinUser,
  });

  if (isLoading) {
    return null;
  }
  return (
    <AuthContext.Provider
      value={{ isLoading, user: data.success ? data.user : null }}
    >
      {isLoading ? null : children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
