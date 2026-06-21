import { useEffect, useState } from "react";
import Hero from "../components/HeroSection";
import ProductCard from "../components/ProductCard";
import API, { IMAGE_URL } from "../services/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/products");

        // IMPORTANT: backend returns { products: [...] }
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

const filteredProducts = products.filter((product) => {
  const matchesSearch =
    product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

  const matchesCategory =
    selectedCategory === "All" ||
    product.category === selectedCategory;

  return matchesSearch && matchesCategory;
});

  return (
    <div>

      <Hero />

      <div className="bg-white py-10">
  <div className="max-w-xl mx-auto px-4">
    <input
      type="text"
      placeholder="🔍 Search fresh products..."
      value={searchTerm}
      onChange={(e) =>
        setSearchTerm(e.target.value)
      }
      className="w-full border border-gray-300 rounded-xl px-5 py-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
    />
  </div>
</div>

<div
  style={{
    textAlign: "center",
    marginBottom: "20px",
  }}
>
  <label
    style={{
      marginRight: "10px",
      fontWeight: "bold",
    }}
  >
    Category:
  </label>

  <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    style={{
      padding: "10px",
      borderRadius: "5px",
      fontSize: "16px",
    }}
  >
    <option value="All">All</option>
    <option value="Food">Food</option>
    <option value="Drinks">Drinks</option>
    <option value="Fruits">Fruits</option>
    <option value="Vegetables">Vegetables</option>
  </select>
</div>

      <section className="bg-gray-50 py-16">
  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
      Featured Products
    </h2>

    <p className="text-center text-gray-600 mb-12">
      Fresh products carefully selected for your family.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
      {filteredProducts.map((product) => {
        const imageUrl = product.image
          ? `${IMAGE_URL}/${product.image}`
          : "https://images.unsplash.com/photo-1542838132-92c53300491e";

        return (
          <ProductCard
            key={product._id}
            id={product._id}
            image={imageUrl}
            name={product.name}
            price={product.price}
          />
        );
      })}
    </div>

  </div>
</section>
    </div>
  );
  
}

export default Home;