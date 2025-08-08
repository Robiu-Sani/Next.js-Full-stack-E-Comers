"use client";

import { createContext, useState, ReactNode } from "react";

type ContextValue = {
  test: string;
  handleTest: (data: string) => void;
  //   isBangla: boolean;
  //   sidebarOpen: boolean;
  //   handleLanguage: () => void;
  //   toggleSidebar: () => void;
};

export const ContextData = createContext<ContextValue | undefined>(undefined);

type ContextProviderProps = {
  children: ReactNode;
};

export default function Context({ children }: ContextProviderProps) {
  const [test, setTest] = useState<string>("hello world");

  const handleTest = (data: string) => {
    setTest(data);
  };

  const value: ContextValue = {
    test,
    handleTest,
  };

  return <ContextData.Provider value={value}>{children}</ContextData.Provider>;
}
