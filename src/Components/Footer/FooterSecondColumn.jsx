import React from "react";
import { Link } from "react-router-dom";

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

const FooterSecondColumn = () => {
  return (
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

      <div className="flex flex-col gap-5 md:hidden lg:flex">
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
  );
};

export default FooterSecondColumn;
