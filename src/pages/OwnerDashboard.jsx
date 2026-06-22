import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function OwnerDashboard() {

  const [totalProducts, setTotalProducts] = useState(0);
const [totalOrders, setTotalOrders] = useState(0);
const [totalRevenue, setTotalRevenue] = useState(0);

useEffect(() => {
  const fetchStats = async () => {
    try {
      const productsResponse =
        await API.get("/products");

      const ordersResponse =
        await API.get("/orders");

      setTotalProducts(
        productsResponse.data.products.length
      );

      setTotalOrders(
        ordersResponse.data.length
      );

      const revenue =
        ordersResponse.data.reduce(
          (total, order) =>
            total + order.totalAmount,
          0
        );

      setTotalRevenue(revenue);

    } catch (error) {
      console.error(
        "Error loading dashboard stats:",
        error
      );
    }
  };

  fetchStats();
}, []);

  return (
  <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">
    <div className="max-w-7xl mx-auto">

      <h1 className="text-5xl font-bold text-center text-green-700 mb-3">
        Store Owner Dashboard
      </h1>

      <p className="text-center text-gray-600 text-lg mb-10">
        Monitor products, orders and business performance.
      </p>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:scale-105 transition">
          <h3 className="text-gray-500 mb-2">
            Total Products
          </h3>

          <h1 className="text-4xl font-bold text-green-600">
            {totalProducts}
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:scale-105 transition">
          <h3 className="text-gray-500 mb-2">
            Total Orders
          </h3>

          <h1 className="text-4xl font-bold text-blue-600">
            {totalOrders}
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:scale-105 transition">
          <h3 className="text-gray-500 mb-2">
            Revenue
          </h3>

          <h1 className="text-4xl font-bold text-orange-500">
            D{totalRevenue}
          </h1>
        </div>

      </div>

      {/* Action Cards */}
      <div className="grid md:grid-cols-3 gap-8">

        <Link to="/add-product">
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 transition">
            <h2 className="text-2xl font-bold text-green-700 mb-3">
              ➕ Add Product
            </h2>

            <p className="text-gray-600">
              Create and publish new products.
            </p>
          </div>
        </Link>

        <Link to="/manage-products">
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 transition">
            <h2 className="text-2xl font-bold text-green-700 mb-3">
              📦 Manage Products
            </h2>

            <p className="text-gray-600">
              Update inventory and pricing.
            </p>
          </div>
        </Link>

        <Link to="/all-orders">
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 transition">
            <h2 className="text-2xl font-bold text-green-700 mb-3">
              📋 View Orders
            </h2>

            <p className="text-gray-600">
              Monitor and process customer orders.
            </p>
          </div>
        </Link>

      </div>

    </div>
  </div>
);
}

export default OwnerDashboard;