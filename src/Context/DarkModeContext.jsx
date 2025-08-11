// ----- 1/ Create the Context ------

import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkContext = createContext();

// ----- 2/ Create Function has the logic and return the provider ------
function ContextProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "isDarkMode"
  );
  function DarkModeToggle() {
    setIsDarkMode((prev) => !prev);
  }
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);
  return (
    <DarkContext.Provider value={{ DarkModeToggle, isDarkMode }}>
      {children}
    </DarkContext.Provider>
  );
}
// ----- 3/ Create custom hook to use it ------
function useDarkMode() {
  const context = useContext(DarkContext);
  if (context === undefined)
    throw new Error("DarkModeContext was used outside of DarkModeProvider)");
  return context;
}
// ----- 4/ Export Provider and Custom Hook ------
export { useDarkMode, ContextProvider };
