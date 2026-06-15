import { Link } from "react-router-dom";

function OwnerDashboard() {
  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
        padding: "30px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#2e7d32",
        }}
      >
        Owner Dashboard
      </h1>

      <p
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "18px",
        }}
      >
        Manage products, orders, and store activities.
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
          to="/add-product"
          style={{ textDecoration: "none" }}
        >
          <div
            style={{
              width: "220px",
              padding: "25px",
              background: "#f5f5f5",
              borderRadius: "10px",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3>➕ Add Product</h3>
            <p>Create a new product.</p>
          </div>
        </Link>

        <Link
          to="/manage-products"
          style={{ textDecoration: "none" }}
        >
          <div
            style={{
              width: "220px",
              padding: "25px",
              background: "#f5f5f5",
              borderRadius: "10px",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3>📦 Manage Products</h3>
            <p>Edit or delete products.</p>
          </div>
        </Link>

        <Link
          to="/all-orders"
          style={{ textDecoration: "none" }}
        >
          <div
            style={{
              width: "220px",
              padding: "25px",
              background: "#f5f5f5",
              borderRadius: "10px",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3>📋 View Orders</h3>
            <p>Manage customer orders.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default OwnerDashboard;