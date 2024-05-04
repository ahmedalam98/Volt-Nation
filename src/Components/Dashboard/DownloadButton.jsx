import DownloadIcon from "@mui/icons-material/Download";
import * as XLSX from "xlsx/xlsx.mjs";

const DownloadButton = ({ data = [], fileName = "data" }) => {
  const handleDownloadSheet = () => {
    const info = data?.length ? data : [];
    const worksheet = XLSX.utils.json_to_sheet(info);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet");

    const downloadFileName = fileName ? `${fileName}.xlsx` : "data.xlsx";
    XLSX.writeFile(workbook, downloadFileName);
  };

  return (
    <div>
      <button
        className="flex justify-center items-center gap-2 rounded border-green-600 bg-green-600 text-white font-semibold tracking-wider p-3 hover:bg-green-800 hover:border-green-800 me-4 md:me-0 duration-300"
        onClick={handleDownloadSheet}
      >
        <span>Download Data</span>
        <DownloadIcon />
      </button>
    </div>
  );
};

export default DownloadButton;
