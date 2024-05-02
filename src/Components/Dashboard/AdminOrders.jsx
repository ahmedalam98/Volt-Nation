import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

let dummyOrders = [
  {
    orderNumber: "ORD-001",
    user: "John Doe",
    orderStatus: "Pending",
    orderDate: "2021-10-01",
    orderPrice: "$100",
  },
  {
    orderNumber: "ORD-002",
    user: "Jane Smith",
    orderStatus: "Shipped",
    orderDate: "2021-10-02",
    orderPrice: "$150",
  },
  {
    orderNumber: "ORD-003",
    user: "Michael Johnson",
    orderStatus: "Delivered",
    orderDate: "2021-10-03",
    orderPrice: "$200",
  },
  {
    orderNumber: "ORD-004",
    user: "Emily Davis",
    orderStatus: "Pending",
    orderDate: "2021-10-04",
    orderPrice: "$250",
  },
  {
    orderNumber: "ORD-005",
    user: "David Brown",
    orderStatus: "Cancelled",
    orderDate: "2021-10-05",
    orderPrice: "$300",
  },
  {
    orderNumber: "ORD-006",
    user: "Jessica White",
    orderStatus: "Shipped",
    orderDate: "2021-10-06",
    orderPrice: "$350",
  },
  {
    orderNumber: "ORD-007",
    user: "Thomas Harris",
    orderStatus: "Delivered",
    orderDate: "2021-10-07",
    orderPrice: "$400",
  },
  {
    orderNumber: "ORD-008",
    user: "Sophia Martin",
    orderStatus: "Pending",
    orderDate: "2021-10-08",
    orderPrice: "$450",
  },
  {
    orderNumber: "ORD-009",
    user: "Daniel Thompson",
    orderStatus: "Cancelled",
    orderDate: "2021-10-09",
    orderPrice: "$500",
  },
  {
    orderNumber: "ORD-010",
    user: "Emma Garcia",
    orderStatus: "Shipped",
    orderDate: "2021-10-10",
    orderPrice: "$550",
  },
  {
    orderNumber: "ORD-011",
    user: "Matthew Martinez",
    orderStatus: "Delivered",
    orderDate: "2021-10-11",
    orderPrice: "$600",
  },
  {
    orderNumber: "ORD-012",
    user: "Ava Robinson",
    orderStatus: "Pending",
    orderDate: "2021-10-12",
    orderPrice: "$650",
  },
  {
    orderNumber: "ORD-013",
    user: "Isabella Clark",
    orderStatus: "Cancelled",
    orderDate: "2021-10-13",
    orderPrice: "$700",
  },
  {
    orderNumber: "ORD-014",
    user: "James Lewis",
    orderStatus: "Shipped",
    orderDate: "2021-10-14",
    orderPrice: "$750",
  },
  {
    orderNumber: "ORD-015",
    user: "Benjamin Walker",
    orderStatus: "Delivered",
    orderDate: "2021-10-15",
    orderPrice: "$800",
  },
  {
    orderNumber: "ORD-016",
    user: "Charlotte Hall",
    orderStatus: "Pending",
    orderDate: "2021-10-16",
    orderPrice: "$850",
  },
  {
    orderNumber: "ORD-017",
    user: "Oliver Allen",
    orderStatus: "Cancelled",
    orderDate: "2021-10-17",
    orderPrice: "$900",
  },
  {
    orderNumber: "ORD-018",
    user: "Liam Young",
    orderStatus: "Shipped",
    orderDate: "2021-10-18",
    orderPrice: "$950",
  },
  {
    orderNumber: "ORD-019",
    user: "Mia Hernandez",
    orderStatus: "Delivered",
    orderDate: "2021-10-19",
    orderPrice: "$1000",
  },
  {
    orderNumber: "ORD-020",
    user: "Noah King",
    orderStatus: "Pending",
    orderDate: "2021-10-20",
    orderPrice: "$1050",
  },
];

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
    data: dummyOrders,
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

            <span className="flex items-center gap-1">
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
