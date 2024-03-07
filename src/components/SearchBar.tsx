import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useThemeContext } from "../context/ThemeContext";
import { useInputContext } from "../context/InputContext";

type Search_props = {
  onSearchClick: () => void;
};

export default function SearchBar(props: Search_props) {
  const { onSearchClick } = props;
  const { currentMode } = useThemeContext();
  const { searchInput, setSearchInput } = useInputContext();
  return (
    <div
      className={`${currentMode.I_background} ${currentMode.shadow} relative h-12 rounded-[5px]`}
    >
      <button
        className="absolute top-1/2 left-8 translate-y-[-50%]"
        onClick={onSearchClick}
      >
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={`${currentMode.I_text}`}
        />
      </button>
      <input
        type="text"
        className="px-20 leading-[48px] bg-transparent"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search for a country..."
      />
    </div>
  );
}
