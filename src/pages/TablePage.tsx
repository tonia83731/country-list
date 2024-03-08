import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip } from "@fortawesome/free-solid-svg-icons";
import { useThemeContext } from "../context/ThemeContext";
import { useState, useEffect } from "react";
import { ITableData } from "../types/table-type";
import { getAllCountries } from "../api/getCountryData";
import { CountryItem } from "../types/response-type";
import CountryTable from "../components/CountryTable";
import { formattedNum } from "../helpers/formattedNum";

export default function TablePage() {
  const { currentMode } = useThemeContext();
  const [tableData, setTableData] = useState<ITableData[]>([]);

  useEffect(() => {
    const getAllCountriesAsync = async () => {
      const datas = await getAllCountries();
      const table = datas.map((data: CountryItem): ITableData => {
        const formattedPopulation = formattedNum(data.population);
        const formattedARea = formattedNum(data.area);
        const object: ITableData = {
          ccn3: data.ccn3,
          cca3: data.cca3,
          region: data.region,
          official_name: data.name?.official,
          captial: data.capital,
          population: formattedPopulation,
          area: formattedARea,
        };
        return object;
      });
      setTableData(table);
    };
    getAllCountriesAsync();
  }, []);
  return (
    <>
      <div className="md:flex md:justify-between md:items-center">
        <Link
          to="/"
          title="To Home"
          className={`${currentMode.I_background} ${currentMode.shadow} rounded-[5px] px-6 h-12 flex justify-between items-center text-lg`}
        >
          <FontAwesomeIcon icon={faGrip} />
        </Link>
      </div>
      <div className="mt-8">
        <CountryTable tableData={tableData} />
      </div>
    </>
  );
}

// <table>
//   <thead>
//     {table.getHeaderGroups().map((headerGroup) => (
//       <tr key={headerGroup.id}>
//         {headerGroup.headers.map((header) => {
//           console.log(header.isPlaceholder);
//           return (
//             <th key={header.id} colSpan={header.colSpan}>
//               {header.isPlaceholder
//                 ? null
//                 : flexRender(
//                     header.column.columnDef.header,
//                     header.getContext()
//                   )}
//             </th>
//           );
//         })}
//       </tr>
//     ))}
//   </thead>
//   <tbody>
//     {table.getRowModel().rows.map((row) => {
//       //   console.log(row.getVisibleCells());
//       return (
//         <tr key={row.id}>
//           {row.getVisibleCells().map((cell) => {
//             return (
//               <td key={cell.id}>
//                 {/* {cell.column.columnDef.cell} */}
//                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
//               </td>
//             );
//           })}
//         </tr>
//       );
//     })}
//   </tbody>
// </table>
