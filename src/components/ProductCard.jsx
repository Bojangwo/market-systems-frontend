import API from "../services/api";

function ProductCard({ id, image, name, price }) {
  const handleAddToCart = async () => {
    try {
      await API.post("/cart/add", {
        productId: id,
        quantity: 1,
      });

      alert("Product added to cart!");
    } catch (error) {
      if (error.response?.status === 401) {
        alert("Please log in first.");
      } else {
        console.error(error);
        alert("Could not add product to cart.");
      }
    }
  };

  return (
    <div
      style={{
        width: "250px",
        backgroundColor: "white",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        textAlign: "center",
        paddingBottom: "15px",
      }}
    >
      <img
        src={image}
        alt={name}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
        }}
      />

      <h3 style={{ margin: "15px 0 10px" }}>
        {name}
      </h3>

      <p
        style={{
          color: "#2e7d32",
          fontWeight: "bold",
        }}
      >
        D{price}
      </p>

      <button
        onClick={handleAddToCart}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;