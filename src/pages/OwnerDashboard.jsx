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

      <p>
        <div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "40px",
  }}
>
  <div
    style={{
      width: "220px",
      padding: "20px",
      background: "#e8f5e9",
      borderRadius: "10px",
      textAlign: "center",
    }}
  >
    <h3>Total Products</h3>
    <h1>{totalProducts}</h1>
  </div>

  <div
    style={{
      width: "220px",
      padding: "20px",
      background: "#e3f2fd",
      borderRadius: "10px",
      textAlign: "center",
    }}
  >
    <h3>Total Orders</h3>
    <h1>{totalOrders}</h1>
  </div>

  <div
    style={{
      width: "220px",
      padding: "20px",
      background: "#fff3e0",
      borderRadius: "10px",
      textAlign: "center",
    }}
  >
    <h3>Total Revenue</h3>
    <h1>D{totalRevenue}</h1>
  </div>
</div>
       
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