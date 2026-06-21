import { useEffect, useState } from "react";
import API from "../services/api";

function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] =
  useState("All");

  const fetchOrders = async () => {
    try {
      const response = await API.get("/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      await API.put(`/orders/${orderId}/status`, {
        status: newStatus,
      });

      alert("Order status updated!");

      fetchOrders();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Failed to update order."
      );
    }
  };

  const filteredOrders =
  selectedStatus === "All"
    ? orders
    : orders.filter(
        (order) =>
          order.status === selectedStatus
      );

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
        All Orders
      </h1>

      <div
  style={{
    textAlign: "center",
    marginBottom: "30px",
  }}
>
<div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px",
    flexWrap: "wrap",
  }}
>
  <div>Pending: {orders.filter(o => o.status === "Pending").length}</div>

  <div>Processing: {orders.filter(o => o.status === "Processing").length}</div>

  <div>Delivered: {orders.filter(o => o.status === "Delivered").length}</div>
</div>

  <select
    value={selectedStatus}
    onChange={(e) =>
      setSelectedStatus(e.target.value)
    }
    style={{
      padding: "10px",
      borderRadius: "8px",
      fontSize: "16px",
    }}
  >
    <option value="All">
      All Orders
    </option>

    <option value="Pending">
      Pending
    </option>

    <option value="Processing">
      Processing
    </option>

    <option value="Out For Delivery">
      Out For Delivery
    </option>

    <option value="Delivered">
      Delivered
    </option>

    <option value="Cancelled">
      Cancelled
    </option>
  </select>
</div>

      {filteredOrders.length === 0 ? (
        <h3 style={{ textAlign: "center" }}>
          No orders found.
        </h3>
      ) : (
        filteredOrders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3>
              Customer:{" "}
              {order.customer?.fullname || "Unknown"}
            </h3>

            <p>
              <strong>Total:</strong> D
              {order.totalAmount}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {order.status}
            </p>

            <h4>Items:</h4>

            <ul>
              {order.items.map((item) => (
                <li key={item._id}>
                  {item.product?.name || "Product"} -
                  Quantity: {item.quantity} -
                  Price: D{item.price}
                </li>
              ))}
            </ul>

            <div
              style={{
                marginTop: "15px",
              }}
            >

              <select
  value={order.status}
  onChange={(e) =>
    updateStatus(
      order._id,
      e.target.value
    )
  }
  style={{
    padding: "8px",
    borderRadius: "5px",
  }}
>
  <option value="Pending">
    Pending
  </option>

  <option value="Processing">
    Processing
  </option>

  <option value="Out For Delivery">
    Out For Delivery
  </option>

  <option value="Delivered">
    Delivered
  </option>

  <option value="Cancelled">
    Cancelled
  </option>
</select>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AllOrders;