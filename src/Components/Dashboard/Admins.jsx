import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Avatar } from "@mui/material";
import { useQuery, useQueryClient } from "react-query";

const Admins = () => {
  const queryClient = useQueryClient();

  const {
    data: users,
    isLoading,
    error,
  } = useQuery("users", async () => {
    const response = await fetch(
      "https://volt-nation.up.railway.app/dashboard/users"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return response.json();
  });

  const updateRole = async (id, role) => {
    try {
      const response = await fetch(
        `https://volt-nation.up.railway.app/dashboard/role/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update role");
      }
      // Manually revalidate the "users" key after successful update
      queryClient.invalidateQueries("users");
    } catch (error) {
      console.error("Error updating role:", error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `https://volt-nation.up.railway.app/dashboard/delete-user/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      // Manually revalidate the "users" key after successful deletion
      queryClient.invalidateQueries("users");
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("name", {
      id: "name",
      cell: (info) => {
        const name = info.row.original.name;
        const role = info.row.original.role;
        const firstLetter = name[0];
        const avatarBackground = role === "admin" ? "#2563EB" : "#ffffff";
        const textColor = role === "admin" ? "#ffffff" : "#000000";

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
    columnHelper.accessor("role", {
      id: "role",
      cell: (info) => {
        const { _id, role } = info.row.original;

        const handleRemoveAdmin = () => {
          updateRole(_id, "user");
        };

        const handleSetAdmin = () => {
          updateRole(_id, "admin");
        };

        const handleRemoveUser = () => {
          deleteUser(_id);
        };

        return (
          <div>
            {role === "admin" ? (
              <button
                onClick={handleRemoveAdmin}
                className="flex justify-center items-center gap-2 rounded border-blue-600 bg-blue-600 text-white tracking-wider p-2 hover:bg-blue-800 hover:border-blue-800 me-4 md:me-0 duration-300"
              >
                Remove Admin
              </button>
            ) : (
              <div className="flex gap-5">
                <button
                  onClick={handleRemoveUser}
                  className="flex justify-center items-center gap-2 rounded border-[#ca3f3f] bg-[#ca3f3f] text-white tracking-wider p-2 hover:bg-[#852a2a] hover:border-[#852a2a] me-4 md:me-0 duration-300"
                >
                  Remove User
                </button>

                <button
                  onClick={handleSetAdmin}
                  className="flex justify-center items-center gap-2 rounded border-[#16A34A] bg-[#16A34A] text-white tracking-wider p-2 hover:bg-[#166534] hover:border-[#166534] me-4 md:me-0 duration-300"
                >
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
    data: users || [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <div className="max-w-6xl min-w-[700px] lg:min-w-[800px]  overflow-x-auto md:overflow-x-hidden mx-auto text-white fill-gray-600">
        <h1 className="text-4xl border-s-4 border-[var(--color-var1)] ps-4 mb-10">
          Users
        </h1>

        <table className="w-full border border-gray-700 text-left overflow-x-auto md:overflow-x-hidden">
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row, i) => (
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
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-4">
                  No users found.
                </td>
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
              className="bg-transparent p-2 border border-gray-300 outline-none"
            >
              {[5, 10, 20].map((pageSize) => (
                <option key={pageSize} value={pageSize} className="text-black">
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
