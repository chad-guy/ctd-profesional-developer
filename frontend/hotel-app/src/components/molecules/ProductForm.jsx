import { useState, useEffect } from "react";
import { CATEGORIAS } from "../../constants/categories";
import ImagePlaceholder from "../atoms/ImagePlaceholder";
import { productService } from "../../services/productService";

const ProductForm = ({ onSubmit, onCancel, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    images: [],
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.nombre || "",
        description: initialData.descripcion || "",
        price: initialData.precio || "",
        category: initialData.categoria || "",
        images: [],
      });
      if (initialData.imagen) {
        setPreviewImage(productService.getProductImage(initialData.imagen));
      }
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!formData.category) {
        throw new Error("Por favor seleccione una categoría");
      }

      await onSubmit({
        ...formData,
        price: parseFloat(formData.price),
      });
      onCancel();
    } catch (err) {
      setError(err.message || "Error al procesar el formulario");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        images: [file],
      }));

      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        {initialData ? "Editar" : "Agregar Nuevo"} Alojamiento
      </h3>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Descripción
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Precio
        </label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
          min="0"
          step="0.01"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Categoría
        </label>
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Seleccione una categoría</option>
          {CATEGORIAS.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Imagen
        </label>
        <div className="mt-1 flex items-center space-x-4">
          {previewImage ? (
            <div className="relative w-32 h-32">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  console.error("Error loading image");
                  setPreviewImage(null);
                }}
              />
              <button
                type="button"
                onClick={() => {
                  setPreviewImage(null);
                  setFormData((prev) => ({ ...prev, images: [] }));
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div className="w-32 h-32">
              <ImagePlaceholder />
            </div>
          )}
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading
            ? "Guardando..."
            : initialData
            ? "Guardar cambios"
            : "Crear producto"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
