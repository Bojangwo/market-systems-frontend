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

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-orders" element={<MyOrders />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/product/:id" element={<Products />} />
        <Route path="/dashboard" element={<CustomerDashboard />} />
        <Route path="/assistant-dashboard" element={<AssistantDashboard />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;