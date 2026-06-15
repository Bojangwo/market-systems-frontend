import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

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
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "#2e7d32",
        color: "white",
      }}
    >
      <h2>Organic Market</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{ color: "white", textDecoration: "none" }}
        >
          Home
        </Link>

        {token ? (
          <>
           <Link
             to="/cart"
             style={{
             color: "white",
             textDecoration: "none",
            }}
            >
            Cart ({cartCount})
            </Link>

            <Link
              to="/my-orders"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              My Orders
            </Link>

            <button
              onClick={handleLogout}
              style={{
                background: "transparent",
                color: "white",
                border: "1px solid white",
                padding: "6px 12px",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Register
            </Link>

            <Link
  to="/dashboard"
  style={{
    color: "white",
    textDecoration: "none",
  }}
>
  Dashboard
</Link>
          </>
          
        )}
      </div>

    </nav>
  );
}

export default Navbar;