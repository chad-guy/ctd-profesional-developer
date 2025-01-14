const API_URL = "http://localhost:8080/api";

export const reservationService = {
  createReservation: async (reservationData) => {
    try {
      const response = await fetch(`${API_URL}/reservas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) throw new Error("Error al crear la reserva");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  getUserReservations: async (userId) => {
    try {
      const response = await fetch(`${API_URL}/reservas/usuario/${userId}`);
      if (!response.ok) throw new Error("Error al obtener las reservas");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
};
