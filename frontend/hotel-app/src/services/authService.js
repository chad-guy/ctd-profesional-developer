const API_URL = "http://localhost:8080/api";

export const authService = {
  register: async (userData) => {
    try {
      const response = await fetch(`${API_URL}/auth/registro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: userData.firstName,
          apellido: userData.lastName,
          email: userData.email,
          password: userData.password,
        }),
      });

      if (!response.ok) throw new Error("Error en el registro");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (!response.ok) throw new Error("Credenciales inválidas");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  updateProfilePicture: async (userId, imageFile) => {
    try {
      const formData = new FormData();
      formData.append("imagen", imageFile);

      const response = await fetch(`${API_URL}/auth/foto-perfil/${userId}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok)
        throw new Error("Error al actualizar la foto de perfil");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
};
