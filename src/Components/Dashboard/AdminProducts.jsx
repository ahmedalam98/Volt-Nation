import { useState } from "react";
import { useQuery } from "react-query";
import { getProducts } from "../../api/apiFunctions";
import { useForm } from "react-hook-form"; // React Hook Form for form management
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

const AdminProducts = () => {
  const { data, error, isLoading } = useQuery("products", getProducts);
  const products = data?.data || [];

  const [globalFilter, setGlobalFilter] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Column setup for the table
  const columnHelper = createColumnHelper();

  const handleEdit = (row) => {
    // Set the editing product when clicking the Edit button
    console.log("Edit button clicked for row:", row);
    setEditingProduct(row);
  };

  const handleDelete = (row) => {
    console.log("Delete button clicked for row:", row);
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    console.log("Files to upload:", selectedFiles);
    setEditingProduct(null); // Return to the product table after form submission
  };

  const cancelEdit = () => {
    setEditingProduct(null); // Return to the product table on cancel
  };

  const columns = [
    columnHelper.accessor("images", {
      cell: (info) => {
        const images = info.getValue() || [];
        const firstImage = images.length > 0 ? images[0] : "";
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

  if (editingProduct) {
    const excludedFields = [
      "_id",
      "id",
      "reviews",
      "quantity",
      "rating",
      "salesNum",
      "images",
    ];
    const productProperties = Object.keys(editingProduct).filter(
      (property) => !excludedFields.includes(property)
    );

    return (
      <div className="p-4">
        <h2 className="text-4xl mb-10 md:mx-[8.4rem] border-s-4 border-[var(--color-var1)] ps-4">
          Edit Product
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="w-[400px] md:w-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
            {productProperties.map((property) => {
              if (property === "description" || property === "features") {
                return (
                  <div key={property} className="flex flex-col w-[400px]">
                    <label className="capitalize mb-2">
                      {property.replace(/([a-z])([A-Z])/g, "$1 $2")}
                    </label>
                    <textarea
                      defaultValue={editingProduct[property]}
                      {...register(property, {
                        required: property === "description",
                      })}
                      className="border rounded p-3 outline-none bg-[var(--color-var2)] border-[var(--color-var2)] text-white w-[250px] md:w-auto"
                      style={{ height: 80 }}
                    />
                    {errors[property] && (
                      <span className="text-red-500">Required</span>
                    )}
                  </div>
                );
              }

              return (
                <div key={property} className="flex flex-col w-[400px]">
                  <label className="capitalize mb-2">
                    {property.replace(/([a-z])([A-Z])/g, "$1 $2")}
                  </label>
                  <input
                    type="text"
                    defaultValue={editingProduct[property]}
                    {...register(property, {
                      required: property === "name" || property === "category",
                    })}
                    className="border rounded p-3 outline-none bg-[var(--color-var2)] border-[var(--color-var2)] text-white w-[250px] md:w-auto"
                  />
                  {errors[property] && (
                    <span className="text-red-500">Required</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* File input for images */}
          <div className="flex flex-col md:flex-row justify-between md:items-center md:mx-[9.3rem]">
            <div className="flex flex-col justify-center col-span-3 mt-6">
              <label className="mb-2 capitalize">Product Images</label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="border rounded p-2 bg-[var(--color-var2)] border-[var(--color-var2)] text-white w-[250px] md:w-auto"
              />

              <div className="flex gap-4 mt-2">
                {editingProduct.images.map((img, index) => (
                  <div key={index} className="w-20 h-20">
                    <img
                      src={img}
                      alt={`Product ${index + 1}`}
                      className="object-cover w-full h-full rounded"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mt-12 md:mt-0 justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded h-8"
              >
                Save
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-500 text-white px-4 py-2 rounded h-8"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  // If not editing, show the product table
  if (isLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
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
            {table.getRowModel().rows.length > 0 ? (
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
                <option key={pageSize} value={pageSize}>
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
