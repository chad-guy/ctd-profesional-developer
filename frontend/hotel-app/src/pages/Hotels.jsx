import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { productService } from "../services/productService";
import ImagePlaceholder from "../components/atoms/ImagePlaceholder";
import { CATEGORIAS } from "../constants/categories";

const Hotels = () => {
  const [searchParams] = useSearchParams();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categoria = searchParams.get("categoria");
  const searchTerm = searchParams.get("search")?.toLowerCase();

  useEffect(() => {
    const loadHotels = async () => {
      try {
        setLoading(true);
        const data = await productService.getProducts();

        // Filtrar los hoteles según los criterios
        let filteredHotels = data;

        // Filtrar por categoría si existe
        if (categoria) {
          filteredHotels = filteredHotels.filter(
            (hotel) => hotel.categoria === categoria
          );
        }

        // Filtrar por término de búsqueda si existe
        if (searchTerm) {
          filteredHotels = filteredHotels.filter(
            (hotel) =>
              hotel.nombre.toLowerCase().includes(searchTerm) ||
              hotel.descripcion.toLowerCase().includes(searchTerm) ||
              hotel.categoria.toLowerCase().includes(searchTerm)
          );
        }

        setHotels(filteredHotels);
      } catch (err) {
        setError("Error al cargar los hoteles");
      } finally {
        setLoading(false);
      }
    };

    loadHotels();
  }, [categoria, searchTerm]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center py-4">{error}</div>;
  }

  return (
    <main className="pt-20 min-h-screen bg-gradient-to-b from-blue-50 to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {categoria
            ? `${CATEGORIAS.find((cat) => cat.id === categoria)?.label}`
            : searchTerm
            ? `Resultados para "${searchTerm}"`
            : "Todos los alojamientos"}
        </h1>

        {hotels.length === 0 ? (
          <p className="text-center text-gray-600">
            No hay alojamientos disponibles en esta categoría.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <h3 className="text-lg font-semibold text-gray-800">
                    {hotel.nombre}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {hotel.descripcion}
                  </p>
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
        )}
      </div>
    </main>
  );
};

export default Hotels;
