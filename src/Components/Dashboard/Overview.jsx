import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import LaptopWindowsIcon from "@mui/icons-material/LaptopWindows";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const Overview = () => {
  const headers = [
    {
      header: "Total Revenue",
      value: 45231,
      icon: <AttachMoneyIcon fontSize="large" />,
    },
    { header: "Orders", value: 1234, icon: <LoyaltyIcon fontSize="large" /> },
    {
      header: "Products",
      value: 60,
      icon: <LaptopWindowsIcon fontSize="large" />,
    },
  ];

  const data = [
    {
      name: "Jan",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Feb",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Mar",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Apr",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "May",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Jun",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Jul",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Aug",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Sep",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Oct",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Nov",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Dec",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
  ];

  return (
    <div className="flex flex-col justify-between h-[95vh]">
      <div className="flex gap-5 md:gap-10 xl:gap-16 flex-wrap mx-auto mt-2 justify-center items-center">
        {headers.map((item) => (
          <div
            key={item.header}
            className=" h-28 w-52 md:w-80 p-5 rounded-lg bg-[var(--color-var3)] flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl md:text-3xl ">{item.header}</h2>
              <div className=" text-white">{item.icon}</div>
            </div>

            <p className=" text-3xl">{item.value}</p>
          </div>
        ))}
      </div>

      <div className=" grid grid-cols1 lg:grid-cols-[2fr_1fr] gap-10 mt-20 lg:mt-0">
        <ResponsiveContainer width="100%" height={420} className="self-end">
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              domain={[0, 6000]}
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />

            <Bar dataKey="total" fill="#08cff6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        <div
          className="bg-[var(--color-var3)] rounded-lg p-5 h-[400px] w-[90%] lg:w-[400px] mx-auto"
          style={{
            overflowY: "auto",
            scrollBehavior: "smooth",
            scrollbarWidth: "thin",
          }}
        >
          <h2 className="text-2xl">Recent Orders</h2>
          <div className="flex flex-col gap-5 mt-5">
            <div className="flex justify-between">
              <p>Order #345</p>
              <p>$1200</p>
            </div>
            <div className="flex justify-between">
              <p>Order #346</p>
              <p>$1300</p>
            </div>
            <div className="flex justify-between">
              <p>Order #347</p>
              <p>$1400</p>
            </div>
            <div className="flex justify-between">
              <p>Order #348</p>
              <p>$1500</p>
            </div>
            <div className="flex justify-between">
              <p>Order #349</p>
              <p>$1600</p>
            </div>
            <div className="flex justify-between">
              <p>Order #345</p>
              <p>$1200</p>
            </div>
            <div className="flex justify-between">
              <p>Order #346</p>
              <p>$1300</p>
            </div>
            <div className="flex justify-between">
              <p>Order #347</p>
              <p>$1400</p>
            </div>
            <div className="flex justify-between">
              <p>Order #348</p>
              <p>$1500</p>
            </div>
            <div className="flex justify-between">
              <p>Order #349</p>
              <p>$1600</p>
            </div>
            <div className="flex justify-between">
              <p>Order #345</p>
              <p>$1200</p>
            </div>
            <div className="flex justify-between">
              <p>Order #346</p>
              <p>$1300</p>
            </div>
            <div className="flex justify-between">
              <p>Order #347</p>
              <p>$1400</p>
            </div>
            <div className="flex justify-between">
              <p>Order #348</p>
              <p>$1500</p>
            </div>
            <div className="flex justify-between">
              <p>Order #349</p>
              <p>$1600</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
