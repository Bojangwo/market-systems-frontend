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
  <div className="min-h-screen bg-gray-100 py-10 px-6">
    <div className="max-w-7xl mx-auto">

      <h1 className="text-5xl font-bold text-center text-green-700 mb-3">
        Order Management
      </h1>

      <p className="text-center text-gray-600 mb-10">
        View and manage customer orders.
      </p>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <h3 className="text-gray-500">
            Pending Orders
          </h3>

          <h1 className="text-4xl font-bold text-yellow-500 mt-2">
            {orders.filter(
              (o) => o.status === "Pending"
            ).length}
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <h3 className="text-gray-500">
            Processing
          </h3>

          <h1 className="text-4xl font-bold text-blue-500 mt-2">
            {orders.filter(
              (o) => o.status === "Processing"
            ).length}
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <h3 className="text-gray-500">
            Delivered
          </h3>

          <h1 className="text-4xl font-bold text-green-600 mt-2">
            {orders.filter(
              (o) => o.status === "Delivered"
            ).length}
          </h1>
        </div>

      </div>

      {/* Filter */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

        <h3 className="font-semibold mb-3">
          Filter Orders
        </h3>

        <select
          value={selectedStatus}
          onChange={(e) =>
            setSelectedStatus(e.target.value)
          }
          className="border rounded-xl p-3 w-full md:w-72"
        >
          <option value="All">All Orders</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
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
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          <h2 className="text-2xl font-semibold">
            No orders found.
          </h2>
        </div>
      ) : (
        <div className="space-y-6">

          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >

              <div className="flex flex-col md:flex-row md:justify-between gap-4">

                <div>
                  <h2 className="text-2xl font-bold text-green-700">
                    {order.customer?.fullname ||
                      "Unknown Customer"}
                  </h2>

                  <p className="text-gray-600 mt-1">
                    Total Amount:
                    <span className="font-semibold ml-2">
                      D{order.totalAmount}
                    </span>
                  </p>
                </div>

                <div>
                  <span
                    className={`px-4 py-2 rounded-full text-white text-sm font-semibold
                    ${
                      order.status === "Pending"
                        ? "bg-yellow-500"
                        : order.status === "Processing"
                        ? "bg-blue-500"
                        : order.status === "Out For Delivery"
                        ? "bg-purple-500"
                        : order.status === "Delivered"
                        ? "bg-green-600"
                        : "bg-red-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

              </div>

              <div className="mt-6">

                <h3 className="font-semibold mb-3">
                  Ordered Items
                </h3>

                <div className="space-y-3">

                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="bg-gray-100 rounded-xl p-3 flex flex-col md:flex-row md:justify-between"
                    >
                      <span>
                        {item.product?.name ||
                          "Product"}
                      </span>

                      <span>
                        Qty: {item.quantity}
                      </span>

                      <span>
                        D{item.price}
                      </span>
                    </div>
                  ))}

                </div>

              </div>

              <div className="mt-6">

                <label className="block mb-2 font-semibold">
                  Update Status
                </label>

                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(
                      order._id,
                      e.target.value
                    )
                  }
                  className="border rounded-xl p-3 w-full md:w-72"
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
          ))}

        </div>
      )}

    </div>
  </div>
);
}

export default AllOrders;