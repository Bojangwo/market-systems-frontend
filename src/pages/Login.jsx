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
  <div className="min-h-screen flex">
    
    {/* Left Side */}
    <div
      className="hidden md:flex md:w-1/2 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1542838132-92c53300491e')",
      }}
    >
      <div className="w-full bg-black/40 flex items-center justify-center">
        <div className="text-center text-white px-10">
          <h1 className="text-5xl font-bold mb-4">
            Welcome Back
          </h1>

          <p className="text-xl">
            Fresh organic products delivered to your
            doorstep.
          </p>
        </div>
      </div>
    </div>

    {/* Right Side */}
    <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          Login
        </h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
            className="w-full border rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
            className="w-full border rounded-xl px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Login
          </button>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?

            <a
              href="/register"
              className="text-green-700 font-semibold ml-2"
            >
              Register
            </a>
          </p>

        </form>
      </div>
    </div>
  </div>
);
}

export default Login;