import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

    const userRole = response.data.role;

localStorage.setItem("token", response.data.token);
localStorage.setItem("role", userRole);

if (userRole === "owner") {
  navigate("/owner-dashboard");
} else if (userRole === "assistant") {
  navigate("/assistant-dashboard");
} else {
  navigate("/dashboard");
}
    } catch (error) {
      alert(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        background: "white",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </button>

       <p style={{ marginTop: "15px", textAlign: "center" }}>
  Don't have an account?{" "}
  <a href="/register">Register here</a>
</p>

      </form>
    </div>
  );
}

export default Login;