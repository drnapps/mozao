/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";
import { UserDTO } from "../dtos/UserDTO";

type Theme = "light" | "dark";
type Menu = "none" | "block";

type AppContextProps = {
  theme: Theme;
  changeTheme?: () => void;
  menu: Menu;
  changeMenu?: () => void;
};

type AppProviderProps = {
  children?: any;
};

const AppContext = createContext({} as AppContextProps);

export function AppProvider(props: AppProviderProps) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [menu, setMenu] = useState<Menu>("none");

  function changeTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  function changeMenu() {
    console.log(menu)
    setMenu(menu === "none" ? "block" : "none");
  }

  return (
    <AppContext.Provider value={{ theme, changeTheme, menu, changeMenu }}>
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContext;
