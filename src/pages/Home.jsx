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

      <div
  style={{
    textAlign: "center",
    margin: "30px 0",
  }}
>
  <input
    type="text"
    placeholder="🔍 Search products..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{
      width: "300px",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "16px",
    }}
  />
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

      <section style={{ padding: "50px 30px", textAlign: "center" }}>
        <h2 style={{ marginBottom: "30px" }}>Featured Products</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
          }}
        >
          {filteredProducts.map((product) => {
            // handle missing images safely
            const imageUrl = product.image
              ? `${IMAGE_URL}/${product.image}`
              : "https://via.placeholder.com/300";

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
      </section>
    </div>
  );
}

export default Home;