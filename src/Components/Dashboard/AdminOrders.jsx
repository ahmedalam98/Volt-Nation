import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useQuery, useMutation, useQueryClient } from "react-query";

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "processing":
      return "text-yellow-500";
    case "cancelled":
      return "text-red-500";
    case "delivered":
      return "text-green-500";
    default:
      return "text-blue-400";
  }
};

const fetchOrders = async () => {
  try {
    const response = await fetch("https://volt-nation.up.railway.app/orders");
    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    const orders = await response.json();

    // Sort orders by descending order date
    orders.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });

    return orders;
  } catch (error) {
    throw new Error(`Error fetching orders: ${error.message}`);
  }
};

const updateOrderStatus = async ({ _id, status }) => {
  const response = await fetch(
    `https://volt-nation.up.railway.app/orders/${_id}/${status.toLowerCase()}`,
    {
      method: "PATCH",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to update order status");
  }
  return response.json();
};

const AdminOrders = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery("orders", fetchOrders);

  const mutation = useMutation(updateOrderStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries("orders");
    },
  });

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("_id", {
      id: "_id",
      cell: (info) => <span>{info.getValue().substring(0, 10)}</span>,
      header: "Order Number",
      size: 100,
    }),
    columnHelper.accessor("userName", {
      id: "userName",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "User",
      size: 100,
    }),
    columnHelper.accessor("status", {
      id: "status",
      cell: (info) => {
        const status = info.getValue();
        const statusColor = getStatusColor(status);
        const _id = info.row.original._id;

        const handleChange = (e) => {
          mutation.mutate({ _id, status: e.target.value });
        };

        return (
          <select
            value={status}
            onChange={handleChange}
            className={`bg-transparent ${statusColor} py-1 px-2 border rounded`}
          >
            <option value="cancelled">Cancelled</option>
            <option value="delivered">Delivered</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
          </select>
        );
      },
      header: "Order Status",
      size: 100,
    }),
    columnHelper.accessor("date", {
      id: "date",
      cell: (info) => <span>{info.getValue().substring(0, 10)}</span>,
      header: "Order Date",
      size: 100,
    }),
    columnHelper.accessor("totalPrice", {
      id: "totalPrice",
      cell: (info) => <span>{`$${info.getValue()}`}</span>,
      header: "Price",
      size: 100,
    }),
  ];

  const table = useReactTable({
    columns,
    data: data || [],
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
    return <div>Error loading orders</div>;
  }

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

export default AdminOrders;
