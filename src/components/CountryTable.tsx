// ccn3
// cca3
// region
// official name
// capital
// poputation
// area

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { useState } from "react";
import { TABLENAMEORDER, TABLENAMEORDERMAP } from "../types/table-type";
import { ITableData } from "../types/table-type";
import { useThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";
type Coun_Table_props = {
  tableData: ITableData[];
};

export default function CountryTable(props: Coun_Table_props) {
  const { currentMode } = useThemeContext();
  const { tableData } = props;
  const [sorting, setSorting] = useState<SortingState>([]);
  const columnHelper = createColumnHelper();

  //   const sortKeys = tableData[0]
  //     ? TABLENAMEORDER.filter((key) =>
  //         Object.prototype.hasOwnProperty.call(tableData[0], key)
  //       )
  //     : [];

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
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
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
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                    {/* {flexRender(cell.column.columnDef.cell, cell.getContext())} */}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
