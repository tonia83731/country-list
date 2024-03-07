import { ReactNode, createContext, useContext, useState } from "react";

interface InputContextProps {
  searchInput: string;
  setSearchInput: (searchInput: string) => void;
  selectOption: string;
  setSelectOption: (selectOption: string) => void;
}

const InputContext = createContext<InputContextProps | null>(null);

export const useInputContext = () => {
  const inputContext = useContext(InputContext);
  if (!inputContext) throw new Error("There is no context");
  return inputContext;
};

type Icontext_props = {
  children: ReactNode;
};

export const InputContextProvider = (props: Icontext_props) => {
  const { children } = props;
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectOption, setSelectOption] = useState<string>("");

  return (
    <InputContext.Provider
      value={{ searchInput, selectOption, setSearchInput, setSelectOption }}
    >
      {children}
    </InputContext.Provider>
  );
};
