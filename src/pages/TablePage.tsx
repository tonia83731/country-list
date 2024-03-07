import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";

import { useState } from "react";
type Person = {
  id: number;
  firstname: string;
  lastname: string;
  age: number;
  isMarried: boolean;
  email: string;
  phone: string;
};

const dummyPerson: Person[] = [
  {
    id: 1,
    firstname: "John",
    lastname: "Doe",
    age: 30,
    isMarried: true,
    email: "john@example.com",
    phone: "123-456-7890",
  },
  {
    id: 2,
    firstname: "Jane",
    lastname: "Smith",
    age: 25,
    isMarried: false,
    email: "jane@example.com",
    phone: "987-654-3210",
  },
  {
    id: 3,
    firstname: "Alice",
    lastname: "Johnson",
    age: 40,
    isMarried: true,
    email: "alice@example.com",
    phone: "555-123-4567",
  },
  {
    id: 4,
    firstname: "Bob",
    lastname: "Brown",
    age: 35,
    isMarried: false,
    email: "bob@example.com",
    phone: "333-555-7777",
  },
  {
    id: 5,
    firstname: "Emily",
    lastname: "Davis",
    age: 28,
    isMarried: true,
    email: "emily@example.com",
    phone: "777-888-9999",
  },
  {
    id: 6,
    firstname: "Michael",
    lastname: "Wilson",
    age: 45,
    isMarried: true,
    email: "michael@example.com",
    phone: "111-222-3333",
  },
  {
    id: 7,
    firstname: "Sarah",
    lastname: "Martinez",
    age: 32,
    isMarried: false,
    email: "sarah@example.com",
    phone: "999-777-5555",
  },
  {
    id: 8,
    firstname: "David",
    lastname: "Anderson",
    age: 38,
    isMarried: true,
    email: "david@example.com",
    phone: "666-444-2222",
  },
  {
    id: 9,
    firstname: "Jessica",
    lastname: "Garcia",
    age: 27,
    isMarried: false,
    email: "jessica@example.com",
    phone: "222-333-4444",
  },
  {
    id: 10,
    firstname: "Christopher",
    lastname: "Taylor",
    age: 34,
    isMarried: true,
    email: "chris@example.com",
    phone: "888-999-1111",
  },
];

export default function TablePage() {
  // console.log(SortingState);
  const [sourceSorting, setSourceSorting] = useState<SortingState>([]);
  //   const [clickLike, setClickLike] = useState(0);

  const columnHelper = createColumnHelper<Person>();

  const defaultColumns = [
    // Accessor Column → 資料由data傳入, 可進行sorted, filtered和grouped
    columnHelper.accessor("id", {
      cell: (info) => {
        return info.getValue();
      },
    }),
    columnHelper.accessor(
      (row) => {
        // console.log(row);
        // const {firstname, lastname} = row
        return `${row.firstname} ${row.lastname}`;
      },
      { id: "fullname" }
    ),
    // Group Column → 用於Group表格col (內含有醫治多個Accessor Column), 無法進行sorted, filtered
    // Group Column → 一般會在Group內定義header跟footer
    columnHelper.group({
      header: "Contact",
      columns: [
        columnHelper.accessor("email", {
          header: "Email",
          cell: (info) => {
            // console.log(info.getValue());
            return info.getValue();
          },
        }),
        columnHelper.accessor("phone", {
          header: "Phone",
          cell: (info) => {
            // console.log(info.getValue());
            return info.getValue();
          },
        }),
      ],
    }),
    columnHelper.group({
      header: "Basic Info",
      columns: [
        columnHelper.accessor("age", {
          header: "Age",
          cell: (info) => {
            return info.getValue();
          },
        }),
        columnHelper.accessor("isMarried", {
          header: "Married",
          cell: (info) => {
            1;
            return info.getValue() ? "Yes" : "No";
          },
        }),
      ],
    }),
    // Display Column → 無法進行sorted, filtered, 但可用於event; 例如: action button, checkbox...
    columnHelper.display({
      id: "like",
      header: "Like",
      cell: (info) => {
        console.log(info.row);
        return (
          <div className="">
            <button
              onClick={() => {
                alert("Thank you");
              }}
            >
              Like
            </button>
            <button
              onClick={() => {
                alert("Try Again");
              }}
            >
              Try Again
            </button>
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: dummyPerson,
    columns: defaultColumns,
    // sorting func here
    state: {
      sorting: sourceSorting,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSourceSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  //   console.log(table.getRowModel().rows);
  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              console.log(header.isPlaceholder);
              return (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => {
          //   console.log(row.getVisibleCells());
          return (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <td key={cell.id}>
                    {/* {cell.column.columnDef.cell} */}
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
