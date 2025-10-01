import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import toast from "react-hot-toast";

function Login({ setAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if(email === "" || password === "") {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("userId", res.data.userId);
      toast.success("Login successful!");
      setAuth(true);
      navigate("/dashboard"); 
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-black  px-4">
      {/* White Login Card */}
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <div>
            <input 
              type="email" 
              placeholder="Email address" 
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          <div>
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button 
            onClick={handleLogin} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Sign In
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;