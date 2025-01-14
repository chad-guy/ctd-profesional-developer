import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const NavLinks = () => {
  const { user } = useAuth();

  return (
    <nav className="hidden md:flex space-x-8">
      <Link
        to="/"
        className="text-gray-700 transition-all duration-300 hover:text-blue-600 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
      >
        Inicio
      </Link>
      <Link
        to="/hoteles"
        className="text-gray-700 transition-all duration-300 hover:text-blue-600 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
      >
        Hoteles
      </Link>
      {user && (
        <Link
          to="/admin"
          className="text-gray-700 transition-all duration-300 hover:text-blue-600 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
        >
          Administración
        </Link>
      )}
    </nav>
  );
};

export default NavLinks;
