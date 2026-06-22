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
  <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 p-8">

    <div className="max-w-6xl mx-auto">

      <h1 className="text-5xl font-bold text-center text-green-700 mb-3">
        My Orders
      </h1>

      <p className="text-center text-gray-600 mb-10">
        Track all your purchases and order status.
      </p>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-700">
            You haven't placed any orders yet.
          </h2>
        </div>
      ) : (
        <div className="space-y-6">

          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">

                <div>
                  <h2 className="font-bold text-lg">
                    Order #{order._id.slice(-6)}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Total: D{order.totalAmount}
                  </p>
                </div>

                <span
                  className={`px-4 py-2 rounded-full text-white text-sm font-semibold mt-3 md:mt-0
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
                  {order.status || "Pending"}
                </span>

              </div>

              <div className="mt-5">

                <h3 className="font-semibold mb-3">
                  Ordered Items
                </h3>

                <div className="space-y-2">

                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="bg-gray-100 p-3 rounded-lg flex justify-between"
                    >
                      <span>
                        {item.product?.name}
                      </span>

                      <span>
                        Qty: {item.quantity}
                      </span>
                    </div>
                  ))}

                </div>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  </div>
);
}

export default MyOrders;