import Dropdown from "../components/Dropdown";
import SearchBar from "../components/SearchBar";
import CountryCard from "../components/CountryCard";

import {
  getAllCountries,
  getCountriesByName,
  getCountriesByRegion,
} from "../api/getCountryData";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import { CountryItem } from "../types/response-type";
import { useInputContext } from "../context/InputContext";
import Loading from "../components/Loading";
import { useThemeContext } from "../context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons";

export default function HomePage() {
  const { currentMode } = useThemeContext();
  const { searchInput, setSearchInput, setSelectOption } = useInputContext();
  const [countryList, setCountryList] = useState<CountryItem[]>([]);
  const countryLength = countryList?.length;
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const perPage = 8;
  const showPage = 5;
  const numPage = Math.ceil(countryLength / perPage);
  const numArray = Array.from({ length: numPage }, (_, index) => index + 1);
  const showNumArray =
    currentPage < 3
      ? numArray.slice(0, 5)
      : currentPage > numPage - 2
      ? numArray.slice(numPage - showPage, numPage)
      : numArray.slice(currentPage - 3, currentPage + 2);
  const firstIndex = (currentPage - 1) * perPage;
  const lastIndex = currentPage * perPage;
  const showData: CountryItem[] = countryList.slice(firstIndex, lastIndex);

  const handlePageClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.id;
    if (currentPage > 1 && id === "first-btn") setCurrentPage(1);
    else if (currentPage > 1 && id === "prev-btn")
      setCurrentPage(currentPage - 1);
    else if (currentPage < numPage && id === "last-btn")
      setCurrentPage(numPage);
    else if (currentPage < numPage && id === "next-btn")
      setCurrentPage(currentPage + 1);
  };
  const handlePageNumberClick = (page: number) => {
    setCurrentPage(page);
  };
  const handleSearchClick = async () => {
    setIsLoading(true);
    if (!searchInput || searchInput.trim() === "") return;
    const searchValue = searchInput.trim().toLowerCase();
    const searchData = await getCountriesByName(searchValue);
    window.gtag("event", "country_search", {
      search_text: searchValue,
    });
    if (searchData) {
      setIsLoading(false);
      setCountryList(searchData);
      setSearchInput("");
      setSelectOption("");
    }
  };
  const handleOptionChange = async (region: string) => {
    setIsLoading(true);
    const changeData = await getCountriesByRegion(region);
    if (changeData) {
      setIsLoading(false);
      setCountryList(changeData);
      setSelectOption(region);
    }
  };

  useEffect(() => {
    const getAllCountriesAsync = async () => {
      const data = await getAllCountries();
      if (data) {
        setIsLoading(false);
        setCountryList(data);
      }
    };
    getAllCountriesAsync();
  }, []);

  return (
    <>
      <div className="md:flex md:justify-between md:items-center">
        <div className="flex gap-2 items-center">
          <SearchBar onSearchClick={handleSearchClick} />
          <Link
            to="/table"
            title="To Table"
            className={`${currentMode.I_background} ${currentMode.shadow} rounded-[5px] px-6 h-12 flex justify-between items-center text-lg`}
            onClick={() => {
              window.gtag("event", "link_click", {
                link_text: "To Table",
                link_url: "/table",
              });
            }}
          >
            <FontAwesomeIcon icon={faTable} />
          </Link>
        </div>
        <div className="mt-10 md:mt-0 md:w-[200px]">
          <Dropdown onOptionChange={handleOptionChange} />
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-6 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {showData.map((country, index) => {
              // console.log(country);
              return (
                <Link
                  to={`/detail/${country?.cca3}`}
                  key={`country-${index}`}
                  className=""
                >
                  <CountryCard country={country} />
                </Link>
              );
            })}
          </div>
          <div className="mt-6">
            <Pagination
              pages={showNumArray}
              currentPage={currentPage}
              totalPage={numPage}
              onPageClick={handlePageClick}
              onPageNumberClick={handlePageNumberClick}
            />
          </div>
        </div>
      )}
    </>
  );
}
