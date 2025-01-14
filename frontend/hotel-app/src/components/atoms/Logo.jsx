import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img
        src="/logo.svg"
        alt="HotelApp Logo"
        className="h-8 w-auto transition-transform duration-300 hover:scale-110"
      />
    </Link>
  );
};

export default Logo;
