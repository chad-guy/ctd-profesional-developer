import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { reservationService } from "../services/reservationService";
import { format } from "date-fns";

const UserReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const loadReservations = async () => {
      try {
        const data = await reservationService.getUserReservations(user.id);
        setReservations(data);
      } catch (err) {
        setError("Error al cargar las reservas");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadReservations();
    }
  }, [user]);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Mis Reservas</h1>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {reservations.map((reservation) => (
            <li key={reservation.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    {reservation.producto.nombre}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {format(new Date(reservation.fechaInicio), "dd/MM/yyyy")} -
                    {format(new Date(reservation.fechaFin), "dd/MM/yyyy")}
                  </p>
                  <p className="text-sm text-gray-500">
                    Estado:{" "}
                    <span className="font-medium">{reservation.estado}</span>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserReservations;
