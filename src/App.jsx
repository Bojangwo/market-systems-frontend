import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import Register from "./pages/Register";
import Products from "./pages/Products";
import CustomerDashboard from "./pages/CustomerDashboard";
import AssistantDashboard from "./pages/AssistantDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import AddProduct from "./pages/AddProduct";
import ManageProducts from "./pages/ManageProducts";
import EditProduct from "./pages/EditProduct";
import AllOrders from "./pages/AllOrders";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
  <BrowserRouter>
    <Navbar />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/cart"
        element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-orders"
        element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <MyOrders />
          </ProtectedRoute>
        }
      />

      <Route path="/register" element={<Register />} />
      <Route path="/product/:id" element={<Products />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/assistant-dashboard"
        element={
          <ProtectedRoute allowedRoles={["assistant"]}>
            <AssistantDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner-dashboard"
        element={
          <ProtectedRoute allowedRoles={["owner"]}>
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-product"
        element={
          <ProtectedRoute allowedRoles={["owner"]}>
            <AddProduct />
          </ProtectedRoute>
        }
      />

      <Route
        path="/manage-products"
        element={
          <ProtectedRoute allowedRoles={["owner"]}>
            <ManageProducts />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-product/:id"
        element={
          <ProtectedRoute allowedRoles={["owner"]}>
            <EditProduct />
          </ProtectedRoute>
        }
      />

      <Route
        path="/all-orders"
        element={
          <ProtectedRoute
            allowedRoles={["assistant", "owner"]}
          >
            <AllOrders />
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);
}

export default App;