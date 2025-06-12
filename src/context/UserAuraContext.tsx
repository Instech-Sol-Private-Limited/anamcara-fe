"use client";
import { createContext, useContext, useState } from "react";

const UserAuraContext = createContext({
  auraClass: "",
  setAuraClass: (cls: string) => {cls},
});

export function UserAuraProvider({ children }: { children: React.ReactNode }) {
  const [auraClass, setAuraClass] = useState("");
  return (
    <UserAuraContext.Provider value={{ auraClass, setAuraClass }}>
      {children}
    </UserAuraContext.Provider>
  );
}

export function useUserAura() {
  return useContext(UserAuraContext);
}