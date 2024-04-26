import PhoneIcon from "@mui/icons-material/Phone";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SocialIcon from "./SocialIcon.jsx";

const footerText = [
  {
    headline: "COMPANY",
    links: [
      {
        name: "About Us",
        link: "/",
      },
      {
        name: "Shop Products",
        link: "/",
      },
      {
        name: "My Cart",
        link: "/",
      },
      {
        name: "Checkout",
        link: "/",
      },
      {
        name: "Order Tracking",
        link: "/",
      },
    ],
  },
  {
    headline: "EXPLORE",
    links: [
      {
        name: "Size Guide",
        link: "/",
      },
      {
        name: "FAQs",
        link: "/",
      },
      {
        name: "Privacy Policy",
        link: "/",
      },
      {
        name: "Terms of Service",
        link: "/",
      },
    ],
  },
];

export default function Footer() {
  return (
    <div>
      <div className="h-[340px] grid grid-cols-[2fr_1.5fr_2fr] mt-10 text-white mx-16">
        <div className="flex flex-col gap-8">
          <h3 className="text-xl font-bold tracking-widest">CONTACT US</h3>

          <p className=" text-gray-400">Call Us 24/7 Free</p>
          <p className="text-5xl" style={{ color: "var(--color-var1" }}>
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

        <div className="flex justify-between">
          <div className="flex flex-col gap-5">
            <h3 className="text-xl font-bold mb-3 tracking-widest">COMPANY</h3>
            {footerText[0].links.map((link) => (
              <Link
                key={link.name}
                className="text-gray-400 hover:text-[#08cff6] transition-all duration-300"
                to={link.link}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="text-xl font-bold mb-3 tracking-widest">EXPLORE</h3>
            {footerText[1].links.map((link) => (
              <Link
                key={link.name}
                className="text-gray-400 hover:text-[#08cff6] transition-all duration-300"
                to={link.link}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div></div>
      </div>
      <div className="h-[100px] bg-[#1B1B1B]">asf</div>
    </div>
  );
}
