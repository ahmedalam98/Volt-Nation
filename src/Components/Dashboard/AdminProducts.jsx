// import { useQuery } from "react-query";
// import { getProducts } from "../../api/apiFunctions";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { data } from "./data";

import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DownloadButton from "./DownloadButton.jsx";
import SearchProduct from "./SearchProduct.jsx";
import { useState } from "react";

const AdminProducts = () => {
  // const { isLoading, isError, data, error, refetch } = useQuery(
  //   ["products"],
  //   getProducts
  // );

  // console.log(data);

  const columnHelper = createColumnHelper();

  const handleEdit = (row) => {
    console.log("Edit button clicked for row:", row);
  };

  const handleDelete = (row) => {
    console.log("Delete button clicked for row:", row);
  };

  const columns = [
    columnHelper.accessor("images", {
      cell: (info) => {
        const images = info.getValue();
        const firstImage = images && images.length > 0 ? images[0] : "";
        return (
          <img
            src={firstImage}
            alt="product"
            className="w-20 h-20 object-fit rounded-md"
          />
        );
      },
      header: "Product",
    }),
    columnHelper.accessor("name", {
      id: "name",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Name",
      size: 150,
    }),
    columnHelper.accessor("category", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Category",
      size: 150,
    }),
    columnHelper.accessor("price", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Price",
      size: 75,
    }),
    {
      id: "actions",
      cell: (info) => {
        const row = info.row.original;
        return (
          <div className="flex items-center gap-6">
            <button
              className="bg-blue-500 text-white p-2 rounded"
              onClick={() => handleEdit(row)}
            >
              <EditNoteIcon />
            </button>
            <button
              className="bg-red-500 text-white p-2 rounded"
              onClick={() => handleDelete(row)}
            >
              <DeleteOutlineIcon />
            </button>
          </div>
        );
      },
      header: "Actions",
      size: 50,
    },
  ];

  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    // data: data?.data.slice(20, 60),
    data: data,
    columns,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-4">
      <div className="max-w-6xl min-w-[800px] overflow-x-auto md:overflow-x-hidden mx-auto text-white fill-gray-600">
        <div className="flex justify-between mb-2">
          <SearchProduct
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(value)}
            className="p-2 bg-transparent outline-none border-b-2 w-1/5 focus:w-1/3 duration-300 border-[var(--color-var1)]"
          />
          <DownloadButton data={data} fileName={"Products"} />
        </div>

        <table className="border border-gray-700 w-full text-left min-w-[800px] overflow-x-auto md:overflow-x-hidden">
          <thead className="bg-[var(--color-var2)]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-3.5 py-2 uppercase tracking-wider"
                    style={{ width: `${header.getSize()}px` }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={`
                ${i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}
                `}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-3.5 py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="text-center h-32 text-3xl tracking-wider">
                <td colSpan={12}>Product Not Found ✖️</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-center mt-4 gap-12">
          <div className="flex items-center justify-center">
            <button
              onClick={() => {
                table.previousPage();
              }}
              disabled={!table.getCanPreviousPage()}
              className="p-1 border border-gray-300 px-2 disabled:opacity-30"
            >
              {"<"}
            </button>

            <button
              onClick={() => {
                table.nextPage();
              }}
              disabled={!table.getCanNextPage()}
              className="p-1 border border-gray-300 px-2 disabled:opacity-30"
            >
              {">"}
            </button>

            <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </span>
          </div>

          {/* <span className="flex items-center gap-1 ms-8">
            <div>Go to page:</div>
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              className="border border-gray-300 bg-transparent p-1 w-16 outline-none"
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) + 1 : 0;
                table.setPageIndex(page);
              }}
            />
          </span> */}

          <div>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className=" bg-transparent p-2 border border-gray-300 outline-none "
            >
              {[5, 10, 20].map((pageSize) => (
                <option key={pageSize} value={pageSize} className=" text-black">
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
