import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import LaptopWindowsIcon from "@mui/icons-material/LaptopWindows";
import PersonIcon from "@mui/icons-material/Person";
import Status from "./Status.jsx";
import { getStatistics } from "../../api/apiFunctions.js";
import { useQuery } from "react-query";

const Overview = () => {
  const { data, isLoading } = useQuery("statistics", getStatistics);
  // console.log("Overview Data :", data);

  const headers = [
    {
      header: "Revenue",
      value: data?.data.sales || 0,
      icon: <AttachMoneyIcon fontSize="large" />,
    },
    {
      header: "Orders",
      value: data?.data.orders || 0,
      icon: <LoyaltyIcon fontSize="large" />,
    },
    {
      header: "Products",
      value: data?.data.products || 0,
      icon: <LaptopWindowsIcon fontSize="large" />,
    },
    {
      header: "Users",
      value: data?.data.users || 0,
      icon: <PersonIcon fontSize="large" />,
    },
  ];

  if (isLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-around xl:justify-between h-[95vh]">
      <div className="flex gap-5 md:gap-3 xl:gap-10 flex-wrap mx-auto mt-2 justify-center items-center">
        {headers.map((item) => (
          <div
            key={item.header}
            className=" h-20 md:h-28 w-56 p-5 rounded-lg bg-[var(--color-var3)] flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-3xl ">{item.header}</h2>
              <div className=" text-white">{item.icon}</div>
            </div>

            <p className="text-3xl">{item.value}</p>
          </div>
        ))}
      </div>

      <div className=" grid grid-cols1 xl:grid-cols-[2fr_1fr] gap-10 mt-20 lg:mt-0">
        <Status data={data} isLoading={isLoading} />

        <div
          className="bg-[var(--color-var3)] rounded-lg p-5 h-[250px] lg:h-[400px] w-[90%] xl:w-[400px] mx-auto lg:me-10 mb-10 lg:mb-0"
          style={{
            overflowY: "auto",
            scrollBehavior: "smooth",
            scrollbarWidth: "thin",
          }}
        >
          <h2 className="text-2xl">Recent Orders</h2>
          <div className="flex flex-col gap-5 mt-8 my-5">
            {data?.data.recentOrder.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <p className="my-auto">{item["_id"].substring(5, 16)}</p>

                <p>{item.date.substring(0, 10)}</p>

                <p>${item.totalPrice}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
