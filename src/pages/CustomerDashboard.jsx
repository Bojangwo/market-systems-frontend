import { Link } from "react-router-dom";

function CustomerDashboard() {
  return (
  <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 p-8">

    <div className="max-w-6xl mx-auto">

      <h1 className="text-5xl font-bold text-center text-green-700 mb-3">
        Welcome Shopper 👋
      </h1>

      <p className="text-center text-gray-600 mb-10">
        Browse products, manage your cart and track orders.
      </p>

      <div className="grid md:grid-cols-3 gap-8">

        <Link to="/">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <h2 className="text-2xl font-bold text-green-700 mb-3">
              🛍 Browse Products
            </h2>

            <p className="text-gray-600">
              Explore our latest products.
            </p>
          </div>
        </Link>

        <Link to="/cart">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <h2 className="text-2xl font-bold text-green-700 mb-3">
              🛒 My Cart
            </h2>

            <p className="text-gray-600">
              Manage shopping cart items.
            </p>
          </div>
        </Link>

        <Link to="/my-orders">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <h2 className="text-2xl font-bold text-green-700 mb-3">
              📦 My Orders
            </h2>

            <p className="text-gray-600">
              Track your orders.
            </p>
          </div>
        </Link>

      </div>

    </div>

  </div>
);
}

export default CustomerDashboard;