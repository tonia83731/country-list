export interface ITheme {
  background: string;
  H_background: string; // header
  I_background: string; // input
  text: string;
  I_text: string;
  shadow: string;
  hover: string;
}

export const darkMode: ITheme = {
  background: "bg-dark-bg",
  H_background: "bg-dark",
  I_background: "bg-dark",
  text: "text-light",
  I_text: "text-light",
  shadow: "",
  hover: "hover:bg-dark-bg",
};
export const lightMode: ITheme = {
  background: "bg-light-bg",
  H_background: "bg-light",
  I_background: "bg-light",
  text: "text-light-text",
  I_text: "text-light-text",
  shadow: "drop-shadow-md",
  hover: "hover:bg-slate-100",
};

export type IMode = "light" | "dark";

export const Mode = {
  dark: darkMode,
  light: lightMode,
};
