import { useEffect, useState } from "react";
import Hero from "../components/HeroSection";
import ProductCard from "../components/ProductCard";
import API, { IMAGE_URL } from "../services/api";

function Home() {
  const [products, setProducts] = useState([]);

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

  return (
    <div>
      <Hero />

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
          {products.map((product) => {
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