import { useNavigate } from "react-router-dom";
import { CATEGORIAS } from "../../constants/categories";

const CategorySection = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/hoteles?categoria=${categoryId}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {CATEGORIAS.map((categoria) => (
        <div
          key={categoria.id}
          onClick={() => handleCategoryClick(categoria.id)}
          className="bg-white p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg cursor-pointer group"
        >
          <div className="relative overflow-hidden rounded-md mb-4">
            <img
              src={categoria.image}
              alt={categoria.label}
              className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                e.target.src = "/placeholder.jpg"; // Imagen por defecto si hay error
              }}
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {categoria.label}
          </h3>
          <p className="text-gray-600 text-sm">{categoria.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CategorySection;
