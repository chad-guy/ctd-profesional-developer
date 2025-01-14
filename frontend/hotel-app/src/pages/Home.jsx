import SearchBar from "../components/molecules/SearchBar";
import CategorySection from "../components/molecules/CategorySection";
import RecommendedHotels from "../components/molecules/RecommendedHotels";

const Home = () => {
  return (
    <main className="pt-16 min-h-screen bg-gradient-to-b from-blue-50 to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Sección de búsqueda */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Encuentra tu hotel ideal
          </h1>
          <p className="text-xl text-gray-600">
            Descubre lugares increíbles para tu próxima estadía
          </p>
          <SearchBar />
        </section>

        {/* Sección de categorías */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Explora por categorías
          </h2>
          <CategorySection />
        </section>

        {/* Sección de recomendados */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Hoteles recomendados
          </h2>
          <RecommendedHotels />
        </section>
      </div>
    </main>
  );
};

export default Home;
