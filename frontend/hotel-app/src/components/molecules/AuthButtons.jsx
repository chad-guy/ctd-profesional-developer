import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AuthButtons = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (user) {
    return (
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate("/mis-reservas")}
          className="text-gray-600 hover:text-blue-600 transition-all duration-300"
        >
          Hola, {user.nombre}
        </button>
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="text-gray-700 hover:text-blue-600 transition-all duration-300"
        >
          Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => navigate("/register")}
        className="text-gray-700 hover:text-blue-600 transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
      >
        Crear cuenta
      </button>
      <button
        onClick={() => navigate("/login")}
        className="bg-blue-600 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-blue-700 hover:shadow-md"
      >
        Iniciar sesión
      </button>
    </div>
  );
};

export default AuthButtons;
