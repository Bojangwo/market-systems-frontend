import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        fullname,
        email,
        password,
      });

      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration failed."
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
          "url('https://images.unsplash.com/photo-1573246123716-6b1782bfc499')",
      }}
    >
      <div className="w-full bg-black/40 flex items-center justify-center">
        <div className="text-center text-white px-10">
          <h1 className="text-5xl font-bold mb-4">
            Join Organic Market
          </h1>

          <p className="text-xl">
            Create an account and start shopping
            healthy products today.
          </p>
        </div>
      </div>
    </div>

    {/* Right Side */}
    <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          Create Account
        </h2>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) =>
              setFullname(e.target.value)
            }
            required
            className="w-full border rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

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
            Register
          </button>

        </form>
      </div>
    </div>
  </div>
);
}

export default Register;