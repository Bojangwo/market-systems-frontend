import { Link } from "react-router-dom";

function AssistantDashboard() {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "30px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#1976d2",
        }}
      >
        Assistant Dashboard
      </h1>

      <p
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "18px",
        }}
      >
        Manage customer orders and daily store operations.
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
            <p>View all customer orders.</p>
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
            <h3>🔄 Update Status</h3>
            <p>Change order status.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AssistantDashboard;