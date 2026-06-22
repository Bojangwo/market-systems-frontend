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
  <div className="min-h-screen bg-gray-50 py-10 px-6">
    <div className="max-w-6xl mx-auto">

      <h1 className="text-4xl font-bold text-center text-green-700 mb-10">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-700">
            Your cart is empty
          </h2>

          <p className="text-gray-500 mt-3">
            Browse products and add items to your cart.
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">

            {cartItems.map((item) => (
              <div
                key={item.product._id}
                className="bg-white rounded-2xl shadow-md p-5 flex gap-5 items-center"
              >
                <img
                  src={
                    item.product.image
                      ? `${IMAGE_URL}/${item.product.image}`
                      : "https://via.placeholder.com/150"
                  }
                  alt={item.product.name}
                  className="w-28 h-28 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="text-xl font-semibold">
                    {item.product.name}
                  </h3>

                  <p className="text-green-700 font-bold mt-2">
                    D{item.product.price}
                  </p>

                  <div className="flex items-center gap-4 mt-4">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product._id,
                          item.quantity - 1
                        )
                      }
                      className="bg-gray-200 px-3 py-1 rounded-lg"
                    >
                      -
                    </button>

                    <span className="font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product._id,
                          item.quantity + 1
                        )
                      }
                      className="bg-gray-200 px-3 py-1 rounded-lg"
                    >
                      +
                    </button>
                  </div>

                  <p className="mt-4 text-gray-700">
                    Subtotal:
                    <span className="font-bold ml-2">
                      D
                      {item.product.price *
                        item.quantity}
                    </span>
                  </p>
                </div>

                <button
                  onClick={() =>
                    handleRemove(item.product._id)
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-24">

            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="flex justify-between mb-4">
              <span>Total Items</span>

              <span>
                {cartItems.reduce(
                  (total, item) =>
                    total + item.quantity,
                  0
                )}
              </span>
            </div>

            <div className="flex justify-between text-xl font-bold mb-8">
              <span>Total</span>

              <span>D{totalPrice}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold transition"
            >
              Checkout
            </button>

          </div>
        </div>
      )}
    </div>
  </div>
);
}

export default Cart;