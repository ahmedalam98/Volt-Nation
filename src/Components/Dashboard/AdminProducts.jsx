import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { getProducts } from "../../api/apiFunctions";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DownloadButton from "./DownloadButton.jsx";
import SearchProduct from "./SearchProduct.jsx";
import EditProductForm from "./EditProductForm.jsx";
import AddIcon from "@mui/icons-material/Add";
import DeleteModal from "./DeleteModal.jsx";

const AdminProducts = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery("products", getProducts);

  const products = data?.data || [];

  const [globalFilter, setGlobalFilter] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [addedProduct, setAddedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleEdit = (row) => {
    setEditingProduct(row);
  };

  const handleAdd = () => {
    setAddedProduct({
      name: "",
      category: "",
      price: "",
      description: "",
      brand: "",
      quantity: "",
      features: [],
      colors: [],
      // images: [],
      // releasedDate: "",
    });
  };

  const onSubmit = (data) => {
    setEditingProduct(null);
    setAddedProduct(null);
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setAddedProduct(null);
  };

  const handleDelete = (row) => {
    setProductToDelete(row);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setProductToDelete(null);
      setIsModalOpen(false);
    }
  };

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("images", {
      cell: (info) => {
        const images = info.getValue() || [];
        const firstImage = images?.length > 0 ? images[0] : "";
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
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Name",
    }),
    columnHelper.accessor("category", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Category",
    }),
    columnHelper.accessor("price", {
      cell: (info) => <span>$ {info.getValue()}</span>,
      header: "Price",
    }),
    {
      id: "actions",
      cell: (info) => {
        const row = info.row.original;
        return (
          <div className="flex items-center gap-6">
            <button
              className="bg-blue-500 hover:bg-blue-800 duration-300 text-white p-2 rounded"
              onClick={() => handleEdit(row)}
            >
              <EditNoteIcon />
            </button>

            <button
              className="bg-red-500 hover:bg-red-800 duration-300 text-white p-2 rounded"
              onClick={() => handleDelete(row)}
            >
              <DeleteOutlineIcon />
            </button>
          </div>
        );
      },
      header: "Actions",
    },
  ];

  const table = useReactTable({
    data: products,
    columns,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
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

  if (editingProduct) {
    return (
      <EditProductForm
        product={editingProduct}
        onSubmit={onSubmit}
        onCancel={cancelEdit}
      />
    );
  }

  if (addedProduct) {
    return (
      <EditProductForm
        product={addedProduct}
        onSubmit={onSubmit}
        onCancel={cancelEdit}
      />
    );
  }

  return (
    <div className="p-4">
      <div className="max-w-6xl min-w-[800px] overflow-x-auto md:overflow-x-hidden mx-auto text-white fill-gray-600">
        <h1 className="text-4xl border-s-4 border-[var(--color-var1)] ps-4 mb-10">
          Products
        </h1>

        <div className="flex justify-between mb-2">
          <SearchProduct
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(value)}
            className="p-2 bg-transparent outline-none border-b-2 w-1/5 focus:w-1/3 duration-300 border-[var(--color-var1)]"
          />

          <button
            className="flex justify-center items-center gap-2 rounded border-blue-600 bg-blue-600 hover:bg-blue-800 hover:border-blue-800 duration-300 text-white font-semibold tracking-wider p-3 me-4 md:me-2"
            onClick={handleAdd}
          >
            <span>Add Product</span>
            <AddIcon />
          </button>

          <DownloadButton data={products} fileName={"Products"} />
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
            {table.getRowModel().rows?.length > 0 ? (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={`
                ${i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}
                `}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-3.5 py-2 ">
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
        <div className="flex items-center justify-center mt-4 gap-8">
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
            <span className="flex items-center gap-1 ">
              <div>Go to page:</div>
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex}
                className="border border-gray-300 bg-transparent p-1 w-16 outline-none"
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
              />
            </span>
          </div>

          <div>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="border border-gray-300 bg-transparent p-1 outline-none"
            >
              {[5, 10, 20, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <DeleteModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        productId={productToDelete?._id}
        title="Confirm Deletion"
        description="Are you sure you want to delete this product?"
        setModalConfirmed={(value) => setIsModalOpen(!value)}
      />
    </div>
  );
};

export default AdminProducts;
