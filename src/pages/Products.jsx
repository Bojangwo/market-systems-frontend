import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API, { IMAGE_URL } from "../services/api";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  const imageUrl = product.image
    ? `${IMAGE_URL}/${product.image}`
    : "https://via.placeholder.com/400";

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        display: "flex",
        gap: "30px",
        padding: "20px",
        background: "white",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <img
        src={imageUrl}
        alt={product.name}
        style={{
          width: "350px",
          height: "350px",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />

      <div>
        <h1>{product.name}</h1>

        <h2 style={{ color: "#2e7d32" }}>
          D{product.price}
        </h2>

        <p>
          <strong>Description:</strong>{" "}
          {product.description || "No description available."}
        </p>

        <p>
          <strong>Category:</strong>{" "}
          {product.category || "N/A"}
        </p>

        <p>
          <strong>Stock Available:</strong>{" "}
          {product.stock}
        </p>

        <p>
          <strong>Average Rating:</strong>{" "}
          {product.averageRating || 0} ⭐
        </p>

        <p>
          <strong>Reviews:</strong>{" "}
          {product.reviewCount || 0}
        </p>
      </div>
    </div>
  );
}

export default ProductDetails;