import { useEffect, useState } from "react";
import API, { IMAGE_URL } from "../services/api";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await API.get("/cart");
        setCartItems(response.data.items || []);
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    };

    fetchCart();
  }, []);

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );
  
   const handleRemove = async (productId) => {
  try {
    await API.delete(`/cart/${productId}`);

    setCartItems(
      cartItems.filter(
        (item) => item.product._id !== productId
      )
    );
  } catch (error) {
    console.error("Error removing item:", error);
  }
};

const updateQuantity = async (
  productId,
  quantity
) => {
  if (quantity < 1) return;

  try {
    await API.put(`/cart/${productId}`, {
      quantity,
    });

    setCartItems(
      cartItems.map((item) =>
        item.product._id === productId
          ? { ...item, quantity }
          : item
      )
    );
  } catch (error) {
    console.error(
      "Error updating quantity:",
      error
    );
  }
};

const handleCheckout = async () => {
  try {
    await API.post("/orders/checkout");

    alert("Order placed successfully!");

    // Clear the cart display after successful checkout
    setCartItems([]);

  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Checkout failed."
    );
  }
};

  return (
    <div style={{ padding: "30px" }}>
      <h2>Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.product._id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                margin: "20px 0",
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            >
              <img
                src={
                  item.product.image
                    ? `${IMAGE_URL}/${item.product.image}`
                    : "https://via.placeholder.com/100"
                }
                alt={item.product.name}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                }}
              />

              <div>
                <h3>{item.product.name}</h3>
                <p>Price: D{item.product.price}</p>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
  <button
    onClick={() =>
      updateQuantity(
        item.product._id,
        item.quantity - 1
      )
    }
  >
    -
  </button>

  <span>{item.quantity}</span>

  <button
    onClick={() =>
      updateQuantity(
        item.product._id,
        item.quantity + 1
      )
    }
  >
    +
  </button>
</div>
                <p>
                  Subtotal: D
                  
                  {item.product.price * item.quantity}
                </p>
                <button
  onClick={() => handleRemove(item.product._id)}
  style={{
    marginTop: "10px",
    padding: "8px 15px",
    backgroundColor: "#d32f2f",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  }}
>
  Remove
</button>
              </div>
            </div>
          ))}

          <div style={{ marginTop: "20px" }}>
  <h3>Total: D{totalPrice}</h3>

  <button
    onClick={handleCheckout}
    style={{
      marginTop: "15px",
      padding: "12px 25px",
      backgroundColor: "#2e7d32",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
    }}
  >
    Checkout
  </button>
</div>
        </>
      )}
    </div>
  );
}

export default Cart;