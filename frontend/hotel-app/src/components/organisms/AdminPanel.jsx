import { useState, useEffect } from "react";
import { productService } from "../../services/productService";
import ProductForm from "../molecules/ProductForm";
import ImagePlaceholder from "../atoms/ImagePlaceholder";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productService.getProducts();
      setProducts(data);
    } catch (err) {
      setError("Error al cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (productData) => {
    try {
      await productService.createProduct(productData);
      setShowForm(false);
      loadProducts(); // Recargar la lista
    } catch (err) {
      setError("Error al crear el producto");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await productService.deleteProduct(id);
      loadProducts(); // Recargar la lista
      setError(""); // Limpiar cualquier error previo
    } catch (err) {
      setError("Error al eliminar el producto");
    }
  };

  const handleEditProduct = async (productData) => {
    try {
      await productService.updateProduct(editingProduct.id, productData);

      // Si hay una nueva imagen, la actualizamos
      if (productData.images.length > 0) {
        await productService.updateProductImage(
          editingProduct.id,
          productData.images[0]
        );
      }

      setShowForm(false);
      setEditingProduct(null);
      loadProducts(); // Recargar la lista
    } catch (err) {
      setError("Error al actualizar el producto");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct({
      id: product.id,
      nombre: product.nombre,
      descripcion: product.descripcion,
      precio: product.precio,
      categoria: product.categoria,
      imagen: product.imagen,
    });
    setShowForm(true);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen pt-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Panel de Administración
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-blue-700 hover:shadow-md"
        >
          Agregar Producto
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Lista de productos */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Imagen
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoría
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.imagen ? (
                    <img
                      src={productService.getProductImage(product.imagen)}
                      alt={product.nombre}
                      className="h-10 w-10 rounded-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextElementSibling.style.display = "flex";
                      }}
                    />
                  ) : (
                    <ImagePlaceholder />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.nombre}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 truncate max-w-xs">
                    {product.descripcion}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.categoria}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${product.precio}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:text-blue-900 transition-colors duration-300"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-900 transition-colors duration-300"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de formulario */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
            <ProductForm
              onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
              onCancel={() => {
                setShowForm(false);
                setEditingProduct(null);
              }}
              initialData={editingProduct}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
