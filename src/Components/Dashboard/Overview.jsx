import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import LaptopWindowsIcon from "@mui/icons-material/LaptopWindows";
import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import Status from "./Status.jsx";

const Overview = () => {
  const headers = [
    {
      header: "Revenue",
      value: 45231,
      icon: <AttachMoneyIcon fontSize="large" />,
    },
    { header: "Orders", value: 1234, icon: <LoyaltyIcon fontSize="large" /> },
    {
      header: "Products",
      value: 60,
      icon: <LaptopWindowsIcon fontSize="large" />,
    },
    {
      header: "Users",
      value: 2300,
      icon: <PersonIcon fontSize="large" />,
    },
  ];

  const dummyData = [
    { name: "Ahmed Ibrahim", color: "orange", money: 1200 },
    { name: "Sarah Al-Jaberi", color: "red", money: 1500 },
    { name: "Mohamed Ali", color: "blue", money: 2000 },
    { name: "Fatima Khalid", color: "green", money: 950 },
    { name: "Yousef Saeed", color: "grey", money: 1750 },
    { name: "Layla Hasan", color: "purple", money: 1800 },
    { name: "Kareem Saeed", color: "pink", money: 1250 },
    { name: "Mona Al-Hussein", color: "teal", money: 1100 },
    { name: "Ayman Ibrahim", color: "indigo", money: 2300 },
    { name: "Zahra Abbas", color: "brown", money: 1900 },
    { name: "Hani Al-Bashir", color: "grey", money: 1350 },
    { name: "Noura Fahd", color: "cyan", money: 1420 },
    { name: "Ali Mansour", color: "lime", money: 1680 },
    { name: "Salma Al-Faraj", color: "amber", money: 1520 },
    { name: "Omar Ismail", color: "fuchsia", money: 2100 },
  ];

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
        <Status />

        <div
          className="bg-[var(--color-var3)] rounded-lg p-5 h-[250px] lg:h-[400px] w-[90%] xl:w-[400px] mx-auto lg:me-10 mb-10 lg:mb-0"
          style={{
            overflowY: "auto",
            scrollBehavior: "smooth",
            scrollbarWidth: "thin",
          }}
        >
          <h2 className="text-2xl">Recent Orders</h2>
          <div className="flex flex-col gap-5 my-5">
            {dummyData.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex">
                  <Avatar className="me-4" sx={{ backgroundColor: item.color }}>
                    {item.name[0]}
                  </Avatar>
                  <p className="my-auto">{item.name}</p>
                </div>
                <p>${item.money}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
