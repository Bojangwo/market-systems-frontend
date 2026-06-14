import { useEffect, useState } from "react";
import API from "../services/api";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await API.get(
          "/orders/my-orders"
        );
        setOrders(response.data);
      } catch (error) {
        console.error(
          "Error fetching orders:",
          error
        );
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              margin: "20px 0",
              borderRadius: "8px",
            }}
          >
            <p>
              <strong>Order ID:</strong>{" "}
              {order._id}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {order.status || "Pending"}
            </p>

            <p>
              <strong>Total:</strong> D
              {order.totalAmount}
            </p>

            <h4>Items:</h4>

            <ul>
              {order.items.map((item) => (
                <li key={item._id}>
                  {item.product?.name} ×{" "}
                  {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;