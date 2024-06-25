import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Avatar } from "@mui/material";

import { users } from "./Dummy/users.js";

const Admins = () => {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("name", {
      id: "name",
      cell: (info) => {
        const name = info.row.original.name;
        const isAdmin = info.row.original.isAdmin;
        const firstLetter = name[0];
        const avatarBackground = isAdmin ? "#2563EB" : "#ffffff";
        const textColor = isAdmin ? "#ffffff" : "#000000";

        return (
          <span className="flex items-center p-2 text-lg">
            <Avatar
              className="me-4"
              sx={{
                backgroundColor: avatarBackground,
                color: textColor,
              }}
            >
              {firstLetter}
            </Avatar>
            {name}
          </span>
        );
      },
      size: 100,
    }),
    columnHelper.accessor("isAdmin", {
      id: "isAdmin",
      cell: (info) => {
        const isAdmin = info.row.original.isAdmin;
        return (
          <div>
            {isAdmin ? (
              <button className="flex justify-center items-center gap-2 rounded border-blue-600 bg-blue-600 text-white tracking-wider p-2 hover:bg-blue-800 hover:border-blue-800 me-4 md:me-0 duration-300">
                Remove Admin
              </button>
            ) : (
              <div className="flex gap-5">
                <button className="flex justify-center items-center gap-2 rounded bborder-[#ca3f3f] bg-[#ca3f3f] text-white tracking-wider p-2 hover:bg-[#852a2a] hover:border-[#852a2a] me-4 md:me-0 duration-300">
                  Remove User
                </button>

                <button className="flex justify-center items-center gap-2 rounded border-[#16A34A] bg-[#16A34A] text-white tracking-wider p-2 hover:bg-[#166534] hover:border-[#166534]  me-4 md:me-0 duration-300">
                  Set Admin
                </button>
              </div>
            )}
          </div>
        );
      },
      size: 500,
    }),
  ];

  const table = useReactTable({
    columns,
    data: users,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-4">
      <div className="max-w-6xl min-w-[700px] lg:min-w-[800px]  overflow-x-auto md:overflow-x-hidden mx-auto text-white fill-gray-600">
        <h1 className="text-4xl border-s-4 border-[var(--color-var1)] ps-4 mb-10">
          Users
        </h1>

        <table className="w-full border border-gray-700 text-left overflow-x-auto md:overflow-x-hidden">
          <tbody>
            {table.getRowModel().rows.length > 0
              ? table.getRowModel().rows.map((row, i) => (
                  <tr
                    key={row.id}
                    className={`
                ${i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}
                flex justify-between items-center`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-3.5 py-3 text-center">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              : null}
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

            <span className="flex items-center gap-1 ms-3">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </span>
          </div>

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

export default Admins;
