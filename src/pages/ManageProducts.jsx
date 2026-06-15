import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API, { IMAGE_URL } from "../services/api";

function ManageProducts() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/products/${id}`);

      alert("Product deleted successfully!");

      // Refresh product list
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Failed to delete product."
      );
    }
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#2e7d32",
          marginBottom: "30px",
        }}
      >
        Manage Products
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => {
          const imageUrl = product.image
            ? `${IMAGE_URL}/${product.image}`
            : "https://via.placeholder.com/300";

          return (
            <div
              key={product._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                textAlign: "center",
                boxShadow:
                  "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={imageUrl}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />

              <h3>{product.name}</h3>

              <p>
                <strong>D{product.price}</strong>
              </p>

              <p>Stock: {product.stock}</p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  marginTop: "15px",
                }}
              >
                <Link
                  to={`/edit-product/${product._id}`}
                >
                  <button
                    style={{
                      padding: "8px 12px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                </Link>

                <button
                  onClick={() =>
                    handleDelete(product._id)
                  }
                  style={{
                    padding: "8px 12px",
                    background: "#d32f2f",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ManageProducts;