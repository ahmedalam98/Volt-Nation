import { Link } from "react-router-dom";

const SocialIcon = ({ children, path }) => {
  return (
    <Link
      className=" hover:scale-125 cursor-pointer"
      style={{ transition: "all 0.3s" }}
      to={path}
    >
      {children}
    </Link>
  );
};

export default SocialIcon;
