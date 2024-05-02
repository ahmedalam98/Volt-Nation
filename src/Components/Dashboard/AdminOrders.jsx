import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { orders } from "./Dummy/orders.js";

const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "text-yellow-500";
    case "Cancelled":
      return "text-red-500";
    case "Delivered":
      return "text-green-500";
    default:
      return "text-blue-400";
  }
};

const AdminOrders = () => {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("orderNumber", {
      id: "orderNumber",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Order Number",
      size: 100,
    }),
    columnHelper.accessor("user", {
      id: "user",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "User",
      size: 100,
    }),
    columnHelper.accessor("orderStatus", {
      id: "orderStatus",
      cell: (info) => {
        const status = info.getValue();
        const statusColor = getStatusColor(status);
        return <span className={statusColor}>{status}</span>;
      },
      header: "Order Status",
      size: 100,
    }),
    columnHelper.accessor("orderDate", {
      id: "orderDate",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Order Date",
      size: 100,
    }),
    columnHelper.accessor("orderPrice", {
      id: "orderPrice",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Price",
      size: 100,
    }),
  ];

  const table = useReactTable({
    columns,
    data: orders,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-4">
      <div className="max-w-6xl min-w-[800px] overflow-x-auto md:overflow-x-hidden mx-auto text-white fill-gray-600">
        <h1 className="text-4xl border-s-4 border-[var(--color-var1)] ps-4 mb-10">
          Orders
        </h1>

        <table className="border border-gray-700 w-full text-left min-w-[800px] overflow-x-auto md:overflow-x-hidden">
          <thead className="bg-[var(--color-var2)]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-3.5 py-2 uppercase tracking-wider text-center"
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
            {table.getRowModel().rows.length > 0
              ? table.getRowModel().rows.map((row, i) => (
                  <tr
                    key={row.id}
                    className={`
                ${i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}
                `}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-3.5 py-2 text-center">
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

export default AdminOrders;
