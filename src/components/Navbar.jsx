import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [cartCount, setCartCount] = useState(0);

useEffect(() => {
  const fetchCartCount = async () => {
    if (!token) {
      setCartCount(0);
      return;
    }

    try {
      const response = await API.get("/cart");

      console.log("Cart response:", response.data);

      const totalItems = (response.data.items || []).reduce(
        (total, item) => total + item.quantity,
        0
      );

      console.log("Total items:", totalItems);

      setCartCount(totalItems);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  fetchCartCount();
}, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    alert("Logged out successfully!");
    navigate("/login");
  };

return (
  <nav className="sticky top-0 z-50 bg-green-700 shadow-lg">
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
      <Link
        to="/"
        className="text-2xl font-bold text-white hover:text-green-100 transition"
      >
        🌿 Organic Market
      </Link>

      <div className="flex flex-wrap items-center gap-4 justify-end">
        <Link
          to="/"
          className="text-white hover:text-green-200 transition"
        >
          Home
        </Link>

        {token ? (
          <>
            {role === "customer" && (
              <>
                <Link
                  to="/dashboard"
                  className="text-white hover:text-green-200 transition"
                >
                  Dashboard
                </Link>

                <Link
                  to="/cart"
                  className="relative text-white hover:text-green-200 transition"
                >
                  Cart

                  {cartCount > 0 && (
                    <span className="absolute -top-3 -right-5 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/my-orders"
                  className="text-white hover:text-green-200 transition"
                >
                  My Orders
                </Link>
              </>
            )}

            {role === "assistant" && (
              <Link
                to="/assistant-dashboard"
                className="text-white hover:text-green-200 transition"
              >
                Assistant Dashboard
              </Link>
            )}

            {role === "owner" && (
              <Link
                to="/owner-dashboard"
                className="text-white hover:text-green-200 transition"
              >
                Owner Dashboard
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="bg-white text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-green-100 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-white hover:text-green-200 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-white text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-green-100 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  </nav>
);
}

export default Navbar;