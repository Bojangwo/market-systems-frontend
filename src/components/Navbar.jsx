import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
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
        }}
      >
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Home
        </Link>

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
          to="/cart"
          style={{
          color: "white",
          textDecoration: "none",
         }}
      >
         Cart
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
      </div>
    </nav>
  );
}

export default Navbar;