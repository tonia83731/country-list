import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import { TABLENAMEORDER, TABLENAMEORDERMAP } from "../types/table-type";
import { ITableData } from "../types/table-type";
import { useThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faAnglesRight,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

type Coun_Table_props = {
  tableData: ITableData[];
};

export default function CountryTable(props: Coun_Table_props) {
  const { currentMode } = useThemeContext();
  const { tableData } = props;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 15,
  });
  const columnHelper = createColumnHelper();

  const defaultColumns = TABLENAMEORDER.map((key: string) => {
    return columnHelper.accessor(key, {
      header: `${TABLENAMEORDERMAP.get(key)}`,
      cell: (info) => {
        return info.getValue();
      },
    });
  });

  const table = useReactTable({
    data: tableData,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting: sorting,
      pagination: pagination,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false,
    debugTable: true,
  });

  return (
    <>
      <table
        className={`w-full border-spacing-0 border-separate rounded-md ${currentMode.shadow}`}
      >
        <thead className={`${currentMode.TH_background} h-10`}>
          {table.getHeaderGroups().map((headerGroup) => {
            //   console.log(headerGroup);
            return (
              <tr key={headerGroup.id} className="">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      {...{ onClick: header.column.getToggleSortingHandler() }}
                      className="cursor-pointer"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => {
            return (
              <tr
                className={
                  index % 2 === 0
                    ? `${currentMode.TB_background_even}`
                    : `${currentMode.TB_background_odd}`
                }
                key={row.id}
              >
                {row.getVisibleCells().map((cell, index) => {
                  return (
                    <td
                      className={`${
                        index <= 3 || index >= TABLENAMEORDER.length - 2
                          ? "px-2 text-center"
                          : ""
                      } h-12`}
                      key={cell.id}
                    >
                      {index === 1 ? (
                        <Link to={`/detail/${cell.row.original?.cca3}`}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Link>
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-6 flex justify-end">
        <div className="flex">
          <button
            className="mr-2 hover:text-slate-500 disabled:text-slate-200"
            id="first-btn"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <FontAwesomeIcon icon={faAnglesLeft} />
          </button>
          <button
            className="mr-2 hover:text-slate-500 disabled:text-slate-200"
            id="prev-btn"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <span className="flex">
            <div
              className={`text-center ${currentMode.I_background} ${currentMode.shadow}`}
            >
              <input
                type="number"
                min={1}
                max={table.getPageCount()}
                className="text-center bg-transparent"
                value={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
              />
            </div>
            <div className="ml-2">of {table.getPageCount()}</div>
          </span>
          <button
            className="ml-2 hover:text-slate-500 disabled:text-slate-200"
            id="next-btn"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
          <button
            className="ml-2 hover:text-slate-500 disabled:text-slate-200"
            id="last-btn"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <FontAwesomeIcon icon={faAnglesRight} />
          </button>
        </div>
      </div>
    </>
  );
}
