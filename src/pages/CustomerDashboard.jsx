import { Link } from "react-router-dom";

function CustomerDashboard() {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "30px",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#2e7d32" }}>
        Customer Dashboard
      </h1>

      <p
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "18px",
        }}
      >
        Welcome to Organic Market! What would you like to do today?
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: "220px",
              padding: "25px",
              textAlign: "center",
              background: "#f5f5f5",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3>🛍️ Browse Products</h3>
            <p>View all available products.</p>
          </div>
        </Link>

        <Link
          to="/cart"
          style={{
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: "220px",
              padding: "25px",
              textAlign: "center",
              background: "#f5f5f5",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3>🛒 My Cart</h3>
            <p>View and manage your shopping cart.</p>
          </div>
        </Link>

        <Link
          to="/my-orders"
          style={{
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: "220px",
              padding: "25px",
              textAlign: "center",
              background: "#f5f5f5",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3>📦 My Orders</h3>
            <p>Track your previous orders.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default CustomerDashboard;