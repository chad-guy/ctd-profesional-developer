const API_URL = "http://localhost:8080/api";

export const productService = {
  // Crear nuevo producto
  createProduct: async (productData) => {
    try {
      // Primero creamos el producto
      const response = await fetch(`${API_URL}/productos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: productData.name,
          descripcion: productData.description,
          precio: parseFloat(productData.price),
          categoria: productData.category,
        }),
      });

      if (!response.ok) throw new Error("Error al crear el producto");
      const newProduct = await response.json();

      // Si hay imágenes, las subimos
      if (productData.images && productData.images.length > 0) {
        await productService.updateProductImage(
          newProduct.id,
          productData.images[0]
        );
      }

      return newProduct;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  // Obtener todos los productos
  getProducts: async () => {
    try {
      const response = await fetch(`${API_URL}/productos`);
      if (!response.ok) throw new Error("Error al obtener los productos");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  // Obtener producto por ID
  getProductById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/productos/${id}`);
      if (!response.ok) throw new Error("Error al obtener el producto");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  // Eliminar producto
  deleteProduct: async (id) => {
    try {
      const response = await fetch(`${API_URL}/productos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Si la respuesta no es ok, lanzamos un error
      if (!response.ok) {
        throw new Error("Error al eliminar el producto");
      }

      return true;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  // Subir imagen del producto
  uploadImage: async (id, imageFile) => {
    try {
      const formData = new FormData();
      formData.append("imagen", imageFile);

      const response = await fetch(`${API_URL}/productos/imagen/${id}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Error al subir la imagen");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  // Obtener imagen del producto
  getProductImage: (imageName) => {
    if (!imageName) return "/placeholder.jpg";
    return `${API_URL}/imagenes/perfil/${imageName}`;
  },

  updateProduct: async (id, productData) => {
    try {
      const response = await fetch(`${API_URL}/productos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: productData.name,
          descripcion: productData.description,
          precio: parseFloat(productData.price),
          categoria: productData.category,
        }),
      });

      if (!response.ok) throw new Error("Error al actualizar el producto");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  updateProductImage: async (id, imageFile) => {
    try {
      const formData = new FormData();
      formData.append("imagen", imageFile);

      const response = await fetch(`${API_URL}/productos/imagen/${id}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Error al actualizar la imagen");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  getProduct: async (id) => {
    try {
      const response = await fetch(`${API_URL}/productos/${id}`);
      if (!response.ok) throw new Error("Error al obtener el producto");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
};
