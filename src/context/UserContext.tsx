import React, { createContext, useState, ReactNode } from "react";
import { IUser } from "../models";

interface UserContextProps {
  user: IUser | null;
  role: string | null;
  setUser: (user: IUser | null) => void;
  setRole: (role: string | null) => void;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  role: null,
  setUser: () => {},
  setRole: () => {},
});

export const UserProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [role, setRole] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ user, role, setUser, setRole }}>
      {children}
    </UserContext.Provider>
  );
};