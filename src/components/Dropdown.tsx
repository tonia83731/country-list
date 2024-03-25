import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { getRegion } from "../api/getCountryData.ts";
import { useEffect, useState } from "react";
import { useThemeContext } from "../context/ThemeContext.tsx";
import { useInputContext } from "../context/InputContext.tsx";

type Dropdown_props = {
  onOptionChange: (region: string) => void;
};

export default function Dropdown(props: Dropdown_props) {
  const { onOptionChange } = props;
  const { currentMode } = useThemeContext();
  const { selectOption } = useInputContext();
  const [regions, setRegions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getRegionAsync = async () => {
      const data = await getRegion();
      setRegions(data);
    };
    getRegionAsync();
  }, []);

  return (
    <div
      className={`w-full relative ${isOpen ? "active" : ""}`}
      id="custom-select"
    >
      <button
        className={`w-full h-12 rounded-[5px] px-6 flex justify-between items-center ${currentMode.I_background} ${currentMode.shadow}`}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <span className={`${currentMode.I_text}`}>
          {selectOption !== "" ? selectOption : "Filter by Region"}
        </span>
        <span className={`${currentMode.I_text}`}>
          <FontAwesomeIcon icon={faChevronDown} />
        </span>
      </button>
      <ul
        className={`w-full top-[52px] absolute z-40 py-1 ${currentMode.I_background} ${currentMode.shadow}`}
        id="select-dropdown"
      >
        {regions.map((region) => {
          return (
            <li
              key={region}
              className={`pt-1.5 pb-1.5 px-6 ${currentMode.hover}`}
            >
              <input
                id={region.toLowerCase()}
                type="radio"
                name="region"
                className="hidden"
                value={region.toLowerCase()}
                onChange={() => {
                  onOptionChange(region);
                  setIsOpen(false);
                  window.gtag("event", "region_filter", {
                    region_name: region,
                  });
                }}
              />
              <label htmlFor={region.toLowerCase()} className="cursor-pointer">
                {region}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
