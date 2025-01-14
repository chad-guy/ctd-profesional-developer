import { useState, useEffect } from "react";
import { productService } from "../../services/productService";
import ImagePlaceholder from "../atoms/ImagePlaceholder";
import { Link } from "react-router-dom";

const RecommendedHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadHotels = async () => {
      try {
        const data = await productService.getProducts();
        // Ordenar por precio y tomar los 10 más baratos
        const cheapestHotels = data
          .sort((a, b) => parseFloat(a.precio) - parseFloat(b.precio))
          .slice(0, 10);
        setHotels(cheapestHotels);
      } catch (err) {
        setError("Error al cargar los hoteles recomendados");
      } finally {
        setLoading(false);
      }
    };

    loadHotels();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center py-4">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {hotels.map((hotel) => (
        <div
          key={hotel.id}
          className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
        >
          {hotel.imagen ? (
            <img
              src={productService.getProductImage(hotel.imagen)}
              alt={hotel.nombre}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextElementSibling.style.display = "block";
              }}
            />
          ) : (
            <div className="w-full h-48">
              <ImagePlaceholder className="w-full h-full" />
            </div>
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {hotel.nombre}
            </h3>
            <p className="text-gray-600 text-sm mb-2">{hotel.categoria}</p>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-blue-600 font-bold">
                ${hotel.precio}/noche
              </span>
              <Link
                to={`/producto/${hotel.id}`}
                className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
              >
                Ver detalles
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendedHotels;
