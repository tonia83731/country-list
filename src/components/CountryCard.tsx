import { useThemeContext } from "../context/ThemeContext";
import { CountryItem } from "../types/response-type";

type Card_props = {
  country: CountryItem;
};

export default function CountryCard(props: Card_props) {
  const { currentMode } = useThemeContext();
  const { country } = props;
  const { name, population, region, capital, flags } = country;
  return (
    <div
      className={`rounded-[5px] ${currentMode.H_background} ${currentMode.shadow}`}
    >
      <img
        src={flags?.png}
        alt={flags?.alt}
        className="w-full h-[125px] object-cover object-center"
      />
      <div className="pt-6 pb-12 px-6">
        <h5 className="text-lg font-extrabold h-[60px] truncate">
          {name?.official}
        </h5>
        <div className="mt-6 text-sm font-semibold">
          <div className="">
            Population: <span className="font-light">{population}</span>
          </div>
          <div className="">
            Region: <span className="font-light">{region}</span>
          </div>
          <div className="">
            Capital: <span className="font-light">{capital}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
