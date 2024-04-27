import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SocialIcon from "./SocialIcon.jsx";

const FooterFirstColumn = () => {
  return (
    <div className="flex flex-col gap-5 items-center md:items-start">
      <h3 className="text-xl font-bold tracking-widest">CONTACT US</h3>

      <p className=" text-gray-400">Call Us 24/7 Free</p>
      <p className="text-3xl lg:text-4xl" style={{ color: "var(--color-var1" }}>
        <PhoneIcon fontSize="large" className="mr-4" />
        19 444 55
      </p>

      <p className=" text-gray-400">iti.smartVillage.44@gmail.com</p>
      <div className="flex gap-5">
        <SocialIcon path={"/"}>
          <FacebookIcon />
        </SocialIcon>

        <SocialIcon path={"/"}>
          <InstagramIcon />
        </SocialIcon>

        <SocialIcon path={"/"}>
          <YouTubeIcon />
        </SocialIcon>

        <SocialIcon path={"/"}>
          <XIcon />
        </SocialIcon>
      </div>
    </div>
  );
};

export default FooterFirstColumn;
