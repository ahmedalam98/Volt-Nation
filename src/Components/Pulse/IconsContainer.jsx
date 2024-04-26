import IconCircle from "./IconCircle.jsx";
import WifiIcon from "@mui/icons-material/Wifi";
import BluetoothIcon from "@mui/icons-material/Bluetooth";
import BatteryCharging60Icon from "@mui/icons-material/BatteryCharging60";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const IconsContainer = () => {
  return (
    <div className="grid gap-y-8 gap-x-28 md:gap-x-12 grid-cols-2 grid-rows-2 md:grid-cols-3 md:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 lg:self-start">
      <div className="flex flex-col gap-5 justify-center items-center">
        <IconCircle>
          <WifiIcon sx={{ color: "white" }} fontSize="large" />
        </IconCircle>

        <p className="text-[#525252] text-sm">
          Wireless <br /> Connections
        </p>
      </div>

      <div className="flex flex-col gap-5 justify-center items-center">
        <IconCircle>
          <BluetoothIcon sx={{ color: "white" }} fontSize="large" />
        </IconCircle>
        <p className="text-[#525252] text-sm">
          Bluetooth <br /> Connectivity
        </p>
      </div>

      <div className="flex flex-col gap-5 justify-center items-center">
        <IconCircle>
          <BatteryCharging60Icon sx={{ color: "white" }} fontSize="large" />
        </IconCircle>

        <p className="text-[#525252] text-sm">
          60 Hours <br /> Battery Life
        </p>
      </div>

      <div className="flex flex-col gap-5 justify-center items-center">
        <IconCircle>
          <VolumeUpIcon sx={{ color: "white" }} fontSize="large" />
        </IconCircle>

        <p className="text-[#525252] text-sm">
          Surround <br /> Sound
        </p>
      </div>
    </div>
  );
};

export default IconsContainer;
