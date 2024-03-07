import { ReactNode, createContext, useContext, useState } from "react";
import { IMode, ITheme, Mode } from "../types/color-theme";

interface ThemeContextProps {
  mode: IMode;
  setMode: (mode: IMode) => void;
  currentMode: ITheme;
}

const ThemeContext = createContext<ThemeContextProps | null>(null);

export const useThemeContext = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) throw new Error("There is no context");
  return themeContext;
};

type Tcontext_props = {
  children: ReactNode;
};

export const ThemeContextProvider = (props: Tcontext_props) => {
  const { children } = props;
  const [mode, setMode] = useState<IMode>("light");
  const currentMode = Mode[mode];

  return (
    <ThemeContext.Provider value={{ mode, setMode, currentMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
