import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { productService } from "../services/productService";
import ImagePlaceholder from "../components/atoms/ImagePlaceholder";
import { CATEGORIAS } from "../constants/categories";
import { useAuth } from "../context/AuthContext";
import { reservationService } from "../services/reservationService";
import ReservationCalendar from "../components/molecules/ReservationCalendar";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProduct(id);
        setProduct(data);
      } catch (err) {
        setError("Error al cargar el producto");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-red-600 text-center py-4">
            {error || "Producto no encontrado"}
          </div>
          <Link
            to="/hoteles"
            className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
          >
            ← Volver a hoteles
          </Link>
        </div>
      </div>
    );
  }

  const categoria = CATEGORIAS.find((cat) => cat.id === product.categoria);

  const handleReserve = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setShowCalendar(true);
  };

  const handleConfirmReservation = async (dates) => {
    try {
      await reservationService.createReservation({
        usuarioId: user.id,
        productoId: product.id,
        fechaInicio: dates.fechaInicio,
        fechaFin: dates.fechaFin,
      });
      setShowCalendar(false);
      // Mostrar mensaje de éxito
      alert("Reserva creada exitosamente");
    } catch (error) {
      console.error("Error:", error);
      setError("Error al crear la reserva");
    }
  };

  return (
    <main className="min-h-screen pt-20 px-4 bg-gradient-to-b from-blue-50 to-gray-50">
      <div className="max-w-7xl mx-auto py-8">
        <Link
          to="/hoteles"
          className="text-blue-600 hover:text-blue-800 transition-colors duration-300 mb-6 inline-block"
        >
          ← Volver a hoteles
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/2">
              {product.imagen ? (
                <img
                  src={productService.getProductImage(product.imagen)}
                  alt={product.nombre}
                  className="w-full h-96 object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextElementSibling.style.display = "block";
                  }}
                />
              ) : (
                <div className="w-full h-96">
                  <ImagePlaceholder className="w-full h-full" />
                </div>
              )}
            </div>

            <div className="p-8 md:w-1/2">
              <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
                {categoria?.label}
              </div>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                {product.nombre}
              </h1>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                {product.descripcion}
              </p>
              <div className="mt-8">
                <div className="text-2xl font-bold text-blue-600">
                  ${product.precio}
                  <span className="text-gray-600 text-lg font-normal">
                    /noche
                  </span>
                </div>
              </div>
              <div className="mt-8">
                <button
                  onClick={handleReserve}
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
                >
                  Reservar ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showCalendar && (
        <ReservationCalendar
          onSubmit={handleConfirmReservation}
          onCancel={() => setShowCalendar(false)}
        />
      )}
    </main>
  );
};

export default ProductDetail;
