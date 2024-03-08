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
} from "@tanstack/react-table";
import { TABLENAMEORDER, TABLENAMEORDERMAP } from "../types/table-type";
import { ITableData } from "../types/table-type";
import { useThemeContext } from "../context/ThemeContext";
type Coun_Table_props = {
  tableData: ITableData[];
};
// interface Default_Col {
//   header: string;
//   accessorKey: string;
//   cell: (info: any) => void;
// }

export default function CountryTable(props: Coun_Table_props) {
  const { currentMode } = useThemeContext();
  const { tableData } = props;
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
  });

  return (
    <table
      className={`w-full border-spacing-0 border-separate rounded-[5px] ${currentMode.shadow}`}
    >
      <thead className={`${currentMode.TH_background} h-10`}>
        {table.getHeaderGroups().map((headerGroup) => {
          //   console.log(headerGroup);
          return (
            <tr key={headerGroup.id} className="">
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id}>
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
                    className={`${index <= 3 ? "px-2 text-center" : ""} h-12`}
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
