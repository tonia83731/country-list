import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useThemeContext } from "../context/ThemeContext";
import { useEffect, useState } from "react";
import { getCountriesByCode } from "../api/getCountryData";
import { CountryItem } from "../types/response-type";
import Loading from "../components/Loading";
import { formattedNum } from "../helpers/formattedNum";

type BorderCountryObj = {
  name: string;
  param: string;
};

export default function DetailPage() {
  console.log("guide");
  const { currentMode } = useThemeContext();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setCountryData] = useState<CountryItem>();
  const [borderCountry, setBorderCountry] = useState<BorderCountryObj[]>([]);

  const naitveNameArr = [];
  const nativeName = data?.name.nativeName;
  for (const key in nativeName) {
    const value = nativeName[key];
    naitveNameArr.push(value);
  }
  const currenciesArr = [];
  const currencies = data?.currencies;
  for (const key in currencies) {
    const value = currencies[key];
    currenciesArr.push(value);
  }
  const languagesArr = [];
  const languages = data?.languages;
  for (const key in languages) {
    const value = languages[key];
    languagesArr.push(value);
  }

  const renderBorderCountry = borderCountry.map((con) => {
    return (
      <Link
        key={con.param}
        to={`/detail/${con.param}`}
        className={`${currentMode.I_background} ${currentMode.shadow} rounded-sm px-7 py-2 mr-2 h-10 truncate text-center`}
      >
        {con.name}
      </Link>
    );
  });

  useEffect(() => {
    const getCountriesByCodeAsync = async () => {
      setIsLoading(true);
      if (typeof id === "string") {
        const data = await getCountriesByCode(id);
        if (data) {
          setIsLoading(false);
          setCountryData(data[0]);

          const bordersDataArr: BorderCountryObj[] = await Promise.all(
            data[0]?.borders?.map(async (border) => {
              const borderData = await getCountriesByCode(border);
              const obj = {
                name: borderData[0].name.official,
                param: borderData[0].cca3,
              };
              return obj;
            })
          );
          setBorderCountry(bordersDataArr);
        }
      }
    };
    getCountriesByCodeAsync();
  }, [id]);
  return (
    <>
      <Link
        to="/"
        className={`${currentMode.I_background} ${currentMode.shadow} px-6 py-2 rounded-sm 900:rounded-900`}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        <span className="ml-2">Back</span>
      </Link>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mt-20 900:grid 900:grid-cols-2 900:gap-20">
          <img
            src={data?.flags.png}
            alt={data?.flags.alt}
            className="w-full h-full object-cover object-center"
          />
          <div className="pt-12 900:pt-0">
            <h5 className="font-extrabold text-[22px] 900:text-[32px]">
              {data?.name.official}
            </h5>
            <div className="text-sm font-semibold 900:text-base">
              <div className="900:grid 900:grid-cols-2 900:gap-28 900:pt-6">
                <div className="pt-6 900:pt-0">
                  <div className="">
                    Native Name:{" "}
                    <span className="ml-1 font-light">
                      {naitveNameArr[0].official}
                    </span>
                  </div>
                  <div className="">
                    Population:{" "}
                    <span className="ml-1 font-light">
                      {typeof data?.population === "number" &&
                        formattedNum(data?.population)}
                    </span>
                  </div>
                  <div className="">
                    Region:{" "}
                    <span className="ml-1 font-light">{data?.region}</span>
                  </div>
                  <div className="">
                    Sub Region:{" "}
                    <span className="ml-1 font-light">{data?.subregion}</span>
                  </div>
                </div>
                <div className="pt-8 900:pt-0">
                  <div className="">
                    Top Level Domain:{" "}
                    <span className="ml-1 font-light">{data?.tld}</span>
                  </div>
                  <div className="">
                    Currencies:{" "}
                    <span className="ml-1 font-light">
                      {currenciesArr[0].name}
                    </span>
                  </div>
                  <div className="">
                    Languages:{" "}
                    {languagesArr.map((lan: string, index: number) => {
                      return (
                        <span key={lan} className="ml-1 font-light">
                          {lan}{" "}
                          {index !== languagesArr.length - 1 && (
                            <span className="">,</span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="pt-8 flex flex-col">
                <div className="font-semibold">Border Countries:</div>
                {data?.borders === undefined ? (
                  <div className="ml-1 mt-4">-</div>
                ) : (
                  <div className="w-full mt-4 grid grid-cols-2 gap-4 900:grid-cols-3">
                    {renderBorderCountry}
                  </div>
                )}
                {/* <div className="ml-1 mt-4 flex gap-2">
                  {data?.borders === undefined ? "-" : renderBorderCountry}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
