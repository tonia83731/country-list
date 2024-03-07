import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faAnglesRight,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

type Page_props = {
  pages: number[];
  currentPage: number;
  totalPage: number;
  onPageClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onPageNumberClick: (page: number) => void;
};

export default function Pagination(props: Page_props) {
  const { pages, currentPage, totalPage, onPageClick, onPageNumberClick } =
    props;
  return (
    <div className="">
      <div>
        <button
          className="mr-2 hover:text-slate-500 disabled:text-slate-200"
          id="first-btn"
          onClick={(event) => onPageClick(event)}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon={faAnglesLeft} />
        </button>
        <button
          className="mr-2 hover:text-slate-500 disabled:text-slate-200"
          id="prev-btn"
          onClick={(event) => onPageClick(event)}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        {pages.map((page) => {
          return (
            <button
              className={`w-9 h-9 rounded-full hover:text-slate-500 ${
                currentPage === page ? "bg-lime-300 text-white" : ""
              }`}
              key={page}
              onClick={() => onPageNumberClick(page)}
            >
              {page}
            </button>
          );
        })}
        <button
          className="ml-2 hover:text-slate-500 disabled:text-slate-200"
          id="next-btn"
          onClick={(event) => onPageClick(event)}
          disabled={currentPage === totalPage}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
        <button
          className="ml-2 hover:text-slate-500 disabled:text-slate-200"
          id="last-btn"
          onClick={(event) => onPageClick(event)}
          disabled={currentPage === totalPage}
        >
          <FontAwesomeIcon icon={faAnglesRight} />
        </button>
      </div>
    </div>
  );
}
