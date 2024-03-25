import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";

export default function Header() {
  const { mode, setMode, currentMode } = useThemeContext();

  const modeBtnRender =
    mode === "dark" ? (
      <>
        <FontAwesomeIcon icon={faSun} className="mr-2 text-md" /> Light mode
      </>
    ) : (
      <>
        <FontAwesomeIcon icon={faMoon} className="mr-2 text-md" /> Dark mode
      </>
    );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full h-20 px-4 flex justify-between items-center md:px-20 ${currentMode.H_background} ${currentMode.shadow}`}
    >
      <Link
        to="/"
        className="font-extrabold text-sm md:text-2xl"
        onClick={() => {
          window.gtag("event", "link_click", {
            link_text: "Where in the world?",
            link_url: "/",
          });
        }}
      >
        Where in the world?
      </Link>
      <button
        className="flex items-center text-xs"
        onClick={() => {
          if (mode === "light") {
            setMode("dark");
            window.gtag("event", "mode_switch", {
              event_label: "dark",
            });
          } else {
            setMode("light");
            window.gtag("event", "mode_switch", {
              event_label: "light",
            });
          }
        }}
      >
        {modeBtnRender}
      </button>
    </header>
  );
}
